using projectDB.Entities;

namespace projectDB.Services
{
    public class OrderedProductsService: IOrderedProductsService
    {
        private readonly CaseStudyDbContext dBContextOrderItems;

        public OrderedProductsService(CaseStudyDbContext _dBContextOrderItems)
        {
            this.dBContextOrderItems = _dBContextOrderItems;
        }

        //Get all order items
        public List<OrderedProducts> GetAllOrderItems()
        {
            return dBContextOrderItems.OrderedProducts.ToList();

        }
    }
}
