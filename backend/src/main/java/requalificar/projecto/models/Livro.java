package requalificar.projecto.models;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="Livro")
public class Livro 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToMany(mappedBy = "livros", fetch = FetchType.LAZY)
	private List<Autor> autores = new ArrayList<Autor>();
	
	@JsonIgnore
	@ManyToMany(mappedBy = "livros", fetch = FetchType.LAZY)
	private List<Venda> vendas = new ArrayList<Venda>();
		
	private String titulo;
	@Column(unique = true)
	private String isbn;
	private double preco;
	private int stock;
	
	@Column(name="data_de_lancamento")
	private Date dataDeLancamento;
	
	private int paginas;
	
	private int edicao;
	
	private String sinopse;

	@Column(columnDefinition="text")
	private String imagem;
	
	private int vendidos;
	
		
	//Methods
	public void addVenda(Venda venda, Integer quantidade)
	{
		vendas.add(venda);
		this.stock -= quantidade;
		this.vendidos +=1;
		
	}
	
	
	//Getters
	public Long getId()
	{
		return id;
	}
	public String getIsbn() 
	{
		return isbn;
	}
	public String getTitulo()
	{
		return titulo;
	}
	public List<Autor> getAutores()
	{
		return autores;
	}
	public double getPreco() 
	{
		return preco;
	}
	public int getStock() {
		return stock;
	}
	public int getPaginas() {
		return paginas;
	}
	public int getEdicao() {
		return edicao;
	}
	public String getImagem()  {
		Path path = Paths.get(System.getProperty("user.home")+
				"\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
		 byte[] decodedBytes = Base64.getDecoder().decode(imagem);
		 String decoPath;
		try {
			decoPath = Files.write(path, decodedBytes, StandardOpenOption.CREATE).toString();
			 if(decoPath.equals(null))
			 {
				 return " ";
			 }
			 return decoPath;
		}
		catch (IOException e)
		{
			e.printStackTrace();
			return " ";
		}
		 

	}
	public String getSinopse() {
		return sinopse;
	}
	public int getVendidos() {
		return vendidos;
	}
	// Setters	
	public void setId(Long id) 
	{
		this.id = id;
	}
	public void setTitulo(String titulo) 
	{
		this.titulo = titulo;
	}
	public void setAutores(List<Autor> autores) {
		this.autores = autores;
	}
	public void setIsbn(String aIsn)
	{
		this.isbn = aIsn;
	}
	public void setPreco(double preco) {
		this.preco = preco;
	}
	public void setStock(int stock) 
{
		this.stock = stock;
	}
	
	public void setPaginas(int paginas) {
		this.paginas = paginas;
	}
	public void setEdicao(int edicao) {
		this.edicao = edicao;
	}
	public void setImagem(String aPath) throws IOException 
	{
		Path path = Paths.get(System.getProperty("user.home")+
				"\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
		byte[] fileContent = Files.readAllBytes(path); 
		this.imagem = Base64.getEncoder().encodeToString(fileContent);
	}
	public void setSinopse(String sinopse) 
	{
		this.sinopse = sinopse;
	}
	public List<Venda> getVendas() 
	{
		return vendas;
	}
	public void setVendas(List<Venda> vendas) 
	{
		this.vendas = vendas;
	}
	public void setVendidos(int vendidos) {
		this.vendidos = vendidos;
	}

	public Date dataLancamento()
	{
		return dataDeLancamento;
	}
	public void setDataDeLancamento(Date dataDeLancamento) {
		this.dataDeLancamento = dataDeLancamento;
	}
	
	public String getDataDeLancamento() {
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		return simpleDateFormat.format(this.dataDeLancamento);
	}

	public void setDataDeLancamento(String dataDeLancamento) throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		this.dataDeLancamento = simpleDateFormat.parse(dataDeLancamento);
	}

}
