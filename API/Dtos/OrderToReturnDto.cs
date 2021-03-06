﻿using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.Dtos
{
  public class OrderToReturnDto
  {
    public int Id { get; set; }
    public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
    public string BuyerEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
    public BillingAddress BillingAddress { get; set; }
    public string DeliveryMethod { get; set; }
    public decimal ShippingPrice { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; }
  }
}