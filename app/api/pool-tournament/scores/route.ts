import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SlotScore = {
  score: string;
};

type ScoreState = Record<string, SlotScore>;

type ScoreSubmission = {
  matchId?: string;
  scores?: Record<string, string>;
};

const SCORE_KEY = "malones:pool-tournament:scores:v1";

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return {
    token,
    url: url.replace(/\/$/, ""),
  };
}

async function redisCommand<T>(command: unknown[]) {
  const config = getRedisConfig();

  if (!config) {
    throw new Error("Score database is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Score database request failed.");
  }

  return (await response.json()) as { result: T | null };
}

async function readScores(): Promise<ScoreState> {
  const response = await redisCommand<string>(["GET", SCORE_KEY]);

  if (!response.result) {
    return {};
  }

  try {
    return JSON.parse(response.result) as ScoreState;
  } catch {
    return {};
  }
}

async function writeScores(scores: ScoreState) {
  await redisCommand<string>(["SET", SCORE_KEY, JSON.stringify(scores)]);
}

export async function GET() {
  if (!getRedisConfig()) {
    return NextResponse.json({ configured: false, scores: {} });
  }

  try {
    const scores = await readScores();

    return NextResponse.json({ configured: true, scores });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load tournament scores.",
      },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let submission: ScoreSubmission;

  try {
    submission = (await request.json()) as ScoreSubmission;
  } catch {
    return NextResponse.json({ error: "Invalid score payload." }, { status: 400 });
  }

  if (!submission.matchId || !submission.scores) {
    return NextResponse.json({ error: "Missing score details." }, { status: 400 });
  }

  const cleanedScores = Object.entries(submission.scores).reduce<ScoreState>(
    (scores, [slotId, score]) => {
      scores[slotId] = { score: String(score).trim() };
      return scores;
    },
    {},
  );

  const hasMissingScore = Object.values(cleanedScores).some(
    (slot) => slot.score.length === 0,
  );

  if (hasMissingScore) {
    return NextResponse.json(
      { error: "Enter both scores before saving." },
      { status: 400 },
    );
  }

  try {
    const existingScores = await readScores();
    const nextScores = {
      ...existingScores,
      ...cleanedScores,
    };

    await writeScores(nextScores);

    return NextResponse.json({
      matchId: submission.matchId,
      scores: nextScores,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save tournament scores.",
      },
      { status: 503 },
    );
  }
}
