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

const STORAGE_KEY = "malones-pool-tournament-bracket-v3";

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
  "Brittany",
];

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
  return firstRoundPlayers.reduce<BracketState>((slots, name, index) => {
    slots[`seed-${index + 1}`] = { name, score: "" };
    return slots;
  }, {});
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
      return { ...defaults, ...(JSON.parse(saved) as BracketState) };
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaults;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bracket));
  }, [bracket]);

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
