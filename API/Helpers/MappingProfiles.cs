using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Product, ProductToReturnDto>()
        .ForMember(d => d.ProductType,
          o => o.MapFrom(s => s.ProductType.Name))
        .ForMember(d => d.ImageUrl,
          o => o.MapFrom<ProductImageUrlResolver>());
      CreateMap<ProductImage, ProductImageToReturnDto>();

      CreateMap<ShippingAddress, ShippingAddressToReturnDto>().ReverseMap();

      CreateMap<CustomerBasketDto, CustomerBasket>();
      CreateMap<BasketItemDto, BasketItem>();
    }
  }
}