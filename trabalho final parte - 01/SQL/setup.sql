CREATE TABLE setores (
    id_setor SERIAL PRIMARY KEY,
    nome_setor VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL
);


CREATE TABLE dispositivos (
    id_dispositivo SERIAL PRIMARY KEY,
    nome_dispositivo VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL
);


CREATE TABLE perguntas (
    id_pergunta SERIAL PRIMARY KEY,
    texto_pergunta TEXT NOT NULL,
    status VARCHAR(20) NOT NULL 
);


CREATE TABLE usuarios_admin (
    id_usuario SERIAL PRIMARY KEY,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE avaliacoes (
    id_avaliacao BIGSERIAL PRIMARY KEY,
    id_setor INTEGER NOT NULL REFERENCES setores(id_setor) ON DELETE RESTRICT,
    id_pergunta INTEGER NOT NULL REFERENCES perguntas(id_pergunta) ON DELETE RESTRICT,
    id_dispositivo INTEGER NOT NULL REFERENCES dispositivos(id_dispositivo) ON DELETE RESTRICT,
    resposta INTEGER NOT NULL CHECK (resposta >= 0 AND resposta <= 6),
    feedback TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO setores (nome_setor, status) VALUES
('Atendimento Geral', 'ativo'),
('Financeiro', 'ativo');


INSERT INTO dispositivos (nome_dispositivo, status) VALUES
('"Tablet Setor 1 - Sala A"', 'ativo'),
('Tablet Setor 2 - Recepção', 'ativo');


INSERT INTO perguntas (texto_pergunta, status) VALUES
('Qual sua satisfação com o atendimento recebido hoje?', 'ativo'),
('A limpeza e organização do local estavam adequadas?', 'ativo'),
('A agilidade no serviço prestado foi satisfatória?', 'ativo'),
('O nosso colaborador foi cordial e prestativo?', 'ativo'),
('Há algo que poderíamos melhorar?', 'ativo');