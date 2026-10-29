DROP DATABASE IF EXISTS ex10_categorias;
CREATE DATABASE ex10_categorias;
USE ex10_categorias;
 
CREATE TABLE categorias (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL
);
 
CREATE TABLE produtos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    nome         VARCHAR(100) NOT NULL,
    preco        DECIMAL(10,2),
    quantidade   INT,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
 
INSERT INTO categorias (nome) VALUES ('Alimentos'), ('Bebidas'), ('Limpeza');
 
INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES
('Arroz 5kg',       28.90, 50, 1),
('Feijão 1kg',       8.50, 80, 1),
('Macarrão',         5.20, 120, 1),
('Suco de Uva',     12.00, 40, 2),
('Refrigerante 2L',  9.90, 70, 2),
('Detergente',       2.80, 150, 3),
('Sabão em Pó',     18.00, 60, 3);
 
SELECT p.id, p.nome, p.preco, p.quantidade, c.nome AS categoria
FROM produtos p JOIN categorias c ON c.id = p.categoria_id;