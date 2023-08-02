namespace projectDB.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public double Price { get; set; }
        public string? ProductDescription { get; set; }
        public string? category { get; set; }
    }
}
