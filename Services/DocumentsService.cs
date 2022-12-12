using cafeconmiel.Models;
using cafeconmiel.Models.MongoConfig;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class DocumentsService
	{
		private readonly IMongoCollection<Documento> _DocumentsCollection;

		public DocumentsService(
			IOptions<DatabaseSettings> documentsDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				documentsDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				documentsDatabaseSettings.Value.DatabaseName);

			_DocumentsCollection = mongoDatabase.GetCollection<Documento>(
				documentsDatabaseSettings.Value.CollectionName);
		}

		public async Task<List<Documento>> GetAsync() =>
			await _DocumentsCollection.Find(_ => true).ToListAsync();

		public async Task<Documento?> GetAsync(string id) =>
			await _DocumentsCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(Documento newDocument) =>
			await _DocumentsCollection.InsertOneAsync(newDocument);

		public async Task UpdateAsync(string id, Documento updatedDocument) =>
			await _DocumentsCollection.ReplaceOneAsync(x => x.id == id, updatedDocument);

		public async Task RemoveAsync(string id) =>
			await _DocumentsCollection.DeleteOneAsync(x => x.id == id);
	}
}
