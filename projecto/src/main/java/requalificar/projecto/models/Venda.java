package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Venda")

public class Venda
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cliente_id", referencedColumnName = "id") //,	  nullable=false
  @JsonIgnore private Cliente cliente;
	 
  @JsonIgnore
  @ManyToMany
  @JoinTable(name = "Venda_Livro", 
				joinColumns = @JoinColumn(name = "venda_id"),
				inverseJoinColumns = @JoinColumn(name = "livro_id"))
  private List<Livro> livros = new ArrayList<Livro>();
 
  
  @Column
  @ElementCollection(targetClass=Integer.class)
	  private List<Integer> quantLivros;
	  
	  
	  
	  public List<Integer> getQuantLivros() { return quantLivros; }
	  
	  
	  
	  public void setQuantLivros(List<Integer> quantLivros) { this.quantLivros =
	  quantLivros; }
	 



public void setLivros(List<Livro> livros) {
	this.livros = livros;
}



private double valor;



public Cliente getCliente() {
	return cliente;
}



public void setCliente(Cliente cliente) {
	this.cliente = cliente;
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



public List<Livro> getLivros() {
	return livros;
}
	


	

	
}
