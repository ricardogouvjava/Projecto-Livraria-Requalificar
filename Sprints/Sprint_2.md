# Backend

## Client:
- @GetMapping("/getClienteByLoginId/{aLoginId}")
- @GetMapping("/getClientes")
- @PostMapping("/addCliente")
- @DeleteMapping("/removeClienteByLoginId/{loginId}")
- @PutMapping("/updateCliente")(nome, dataDeNascimento, email)

## Livro:
- @GetMapping("/getlivroByISBN/{ISBN}")
- @GetMapping("/getLivros")
- @PostMapping("/addLivro")
- @DeleteMapping("/removeLivroByISBN/{ISBN}")
- @PutMapping("/updateLivro")

## Autor
@PostMapping("/addAutor")
@GetMapping("/getAutores")

## Editora

