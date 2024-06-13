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
                return Problem("Connection string not found");
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
                        return Ok(ConvertToEmployee(table));
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

        [HttpPost]
        [Route("AddEmployee")]
        public ActionResult<Employee> AddEmployee(Employee emp)
        {
            var connectionString = _config.GetConnectionString(connectionStringName);
            if (connectionString == null)
            {
                return Problem("Connection string not found");
            }
            var commandText = "INSERT INTO [dbo].[employees] ([first_name],[last_name],[email],[comments],[is_friendly],[birth_year],[weight],[employment_status],[favorite_color]) " +
                "VALUES (@first_name,@last_name,@email,@comments,@is_friendly,@birth_year,@weight,@employment_status,@favorite_color)";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(commandText, connection))
                {
                    command.Parameters.AddWithValue("@first_name", emp.FirstName);
                    command.Parameters.AddWithValue("@last_name", emp.LastName);
                    command.Parameters.AddWithValue("@email", emp.Email);
                    command.Parameters.AddWithValue("@comments", emp.Comments);
                    command.Parameters.AddWithValue("@is_friendly", emp.IsFriendly);
                    command.Parameters.AddWithValue("@birth_year", emp.BirthYear);
                    command.Parameters.AddWithValue("@weight", emp.Weight);
                    command.Parameters.AddWithValue("@employment_status", emp.EmploymentStatus);
                    command.Parameters.AddWithValue("@favorite_color", emp.FavoriteColor);
                    command.ExecuteNonQuery();
                    connection.Close();
                    return Ok("Added successfully!");
                }
            }
        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public ActionResult<Employee> UpdateEmployee(int id, Employee emp)
        {
            var connectionString = _config.GetConnectionString(connectionStringName);
            if (connectionString == null)
            {
                return Problem("Connection string not found");
            }
            var commandText = "UPDATE [dbo].[employees] SET [first_name]=@first_name," +
                "[last_name] = @last_name,[email] = @email,[comments] = @comments,[is_friendly] = @is_friendly," +
                "[birth_year] = @birth_year,[weight] = @weight,[employment_status] = @employment_status,[favorite_color] = @favorite_color " +
                "WHERE id = @id";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(commandText, connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@first_name", emp.FirstName);
                    command.Parameters.AddWithValue("@last_name", emp.LastName);
                    command.Parameters.AddWithValue("@email", emp.Email);
                    command.Parameters.AddWithValue("@comments", emp.Comments);
                    command.Parameters.AddWithValue("@is_friendly", emp.IsFriendly);
                    command.Parameters.AddWithValue("@birth_year", emp.BirthYear);
                    command.Parameters.AddWithValue("@weight", emp.Weight);
                    command.Parameters.AddWithValue("@employment_status", emp.EmploymentStatus);
                    command.Parameters.AddWithValue("@favorite_color", emp.FavoriteColor);
                    command.ExecuteNonQuery();
                    connection.Close();
                    return Ok("Updated successfully!");
                }
            }
        }

        [HttpDelete]
        [Route("DeleteEmployee")]
        public ActionResult<Employee> DeleteEmployee(int id)
        {
            var connectionString = _config.GetConnectionString(connectionStringName);
            if (connectionString == null)
            {
                return Problem("Connection string not found");
            }
            var commandText = "DELETE FROM [dbo].[employees] WHERE id = @id";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand(commandText, connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    
                    command.ExecuteNonQuery();
                    connection.Close();
                    return Ok("Deleted successfully!");
                }
            }
        }
    }
}

