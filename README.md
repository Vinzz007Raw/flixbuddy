# FlixBuddy

**Never watch alone unless you want to.**

Hyderabad-first social movie seat sharing app — find companions, share extra seats, and chat safely with ticket proof.

## Live demo

Deployed on Vercel (see latest deployment).

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Demo login

1. Open Profile or Post
2. Enter name + 10-digit phone
3. OTP: `123456` (or any 6 digits)

Data persists in browser `localStorage` key `flixbuddy-v1`.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS 4
- Demo state: client store + localStorage
- Planned: Supabase Auth, DB, Storage, Realtime

## Disclaimer

FlixBuddy is a social connector, not a ticket marketplace. Always verify tickets and follow theater policies.
