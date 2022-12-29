using cafeconmiel.Models;
using cafeconmiel.Services;
using Microsoft.AspNetCore.Mvc;

namespace cafeconmiel.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FilesController : Controller
	{
		private readonly FilesService _filesService;

		public FilesController(FilesService filesService) =>
			_filesService = filesService;


		[HttpGet]
		public async Task<List<FileModel>> Get() =>
			await _filesService.GetAsync();

		
		[HttpGet("{docid:length(24)}")]
		public async Task<ActionResult<List<FileModel>>> Get(string docid)
		{
			var file = await _filesService.GetByDocumentAsync(docid);

			if (file is null)
			{
				return NotFound();
			}

			return file;
		}

		[HttpPost]
		public async Task<IActionResult> Post(FileModel newFile)
		{
			await _filesService.CreateAsync(newFile);

			return CreatedAtAction(nameof(Get), new { id = newFile.id }, newFile);
		}

		[HttpPut("{id:length(24)}")]
		public async Task<IActionResult> Update(string id, FileModel updatedFile)
		{
			var file = await _filesService.GetAsync(id);

			if (file is null)
			{
				return NotFound();
			}

			updatedFile.id = file.id;

			await _filesService.UpdateAsync(id, updatedFile);

			return CreatedAtAction(nameof(Get), new { id = updatedFile.id }, updatedFile);
		}

		[HttpDelete("{id:length(24)}")]
		public async Task<IActionResult> Delete(string id)
		{
			var file = await _filesService.GetAsync(id);

			if (file is null)
			{
				return NotFound();
			}

			await _filesService.RemoveAsync(id);

			return NoContent();
		}
	}
}
