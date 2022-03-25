package requalificar.projecto.dto;

import requalificar.projecto.models.Cliente;

public class SimpleResponseCliente extends SimpleResponse
{
	Cliente cliente;
	
	public SimpleResponseCliente()
	{
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	
}
