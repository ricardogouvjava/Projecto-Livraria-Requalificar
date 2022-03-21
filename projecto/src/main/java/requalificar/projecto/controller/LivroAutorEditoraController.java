package requalificar.projecto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.service.AutorService;
import requalificar.projecto.service.EditoraService;
import requalificar.projecto.service.LivroService;

@RestController
public class LivroAutorEditoraController 
{
	private final LivroService livroService;
	private final AutorService autorService;
	private final EditoraService editoraService;
	
	@Autowired
	public LivroAutorEditoraController(LivroService livroService, AutorService autorService, EditoraService editoraService) 
	{
		this.livroService = livroService;
		this.autorService = autorService;
		this.editoraService = editoraService;
	}
	
	@PostMapping("/addAutor/{autorId}/Livro/{livroId}")
	public ResponseEntity<SimpleResponse> addAutorToLivro(@PathVariable String autorId, @PathVariable String livroId)
	{
		return null;
		
	}
	
	@PostMapping("/addAutor/{autorId}/Editora/{erditoraId}")
	public ResponseEntity<SimpleResponse> addAutorToEditora(@PathVariable String autorId, @PathVariable String erditoraId)
	{
		return null;
		
	}
	
}
