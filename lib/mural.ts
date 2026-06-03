// Tipos e utilidades do mural — lógica pura, sem React.

export interface Profile {
  name: string;
  handle: string;
}

export interface Post {
  id: string;
  text: string;
  createdAt: number;
  liked: boolean;
}

export const MAX_LENGTH = 280;

export const DEFAULT_PROFILE: Profile = {
  name: "Você",
  handle: "@voce",
};

/** Garante que o @ aparece uma vez e remove espaços/caracteres inválidos. */
export function sanitizeHandle(raw: string): string {
  const clean = raw.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
  return clean ? `@${clean}` : "@voce";
}

/** Iniciais pro avatar (até duas letras). */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase() || "?";
}

/**
 * Tempo relativo curto: "agora", "5 min", "2 h", "3 d".
 * Acima de 7 dias, mostra a data.
 */
export function relativeTime(createdAt: number, now: number): string {
  const diff = Math.max(0, now - createdAt);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "agora";
  if (min < 60) return `${min} min`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.floor(hours / 24);
  if (days <= 7) return `${days} d`;
  return new Date(createdAt).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

/** Ordena os posts do mais recente pro mais antigo. */
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.createdAt - a.createdAt);
}
