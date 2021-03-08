using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly IMapper _mapper;
    private readonly IGenericRepo<Product> _productRepo;
    private readonly IGenericRepo<ProductType> _productTypeRepo;

    public ProductsController(IGenericRepo<Product> productRepo, IGenericRepo<ProductType> productTypeRepo,
      IMapper mapper)
    {
      _productRepo = productRepo;
      _productTypeRepo = productTypeRepo;
      _mapper = mapper;
    }

    [Cached(600)]
    [HttpGet]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
      [FromQuery] ProductSpecParams productParams)
    {
      var spec = new ProductWithTypeSpec(productParams);
      var countSpec = new ProductWithFiltersForCountSpec(productParams);
      var totalItems = await _productRepo.CountAsync(countSpec);
      var products = await _productRepo.GetAllWithSpecAsync(spec);
      var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

      return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
    }

    [Cached(600)]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
      var spec = new ProductWithTypeSpec(id);
      var product = await _productRepo.GetEntityWithSpecAsync(spec);
      if (product == null) return NotFound(new ApiResponse(404));

      return _mapper.Map<Product, ProductToReturnDto>(product);
    }

    [Cached(600)]
    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
    {
      return Ok(await _productTypeRepo.GetAllAsync());
    }
  }
}