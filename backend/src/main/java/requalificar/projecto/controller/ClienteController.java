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
import requalificar.projecto.dto.SimpleResponseCliente;
import requalificar.projecto.dto.SimpleResponseClientes;
import requalificar.projecto.models.Cliente;
import requalificar.projecto.service.ClienteService;
import requalificar.projecto.utils.WrapperVerificaLogin;
@CrossOrigin
@RestController
public class ClienteController
{
	private final ClienteService clienteService;
	
	@Autowired
	public ClienteController(ClienteService clienteService)
	{
		this.clienteService = clienteService;
	}
	
	
	/** Verifia Login e devolve cliente **/
	@CrossOrigin
	@PostMapping("/verificaLogin")
	public ResponseEntity<SimpleResponse> verificaLogin(@RequestBody WrapperVerificaLogin clienteVerificar)
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		if(clienteVerificar.equals(null)) 
		{
			srC.setAsError("Falha na variavel de entrada");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srC);
		}
		
		if(clienteVerificar.getLogin().equals(null) || clienteVerificar.getLogin().isEmpty() || clienteVerificar.getPassword().equals(null) || clienteVerificar.getPassword().isEmpty())
		{
			srC.setAsError("Nao possui dados necessarios para confirmcao");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srC);
		}
		
		Cliente cliente =  clienteService.verificaLoginValido(clienteVerificar);
				
		if(cliente == null)
		{
			srC.setAsSuccess("Login incorrecto");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(srC);
		}
		else {
			srC.setAsSuccess("Login Correcto");
			srC.setCliente(cliente);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}
	}
	
	/** Devolve cliente usando LoginId**/
	@CrossOrigin
	@GetMapping("/getClienteByLoginId/{aLoginId}")
	public ResponseEntity<SimpleResponse> getClienteByLoginId(@PathVariable String aLoginId)
	{
	SimpleResponseCliente srC = new SimpleResponseCliente();
	
	if(aLoginId == null || aLoginId.isBlank())
	{
		srC.setAsError("Falha no valor LoginId");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	
	Cliente cliente = clienteService.getClienteByLoginId(aLoginId);
	
	if(cliente == null)
	{
		srC.setAsError("Cliente nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	srC.setAsSuccess("Cliente encontrado");
	srC.setCliente(cliente);
	return ResponseEntity.status(HttpStatus.OK).body(srC);
	
	}
		
	/** Devolve cliente usando id**/
	@CrossOrigin
	@GetMapping("/getClienteById/{id}")
	public ResponseEntity<SimpleResponse> getClienteById(@PathVariable String id)
	{
	SimpleResponseCliente srC = new SimpleResponseCliente();
	
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
	
	Optional<Cliente> optionalCliente = clienteService.getClienteById(idToGet);
	
	if(optionalCliente == null)
	{
		srC.setAsError("Cliente nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	srC.setAsSuccess("Cliente encontrado");
	srC.setCliente(optionalCliente.get());
	return ResponseEntity.status(HttpStatus.OK).body(srC);
	
	}
	
	/** Devolve todos os clientes na base de dados **/
	@CrossOrigin
	@GetMapping("/getClientes")
	public ResponseEntity<SimpleResponse> getClientes()
	{
		SimpleResponseClientes srC = new SimpleResponseClientes();
		
		List<Cliente> clientes = clienteService.getClientes();
		
		if(!clientes.isEmpty())
		{
			srC.setAsSuccess("Clientes na base de dados");
			srC.setClientes(clientes);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}
		srC.setAsError("Nehum cliente na base de dados");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** Adiciona cliente a base de dados **/
	@CrossOrigin
	@PostMapping(path = "/addCliente", 
	        consumes = MediaType.APPLICATION_JSON_VALUE, 
	        produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SimpleResponse> addCliente(@RequestBody Cliente aCliente) throws ParseException
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		

		// Verifica se loginId ja existe
		if(clienteService.loginClienteExiste(aCliente.getLogin()))
		{
			srC.setAsError("LoginId ja existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		SimpleResponseCliente srCT = verificaDados(aCliente);
		
		if(srCT.isStatus())
		{
			if(clienteService.addCliente(aCliente))
			{
				srC.setAsSuccess("Sucesso ao introduzir Cliente");
				srC.setCliente(clienteService.getClienteByLoginId(aCliente.getLogin()));
				return ResponseEntity.status(HttpStatus.OK).body(srC);
			}
			
			srC.setAsError("Falha na criacao de cliente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		srC.setAsError(srCT.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** remove cliente atraves do id **/
	@CrossOrigin
	@DeleteMapping("/removeClienteByLoginId/{loginId}")
	public ResponseEntity<SimpleResponse> removeClienteByLoginId(@PathVariable String loginId)
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		// Verifica se loginid nao existe
		if(!clienteService.loginClienteExiste(loginId))
		{
			srC.setAsError("LoginId nao existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		Cliente clienteToDelete = clienteService.getClienteByLoginId(loginId);
	
		if(clienteToDelete != null)
		{
			clienteService.removeCliente(clienteToDelete);
			srC.setAsSuccess("Sucesso ao remover cliente");
			srC.setCliente(clienteToDelete);
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** Updates informacao cliente: nome email dataDeNascimento**/
	@CrossOrigin
	@PutMapping("/updateCliente")
	public ResponseEntity<SimpleResponseCliente> updateCliente(@RequestBody Cliente aCliente) throws ParseException
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		// Verifica se loginId ja existe
		if(!clienteService.loginClienteExiste(aCliente.getLogin()))
		{
			srC.setAsError("LoginId nao existente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		
		SimpleResponseCliente srCT = verificaDados(aCliente);
		
		if(srCT.isStatus())
		{
			if(clienteService.updateCliente(aCliente))
			{
				srC.setAsSuccess("Sucesso em actualizar utilizador");
				srC.setCliente(clienteService.getClienteByLoginId(aCliente.getLogin()));
				return ResponseEntity.status(HttpStatus.OK).body(srC);
			}
			srC.setAsError("Falha no update do cliente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		srC.setAsError(srCT.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
		
	/** Verifica se dados sao nulos clientId Nome email e dataDeNascimento **/
	public SimpleResponseCliente verificaDados(Cliente aCliente) throws ParseException
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		if(aCliente.getLogin() == null || aCliente.getLogin().isEmpty())
		{
			srC.setAsError("Falha no parametro Login Id:" + aCliente.getLogin());
			return srC;	
		}
		
		if(aCliente.getNome() == null || aCliente.getNome().isEmpty())
		{
			srC.setAsError("Falha no parametro nome: " + aCliente.getNome());
			return srC;	
		}
		
		// Ferramenta para calcuclar data para menores de 16 anos
		Calendar c = Calendar.getInstance();
		c.setTime(new Date(System.currentTimeMillis()));
		c.add(Calendar.YEAR, -16);
		
		if(aCliente.dataNascimento() == null || aCliente.dataNascimento().after(c.getTime()))
		{
			srC.setAsError("Falha no parametro data: " + aCliente.getDataDeNascimento());
			return srC;	
		}
			
		if(aCliente.getEmail() == null || aCliente.getEmail().isEmpty())
		{
			srC.setAsError("Falha no parametro email: " + aCliente.getEmail());
			return srC;	
		}
		srC.setAsSuccess("Correcto");
		return srC;
	}
}
