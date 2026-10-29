-- =====================================================================
-- Biblioteca: prática de SQL
-- SENAI | Banco de Dados | INSERT, SELECT, UPDATE, PK e FK
-- Nome: Murilo        Turma: 2026desim1        Data: 26/10/2026
-- =====================================================================


-- =====================================================================
-- 1. PREPARAÇÃO DO BANCO
-- =====================================================================
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE autores (
    id_autor INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50)
);

CREATE TABLE livros (
    id_livro INT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ano_publicacao INT,
    quantidade INT,
    id_autor INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
);


-- =====================================================================
-- 2. CADASTRO DOS AUTORES - INSERT
-- =====================================================================
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (1, 'Machado de Assis', 'Brasileira');
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (2, 'Clarice Lispector', 'Brasileira');
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (3, 'José de Alencar', 'Brasileira');
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (4, 'Júlio Verne', 'Francesa');


-- =====================================================================
-- 3. CADASTRO DOS LIVROS - INSERT
-- =====================================================================
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (101, 'Dom Casmurro', 1899, 4, 1);
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (102, 'Memórias Póstumas de Brás Cubas', 1881, 3, 1);
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (103, 'A Hora da Estrela', 1977, 5, 2);
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (104, 'Iracema', 1865, 2, 3);
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (105, 'Viagem ao Centro da Terra', 1864, 6, 4);


-- =====================================================================
-- 4. CONSULTA DE INFORMAÇÕES - SELECT
-- =====================================================================

-- 4.1 Todos os dados dos autores
SELECT * FROM autores;

-- 4.2 Todos os dados dos livros
SELECT * FROM livros;

-- 4.3 Somente os nomes dos autores
SELECT nome FROM autores;

-- 4.4 Somente os títulos e as quantidades dos livros
SELECT titulo, quantidade FROM livros;

-- 4.5 Livro cujo identificador é 103
SELECT * FROM livros WHERE id_livro = 103;

-- 4.6 Livros cujo id_autor é 1
SELECT * FROM livros WHERE id_autor = 1;

-- 4.7 Livros com quantidade menor que 4
SELECT * FROM livros WHERE quantidade < 4;


-- =====================================================================
-- 5. ATUALIZAÇÃO DOS REGISTROS - UPDATE
-- =====================================================================

-- 5.1 Dom Casmurro: recebeu três exemplares (4 -> 7)
UPDATE livros
SET quantidade = 7
WHERE id_livro = 101;
SELECT * FROM livros WHERE id_livro = 101;

-- 5.2 Iracema: quantidade registrada incorretamente (2 -> 5)
UPDATE livros
SET quantidade = 5
WHERE id_livro = 104;
SELECT * FROM livros WHERE id_livro = 104;

-- 5.3 Padronizar o nome do autor Júlio Verne para Jules Verne (pelo identificador)
UPDATE autores
SET nome = 'Jules Verne'
WHERE id_autor = 4;
SELECT * FROM autores WHERE id_autor = 4;

-- 5.4 Atualizar o título de Viagem ao Centro da Terra
UPDATE livros
SET titulo = 'Viagem ao centro da Terra'
WHERE id_livro = 105;
SELECT * FROM livros WHERE id_livro = 105;

-- 5.5 A Hora da Estrela: um exemplar retirado do acervo (5 -> 4)
UPDATE livros
SET quantidade = 4
WHERE id_livro = 103;
SELECT * FROM livros WHERE id_livro = 103;


-- =====================================================================
-- 6. ENTENDENDO AS CHAVES PK E FK
-- =====================================================================

-- Qual é a chave primária da tabela autores?
-- R: id_autor. Ele identifica de forma única cada autor da tabela.

-- Qual é a chave primária da tabela livros?
-- R: id_livro. Ele identifica de forma única cada livro da tabela.

-- Qual campo é a chave estrangeira de livros? Qual tabela e campo ele referencia?
-- R: id_autor, na tabela livros, é a chave estrangeira. Ele referencia
--    o campo id_autor da tabela autores.

-- Por que dois livros podem ter o mesmo id_autor, mas não o mesmo id_livro?
-- R: Porque id_autor em livros é uma chave estrangeira, que apenas indica quem
--    escreveu a obra, e um mesmo autor pode escrever vários livros. Já id_livro
--    é a chave primária e precisa ser único para identificar cada livro.

-- Um autor pode possuir mais de um livro cadastrado? Cite um exemplo.
-- R: Sim. Machado de Assis (id_autor = 1) possui dois livros: Dom Casmurro (101)
--    e Memórias Póstumas de Brás Cubas (102).


-- ---------------------------------------------------------------------
-- TESTES DE INTEGRIDADE (comentados para não interromper o arquivo)
-- ---------------------------------------------------------------------

-- 6. Cadastrar outro autor com id_autor = 1
-- INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (1, 'Autor Repetido', 'Brasileira');
-- Resultado: ERROR 1062 (23000): Duplicate entry '1' for key 'autores.PRIMARY'
-- Explicação: id_autor é chave primária e já existe um autor com o valor 1.
--             A chave primária não aceita valores repetidos.

-- 7. Cadastrar livro com id_autor = 99 (autor ainda não cadastrado)
-- INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (106, 'Livro Teste', 2020, 1, 99);
-- Resultado: ERROR 1452 (23000): Cannot add or update a child row: a foreign key
--            constraint fails
-- Explicação: id_autor é chave estrangeira e o valor 99 não existe em autores.
--             O banco impede registrar um livro de um autor inexistente.

-- 8. Cadastrar o autor 99 e tentar novamente cadastrar o livro
-- INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (99, 'Autor Fictício Teste', 'Fictícia');
-- INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (106, 'Livro Teste', 2020, 1, 99);
-- Resultado: os dois comandos executam com sucesso.
-- Explicação: agora o autor 99 existe na tabela autores, então a chave estrangeira
--             é satisfeita e o livro pode ser cadastrado.


-- =====================================================================
-- 7. DESAFIO FINAL
-- =====================================================================

-- 7.1 Cadastrar novo autor fictício com identificador ainda não utilizado
INSERT INTO autores (id_autor, nome, nacionalidade) VALUES (5, 'Ana Lima Fictícia', 'Brasileira');

-- 7.2 Cadastrar dois livros vinculados a esse autor, com três exemplares de cada
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (201, 'O Jardim das Horas', 2015, 3, 5);
INSERT INTO livros (id_livro, titulo, ano_publicacao, quantidade, id_autor) VALUES (202, 'Cartas do Farol', 2019, 3, 5);

-- 7.3 Consultar os livros pelo identificador do autor
SELECT * FROM livros WHERE id_autor = 5;

-- 7.4 Atualizar a quantidade de um dos livros para cinco
UPDATE livros
SET quantidade = 5
WHERE id_livro = 201;

-- 7.5 Consultar o livro atualizado para comprovar a alteração
SELECT * FROM livros WHERE id_livro = 201;
