namespace Core.Entities.OrderAggregate
{
  public class ProductItemOrdered
  {
    public ProductItemOrdered(int productItemId, string productName, string imageUrl)
    {
      ProductItemId = productItemId;
      ProductName = productName;
      ImageUrl = imageUrl;
    }

    public ProductItemOrdered()
    {
    }

    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string ImageUrl { get; set; }
  }
}