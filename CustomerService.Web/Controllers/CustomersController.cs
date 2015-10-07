using System.Web.Mvc;
using CustomerService.DAL.Data;
using CustomerService.DAL.Models;

namespace CustomerService.Web.Controllers
{
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository customerRepository;

        public CustomersController(ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;
        }

        public ViewResult Index()
        {
            return View(customerRepository.All);
        }

        public ViewResult Details(int id)
        {
            return View(customerRepository.Find(id));
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Customer customer)
        {
            //check model state
            if (ModelState.IsValid)
            {
                customerRepository.InsertOrUpdate(customer);
                customerRepository.Save();
                return RedirectToAction("Index");
            }

            return View();
        }

        public ActionResult Edit(int id)
        {
            return View(customerRepository.Find(id));
        }

        [HttpPost]
        public ActionResult Edit(Customer customer)
        {
            if (ModelState.IsValid)
            {
                customerRepository.InsertOrUpdate(customer);
                customerRepository.Save();
                return RedirectToAction("Index");
            }

            return View();
        }

        public ActionResult Delete(int id)
        {
            return View(customerRepository.Find(id));
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            customerRepository.Delete(id);
            customerRepository.Save();

            return RedirectToAction("Index");
        }
    }
}