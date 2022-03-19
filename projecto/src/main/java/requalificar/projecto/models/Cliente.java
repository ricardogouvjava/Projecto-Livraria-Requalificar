package requalificar.projecto.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.password.PasswordEncryptor;

@Entity
public class Cliente
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId; 

	private String loginId;
	private String nome; 				// nome do utilizador
	private String password;			// password de utilizador encryptada
	private Date dataDeNascimento;
	private static PasswordEncryptor encriptador = new BasicPasswordEncryptor();
	
	/* Metodos
	 * Encripta password
	 * Verifica password
	 *  */
	
	/** Encripta password  **/
	private String encriptaPassword(String aPassword)
	{
	    return encriptador.encryptPassword(aPassword);
	}

	/** Compara password **/
	public boolean isPasswordCorrecta(String userInput)
	{
		if (encriptador.checkPassword(userInput, password))
        {
			return true;
        }
        return false;
	}

	//Getters
	public Long getUserId()
	{
		return userId;
	}
	public String getLoginId() 
	{
		return loginId;
	}
	public String getPassword()
	{
		return password;
	}
	public String getNome()
	{
		return nome;
	}
	public Date getDataDeNascimento() 
	{
		return dataDeNascimento;
	}

	//Setters
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}	
	public void setNome(String nome) 
	{
		this.nome = nome;
	}
	public void setPassword(String password)
	{
		
		this.password = encriptaPassword(password);
	}
	public void setDataDeNascimento(Date dataDeNascimento) 
	{
		this.dataDeNascimento = dataDeNascimento;
	}
	
}
