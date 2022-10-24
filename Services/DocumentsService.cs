using cafeconmiel.Models;
using cafeconmiel.Models.MongoConfig;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class DocumentsService
	{
		private readonly IMongoCollection<Documentos> _DocumentsCollection;

		public DocumentsService(
			IOptions<DocumentDatabaseSettings> documentsDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				documentsDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				documentsDatabaseSettings.Value.DatabaseName);

			_DocumentsCollection = mongoDatabase.GetCollection<Documentos>(
				documentsDatabaseSettings.Value.DocumentsCollectionName);
		}

		public async Task<List<Documentos>> GetAsync() =>
			await _DocumentsCollection.Find(_ => true).ToListAsync();

		public async Task<Documentos?> GetAsync(string id) =>
			await _DocumentsCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(Documentos newDocument) =>
			await _DocumentsCollection.InsertOneAsync(newDocument);

		public async Task UpdateAsync(string id, Documentos updatedDocument) =>
			await _DocumentsCollection.ReplaceOneAsync(x => x.id == id, updatedDocument);

		public async Task RemoveAsync(string id) =>
			await _DocumentsCollection.DeleteOneAsync(x => x.id == id);
	}
}
