package requalificar.projecto.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseLivro;
import requalificar.projecto.dto.SimpleResponseLivros;
import requalificar.projecto.models.Livro;
import requalificar.projecto.service.LivroService;

@RestController
public class LivroController
{
	private final LivroService livroService;
	private SimpleResponseLivro srL;
	private SimpleResponseLivros srLs;
	
	@Autowired
	public LivroController(LivroService livroService)
	{
		this.livroService = livroService;
	}
	
	/** Devolve livro usando idisbn**/
	@GetMapping("/getLivroByIsbn/{isbn}")
	public ResponseEntity<SimpleResponse> getLivroByIsbn(@PathVariable String isbn)
	{
	srL = new SimpleResponseLivro();
	
	Livro livro = livroService.getLivroByIsbn(isbn);
	
	if(livro == null)
	{
		srL.setAsError("isbn nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
	}
	srL.setAsSuccess("Livro encontrado");
	srL.setLivro(livro);
	return ResponseEntity.status(HttpStatus.OK).body(srL);
	
	}
	
	/** Devolve todos os livros na base de dados **/
	@GetMapping("/getLivros")
	public ResponseEntity<SimpleResponse> getLivros()
	{
		srLs = new SimpleResponseLivros();
		
		List<Livro> livros = livroService.getLivros();
		
		if(!livros.isEmpty())
		{
			srLs.setAsSuccess("Livros na base de dados");
			srLs.setLivros(livros);
			return ResponseEntity.status(HttpStatus.OK).body(srLs);
		}
		srLs.setAsError("Nehum livro na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srLs);	
	}
	
	/** Adiciona livro a base de dados 
	 * @throws IOException **/
	@PostMapping("/addLivro")
	public ResponseEntity<SimpleResponse> addLivro(@RequestBody Livro aLivro) throws ParseException, IOException
	{
		SimpleResponseLivro srL = new SimpleResponseLivro();
		
		// Verifica se isbn ja existe
		if(livroService.existeIsbn(aLivro.getIsbn()))
		{
			srL.setAsError("isbn ja existente na Base de Dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		
		SimpleResponseLivro checkData = verificaDados(aLivro);
		
		if(checkData.isStatus())
		{
			if(livroService.addLivro(aLivro))
			{
				srL.setAsSuccess("Sucesso ao introduzir Livro");
				srL.setLivro(aLivro);
				return ResponseEntity.status(HttpStatus.OK).body(srL);
			}
			
			srL.setAsError("Falha na criacao de livro");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		srL.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);	
	}
	
	/** remove livro atraves do isbn **/
	@DeleteMapping("/removeLivroByIsbn/{isbn}")
	public ResponseEntity<SimpleResponse> removeLivroByIsbn(@PathVariable String isbn)
	{
		srL = new SimpleResponseLivro();
		
		// Verifica se isbn nao existe
		if(isbn == null || isbn.isBlank() || !livroService.existeIsbn(isbn))
		{
			srL.setAsError("isbn nao existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		
		Livro livroToDelete = livroService.getLivroByIsbn(isbn);
	
		if(livroToDelete != null)
		{
			livroService.removeLivro(livroToDelete);
			srL.setAsSuccess("Sucesso ao remover livro");
			srL.setLivro(livroToDelete);
			return ResponseEntity.status(HttpStatus.OK).body(srL);
		}	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);	
	}
	
	/** Updates informacao livro: 
	 * @throws IOException **/
	@PutMapping("/updateLivro")
	public ResponseEntity<SimpleResponseLivro> updateLivro(@RequestBody Livro aLivro) throws ParseException, IOException
	{
		SimpleResponseLivro srL = new SimpleResponseLivro();
		
		if(aLivro.equals(null))
		{
			srL.setAsError("Falha na introducao de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		
		if(aLivro.getId().equals(null) || aLivro.getIsbn() == null)
		{
			srL.setAsError("Falha na introducao de id / isbn");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		
		// Verifica se livroexiste
		if(!livroService.existeIsbn(aLivro.getIsbn()) || !livroService.existeId(aLivro.getId()))
		{
			srL.setAsError("Isbn / id nao existente na base de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
		}
		
		SimpleResponseLivro checkData = verificaDados(aLivro);
		
		if(checkData.isStatus())
		{
			try {
				if(livroService.updateLivro(aLivro))
				{
					srL.setAsSuccess("Sucesso em actualizar livro");
					srL.setLivro(livroService.getLivroByIsbn(aLivro.getIsbn()));
					return ResponseEntity.status(HttpStatus.OK).body(srL);
				}
			} catch (ParseException | IOException e) {
				e.printStackTrace();
				srL.setAsError("Falha no update do livro");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
			}
		}
		srL.setAsError(checkData.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srL);
	}
		
	/** Verifica se dados sao nulos 
	 * @throws IOException **/
	public SimpleResponseLivro verificaDados(Livro aLivro) throws ParseException, IOException
	{
		srL = new SimpleResponseLivro();
		
		if(aLivro == null)
		{
			srL.setAsError("Falha no objecto:" + aLivro);
			return srL;	
		}

		if(aLivro.getIsbn() == null || aLivro.getIsbn().isEmpty())
		{
			srL.setAsError("Falha no parametro isbn: " + aLivro.getIsbn());
			return srL;	
		}
		
		if(aLivro.getTitulo().equals(null) || aLivro.getTitulo().isEmpty())
		{
			srL.setAsError("Falha no parametro titulo: " + aLivro.getTitulo());
			return srL;	
		}
		
		/*
		 * if(aLivro.getAutores() == null || aLivro.getAutores().isEmpty()) {
		 * srL.setAsError("Falha no parametro autores: " + aLivro.getAutores()); return
		 * srL; }
		 * 
		 * if(aLivro.getEditora() == null ) {
		 * srL.setAsError("Falha no parametro editora: " + aLivro.getEditora()); return
		 * srL; }
		 */		
		
		if(aLivro.getPreco() <=0)
		{
			srL.setAsError("Falha no parametro preco: " + aLivro.getPreco());
			return srL;	
		}
		
		if(aLivro.getStock() <=0)
		{
			srL.setAsError("Falha no parametro stock: " + aLivro.getStock());
			return srL;	
		}
		
		// Ferramenta para comparacao de data
		Calendar c = Calendar.getInstance();
		c.setTime(new Date(System.currentTimeMillis()));
		//c.add(Calendar.YEAR, -16);
		
		if(aLivro.getDataLancamento() == null || aLivro.getDataLancamento().after(c.getTime()))
		{
			srL.setAsError("Falha no parametro data: " + aLivro.getDataLancamento());
			return srL;	
		}
		
		if(aLivro.getPaginas() <=0)
		{
			srL.setAsError("Falha no parametro paginas: " + aLivro.getPaginas());
			return srL;	
		}
		
		if(aLivro.getEdicao() <=0)
		{
			srL.setAsError("Falha no parametro edicao: " + aLivro.getEdicao());
			return srL;	
		}
		
		if(aLivro.getImagem().equals(null))
		{
			srL.setAsError("Falha no parametro imagem: " + aLivro.getImagem());
			return srL;	
		}
		
		if(aLivro.getSinopse() == null || aLivro.getSinopse().isEmpty())
		{
			srL.setAsError("Falha no parametro sinopse: " + aLivro.getSinopse());
			return srL;	
		}
		
		srL.setAsSuccess("Correcto");
		return srL;
	}
}
