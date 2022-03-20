package requalificar.projecto.dto;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Livro;

public class SimpleResponseLivros extends SimpleResponse
{
	List<Livro> livros;
	
	public SimpleResponseLivros()
	{
		livros = new ArrayList<>();
	}

	public List<Livro> getLivros() {
		return livros;
	}

	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}

	
	
	
}
