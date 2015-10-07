using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CustomerService.Web
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer(new CustomerServiceDatabaseInitializer());


            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}