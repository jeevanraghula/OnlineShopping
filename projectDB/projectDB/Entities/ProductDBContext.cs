using Microsoft.EntityFrameworkCore;

namespace projectDB.Entities
{
    public class ProductDBContext:DbContext
    {
        //Entity set
        public DbSet<Product> Products { get; set; }

        //configure 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"server=(localdb)\local;database=UworldDB;trusted_connection=true");
        }
    }
}
