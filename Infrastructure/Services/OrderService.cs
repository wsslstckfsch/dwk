using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly IBasketRepo _basketRepo;
    private readonly IUnityOfWork _unityOfWork;

    public OrderService(IBasketRepo basketRepo, IUnityOfWork unityOfWork)
    {
      _basketRepo = basketRepo;
      _unityOfWork = unityOfWork;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId,
      ShippingAddress shippingAddress)
    {
      // get basket form the repo
      var basket = await _basketRepo.GetBasketByIdAsync(basketId);

      // get items from the product repo
      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        var productItem = await _unityOfWork.Repository<Product>().GetByIdAsync(item.Id);
        var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ImageUrl);
        var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
        items.Add(orderItem);
      }

      // get delivery method
      var deliveryMethod = await _unityOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

      // calc subtotal
      var subtotal = items.Sum(item => item.Price * item.Quantity);

      // create order
      var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
      _unityOfWork.Repository<Order>().Add(order);

      // save to db
      var result = await _unityOfWork.Complete();

      if (result <= 0)
      {
        return null;
      }
      
      // delete basket
      await _basketRepo.DeleteBasketAsync(basketId);
      
      // return order
      return order;
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpec(buyerEmail);

      return await _unityOfWork.Repository<Order>().GetAllWithSpecAsync(spec);
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpec(id, buyerEmail);

      return await _unityOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      return await _unityOfWork.Repository<DeliveryMethod>().GetAllAsync();
    }
  }
}