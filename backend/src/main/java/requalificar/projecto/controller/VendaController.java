package requalificar.projecto.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import requalificar.projecto.dto.SimpleResponse;
import requalificar.projecto.dto.SimpleResponseVenda;
import requalificar.projecto.dto.SimpleResponseVendas;
import requalificar.projecto.models.Cliente;
import requalificar.projecto.models.Livro;
import requalificar.projecto.models.Venda;
import requalificar.projecto.service.ClienteService;
import requalificar.projecto.service.LivroService;
import requalificar.projecto.service.VendaService;

@RestController
public class VendaController {
	private final VendaService vendaService;
	private final ClienteService clienteService;
	private final LivroService livroService;

	@Autowired
	public VendaController(VendaService vendaService, ClienteService clienteService, LivroService livroService) {
		this.vendaService = vendaService;
		this.clienteService = clienteService;
		this.livroService = livroService;
	}
	@CrossOrigin
	@PostMapping("/criaVenda")
	public ResponseEntity<SimpleResponse> criaVenda(@RequestBody Venda venda) {
		SimpleResponseVenda srV = new SimpleResponseVenda();

		if (venda.equals(null) || venda.getId() != null) {
			srV.setAsError("Falha na entrada de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
						
		if(venda.getDataDeVenda().equals(null) || venda.getDataDeVenda().after(new Date()))
		{
			srV.setAsError("Falha no parametro data: " + venda.getDataDeVenda());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}

		if (vendaService.addVenda(venda)) 
		{
			srV.setAsSuccess("Sucesso em criar venda");
			return ResponseEntity.status(HttpStatus.OK).body(srV);
		}

		srV.setAsError("Falha");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);

	}
	@CrossOrigin
	@GetMapping("/getVenda/{id}")
	public ResponseEntity<SimpleResponse> getVendasById(@PathVariable String id) {
		SimpleResponseVenda srV = new SimpleResponseVenda();

		if (id == null || id.isEmpty()) {
			srV.setAsError("Falha na entrada de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
		Long idToGet = Long.parseLong(id);

		if (idToGet.equals(null) || idToGet <= 0) {
			srV.setAsError("Falha no parse");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}

		Optional<Venda> optionalVenda = vendaService.getVendaById(idToGet);

		if (optionalVenda == null || optionalVenda.isEmpty()) {
			srV.setAsError("Falha em encontar cliente");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}

		srV.setAsSuccess("Sucesso ao encontar Venda");
		srV.setVenda(optionalVenda.get());
		return ResponseEntity.status(HttpStatus.OK).body(srV);
	}
	@CrossOrigin
	@GetMapping("/getVendasByClienteId/{id}")
	public ResponseEntity<SimpleResponse> getVendasByClienteId(@PathVariable String id) {
		SimpleResponseVendas srV = new SimpleResponseVendas();

		if (id == null || id.isEmpty()) {
			srV.setAsError("Falha na entrada de dados");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}
		Long idToGet = Long.parseLong(id);

		if (idToGet.equals(null) || idToGet <= 0) {
			srV.setAsError("Falha no parse");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(srV);
		}

		List<Venda> vendasCliente = vendaService.getVendasBycliente(clienteService.getClienteById(idToGet).get());

		if (vendasCliente == null || vendasCliente.isEmpty()) {
			srV.setAsError("Falha em encontar vendas");
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(srV);
		}

		srV.setAsSuccess("Sucesso ao encontar Vendas");
		srV.setVendas(vendasCliente);
		return ResponseEntity.status(HttpStatus.OK).body(srV);
	}
	
	
	@CrossOrigin
	@GetMapping("/getVendas")
	public ResponseEntity<SimpleResponse> getVendas() {
		SimpleResponseVendas srVs = new SimpleResponseVendas();

		srVs.setAsSuccess("Vendas em registo");
		srVs.setVendas(vendaService.getVendas());
		return ResponseEntity.status(HttpStatus.OK).body(srVs);
	}
	
	
}
