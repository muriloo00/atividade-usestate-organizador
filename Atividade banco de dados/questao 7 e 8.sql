DROP DATABASE IF EXISTS ex07_clientes_pedidos;
CREATE DATABASE ex07_clientes_pedidos;
USE ex07_clientes_pedidos;
 
CREATE TABLE clientes (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);
 
CREATE TABLE pedidos (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    produto    VARCHAR(100) NOT NULL,
    valor      DECIMAL(10,2),
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
 
INSERT INTO clientes (nome, email) VALUES
('Ana',    'ana@email.com'),
('Bruno',  'bruno@email.com'),
('Carla',  'carla@email.com'),
('Daniel', 'daniel@email.com');
 
INSERT INTO pedidos (produto, valor, cliente_id) VALUES
('Notebook',  3500.00, 1),
('Mouse',       80.00, 1),
('Teclado',    150.00, 2),
('Monitor',    900.00, 3),
('Headset',    250.00, 3),
('Webcam',     200.00, 4);
 
SELECT * FROM pedidos;