using Microsoft.EntityFrameworkCore;
using projectDB.Entities;
using projectDB.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            //builder.Services.AddTransient<IOrderedProductsService, OrderedProductsService>();
            builder.Services.AddTransient<IFavouritesService, FavouritesService>();

            builder.Services.AddControllers();

            //Authentication and Authorization
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],  
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });


            //adding cors 
            builder.Services.AddCors( c =>
            {
                c.AddPolicy("apiOrigin", options => {

                    options.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();

                });
            });



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

            //to enable using it in UI
            app.UseCors("apiOrigin");


            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}