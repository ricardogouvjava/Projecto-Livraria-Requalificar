package requalificar.projecto.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.beans.factory.support.ManagedMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Venda")

public class Venda
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id") //, nullable=false
    @JsonIgnore
	private Cliente cliente;

	private double valor;
	
	private ManagedMap<Livro, Integer> livros= new ManagedMap<Livro, Integer>();
	
	@Override
	public String toString() {
		return "Compra [cliente=" + cliente + ", valor=" + valor + ", livros=" + livros + "]";
	}



	public Long getId() {
		return id;
	}



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



	public ManagedMap<Livro, Integer> getLivros() {
		return livros;
	}



	public void setLivros(ManagedMap<Livro, Integer> livros) {
		this.livros = livros;
	}




	
}
