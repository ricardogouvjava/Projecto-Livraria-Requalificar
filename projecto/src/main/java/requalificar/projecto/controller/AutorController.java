package requalificar.projecto.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		if(aAutor.getId() != null)
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
	public ResponseEntity<SimpleResponse> getClientes()
	{
		SimpleResponseAutores srAs = new SimpleResponseAutores();
		
		List<Autor> autores = autorService.getAutores();
		
		if(!autores.isEmpty())
		{
			srAs.setAsSuccess("Clientes na base de dados");
			srAs.setAutores(autores);
			return ResponseEntity.status(HttpStatus.OK).body(srAs);
		}
		srAs.setAsError("Nehum cliente na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srAs);	
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
