namespace API.Dtos
{
  public class OrderDto
  {
    public string BasketId { get; set; }
    public int DeliveryMethodId { get; set; }
    public ShippingAddressToReturnDto ShippingAddress { get; set; }
    public BillingAddressToReturnDto BillingAddress { get; set; }
  }
}