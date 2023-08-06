using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.Entities;
using projectDB.Services;

namespace projectDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IOrderedProductsService _orderItemsService;
     

        public OrderController(IOrderService orderService, IOrderedProductsService orderItems)
        {
            _orderService = orderService;
            _orderItemsService = orderItems;
        }


        //To add order endpoint
        [HttpPost,Route("AddOrder/{id}")]
        public IActionResult AddOrder(Order order) 
        {
            try
            {
                if (order != null)
                { 
                   _orderService.AddOrder(order);
                    return StatusCode(200, order);
                }
                else
                {
                    return StatusCode(200, "no product found to add");
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        //To get all orders endpoint
        [HttpGet,Route("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                List<Order> orders = _orderService.GetAllOrders();
                if(orders != null)
                {
                    return StatusCode(200, orders);
                }
                
                return StatusCode(400, "no order found");
            }
            catch (Exception)
            {
                throw;
            }
        }

        //delete orders
        [HttpDelete,Route("DeleteOrder/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            try
            {
                Order order = _orderService.GetOrderById(id);
                if(order != null)
                {
                    _orderService.DeleteOrder(order);
                    return StatusCode(200,"order deleted");
                }
                return StatusCode(400,"deletion failed");
            }
            catch (Exception)
            {

                throw;
            }
        }

        //get order by id
        [HttpGet,Route("GetOrder/{id}")]
        public IActionResult GetOrder(int id)
        {
            try
            {
                Order order = _orderService.GetOrderById(id);
                if(order!=null)
                    return StatusCode(200, order);
                return StatusCode(400,"no order found");
            }
            catch (Exception)
            {

                throw;
            }
        }


        //all ordered items of a specific user
        [HttpGet, Route("GetAllOrderItems")]
        public IActionResult getAllOrderItems()
        {
            try
            {
                List<OrderedProducts> orderItems = _orderItemsService.GetAllOrderItems();
                if (orderItems != null)
                {
                    return StatusCode(200, orderItems);
                }
                return StatusCode(400, "no orderItems found");

            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
