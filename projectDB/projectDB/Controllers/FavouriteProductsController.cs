using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.DTO;
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
        [Authorize]
        public IActionResult AddToFav([FromBody] FavModel favProd)
        {
            try
            {
                if (favProd!=null)
                {
                    FavProducts prod = new FavProducts();
                    prod.ProductId = favProd.ProductId;
                    prod.UserId = favProd.UserId;

                    _favouritesService.AddToFav(prod);
                    Console.WriteLine($"favproducts :{prod.user}");
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
        [HttpDelete,Route("RemoveFromFav")]
        [Authorize]
        public IActionResult RemoveFav([FromBody] FavModel favProd) 
        {
            try
            {
                if (favProd != null)
                {
                    FavProducts prod = new FavProducts();
                    prod.ProductId = favProd.ProductId;
                    prod.UserId = favProd.UserId;

                    Boolean removedOrNot = _favouritesService.RemoveFromFav(prod);

                    if (removedOrNot)
                    {
                        return StatusCode(200, "removed from Favourites List");
                    }
                }
                return StatusCode(400, "There is no product");
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
