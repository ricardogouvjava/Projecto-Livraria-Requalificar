package requalificar.projecto.utils;

import java.util.ArrayList;
import java.util.List;

import requalificar.projecto.models.Cliente;
import requalificar.projecto.models.Livro;

public class WrapperVenda 
{

	private Cliente cliente;
	private List<Livro> livros = new ArrayList<Livro>();
	private List<Integer> quantLivros = new ArrayList<Integer>();
	private double valor;
	
	
	public Cliente getCliente()
	{
		return cliente;
	}
	public void setCliente(Cliente cliente) 
	{
		this.cliente = cliente;
	}
	public List<Livro> getLivros() 
	{
		return livros;
	}
	public void setLivros(List<Livro> livros) 
	{
		this.livros = livros;
	}
	public List<Integer> getQuantLivros() 
	{
		return quantLivros;
	}
	public void setQuantLivros(List<Integer> quantLivros) 
	{
		this.quantLivros = quantLivros;
	}
	public double getValor() 
	{
		return valor;
	}
	public void setValor(double valor) 
	{
		this.valor = valor;
	}
}
