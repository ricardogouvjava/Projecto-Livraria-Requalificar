package requalificar.projecto.models;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.jasypt.util.password.PasswordEncryptor;

@MappedSuperclass 
public class Utilizador
{
	@Column(name="login")
	private String login;
	
	@Column(name="nome")
	private String nome; 				// nome do utilizador
	
	@Column(name="password")
	private String password;			// password de utilizador encryptada
	
	@Column(name="data_de_Nascimento")
	private Date dataDeNascimento;
	
	@Column(name="email")
	private String email;
	
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
	
	public void setLogin(String login) {
		this.login = login;
	}
	
	public String getNome()
	{
		return nome;
	}
	public String getLogin() {
		return login;
	}

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
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
	
	
	
	public Date dataNascimento()
	{
		return this.dataDeNascimento;
	}
	
	public void setDataDeNascimento(Date dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}
	
	
	
	public void setEmail(String email) {
		this.email = email;
	}

	public String getDataDeNascimento() throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		return simpleDateFormat.format(this.dataDeNascimento);
	}
	

	public void setDataDeNascimento(String dataDeNascimento) throws ParseException 
	{
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		this.dataDeNascimento = simpleDateFormat.parse(dataDeNascimento);
	}	

}
