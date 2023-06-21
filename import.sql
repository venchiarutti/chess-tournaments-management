CREATE TABLE hotel( 
IdHotel INT NOT NULL UNIQUE AUTO_INCREMENT,
Nome VARCHAR(50) NOT NULL UNIQUE, 
Endereco VARCHAR(100) NOT NULL, 
Telefone VARCHAR(20) NOT NULL, 
PRIMARY KEY (idHotel)
);

CREATE TABLE salao( 
IdSalao INT NOT NULL UNIQUE AUTO_INCREMENT, 
NomeHotel VARCHAR(50) NOT NULL, 
Capacidade INT NOT NULL, 
PRIMARY KEY (IdSalao), 
FOREIGN KEY (NomeHotel) REFERENCES hotel(Nome) 
ON DELETE CASCADE 
ON UPDATE CASCADE 
);

ALTER TABLE salao
ADD COLUMN IdHotel INT NOT NULL;

UPDATE salao s
JOIN hotel h ON s.NomeHotel = h.Nome
SET s.IdHotel = h.IdHotel;

ALTER TABLE salao
DROP FOREIGN KEY salao_ibfk_1;

ALTER TABLE salao
DROP COLUMN NomeHotel;

ALTER TABLE salao
ADD CONSTRAINT FK_salao_hotel FOREIGN KEY (IdHotel) REFERENCES hotel(IdHotel) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE meio_comunicacao_salao (
IdMeioSalao INT NOT NULL UNIQUE AUTO_INCREMENT,
IdSalao INT NOT NULL, 
MeioComunicacao VARCHAR(50) NOT NULL, 
PRIMARY KEY (idMeioSalao), 
FOREIGN KEY (IdSalao) REFERENCES salao(IdSalao) 
ON DELETE CASCADE 
ON UPDATE CASCADE,
CONSTRAINT UC_idSalao_MeioComunicacao UNIQUE (IdSalao, MeioComunicacao)
);

CREATE TABLE pais ( 
IdPais INT NOT NULL UNIQUE AUTO_INCREMENT, 
NumClubes INT NOT NULL, 
NomePais VARCHAR(50) NOT NULL, 
PRIMARY KEY (IdPais)
 );

CREATE TABLE participante ( 
IdParticipante INT NOT NULL UNIQUE AUTO_INCREMENT, 
Nome VARCHAR(50) NOT NULL,
Endereco VARCHAR(100) NOT NULL, 
Telefone VARCHAR(20) NOT NULL, 
IdPais INT NOT NULL, 
TipoParticipante VARCHAR(50) NOT NULL, 
PRIMARY KEY (IdParticipante), 
FOREIGN KEY (IdPais) REFERENCES pais(IdPais) 
ON DELETE CASCADE 
ON UPDATE CASCADE 
);

CREATE TABLE acomodacao (
IdAcomodacao INT NOT NULL UNIQUE AUTO_INCREMENT,
NomeHotel VARCHAR(50) NOT NULL, 
IdParticipante INT NOT NULL, 
Entrada DATE NOT NULL, 
Saida DATE NOT NULL,
PRIMARY KEY (IdAcomodacao),
FOREIGN KEY (NomeHotel) REFERENCES hotel(Nome) 
ON DELETE CASCADE 
ON UPDATE CASCADE, 
FOREIGN KEY (IdParticipante) REFERENCES participante(IdParticipante)
ON DELETE CASCADE 
ON UPDATE CASCADE,
CONSTRAINT UC_NomeHotel_Participante UNIQUE (NomeHotel, IdParticipante)
);

CREATE TABLE jogo (
IdJogo INT NOT NULL UNIQUE AUTO_INCREMENT, 
IdArbitro INT, 
IdSalao INT, 
EntradasVendidas INT NOT NULL, 
Dia INT NOT NULL, 
Mes INT NOT NULL, 
Ano INT NOT NULL, 
PRIMARY KEY (IdJogo), 
FOREIGN KEY (IdArbitro) REFERENCES participante(IdParticipante) 
ON UPDATE CASCADE 
ON DELETE SET NULL, 
FOREIGN KEY (IdSalao) REFERENCES salao(IdSalao) 
ON UPDATE CASCADE 
ON DELETE SET NULL
);

CREATE TABLE movimento ( 
IdJogo INT NOT NULL, 
IdMovimento INT NOT NULL UNIQUE AUTO_INCREMENT, 
Jogada VARCHAR(50) NOT NULL, 
Comentario VARCHAR(200) NOT NULL, 
PRIMARY KEY (IdMovimento), 
FOREIGN KEY (IdJogo) REFERENCES jogo(IdJogo) 
ON UPDATE CASCADE 
ON DELETE CASCADE 
);

CREATE TABLE joga(
IdJoga INT NOT NULL UNIQUE AUTO_INCREMENT,
IdJogo INT NOT NULL, 
IdParticipante INT NOT NULL, 
Nivel INT NOT NULL, 
Cor VARCHAR(10) NOT NULL, 
PRIMARY KEY (IdJoga), 
FOREIGN KEY (IdJogo) REFERENCES jogo(IdJogo) 
ON UPDATE CASCADE 
ON DELETE CASCADE,
FOREIGN KEY (IdParticipante) REFERENCES participante(IdParticipante) 
ON UPDATE CASCADE 
ON DELETE CASCADE,
CONSTRAINT UC_IdJogo_IdParticipante UNIQUE (IdJogo, IdParticipante)
);

CREATE TABLE participa_campeonato (
IdParticipacao INT NOT NULL UNIQUE AUTO_INCREMENT,
IdParticipante INT NOT NULL, 
NomeCampeonato VARCHAR(50) NOT NULL, 
TipoParticipacao VARCHAR(50) NOT NULL, 
PRIMARY KEY (IdParticipacao), 
FOREIGN KEY (IdParticipante) REFERENCES participante(IdParticipante) ON UPDATE CASCADE 
ON DELETE CASCADE,
CONSTRAINT UC_NomeCampeonato_IdParticipante UNIQUE (IdParticipante, NomeCampeonato)
);

INSERT INTO hotel (Nome, Endereco, Telefone) 
VALUES 
('Hilton', 'Rua A, 123, Centro', '+55 11 1234-5678'), 
('Matsoud Plaza', 'Rua B, 456, Jardins', '+55 11 2345-6789'), 
('Ibis Consolação', 'Rua C, 789, Consolação', '+55 11 3456-7890');

INSERT INTO salao(IdHotel, Capacidade) 
VALUES 
(1, 50), 
(2, 60), 
(3, 80), 
(1, 200), 
(2, 150), 
(3, 20);

INSERT INTO meio_comunicacao_salao (IdSalao, MeioComunicacao) VALUES 
(1,'televisao'), 
(3,'radio'), 
(4,'televisao'), 
(4,'radio'), 
(5,'televisao');

INSERT INTO pais (NumClubes, NomePais) 
VALUES 
(3, 'Brasil'), 
(2, 'Argentina'), 
(1, 'Uruguai'), 
(1, 'Paraguai'), 
(1, 'Chile');

INSERT INTO participante (Nome, Endereco, Telefone, IdPais, TipoParticipante) VALUES 
('Bob Fisher', 'Rua A, 123', '(11) 9999-8888', 1, 'jogador'), 
('Garry Kasparov', 'Rua B, 456', '(11) 9999-7777', 2, 'jogador'), 
('José Santos', 'Rua C, 789', '(11) 9999-6666', 3, 'jogador'), 
('Carlos Pereira', 'Rua D, 1011', '(11) 9999-5555', 1, 'arbitro'), 
('Boris Sparski', 'Rua E, 1213', '(11) 9999-4444', 5, 'arbitro'), 
('Bob Marley', 'Rua Z, 123', '(11) 9999-8888', 1, 'jogador'); 

INSERT INTO acomodacao (NomeHotel, IdParticipante, Entrada, Saida) VALUES 
('Matsoud Plaza', 1, '2023-05-01', '2023-05-03'), 
('Matsoud Plaza', 2, '2023-05-02', '2023-05-04'), 
('Matsoud Plaza', 3, '2023-05-01', '2023-05-03'),
('Hilton', 4, '2023-05-02', '2023-05-04'), 
('Hilton', 5, '2023-05-01', '2023-05-03');

INSERT INTO jogo (IdArbitro, IdSalao, EntradasVendidas, Dia, Mes, Ano) VALUES 
(4,4,150,5,5,2023), 
(5,2,20,20,4,2023), 
(5,5,100,23,4,2023), 
(5,5,80,1,6,2023); 

INSERT INTO movimento(IdJogo, Jogada, Comentario)
VALUES
(1, '1.e4', 'Abertura espanhola'),
(1, '1...e5', 'Resposta do rei'),
(1, '2.Nf3', 'Cavaleiro para a frente'),
(2, '2...Nc6', 'Desenvolvimento do cavalo'),
(2, '3.Bb5', 'Bispo na casa b5'),
(3, '3...a6', 'Defesa contra o bispo'),
(3, '4.Ba4', 'Bispo volta para a2'),
(3, '4...Nf6', 'Cavalo se desenvolve'),
(3, '5.O-O', 'Roque do lado do rei'),
(4, '5...Be7', 'Bispo defende o cavalo'),
(4, '6.Re1', 'Torre na fileira e'),
(4, '6...b5', 'Ataque ao bispo'),
(4, '7.Bb3', 'Bispo retorna para a casa b3'),
(4, '7...d6', 'Peão avança para d6');

INSERT INTO joga (IdJogo, IdParticipante, Nivel, Cor) 
VALUES 
(1, 1, 10, 'branco'), 
(2, 1, 8, 'preto'), 
(1, 2, 10, 'preto'), 
(4, 2, 5, 'branca'), 
(4, 3, 5, 'preto'), 
(2, 3, 8, 'branca');

INSERT INTO participa_campeonato (IdParticipante, NomeCampeonato, TipoParticipacao) 
VALUES 
(1, 'Copa do Mundo de Xadrez 2023', 'jogador'), 
(1, 'Copa do Mundo de Xadrez 2022', 'jogador'), 
(1, 'Copa do Mundo de Xadrez 2010', 'arbitro'), 
(2, 'Copa do Mundo de Xadrez 2023', 'jogador'), 
(3, 'Copa do Mundo de Xadrez 2023', 'jogador'), 
(2, 'Copa do Mundo de Xadrez 2022', 'jogador'), 
(6, 'Copa do Mundo de Xadrez 1999', 'jogador'), 
(4, 'Copa do Mundo de Xadrez 2023', 'arbitro'), 
(5, 'Copa do Mundo de Xadrez 2023', 'arbitro'), 
(5, 'Copa do Mundo de Xadrez 2022', 'arbitro');