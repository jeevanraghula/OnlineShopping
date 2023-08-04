using Microsoft.EntityFrameworkCore;
using projectDB.Entities;
using projectDB.Services;

namespace projectDB
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            //Connecting to the DB
            var connection = builder.Configuration.GetConnectionString("DbConnection");
            builder.Services.AddDbContext<CaseStudyDbContext>(options => options.UseSqlServer(connection));


            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IProductService, ProductService>();

            builder.Services.AddTransient<IOrderService, OrderService>();

            builder.Services.AddTransient<IOrderedProductsService, OrderedProductsService>();
            builder.Services.AddTransient<IFavouritesService, FavouritesService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}