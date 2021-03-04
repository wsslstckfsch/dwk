using System.Collections.Generic;

namespace API.Dtos
{
  public class ProductToReturnDto
  {
    public int Id { get; set; }
    public string LangAlpha2 { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }
    public string Isbn { get; set; }
    public int Pages { get; set; }
    public string ProductType { get; set; }

    public List<ProductImageToReturnDto> Images { get; set; }
  }
}