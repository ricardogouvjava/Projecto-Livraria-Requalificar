# Backend

## Cliente:
- @GetMapping("/getClienteByLoginId/{aLoginId}")  

```http://localhost:8080/getClienteByLoginId/ricardinho1998```

- @GetMapping("/getClientes") 

```http://localhost:8080/getClientes```

- @PostMapping("/addCliente") 

```http://localhost:8080/addCliente```

```
{
	"loginId": "ricardinho1998",
	"nome": "Ricardo",
	"password":"qwertyuiop",
	"dataDeNascimento": "25-02-1983",
	"email": "ricardinho1998@gmail.com"
}
```

- @DeleteMapping("/removeClienteByLoginId/{loginId}") 

```//localhost:8080/removeClienteByLoginId/ricardinho1998```

- @PutMapping("/updateCliente")(nome, dataDeNascimento, email)  

```http://localhost:8080/updateCliente/```

```
{
	"loginId" : "ricardinho1998",
	"nome": "Ricardo Gouveia",
	"dataDeNascimento": "25-02-2000",
	"email": "ricardinhoGouveia1998@gmail.com"

}
```

## Livro:
- @GetMapping("/getLivroByIsbn/{isbn}")

```http://localhost:8080/getLivroByIsbn/blob```

- @GetMapping("/getLivros") 

```http://localhost:8080/getLivros```

- @PostMapping("/addLivro") 

```http://localhost:8080/addLivro```

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

- @DeleteMapping("/removeLivroByIsbn/{isbn}") 

```http://localhost:8080/removeLivroByIsbn/blob```

- @PutMapping("/updateLivro")
```
{
    "id": 7,
    "titulo": "Fazadas do Mundo",
    "isbn": "blob",
    "preco": 20.0,
    "stock": 10,
    "dataLancamento": "23-10-2000",
    "paginas": 500,
    "edicao": 2,
    "imagem": "C:\\Users\\ricar\\Documents\\GitHub\\Projecto---Livraria-Requalificar\\projecto\\src\\main\\resources\\imagens\\teste.jpg",
    "sinopse": "O melhor livro alguma vez escrito, sem duvida"
}
```

## Autor
@PostMapping("/addAutor")
@GetMapping("getAutor/{id}")
@GetMapping("/getAutores")
@PostMapping("/addAutor/{autorId}/Livro/{livroId}")

## Editora

@PostMapping("/addEditora") 
```http://localhost:8080/addEditora```
```
{
    "nome" : "Ricardo Printing",
    "morada" : "Estrada das Editoras 1"
}
```

@GetMapping("getEditora/{id}")

@GetMapping("/getEditoras") ```http://localhost:8080/getEditoras```

