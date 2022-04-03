package requalificar.projecto.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
import requalificar.projecto.models.Livro;
import requalificar.projecto.repository.AutorRepo;
import requalificar.projecto.repository.LivroRepo;


@Service
public class LivroService 
{
	private final LivroRepo livroRepo;
	private final AutorRepo autorrepo;
	
	@Autowired
	public LivroService(LivroRepo livroRepo, AutorRepo autorrepo)
	{
		this.livroRepo = livroRepo;
		this.autorrepo = autorrepo;
	}
	
	
	/** Devolve livro usando id**/
	public Optional<Livro> getLivroById(Long id)
	{
		return livroRepo.findById(id);
	}
	
	
	/** Devolve livro usando ISBN**/
	public Livro getLivroByIsbn(String idIsbn)
	{
		for(Livro livro : getLivros())
		{
			if(livro.getIsbn().equals(idIsbn))
			{
				return livro;
			}
		}
		return null;
	}
	
	/** Devolve todos os livros na base de dados **/
	public List<Livro> getLivros()
	{
		List<Livro> livros = new ArrayList<Livro>();
		livroRepo.findAll().forEach(livros::add);
		return livros;
	}
	
	/** Adiciona livro a base de dados **/
	public boolean addLivro(Livro aLivro)
	{
		livroRepo.save(aLivro);
		for(Autor autor : aLivro.getAutores())
		{
			Autor autorTemp = autorrepo.findById(autor.getId()).get();
			autorTemp.addLivro(aLivro);
			autorrepo.save(autorTemp);
		}
		
		return true;	
	}
	
	/** Remove livro **/
	public boolean removeLivro(Livro aLivro)
	{
		livroRepo.delete(aLivro);
		return true;	
	}
	
	/** updates livro data 
	 * @throws ParseException 
	 * @throws IOException **/
	public boolean updateLivro(Livro aLivro) throws ParseException, IOException
	{
		Livro livroAlterar = getLivroByIsbn(aLivro.getIsbn());
		livroAlterar.setTitulo(aLivro.getTitulo());
		//livroAlterar.setAutores(aLivro.getAutores());
		livroAlterar.setPreco(aLivro.getPreco());
		livroAlterar.setStock(aLivro.getStock());
		//livroAlterar.setEditora(aLivro.getEditora());
		livroAlterar.setEdicao(aLivro.getEdicao());
		//livroAlterar.setImagem(aLivro.getImagem());
		livroAlterar.setSinopse(aLivro.getSinopse());
		livroRepo.save(livroAlterar);
		return true;
	}
	
	/** Verifica se ISBN ja existe na base de dados **/
 	public boolean existeIsbn(String idISBN)
	{
		for(Livro livro : getLivros())
		{
			if(livro.getIsbn().equals(idISBN))
			{
				return true;
			}
		}
		return false;
	}
 	
	/** Verifica se id existe na base de dados **/
 	public boolean existeId(Long id)
	{
 		if(!id.equals(null) && livroRepo.existsById(id))
 		{
 			return true;
 		}
 			return false;
	}


	public Livro getLivroMaisVendeu() {
		Comparator<Livro> compararVendido = Comparator
				.comparing(Livro::getVendidos)
				.reversed();

		return getLivros().stream().collect(Collectors.maxBy(compararVendido)).get();

	}


	public List<Livro> procuraLivros(String pesquisa)
	{
		List<Livro> livros = new ArrayList<Livro>();
		
		for(Livro livro : getLivros())
		{
			if(livro.getTitulo().contains(pesquisa))
			{
				livros.add(livro);
			}
			/*
			 * if(!livro.getEditora().equals(null)) {
			 * if(livro.getEditora().getNome().contains(pesquisa) &&
			 * !livros.contains(livro)) { livros.add(livro); } }
			 * if(livro.getAutores().size() > 0) { for(Autor autor : livro.getAutores()) {
			 * if(autor.getNome().contains(pesquisa) && !livros.contains(livro)) {
			 * livros.add(livro); } } }
			 */
		}

		return livros;
	}
	

}
