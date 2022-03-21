# Planeamento Inicial - Sprint 1
## Docs
[Enunciado do Projecto - Livraria Requalificar](/Docs/Projeto.pdf)

### Docs de Apoio
[Texto - UML](/Docs/UML.pdf)

## Requisitos - Incompleto

**Requisitos Funcionais**

- Registo dos utilizadores (dois tipos) utilizando dados pessoais.
  - Cliente
    - nome, email, data de nascimento;
    - userLogin escolhido pelo cliente mas unico na base de dados 
    - password encryptada escolhida pelo cliente;
    - userid unico gerado automaticamente para controlo de base de dados;
  - Funcionario
    - nome, data de nascimento inserido pelo funcionario;
    - password encryptada escolhida pelo funcionario;
    - userid (nickname) auto gerado atraves do nome *ou escolhido pelo funcionario*;

- Login dos utilizadores atraves de userid e password:
  - Cliente
  - Funcionario  

- Logout dos utilizadores:
  - Cliente
  - Funcionario

- Existir base de dados dos diversos elementos intrinsecos ao funcionamento da livraria e dos seus campos especificos:
  - Livros
    - id, titulo, autores, ISBN, genero, preco, quantidade em stock, editora, data de lancamento, numero de paginas, sinopse, edicao, imagem;
  - Autores
    - id, nome, data de nascimento e email;
  - Editoras
    - nome e morada;
  - Clientes
    - nome, email, morada e data de nascimento; 
  - Funcionarios
    - id, usrid, nome, data de nascimento;
  - Compras Realizadas
    - data, valor, cliente, livros
  - Historico de cupoes emitidos em compras de determinados valores
    - compra, valorcupao

- Permitir ao utilizador funcionario a manipulacao da base de dados de:
  - Livros, Autores, Editoras com opcao de insercao de novos elementos e alteracao dos presentes.

- Permitir aos utilizadores cliente e funcionario pesquisa livros e visualizacao da lista de livros com campos minimos (Titulo, imagem, preco) e com hipoteses de ordenacao por:
  - Titulo (alfabetica), autor(alfabetica) ou so desse autor, editora(alfabetica) ou so dessa editora, preco, etc.
De forma descendente e ascendente.
   
- Permitir visualizar individualmente apos selecao de um elemento livro todas a suas caracteristicas e existir a funcionalidade de no caso do utilizador:
  - Cliente permitir adicionar ao carrinho;
  - Funcionario permitir alterar os dados:;

- Existir um carinho de compras de livros em que permite ao utilizador cliente:
  - Adiconar livros;
  - Remover livros;
  - Alterar o numero de livros presentes no carinho;
  - Consultar o valor do carrinho;
  - realizar checkout (Compra);

- Permitir que quando o utilizador cliente realize uma compra:
  - Possa associar cupoes de desconto que detenha antes finalizacao da compra;
  - Seja gerardo cupoes de disconto apos a sua conclusao consoante o valor da compra;
  - Verifique o sucesso da operacao compra;

- Existir um campo "Perfil" no utilizador cliente, em que este podera:
  - Alterar os seus dados pessoais;
  - Aceder aos seu historico de compras;
  - Aceder ao seus cupoes (usados e por usar)

- Fornecer um campo "Estatisticas" no utilizador funcionario, em que este podera:
  - visualizar estatisticas das vendas dos livros:
    - gastos, mais vendidos, mais rentaveis
  - visualizar estatisticas de clientes:
    - intervalo de idade mais rentavel, genero mais rentavel, altura do ano que compram mais, etc

**Requisitos Nao Funcionais**

- Devera ser desenvolvdo em duas semanas;

- Devera ser ulizada linguagem java com uso as bibliotecas/software de dominio/licensa de utilizacao publicas:
  - Eclipse
  - SpringBoot
  - Postgresql
  - React
  - Postman
  - pgAdmin
  - GitHub

- Devera ser concebido em arquitectura de multicamada para uma mais facil estruturacao e manutencao.

- Devera ser elaborada documentacao do processo de desenvolvimento no Github estruturada em etapas(Springs) e objectivos(milestones).   


## Case Use

![Diagrama - Case-Use](/Sprints/Projecto_Livraria.png)

## Diagrama UML

![Diagrama - UML](/Sprints/Projecto_Livraria_UML.png)
