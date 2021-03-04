using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly IBasketRepo _basketRepo;
    private readonly IMapper _mapper;

    public BasketController(IBasketRepo basketRepo, IMapper mapper)
    {
      _basketRepo = basketRepo;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketByIdAsync(string id)
    {
      var basket = await _basketRepo.GetBasketByIdAsync(id);

      return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync(CustomerBasketDto basket)
    {
      var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

      var updatedBasket = await _basketRepo.UpdateBasketAsync(customerBasket);

      return Ok(updatedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasketAsync(string id)
    {
      await _basketRepo.DeleteBasketAsync(id);
    }
  }
}