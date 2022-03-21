package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
import requalificar.projecto.models.Editora;
import requalificar.projecto.repository.AutorRepo;

@Service
public class AutorService 
{
	private final AutorRepo autorRepo;
	
	@Autowired
	public AutorService(AutorRepo autorRepo)
	{
		this.autorRepo = autorRepo;
	}

	/** Adiciona autor a base de dados **/
	public boolean addAutor(Autor aAutor)
	{
		autorRepo.save(aAutor);
		return true;	
	}
	
	/** Devolve todos os autores na base de dados **/
	public List<Autor> getAutores()
	{
		List<Autor> autores = new ArrayList<Autor>();
		autorRepo.findAll().forEach(autores::add);
		return autores;
	}
	
	/** Verifica se existe autor com mesmo nome e email na base de dados **/
	public boolean autorExiste(Autor aAutor)
	{
		for(Autor autor : getAutores())
		{
			if(autor.getNome().equals(aAutor.getNome()) && autor.getEmail().equals(aAutor.getEmail()))
			{
				return true;
			}
		}
		return false;
	}
	
	/** Verifica se existe autor com id **/
	public boolean existeAutorById(Long id)
	{
		if(id.equals(null))
		{
			return false;
		}
		return autorRepo.existsById(id);
	}
	
	
	
	/** Devolve editora atraves de id **/
	public Optional<Autor> getautorById(long id)
	{
		return autorRepo.findById(id);
	}
	
}
