package requalificar.projecto.controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseVenda;
import requalificar.projecto.models.Venda;
import requalificar.projecto.service.ClienteService;
import requalificar.projecto.service.VendaService;


@RestController
public class VendaController
{
	private final VendaService vendaService;
	private final ClienteService clienteService;

	
	@Autowired
	public VendaController(VendaService vendaService, ClienteService clienteService)
	{
		this.vendaService = vendaService;
		this.clienteService = clienteService;
	}
	
	/** Devolve cliente usando LoginId**/
	@PostMapping("/addVenda")
	public ResponseEntity<SimpleResponse> addVenda(@RequestBody Venda venda)
	{
		SimpleResponseVenda srV = new SimpleResponseVenda();
		
		if(venda.equals(null)|| venda.getId()!=null)
		{
			srV.setAsError("Falha na entrada de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
		
		if(venda.getCliente() == null || clienteService.idExiste(venda.getCliente().getId()))
		{
			srV.setAsError("Falha na entrada de Cliente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
						
		if(venda.getValor() <0)
		{
			srV.setAsError("Falha na entrada o valor da compra");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
				
		if(venda.getLivros() == null || venda.getLivros().isEmpty())
		{
			srV.setAsError("Falha na entrada Lista de livros");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}

		if(vendaService.addVenda(venda))
		{
			srV.setAsSuccess("Venda realizada com sucesso");
			return ResponseEntity.status(HttpStatus.OK).body(srV);
		}
		
		
		srV.setAsError("Falha");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		
	}
	
	
}
