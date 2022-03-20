package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity(name="Editora")
@Table(name="editora")
public class Editora 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	
	
	@OneToMany(fetch=FetchType.LAZY, mappedBy = "editora", targetEntity=Autor.class)
	List<Autor> autores = new ArrayList<Autor>();

	@OneToMany(fetch=FetchType.LAZY, mappedBy = "editora", targetEntity=Livro.class)
	List<Livro> livros = new ArrayList<Livro>();

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private String nome;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Autor> getAutores() {
		return autores;
	}

	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}

	public List<Livro> getLivros() {
		return livros;
	}

	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}
	
	
}
