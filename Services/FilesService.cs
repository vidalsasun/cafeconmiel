using cafeconmiel.Models.MongoConfig;
using cafeconmiel.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class FilesService
	{
		private readonly IMongoCollection<FileModel> _ServicesCollection;

		public FilesService(
			IOptions<DatabaseSettings> filesDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				filesDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				filesDatabaseSettings.Value.DatabaseName);

			_ServicesCollection = mongoDatabase.GetCollection<FileModel>("archivos");
		}

		public async Task<List<FileModel>> GetAsync() =>
			await _ServicesCollection.Find(_ => true).ToListAsync();

		public async Task<FileModel?> GetAsync(string id) =>
			await _ServicesCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task<List<FileModel>?> GetByDocumentAsync(string document) =>
			await _ServicesCollection.Find(x => x.documentid == document).ToListAsync();

		public async Task CreateAsync(FileModel newFile) =>
			await _ServicesCollection.InsertOneAsync(newFile);

		public async Task UpdateAsync(string id, FileModel updatedFile) =>
			await _ServicesCollection.ReplaceOneAsync(x => x.id == id, updatedFile);

		public async Task RemoveAsync(string id) =>
			await _ServicesCollection.DeleteOneAsync(x => x.id == id);
	}
}
