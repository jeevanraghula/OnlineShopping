using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.Entities;
using projectDB.Services;

namespace projectDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteProductsController : ControllerBase
    {
        private readonly IFavouritesService _favouritesService;

        public FavouriteProductsController(IFavouritesService favouritesService)
        {
            _favouritesService = favouritesService; 
        }

        //add fav products
        [HttpPost,Route("AddFavProduct")]
        public IActionResult AddToFav(FavProducts favProd)
        {
            try
            {
                if (favProd!=null)
                {
                    _favouritesService.AddToFav(favProd);
                    return StatusCode(200, favProd);
                }
                return StatusCode(400,"failed to add");
            }
            catch (Exception)
            {

                throw;
            }
        }

        //Remove from fav
        [HttpDelete,Route("RemoveFromFav/{id}")]
        public IActionResult RemoveFav(int id) 
        {
            try
            {
                FavProducts prod = _favouritesService.GetFavProduct(id);
                if (prod!=null) 
                {
                    _favouritesService.RemoveFromFav(prod);
                    return StatusCode(200, "removed from whislist");
                }
                return StatusCode(400, "Failed to remove");
            }
            catch (Exception)
            {

                throw;
            }
        }

        //get all fav products
        [HttpGet,Route("GetAllFavouriteProducts")]
        public IActionResult GetAllFavProducts()
        {
            try
            {
                List<FavProducts> favProducts = _favouritesService.GetAllFavProducts();
                if (favProducts!=null)
                {
                    return StatusCode(200,favProducts);
                }
                return StatusCode(400,"no fav products found");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
