package requalificar.projecto.dto;

import requalificar.projecto.models.Autor;
import requalificar.projecto.models.Editora;
import requalificar.projecto.models.Livro;

public class SimpleResponseLivroAutorEditora extends SimpleResponse
{
	Autor autor;
	Editora editora;
	Livro livro;
	
	public Editora getEditora() {
		return editora;
	}

	public void setEditora(Editora editora) {
		this.editora = editora;
	}

	public Livro getLivro() {
		return livro;
	}

	public void setLivro(Livro livro) {
		this.livro = livro;
	}

	public SimpleResponseLivroAutorEditora()
	{
	}

	public Autor getAutor() {
		return autor;
	}

	public void setAutor(Autor cliente) {
		this.autor = cliente;
	}
	
	
}
