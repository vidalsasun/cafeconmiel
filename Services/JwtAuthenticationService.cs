using cafeconmiel.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace cafeconmiel.Services
{
	public class JwtAuthenticationService : IJwtAuthenticationService
	{
		private readonly string _key;
		public JwtAuthenticationService(string key)
		{
			_key = key;
		}
		public string Authenticate(string app)
		{
			if (string.IsNullOrEmpty(app) || app != "angularQ4G")
			{
				return null;
			}
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.ASCII.GetBytes(_key);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Name, app)
				}),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
