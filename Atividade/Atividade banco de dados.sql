CREATE DATABASE IF NOT EXISTS escola;
USE escola;
DROP TABLE IF EXISTS alunos;
CREATE TABLE alunos (id INT PRIMARY KEY, nome VARCHAR(100), idade INT, curso VARCHAR(100), cidade VARCHAR(100));

INSERT INTO alunos VALUES
(1, 'Ana', 17, 'Informática', 'Palhoça'),
(2, 'Carlos', 18, 'Banco de Dados', 'São José'),
(3, 'Maria', 16, 'Informática', 'Florianópolis'),
(4, 'João', 19, 'Programação', 'Palhoça'),
(5, 'Pedro', 18, 'Banco de Dados', 'São José'),
(6, 'Juliana', 17, 'Programação', 'Florianópolis'),
(7, 'Lucas', 20, 'Informática', 'Palhoça'),
(8, 'Beatriz', 18, 'Banco de Dados', 'Palhoça');

SELECT * FROM alunos;
SELECT nome FROM alunos;
SELECT nome, idade FROM alunos;
SELECT nome, curso FROM alunos;
SELECT nome, curso, cidade FROM alunos;
SELECT * FROM alunos WHERE id = 3;
SELECT * FROM alunos WHERE id = 6;
SELECT * FROM alunos WHERE curso = 'Informática';
SELECT * FROM alunos WHERE curso = 'Banco de Dados';
SELECT * FROM alunos WHERE curso = 'Programação';
SELECT * FROM alunos WHERE idade = 18;
SELECT * FROM alunos WHERE cidade = 'Palhoça';
SELECT * FROM alunos WHERE cidade = 'São José';
SELECT * FROM alunos WHERE nome = 'Maria';
SELECT * FROM alunos WHERE nome = 'Beatriz';

INSERT INTO alunos VALUES
(9, 'Rafael', 19, 'Programação', 'São José'),
(10, 'Fernanda', 17, 'Informática', 'Palhoça'),
(11, 'Gustavo', 18, 'Banco de Dados', 'Florianópolis');

SELECT * FROM alunos;
SELECT nome, curso FROM alunos WHERE id = 9;
SELECT nome, curso FROM alunos WHERE id = 10;
SELECT nome, curso FROM alunos WHERE id = 11;

INSERT INTO alunos VALUES
(12, 'Camila', 17, 'Programação', 'Palhoça'),
(13, 'Thiago', 19, 'Informática', 'São José'),
(14, 'Larissa', 18, 'Banco de Dados', 'Florianópolis');

SELECT * FROM alunos;
SELECT * FROM alunos WHERE curso = 'Programação';
SELECT * FROM alunos WHERE cidade = 'Florianópolis';
SELECT * FROM alunos WHERE idade = 17;
SELECT nome, cidade FROM alunos WHERE curso = 'Informática';
SELECT nome, curso FROM alunos WHERE cidade = 'Palhoça';
SELECT nome, idade FROM alunos WHERE idade = 18;

INSERT INTO alunos VALUES (15, 'Bruno', 20, 'Programação', 'São José');
SELECT * FROM alunos WHERE id = 15;
SELECT nome FROM alunos WHERE id = 5;