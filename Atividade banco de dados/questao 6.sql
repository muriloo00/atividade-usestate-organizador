DROP DATABASE IF EXISTS ex06_exclusao;
CREATE DATABASE ex06_exclusao;
USE ex06_exclusao;
 
CREATE TABLE produtos (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2)
);
 
INSERT INTO produtos (nome, preco) VALUES
('Caneta',   2.50),
('Caderno', 18.90),
('Lápis',    1.50),
('Borracha', 3.00),
('Régua',    4.50);
 
DELETE FROM produtos WHERE id = 3;   -- WHERE garante que só um seja removido
 
SELECT * FROM produtos;