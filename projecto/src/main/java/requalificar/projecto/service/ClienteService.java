package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Cliente;
import requalificar.projecto.repository.ClienteRepo;

@Service
public class ClienteService 
{
	private final ClienteRepo clienteRepo;
	
	@Autowired
	public ClienteService(ClienteRepo clienteRepo)
	{
		this.clienteRepo = clienteRepo;
	}
	
	// Metodos
	/** Devolve todos os clientes na base de dados **/
	public List<Cliente> getClientes()
	{
		List<Cliente> clientes = new ArrayList<Cliente>();
		clienteRepo.findAll().forEach(clientes::add);
		return clientes;
	}
	
	/** Verifica se LoginId ja existe na base de dados **/
	public boolean loginIdClienteExiste(String idCliente)
	{
		for(Cliente cliente : getClientes())
		{
			if(cliente.getLoginId().equals(idCliente))
			{
				return true;
			}
		}
		return false;
	}
	
	
	/** Adiciona cliente a base de dados **/
	public boolean addCliente(Cliente aCliente)
	{
		clienteRepo.save(aCliente);
		return true;	
	}
	
	/** Devolve cliente usando LoginId**/
	public Cliente getClienteByLoginId(String clienteLoginId)
	{
		for(Cliente cliente : getClientes())
		{
			if(cliente.getLoginId().equals(clienteLoginId))
			{
				return cliente;
			}
		}
		return null;
	}

}
