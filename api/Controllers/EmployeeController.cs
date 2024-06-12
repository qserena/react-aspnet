using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;    

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IConfiguration _config;
        private const string connectionStringName = "EmployeeDBConnection";

        public EmployeeController(IConfiguration config)
        {
            _config = config;
        }


        [HttpGet]
        [Route("GetEmployees")]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            var connectionString = _config.GetConnectionString(connectionStringName);
            if (connectionString == null)
            {
                return new NotFoundResult();
            }
            var table = new DataTable();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT * FROM dbo.employees", connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        table.Load(reader);
                        reader.Close();
                        connection.Close();
                        return ConvertToEmployee(table);
                    }
                }
            }
        }

        private List<Employee> ConvertToEmployee(DataTable table)
        {
            var emp = new List<Employee>();

            emp = (from DataRow row in table.Rows

                   select new Employee
                   {
                       Id = Convert.ToInt32(row["id"]),
                       FirstName = row["first_name"].ToString(),
                       LastName = row["last_name"].ToString(),
                       Email = row["email"].ToString(), 
                       Comments = row["comments"].ToString(),
                       IsFriendly = Convert.ToBoolean(row["is_friendly"]),
                       BirthYear = Convert.ToInt32(row["birth_year"]),
                       Weight = Convert.ToDecimal(row["weight"]),
                       EmploymentStatus = Convert.ToInt32(row["employment_status"]),
                       FavoriteColor = Convert.ToInt32(row["favorite_color"])

                   }).ToList();

            return emp;
        }

        //[HttpPost]
        //[Route("AddEmployee")]
        //public JsonResult AddEmployee([FromBody] object person)
        //{
        //    var connectionString = _config.GetConnectionString(connectionStringName);
        //    if (connectionString == null)
        //    {
        //        return new JsonResult("Connection string not found");
        //    }
        //    var table = new DataTable();
        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        using (var command = new SqlCommand("INSERT INTO dbo.employees values(first_name=@person)", connection))
        //        {
        //            command.Parameters.AddWithValue("@person", person);
        //            command.ExecuteNonQuery();
        //            connection.Close();
        //            return new JsonResult("Added successfully!");
        //        }
        //    }
        //}
    }
}

