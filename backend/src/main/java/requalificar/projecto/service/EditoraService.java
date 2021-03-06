package requalificar.projecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import requalificar.projecto.models.Editora;
import requalificar.projecto.repository.EditoraRepo;

@Service
public class EditoraService 
{
	private final EditoraRepo editoraRepo;
	
	@Autowired
	public EditoraService(EditoraRepo editoraRepo)
	{
		this.editoraRepo = editoraRepo;
	}
	
	/** Adicona Editora a base de dados **/
	public boolean addEditora(Editora editora)
	{
		editoraRepo.save(editora);
		return true;
	}
	
	/** Devolve todos os editoras na base de dados **/
	public List<Editora> getEditoras()
	{
		List<Editora> editoras = new ArrayList<Editora>();
		editoraRepo.findAll().forEach(editoras::add);
		return editoras;
	}
	
	/** Verifica se existe autor com mesmo nome e morada na base de dados **/
	public boolean existeEditora(Editora aEditora)
	{
		for(Editora editora : getEditoras())
		{
			if(editora.getNome().equals(aEditora.getNome()) && editora.getMorada().equals(aEditora.getMorada()))
			{
				return true;
			}
		}
		return false;
	}
	
	/** Verifica se existe editora com id **/
	public boolean existeId(Long id)
	{
		if(id.equals(null))
		{
			return false;
		}
		return editoraRepo.existsById(id);
	}
		
	/** Devolve editora atraves de id **/
	public Optional<Editora> getEditoraById(long id)
	{
		return editoraRepo.findById(id);
	}

	public boolean updateEditora(Editora editora) {
		try {
			Editora editoraToChange = editoraRepo.findById(editora.getId()).get();
			editoraToChange.setNome(editora.getNome());
			editoraToChange.setMorada(editora.getMorada());
			editoraRepo.save(editoraToChange);
			return true;
		}catch(Exception e) {
		return true;
		}
	}

	public List<Editora> procuraEditora(String string) {
		List<Editora> editoras = new ArrayList<Editora>();
		for(Editora editora : getEditoras())
		{
			if(editora.getNome().contains(string) && editora.getMorada().contains(string)) {
				editoras.add(editora);
			}
		}
		return editoras;
	}

	
}
