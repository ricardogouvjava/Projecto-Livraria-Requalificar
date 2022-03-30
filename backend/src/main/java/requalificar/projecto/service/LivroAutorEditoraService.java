package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
import requalificar.projecto.models.Editora;
import requalificar.projecto.models.Livro;
import requalificar.projecto.repository.AutorRepo;
import requalificar.projecto.repository.EditoraRepo;
import requalificar.projecto.repository.LivroRepo;

@Service
public class LivroAutorEditoraService 
{
	private final LivroRepo livroRepo;
	private final AutorRepo autorRepo;
	private final EditoraRepo editoraRepo;
	
	@Autowired	
	public LivroAutorEditoraService(LivroRepo livroRepo, AutorRepo autorRepo, EditoraRepo editoraRepo)
	{
		this.livroRepo = livroRepo;
		this.autorRepo = autorRepo;
		this.editoraRepo = editoraRepo;
	}
	
	
	public boolean addAutorToLivro(Autor autor, Livro livro)
	{
		try
		{
			autor.addLivro(livro);			
			autorRepo.save(autor);
			
			livro.addAutor(autor);
			livroRepo.save(livro);

			
			if(!autor.getEditora().equals(null) && livro.getEditora().equals(null))
			{
				livro.setEditora(autor.getEditora());
				livroRepo.save(livro);
			}
				
				
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
		
	}


	public boolean addAutorToEditora(Autor autor, Editora editora) {
		try
		{
			if(autor.getLivros().size() > 0) {
				for(Livro livro : autor.getLivros())
				{
					editora.addLivro(livro);
					livro.setEditora(editora);
					livroRepo.save(livro);
				}				
			}
			
			editora.addAutor(autor);
			editoraRepo.save(editora);

			autor.setEditora(editora);			
			autorRepo.save(autor);
			return true;		
		}
		catch(Exception e)
		{
			return false;
		}
		
	}
	
	
	
	public boolean removeEditora(Editora editora)
	{
		try {
			List<Autor> autores = editora.getAutores();
			
			if(autores.size() > 0) {
				for(Autor autor: autores)
				{
					List<Livro> livros = autor.getLivros();
					if(livros.size()>0)
					{
						for(Livro livro : livros)
						{
							livroRepo.delete(livro);
						}
					}
					
					autorRepo.delete(autor);				
				}
			}
				
			editoraRepo.delete(editora);
			return true;
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return false;
	}
}
