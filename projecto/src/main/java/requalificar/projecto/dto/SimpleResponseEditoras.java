package requalificar.projecto.dto;

import java.util.List;

import requalificar.projecto.models.Editora;

public class SimpleResponseEditoras extends SimpleResponse
{
	List<Editora> editoras;
	
	public SimpleResponseEditoras()
	{
	}

	public List<Editora> getEditoras() {
		return editoras;
	}

	public void setEditoras(List<Editora> editoras) {
		this.editoras = editoras;
	}

		
	
}
