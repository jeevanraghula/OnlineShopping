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

        public void AddToFav(FavProducts product)
        {
            _favDBcontext.FavOrderItems.Add(product);
            _favDBcontext.SaveChanges();
        }

        public void RemoveFromFav(FavProducts product)
        {
            _favDBcontext.FavOrderItems.Remove(product);
            _favDBcontext.SaveChanges();
        }

        public FavProducts GetFavProduct(int id)
        {
            return _favDBcontext.FavOrderItems.Find(id);
        }
        public List<FavProducts> GetAllFavProducts()
        {
            return _favDBcontext.FavOrderItems.ToList();   
        }


    }
}
