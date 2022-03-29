package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="Cliente")
public class Cliente extends Utilizador
{
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id; 
	
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY, mappedBy = "cliente", targetEntity=Venda.class)
	private List<Venda> compras = new ArrayList<Venda>();


	
	
	@Override
	public String toString() {
		return "Cliente [getLogin()=" + getLogin() + "]";
	}


	public void addVenda(Venda venda) 
	{
		compras.add(venda);
	}


	public List<Venda> getCompras() {
		return compras;
	}


	public void setCompras(List<Venda> compras) {
		this.compras = compras;
	}

	public Long getId() {
		return id;
	}
	
}
