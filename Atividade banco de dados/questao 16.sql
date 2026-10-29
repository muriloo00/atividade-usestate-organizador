DROP DATABASE IF EXISTS ex16_petshop;
CREATE DATABASE ex16_petshop;
USE ex16_petshop;
 
CREATE TABLE donos (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    telefone VARCHAR(20)
);
 
CREATE TABLE animais (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nome     VARCHAR(60) NOT NULL,
    especie  VARCHAR(40),
    idade    INT,
    dono_id  INT NOT NULL,                 -- vários animais podem ter o mesmo dono (1:N)
    FOREIGN KEY (dono_id) REFERENCES donos(id)
);
 
INSERT INTO donos (nome, telefone) VALUES
('Ana',    '48999990001'),
('Bruno',  '48999990002'),
('Carla',  '48999990003'),
('Daniel', '48999990004');
 
INSERT INTO animais (nome, especie, idade, dono_id) VALUES
('Rex',   'Cachorro', 5, 1),
('Mimi',  'Gato',     3, 1),
('Thor',  'Cachorro', 2, 2),
('Nemo',  'Peixe',    1, 3),
('Luna',  'Gato',     4, 3),
('Piu',   'Pássaro',  2, 4),
('Bolt',  'Cachorro', 6, 4);
 
SELECT a.nome AS animal, a.especie, a.idade, d.nome AS dono
FROM animais a JOIN donos d ON d.id = a.dono_id;