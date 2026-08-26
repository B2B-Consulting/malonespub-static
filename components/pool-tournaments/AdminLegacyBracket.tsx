import { LEGACY_BRACKET_ROUNDS } from "@/lib/pool-tournaments/legacy";
import type { BracketSlot } from "@/lib/pool-tournaments/types";

export default function AdminLegacyBracket({ slots }: { slots: Record<string, BracketSlot> }) {
  return (
    <details className="mt-6 rounded-xl border border-violet-300/20 bg-violet-950/15 p-5">
      <summary className="cursor-pointer text-lg font-black text-violet-200">View archived bracket and scores</summary>
      <p className="mt-2 text-sm text-neutral-400">Private historical snapshot. The legacy player names and scores are displayed read-only.</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {LEGACY_BRACKET_ROUNDS.map((round) => (
          <section key={round.title}>
            <h4 className="border-b border-white/10 pb-2 text-xs font-black uppercase tracking-wider text-violet-200">{round.title}</h4>
            <div className="mt-3 space-y-3">
              {round.matches.map((match) => (
                <div key={match.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <p className="mb-2 text-xs font-bold text-neutral-500">{match.title}</p>
                  {match.slotIds.map((slotId) => <div key={slotId} className="mt-1 grid grid-cols-[1fr_3rem] gap-2 rounded bg-white/5 px-3 py-2 text-sm"><span>{slots[slotId]?.name || "—"}</span><span className="text-center font-black">{slots[slotId]?.score || "—"}</span></div>)}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}
