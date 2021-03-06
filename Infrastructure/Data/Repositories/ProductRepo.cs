﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
  public class ProductRepo : IProductRepo
  {
    private readonly StoreContext _context;

    public ProductRepo(StoreContext context)
    {
      _context = context;
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
      return await _context.Products
        .Include(p => p.ProductType)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
      return await _context.Products
        .Include(p => p.ProductType)
        .ToListAsync();
    }

    public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
    {
      return await _context.ProductTypes.ToListAsync();
    }
  }
}