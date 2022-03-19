package requalificar.projecto.controller;

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
	
	@GetMapping("/getClienteByLoginId/{aLoginId}")
	public ResponseEntity<SimpleResponse> getClienteByLoginId(@PathVariable String aLoginId)
	{
	SimpleResponseCliente srC = new SimpleResponseCliente();
	
	Cliente cliente = clienteService.getClienteByLoginId(aLoginId);
	if(cliente == null)
	{
		srC.setAsError("LoginId nao existente");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);
	}
	srC.setAsSuccess("Cliente encontrado");
	srC.setCliente(cliente);
	return ResponseEntity.status(HttpStatus.OK).body(srC);
	
	}
	
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
	
	@PostMapping("/addCliente")
	public ResponseEntity<SimpleResponse> addCliente(@RequestBody Cliente aCliente)
	{
		SimpleResponseClientes srC = new SimpleResponseClientes();
		
		// Verifica se loginid ja existe
		if(clienteService.loginIdClienteExiste(aCliente.getLoginId()))
		{
			srC.setAsError("LoginId ja existente");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(srC);
		}
	
		if(clienteService.addCliente(aCliente))
		{
			srC.setAsSuccess("Sucesso ao introduzir Cliente");
			return ResponseEntity.status(HttpStatus.OK).body(srC);
		}	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srC);	
	}
	
	
}
