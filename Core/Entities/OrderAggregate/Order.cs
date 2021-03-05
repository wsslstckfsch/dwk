using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
  public class Order : BaseEntity
  {
    public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, ShippingAddress shippingAddress,
      DeliveryMethod deliveryMethod, decimal subtotal, string paymentIntentId)
    {
      OrderItems = orderItems;
      BuyerEmail = buyerEmail;
      ShippingAddress = shippingAddress;
      DeliveryMethod = deliveryMethod;
      Subtotal = subtotal;
      PaymentIntentId = paymentIntentId;
    }

    public Order()
    {
    }

    public IReadOnlyList<OrderItem> OrderItems { get; set; }
    public string BuyerEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
    public ShippingAddress ShippingAddress { get; set; }
    public DeliveryMethod DeliveryMethod { get; set; }
    public decimal Subtotal { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public string PaymentIntentId { get; set; }

    public decimal GetTotal()
    {
      return Subtotal + DeliveryMethod.Price;
    }
  }
}