dotnet ef commands to run:

Run API:
dotnet watch run -API

Create databases:
dotnet ef migrations add Init -p Infrastructure -s API -c StoreContext -o Data/Migrations
dotnet ef database update -p Infrastructure -s API -c StoreContext

dotnet ef migrations add IdentityInit -p Infrastructure -s API -c AppIdentityDbContext -o Identity/Migrations
dotnet ef database update -p Infrastructure -s API -c AppIdentityDbContext