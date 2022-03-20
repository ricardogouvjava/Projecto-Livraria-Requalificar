package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;

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
	
	/** Devolve todos os autores na base de dados **/
	public List<Autor> getAutores()
	{
		List<Autor> autores = new ArrayList<Autor>();
		autorRepo.findAll().forEach(autores::add);
		return autores;
	}
}
