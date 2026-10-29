DROP DATABASE IF EXISTS ex20_loja_informatica;
CREATE DATABASE ex20_loja_informatica;
USE ex20_loja_informatica;
 
CREATE TABLE categorias (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL UNIQUE          -- NOT NULL e UNIQUE
);
 
CREATE TABLE produtos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    nome         VARCHAR(100) NOT NULL,
    preco        DECIMAL(10,2) NOT NULL,
    estoque      INT NOT NULL DEFAULT 0,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
 
INSERT INTO categorias (nome) VALUES
('Notebooks'), ('Periféricos'), ('Componentes'), ('Redes');
 
INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES
('Notebook Pro 15',        4500.00, 10, 1),
('Notebook Básico 14',     2800.00, 15, 1),
('Mouse Sem Fio',            79.90, 60, 2),
('Teclado Mecânico',        249.90, 35, 2),
('Monitor 24"',             899.00, 20, 2),
('Memória RAM 16GB',        299.00, 40, 3),
('SSD 1TB',                 450.00, 30, 3),
('Placa de Vídeo 8GB',     2200.00,  8, 3),
('Roteador Wi-Fi 6',        399.00, 25, 4),
('Switch 8 Portas',         180.00, 18, 4);
 
-- Alteração
UPDATE produtos SET preco = 429.00, estoque = 22 WHERE nome = 'Roteador Wi-Fi 6';
 
-- Exclusão
DELETE FROM produtos WHERE nome = 'Switch 8 Portas';
 
-- Consultas
SELECT * FROM categorias;
SELECT * FROM produtos;
 
SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria
FROM produtos p
JOIN categorias c ON c.id = p.categoria_id
ORDER BY c.nome, p.nome;