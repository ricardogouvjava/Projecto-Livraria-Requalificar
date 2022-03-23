package requalificar.projecto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
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
			livro.addAutor(autor);
			livroRepo.save(livro);

			autor.addLivro(livro);			
			autorRepo.save(autor);
			return true;		
		}
		catch(Exception e)
		{
			return false;
		}
		
	}
	
}
