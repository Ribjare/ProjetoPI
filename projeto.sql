DROP TABLE IF EXISTS Modalidade;
create table Modalidade(
	id int primary key auto_increment,
    modalidade varchar(100)
);
Insert into Modalidade(modalidade) values("Tenis Mesa");

DROP TABLE IF EXISTS TipoTorneio;
create table TipoTorneio(
	id int primary key auto_increment,
	tipo varchar(100)
);
Insert into TipoTorneio(tipo) values("exato");

DROP TABLE IF EXISTS Torneio;
CREATE TABLE Torneio (
  id int(11) primary key auto_increment,
  name varchar(100),
  modalidade int,
  tipoTorneio int,
  foreign key(modalidade) references Modalidade(id) ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(tipoTorneio) references TipoTorneio(id) ON DELETE CASCADE ON UPDATE CASCADE
);
Insert into Torneio(name, modalidade, tipoTorneio)
			values	("Migos United Torneio", 1, 1),
					("KSJFDE", 1, 1);
                    

                    
DROP TABLE IF EXISTS Equipa;
CREATE TABLE Equipa(
	id int primary key auto_increment,
	nome varchar(100)
);
INSERT INTO Equipa(nome) values("Focas"),
								("Andre"),
                                ("Fate"),
                                ("Vaz");

DROP TABLE IF EXISTS Jogador;
CREATE TABLE Jogador(
	id int primary key auto_increment,
	nome varchar(100),
    birthDate date,
    nTelemovel int,
    idEquipa int,
    foreign key(idEquipa) references Equipa(id) ON DELETE CASCADE ON UPDATE CASCADE
);
Insert into Jogador(nome, birthDate, nTelemovel, idEquipa) 
			values	("Ribjare",'1999-04-19', '933333333', 1),
					("Dre", '1973-12-16', '967465132', 1),
                    ("Adnre", '1985-12-26', '784563284', 2),
                    ("Ferro", '1973-12-16', '789461354', 3),
                    ("Marxiu", '1973-12-16', '564849872', 3),
                    ('Vaz', '1973-12-16', '987654226', 4);
                    

DROP TABLE IF EXISTS TorneioEquipa;
CREATE TABLE TorneioEquipa(
	id int primary key auto_increment,
    idEquipa int,
    idTorneio int,
    foreign key(idEquipa) references Equipa(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(idTorneio) references Torneio(id) ON DELETE CASCADE ON UPDATE CASCADE
);
Insert into torneioequipa(idEquipa, idTorneio) values (1,1), (3,1), (2,2), (4,2);

Select * 
from Equipa 
join torneioequipa on equipa.id = torneioequipa.idEquipa;

DROP TABLE IF EXISTS Jogo;
CREATE TABLE Jogo(
	id int primary key auto_increment,
	dataJogo date,
    equipa1 int,
    equipa2 int,
    foreign key(equipa1) references Equipa(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(equipa2) references Equipa(id) ON DELETE CASCADE ON UPDATE CASCADE
);
Insert into Jogo(dataJogo, equipa1, equipa2) 
values('2019-07-19', 1, 3),
		('2019-08-15', 2, 4);

SELECT Jogo.id, Jogo.equipa1, Jogo.equipa2, torneio.name
FROM Jogo 
join torneioequipa on Jogo.id = torneioequipa.idEquipa
join Torneio on torneio.id = torneioequipa.idTorneio