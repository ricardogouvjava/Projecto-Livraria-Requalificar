# Planeamento Inicial - Sprint 1
## Docs
[Enunciado do Projecto - Livraria Requalificar](Docs/Projeto.pdf)

### Docs de Apoio
[Texto - UML](/Docs/UML.pdf)

## Requisitos - Incompleto

**Requisitos Funcionais**

- Registo dos utilizadores (dois tipos) utilizando dados pessoais.
  - Cliente
    - nome, email, data de nascimento e password encryptada escolhidos pelo cliente;
    - id unico gerado automaticamente;
  - Funcionario
    - nome, data de nascimento inserido pelo funcionario;
    - id unico (nickname) auto gerado atraves do nome;

- Login dos utilizadores com confirmacao dos dados em base de dados:
  - Cliente
  - Funcionario  

- Logout dos utilizadores:
  - Cliente
  - Funcionario

- Existir base de dados dos diversos elementos intrinsecos ao funcionamento da livraria e dos seus campos especificos:
  - Livros
    - titulo, autores, ISBN, preco, quantidade em stock, editora, data de lancamento, numero de paginas, sinopse, edicao, imagem;
  - Autores
    - nome, data de nascimento e email;
  - Editoras
    - nome e morada;
  - Clientes
    - nome, email, morada e data de nascimento; 
  - Funcionarios
    - nome, data de nascimento e nickname

- Permitir ao utilizador de tipo funcionario a manipulacao da base de dados de:
  - Livros, Autores, Editoras com opcao de insercao de novos elementos e alteracao dos presentes.

- Permitir aos utilizadores cliente e funcionario pesquisa livros e visualizacao da lista de livros com campos minimos e com hipoteses de ordenacao;
   

- Permitir visualizar individualmente apos selecao de um elemento livro todas a suas caracteristicas

- Existir um carinho de compras de livros em que permite:
  - Adiconar livros
  - Remover livros
  - Alterar o numero de livros
  - Consultar o valor do carrinho

- Permitir ao utilizador cliente utilizar/manipular o carrinho de compras e realizar a accao compra em que nesta e possivel:
  - Associar cupoes de desconto antes finalizacao;
  - Gerar cupoes de disconto apos a sua conclusao;
  - Verificar o sucesso da operacao compra;

- Existir um campo "Perfil" no utilizador cliente, em que este podera:
  - alterar os seus dados pessoais;
  - aceder aos seu historico de compras;
  - aceder ao seus cupoes (usados e por usar)

- Fornecer um campo "Estatisticas" no utilizador funcionario, em que este podera:
- visualizar estatisticas das vendas dos livros:
  - gastos, mais vendidos, mais rentaveis


**Requisitos Nao Funcionais**
- Devera ser desenvolvdo em duas semanas;

- Devera ser ulizada linguagem java com uso as bibliotecas/software de dominio/licensa de utilizacao publicas:
  - Eclipse
  - SpringBoot
  - Postgresql
  - React
  - Postman
  - pgAdmin

- Devera ser concebido em arquitectura de multicamada para uma mais facil estruturacao e manutencao
  
- Listagem de livros aquando da procura devera apenas usar os elementos minimos (imagem, titulo e preco) com hipotese de utilizacao de filtros de forma descendente ou ascendente (preco / editora / autor / data de lancamento)

-  

## Case Use
[Diagrama de Case-Use - Link de Edicao no Diagrams](https://app.diagrams.net/?src=about#G1jZsvF--a0koeIQHv51fgQeugpGPUzqpi)

![Diagrama - Case-Use](/Sprints/Projecto_Livraria.png)

## Diagrama UML

[Diagrama - UML - Link de Edicao no Diagrams](https://app.diagrams.net/?src=about#G1AxUJbZJFG4Tdd7riOOYGaOUZxSYiLEBB)

![Diagrama - UML](/Sprints/Projecto_Livraria_UML.png)
