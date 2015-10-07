using System.Data.Entity.Migrations;

namespace CustomerService.DAL.Migrations
{
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                {
                    ID = c.Int(false, true),
                    FirstName = c.String(),
                    LastName = c.String(),
                    Address_Street = c.String(),
                    Address_City = c.String(),
                    Address_State = c.String(),
                    Address_Zip = c.String()
                })
                .PrimaryKey(t => t.ID);
        }

        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}