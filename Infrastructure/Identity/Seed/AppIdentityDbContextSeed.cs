using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Seed
{
  public class AppIdentityDbContextSeed
  {
    public static async Task SeedAsync(UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var user = new AppUser
        {
          DisplayName = "Bob",
          Email = "bob@test.com",
          UserName = "bob@test.com",
          ShippingAddress = new ShippingAddress
          {
            FullName = "Bob Bobbity",
            StreetAddress = "10 The Street",
            City = "New York",
            Zip = "90210",
            Country = "US"
          }
        };

        await userManager.CreateAsync(user, "Pa$$w0rd");
      }
    }
  }
}