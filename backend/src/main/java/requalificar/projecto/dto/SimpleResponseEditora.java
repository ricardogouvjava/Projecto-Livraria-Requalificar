package requalificar.projecto.dto;

import requalificar.projecto.models.Editora;

public class SimpleResponseEditora extends SimpleResponse
{
	Editora editora;
	
	public SimpleResponseEditora()
	{
	}

	public Editora getEditora() {
		return editora;
	}

	public void setEditora(Editora editora) {
		this.editora = editora;
	}

	
	
	
}
