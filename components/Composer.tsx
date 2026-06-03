"use client";

import { useState } from "react";
import { type Profile, MAX_LENGTH, initials } from "@/lib/mural";

interface ComposerProps {
  profile: Profile;
  onPost: (text: string) => void;
}

export function Composer({ profile, onPost }: ComposerProps) {
  const [text, setText] = useState("");

  const remaining = MAX_LENGTH - text.length;
  const overLimit = remaining < 0;
  const canPost = text.trim().length > 0 && !overLimit;

  // Anel de progresso do limite de caracteres.
  const radius = 9;
  const circ = 2 * Math.PI * radius;
  const ratio = Math.min(text.length / MAX_LENGTH, 1);
  const ringColor = overLimit ? "#ef4444" : remaining <= 20 ? "#f59e0b" : "#3b82f6";

  function submit() {
    if (!canPost) return;
    onPost(text.trim());
    setText("");
  }

  return (
    <div className="flex gap-3 rounded-2xl bg-card p-4 ring-1 ring-white/10" style={{ backgroundColor: "var(--color-card)" }}>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: "var(--color-accent)" }}
        aria-hidden
      >
        {initials(profile.name)}
      </span>

      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que você está pensando?"
          rows={2}
          className="w-full resize-none bg-transparent text-base outline-none placeholder:text-white/30"
        />

        <div className="mt-2 flex items-center justify-end gap-3">
          {/* Contador circular */}
          {text.length > 0 && (
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
                <circle cx="12" cy="12" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
                <circle
                  cx="12"
                  cy="12"
                  r={radius}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - ratio)}
                />
              </svg>
              {remaining <= 20 && (
                <span className={`text-xs tabular-nums ${overLimit ? "text-red-400" : "text-white/50"}`}>
                  {remaining}
                </span>
              )}
            </div>
          )}

          <button
            onClick={submit}
            disabled={!canPost}
            className="rounded-full px-5 py-2 text-sm font-bold text-white transition active:scale-95 disabled:opacity-30"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
