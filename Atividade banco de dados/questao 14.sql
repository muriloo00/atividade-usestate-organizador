DROP DATABASE IF EXISTS ex14_restaurante;
CREATE DATABASE ex14_restaurante;
USE ex14_restaurante;
 
CREATE TABLE mesas (
    numero INT PRIMARY KEY,
    lugares INT NOT NULL
);
 
CREATE TABLE pedidos (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor     DECIMAL(10,2),
    mesa_numero INT NOT NULL,
    FOREIGN KEY (mesa_numero) REFERENCES mesas(numero)
);
 
INSERT INTO mesas (numero, lugares) VALUES (1,2), (2,4), (3,4), (4,6), (5,8);
 
INSERT INTO pedidos (descricao, valor, mesa_numero) VALUES
('Prato executivo + suco',        32.00, 1),
('Pizza grande',                  60.00, 2),
('2 hambúrgueres + refrigerante', 55.00, 2),
('Salada + água',                 25.00, 3),
('Feijoada para 4',              120.00, 4),
('Churrasco misto',              180.00, 5),
('Sobremesa',                     18.00, 5);
 
SELECT * FROM pedidos;