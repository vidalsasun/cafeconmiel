using cafeconmiel.Models;
using cafeconmiel.Models.MongoConfig;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class UsersService
	{
		private readonly IMongoCollection<UserModel> _userCollection;

		public UsersService(
			IOptions<DatabaseSettings> usersDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				usersDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				usersDatabaseSettings.Value.DatabaseName);

			_userCollection = mongoDatabase.GetCollection<UserModel>(
				usersDatabaseSettings.Value.CollectionName);
		}

		public async Task<List<UserModel>> GetAsync() =>
			await _userCollection.Find(_ => true).ToListAsync();

		public async Task<UserModel?> GetAsync(string id) =>
			await _userCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(UserModel newUser) =>
			await _userCollection.InsertOneAsync(newUser);

		public async Task UpdateAsync(string id, UserModel updatedUser) =>
			await _userCollection.ReplaceOneAsync(x => x.id == id, updatedUser);

		public async Task RemoveAsync(string id) =>
			await _userCollection.DeleteOneAsync(x => x.id == id);
	}
}
