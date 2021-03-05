Start docker services - Redis and Postgres:
docker-compose up --detach

Create migrations:
dotnet ef migrations add "Init" -p .\Infrastructure\ -s .\API\ -c StoreContext -o Data/Migrations
dotnet ef migrations add "Init" -p .\Infrastructure\ -s .\API\ -c AppIdentityDbContext -o Identity/Migrations

Run API, create databases, apply migrations and seed data:
dotnet watch run -p API

Inspect Redis data:
http://127.0.0.1:8081/
username: root
password: secret

Inspect databases:
http://localhost:8080/?pgsql=db&username=appuser
password: secret

Test Stripe Webhook locally via Stripe CLI [https://stripe.com/docs/stripe-cli]:
stripe listen -f https://localhost:5001/api/payments/webhook
stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded
payment_intent.payment_failed

Build Angular app:
cd client
npm run build

Publish API:
dotnet publish -c Release -o Publish dwk.sln