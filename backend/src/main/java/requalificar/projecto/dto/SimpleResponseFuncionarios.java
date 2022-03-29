package requalificar.projecto.dto;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Funcionario;

public class SimpleResponseFuncionarios extends SimpleResponse
{
	List<Funcionario> funcionarios;
	
	public SimpleResponseFuncionarios()
	{
		funcionarios = new ArrayList<>();
	}

	public List<Funcionario> getFuncionarios() {
		return funcionarios;
	}

	public void setFuncionarios(List<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
	}

	
	
	
}
