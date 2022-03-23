package requalificar.projecto.dto;

import java.util.List;

import requalificar.projecto.models.Cliente;
import requalificar.projecto.models.Livro;

public class SimpleResponseVenda extends SimpleResponse
{
	Cliente cliente;
	double valor;
	List<Livro> livros;
	
	
	public SimpleResponseVenda() {
	}
	
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public List<Livro> getLivros() {
		return livros;
	}
	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}
}
