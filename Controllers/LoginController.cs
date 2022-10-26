using cafeconmiel.Interfaces;
using cafeconmiel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace cafeconmiel.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LoginController : Controller
	{
		private readonly IConfiguration _config;
		private readonly IJwtAuthenticationService _authSrv;
		private readonly IWebHostEnvironment _env;

		private List<User> appUsers = new List<User>
		{
			new User { App = "lalero", Code = "lalero" },
		};

		public LoginController(IConfiguration config,
			IJwtAuthenticationService authService,
			IWebHostEnvironment env
			)
		{
			_config = config;
			_authSrv = authService;
			_env = env;
		}
		[HttpPost]
		public IActionResult Post(User login)
		{
			IActionResult response = Unauthorized();
			User user = AuthenticateUser(login);
			if (user != null)
			{
				var tokenString = GenerateJWTToken(user);
				response = Ok(new
				{
					token = tokenString
				});
			}
			return response;
		}
		User AuthenticateUser(User loginCredentials)
		{
			//User user = appUsers.SingleOrDefault(x => (x.App == loginCredentials.App && isHotelToken(x.Code)));
			var user = appUsers.SingleOrDefault(x => x.Code == loginCredentials.Code);
			if (user != null)
			{
				user.Code = loginCredentials.Code;
				return user;
			}
			return user;
		}

		string GenerateJWTToken(User userInfo)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:securityKey"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, userInfo.Code),
				new Claim("app", userInfo.App),
				new Claim("code",userInfo.Code),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			};
			var token = new JwtSecurityToken(
			claims: claims,
			expires: DateTime.UtcNow.AddMinutes(120),
			issuer: string.Empty,
			audience: string.Empty,
			signingCredentials: credentials
			);
			return new JwtSecurityTokenHandler().WriteToken(token);
		}

	}
}
