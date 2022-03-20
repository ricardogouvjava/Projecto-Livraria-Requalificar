package requalificar.projecto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.service.EditoraService;

@RestController
public class EditoraController
{
	private final EditoraService editoraService;
	
	@Autowired
	public EditoraController(EditoraService editoraService)
	{
		this.editoraService = editoraService;
	}
	
}
