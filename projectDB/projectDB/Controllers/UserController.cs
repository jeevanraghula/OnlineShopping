using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectDB.Entities;
using projectDB.Services;

namespace projectDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;     
        public UserController(IUserService user)
        {
            _userService = user;
        }
        //add user
        [HttpPost,Route("AddUser")]
        public IActionResult AddUserC(User user)
        {
            try
            {
                if(user != null) 
                {
                    _userService.addUser(user);
                }
                return StatusCode(200,user);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete,Route("RemoveUser")]
        public IActionResult RemoveUserC(User user) 
        {
            try
            {
                if (user != null)
                {
                    _userService.removeUser(user);
                }
                return StatusCode(200, "Removed user");
            }
            catch (Exception)
            {

                throw;
            }
        }


        //getAllusers
        [HttpGet,Route("GetAllUsers")]
        public IActionResult GetAllUsersC()
        {
            try
            {
                List<User> users = _userService.getAllUsers();
                if (users != null)
                    return StatusCode(200, users);
                else
                    return StatusCode(400,"no users found");

            }
            catch (Exception e)
            {

                return StatusCode(400,$"no users {e.Message}");
            }
        }

        //getuser
        [HttpGet,Route("GetUser/{id}")]
        public IActionResult GetUser(int id)
        {
            try
            {
                User user = _userService.GetUser(id);
                if (user != null)
                {
                    return StatusCode(200, user);
                }
                else
                    return StatusCode(400, "no user found");
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}
