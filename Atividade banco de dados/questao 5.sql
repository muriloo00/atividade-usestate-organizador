DROP DATABASE IF EXISTS ex05_biblioteca;
CREATE DATABASE ex05_biblioteca;
USE ex05_biblioteca;
 
CREATE TABLE livros (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titulo      VARCHAR(150) NOT NULL,
    autor       VARCHAR(100),
    ano         INT,
    disponiveis INT
);
 
INSERT INTO livros (titulo, autor, ano, disponiveis) VALUES
('Dom Casmurro',               'Machado de Assis',   1899, 5),
('O Cortiço',                  'Aluísio Azevedo',    1890, 3),
('Capitães da Areia',          'Jorge Amado',        1937, 4),
('Vidas Secas',                'Graciliano Ramos',   1938, 6),
('A Hora da Estrela',          'Clarice Lispector',  1977, 2),
('Grande Sertão: Veredas',     'Guimarães Rosa',     1956, 1);
 
UPDATE livros SET disponiveis = 4 WHERE id = 1;
 
SELECT * FROM livros;