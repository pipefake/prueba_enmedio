-- init.sql (sin la línea create database)
drop table if exists users cascade;
drop table if exists transactions cascade;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nick VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_name VARCHAR(100),
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user',
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    _id serial PRIMARY KEY,
    terminalId VARCHAR NOT NULL,
    amount FLOAT NOT NULL,
    currency VARCHAR NOT NULL,
    cardMasked VARCHAR,
    transactionType VARCHAR NOT NULL,
    status VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO public.users
(name, email, nick, password, last_name, bio, role, image)
VALUES('Juan Felipe', 'jfjimenezsalazar@gmail.com', 'pipejimenez', '$2b$10$EqCvI9TjY6.CqVt03KQn5ede0rRZ7j.w5JvDfwwepexvKKkdAruMm', 'Jiménez Salazar', 'Soy un desarrrollador Backend', 'admin', 'none');
