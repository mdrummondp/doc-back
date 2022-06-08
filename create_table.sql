create database Arquivos;

go

create table arquivo (
	id_arquivo int primary key generated always as identity,
	titulo varchar(100) not null,
	descricao varchar(2000) not null,
	caminho_arquivo varchar(200) not null,
	data_criacao timestamp not null);
	
