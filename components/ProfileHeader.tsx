"use client";

import { Pencil } from "lucide-react";
import { type Profile, initials } from "@/lib/mural";

interface ProfileHeaderProps {
  profile: Profile;
  postCount: number;
  onEdit: () => void;
}

export function ProfileHeader({ profile, postCount, onEdit }: ProfileHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
      {/* Capa */}
      <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="bg-card px-4 pb-4" style={{ backgroundColor: "var(--color-card)" }}>
        <div className="flex items-end justify-between">
          {/* Avatar sobre a capa */}
          <span
            className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ring-4"
            style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 4px var(--color-card)" }}
            aria-hidden
          >
            {initials(profile.name)}
          </span>

          <button
            onClick={onEdit}
            className="mt-3 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold transition hover:bg-white/20"
          >
            <Pencil size={14} /> Editar perfil
          </button>
        </div>

        <h1 className="mt-2 text-xl font-extrabold">{profile.name}</h1>
        <p className="text-white/50">{profile.handle}</p>
        <p className="mt-2 text-sm text-white/60">
          <span className="font-bold text-white">{postCount}</span>{" "}
          {postCount === 1 ? "publicação" : "publicações"}
        </p>
      </div>
    </header>
  );
}
