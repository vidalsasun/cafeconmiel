using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeconmiel.Models
{
	public class Documentos
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? id { get; set; }

		public string Name { get; set; } = null!;

		public string Date { get; set; } = null!;

		public string Content { get; set; } = null!;

		public string Author { get; set; } = null!;
	}
}
