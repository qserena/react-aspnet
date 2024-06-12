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
        public JsonResult GetEmployees()
        {
            var connectionString = _config.GetConnectionString(connectionStringName);
            if (connectionString == null)
            {
                return new JsonResult("Connection string not found");
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
                        return new JsonResult(table);
                    }
                }
            }
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

