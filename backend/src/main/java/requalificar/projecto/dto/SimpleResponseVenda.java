package requalificar.projecto.dto;

import requalificar.projecto.models.Venda;

public class SimpleResponseVenda extends SimpleResponse
{
	Venda venda;
	
	public SimpleResponseVenda() {
	}

	
	public Venda getVenda() {
		return venda;
	}

	public void setVenda(Venda venda) {
		this.venda = venda;
	}
	
}
