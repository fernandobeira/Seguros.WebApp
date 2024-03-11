using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;
using Seguros.WebApp.Models;

namespace Seguros.WebApp;

public class SegurosContext : DbContext
{
    public SegurosContext(DbContextOptions<SegurosContext> options) : base(options)
    {
        
    }

    public DbSet<Seguro> Seguros {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Seguro>().ToCollection("Seguro");
    }

}
