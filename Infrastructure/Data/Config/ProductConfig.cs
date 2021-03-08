using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
  public class ProductConfig : IEntityTypeConfiguration<Product>
  {
    public void Configure(EntityTypeBuilder<Product> builder)
    {
      builder.Property(p => p.LangAlpha2).IsRequired();
      builder.Property(p => p.Name).IsRequired();
      builder.Property(p => p.Description).IsRequired();
      builder.Property(p => p.PriceB2c).HasColumnType("decimal(18,2)");
      builder.Property(p => p.PriceB2b).HasColumnType("decimal(18,2)");
    }
  }
}