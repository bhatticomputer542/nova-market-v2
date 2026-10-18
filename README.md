# Nova Market v2

Responsive fashion storefront starter with product search/categories, cart, COD checkout, product admin, and order status management.

## Run locally
1. Install Node.js 18+.
2. Open a terminal in this folder and run `npm start`.
3. Visit `http://localhost:3000`.
4. Admin: `http://localhost:3000/admin.html`.

## Deployment
Set these environment variables in Railway:
- `ADMIN_KEY`: long private password; do not use the default.
- `SUPABASE_URL`: your Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: secret server-side key only. Never put it in frontend code or GitHub.
- `PORT`: Railway supplies this automatically.

If Supabase settings are absent, the app uses local JSON demo data. Local files may not persist on Railway, so configure Supabase before real use.

## Supabase
Run `supabase.sql` in Supabase SQL Editor. The app uses the service-role key server-side. Keep it private and do not add public write policies.

## Payments
Cash on Delivery is implemented. Online payment UI/provider integration is not activated by default because a real payment gateway account and server credentials are required. Do not mark an order paid until a verified provider callback/webhook confirms payment.

## Before launch
- Change ADMIN_KEY.
- Add Supabase secrets to Railway.
- Test product create/edit/delete and checkout.
- Add real online payment provider credentials and verify webhooks.
- Add store contact, delivery, privacy and return policies.
