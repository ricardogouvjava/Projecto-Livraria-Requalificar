package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity(name="Editora")
@Table(name="editora")
public class Editora 
{
	@Override
	public String toString() {
		return "Editora [id=" + id + ", nome=" + nome + ", autores=" + autores + ", livros=" + livros + ", morada="
				+ morada + "]";
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	
	private String nome;
	
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY, mappedBy = "editora", targetEntity=Autor.class)
	List<Autor> autores = new ArrayList<Autor>();

	@OneToMany(fetch=FetchType.LAZY, mappedBy = "editora", targetEntity=Livro.class)
	List<Livro> livros = new ArrayList<Livro>();

	private String morada;
	
	
	
	public void addAutor(Autor autor) {
		autores.add(autor);
		
	}
	
	public void removeAutor(Autor autor) {
		autores.remove(autor);
		
	}
	
	public void addLivro(Livro livro) {
		livros.add(livro);
	}
	public void removeLivro(Livro livro) {
		livros.remove(livro);
	}
	
	
	public String getMorada() {
		return morada;
	}

	public void setMorada(String morada) {
		this.morada = morada;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



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
