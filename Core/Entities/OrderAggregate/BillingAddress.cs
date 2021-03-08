namespace Core.Entities.OrderAggregate
{
  public class BillingAddress
  {
    public BillingAddress(string fullName, string uid, string addressLine1, string streetAddress, string city, string zip,
      string country)
    {
      FullName = fullName;
      Uid = uid;
      AddressLine1 = addressLine1;
      StreetAddress = streetAddress;
      City = city;
      Zip = zip;
      Country = country;
    }

    public BillingAddress()
    {
    }

    public string FullName { get; set; }
    public string Uid { get; set; }
    public string AddressLine1 { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }
  }
}