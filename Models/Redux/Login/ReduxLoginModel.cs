namespace cafeconmiel.Models
{
	public class ReduxLoginModel
	{
		public string? token { get; set; }
		public string? userId { get; set; }
		public bool isAdmin { get; set; } = false;

	}
}
