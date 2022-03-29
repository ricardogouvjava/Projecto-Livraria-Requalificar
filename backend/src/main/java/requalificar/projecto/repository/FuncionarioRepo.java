package requalificar.projecto.repository;

import org.springframework.data.repository.CrudRepository;

import requalificar.projecto.models.Funcionario;


public interface FuncionarioRepo extends CrudRepository<Funcionario, Long>
{
	
}
