package requalificar.projecto.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Livro;
import requalificar.projecto.models.Venda;
import requalificar.projecto.repository.ClienteRepo;
import requalificar.projecto.repository.LivroRepo;
import requalificar.projecto.repository.VendaRepo;

@Service
public class VendaService 
{
	private final VendaRepo vendaRepo;
	private final ClienteRepo clienteRepo;
	private final LivroRepo livroRepo;

	@Autowired
	public VendaService(VendaRepo vendaRepo, ClienteRepo clienteRepo, LivroRepo livroRepo) 
	{
		this.vendaRepo = vendaRepo;
		this.clienteRepo = clienteRepo;
		this.livroRepo = livroRepo;
	}


	public boolean addVenda(Venda venda) 
	{
		
		try {
			for(Map.Entry<Livro, Integer> entry : venda.getLivros().entrySet())
			{
				entry.getKey().setStock(entry.getKey().getStock() - entry.getValue());
				livroRepo.save(entry.getKey());
			}
			
			vendaRepo.save(venda);
			venda.getCliente().addVenda(venda);
			clienteRepo.save(venda.getCliente());
			return true;
		}
		catch(Exception e)
		{
			return false;
	
		}
	}
	
	
	
	
}
