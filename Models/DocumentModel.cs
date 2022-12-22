using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace cafeconmiel.Models
{
	public class DocumentModel
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? id { get; set; } = null!;
		public string Type { get; set; } = null!;
		public string Name { get; set; } = null!;
		public string Grupo { get; set; } = null!;
		public string Corpus { get; set; } = null!;
		public string Archivo { get; set; } = null!;
		public string Signatura { get; set; } = null!;
		public string Folios { get; set; } = null!;
		public string Anyo { get; set; } = null!;
		public string Mes { get; set; } = null!;
		public string Dia { get; set; } = null!;
		public string Lugar { get; set; } = null!;
		public string Provincia { get; set; } = null!;
		public string Pais { get; set; } = null!;
		public string Regesto { get; set; } = null!;
		public string TipoDocumental { get; set; } = null!;
		public string Copista { get; set; } = null!;
		public string Firma { get; set; } = null!;
		public string Soporte { get; set; } = null!;
		public string Estado { get; set; } = null!;
		public string Transcriptor { get; set; } = null!;
		public string PrimerRevisor { get; set; } = null!;
		public string SegundoRevisor { get; set; } = null!;
		public string CreationDate { get; set; } = null!;
		public string Textopaleografico { get; set; } = null!;
		public string Textocritico { get; set; } = null!;
	}

}
