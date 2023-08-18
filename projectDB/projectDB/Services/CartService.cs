using projectDB.Entities;
using projectDB.Models;

namespace projectDB.Services
{
    public class CartService
    {
        private readonly CaseStudyDbContext _CartDBcontext;
        public CartService(CaseStudyDbContext cartDBcontext)
        {
            _CartDBcontext = cartDBcontext;
        }

        //Add and remove form  cart
        Boolean AddToCart(Cart product)
        {
            try
            {
                //to get user
                User user = _CartDBcontext.Users.FirstOrDefault(e => e.UserId == product.UserId);
                if (user != null)
                {
                    Cart dupCart = (from c in _CartDBcontext.CartProducts where c.ProductId == product.ProductId select c).FirstOrDefault(e => e.UserId == product.UserId);
                    if (dupCart == null)
                    {
                        _CartDBcontext.CartProducts.Add(product);
                        _CartDBcontext.SaveChanges();
                        return true;
                    }
                    else
                    {
                        _CartDBcontext.CartProducts.Remove(product);
                        _CartDBcontext.SaveChanges();           
                    }                  
                }          
            }
            catch(Exception)
            {
                throw;
            }
            return false;
        }


        //To get all cart products
        List<Product> GetAllCartProducts(int userId)
        {
            try
            {
                //to get user
                User user = _CartDBcontext.Users.FirstOrDefault(e => e.UserId == userId);
                if (user != null)
                {
                    List<Product> cartProducts =(from d in (from c in _CartDBcontext.CartProducts where c.UserId == userId select c)
                                          join p in _CartDBcontext.Products on d.ProductId equals p.ProductId select p).ToList();
                    return cartProducts;
                }
            }
            catch(Exception) 
            {
                throw;
            }
            return null;
        }


    }
}
