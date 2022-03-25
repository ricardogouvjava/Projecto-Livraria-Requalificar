package requalificar.projecto.repository;

import org.springframework.data.repository.CrudRepository;

import requalificar.projecto.models.Cliente;

public interface ClienteRepo extends CrudRepository<Cliente, Long>
{
	
}
