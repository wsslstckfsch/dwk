namespace Core.Entities
{
  public class ProductImage : BaseEntity
  {
    public string ImageUrl { get; set; }

    public Product Product { get; set; }
    public int ProductId { get; set; }
  }
}