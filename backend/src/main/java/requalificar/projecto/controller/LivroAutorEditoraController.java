package requalificar.projecto.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseEditoras;
import requalificar.projecto.models.Editora;
import requalificar.projecto.service.EditoraService;
import requalificar.projecto.service.LivroAutorEditoraService;
@CrossOrigin
@RestController
public class LivroAutorEditoraController 
{
	private final EditoraService editoraService;
	private final LivroAutorEditoraService livroAutorEditoraService;
	
	@Autowired
	public LivroAutorEditoraController(LivroAutorEditoraService livroAutorEditoraService, EditoraService editoraService) 
	{
		this.livroAutorEditoraService = livroAutorEditoraService;
		this.editoraService = editoraService;
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
