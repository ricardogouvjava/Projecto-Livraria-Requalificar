package requalificar.projecto.dto;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Autor;

public class SimpleResponseAutores extends SimpleResponse
{
	List<Autor> autores;
	
	public SimpleResponseAutores()
	{
		autores = new ArrayList<>();
	}

	public List<Autor> getAutores() {
		return autores;
	}

	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}

	
	
	
}
