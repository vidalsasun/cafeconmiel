namespace cafeconmiel.Models.MongoConfig
{
	public class DocumentDatabaseSettings
	{
		public string ConnectionString { get; set; } = null!;

		public string DatabaseName { get; set; } = null!;

		public string DocumentsCollectionName { get; set; } = null!;
	}
}
