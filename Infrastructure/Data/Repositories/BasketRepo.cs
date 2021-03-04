﻿using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data.Repositories
{
  public class BasketRepo : IBasketRepo
  {
    private readonly IDatabase _database;

    public BasketRepo(IConnectionMultiplexer redis)
    {
      _database = redis.GetDatabase();
    }

    public async Task<CustomerBasket> GetBasketByIdAsync(string basketId)
    {
      var data = await _database.StringGetAsync(basketId);

      return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
    }

    public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
    {
      var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(7));

      if (!created) return null;

      return await GetBasketByIdAsync(basket.Id);
    }

    public async Task<bool> DeleteBasketAsync(string basketId)
    {
      return await _database.KeyDeleteAsync(basketId);
    }
  }
}