DROP DATABASE IF EXISTS ex17_cinema;
CREATE DATABASE ex17_cinema;
USE ex17_cinema;
 
CREATE TABLE filmes (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    titulo  VARCHAR(120) NOT NULL,
    genero  VARCHAR(40),
    duracao INT                 -- em minutos
);
 
CREATE TABLE sessoes (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    horario  TIME NOT NULL,
    sala     INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES filmes(id)
);
 
INSERT INTO filmes (titulo, genero, duracao) VALUES
('Aventura Espacial', 'Ficção',  120),
('Riso Solto',        'Comédia',  95),
('Noite Sombria',     'Terror', 105),
('Coração de Verão',  'Romance', 110);
 
INSERT INTO sessoes (horario, sala, filme_id) VALUES
('14:00', 1, 1),
('16:30', 2, 2),
('19:00', 1, 1),
('20:00', 3, 3),
('21:30', 2, 4),
('22:00', 3, 3);
 
SELECT s.id, f.titulo, s.horario, s.sala
FROM sessoes s JOIN filmes f ON f.id = s.filme_id
ORDER BY s.horario;