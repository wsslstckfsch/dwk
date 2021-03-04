﻿using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
  public class ShippingAddressToReturnDto
  {
    [Required] public string FullName { get; set; }
    public string AddressLine1 { get; set; }
    [Required] public string StreetAddress { get; set; }
    [Required] public string City { get; set; }
    [Required] public string Zip { get; set; }
    [Required] public string Country { get; set; }
  }
}