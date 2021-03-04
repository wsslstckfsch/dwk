using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
  public class ShippingAddress
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public string AddressLine1 { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }

    [Required] public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
  }
}