using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class UserManagerExtensions
  {
    public static async Task<AppUser> FindUserWithAddressesByClaimAsync(this UserManager<AppUser> input,
      ClaimsPrincipal user)
    {
      var email = user.FindFirstValue(ClaimTypes.Email);

      return await input.Users
        .Include(x => x.ShippingAddress)
        .SingleOrDefaultAsync(x => x.Email == email);
    }

    public static async Task<AppUser> FindUserByClaimAsync(this UserManager<AppUser> input,
      ClaimsPrincipal user)
    {
      var email = user.FindFirstValue(ClaimTypes.Email);

      return await input.Users
        .SingleOrDefaultAsync(x => x.Email == email);
    }
  }
}