namespace projectDB.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string? OrderItems { get; set; }
        public int UserId { get; set; }

    }
}
