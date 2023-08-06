using projectDB.Entities;

namespace projectDB.Services
{
    public class FavouritesService:IFavouritesService
    {
        private readonly CaseStudyDbContext _favDBcontext;

        public FavouritesService(CaseStudyDbContext favDBcontext)
        {
            _favDBcontext = favDBcontext;
        }

        //Added to fav products
        public void AddToFav(FavProducts product)
        {
            try
            {
                //to get user
                User user = _favDBcontext.Users.FirstOrDefault(e => e.UserId==product.UserId);

                if (user!=null)
                {
                    _favDBcontext.FavOrderItems.Add(product);
                    _favDBcontext.SaveChanges();
                } 
            }
            catch (Exception)
            {

                throw;
            }
           
           
        }

        public Boolean RemoveFromFav(FavProducts product)
        {
            try
            {
                
                //to get user
                //User user = _favDBcontext.Users.FirstOrDefault(e => e.UserId == product.UserId);
                FavProducts prod = (from f in _favDBcontext.FavOrderItems where f.ProductId == product.ProductId select f).FirstOrDefault(e => e.UserId == product.UserId);
                //var  prod = from f in (from f in _favDBcontext.FavOrderItems
                //            group f by f.ProductId)
                //           .SelectMany(e => e)
                //                    where f.ProductId.Equals(product.ProductId) && f.UserId.Equals(product.UserId)
                //                    select 
                if (prod != null)
                {
                    Console.WriteLine($"Remoing producit : productId : {prod.ProductId}    userId: {prod.UserId}");
                    _favDBcontext.FavOrderItems.Remove(prod);
                    _favDBcontext.SaveChanges();
                    return true;
                }
                else 
                { 
                    return false;
                }  
            }
            catch (Exception)
            {

                throw;
            }
        }

        public FavProducts GetFavProduct(int id)
        {
            return _favDBcontext.FavOrderItems.Find(id);
        }
        public List<FavProducts> GetAllFavProducts()
        {
            //string userId = HttpContext.User.Identity.id;
            return _favDBcontext.FavOrderItems.ToList();   
        }


    }
}
