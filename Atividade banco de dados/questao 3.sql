DROP DATABASE IF EXISTS ex03_empresa;
CREATE DATABASE ex03_empresa;
USE ex03_empresa;
 
CREATE TABLE funcionarios (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nome    VARCHAR(100) NOT NULL,
    cargo   VARCHAR(60),
    salario DECIMAL(10,2),
    setor   VARCHAR(60)
);
 
INSERT INTO funcionarios (nome, cargo, salario, setor) VALUES
('Marcos Silva',   'Analista',      4500.00, 'TI'),
('Paula Ramos',    'Gerente',       9000.00, 'Vendas'),
('Rafael Costa',   'Assistente',    2500.00, 'RH'),
('Juliana Alves',  'Desenvolvedora',6000.00, 'TI'),
('Tiago Pereira',  'Contador',      5200.00, 'Financeiro');
 
UPDATE funcionarios SET salario = 5000.00 WHERE id = 1;
 
SELECT * FROM funcionarios;