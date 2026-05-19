"use client";

import { FormEvent, useState } from "react";

type Props = {
  submitEmail: string;
  signupSubject: string;
  resultSubject: string;
};

function fieldValue(form: HTMLFormElement, name: string) {
  const value = new FormData(form).get(name);
  return typeof value === "string" ? value.trim() : "";
}

function openMailto(to: string, subject: string, lines: string[]) {
  const body = lines.filter(Boolean).join("\n");
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-green-400";

const labelClass = "text-sm font-semibold text-neutral-200";

export default function PoolTournamentForms({
  submitEmail,
  signupSubject,
  resultSubject,
}: Props) {
  const [signupSent, setSignupSent] = useState(false);
  const [resultSent, setResultSent] = useState(false);

  function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const lines = [
      "Pool tournament signup",
      "",
      `Name: ${fieldValue(form, "name")}`,
      `Phone: ${fieldValue(form, "phone")}`,
      `Email: ${fieldValue(form, "email")}`,
      `Nickname: ${fieldValue(form, "nickname")}`,
      `Notes: ${fieldValue(form, "notes")}`,
    ];

    setSignupSent(true);
    openMailto(submitEmail, signupSubject, lines);
  }

  function submitResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const lines = [
      "Pool tournament match result",
      "",
      `Reported by: ${fieldValue(form, "reporter")}`,
      `Match date: ${fieldValue(form, "matchDate")}`,
      `Player 1: ${fieldValue(form, "playerOne")}`,
      `Player 2: ${fieldValue(form, "playerTwo")}`,
      `Winner: ${fieldValue(form, "winner")}`,
      `Final score: ${fieldValue(form, "score")}`,
      `Notes: ${fieldValue(form, "notes")}`,
    ];

    setResultSent(true);
    openMailto(submitEmail, resultSubject, lines);
  }

  return (
    <div id="signup" className="grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={submitSignup}
        className="rounded-lg border border-white/10 bg-neutral-900/70 p-5"
      >
        <h2 className="text-2xl font-black">Sign Up</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          Add your name to the pool tournament list.
        </p>

        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Name
            <input className={inputClass} name="name" required />
          </label>

          <label className={labelClass}>
            Phone
            <input className={inputClass} name="phone" inputMode="tel" required />
          </label>

          <label className={labelClass}>
            Email
            <input className={inputClass} name="email" type="email" />
          </label>

          <label className={labelClass}>
            Nickname
            <input className={inputClass} name="nickname" />
          </label>

          <label className={labelClass}>
            Notes
            <textarea className={inputClass} name="notes" rows={4} />
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-green-500 px-5 py-3 font-bold text-neutral-950 transition hover:bg-green-400"
        >
          Submit Signup
        </button>

        {signupSent ? (
          <p className="mt-3 text-sm text-green-300">
            Your email app should open with the signup details ready to send.
          </p>
        ) : null}
      </form>

      <form
        id="report"
        onSubmit={submitResult}
        className="rounded-lg border border-white/10 bg-neutral-900/70 p-5"
      >
        <h2 className="text-2xl font-black">Report a Match</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          Send the result after a tournament match is complete.
        </p>

        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Reported by
            <input className={inputClass} name="reporter" required />
          </label>

          <label className={labelClass}>
            Match date
            <input className={inputClass} name="matchDate" type="date" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Player 1
              <input className={inputClass} name="playerOne" required />
            </label>

            <label className={labelClass}>
              Player 2
              <input className={inputClass} name="playerTwo" required />
            </label>
          </div>

          <label className={labelClass}>
            Winner
            <input className={inputClass} name="winner" required />
          </label>

          <label className={labelClass}>
            Final score
            <input className={inputClass} name="score" placeholder="Example: 3-1" />
          </label>

          <label className={labelClass}>
            Notes
            <textarea className={inputClass} name="notes" rows={4} />
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-white px-5 py-3 font-bold text-neutral-950 transition hover:bg-green-300"
        >
          Submit Match Result
        </button>

        {resultSent ? (
          <p className="mt-3 text-sm text-green-300">
            Your email app should open with the match result ready to send.
          </p>
        ) : null}
      </form>
    </div>
  );
}
