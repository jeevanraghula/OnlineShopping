using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.Models;
using projectDB.Services;

namespace projectDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService= cartService;
        }


        [HttpPost,Route("AddToCart")]
        [Authorize]
        IActionResult AddOrRemoveFromCart([FromBody] ProductRequest product) 
        {
            try
            {
                Boolean a = _cartService.AddToCart(product);
                if(a)
                {
                    return StatusCode(200, _cartService.GetAllCartProducts(product.UserId));
                }
            }
            catch (Exception ex) 
            {
                
            }
            return StatusCode(202, new JsonResult("unable to add/remove from cart"));
        }

        //[HttpGet,Route("GetAllCartProducts")]
        //[Authorize]
        //IActionResult GetAllCartProducts([FromRoute] int userId)
        //{

        //}
    }
}
