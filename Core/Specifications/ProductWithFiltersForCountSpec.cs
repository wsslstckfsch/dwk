using Core.Entities;

namespace Core.Specifications
{
  public class ProductWithFiltersForCountSpec : BaseSpec<Product>
  {
    public ProductWithFiltersForCountSpec(ProductSpecParams productParams)
      : base(x =>
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
        !productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId
      )
    {
    }
  }
}