package requalificar.projecto.dto;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Venda;

public class SimpleResponseVendas extends SimpleResponse
{
	List<Venda> vendas;
	
	
	public SimpleResponseVendas() {
		vendas = new ArrayList<Venda>();
	}


	public List<Venda> getVendas() {
		return vendas;
	}


	public void setVendas(List<Venda> vendas) {
		this.vendas = vendas;
	}
	

}
