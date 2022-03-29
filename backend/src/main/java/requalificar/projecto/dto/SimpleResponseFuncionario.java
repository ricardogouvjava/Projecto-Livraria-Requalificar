package requalificar.projecto.dto;

import requalificar.projecto.models.Funcionario;

public class SimpleResponseFuncionario extends SimpleResponse
{
	Funcionario funcionario;
	
	public SimpleResponseFuncionario()
	{
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}
	
	
}
