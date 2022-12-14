using cafeconmiel.Models;
using cafeconmiel.Models.MongoConfig;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class DocumentsService
	{
		private readonly IMongoCollection<DocumentModel> _DocumentsCollection;

		public DocumentsService(
			IOptions<DatabaseSettings> documentsDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				documentsDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				documentsDatabaseSettings.Value.DatabaseName);

			_DocumentsCollection = mongoDatabase.GetCollection<DocumentModel>("documentos");
		}

		public async Task<List<DocumentModel>> GetAsync() =>
			await _DocumentsCollection.Find(_ => true).ToListAsync();

		public async Task<DocumentModel?> GetAsync(string id) =>
			await _DocumentsCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(DocumentModel newDocument) =>
			await _DocumentsCollection.InsertOneAsync(newDocument);

		public async Task UpdateAsync(string id, DocumentModel updatedDocument) =>
			await _DocumentsCollection.ReplaceOneAsync(x => x.id == id, updatedDocument);

		public async Task RemoveAsync(string id) =>
			await _DocumentsCollection.DeleteOneAsync(x => x.id == id);
	}
}
