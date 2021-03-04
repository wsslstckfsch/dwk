namespace Core.Entities.OrderAggregate
{
  public class ShippingAddress
  {
    public ShippingAddress(string fullName, string addressLine1, string streetAddress, string city, string zip,
      string country)
    {
      FullName = fullName;
      AddressLine1 = addressLine1;
      StreetAddress = streetAddress;
      City = city;
      Zip = zip;
      Country = country;
    }

    public ShippingAddress()
    {
    }

    public string FullName { get; set; }
    public string AddressLine1 { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }
  }
}