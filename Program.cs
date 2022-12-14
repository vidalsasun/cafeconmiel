using cafeconmiel.Interfaces;
using cafeconmiel.Models.MongoConfig;
using cafeconmiel.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Auth

builder.Services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
	{
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
		ValidateAudience = false,
		ValidateIssuerSigningKey = true,
		ValidateIssuer = false
	};
});
builder.Services.AddAuthorization(options =>
{
	var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
		JwtBearerDefaults.AuthenticationScheme);

	defaultAuthorizationPolicyBuilder =
		defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();

	options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
});
builder.Services.AddSingleton<IJwtAuthenticationService>(new JwtAuthenticationService(builder.Configuration["Jwt:SecretKey"]));



// MongoDB Settings
builder.Services.Configure<DatabaseSettings>(
builder.Configuration.GetSection("DocumentsDatabase"));
builder.Services.AddSingleton<DocumentsService>();
builder.Services.AddSingleton<UsersService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
	c.SwaggerEndpoint("/swagger/v1/swagger.json", "CFM API");
	c.RoutePrefix = "swagger";
});
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.Run();
