using System;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IUnityOfWork: IDisposable
  {
    IGenericRepo<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> Complete();
  }
}