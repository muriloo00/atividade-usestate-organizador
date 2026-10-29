DROP DATABASE IF EXISTS ex18_lanchonete;
CREATE DATABASE ex18_lanchonete;
USE ex18_lanchonete;
 
CREATE TABLE clientes (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    telefone VARCHAR(20)
);
 
CREATE TABLE pedidos (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    descricao  VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL,
    valor      DECIMAL(10,2),
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
 
INSERT INTO clientes (nome, telefone) VALUES
('Ana',   '48999990001'),
('Bruno', '48999990002'),
('Carla', '48999990003');
 
INSERT INTO pedidos (descricao, quantidade, valor, cliente_id) VALUES
('X-Burger',          2, 36.00, 1),
('Batata frita',      1, 15.00, 1),
('Refrigerante lata', 3, 18.00, 2),
('Hot dog',           2, 24.00, 3),
('Milkshake',         1, 16.00, 3);
 
UPDATE pedidos SET quantidade = 3, valor = 54.00 WHERE id = 1;   -- altera
DELETE FROM pedidos WHERE id = 4;                                -- exclui
 
SELECT * FROM pedidos;   -- registros restantes