﻿using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;

namespace Infrastructure.Data
{
  public class UnitOfWork : IUnityOfWork
  {
    private readonly StoreContext _context;
    private Hashtable _repositories;

    public UnitOfWork(StoreContext context)
    {
      _context = context;
    }

    public async Task<int> Complete()
    {
      return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
      _context.Dispose();
    }

    public IGenericRepo<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
      if (_repositories == null)
      {
        _repositories = new Hashtable();
      }

      var type = typeof(TEntity).Name;

      if (!_repositories.ContainsKey(type))
      {
        var repositoryType = typeof(GenericRepo<>);
        var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
        
        _repositories.Add(type, repositoryInstance);
      }

      return (IGenericRepo<TEntity>) _repositories[type];
    }
  }
}