using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
  public interface IGenericRepo<T> where T : BaseEntity
  {
    Task<T> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T> GetEntityWithSpecAsync(ISpec<T> spec);
    Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpec<T> spec);
    Task<int> CountAsync(ISpec<T> spec);
  }
}