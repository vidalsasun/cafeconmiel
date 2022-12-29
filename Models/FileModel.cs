using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace cafeconmiel.Models
{
	public class FileModel
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? id { get; set; } = null!;

		public string documentid { get; set; } = null!;
		public string fileData { get; set; } = null!;
		public string fileName { get; set; } = null!;
		public string extension { get; set; } = null!;
	}
}
