-- para cria um banco de dados 
create database orientacao_db;

CREATE TABLE orientacoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255)
);