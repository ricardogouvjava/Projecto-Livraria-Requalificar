package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Cliente;
import requalificar.projecto.models.Livro;
import requalificar.projecto.models.Venda;
import requalificar.projecto.repository.ClienteRepo;
import requalificar.projecto.repository.LivroRepo;
import requalificar.projecto.repository.VendaRepo;

@Service
public class VendaService {
	private final VendaRepo vendaRepo;
	private final ClienteRepo clienteRepo;
	private final LivroRepo livroRepo;

	@Autowired
	public VendaService(VendaRepo vendaRepo, ClienteRepo clienteRepo, LivroRepo livroRepo) {
		this.vendaRepo = vendaRepo;
		this.clienteRepo = clienteRepo;
		this.livroRepo = livroRepo;
	}

	public boolean addVenda(Venda venda) 
	{
		try
		{
			vendaRepo.save(venda);
			Cliente cliente = clienteRepo.findById(venda.getCliente().getId()).get();
			cliente.addVenda(venda);
			clienteRepo.save(cliente);
			
			int i= 0; 
			for(Livro livro: venda.getLivros())
			{
				Livro tempLivro = livroRepo.findById(livro.getId()).get();
				tempLivro.addVenda(venda, venda.getQuantLivros().get(i));
				 i +=1;
				 livroRepo.save(tempLivro); 
				 }
			
			return true;
		}
		catch (Exception e)
		{
			return false;

		}
	}

	public List<Venda> getVendas() {
		List<Venda> vendas = new ArrayList<Venda>();
		vendaRepo.findAll().forEach(vendas::add);
		return vendas;

	}

	public Optional<Venda> getVendaById(Long idToGet) {

		return vendaRepo.findById(idToGet);
	}

	public List<Venda> getVendasBycliente(Cliente cliente) {
		List<Venda> vendasCliente = new ArrayList<Venda>();
		for(Venda venda : getVendas())
		{
			if(venda.getCliente() == cliente)
				
			{
				vendasCliente.add(venda);
			}
		}
		return vendasCliente;
	}

}
