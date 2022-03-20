package requalificar.projecto.service;

import java.text.ParseException;
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
	
	/** Devolve cliente usando LoginId **/
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
	
	/** Devolve todos os clientes na base de dados **/
	public List<Cliente> getClientes()
	{
		List<Cliente> clientes = new ArrayList<Cliente>();
		clienteRepo.findAll().forEach(clientes::add);
		return clientes;
	}
	
	/** Adiciona cliente a base de dados **/
	public boolean addCliente(Cliente aCliente)
	{
		clienteRepo.save(aCliente);
		return true;	
	}
	
	/** Remove cliente **/
	public boolean removeCliente(Cliente aCliente)
	{
		clienteRepo.delete(aCliente);
		return true;	
	}
	
	/** updates client data 
	 * @throws ParseException **/
	public boolean updateCliente(Cliente aCliente) throws ParseException
	{
		Cliente clienteAlterar = getClienteByLoginId(aCliente.getLoginId());
		clienteAlterar.setNome(aCliente.getNome());
		clienteAlterar.setDataDeNascimento(aCliente.getDataDeNascimento());
		clienteAlterar.setEmail(aCliente.getEmail());
		clienteRepo.save(clienteAlterar);
		return true;
	}
	
	/** Verifica se LoginId ja existe na base de dados **/
 	public boolean loginIdClienteExiste(String idCliente)
	{
 		List<Cliente> clientes = getClientes();
 		
 		if(clientes.isEmpty())
 		{
 			return false; 			
 		}
 		
		for(Cliente cliente : clientes)
		{
			if(cliente.getLoginId().equals(idCliente))
			{
				return true;
			}
		}
		return false;
	}
	

}
