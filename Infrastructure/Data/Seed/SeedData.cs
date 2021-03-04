using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.Seed
{
  public class SeedData
  {
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
      try
      {
        if (!context.ProductTypes.Any())
        {
          var data = File.ReadAllText("../Infrastructure/Data/Seed/Data/productTypes.json");
          var list = JsonSerializer.Deserialize<List<ProductType>>(data);
          foreach (var item in list) context.ProductTypes.Add(item);

          await context.SaveChangesAsync();
        }

        if (!context.Products.Any())
        {
          var data = File.ReadAllText("../Infrastructure/Data/Seed/Data/products.json");
          var list = JsonSerializer.Deserialize<List<Product>>(data);
          foreach (var item in list) context.Products.Add(item);

          await context.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        var logger = loggerFactory.CreateLogger<SeedData>();
        logger.LogError(ex.Message);
      }
    }
  }
}