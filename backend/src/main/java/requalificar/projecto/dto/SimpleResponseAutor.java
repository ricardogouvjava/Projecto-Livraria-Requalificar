package requalificar.projecto.dto;

import requalificar.projecto.models.Autor;

public class SimpleResponseAutor extends SimpleResponse
{
	Autor autor;
	
	public SimpleResponseAutor()
	{
	}

	public Autor getAutor() {
		return autor;
	}

	public void setAutor(Autor cliente) {
		this.autor = cliente;
	}
	
	
}
