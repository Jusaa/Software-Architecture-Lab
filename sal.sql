CREATE TABLE client (
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL
);
CREATE TABLE note (
	note_id serial PRIMARY KEY,
	user_id integer REFERENCES client(user_id),
	content VARCHAR (1024) NOT NULL
);
INSERT INTO client (username, password) VALUES ('Jussi', 'Jussi123');
INSERT INTO client (username, password) VALUES ('Test', 'Test123');
INSERT INTO note (user_id, content) VALUES (1, 'PRESENTATION 28.2');
