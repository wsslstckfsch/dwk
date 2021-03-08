using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Services
{
  public class PaymentService : IPaymentService
  {
    private readonly IBasketRepo _basketRepo;
    private readonly IUnityOfWork _unityOfWork;
    private readonly IConfiguration _config;

    public PaymentService(IBasketRepo basketRepo, IUnityOfWork unityOfWork, IConfiguration config)
    {
      _basketRepo = basketRepo;
      _unityOfWork = unityOfWork;
      _config = config;
    }

    public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
    {
      StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

      var basket = await _basketRepo.GetBasketByIdAsync(basketId);

      if (basket == null)
      {
        return null;
      }

      var shippingPrice = 0m;

      if (basket.DeliveryMethodId.HasValue)
      {
        var deliveryMethod =
          await _unityOfWork.Repository<DeliveryMethod>().GetByIdAsync((int) basket.DeliveryMethodId);
        shippingPrice = deliveryMethod.Price;
      }

      foreach (var item in basket.Items)
      {
        var productItem = await _unityOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);
        if (item.Price != productItem.PriceB2c)
        {
          item.Price = productItem.PriceB2c;
        }
      }

      var service = new PaymentIntentService();

      PaymentIntent intent;

      if (string.IsNullOrEmpty(basket.PaymentIntentId))
      {
        var options = new PaymentIntentCreateOptions
        {
          Amount = (long) basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long) shippingPrice * 100,
          Currency = "EUR",
          PaymentMethodTypes = new List<string> {"card"}
        };
        intent = await service.CreateAsync(options);
        basket.PaymentIntentId = intent.Id;
        basket.ClientSecret = intent.ClientSecret;
      }
      else
      {
        var options = new PaymentIntentUpdateOptions
        {
          Amount = (long) basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long) shippingPrice * 100
        };
        await service.UpdateAsync(basket.PaymentIntentId, options);
      }

      await _basketRepo.UpdateBasketAsync(basket);

      return basket;
    }

    public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
    {
      var spec = new OrderByPaymentIntentIdSpec(paymentIntentId);
      var order = await _unityOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);

      if (order == null)
      {
        return null;
      }

      order.Status = OrderStatus.PaymentReceived;
      _unityOfWork.Repository<Order>().Update(order);

      await _unityOfWork.Complete();

      return order;
    }

    public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
    {
      var spec = new OrderByPaymentIntentIdSpec(paymentIntentId);
      var order = await _unityOfWork.Repository<Order>().GetEntityWithSpecAsync(spec);

      if (order == null)
      {
        return null;
      }

      order.Status = OrderStatus.PaymentFailed;
      _unityOfWork.Repository<Order>().Update(order);

      await _unityOfWork.Complete();

      return order;
    }
  }
}