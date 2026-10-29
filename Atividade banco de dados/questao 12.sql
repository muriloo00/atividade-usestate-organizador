DROP DATABASE IF EXISTS ex12_departamentos;
CREATE DATABASE ex12_departamentos;
USE ex12_departamentos;
 
CREATE TABLE departamentos (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL
);
 
CREATE TABLE funcionarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    cargo           VARCHAR(60),
    salario         DECIMAL(10,2),
    departamento_id INT NOT NULL,   -- NOT NULL + FK = sempre um departamento existente
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);
 
INSERT INTO departamentos (nome) VALUES ('TI'), ('RH'), ('Financeiro');
 
INSERT INTO funcionarios (nome, cargo, salario, departamento_id) VALUES
('Marcos',  'Analista',       4500.00, 1),
('Juliana', 'Desenvolvedora', 6000.00, 1),
('Rafael',  'Assistente',     2500.00, 2),
('Carolina','Recrutadora',    3200.00, 2),
('Tiago',   'Contador',       5200.00, 3),
('Beatriz', 'Analista Fin.',  4800.00, 3);
 
SELECT f.id, f.nome, f.cargo, f.salario, d.nome AS departamento
FROM funcionarios f JOIN departamentos d ON d.id = f.departamento_id;