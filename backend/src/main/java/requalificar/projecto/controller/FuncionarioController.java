package requalificar.projecto.controller;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseFuncionario;
import requalificar.projecto.dto.SimpleResponseFuncionarios;
import requalificar.projecto.models.Funcionario;
import requalificar.projecto.service.FuncionarioService;
import requalificar.projecto.utils.WrapperVerificaLogin;
@CrossOrigin
@RestController
public class FuncionarioController
{
	private final FuncionarioService funcionarioService;
	
	@Autowired
	public FuncionarioController(FuncionarioService funcionarioService)
	{
		this.funcionarioService = funcionarioService;
	}
	
	
	/** Verifia Login e devolve funcionario **/
	@CrossOrigin
	@PostMapping("/verificaLoginFuncionario")
	public ResponseEntity<SimpleResponse> verificaLoginFuncionario(@RequestBody WrapperVerificaLogin funcionarioVerificar)
	{
		SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
		if(funcionarioVerificar.equals(null)) 
		{
			srC.setAsError("Falha na variavel de entrada");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srC);
		}
		
		if(funcionarioVerificar.getLogin().equals(null) || funcionarioVerificar.getLogin().isEmpty() || funcionarioVerificar.getPassword().equals(null) || funcionarioVerificar.getPassword().isEmpty())
		{
			srC.setAsError("Nao possui dados necessarios para confirmcao");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srC);
		}
		
		Funcionario funcionario =  funcionarioService.verificaLoginValido(funcionarioVerificar.getLogin(), funcionarioVerificar.getPassword());
				
		if(funcionario == null)
		{
			srC.setAsSuccess("Login incorrecto");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(srC);
		}
		else {
			srC.setAsSuccess("Login Correcto");
			srC.setFuncionario(funcionario);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}
	}
	
	/** Devolve funcionario usando LoginId**/
	@CrossOrigin
	@GetMapping("/getFuncionarioByLoginId/{aLoginId}")
	public ResponseEntity<SimpleResponse> getFuncionarioByLoginId(@PathVariable String aLoginId)
	{
	SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
	
	if(aLoginId == null || aLoginId.isBlank())
	{
		srC.setAsError("Falha no valor LoginId");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	
	Funcionario funcionario = funcionarioService.getFuncionarioByLoginId(aLoginId);
	
	if(funcionario == null)
	{
		srC.setAsError("Funcionario nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	srC.setAsSuccess("Funcionario encontrado");
	srC.setFuncionario(funcionario);
	return ResponseEntity.status(HttpStatus.OK).body(srC);
	
	}
		
	/** Devolve funcionario usando id**/
	@CrossOrigin
	@GetMapping("/getFuncionarioById/{id}")
	public ResponseEntity<SimpleResponse> getFuncionarioById(@PathVariable String id)
	{
	SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
	
	if(id == null || id.isBlank())
	{
		srC.setAsError("Falha no valor id");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	
	Long idToGet = Long.parseLong(id);
	
	if(idToGet == null || idToGet <= 0)
	{
		srC.setAsError("Falha no valor id");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	
	Optional<Funcionario> optionalFuncionario = funcionarioService.getFuncionarioById(idToGet);
	
	if(optionalFuncionario == null)
	{
		srC.setAsError("Funcionario nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	srC.setAsSuccess("Funcionario encontrado");
	srC.setFuncionario(optionalFuncionario.get());
	return ResponseEntity.status(HttpStatus.OK).body(srC);
	
	}
	
	/** Devolve todos os funcionarios na base de dados **/
	@CrossOrigin
	@GetMapping("/getFuncionarios")
	public ResponseEntity<SimpleResponse> getFuncionarios()
	{
		SimpleResponseFuncionarios srC = new SimpleResponseFuncionarios();
		
		List<Funcionario> funcionarios = funcionarioService.getFuncionarios();
		
		if(!funcionarios.isEmpty())
		{
			srC.setAsSuccess("Funcionarios na base de dados");
			srC.setFuncionarios(funcionarios);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}
		srC.setAsError("Nehum funcionario na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** Adiciona funcionario a base de dados **/
	@CrossOrigin
	@PostMapping(path = "/addFuncionario", 
	        consumes = MediaType.APPLICATION_JSON_VALUE, 
	        produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SimpleResponse> addFuncionario(@RequestBody Funcionario aFuncionario) throws ParseException
	{
		SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
		

		// Verifica se loginId ja existe
		if(funcionarioService.loginFuncionarioExiste(aFuncionario.getLogin()))
		{
			srC.setAsError("LoginId ja existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		SimpleResponseFuncionario srCT = verificaDados(aFuncionario);
		
		if(srCT.isStatus())
		{
			if(funcionarioService.addFuncionario(aFuncionario))
			{
				srC.setAsSuccess("Sucesso ao introduzir Funcionario");
				srC.setFuncionario(funcionarioService.getFuncionarioByLoginId(aFuncionario.getLogin()));
				return ResponseEntity.status(HttpStatus.OK).body(srC);
			}
			
			srC.setAsError("Falha na criacao de funcionario");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		srC.setAsError(srCT.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** remove funcionario atraves do id **/
	@CrossOrigin
	@DeleteMapping("/removeFuncionarioByLoginId/{loginId}")
	public ResponseEntity<SimpleResponse> removeFuncionarioByLoginId(@PathVariable String loginId)
	{
		SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
		
		// Verifica se loginid nao existe
		if(!funcionarioService.loginFuncionarioExiste(loginId))
		{
			srC.setAsError("LoginId nao existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		Funcionario funcionarioToDelete = funcionarioService.getFuncionarioByLoginId(loginId);
	
		if(funcionarioToDelete != null)
		{
			funcionarioService.removeFuncionario(funcionarioToDelete);
			srC.setAsSuccess("Sucesso ao remover funcionario");
			srC.setFuncionario(funcionarioToDelete);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** Updates informacao funcionario: nome email dataDeNascimento**/
	@CrossOrigin
	@PutMapping("/updateFuncionario")
	public ResponseEntity<SimpleResponseFuncionario> updateFuncionario(@RequestBody Funcionario aFuncionario) throws ParseException
	{
		SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
		
		// Verifica se loginId ja existe
		if(!funcionarioService.loginFuncionarioExiste(aFuncionario.getLogin()))
		{
			srC.setAsError("LoginId nao existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		
		SimpleResponseFuncionario srCT = verificaDados(aFuncionario);
		
		if(srCT.isStatus())
		{
			if(funcionarioService.updateFuncionario(aFuncionario))
			{
				srC.setAsSuccess("Sucesso em actualizar utilizador");
				srC.setFuncionario(funcionarioService.getFuncionarioByLoginId(aFuncionario.getLogin()));
				return ResponseEntity.status(HttpStatus.OK).body(srC);
			}
			srC.setAsError("Falha no update do funcionario");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		srC.setAsError(srCT.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
		
	/** Verifica se dados sao nulos funcionarioId Nome email e dataDeNascimento **/
	public SimpleResponseFuncionario verificaDados(Funcionario aFuncionario) throws ParseException
	{
		SimpleResponseFuncionario srC = new SimpleResponseFuncionario();
		
		if(aFuncionario.getLogin() == null || aFuncionario.getLogin().isEmpty())
		{
			srC.setAsError("Falha no parametro Login Id:" + aFuncionario.getLogin());
			return srC;	
		}
		
		if(aFuncionario.getNome() == null || aFuncionario.getNome().isEmpty())
		{
			srC.setAsError("Falha no parametro nome: " + aFuncionario.getNome());
			return srC;	
		}
		
		// Ferramenta para calcuclar data para menores de 16 anos
		Calendar c = Calendar.getInstance();
		c.setTime(new Date(System.currentTimeMillis()));
		c.add(Calendar.YEAR, -16);
		
		if(aFuncionario.dataNascimento() == null || aFuncionario.dataNascimento().after(c.getTime()))
		{
			srC.setAsError("Falha no parametro data: " + aFuncionario.getDataDeNascimento());
			return srC;	
		}
			
		if(aFuncionario.getEmail() == null || aFuncionario.getEmail().isEmpty())
		{
			srC.setAsError("Falha no parametro email: " + aFuncionario.getEmail());
			return srC;	
		}
		srC.setAsSuccess("Correcto");
		return srC;
	}
}
