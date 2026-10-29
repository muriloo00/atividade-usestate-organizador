DROP DATABASE IF EXISTS ex11_professores;
CREATE DATABASE ex11_professores;
USE ex11_professores;
 
CREATE TABLE professores (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nome    VARCHAR(100) NOT NULL,
    formacao VARCHAR(100)
);
 
CREATE TABLE disciplinas (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    carga_horaria INT,
    professor_id  INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);
 
INSERT INTO professores (nome, formacao) VALUES
('Helena Prado',  'Matemática'),
('Ricardo Vaz',   'Física'),
('Sandra Melo',   'Letras');
 
INSERT INTO disciplinas (nome, carga_horaria, professor_id) VALUES
('Álgebra',      60, 1),
('Geometria',    40, 1),
('Mecânica',     80, 2),
('Literatura',   50, 3),
('Redação',      40, 3);
 
SELECT d.nome AS disciplina, d.carga_horaria, p.nome AS professor
FROM disciplinas d JOIN professores p ON p.id = d.professor_id;