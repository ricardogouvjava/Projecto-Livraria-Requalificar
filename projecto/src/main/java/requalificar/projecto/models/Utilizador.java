package requalificar.projecto.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.password.PasswordEncryptor;

@MappedSuperclass 
abstract class Utilizador
{
	@Column(name="login")
	private String login;
	
	@Column(name="nome")
	private String nome; 				// nome do utilizador
	
	@Column(name="password")
	private String password;			// password de utilizador encryptada
	
	@Column(name="data_de_Nascimento")
	private Date dataDeNascimento;
	public void setDataDeNascimento(Date dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}
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
	
	public String getNome()
	{
		return nome;
	}
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
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
