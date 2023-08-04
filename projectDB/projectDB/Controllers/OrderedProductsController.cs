using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.Entities;
using projectDB.Services;

namespace projectDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderedProductsController : ControllerBase
    {
        private readonly IOrderedProductsService _orderItemsService;
        public OrderedProductsController(IOrderedProductsService orderItems)
        {
            _orderItemsService= orderItems;
        }
        
        [HttpGet,Route("GetAllOrderItems")]
        public IActionResult getAllOrderItems() 
        {
            try
            {
                List<OrderedProducts> orderItems = _orderItemsService.GetAllOrderItems();
                if (orderItems != null)
                {
                    return StatusCode(200,orderItems);
                }
                return StatusCode(400,"no orderItems found");

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
