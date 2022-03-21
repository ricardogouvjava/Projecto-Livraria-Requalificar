package requalificar.projecto.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseAutor;
import requalificar.projecto.dto.SimpleResponseAutores;
import requalificar.projecto.models.Autor;
import requalificar.projecto.service.AutorService;

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
	@PostMapping("/addAutor")
	public ResponseEntity<SimpleResponse> addAutor(@RequestBody Autor aAutor) throws ParseException
	{
		SimpleResponseAutor srA  = new SimpleResponseAutor();
		
		// Verifica se loginId ja existe
		if(aAutor.getId() != null || autorService.autorExiste(aAutor))
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

	/** Devolve todos os autores na base de dados **/
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
		srAs.setAsError("Nehum cliente na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srAs);	
	}
	
	/** Devolve Autor atravez de id **/
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
				
		srA.setAsSuccess("Sucesso ao encontar livro");
		srA.setAutor(autor.get());
		return ResponseEntity.status(HttpStatus.OK).body(srA);
	}
	
	/** Verifica se dados sao nulos **/
	public SimpleResponseAutor verificaDados(Autor aAutor) throws ParseException
	{
		SimpleResponseAutor srA = new SimpleResponseAutor();
		
		if(aAutor.getNome() == null || aAutor.getNome().isEmpty())
		{
			srA.setAsError("Falha no parametro nome: " + aAutor.getNome());
			return srA;	
		}
		
		
			
		if(aAutor.getEmail() == null || aAutor.getEmail().isEmpty())
		{
			srA.setAsError("Falha no parametro email: " + aAutor.getEmail());
			return srA;	
		}
		srA.setAsSuccess("Correcto");
		return srA;
	}
}
