package requalificar.projecto.repository;

import org.springframework.data.repository.CrudRepository;

import requalificar.projecto.models.Livro;

public interface LivroRepo extends CrudRepository<Livro, Long>
{
	
}
