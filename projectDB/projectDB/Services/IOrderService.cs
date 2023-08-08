using projectDB.Entities;

namespace projectDB.Services
{
    public interface IOrderService
    {
        Boolean AddOrder(Order order,int productId);
        void DeleteOrder(Order order);

        List<Order> GetAllOrders();

        Order GetOrderById(int id);
    }
}
