using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
  public static class AppServicesExtensions
  {
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
      services.AddScoped<IOrderService, OrderService>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IPaymentService, PaymentService>();
      services.AddScoped<IUnityOfWork, UnitOfWork>();
      services.AddScoped<IProductRepo, ProductRepo>();
      services.AddScoped<IBasketRepo, BasketRepo>();
      services.AddScoped(typeof(IGenericRepo<>), typeof(GenericRepo<>));
      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.InvalidModelStateResponseFactory = context =>
        {
          var errors = context.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage).ToArray();

          var errorResponse = new ApiValidationErrorResponse
          {
            Errors = errors
          };

          return new BadRequestObjectResult(errorResponse);
        };
      });

      return services;
    }
  }
}