CREATE DATABASE bookstore;

CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  PRIMARY KEY(id)
);

SELECT * FROM books WHERE `id` = 1;

INSERT INTO books (`name`, `author`) VALUES ('$name', '$author');

UPDATE books SET `name`='$name', `author`='$author' WHERE `id` = '$id';

DELETE FROM books WHERE `id` = '$id';