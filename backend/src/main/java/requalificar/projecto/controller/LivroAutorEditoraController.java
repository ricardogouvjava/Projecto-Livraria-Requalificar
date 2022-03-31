package requalificar.projecto.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseEditoras;
import requalificar.projecto.dto.SimpleResponseLivroAutorEditora;
import requalificar.projecto.models.Autor;
import requalificar.projecto.models.Editora;
import requalificar.projecto.models.Livro;
import requalificar.projecto.service.AutorService;
import requalificar.projecto.service.EditoraService;
import requalificar.projecto.service.LivroAutorEditoraService;
import requalificar.projecto.service.LivroService;
@CrossOrigin
@RestController
public class LivroAutorEditoraController 
{
	private final LivroService livroService;
	private final AutorService autorService;
	private final EditoraService editoraService;
	private final LivroAutorEditoraService livroAutorEditoraService;
	
	@Autowired
	public LivroAutorEditoraController(LivroAutorEditoraService livroAutorEditoraService, LivroService livroService, AutorService autorService, EditoraService editoraService) 
	{
		this.livroAutorEditoraService = livroAutorEditoraService;
		this.livroService = livroService;
		this.autorService = autorService;
		this.editoraService = editoraService;
	}
	@CrossOrigin
	@PostMapping("/addAutor/{autorId}/ToLivro/{livroId}")
	public ResponseEntity<SimpleResponse> addAutorToLivro(@PathVariable String autorId, @PathVariable String livroId)
	{
		SimpleResponseLivroAutorEditora srLAE = new SimpleResponseLivroAutorEditora();
		
		Long autorIdAssociar = Long.parseLong(autorId);
		Long livroIdAssociar = Long.parseLong(livroId);
		
		
		if(autorIdAssociar == null || livroIdAssociar==null)
		{
			srLAE.setAsError("Falha num valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
				
		
		if(!autorService.existeAutorById(autorIdAssociar))
		{
			srLAE.setAsError("Falha ao encontrar autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		if(!livroService.existeId(livroIdAssociar))
		{
			srLAE.setAsError("Falha ao encontrar livro");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		Autor autor = autorService.getautorById(autorIdAssociar).get();	
		Livro livro = livroService.getLivroById(livroIdAssociar).get();	
		

		if(livro.getAutores().size() >0 && !livro.getAutores().contains(autor)) 
		{
			srLAE.setAsError("Autor ja adicionado");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		
		
		if(!livroAutorEditoraService.addAutorToLivro(autor, livro)) 
		{
			srLAE.setAsError("Falha ao associar");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);	
		}

		srLAE.setAsSuccess("Sucesso em associar Livro a autor");
		srLAE.setAutor(autor);
		srLAE.setLivro(livro);
		return ResponseEntity.status(HttpStatus.OK).body(srLAE);

		
	}
	@CrossOrigin
	@PostMapping("/addAutor/{autorId}/ToEditora/{erditoraId}")
	public ResponseEntity<SimpleResponse> addAutorToEditora(@PathVariable String autorId, @PathVariable String erditoraId)
	{
		SimpleResponseLivroAutorEditora srLAE = new SimpleResponseLivroAutorEditora();
		
		Long autorIdAssociar = Long.parseLong(autorId);
		Long editoraIdAssociar = Long.parseLong(erditoraId);
		
		
		if(autorIdAssociar == null || editoraIdAssociar==null)
		{
			srLAE.setAsError("Falha num valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
				
		
		if(!autorService.existeAutorById(autorIdAssociar))
		{
			srLAE.setAsError("Falha ao encontrar autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		if(!editoraService.existeId(editoraIdAssociar))
		{
			srLAE.setAsError("Falha ao encontrar livro");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		Autor autor = autorService.getautorById(autorIdAssociar).get();	
		Editora editora = editoraService.getEditoraById(editoraIdAssociar).get();	
		

		if(editora.getAutores().size() >0 && !editora.getAutores().contains(autor)) 
		{
			srLAE.setAsError("Autor ja adicionado");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		}
		
		
		
		if(livroAutorEditoraService.addAutorToEditora(autor, editora)) 
		{
			srLAE.setAsSuccess("Sucesso em associar Autor a Editora");
			srLAE.setAutor(autor);
			srLAE.setEditora(editora);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);	
		}
		srLAE.setAsError("Falha ao associar");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLAE);
		
		
		
	}
	
	/** Remove editora **/
	@CrossOrigin
	@DeleteMapping("/removeEditora/{id}")
	public ResponseEntity<SimpleResponse> removeEditora(@PathVariable String id)
	{
		SimpleResponseEditoras srEs = new SimpleResponseEditoras();
		
		if(id.equals(null) || id.isBlank())
		{
			srEs.setAsError("Falha no valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);
		}

		Long idToDelete = Long.parseLong(id);
		
		if(!editoraService.existeId(idToDelete))
		{
			srEs.setAsError("Editora inexistente com este id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);
		}
		
		Optional<Editora> editora = editoraService.getEditoraById(idToDelete);
		
		if(editora.equals(null) || editora.isEmpty())
		{
			srEs.setAsError("Falha em encontar Editora");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);	
		}
				
		if(livroAutorEditoraService.removeEditora(editora.get()))
		{
			srEs.setAsSuccess("Editora removida na base de dados:");
			srEs.setEditoras(editoraService.getEditoras());
			return ResponseEntity.status(HttpStatus.OK).body(srEs);
		}
		srEs.setAsError("Nao foi possivel remover da base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);	
	}
	
	
	
}
