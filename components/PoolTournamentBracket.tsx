"use client";

import { useEffect, useState } from "react";

type PlayerSlot = {
  id: string;
  seed?: number;
  label: string;
};

type BracketMatch = {
  id: string;
  title: string;
  slots: PlayerSlot[];
};

type BracketColumn = {
  title: string;
  subtitle: string;
  matches: BracketMatch[];
};

type BracketGroup = {
  title: string;
  columns: BracketColumn[];
};

type SlotValue = {
  name: string;
  score: string;
};

type BracketState = Record<string, SlotValue>;
type SaveStatus = Record<
  string,
  {
    state: "idle" | "saving" | "saved" | "error";
    message: string;
  }
>;

const STORAGE_KEY = "malones-pool-tournament-bracket-v3";
const SCORE_API_ENDPOINT = "/api/pool-tournament/scores";

const firstRoundPlayers = [
  "Missy",
  "Roger",
  "Brendan",
  "Hank",
  "Robbie",
  "Oscar",
  "Todd",
  "Race",
  "Matt",
  "Collin",
  "Chelsey",
  "Joe",
  "Jeremy",
  "Mack",
  "Tolley",
  "Rodney",
];

const thisWeekBracketSlots: BracketState = {
  "w2-1-a": { name: "Roger", score: "" },
  "w2-1-b": { name: "Hank", score: "" },
  "w2-2-a": { name: "Oscar", score: "" },
  "w2-2-b": { name: "Jeremy", score: "" },
  "w2-3-a": { name: "Race", score: "" },
  "w2-3-b": { name: "Joe", score: "" },
  "w2-4-a": { name: "Collin", score: "" },
  "w2-4-b": { name: "Tolley", score: "" },
  "l1-1-a": { name: "Todd", score: "" },
  "l1-1-b": { name: "Missy", score: "" },
  "l1-2-a": { name: "Brendan", score: "" },
  "l1-2-b": { name: "Rodney", score: "" },
  "l1-3-a": { name: "Robbie", score: "" },
  "l1-3-b": { name: "Matt", score: "" },
  "l1-4-a": { name: "Chelsey", score: "" },
  "l1-4-b": { name: "Mack", score: "" },
  "w3-1-a": { name: "Oscar", score: "" },
  "w3-1-b": { name: "Race", score: "" },
  "w3-2-a": { name: "Collin", score: "" },
  "w3-2-b": { name: "Roger", score: "" },
  "l2-1-a": { name: "Brendan", score: "" },
  "l2-1-b": { name: "Jeremy", score: "" },
  "l2-2-a": { name: "Missy", score: "" },
  "l2-2-b": { name: "Joe", score: "" },
  "l2-3-a": { name: "Mack", score: "" },
  "l2-3-b": { name: "Tolley", score: "" },
  "l2-4-a": { name: "Matt", score: "" },
  "l2-4-b": { name: "Hank", score: "" },
  "w4-1-a": { name: "Oscar", score: "" },
  "w4-1-b": { name: "Collin", score: "" },
  "l3-1-a": { name: "Brendan", score: "" },
  "l3-1-b": { name: "Matt", score: "" },
  "l3-2-a": { name: "Tolley", score: "" },
  "l3-2-b": { name: "Joe", score: "" },
  "l4-1-a": { name: "Matt", score: "" },
  "l4-1-b": { name: "Race", score: "" },
  "l4-2-a": { name: "Joe", score: "" },
  "l4-2-b": { name: "Roger", score: "" },
  "l6-1-b": { name: "Collin", score: "" },
  "g1-a": { name: "Oscar", score: "" },
};

const bracketColumns: BracketColumn[] = [
  {
    title: "Winners Round 1",
    subtitle: "16 players",
    matches: Array.from({ length: 8 }, (_, index) => ({
      id: `w1-${index + 1}`,
      title: `Match ${index + 1}`,
      slots: [
        {
          id: `seed-${index * 2 + 1}`,
          seed: index * 2 + 1,
          label: `Seed ${index * 2 + 1}`,
        },
        {
          id: `seed-${index * 2 + 2}`,
          seed: index * 2 + 2,
          label: `Seed ${index * 2 + 2}`,
        },
      ],
    })),
  },
  {
    title: "Winners Round 2",
    subtitle: "8 players",
    matches: Array.from({ length: 4 }, (_, index) => ({
      id: `w2-${index + 1}`,
      title: `Match ${index + 9}`,
      slots: [
        { id: `w2-${index + 1}-a`, label: "Winner" },
        { id: `w2-${index + 1}-b`, label: "Winner" },
      ],
    })),
  },
  {
    title: "Winners Semis",
    subtitle: "4 players",
    matches: Array.from({ length: 2 }, (_, index) => ({
      id: `w3-${index + 1}`,
      title: `Match ${index + 13}`,
      slots: [
        { id: `w3-${index + 1}-a`, label: "Winner" },
        { id: `w3-${index + 1}-b`, label: "Winner" },
      ],
    })),
  },
  {
    title: "Winners Final",
    subtitle: "2 players",
    matches: [
      {
        id: "w4-1",
        title: "Match 15",
        slots: [
          { id: "w4-1-a", label: "Winner" },
          { id: "w4-1-b", label: "Winner" },
        ],
      },
    ],
  },
  {
    title: "Losers Round 1",
    subtitle: "First loss",
    matches: Array.from({ length: 4 }, (_, index) => ({
      id: `l1-${index + 1}`,
      title: `Match ${index + 16}`,
      slots: [
        { id: `l1-${index + 1}-a`, label: "Loser" },
        { id: `l1-${index + 1}-b`, label: "Loser" },
      ],
    })),
  },
  {
    title: "Losers Round 2",
    subtitle: "8 players",
    matches: Array.from({ length: 4 }, (_, index) => ({
      id: `l2-${index + 1}`,
      title: `Match ${index + 20}`,
      slots: [
        { id: `l2-${index + 1}-a`, label: "Winner" },
        { id: `l2-${index + 1}-b`, label: "Loser" },
      ],
    })),
  },
  {
    title: "Losers Round 3",
    subtitle: "4 players",
    matches: Array.from({ length: 2 }, (_, index) => ({
      id: `l3-${index + 1}`,
      title: `Match ${index + 24}`,
      slots: [
        { id: `l3-${index + 1}-a`, label: "Winner" },
        { id: `l3-${index + 1}-b`, label: "Winner" },
      ],
    })),
  },
  {
    title: "Losers Round 4",
    subtitle: "4 players",
    matches: Array.from({ length: 2 }, (_, index) => ({
      id: `l4-${index + 1}`,
      title: `Match ${index + 26}`,
      slots: [
        { id: `l4-${index + 1}-a`, label: "Winner" },
        { id: `l4-${index + 1}-b`, label: "Loser" },
      ],
    })),
  },
  {
    title: "Losers Semis",
    subtitle: "2 players",
    matches: [
      {
        id: "l5-1",
        title: "Match 28",
        slots: [
          { id: "l5-1-a", label: "Winner" },
          { id: "l5-1-b", label: "Winner" },
        ],
      },
    ],
  },
  {
    title: "Losers Final",
    subtitle: "2 players",
    matches: [
      {
        id: "l6-1",
        title: "Match 29",
        slots: [
          { id: "l6-1-a", label: "Winner" },
          { id: "l6-1-b", label: "Loser" },
        ],
      },
    ],
  },
  {
    title: "Championship",
    subtitle: "Final table",
    matches: [
      {
        id: "g1",
        title: "Grand Final",
        slots: [
          { id: "g1-a", label: "Winners bracket" },
          { id: "g1-b", label: "Losers bracket" },
        ],
      },
      {
        id: "g2",
        title: "Reset Match",
        slots: [
          { id: "g2-a", label: "If needed" },
          { id: "g2-b", label: "If needed" },
        ],
      },
    ],
  },
];

const bracketGroups: BracketGroup[] = [
  {
    title: "Winners Bracket",
    columns: bracketColumns.slice(0, 4),
  },
  {
    title: "Losers Bracket",
    columns: bracketColumns.slice(4, 10),
  },
  {
    title: "Championship",
    columns: bracketColumns.slice(10),
  },
];

function emptySlot(): SlotValue {
  return { name: "", score: "" };
}

function defaultBracketState(): BracketState {
  const firstRoundSlots = firstRoundPlayers.reduce<BracketState>(
    (slots, name, index) => {
      slots[`seed-${index + 1}`] = { name, score: "" };
      return slots;
    },
    {},
  );

  return {
    ...firstRoundSlots,
    ...thisWeekBracketSlots,
  };
}

function mergeBracketState(defaults: BracketState, saved: BracketState) {
  const nextBracket = { ...saved };

  Object.entries(defaults).forEach(([slotId, defaultValue]) => {
    nextBracket[slotId] = {
      name: defaultValue.name,
      score: saved[slotId]?.score ?? defaultValue.score,
    };
  });

  return nextBracket;
}

export default function PoolTournamentBracket() {
  const [bracket, setBracket] = useState<BracketState>(() => {
    const defaults = defaultBracketState();

    if (typeof window === "undefined") {
      return defaults;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaults;
    }

    try {
      return mergeBracketState(defaults, JSON.parse(saved) as BracketState);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaults;
    }
  });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({});

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bracket));
  }, [bracket]);

  useEffect(() => {
    let isMounted = true;

    async function loadSavedScores() {
      try {
        const response = await fetch(SCORE_API_ENDPOINT, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load saved scores.");
        }

        const data = (await response.json()) as {
          scores?: Record<string, { score?: string }>;
        };

        if (!isMounted || !data.scores) {
          return;
        }

        setBracket((current) => {
          const nextBracket = { ...current };

          Object.entries(data.scores ?? {}).forEach(([slotId, value]) => {
            nextBracket[slotId] = {
              ...emptySlot(),
              ...nextBracket[slotId],
              score: value.score ?? "",
            };
          });

          return nextBracket;
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setSaveStatus((current) => ({
          ...current,
          bracket: {
            state: "error",
            message: "Saved scores could not be loaded.",
          },
        }));
      }
    }

    loadSavedScores();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateSlot(id: string, field: keyof SlotValue, value: string) {
    setBracket((current) => ({
      ...current,
      [id]: {
        ...emptySlot(),
        ...current[id],
        [field]: value,
      },
    }));
  }

  function getSlotValue(slot: PlayerSlot) {
    return bracket[slot.id] ?? emptySlot();
  }

  async function saveMatchScore(match: BracketMatch) {
    const [playerOne, playerTwo] = match.slots;
    const playerOneValue = getSlotValue(playerOne);
    const playerTwoValue = getSlotValue(playerTwo);
    const scoreOne = playerOneValue.score.trim();
    const scoreTwo = playerTwoValue.score.trim();

    if (!scoreOne || !scoreTwo) {
      setSaveStatus((current) => ({
        ...current,
        [match.id]: {
          state: "error",
          message: "Enter both scores first.",
        },
      }));
      return;
    }

    setSaveStatus((current) => ({
      ...current,
      [match.id]: {
        state: "saving",
        message: "Saving score...",
      },
    }));

    try {
      const response = await fetch(SCORE_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: match.id,
          scores: {
            [playerOne.id]: scoreOne,
            [playerTwo.id]: scoreTwo,
          },
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        scores?: Record<string, { score?: string }>;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save score.");
      }

      if (data.scores) {
        setBracket((current) => {
          const nextBracket = { ...current };

          Object.entries(data.scores ?? {}).forEach(([slotId, value]) => {
            nextBracket[slotId] = {
              ...emptySlot(),
              ...nextBracket[slotId],
              score: value.score ?? "",
            };
          });

          return nextBracket;
        });
      }

      setSaveStatus((current) => ({
        ...current,
        [match.id]: {
          state: "saved",
          message: "Score saved to the site.",
        },
      }));
    } catch (error) {
      setSaveStatus((current) => ({
        ...current,
        [match.id]: {
          state: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to save score right now.",
        },
      }));
    }
  }

  return (
    <section id="bracket" className="border-y border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">
              Live Bracket
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              16-Player Double Elimination
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#rules"
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-neutral-950 transition hover:bg-green-400"
            >
              Rules
            </a>
          </div>
        </div>

        <div className="mt-8 space-y-10">
          {saveStatus.bracket?.message ? (
            <p className="rounded-lg border border-red-300/30 bg-red-950/40 px-4 py-3 text-sm font-bold text-red-200">
              {saveStatus.bracket.message}
            </p>
          ) : null}

          {bracketGroups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.16em] text-white">
                {group.title}
              </h3>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {group.columns.map((column) => (
                  <div key={column.title} className="flex flex-col gap-4">
                    <div className="min-h-16 border-b border-white/10 pb-3">
                      <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">
                        {column.title}
                      </h4>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                        {column.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-4">
                      {column.matches.map((match) => (
                        <div
                          key={match.id}
                          className="rounded-lg border border-white/10 bg-neutral-900 p-3 shadow-xl shadow-black/20"
                        >
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-green-300">
                            {match.title}
                          </p>
                          <div className="space-y-2">
                            {match.slots.map((slot) => {
                              const value = bracket[slot.id] ?? emptySlot();

                              return (
                                <div
                                  key={slot.id}
                                  className="grid grid-cols-[minmax(0,1fr)_3.5rem] gap-2"
                                >
                                  <div
                                    id={`${slot.id}-name`}
                                    className="min-w-0 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm font-semibold text-white"
                                  >
                                    {value.name ||
                                      (slot.seed ? `Seed ${slot.seed}` : slot.label)}
                                  </div>
                                  <label
                                    className="sr-only"
                                    htmlFor={`${slot.id}-score`}
                                  >
                                    Score
                                  </label>
                                  <input
                                    id={`${slot.id}-score`}
                                    value={value.score}
                                    onChange={(event) =>
                                      updateSlot(
                                        slot.id,
                                        "score",
                                        event.target.value,
                                      )
                                    }
                                    placeholder="0"
                                    inputMode="numeric"
                                    className="min-w-0 rounded-md border border-white/10 bg-black/50 px-2 py-2 text-center text-sm font-black text-white outline-none transition placeholder:text-neutral-700 focus:border-green-300"
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-3 flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => saveMatchScore(match)}
                              disabled={saveStatus[match.id]?.state === "saving"}
                              className="self-start rounded-md bg-green-500 px-3 py-1.5 text-xs font-black text-neutral-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
                            >
                              {saveStatus[match.id]?.state === "saving"
                                ? "Saving..."
                                : "Save Score"}
                            </button>
                            {saveStatus[match.id]?.message ? (
                              <p
                                className={
                                  saveStatus[match.id]?.state === "error"
                                    ? "text-xs font-bold text-red-300"
                                    : "text-xs font-bold text-green-300"
                                }
                              >
                                {saveStatus[match.id]?.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
