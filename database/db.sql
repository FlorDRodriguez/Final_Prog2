CREATE DATABASE db_market;

USE db_market;

CREATE TABLE users(
    id INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    namee VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    img VARCHAR(255) DEFAULT '/img/usuario.png',
    PRIMARY KEY (id)
);

CREATE TABLE categories(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(20) NOT NULL,
    nameCat VARCHAR(20)  NOT NULL UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(20) NOT NULL,
    category_id INT(20) NOT NULL,
    nameProd VARCHAR(40) NOT NULL UNIQUE,
    brand VARCHAR(20) NOT NULL,
    min_desc VARCHAR(40),
    quantity INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_userr FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);