DROP DATABASE IF EXISTS ex09_cursos;
CREATE DATABASE ex09_cursos;
USE ex09_cursos;
 
CREATE TABLE cursos (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    carga_horaria INT
);
 
CREATE TABLE alunos (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    idade    INT,
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
 
INSERT INTO cursos (nome, carga_horaria) VALUES
('Informática', 1200),
('Administração', 1000),
('Eletrônica', 1100);
 
INSERT INTO alunos (nome, idade, curso_id) VALUES
('Ana',    17, 1),
('Bruno',  18, 1),
('Carla',  16, 2),
('Diego',  19, 2),
('Eduarda',17, 3),
('Felipe', 18, 3);
 
SELECT a.id, a.nome, a.idade, c.nome AS curso
FROM alunos a JOIN cursos c ON c.id = a.curso_id;