using projectDB.Entities;

namespace projectDB.Services
{
    public class ProductService: IProductService
    {
        private readonly CaseStudyDbContext dBContextProduct;

        public ProductService(CaseStudyDbContext _dbcontext)
        {
            dBContextProduct = _dbcontext;
        }

        //add products
        public void addProduct(Product prod)
        {
            dBContextProduct.Products.Add(prod);
            dBContextProduct.SaveChanges();
        }

        //delete products
        public void deleteProduct(Product prod)
        {
            dBContextProduct.Products.Remove(prod);
            dBContextProduct.SaveChanges();
        }

        //get all products
        public List<Product> getAllProducts()
        {
            return dBContextProduct.Products.ToList();
        }


        public Product GetProduct(int id)
        {
            return dBContextProduct.Products.Find(id);
        }


    }
}
