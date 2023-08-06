using projectDB.Entities;

namespace projectDB.Services
{
    public interface IFavouritesService
    {
        //methods
        void AddToFav(FavProducts item);

        
        Boolean RemoveFromFav(FavProducts item);
        List<FavProducts> GetAllFavProducts();

        FavProducts GetFavProduct(int id);
    }
}
