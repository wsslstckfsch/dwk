using Core.Entities;

namespace Core.Specifications
{
  public class ProductWithTypeAndImagesSpec : BaseSpec<Product>
  {
    public ProductWithTypeAndImagesSpec(ProductSpecParams productParams)
      : base(x =>
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
        !productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId
      )
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.Images);
      ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

      if (!string.IsNullOrEmpty(productParams.Sort))
        switch (productParams.Sort)
        {
          case "priceAsc":
            AddOrderBy(p => p.Price);
            break;
          case "priceDesc":
            AddOrderByDescending(p => p.Price);
            break;
          default:
            AddOrderBy(p => p.Name);
            break;
        }
    }

    public ProductWithTypeAndImagesSpec(int id) : base(x => x.Id == id)
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.Images);
    }
  }
}