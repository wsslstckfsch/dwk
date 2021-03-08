using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
      ITokenService tokenService, IMapper mapper)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserToReturnDto>> GetCurrentUser()
    {
      var user = await _userManager.FindUserByClaimAsync(User);

      return new UserToReturnDto
      {
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        DisplayName = user.DisplayName
      };
    }

    [HttpGet("email-exists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
      return await _userManager.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("shipping-address")]
    public async Task<ActionResult<ShippingAddressToReturnDto>> GetUserShippingAddress()
    {
      var user = await _userManager.FindUserWithAddressesByClaimAsync(User);

      return _mapper.Map<ShippingAddress, ShippingAddressToReturnDto>(user.ShippingAddress);
    }
    
    [Authorize]
    [HttpGet("billing-address")]
    public async Task<ActionResult<BillingAddressToReturnDto>> GetUserBillingAddress()
    {
      var user = await _userManager.FindUserWithAddressesByClaimAsync(User);

      return _mapper.Map<BillingAddress, BillingAddressToReturnDto>(user.BillingAddress);
    }

    [Authorize]
    [HttpPut("shipping-address")]
    public async Task<ActionResult<ShippingAddressToReturnDto>> UpdateUserShippingAddress(
      ShippingAddressToReturnDto address)
    {
      var user = await _userManager.FindUserWithAddressesByClaimAsync(User);

      user.ShippingAddress = _mapper.Map<ShippingAddressToReturnDto, ShippingAddress>(address);

      var result = await _userManager.UpdateAsync(user);

      if (result.Succeeded)
      {
        return Ok(_mapper.Map<ShippingAddress, ShippingAddressToReturnDto>(user.ShippingAddress));
      }

      return BadRequest("Issue updating the user shipping address");
    }
    
    [Authorize]
    [HttpPut("billing-address")]
    public async Task<ActionResult<BillingAddressToReturnDto>> UpdateUserBillingAddress(
      BillingAddressToReturnDto address)
    {
      var user = await _userManager.FindUserWithAddressesByClaimAsync(User);

      user.BillingAddress = _mapper.Map<BillingAddressToReturnDto, BillingAddress>(address);

      var result = await _userManager.UpdateAsync(user);

      if (result.Succeeded)
      {
        return Ok(_mapper.Map<BillingAddress, BillingAddressToReturnDto>(user.BillingAddress));
      }

      return BadRequest("Issue updating the user billing address");
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserToReturnDto>> Login(UserToLoginDto userToLoginDto)
    {
      var user = await _userManager.FindByEmailAsync(userToLoginDto.Email);

      if (user == null)
      {
        return Unauthorized(new ApiResponse(401));
      }

      var result = await _signInManager.CheckPasswordSignInAsync(user, userToLoginDto.Password, false);

      if (!result.Succeeded)
      {
        return Unauthorized(new ApiResponse(401));
      }

      return new UserToReturnDto
      {
        Email = user.Email,
        Token = _tokenService.CreateToken(user),
        DisplayName = user.DisplayName
      };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserToReturnDto>> Register(UserToRegisterDto userToRegisterDto)
    {
      if (CheckEmailExistsAsync(userToRegisterDto.Email).Result.Value)
      {
        return new BadRequestObjectResult(new ApiValidationErrorResponse {Errors = new[] {"Email address is in use"}});
      }

      var user = new AppUser
      {
        DisplayName = userToRegisterDto.Email,
        Email = userToRegisterDto.Email,
        UserName = userToRegisterDto.Email
      };

      var result = await _userManager.CreateAsync(user, userToRegisterDto.Password);

      if (!result.Succeeded)
      {
        return BadRequest(new ApiResponse(400));
      }

      return new UserToReturnDto
      {
        DisplayName = user.DisplayName,
        Token = _tokenService.CreateToken(user),
        Email = user.Email
      };
    }
  }
}