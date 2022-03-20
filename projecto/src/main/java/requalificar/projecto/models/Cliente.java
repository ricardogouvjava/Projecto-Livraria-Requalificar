package requalificar.projecto.models;

import javax.persistence.*;

@Entity(name="Cliente")
@Table(name="cliente")
public class Cliente extends Utilizador
{
	@Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id; 

	private String email;

	
	
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
