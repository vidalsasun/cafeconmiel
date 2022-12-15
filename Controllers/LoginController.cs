﻿using cafeconmiel.Interfaces;
using cafeconmiel.Models;
using cafeconmiel.Services;
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
		
		private readonly UsersService _usersService;
		private List<UserModel> appUsers = new List<UserModel>
		{
			new UserModel { Login = "admincfm", Pass = "a", isAdmin = true, Name = "admincfm" },
		};

		public LoginController(IConfiguration config,
			IJwtAuthenticationService authService,
			IWebHostEnvironment env,
			UsersService usersService
			)
		{
			_config = config;
			_authSrv = authService;
			_env = env;
			_usersService = usersService;
		}
		[HttpPost]
		public IActionResult Post(ClaimModel login)
		{
			IActionResult response = Unauthorized();
			UserModel user = AuthenticateUser(login);
			if (user != null)
			{
				var tokenString = GenerateJWTToken(user);

				ReduxLoginModel rModel = new ReduxLoginModel()
				{
					isAdmin = user.isAdmin,
					token = tokenString
				};

				response = Ok(new
				{
					rModel = rModel
				});
			}
			return response;
		}
		UserModel AuthenticateUser(ClaimModel loginCredentials)
		{
			//ClaimModel user = appUsers.SingleOrDefault(x => (x.App == loginCredentials.App && isHotelToken(x.Code)));
			var user = _usersService.GetAsync().Result.SingleOrDefault(x => x.Login == loginCredentials.App && x.Pass == loginCredentials.Code);
			if (user != null)
			{
				user.id = loginCredentials.Id;
				return user;
			}
			return user;
		}

		string GenerateJWTToken(UserModel userInfo)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:securityKey"]));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, userInfo.Name),
				new Claim("login", userInfo.Login),
				new Claim("pass",userInfo.Pass),
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
