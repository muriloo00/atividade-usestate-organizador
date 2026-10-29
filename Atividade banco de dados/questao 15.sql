DROP DATABASE IF EXISTS ex15_locadora;
CREATE DATABASE ex15_locadora;
USE ex15_locadora;
 
CREATE TABLE clientes (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf  CHAR(11) NOT NULL UNIQUE
);
 
CREATE TABLE veiculos (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    modelo     VARCHAR(60) NOT NULL,
    placa      VARCHAR(8)  NOT NULL UNIQUE,   -- placa não se repete
    cliente_id INT NULL,                      -- NULL = veículo disponível
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
 
INSERT INTO clientes (nome, cpf) VALUES
('Lucas',   '11111111111'),
('Mariana', '22222222222'),
('Pedro',   '33333333333');
 
INSERT INTO veiculos (modelo, placa, cliente_id) VALUES
('Onix',  'ABC1D23', 1),
('HB20',  'DEF4G56', 2),
('Kwid',  'GHI7J89', 3),
('Mobi',  'JKL0M12', NULL);
 
SELECT v.modelo, v.placa, c.nome AS cliente
FROM veiculos v LEFT JOIN clientes c ON c.id = v.cliente_id;