# Reusable eCommerce Storefront (VELMORA)

React customer storefront for the **Reusable eCommerce** platform. Default demo branding is **VELMORA** — store name, logo, and favicon come from backend **Store Settings** when configured.

Live catalog, Flipkart-style category icon navigation, CMS-driven homepage and shop hero, deduped product rows, cart, and guest checkout.

Pairs with:

- [`reusable-ecommerce-backend`](../reusable-ecommerce-backend) — REST API
- [`reusable-ecommerce-admin`](../reusable-ecommerce-admin) — admin dashboard

**Demo walkthrough:** **[DEMO_CHECKLIST.md](./DEMO_CHECKLIST.md)** (full checklist in backend repo).

---

## Role in the platform

Public ecommerce website:

- Browse products and categories
- Search, filter, and sort on `/shop`
- Icon-based category navigation (no mega menu)
- Add to cart and guest checkout
- Order confirmation

All catalog and branding data comes from the backend API. Content editors use **admin**; shoppers use this app.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 19, React Router 7 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |

---

## Prerequisites

- Node.js 18+
- Backend running on `http://localhost:5000`
- Admin configured with: published products, active payment method, store settings (shipping optional)

---

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

### Dev URL and port

Default Vite port is **5173**. If **admin** is already on 5173, storefront uses **5174**.

---

## Environment variables

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CART_SESSION_KEY=reusable_cart_session
```

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API origin (no trailing slash) |
| `VITE_CART_SESSION_KEY` | `localStorage` key for anonymous cart `sessionId` |

Set `VITE_API_BASE_URL` at **build time** for production.

---

## Pages & routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage — CMS banners, category showcase, product rows, promos |
| `/shop`, `/products` | Product listing — search, category filter, sort, pagination |
| `/categories` | Category browse landing |
| `/products/:slug` | Product detail (PDP) |
| `/cart` | Cart |
| `/checkout` | Guest checkout |
| `/order-success` | Order confirmation |
| `/contact` | Contact — details from public settings |
| `/terms`, `/privacy` | Legal placeholders |

Legacy theme routes redirect to shop or home.

---

## Branding

| Source | Behavior |
|--------|----------|
| Fallback | **VELMORA** name and mark when settings unavailable |
| Store settings API | Overrides store name, logo, favicon, contact, currency |

`StoreBrandingEffect` applies favicon from `GET /api/public/settings`.

---

## Homepage CMS

Loads `GET /api/public/pages/home`.

When published in admin (slug `home`, type `homepage`):

- Hero banners (3–4 recommended)
- Category showcase
- Dual promo images
- Final CTA image

**Fallback:** local defaults if CMS page is missing or unpublished.

### Product rows (deduped)

Homepage product sections use a shared tracker so rows do not repeat the same products:

| Row | Behavior |
|-----|----------|
| Today's Best Picks | Latest/featured products |
| Trending Deals | Discounted products only; excludes Best Picks |
| Category rows | Electronics, Fashion, Fitness (and extras if unique) |
| Recommended For You | Remaining unique products |

Max **8 products per row**. Trending row hidden if fewer than 3 discounted products exist.

---

## Shop CMS

Loads `GET /api/public/pages/shop`.

When admin publishes a page with slug **`shop`** and a **featured image**, `/shop` shows that cover in the toolbar hero.

**Fallback:** default shop hero when page is missing (404 from API is handled gracefully).

> Create and publish the shop CMS page in admin if you need a custom shop cover.

---

## Category navigation

Flipkart-style **icon + label** row below the header:

| Item | Behavior |
|------|----------|
| **For You** | Links to `/` (homepage) |
| Root categories | From API only — no subcategories in the nav row |
| Deals / New Arrivals | Quick links to shop |
| Scroll | Icons visible at top; hide when scrolled down (~80px); labels remain |
| Mega menu / dropdowns | **Removed** — direct links only |

Category images used when available; otherwise mapped icons from `react-icons`.

---

## Cart & checkout

**Guest checkout only** — no customer account login.

1. Anonymous `sessionId` in `localStorage`
2. Add to cart / Buy Now on PDP
3. Checkout → `POST /api/public/customers/checkout` (upsert guest)
4. **Shipping** — only when enabled in Store Settings; otherwise skipped
5. **Payment** — required when active payment methods exist
6. Place order → `POST /api/cart/:sessionId/checkout` → redirect to order success

---

## API integration (summary)

| Area | Endpoints |
|------|-----------|
| Catalog | `GET /api/public/products`, `/products/:slug`, `/categories` |
| CMS | `GET /api/public/pages/home`, `/pages/shop` |
| Settings | `GET /api/public/settings` |
| Cart | `/api/cart/:sessionId/...` |
| Guest customer | `POST /api/public/customers/checkout` |
| Order | `POST /api/cart/:sessionId/checkout` |

---

## Performance notes

- Header scroll listener updates state only when compact/sticky **mode changes** (not every pixel)
- `ProductCard` uses `React.memo` with safe field comparison (price, stock, image, title, etc.)
- Homepage rows memoized; duplicate product IDs filtered across sections

---

## Known limitations

- **No customer account login** — guest checkout only
- **No live payment gateway** — payment methods are selection records
- **No ratings/reviews**
- **Product variants** — display/read-only on PDP; cart adds parent/simple product flow
- **Recently viewed** — browser `localStorage` only
- **Shop cover** — requires CMS page slug `shop` published in admin
- **Coupons** — not on storefront cart UI
- **Maintenance mode** — admin toggle exists; not enforced on storefront yet
- **Terms / privacy** — basic placeholder pages
- **No automated tests** in this repo

---

## Production readiness

- Set `VITE_API_BASE_URL` to production API at build time
- HTTPS static hosting
- Coordinate with backend: CORS, JWT/admin security, SMTP for emails

See backend README **Security & demo warnings**.

---

## Related repositories

| Repo | Role |
|------|------|
| `reusable-ecommerce-backend` | API, cart, checkout, CMS public endpoints |
| `reusable-ecommerce-admin` | Manage products, CMS, settings, orders |

See **[../reusable-ecommerce-backend/DEMO_CHECKLIST.md](../reusable-ecommerce-backend/DEMO_CHECKLIST.md)** for the full three-repo demo.
