namespace cafeconmiel.Models.MongoConfig
{
	public class DatabaseSettings
	{
		public string ConnectionString { get; set; } = null!;

		public string DatabaseName { get; set; } = null!;

		public string CollectionName { get; set; } = null!;
	}
}
