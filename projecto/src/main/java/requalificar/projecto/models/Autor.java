package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name="Autor")
@Table(name="autor")
public class Autor 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", referencedColumnName = "id") //, nullable=false
    @JsonIgnore
	private Editora editora;

	
	
	@ManyToMany
	@JoinTable(name = "autor_livro", 
				joinColumns = @JoinColumn(name = "autor_id"),
				inverseJoinColumns = @JoinColumn(name = "livro_id"))
	
	@JoinColumn(name = "autor_id", referencedColumnName = "id") //, nullable=false
	private List<Livro> livros = new ArrayList<Livro>();
	
	// Getters & Setters
	private String nome;
	
	private String email;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getId() {
		return id;
	}

	public Editora getEditora() {
		return editora;
	}

	public void setEditora(Editora editora) {
		this.editora = editora;
	}

	public List<Livro> getLivros() {
		return livros;
	}

	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
}
