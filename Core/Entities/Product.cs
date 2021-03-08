using System.Collections.Generic;

namespace Core.Entities
{
  public class Product : BaseEntity
  {
    public string LangAlpha2 { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal PriceB2c { get; set; }
    public decimal PriceB2b { get; set; }
    public string ImageUrl { get; set; }
    public string Isbn { get; set; }
    public int SliderImages { get; set; }
    public string DownloadLink { get; set; }

    public ProductType ProductType { get; set; }
    public int ProductTypeId { get; set; }
  }
}