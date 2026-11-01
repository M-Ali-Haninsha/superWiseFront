# SuperWise

Frontend for **SuperWise**, a services marketplace where clients hire verified
workers, follow the work's progress, chat in real time and pay online. Workers
manage requests and update progress; admins verify workers and handle complaints.

Live: https://superwise.vercel.app · API: [superWiseBack](https://github.com/M-Ali-Haninsha/superWiseBack)

## Stack

Angular 21 · TypeScript (strict, no `any`) · NgRx · Angular Material ·
Tailwind CSS · Socket.IO client · Chart.js · Razorpay Checkout · Vitest

## Structure

```
src/app/
  core/            AuthService, auth interceptor, role guard, HTTP/table/notify helpers
  models/          typed API models (requests and responses)
  services/        one typed API service per area (user, worker, admin, chat)
  state/           NgRx store for the admin's worker lists (actions, reducer, effects)
  userComponents/  client pages: browse, hire, progress, payment, history
  workerComponents/ worker dashboard: inbox, accepted works, progress updates
  adminComponents/ admin dashboard: verification, users, categories, complaints
```

- Each API call declares which role's token it needs (`asRole('worker')`), and the
  interceptor attaches it. A 401 or a blocked account ends the session and
  returns to that role's login page.
- Routes are protected with `roleGuard('user' | 'worker' | 'admin')`.
- Payments open Razorpay Checkout, then the result is verified by the API before
  the success page is shown.

## Running locally

```bash
npm install
npm start        # http://localhost:4200
```

`ng serve` uses `src/environments/environment.development.ts`, which points at a
local API on `http://localhost:3000` (run `npm run dev` in superWiseBack).
Production builds use `environment.ts` (the Render API).

| Script | |
|---|---|
| `npm start` | dev server |
| `npm run build` | production build into `dist/project` |
| `npm test` | unit tests (Vitest) |
