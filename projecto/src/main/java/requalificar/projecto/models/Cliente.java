package requalificar.projecto.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="Cliente")
public class Cliente extends Utilizador
{
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id; 
	
	@Column(name="email")
	private String email;
	
	@OneToMany(fetch=FetchType.LAZY, mappedBy = "cliente", targetEntity=Venda.class)
	List<Venda> compras = new ArrayList<Venda>();


	
	
	
	  public void addVenda(Venda venda) { compras.add(venda); }
	  
	  
	  public List<Venda> getCompras() { return compras; }
	  
	  public void setCompras(List<Venda> compras) { this.compras = compras; }
	 

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email) 
	{
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	
	
}
