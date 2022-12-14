using cafeconmiel.Models;
using cafeconmiel.Models.MongoConfig;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace cafeconmiel.Services
{
	public class UsersService
	{
		private readonly IMongoCollection<User> _userCollection;

		public UsersService(
			IOptions<DatabaseSettings> usersDatabaseSettings)
		{
			var mongoClient = new MongoClient(
				usersDatabaseSettings.Value.ConnectionString);

			var mongoDatabase = mongoClient.GetDatabase(
				usersDatabaseSettings.Value.DatabaseName);

			_userCollection = mongoDatabase.GetCollection<User>(
				usersDatabaseSettings.Value.CollectionName);
		}

		public async Task<List<User>> GetAsync() =>
			await _userCollection.Find(_ => true).ToListAsync();

		public async Task<User?> GetAsync(string id) =>
			await _userCollection.Find(x => x.id == id).FirstOrDefaultAsync();

		public async Task CreateAsync(User newUser) =>
			await _userCollection.InsertOneAsync(newUser);

		public async Task UpdateAsync(string id, User updatedUser) =>
			await _userCollection.ReplaceOneAsync(x => x.id == id, updatedUser);

		public async Task RemoveAsync(string id) =>
			await _userCollection.DeleteOneAsync(x => x.id == id);
	}
}
