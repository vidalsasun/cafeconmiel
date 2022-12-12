using cafeconmiel.Models;
using cafeconmiel.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cafeconmiel.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	//[Authorize]
	public class DocumentsController : ControllerBase
	{
		private readonly DocumentsService _documentsService;

		public DocumentsController(DocumentsService documentsService) =>
			_documentsService = documentsService;


		[HttpGet]
		public async Task<List<Documento>> Get() =>
			await _documentsService.GetAsync();

		[HttpGet("{id:length(24)}")]
		public async Task<ActionResult<Documento>> Get(string id)
		{
			var document = await _documentsService.GetAsync(id);

			if (document is null)
			{
				return NotFound();
			}

			return document;
		}

		[HttpPost]
		public async Task<IActionResult> Post(Documento newDocument)
		{
			await _documentsService.CreateAsync(newDocument);

			return CreatedAtAction(nameof(Get), new { id = newDocument.id }, newDocument);
		}

		[HttpPut("{id:length(24)}")]
		public async Task<IActionResult> Update(string id, Documento updatedDocument)
		{
			var document = await _documentsService.GetAsync(id);

			if (document is null)
			{
				return NotFound();
			}

			updatedDocument.id = document.id;

			await _documentsService.UpdateAsync(id, updatedDocument);

			return NoContent();
		}

		[HttpDelete("{id:length(24)}")]
		public async Task<IActionResult> Delete(string id)
		{
			var document = await _documentsService.GetAsync(id);

			if (document is null)
			{
				return NotFound();
			}

			await _documentsService.RemoveAsync(id);

			return NoContent();
		}
	}
}
