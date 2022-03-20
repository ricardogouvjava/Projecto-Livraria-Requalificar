package requalificar.projecto.dto;

import requalificar.projecto.models.Livro;

public class SimpleResponseLivro extends SimpleResponse
{
	Livro livro;
	
	public SimpleResponseLivro()
	{
	}

	public Livro getLivro()
	{
		return livro;
	}

	public void setLivro(Livro cliente) 
	{
		this.livro = cliente;
	}
	
	
}
