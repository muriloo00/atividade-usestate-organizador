DROP DATABASE IF EXISTS ex19_integridade;
CREATE DATABASE ex19_integridade;
USE ex19_integridade;
 
CREATE TABLE autores (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);
 
CREATE TABLE obras (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    titulo   VARCHAR(150) NOT NULL,
    autor_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
);
 
INSERT INTO autores (nome) VALUES ('Machado de Assis'), ('Clarice Lispector');
 
INSERT INTO obras (titulo, autor_id) VALUES
('Dom Casmurro', 1),
('Memórias Póstumas de Brás Cubas', 1),
('A Hora da Estrela', 2);
 
 DELETE FROM autores WHERE id = 1;

-- Resultado no MySQL:
--   ERROR 1451 (23000): Cannot delete or update a parent row:
--   a foreign key constraint fails
--
-- EXPLICAÇÃO: a exclusão foi impedida porque obras.autor_id referencia
-- autores.id e ainda existem obras ligadas ao autor 1. Se o MySQL
-- permitisse a exclusão, essas obras ficariam apontando para um autor
-- inexistente (registros órfãos), quebrando a integridade referencial.
-- Para excluir o autor, é preciso antes apagar/alterar as obras
-- relacionadas (ou definir ON DELETE CASCADE / SET NULL na FK).
 