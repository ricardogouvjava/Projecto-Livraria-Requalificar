package requalificar.projecto.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.MappedSuperclass;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.password.PasswordEncryptor;


@MappedSuperclass 
public class Utilizador
{
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
	
	public Date dataNascimento()
	{
		return this.dataDeNascimento;
	}

	//Getters
	public String getLoginId() 
	{
		return loginId;
	}
	public String getNome()
	{
		return nome;
	}
	public String getDataDeNascimento() throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		return simpleDateFormat.format(this.dataDeNascimento);
	}

	//Setters

	
	public void setNome(String nome) 
	{
		this.nome = nome;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public void setPassword(String password)
	{
		this.password = encriptaPassword(password);
	}
	public void setDataDeNascimento(String dataDeNascimento) throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		this.dataDeNascimento = simpleDateFormat.parse(dataDeNascimento);
	}	
}
