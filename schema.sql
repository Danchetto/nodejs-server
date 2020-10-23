CREATE EXTENSION IF NOT EXISTS CITEXT;



-- USERS ----------------------------------------------------------------------------------------------------
CREATE TABLE users
(
  id BIGSERIAL UNIQUE,
  login VARCHAR COLLATE ucs_basic PRIMARY KEY,
  about TEXT,
  email CITEXT NOT NULL UNIQUE,
  fullname CITEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS indexUniqueEmail ON users(lower(email));
CREATE UNIQUE INDEX IF NOT EXISTS indexSuperStrange ON users(lower(login), login);
CREATE UNIQUE INDEX IF NOT EXISTS indexUniqueNicknameLow ON users(LOWER(login collate "ucs_basic"));
