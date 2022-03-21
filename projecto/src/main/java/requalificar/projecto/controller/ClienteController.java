package requalificar.projecto.controller;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseCliente;
import requalificar.projecto.dto.SimpleResponseClientes;
import requalificar.projecto.models.Cliente;
import requalificar.projecto.service.ClienteService;

@RestController
public class ClienteController
{
	private final ClienteService clienteService;
	
	@Autowired
	public ClienteController(ClienteService clienteService)
	{
		this.clienteService = clienteService;
	}
	
	/** Devolve cliente usando LoginId**/
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
	
	/** Devolve todos os clientes na base de dados **/
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
	@PostMapping("/addCliente")
	public ResponseEntity<SimpleResponse> addCliente(@RequestBody Cliente aCliente) throws ParseException
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		// Verifica se loginId ja existe
		if(clienteService.loginIdClienteExiste(aCliente.getLoginId()))
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
				srC.setCliente(clienteService.getClienteByLoginId(aCliente.getLoginId()));
				return ResponseEntity.status(HttpStatus.OK).body(srC);
			}
			
			srC.setAsError("Falha na criacao de cliente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
		}
		srC.setAsError(srCT.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	/** remove cliente atraves do id **/
	@DeleteMapping("/removeClienteByLoginId/{loginId}")
	public ResponseEntity<SimpleResponse> removeClienteByLoginId(@PathVariable String loginId)
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		// Verifica se loginid nao existe
		if(!clienteService.loginIdClienteExiste(loginId))
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
	@PutMapping("/updateCliente")
	public ResponseEntity<SimpleResponseCliente> updateCliente(@RequestBody Cliente aCliente) throws ParseException
	{
		SimpleResponseCliente srC = new SimpleResponseCliente();
		
		// Verifica se loginId ja existe
		if(!clienteService.loginIdClienteExiste(aCliente.getLoginId()))
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
				srC.setCliente(clienteService.getClienteByLoginId(aCliente.getLoginId()));
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
		
		if(aCliente.getLoginId() == null || aCliente.getLoginId().isEmpty())
		{
			srC.setAsError("Falha no parametro Login Id:" + aCliente.getLoginId());
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
