package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
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
	
	public boolean updateAutor(Autor aAutor) 
	{
		try {
			Autor autor = autorRepo.findById(aAutor.getId()).get();
			if(aAutor.getNome() != null) 
			{
				autor.setNome(aAutor.getNome());
			}
			if(aAutor.getEmail()!= null) 
			{
				autor.setEmail(aAutor.getEmail());
			}
			if(aAutor.getEditora() != null) 
			{
				autor.setEditora(aAutor.getEditora());

			}
			autorRepo.save(autor);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	/** Devolve todos os autores na base de dados **/
	public List<Autor> getAutores()
	{
		List<Autor> autores = new ArrayList<Autor>();
		autorRepo.findAll().forEach(autores::add);
		return autores;
	}
	
	/** Verifica se existe autor com mesmo nome e email na base de dados **/
	public boolean autorDadosExiste(Autor aAutor)
	{
		for(Autor autor : getAutores())
		{
			if(autor.getNome().equals(aAutor.getNome()) || autor.getEmail().equals(aAutor.getEmail()))
			{
				return true;
			}
		}
		return false;
	}
	
	/** Verifica se existe autor com id **/
	public boolean existeAutorById(Long id)
	{
		return autorRepo.existsById(id);
	}
	
	
	
	/** Devolve autor atraves de id **/
	public Optional<Autor> getautorById(long id)
	{
		return autorRepo.findById(id);
	}

	/** Remove autor atraves de id **/
	public boolean removeAutor(Autor autor)
	{
		try {
			autorRepo.delete(autor);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public List<Autor> procuraAutor(String string) {
		List<Autor> autores = new ArrayList<Autor>();
		for(Autor autor : getAutores())
		{
			if(autor.getNome().contains(string))
			{
				autores.add(autor);
			}
		}
		return autores;
	}


	
}
