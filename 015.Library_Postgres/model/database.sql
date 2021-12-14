create TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  login VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255),
  books VARCHAR(255)
)

create TABLE authors(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

create TABLE books(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  authorId INTEGER,
  qty INTEGER,
  FOREIGN KEY (authorId) REFERENCES authors (id)
);