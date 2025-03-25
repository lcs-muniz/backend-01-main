Para rodar o projeto

npm install

npm run start-dev


# Dependencias

O Dotenv serve para criar um arquivo de váriaveis de ambiente no repositório, onde é configurado a definição do usuário para a conexão apenas mudando o que a variável irá receber em um arquivo separado.

O Cors é uma api para definir uma segurança de quais os websites terão acesso aos resources do servidor.

O Express é utilizado para features como gerenciar requisições da web e mobile, deixar a rota mais robusta e completa.


# Atividade:

Crie uma outra api

### Eventos e participantes 

* Um participante pode se inscrever em vários eventos

* Um evento pode ter vários participantes inscritos

* Crie uma tabela intermediária evento_participantes para armazenar essa relação

## Tabelas:
CREATE TABLE participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE participante_evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participanteId INT NOT NULL,
    eventosId INT NOT NULL,
    FOREIGN KEY (participanteId) REFERENCES participantes(id) ON DELETE CASCADE,
    FOREIGN KEY (eventosId) REFERENCES eventos(id) ON DELETE CASCADE
);