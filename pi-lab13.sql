DROP TABLE IF EXISTS person;
CREATE TABLE person (
  id int(11) NOT NULL,
  name varchar(100) NOT NULL,
  birthDate date NOT NULL,
  idCountry int(11) NOT NULL
);

INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(1, 'Rui Nunes', '1986-05-04', 1);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(2, 'Pedro Rodriguez', '1996-03-14', 3);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(3, 'Sara Santos', '1929-06-04', 4);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(4, 'Ana Telles', '1929-06-04', 2);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(5, 'Pinto da Costa', '1937-12-28', 1);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(6, 'Lionel Messi', '1987-06-24', 3);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(7, 'Cristiano Ronaldo', '1985-02-05', 1);
INSERT INTO person (id, `name`, birthDate, idCountry) VALUES(8, 'Mariza', '1973-12-16', 1); 

DROP TABLE IF EXISTS country;
CREATE TABLE country (
  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  shortName varchar(45) NOT NULL
);

INSERT INTO country (id, `name`, shortName) VALUES(1, 'Portugal', 'PT');
INSERT INTO country (id, `name`, shortName) VALUES(2, 'Argentina', 'AR');
INSERT INTO country (id, `name`, shortName) VALUES(3, 'Spain', 'ES');
INSERT INTO country (id, `name`, shortName) VALUES(4, 'Brazil', 'BR');
INSERT INTO country (id, `name`, shortName) VALUES(5, 'United Kingdom', 'GB');
INSERT INTO country (id, `name`, shortName) VALUES(6, 'United States of America', 'US');

ALTER TABLE country
  ADD PRIMARY KEY (id);

ALTER TABLE person
  ADD PRIMARY KEY (id),
  ADD KEY person_country_fk (idCountry) USING BTREE;

ALTER TABLE country
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE person
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE person
  ADD CONSTRAINT person_country_fk FOREIGN KEY (idCountry) REFERENCES country (id) ON DELETE CASCADE ON UPDATE CASCADE;
