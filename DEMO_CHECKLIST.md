# Cross-repo demo checklist

This storefront is part of a three-repo ecommerce stack. See the **canonical** end-to-end checklist:

**[reusable-ecommerce-backend/DEMO_CHECKLIST.md](../reusable-ecommerce-backend/DEMO_CHECKLIST.md)**

---

## Storefront-specific quick start

1. Ensure backend is running on http://localhost:5000
2. Ensure admin has configured store settings, products, and payment method (shipping optional)
3. From this directory: `npm install` → `cp .env.example .env` → `npm run dev`
4. Open the dev URL (often http://localhost:5174 if admin uses 5173)

## Storefront demo checklist

- [ ] Homepage — CMS banners, category showcase, deduped product rows
- [ ] Scroll — category icon nav hides icons smoothly; no mega menu
- [ ] `/shop` — search, category filter, sort; shop cover if CMS `shop` page published
- [ ] `/categories` — browse departments
- [ ] Product detail — Add to cart, Buy Now
- [ ] Cart → Checkout → guest order → order success
- [ ] Favicon/logo from store settings
- [ ] Confirm order in admin **Orders**

## Environment

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CART_SESSION_KEY=reusable_cart_session
```

## Known demo limitations

- Guest checkout only (no customer login)
- No live payment gateway
- Shop cover requires admin CMS page slug `shop`
- Shipping optional — depends on Store Settings
- Variants display-only on PDP for cart in most flows
- Recently viewed is browser-local only
