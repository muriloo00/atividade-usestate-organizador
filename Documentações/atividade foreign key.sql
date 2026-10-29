CREATE DATABASE loja_fk;
USE loja_fk;

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(120),
    cidade VARCHAR(80)
);

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto VARCHAR(100),
    valor DECIMAL(10,2),
    quantidade INT,
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

INSERT INTO clientes (nome, email, cidade) VALUES
('Ana Silva', 'ana@email.com', 'Palhoça'),
('Carlos Souza', 'carlos@email.com', 'São José'),
('Mariana Lima', 'mariana@email.com', 'Florianópolis'),
('Pedro Santos', 'pedro@email.com', 'Biguaçu');

INSERT INTO pedidos (produto, valor, quantidade, cliente_id) VALUES
('Teclado', 120.00, 1, 1),
('Mouse', 50.00, 2, 1),
('Monitor', 850.00, 1, 2),
('Headset', 180.00, 1, 3),
('Notebook', 3200.00, 1, 4),
('Mousepad', 35.00, 3, 2);

INSERT INTO pedidos (produto, valor, quantidade, cliente_id)
VALUES ('Webcam', 150.00, 1, 99);

SELECT * FROM clientes;

SELECT * FROM pedidos;
