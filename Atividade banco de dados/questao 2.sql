DROP DATABASE IF EXISTS ex02_loja;
CREATE DATABASE ex02_loja;
USE ex02_loja;
 
CREATE TABLE produtos (
    codigo    INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    preco     DECIMAL(10,2),
    estoque   INT
);
 
INSERT INTO produtos (nome, categoria, preco, estoque) VALUES
('Camiseta',  'Vestuário',   49.90, 100),
('Tênis',     'Calçados',   299.90,  40),
('Mochila',   'Acessórios', 129.50,  60),
('Boné',      'Acessórios',  39.90,  80),
('Calça Jeans','Vestuário', 159.00,  35),
('Meia',      'Vestuário',   14.90, 200);
 
SELECT * FROM produtos;