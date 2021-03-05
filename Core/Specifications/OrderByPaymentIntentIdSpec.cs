using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
  public class OrderByPaymentIntentIdSpec : BaseSpec<Order>
  {
    public OrderByPaymentIntentIdSpec(string paymentIntentId) : base(o => o.PaymentIntentId == paymentIntentId)
    {
    }
  }
}