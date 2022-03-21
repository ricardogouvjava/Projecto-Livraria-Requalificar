# Backend

## Cliente:
- @GetMapping("/getClienteByLoginId/{aLoginId}")  ```http://localhost:8080/getClienteByLoginId/ricardinho1998```

- @GetMapping("/getClientes") ```http://localhost:8080/getClientes```

- @PostMapping("/addCliente") ```http://localhost:8080/addCliente```
```
{
	"loginId": "ricardinho1998",
	"nome": "Ricardo",
	"password":"qwertyuiop",
	"dataDeNascimento": "25-02-1983",
	"email": "ricardinho1998@gmail.com"
}
```
- @DeleteMapping("/removeClienteByLoginId/{loginId}") ```//localhost:8080/removeClienteByLoginId/ricardinho1998```

- @PutMapping("/updateCliente")(nome, dataDeNascimento, email)  ```http://localhost:8080/updateCliente/```

```
{
	"loginId" : "ricardinho1998",
	"nome": "Ricardo Gouveia",
	"dataDeNascimento": "25-02-2000",
	"email": "ricardinhoGouveia1998@gmail.com"

}
```

## Livro:
- @GetMapping("/getlivroByISBN/{ISBN}")

- @GetMapping("/getLivros") ```http://localhost:8080/getLivros```

- @PostMapping("/addLivro") ```http://localhost:8080/addLivro```

```
{
	"isbn": "blob",
	"titulo": "Fazadas do Mundo",
	"preco": 20,
	"stock": 15,
	"dataLancamento": "20-10-1983",
	"paginas": 500,
	"edicao": 1,
	"sinopse":"O melhor livro alguma vez escrito",
	"imagem": "C:\\Users\\ricar\\Documents\\GitHub\\Projecto---Livraria-Requalificar\\projecto\\src\\main\\resources\\imagens\\teste.jpg"
}
```

- @DeleteMapping("/removeLivroByISBN/{ISBN}") ```http://localhost:8080/removeLivroByIsbn/blob```
- @PutMapping("/updateLivro")

## Autor
@PostMapping("/addAutor")
@GetMapping("/getAutores")

## Editora
@GetMapping("getEditora/{id}")

