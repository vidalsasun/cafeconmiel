using cafeconmiel.Models;
using cafeconmiel.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cafeconmiel.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UsersController : ControllerBase
	{

		private readonly UsersService _usersService;

		public UsersController(UsersService usersService) =>
			_usersService = usersService;


		[HttpGet]
		public async Task<List<User>> Get() =>
			await _usersService.GetAsync();


		[HttpGet("{id:length(24)}")]
		public async Task<ActionResult<User>> Get(string id)
		{
			var user = await _usersService.GetAsync(id);

			if (user is null)
			{
				return NotFound();
			}

			return user;
		}

		[HttpPost]
		public async Task<IActionResult> Post(User newUser)
		{
			await _usersService.CreateAsync(newUser);

			return CreatedAtAction(nameof(Get), new { id = newUser.id }, newUser);
		}

		[HttpPut("{id:length(24)}")]
		public async Task<IActionResult> Update(string id, User updatedUser)
		{
			var user = await _usersService.GetAsync(id);

			if (user is null)
			{
				return NotFound();
			}

			updatedUser.id = user.id;

			await _usersService.UpdateAsync(id, updatedUser);

			return NoContent();
		}

		[HttpDelete("{id:length(24)}")]
		public async Task<IActionResult> Delete(string id)
		{
			var user = await _usersService.GetAsync(id);

			if (user is null)
			{
				return NotFound();
			}

			await _usersService.RemoveAsync(id);

			return NoContent();
		}
	}
}
