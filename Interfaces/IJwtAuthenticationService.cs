using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace cafeconmiel.Interfaces
{
	public interface IJwtAuthenticationService
	{
		string Authenticate(string app);
	}
}
