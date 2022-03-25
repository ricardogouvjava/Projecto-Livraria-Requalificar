package requalificar.projecto.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="Venda")
public class Venda
{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id") //,	  nullable=false
    private Cliente cliente;
	 
    @ManyToMany
    @JoinTable(name = "Venda_Livro", 
				joinColumns = @JoinColumn(name = "venda_id"),
				inverseJoinColumns = @JoinColumn(name = "livro_id"))
    private List<Livro> livros = new ArrayList<Livro>();
    
    @Column(name="valor_venda")
    private double valor;
    
    private Date dataVenda;

    @Column
  	@ElementCollection(targetClass=Integer.class)
  	private List<Integer> quantLivros;
	  	
    
    //Metodos
    public void addLivro(Livro livro, Integer quantidade)
    {
    	valor += livro.getPreco() * quantidade;
		livros.add(livro);
		quantLivros.add(quantidade);
		
	}
    
    public void removeLivro(Livro livro) {
    	valor -= livro.getPreco();
		livros.remove(livro);
		quantLivros.remove(livros.indexOf(livro));
		
	} 
    
    
    
    //Getters & Setters
    
    
    
    public Cliente getCliente() {
		return cliente;
	}

	public List<Integer> getQuantLivros() {
		return quantLivros;
	}

	public void setQuantLivros(List<Integer> quantLivros) {
		this.quantLivros = quantLivros;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public List<Livro> getLivros() {
		return livros;
	}

	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Long getId() {
		return id;
	}

	public Date getDataVenda() {
		return dataVenda;
	}

	public void setDataVenda(String dataVenda ) throws ParseException {
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		this.dataVenda = simpleDateFormat.parse(dataVenda);

	}

	
  	
}
