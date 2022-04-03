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
import requalificar.projecto.dto.SimpleResponseAutor;
import requalificar.projecto.dto.SimpleResponseAutores;
import requalificar.projecto.models.Autor;
import requalificar.projecto.service.AutorService;
@CrossOrigin
@RestController
public class AutorController
{
	private final AutorService autorService;
	
	@Autowired
	public AutorController(AutorService autorService)
	{
		this.autorService = autorService;
	}
	
	/** Adiciona autor a base de dados **/
	@CrossOrigin
	@PostMapping("/addAutor")
	public ResponseEntity<SimpleResponse> addAutor(@RequestBody Autor aAutor) throws ParseException
	{
		SimpleResponseAutor srA  = new SimpleResponseAutor();
		
		// Verifica se loginId ja existe
		if(aAutor.getId() != null || autorService.autorDadosExiste(aAutor))
		{
			srA.setAsError("Autor ja existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		SimpleResponseAutor checkData = verificaDados(aAutor);
		
		if(checkData.isStatus())
		{
			if(autorService.addAutor(aAutor))
			{
				srA.setAsSuccess("Sucesso ao introduzir Autor");
				srA.setAutor(aAutor);
				return ResponseEntity.status(HttpStatus.OK).body(srA);
			}
			
			srA.setAsError("Falha na criacao de autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		srA.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);	
	}
	

	/** Actualiza autor a base de dados **/
	@CrossOrigin
	@PutMapping("/updateAutor")
	public ResponseEntity<SimpleResponse> updateAutor(@RequestBody Autor aAutor) throws ParseException
	{
		SimpleResponseAutor srA  = new SimpleResponseAutor();
		
		// Verifica se loginId ja existe
		if(aAutor.getId() == null || autorService.autorDadosExiste(aAutor)) //atencao com o autorDadosExiste
		{
			srA.setAsError("Problema nos dados a actualizar");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		if(!autorService.existeAutorById(aAutor.getId()))
		{
			srA.setAsError("Autor inexistente com este id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		SimpleResponseAutor checkData = verificaDados(aAutor);
		
		if(checkData.isStatus())
		{
			if(autorService.updateAutor(aAutor))
			{
				srA.setAsSuccess("Sucesso ao actualizar Autor");
				srA.setAutor(aAutor);
				return ResponseEntity.status(HttpStatus.OK).body(srA);
			}
			
			srA.setAsError("Falha na actualizacao de autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		srA.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);	
	}
	

	/** Devolve todos os autores na base de dados **/
	@CrossOrigin
	@GetMapping("/getAutores")
	public ResponseEntity<SimpleResponse> getAutores()
	{
		SimpleResponseAutores srAs = new SimpleResponseAutores();
		
		List<Autor> autores = autorService.getAutores();
		
		if(!autores.isEmpty())
		{
			srAs.setAsSuccess("Autores na base de dados");
			srAs.setAutores(autores);
			return ResponseEntity.status(HttpStatus.OK).body(srAs);
		}
		srAs.setAsError("Nehum autor na base de dados");
		srAs.setAutores(autores);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srAs);	
	}
		
	/** Devolve Autor atravez de id **/
	@CrossOrigin
	@GetMapping("getAutor/{id}")
	public ResponseEntity<SimpleResponse> getAutor(@PathVariable String id)
	{
		SimpleResponseAutor srA = new SimpleResponseAutor();
			
		if(id == null || id.isBlank())
		{
			srA.setAsError("Falha no valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}

		Long idToGet = Long.parseLong(id);
		
		if(!autorService.existeAutorById(idToGet))
		{
			srA.setAsError("Autor inexistente com este id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		Optional<Autor> autor = autorService.getautorById(idToGet);
		
		if(autor == null || autor.isEmpty())
		{
			srA.setAsError("Falha em devolver autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
				
		srA.setAsSuccess("Sucesso ao encontar autor");
		srA.setAutor(autor.get());
		return ResponseEntity.status(HttpStatus.OK).body(srA);
	}
	/** Devolve Autor atravez de id **/
	@CrossOrigin
	@GetMapping("procuraAutor/{string}")
	public ResponseEntity<SimpleResponse> procuraAutor(@PathVariable String string)
	{
		SimpleResponseAutores srAs = new SimpleResponseAutores();
			
		if(string == null || string.isBlank())
		{
			srAs.setAsError("Falha no valor string");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srAs);
		}

		List<Autor> autores = autorService.procuraAutor(string);
		
		if(autores== null || autores.size() <= 0 ){
			srAs.setAsError("Nao existe autores com estes parametros");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srAs);
		}
				
		srAs.setAsSuccess("Sucesso ao encontar autores");
		srAs.setAutores(autores);
		return ResponseEntity.status(HttpStatus.OK).body(srAs);
	}
	
	/** Remove Autor atravez de id **/
	@CrossOrigin
	@DeleteMapping("/removeAutor/{id}")
	public ResponseEntity<SimpleResponse> removeAutor(@PathVariable String id)
	{
		SimpleResponseAutor srA = new SimpleResponseAutor();
			
		if(id == null || id.isBlank())
		{
			srA.setAsError("Falha no valor id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}

		Long idToRemove = Long.parseLong(id);
		
		if(!autorService.existeAutorById(idToRemove))
		{
			srA.setAsError("Autor inexistente com este id");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		Optional<Autor> autorToRemove = autorService.getautorById(idToRemove);
		
		if(autorToRemove == null || autorToRemove.isEmpty())
		{
			srA.setAsError("Falha em encontar autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		if(!autorService.removeAutor(autorToRemove.get()))
		{
			srA.setAsError("Falha em remover autor");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srA);
		}
		
		srA.setAsSuccess("Sucesso remover autor");
		return ResponseEntity.status(HttpStatus.OK).body(srA);
	}
	
	/** Verifica se dados sao nulos **/
	public SimpleResponseAutor verificaDados(Autor aAutor) throws ParseException
	{
		SimpleResponseAutor srA = new SimpleResponseAutor();
		
		if(aAutor.getNome() == null || aAutor.getNome().isEmpty())
		{
			srA.setAsError("Falha no parametro nome: ");
			return srA;	
		}
			
		if(aAutor.getEmail() == null || aAutor.getEmail().isEmpty())
		{
			srA.setAsError("Falha no parametro email: ");
			return srA;	
		}
		if(aAutor.getEditora().equals(null) || aAutor.getEditora().getId().equals(null))
		{
			srA.setAsError("Falha no parametro editora:");
			return srA;	
		}
		srA.setAsSuccess("Correcto");
		return srA;
	}
}
