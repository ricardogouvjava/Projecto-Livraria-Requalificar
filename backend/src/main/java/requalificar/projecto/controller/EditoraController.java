package requalificar.projecto.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseEditoras;
import requalificar.projecto.dto.SimpleResponseEditora;
import requalificar.projecto.models.Editora;
import requalificar.projecto.service.EditoraService;

@CrossOrigin
@RestController
public class EditoraController
{
	private final EditoraService editoraService;
	
	@Autowired
	public EditoraController(EditoraService editoraService)
	{
		this.editoraService = editoraService;
	}
	
	@CrossOrigin
	@PostMapping("/addEditora")
	public ResponseEntity<SimpleResponse> addEditora(@RequestBody Editora editora) throws ParseException
	{
		SimpleResponseEditora srE  = new SimpleResponseEditora();
		
		if(editora.getId() != null || editoraService.existeEditora(editora))
		{
			srE.setAsError("Editora ja existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
		
		SimpleResponseEditora checkData = verificaDados(editora);
		
		if(checkData.isStatus())
		{
			if(editoraService.addEditora(editora))
			{
				srE.setAsSuccess("Sucesso ao introduzir Editora");
				srE.setEditora(editora);
				return ResponseEntity.status(HttpStatus.OK).body(srE);
			}
			
			srE.setAsError("Falha na criacao da Editora");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
		srE.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);	
	}

	/**Actualiza dados da Editora **/
	@CrossOrigin
	@PutMapping("/updateEditora")
	public ResponseEntity<SimpleResponse> updateEditora(@RequestBody Editora editora) throws ParseException
	{
		SimpleResponseEditora srE  = new SimpleResponseEditora();
		
		if(editora.getId() == null || editoraService.existeEditora(editora))
		{
			srE.setAsError("Falha no id ou ja existente ");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
		
		SimpleResponseEditora checkData = verificaDados(editora);
		
		if(checkData.isStatus())
		{
			if(editoraService.updateEditora(editora))
			{
				srE.setAsSuccess("Sucesso ao actualizar Editora");
				srE.setEditora(editora);
				return ResponseEntity.status(HttpStatus.OK).body(srE);
			}
			
			srE.setAsError("Falha actualizar Editora");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
		srE.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);	
	}

	/** Devolve todos os editoras na base de dados **/
	@CrossOrigin
	@GetMapping("/getEditoras")
	public ResponseEntity<SimpleResponse> getEditoras()
	{
		SimpleResponseEditoras srEs = new SimpleResponseEditoras();
		
		List<Editora> editoras = editoraService.getEditoras();
		
		if(!editoras.isEmpty())
		{
			srEs.setAsSuccess("Editoras na base de dados:");
			srEs.setEditoras(editoras);
			return ResponseEntity.status(HttpStatus.OK).body(srEs);
		}
		srEs.setAsError("Nehum cliente na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);	
	}
		
	/** Devolve Editora atravez de nome **/
	@CrossOrigin
	@GetMapping("procuraEditora/{string}")
	public ResponseEntity<SimpleResponse> procuraEditora(@PathVariable String string)
	{
		SimpleResponseEditoras srEs = new SimpleResponseEditoras();
			
		if(string == null || string.isBlank())
		{
			srEs.setAsError("Falha no valor string");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);
		}


		
		List<Editora> editoras = editoraService.procuraEditora(string);
		
		if(editoras == null || editoras.isEmpty())
		{
			srEs.setAsError("Nao existe editoras com estes parametros");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srEs);
		}
				
		srEs.setAsSuccess("Sucesso ao encontar Editoras");
		srEs.setEditoras(editoras);
		return ResponseEntity.status(HttpStatus.OK).body(srEs);
	}
	/** Devolve Editora atravez de id **/
	@CrossOrigin
	@GetMapping("getEditora/{id}")
	public ResponseEntity<SimpleResponse> getEditora(@PathVariable String id)
	{
		SimpleResponseEditora srE = new SimpleResponseEditora();
			
		if(id == null || id.isBlank())
		{
			srE.setAsError("Falha no valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}

		Long idToGet = Long.parseLong(id);
		
		if(!editoraService.existeId(idToGet))
		{
			srE.setAsError("Editora inexistente com este id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
		
		Optional<Editora> editora = editoraService.getEditoraById(idToGet);
		
		if(editora == null || editora.isEmpty())
		{
			srE.setAsError("Falha em devolver editora");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srE);
		}
				
		srE.setAsSuccess("Sucesso ao encontar editora");
		srE.setEditora(editora.get());
		return ResponseEntity.status(HttpStatus.OK).body(srE);
	}
	

	private SimpleResponseEditora verificaDados(Editora editora) 
	{
		SimpleResponseEditora srE = new SimpleResponseEditora();
		
		if(editora.getNome() == null || editora.getNome().isEmpty())
		{
			srE.setAsError("Falha no parametro nome: " + editora.getNome());
			return srE;	
		}
		
		
			
		if(editora.getMorada() == null || editora.getMorada().isEmpty())
		{
			srE.setAsError("Falha no parametro morada: " + editora.getMorada());
			return srE;	
		}
		srE.setAsSuccess("Correcto");
		return srE;
	}
	
	
	
	
	
}
