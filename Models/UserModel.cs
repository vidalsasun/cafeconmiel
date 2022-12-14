using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace cafeconmiel.Models
{
	public class UserModel
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? id { get; set; }
		public string Name { get; set; } = null!;
		public string Login { get; set; } = null!;
		public string Pass { get; set; } = null!;
		public bool isAdmin { get; set; } = false!;
		public string Creationdate { get; set; } = null!;

	}
}