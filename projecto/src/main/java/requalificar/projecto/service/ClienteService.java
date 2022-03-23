package requalificar.projecto.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
			if(cliente.getLogin().equals(clienteLoginId))
			{
				return cliente;
			}
		}
		return null;
	}
	
	public Optional<Cliente> getClienteById(Long idToGet) 
	{
		return clienteRepo.findById(idToGet);
	}
	
	
	public boolean idExiste(Long idToCheck) 
	{
		if(clienteRepo.existsById(idToCheck))
		{
			return true;
		}
		return false;
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
		Cliente clienteAlterar = getClienteByLoginId(aCliente.getLogin());
		clienteAlterar.setNome(aCliente.getNome());
		clienteAlterar.setDataDeNascimento(aCliente.getDataDeNascimento());
		clienteAlterar.setEmail(aCliente.getEmail());
		clienteRepo.save(clienteAlterar);
		return true;
	}
	
	/** Verifica se LoginId ja existe na base de dados **/
 	public boolean loginClienteExiste(String idCliente)
	{
 		List<Cliente> clientes = getClientes();
 		
 		if(clientes.isEmpty())
 		{
 			return false; 			
 		}
 		
		for(Cliente cliente : clientes)
		{
			if(cliente.getLogin().equals(idCliente))
			{
				return true;
			}
		}
		return false;
	}

	

}
