using IncidentApplication.Data;
using IncidentApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IncidentApplication.Controllers.Manager
{
    [Authorize(Roles = "Manager")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        public ManagerController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _context = context;
        }

        //[HttpGet]
        //[Route("technician")]
        //public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetTechnicians()
        //{
        //    return await _context.User_Accounts
        //        .Where(r => r.Role == "Technician")
        //        .OrderBy(on => on.Id)
        //        .ToListAsync();
        //}

        [HttpGet]
        [Route("incidents")]
        public async Task<ActionResult<IEnumerable<Incidents>>> GetIncidents()
        {
            return await _context.Incidents
                .Include(s => s.Status)
                .Include(u => u.User)
                .Include(t => t.Technician)
                .ToListAsync();
        }

        // GET: api/Incidents/5
        [HttpGet("{id}")]
        [Route("incident/{id}")]
        public async Task<ActionResult<Incidents>> GetIncident(int id)
        {
            var incident = await _context.Incidents
                .Include(s => s.Status)
                .Include(u => u.User)
                .Include(t => t.Technician)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (incident == null)
            {
                return NotFound();
            }

            return incident;
        }

        // PUT: api/Incidents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Route("incident/{id}")]
        public async Task<IActionResult> PutIncident(int id, Incidents incident)
        {
            if (id != incident.Id)
            {
                return BadRequest();
            }

            _context.Entry(incident).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Incidentss
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Incidents>> PostIncident(Incidents incident)
        {
            _context.Incidents.Add(incident);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncident", new { id = incident.Id }, incident);
        }

        // DELETE: api/Incidents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }

            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IncidentExists(int id)
        {
            return _context.Incidents.Any(e => e.Id == id);
        }


        [HttpGet]
        [Route("statuses")]
        public async Task<ActionResult<IEnumerable<IncidentStatus>>> GetStatuses()
        {
            return await _context.IncidentStatus.ToListAsync();
        }

        // GET: api/Statuses/5
        [HttpGet("{id}")]
        [Route("statuses/{id}")]
        public async Task<ActionResult<IncidentStatus>> GetStatus(int id)
        {
            var status = await _context.IncidentStatus.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }

        // PUT: api/Statuses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Route("statuses/{id}")]
        public async Task<IActionResult> PutStatus(int id, IncidentStatus status)
        {
            if (id != status.Id)
            {
                return BadRequest();
            }

            _context.Entry(status).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Statuses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IncidentStatus>> PostStatus(IncidentStatus status)
        {
            _context.IncidentStatus.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatus", new { id = status.Id }, status);
        }

        // DELETE: api/Statuses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatus(int id)
        {
            var status = await _context.IncidentStatus.FindAsync(id);
            if (status == null)
            {
                return NotFound();
            }

            _context.IncidentStatus.Remove(status);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusExists(int id)
        {
            return _context.IncidentStatus.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("roles")]
        public ActionResult<IEnumerable<IdentityRole>> GetRoles()
        {
            return _roleManager.Roles.ToList();
        }
    }
}
