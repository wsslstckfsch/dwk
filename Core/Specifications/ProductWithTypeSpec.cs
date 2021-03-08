using Core.Entities;

namespace Core.Specifications
{
  public class ProductWithTypeSpec : BaseSpec<Product>
  {
    public ProductWithTypeSpec(ProductSpecParams productParams)
      : base(x =>
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
        !productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId
      )
    {
      AddInclude(x => x.ProductType);
      ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

      if (!string.IsNullOrEmpty(productParams.Sort))
        switch (productParams.Sort)
        {
          case "priceAsc":
            AddOrderBy(p => p.PriceB2c);
            break;
          case "priceDesc":
            AddOrderByDescending(p => p.PriceB2c);
            break;
          default:
            AddOrderBy(p => p.Name);
            break;
        }
    }

    public ProductWithTypeSpec(int id) : base(x => x.Id == id)
    {
      AddInclude(x => x.ProductType);
    }
  }
}