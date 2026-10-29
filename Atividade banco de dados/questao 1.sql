DROP DATABASE IF EXISTS ex01_escola;
CREATE DATABASE ex01_escola;
USE ex01_escola;
 
CREATE TABLE alunos (
    id     INT AUTO_INCREMENT PRIMARY KEY,   -- automático e único
    nome   VARCHAR(100) NOT NULL,            -- não pode ficar vazio (NULL)
    idade  INT,
    email  VARCHAR(100),
    cidade VARCHAR(80)
);
 
INSERT INTO alunos (nome, idade, email, cidade) VALUES
('Ana Souza',      17, 'ana@email.com',    'Palhoça'),
('Bruno Lima',     18, 'bruno@email.com',  'Florianópolis'),
('Carla Mendes',   16, 'carla@email.com',  'São José'),
('Diego Santos',   19, 'diego@email.com',  'Biguaçu'),
('Eduarda Rocha',  17, 'edu@email.com',    'Palhoça');
 
SELECT * FROM alunos;