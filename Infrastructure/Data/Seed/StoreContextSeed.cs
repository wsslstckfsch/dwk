using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.Seed
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
      var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

      try
      {
        if (!context.ProductTypes.Any())
        {
          var data = await File.ReadAllTextAsync(path + @"/Data/Seed/Data/productTypes.json");
          var list = JsonSerializer.Deserialize<List<ProductType>>(data);
          foreach (var item in list) context.ProductTypes.Add(item);

          await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
          var data = await File.ReadAllTextAsync(path + @"/Data/Seed/Data/products.json");
          var list = JsonSerializer.Deserialize<List<Product>>(data);
          foreach (var item in list) context.Products.Add(item);

          await context.SaveChangesAsync();
        }

        if (!context.DeliveryMethods.Any())
        {
          var data = await File.ReadAllTextAsync(path + @"/Data/Seed/Data/delivery.json");
          var list = JsonSerializer.Deserialize<List<DeliveryMethod>>(data);
          foreach (var item in list) context.DeliveryMethods.Add(item);

          await context.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        var logger = loggerFactory.CreateLogger<StoreContextSeed>();
        logger.LogError(ex.Message);
      }
    }
  }
}