package requalificar.projecto.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Funcionario;
import requalificar.projecto.repository.FuncionarioRepo;

@Service
public class FuncionarioService 
{
	private final FuncionarioRepo funcionarioRepo;
	
	@Autowired
	public FuncionarioService(FuncionarioRepo funcionarioRepo)
	{
		this.funcionarioRepo = funcionarioRepo;
	}
	
	/** Devolve funcionario usando LoginId **/
	public Funcionario getFuncionarioByLoginId(String funcionarioLoginId)
	{
		for(Funcionario funcionario : getFuncionarios())
		{
			if(funcionario.getLogin().equals(funcionarioLoginId))
			{
				return funcionario;
			}
		}
		return null;
	}
	
	public Optional<Funcionario> getFuncionarioById(Long idToGet) 
	{
		return funcionarioRepo.findById(idToGet);
	}
	
	/** Verifica se id exista **/
	public boolean idExiste(Long idToCheck) 
	{
		if(funcionarioRepo.existsById(idToCheck))
		{
			return true;
		}
		return false;
	}
	
	/** Devolve todos os funcionarios na base de dados **/
	public List<Funcionario> getFuncionarios()
	{
		List<Funcionario> funcionarios = new ArrayList<Funcionario>();
		funcionarioRepo.findAll().forEach(funcionarios::add);
		return funcionarios;
	}
	
	/** Adiciona funcionario a base de dados **/
	public boolean addFuncionario(Funcionario aFuncionario)
	{
		funcionarioRepo.save(aFuncionario);
		return true;	
	}
	
	/** Remove funcionario **/
	public boolean removeFuncionario(Funcionario aFuncionario)
	{
		funcionarioRepo.delete(aFuncionario);
		return true;	
	}
	
	/** updates client data 
	 * @throws ParseException **/
	public boolean updateFuncionario(Funcionario aFuncionario) throws ParseException
	{
		Funcionario funcionarioAlterar = getFuncionarioByLoginId(aFuncionario.getLogin());
		funcionarioAlterar.setNome(aFuncionario.getNome());
		funcionarioAlterar.setDataDeNascimento(aFuncionario.getDataDeNascimento());
		funcionarioAlterar.setEmail(aFuncionario.getEmail());
		funcionarioRepo.save(funcionarioAlterar);
		return true;
	}
	
	/** Verifica se LoginId ja existe na base de dados **/
 	public boolean loginFuncionarioExiste(String loginFuncionario)
	{
 		List<Funcionario> funcionarios = getFuncionarios();

 		if(funcionarios.isEmpty())
 		{
 			return false; 			
 		}
 		
		for(Funcionario funcionario : funcionarios)
		{
			if(funcionario.getLogin().equals(loginFuncionario))
			{
				return true;
			}
		}
		return false;
	}

 	/** Verifica se Login existe e se corresponde a password **/
	public Funcionario verificaLoginValido(String login, String password) 
	{
		if(loginFuncionarioExiste(login))
		{
			Funcionario funcionarioComparar = getFuncionarioByLoginId(login);
			
			if(funcionarioComparar.isPasswordCorrecta(password))
			{
				return funcionarioComparar;
			}
		}
		return null;
	}


	

}
