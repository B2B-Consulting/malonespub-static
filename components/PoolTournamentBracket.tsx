"use client";

import { useState, type FormEvent } from "react";
import { BRACKET_GROUPS, slotPlaceholder } from "@/lib/pool-tournaments/bracket";
import type { PublicTournamentBracket } from "@/lib/pool-tournaments/types";

type SaveResult = (matchId: string, a: number, b: number) => Promise<void>;

export default function PoolTournamentBracket({ bracket: initialBracket, onSave, allowPublicScoreEntry = false }: { bracket: PublicTournamentBracket; onSave?: SaveResult; allowPublicScoreEntry?: boolean }) {
  const [publicBracket, setPublicBracket] = useState(initialBracket);
  const bracket = allowPublicScoreEntry ? publicBracket : initialBracket;

  async function savePublicResult(matchId: string, a: number, b: number) {
    const response = await fetch("/api/pool-tournament/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, a, b, drawnAt: bracket.drawnAt }),
    });
    const body = (await response.json()) as { bracket?: PublicTournamentBracket; error?: string };
    if (!response.ok || !body.bracket) throw new Error(body.error || "Unable to save score.");
    setPublicBracket(body.bracket);
  }

  const saveResult = onSave ?? (allowPublicScoreEntry ? savePublicResult : undefined);

  return (
    <section id={onSave ? undefined : "bracket"} className="scroll-mt-24 border-y border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">Tournament bracket</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">16-Player Double Elimination</h2>
            <p className="mt-3 max-w-2xl leading-7 text-neutral-300">{allowPublicScoreEntry ? "After your match, enter the final 2–0 or 2–1 score below and save it. The bracket will advance both players automatically." : "First-round matchups were randomly drawn. Play your assigned match Monday through Sunday and report the final score to the bartender or organizer."}</p>
          </div>
          {!onSave ? <a href="#rules" className="self-start rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-neutral-950 hover:bg-green-400">Rules</a> : null}
        </div>
        {bracket.champion ? <p className="mt-6 rounded-lg border border-green-300/30 bg-green-950/40 px-5 py-4 text-xl font-black text-green-200">Tournament champion: {bracket.champion}</p> : null}
        <div className="mt-8 space-y-10">
          {BRACKET_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.16em]">{group.title}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {group.rounds.map((round) => (
                  <div key={round.title} className="flex min-w-0 flex-col gap-4">
                    <h4 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.12em]">{round.title}</h4>
                    <div className="flex flex-1 flex-col gap-4">
                      {round.matches.map((match) => {
                        const slots = match.slotIds.map((id) => bracket.slots[id]);
                        return (
                          <div key={match.id} className="rounded-lg border border-white/10 bg-neutral-900 p-3 shadow-xl shadow-black/20">
                            <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-green-300">{match.title}</p>
                            {saveResult && slots.every((slot) => slot?.name) ? (
                              <MatchScoreForm key={slots.map((slot) => slot.name).join("|")} matchId={match.id} names={slots.map((slot) => slot.name)} scores={slots.map((slot) => slot.score)} onSave={saveResult} />
                            ) : (
                              <div className="space-y-2">
                                {match.slotIds.map((id, index) => (
                                  <div key={id} className="grid grid-cols-[minmax(0,1fr)_3rem] gap-2">
                                    <span className={`min-w-0 break-words rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm font-semibold ${slots[index]?.name ? "text-white" : "text-neutral-400"}`}>{slots[index]?.name || slotPlaceholder(match, index)}</span>
                                    <span aria-label={`${slots[index]?.name || slotPlaceholder(match, index)} score`} className="rounded-md border border-white/10 bg-black/50 px-2 py-2 text-center text-sm font-black">{slots[index]?.score || "—"}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {match.id === "g2" ? <p className="mt-3 text-sm leading-5 text-neutral-400">Played only if the losers bracket winner wins the Grand Final.</p> : null}
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
    </section>
  );
}

function MatchScoreForm({ matchId, names, scores, onSave }: { matchId: string; names: string[]; scores: string[]; onSave: SaveResult }) {
  const [values, setValues] = useState(scores);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true); setError(""); setSaved(false);
    try { await onSave(matchId, Number(values[0]), Number(values[1])); setSaved(true); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to save score."); }
    finally { setSaving(false); }
  }
  return (
    <form onSubmit={submit}>
      <div className="space-y-2">
        {names.map((name, index) => <label key={index} className="grid grid-cols-[minmax(0,1fr)_3.5rem] gap-2"><span className="min-w-0 break-words rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm font-semibold">{name}<span className="sr-only"> score</span></span><input type="number" min="0" max="2" required inputMode="numeric" value={values[index]} onChange={(event) => setValues((current) => current.map((value, slot) => slot === index ? event.target.value : value))} className="min-w-0 rounded-md border border-white/10 bg-black/50 px-2 py-2 text-center text-sm font-black outline-none focus:border-green-300" /></label>)}
      </div>
      <button disabled={saving} className="mt-3 rounded-md bg-green-500 px-3 py-2 text-sm font-black text-neutral-950 hover:bg-green-400 disabled:opacity-50">{saving ? "Saving…" : "Save Score"}</button>
      {saved ? <p role="status" className="mt-2 text-sm font-bold text-green-300">Score saved.</p> : null}
      {error ? <p role="alert" className="mt-2 text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
