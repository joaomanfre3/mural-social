"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type Profile, sanitizeHandle } from "@/lib/mural";

interface ProfileEditorProps {
  open: boolean;
  profile: Profile;
  onClose: () => void;
  onSave: (profile: Profile) => void;
}

export function ProfileEditor({ open, profile, onClose, onSave }: ProfileEditorProps) {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);

  useEffect(() => {
    if (open) {
      setName(profile.name);
      setHandle(profile.handle);
    }
  }, [open, profile]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalName = name.trim() || "Você";
    onSave({ name: finalName, handle: sanitizeHandle(handle) });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-3xl p-5 pb-8 shadow-2xl ring-1 ring-white/10"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Editar perfil</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <label className="mb-1 block text-sm font-medium text-white/60">Nome</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className="mb-3 w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-accent"
            />

            <label className="mb-1 block text-sm font-medium text-white/60">Usuário</label>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              maxLength={21}
              className="mb-4 w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-accent"
            />

            <button
              type="submit"
              className="h-12 w-full rounded-xl text-base font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Salvar
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
}
