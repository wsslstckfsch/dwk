dotnet ef commands to run:

Create databases:
dotnet ef migrations add IdentityInit -p Infrastructure -s API -c AppIdentityDbContext -o Identity/Migrations
dotnet ef database update -p Infrastructure -s API -c AppIdentityDbContext

dotnet ef migrations add Init -p Infrastructure -s API -c StoreContext -o Data/Migrations
dotnet ef database update -p Infrastructure -s API -c StoreContext

Run API and seed data:
dotnet watch run -p API

Run Redis db [https://markheath.net/post/exploring-redis-with-docker]:
docker exec -it redis1 sh
redis-cli

Test Stripe Webhook locally:
stripe listen -f https://localhost:5001/api/payments/webhook
stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded,payment_intent.payment_failed