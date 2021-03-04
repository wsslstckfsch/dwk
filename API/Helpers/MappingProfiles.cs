using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

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

      CreateMap<Core.Entities.Identity.ShippingAddress, ShippingAddressToReturnDto>().ReverseMap();

      CreateMap<ShippingAddressToReturnDto, ShippingAddress>();

      CreateMap<CustomerBasketDto, CustomerBasket>();

      CreateMap<BasketItemDto, BasketItem>();

      CreateMap<Order, OrderToReturnDto>()
        .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
        .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));

      CreateMap<OrderItem, OrderItemDto>()
        .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
        .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
        .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.ItemOrdered.ImageUrl))
        .ForMember(d => d.ImageUrl,
          o => o.MapFrom<OrderItemImageUrlResolver>());
    }
  }
}