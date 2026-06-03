"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import {
  type Post,
  type Profile,
  DEFAULT_PROFILE,
  sortPosts,
} from "@/lib/mural";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileEditor } from "@/components/ProfileEditor";
import { Composer } from "@/components/Composer";
import { PostCard } from "@/components/PostCard";

const STORAGE_KEY = "mural-social:v1";

interface Persisted {
  profile: Profile;
  posts: Post[];
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [posts, setPosts] = useState<Post[]>([]);
  const [now, setNow] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  // Carrega perfil + posts e marca o "agora".
  useEffect(() => {
    setNow(Date.now());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: Persisted = JSON.parse(raw);
        setProfile(data.profile ?? DEFAULT_PROFILE);
        setPosts(data.posts ?? []);
      }
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  // Atualiza o "agora" a cada minuto pra manter os horários relativos vivos.
  useEffect(() => {
    if (!hydrated) return;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [hydrated]);

  // Persiste perfil + posts juntos.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, posts }));
    } catch {
      /* cota cheia / modo privado */
    }
  }, [profile, posts, hydrated]);

  const feed = useMemo(() => sortPosts(posts), [posts]);

  function addPost(text: string) {
    setPosts((prev) => [
      { id: crypto.randomUUID(), text, createdAt: Date.now(), liked: false },
      ...prev,
    ]);
  }

  function toggleLike(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  if (!hydrated) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col gap-4 px-4 py-6">
      <ProfileHeader
        profile={profile}
        postCount={posts.length}
        onEdit={() => setEditorOpen(true)}
      />

      <Composer profile={profile} onPost={addPost} />

      {/* Feed */}
      {feed.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-white/40">
          <MessageSquareText size={30} strokeWidth={1.5} />
          <p className="text-sm">Seu mural está em branco. Publique a primeira mensagem!</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {feed.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                profile={profile}
                now={now}
                onToggleLike={() => toggleLike(post.id)}
                onDelete={() => deletePost(post.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      <ProfileEditor
        open={editorOpen}
        profile={profile}
        onClose={() => setEditorOpen(false)}
        onSave={(p) => {
          setProfile(p);
          setEditorOpen(false);
        }}
      />
    </main>
  );
}
