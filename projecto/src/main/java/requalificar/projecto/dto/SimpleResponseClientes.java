package requalificar.projecto.dto;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Cliente;

public class SimpleResponseClientes extends SimpleResponse
{
	List<Cliente> clientes;
	
	public SimpleResponseClientes()
	{
		clientes = new ArrayList<>();
	}

	public List<Cliente> getClientes() {
		return clientes;
	}

	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	
	
	
}
