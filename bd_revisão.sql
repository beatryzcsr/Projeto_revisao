Create table Usuarios (
idu SERIAL PRIMARY KEY,
email VARCHAR (100)NOT NULL,
senha VARCHAR (100) NOT NULL
);

insert into Usuarios (email, senha) values ('JoãoBarbs@gmail.com', 'Barbs_1327');
insert into Usuarios (email, senha) values ('Jessica.Yum@gmail.com', '4722MoreYum');
insert into Usuarios (email, senha) values ('Pablo_José@gmail.com', 'é_o_zé_Construç');
insert into Usuarios (email, senha) values ('Maria.CAlves@gmail.com', 'Clara19082007');
insert into Usuarios (email, senha) values ('Henrique_Mendez@gmail.com', 'Mendez_Cores@2738');


Create table Empresas(
ide SERIAL PRIMARY KEY,
nome VARCHAR(1000) NOT NULL,
cnpj VARCHAR (14) NOT NULL,
telefone VARCHAR (15) NOT NULL
);

INSERT INTO Empresas (nome, cnpj, telefone) Values
('Traço Livre', '4761-0/03', '(XX) 98888-3333'),
('TurboX', '4520-0/01', '(XX) 3222-4444'),
('Art Attack', '4530-7/03', '(XX) 97000-5555'),
('SmartBox', '4751-2/01', '(XX) 98555-0000'),
('EcoBuilder', '4744-0/99', '(XX) 99666-0000');

Create table Produtos(
idt SERIAL PRIMARY KEY,
nome VARCHAR(1000) NOT NULL,
preco DECIMAL (9,2) NOT NULL,
quantidade_estoque INT NOT NULL,
empresa_id INTEGER REFERENCES Empresas(ide)
);

insert into Produtos (nome,preco,quantidade_estoque,empresa_id) values ('Estojo Box Daily Estojo Mini Box', '79.80', '15', 1),
(' Válvula Termostática Astra S10 Vectra MTE', '131.00', '5', 2),
('Tinta Acrílica Rende e Cobre Muito Suvinil', '105.85', '10',3),
('Controle Dualsense Sem Fio Sony', '404.94', '5', 4),
('Massa Pronta Matrix 50Kg', '30.00', '40', 5)


-- A tabela de tokens é necessária para armazenas os tokens de verificação do usuário, em vez de salvar no local storage

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES Usuarios(idu)
);

