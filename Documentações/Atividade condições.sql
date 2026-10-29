-- ATIVIDADE PRÁTICA — SQL: FILTROS E ORDENAÇÃO
-- Curso: Banco de Dados — SENAI
-- Nome: __________________________  Turma: __________________

-- ============================================
-- 1. Preparação do banco
-- ============================================

CREATE DATABASE IF NOT EXISTS atividade_senai;
USE atividade_senai;

CREATE TABLE IF NOT EXISTS livros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100),
  autor VARCHAR(80),
  genero VARCHAR(40),
  ano_publicacao INT,
  preco DECIMAL(8,2),
  estoque INT
);

INSERT INTO livros (titulo, autor, genero, ano_publicacao, preco, estoque) VALUES
('Python Basico', 'Ana Lima', 'Tecnologia', 2022, 59.90, 8),
('SQL na Pratica', 'Bruno Costa', 'Tecnologia', 2023, 74.50, 5),
('Redes de Computadores', 'Ana Lima', 'Tecnologia', 2020, 89.00, 2),
('Historia do Brasil', 'Carla Souza', 'Historia', 2018, 42.00, 12),
('Mundo Antigo', 'Diego Alves', 'Historia', 2015, 38.90, 0),
('Matematica Facil', 'Elisa Rocha', 'Educacao', 2021, 55.00, 7),
('Fisica para Todos', 'Elisa Rocha', 'Educacao', 2019, 65.00, 3),
('Aventura na Floresta', 'Fabio Melo', 'Ficcao', 2024, 39.90, 10),
('O Misterio da Ilha', 'Gabi Nunes', 'Ficcao', 2022, 49.90, 1),
('Algoritmos Modernos', 'Bruno Costa', 'Tecnologia', 2024, 99.90, 4),
('Contos da Cidade', 'Fabio Melo', 'Ficcao', 2017, 29.90, 6),
('Geografia Atual', 'Carla Souza', 'Educacao', 2023, 61.00, 9);

-- ============================================
-- 2. Consultas com AND e OR
-- ============================================

-- Questão 1: Livros de Tecnologia que custam mais de R$ 70,00
SELECT * FROM livros
WHERE genero = 'Tecnologia' AND preco > 70.00;

-- Questão 2: Livros publicados a partir de 2022 e com estoque maior que 5
SELECT * FROM livros
WHERE ano_publicacao >= 2022 AND estoque > 5;

-- Questão 3: Livros cujo gênero seja Historia ou Ficcao
SELECT * FROM livros
WHERE genero = 'Historia' OR genero = 'Ficcao';

-- Questão 4: Livros escritos por Ana Lima ou Bruno Costa
SELECT * FROM livros
WHERE autor = 'Ana Lima' OR autor = 'Bruno Costa';

-- Questão 5: Tecnologia com estoque < 5 OU Ficção com preço < 40,00
SELECT * FROM livros
WHERE (genero = 'Tecnologia' AND estoque < 5)
   OR (genero = 'Ficcao' AND preco < 40.00);

-- ============================================
-- 3. ORDER BY e LIMIT
-- ============================================

-- Questão 6: Todos os livros por preço crescente
SELECT * FROM livros
ORDER BY preco ASC;

-- Questão 7: Todos os livros do mais recente ao mais antigo
SELECT * FROM livros
ORDER BY ano_publicacao DESC;

-- Questão 8: Os 3 livros mais caros
SELECT * FROM livros
ORDER BY preco DESC
LIMIT 3;

-- Questão 9: Os 5 livros mais antigos
SELECT * FROM livros
ORDER BY ano_publicacao ASC
LIMIT 5;

-- Questão 10: Livros com estoque > 0, do menor para o maior estoque
SELECT * FROM livros
WHERE estoque > 0
ORDER BY estoque ASC;

-- ============================================
-- 4. Pesquisas com LIKE
-- ============================================

-- Questão 11: Títulos que começam com a letra A
SELECT * FROM livros
WHERE titulo LIKE 'A%';

-- Questão 12: Títulos que contêm a palavra "de" (com espaços, para não pegar "Redes", "Cidade" etc.)
SELECT * FROM livros
WHERE titulo LIKE '% de %';

-- Questão 13: Autores cujo nome termina em "Lima"
SELECT * FROM livros
WHERE autor LIKE '%Lima';

-- Questão 14: Títulos que contêm a palavra "para"
SELECT * FROM livros
WHERE titulo LIKE '% para %';

-- ============================================
-- 5. Desafios combinados
-- ============================================

-- Questão 15: Os 3 livros de Tecnologia mais baratos
SELECT * FROM livros
WHERE genero = 'Tecnologia'
ORDER BY preco ASC
LIMIT 3;

-- Questão 16: Ficção ou História a partir de 2018, ordenados por ano (decrescente)
SELECT * FROM livros
WHERE (genero = 'Ficcao' OR genero = 'Historia')
  AND ano_publicacao >= 2018
ORDER BY ano_publicacao DESC;

-- Questão 17: Títulos que contêm "SQL" ou "Python", ordenados por preço decrescente
SELECT * FROM livros
WHERE titulo LIKE '%SQL%' OR titulo LIKE '%Python%'
ORDER BY preco DESC;

-- Questão 18: 4 livros com estoque disponível e preço até R$ 65,00, dos mais baratos
SELECT * FROM livros
WHERE estoque > 0 AND preco <= 65.00
ORDER BY preco ASC
LIMIT 4;