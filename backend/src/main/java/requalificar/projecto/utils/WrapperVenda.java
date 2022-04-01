package requalificar.projecto.utils;

import java.util.List;

import requalificar.projecto.models.Cliente;
import requalificar.projecto.models.Livro;

public class WrapperVenda
{
	private Cliente cliente;
	private List<Livro> livros;
	private List<Integer> quantidades;
	private double valor;
	public Cliente getCliente() {
		return cliente;
	}
	
	
	public WrapperVenda(Cliente cliente, List<Livro> livros, List<Integer> quantidades, double valor) {
		super();
		this.cliente = cliente;
		this.livros = livros;
		this.quantidades = quantidades;
		this.valor = valor;
	}


	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public List<Livro> getLivros() {
		return livros;
	}
	public void setLivros(List<Livro> livros) {
		this.livros = livros;
	}
	public List<Integer> getQuantidades() {
		return quantidades;
	}
	public void setQuantidades(List<Integer> quantidades) {
		this.quantidades = quantidades;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	

}