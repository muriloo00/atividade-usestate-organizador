DROP DATABASE IF EXISTS ex13_futebol;
CREATE DATABASE ex13_futebol;
USE ex13_futebol;
 
CREATE TABLE times (
    id   INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL
);
 
CREATE TABLE jogadores (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    numero_camisa INT,
    posicao       VARCHAR(30),
    time_id       INT NOT NULL,
    FOREIGN KEY (time_id) REFERENCES times(id)
);
 
INSERT INTO times (nome) VALUES ('Tigres FC'), ('Leões EC'), ('Águias SC');
 
INSERT INTO jogadores (nome, numero_camisa, posicao, time_id) VALUES
('Gabriel',  1, 'Goleiro',  1),
('Matheus', 10, 'Meia',     1),
('Rodrigo',  9, 'Atacante', 1),
('Thiago',   1, 'Goleiro',  2),
('Leandro',  5, 'Zagueiro', 2),
('Caio',    11, 'Atacante', 2),
('Bruno',    8, 'Volante',  3),
('Felipe',   7, 'Ponta',    3);
 
SELECT j.nome, j.numero_camisa, j.posicao, t.nome AS time
FROM jogadores j JOIN times t ON t.id = j.time_id;