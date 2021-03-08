# If existing:
Remove Docker image DWK
Remove Migrations folders

# Start docker services - Redis and Postgres:
docker-compose up --detach

# Create migrations:
dotnet ef migrations add "Init" -p .\Infrastructure\ -s .\API\ -c StoreContext -o Data/Migrations
dotnet ef migrations add "Init" -p .\Infrastructure\ -s .\API\ -c AppIdentityDbContext -o Identity/Migrations
dotnet watch run -p API

# Run API, create databases, apply migrations and seed data:
dotnet watch run -p API

# Inspect databases:çzxcjhvgú"ð§A:I!W%EQ[]
# Inspect Redis data:
http://127.0.0.1:8081/
username: root
password: secret

# Test Stripe Webhook locally via Stripe CLI [https://stripe.com/docs/stripe-cli]:
stripe listen -f https://localhost:5001/api/payments/webhook
stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded
payment_intent.payment_failed

# Build Angular app:
cd client
npm run build

# Publish API:
dotnet publish -c Release -o Publish dwk.sln

Misc:
dotnet ef database update 0 -p Infrastructure -s API -c StoreContext
dotnet ef migrations remove -p Infrastructure -s API -c StoreContext
dotnet ef database update 0 -p Infrastructure -s API -c AppIdentityDbContext
dotnet ef migrations remove -p Infrastructure -s API -c AppIdentityDbContext