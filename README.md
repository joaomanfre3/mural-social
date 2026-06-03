# 💬 Mural

Uma mini rede social pessoal. Monte seu perfil, poste pensamentos curtos, curta e organize seu feed — tudo roda só no seu navegador, sem cadastro e sem servidor.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)

## O que faz

- **Perfil editável** com nome, usuário (@) e avatar de iniciais
- **Publicar mensagens** de até 280 caracteres, com contador circular
- **Feed** em ordem cronológica, com horário relativo ("agora", "5 min", "2 h")
- **Curtir** e **apagar** publicações
- **Salva sozinho** no navegador — seu mural continua lá
- 100% **responsivo**

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide. Sem banco — perfil e publicações ficam no `localStorage`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy

Pronto pra Vercel — importe o repositório, build padrão (`next build`), zero variáveis de ambiente.

---

Feito por [@joaomanfre3](https://github.com/joaomanfre3).
