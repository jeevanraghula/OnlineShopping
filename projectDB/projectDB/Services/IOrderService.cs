using projectDB.Entities;

namespace projectDB.Services
{
    public interface IOrderService
    {
        void AddOrder(Order order);
        void DeleteOrder(Order order);

        List<Order> GetAllOrders();

        Order GetOrderById(int id);
    }
}
