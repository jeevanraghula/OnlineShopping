using projectDB.Entities;

namespace projectDB.Services
{
    public class OrderService: IOrderService
    {
        private readonly CaseStudyDbContext dbContextOrder;

        public OrderService(CaseStudyDbContext _dbContextOrder)
        {
            this.dbContextOrder = _dbContextOrder;
        }
        //add order
        //tables connection : Order table ---> OrderedProduct table
        public Boolean AddOrder(Order order,int productId)
        {
            //checking for valid product or not
            Product prod = dbContextOrder.Products.FirstOrDefault(e => e.ProductId == productId);

            if (order!=null && prod!=null)
            {
                
                dbContextOrder.Orders.Add(order);
                dbContextOrder.SaveChanges();

                //Adding 
                OrderedProducts op = new OrderedProducts();
                op.ProductId = productId;
                op.orderId = (from or in dbContextOrder.Orders.OrderByDescending(o => o.OrderDate)
                             where or.UserId == order.UserId 
                             select or.OrderId).First();
                dbContextOrder.OrderedProducts.Add(op);
                dbContextOrder.SaveChanges();
                return true;
            }
            return false;
        }


        //delete order
        public void DeleteOrder(Order order)
        {
            dbContextOrder.Orders.Remove(order);    
            dbContextOrder.SaveChanges();
        }

        //get all orders

        public List<Order> GetAllOrders()
        {
            //to get all orders
            //var allOrders = from o in dbContextOrder.Orders
            return dbContextOrder.Orders.ToList();
        }

        //get order by id
        public Order GetOrderById(int id)
        {
            return dbContextOrder.Orders.Find(id);
        }


        //Get all order items
        public List<OrderedProducts> GetAllOrderItems()
        {
            return dbContextOrder.OrderedProducts.ToList();

        }

    }
}
