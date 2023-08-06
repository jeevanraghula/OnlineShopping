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
        public void AddOrder(Order order)
        {
            dbContextOrder.Orders.Add(order);
            dbContextOrder.SaveChanges();
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
