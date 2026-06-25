# Reusable eCommerce Storefront

Customer-facing storefront for the **Reusable eCommerce** platform. Pairs with:

- [`reusable-ecommerce-backend`](../reusable-ecommerce-backend) — REST API
- [`reusable-ecommerce-admin`](../reusable-ecommerce-admin) — admin dashboard

This project started from the Hously real-estate React theme and is being converted into an API-driven ecommerce storefront.

## Tech stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default dev URL: `http://localhost:5173`

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API origin (default `http://localhost:5000`) |
| `VITE_CART_SESSION_KEY` | `localStorage` key for anonymous cart session ID |

## API foundation (Storefront-1)

| Module | Path | Purpose |
|--------|------|---------|
| API config | `src/lib/apiConfig.js` | Base URL + cart session key |
| API client | `src/lib/apiClient.js` | `fetch` wrapper, unwraps `{ success, message, data }` |
| Public settings | `src/api/publicSettingsApi.js` | `GET /api/public/settings` |
| Cart session | `src/lib/cartSession.js` | Stable `sessionId` for cart API routes |

Catalog, cart UI, and checkout integration are planned in later phases.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
