package requalificar.projecto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.repository.EditoraRepo;

@Service
public class EditoraService 
{
	private final EditoraRepo editoraRepo;
	
	@Autowired
	public EditoraService(EditoraRepo editoraRepo)
	{
		this.editoraRepo = editoraRepo;
	}
}
