"use client";

import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { type Post, type Profile, initials, relativeTime } from "@/lib/mural";

interface PostCardProps {
  post: Post;
  profile: Profile;
  now: number;
  onToggleLike: () => void;
  onDelete: () => void;
}

export function PostCard({ post, profile, now, onToggleLike, onDelete }: PostCardProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className="group flex gap-3 rounded-2xl bg-card p-4 ring-1 ring-white/10"
      style={{ backgroundColor: "var(--color-card)" }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: "var(--color-accent)" }}
        aria-hidden
      >
        {initials(profile.name)}
      </span>

      <div className="min-w-0 flex-1">
        {/* Cabeçalho */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="truncate font-bold">{profile.name}</span>
          <span className="truncate text-white/40">{profile.handle}</span>
          <span className="text-white/40">·</span>
          <span className="shrink-0 text-white/40">{relativeTime(post.createdAt, now)}</span>

          {/* Apagar (aparece no hover) */}
          <button
            onClick={onDelete}
            aria-label="Apagar publicação"
            className="ml-auto shrink-0 text-white/25 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Texto */}
        <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed">
          {post.text}
        </p>

        {/* Curtir */}
        <button
          onClick={onToggleLike}
          aria-label={post.liked ? "Descurtir" : "Curtir"}
          className={`mt-2 flex items-center gap-1.5 text-sm transition ${
            post.liked ? "text-rose-500" : "text-white/40 hover:text-rose-400"
          }`}
        >
          <Heart size={16} className={post.liked ? "fill-rose-500" : ""} />
          {post.liked ? "Curtido" : "Curtir"}
        </button>
      </div>
    </motion.li>
  );
}
