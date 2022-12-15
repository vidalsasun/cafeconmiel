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
		public async Task<List<UserModel>> Get() =>
			await _usersService.GetAsync();


		[HttpGet("{id:length(24)}")]
		public async Task<ActionResult<UserModel>> Get(string id)
		{
			var user = await _usersService.GetAsync(id);

			if (user is null)
			{
				return NotFound();
			}

			return user;
		}

		[HttpPost]
		public async Task<IActionResult> Post(UserModel newUser)
		{
			await _usersService.CreateAsync(newUser);

			return CreatedAtAction(nameof(Get), new { id = newUser.id }, newUser);
		}

		[HttpPut]
		public async Task<ActionResult<UserModel>> Update(UserModel updatedUser)
		{
			var user = await _usersService.GetAsync(updatedUser.id);

			if (user is null)
			{
				return NotFound();
			}

			updatedUser.id = user.id;

			await _usersService.UpdateAsync(updatedUser);

			return updatedUser;
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
