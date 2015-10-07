using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using CustomerService.DAL.Models;

namespace CustomerService.DAL.Data
{
    public interface ICustomerRepository
    {
        IQueryable<Customer> All { get; }

        IQueryable<Customer> AllIncluding(params Expression<Func<Customer, object>>[] includeProperties);

        Customer Find(int id);

        void InsertOrUpdate(Customer customer);

        void Delete(int id);

        void Save();
    }

    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerServiceWebContext context = new CustomerServiceWebContext();

        public IQueryable<Customer> All
        {
            get { return context.Customers; }
        }

        public IQueryable<Customer> AllIncluding(params Expression<Func<Customer, object>>[] includeProperties)
        {
            IQueryable<Customer> query = context.Customers;

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query;
        }

        public Customer Find(int id)
        {
            return context.Customers.Find(id);
        }

        public void InsertOrUpdate(Customer customer)
        {
            if (customer.ID == default(int))
            {
                context.Customers.Add(customer);
            }
            else
            {
                context.Entry(customer).State = EntityState.Modified;
            }
        }

        public void Delete(int id)
        {
            var customer = context.Customers.Find(id);
            context.Customers.Remove(customer);
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}