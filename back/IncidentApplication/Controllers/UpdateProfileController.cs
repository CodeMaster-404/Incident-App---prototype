using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using IncidentApplication.Data;
using IncidentApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace IncidentApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext context;
        private readonly ApplicationDbContext _context;




        public UpdateProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;



        }

        [HttpPost]
        [Route("update-password/{id}")]
        public async Task<IActionResult> ChangePassword([FromRoute] string id, [FromBody] ChangePasswordBindingModel model)
        {
            /// var user = await _userManager.FindByIdAsync(id);
            /// Get the current logged in user
            var user = await _userManager.FindByIdAsync(id);
            // var password = await _userManager.CheckPasswordAsync(user, model.OldPassword);



            if (user == null)
            {
                return BadRequest("User not found");
            };



            //Attempt to change password
            var password = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);



            if (password.Succeeded)
            {
                return Ok(new { message = "Password changed" });
            }
            else
            {
                return Ok(new { message = "Password not changed" });
            }



        }



        [Route("update-profile/{id}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {
            //var user = await _context.User
            //    .Include(u => u.User_Roles)
            //    .SingleOrDefaultAsync(u => u.Id == id);



            var user = await _userManager.FindByIdAsync(id);



            if (user == null)
            {
                return NotFound();
            }





            return Ok(user);

        }
    }
}
