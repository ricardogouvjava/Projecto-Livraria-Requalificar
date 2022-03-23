package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Autor;
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
			
			for(Livro livro : venda.getLivros())
			{
			 	livro.setStock(livro.getStock() - venda.getQuantLivros().get(venda.getLivros().indexOf(livro)));
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

	

	public List<Venda> getVendas() {
		List<Venda> vendas = new ArrayList<Venda>();
		vendaRepo.findAll().forEach(vendas::add);
		return vendas;
		
	}
	
	
	
	
}
