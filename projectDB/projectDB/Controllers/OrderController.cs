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

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;   
        }


        //To add order endpoint
        [HttpPost,Route("AddOrder")]
        public IActionResult AddOrder(Order order) 
        {
            try
            {
                if (order != null)
                {
                    _orderService.AddOrder(order);
                }
                
                return StatusCode(200,order);

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

    }
}
