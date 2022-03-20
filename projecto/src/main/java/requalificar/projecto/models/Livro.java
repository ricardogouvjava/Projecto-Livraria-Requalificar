package requalificar.projecto.models;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import requalificar.projecto.utils.ImageFileToString;

@Entity(name="Livro")
@Table(name="livro")
public class Livro 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "livros")
	private List<Autor> autores;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", referencedColumnName = "id") //, nullable=false
    @JsonIgnore
	private Editora editora;

	private String titulo;
	private String isbn;
	private double preco;
	private int stock;
	private Date dataLancamento;
	private int paginas;
	private int edicao;
	private String sinopse;
	
	@Column(columnDefinition="text")
	private String imagem;
	
	
	//Getters
	public Long getId() {
		return id;
	}
	public String getIsbn() {
		return isbn;
	}
	public String getTitulo() {
		return titulo;
	}
	public List<Autor> getAutores() {
		return autores;
	}
	public Editora getEditora() {
		return editora;
	}
	
	public double getPreco() {
		return preco;
	}
	public int getStock() {
		return stock;
	}
	public Date getDataLancamento() {
		return dataLancamento;
	}
	public int getPaginas() {
		return paginas;
	}
	public int getEdicao() {
		return edicao;
	}
	public String getImagem() throws IOException {
		return ImageFileToString.decode(imagem);
	}
	public String getSinospe() {
		return sinopse;
	}

	// Setters	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}
	public void setEditora(Editora editora) {
		this.editora = editora;
	}
	public void setIsbn(String aIsn) {
		this.isbn = aIsn;
	}
	public void setPreco(double preco) {
		this.preco = preco;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public void setDataLancamento(String dataLancamento) throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		this.dataLancamento = simpleDateFormat.parse(dataLancamento);
	}
	public void setPaginas(int paginas) {
		this.paginas = paginas;
	}
	public void setEdicao(int edicao) {
		this.edicao = edicao;
	}
	public void setImagem(String aPath) throws IOException 
	{
		
		this.imagem = ImageFileToString.encode(aPath);
	}

	public void setSinopse(String sinopse) {
		this.sinopse = sinopse;
	}

	public String getSinopse() {
		return sinopse;
	}

	
}
