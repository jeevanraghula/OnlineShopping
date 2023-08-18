using projectDB.Entities;
using projectDB.Models;

namespace projectDB.Services
{
    public interface ICartService
    {
        //methods
        Boolean AddToCart(ProductRequest product);

        Boolean RemoveFromCart(ProductRequest product);

        List<Product> GetAllCartProducts(int userId);

    }
}
