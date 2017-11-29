BEGIN;


-- model user
CREATE SEQUENCE users_id_seq;

CREATE TABLE users ( 
  id integer PRIMARY KEY DEFAULT nextval('users_id_seq'),
  name varchar(255) NOT NULL
);


-- model posts
CREATE SEQUENCE posts_id_seq;

CREATE TABLE posts ( 
  id integer PRIMARY KEY DEFAULT nextval('posts_id_seq'),
  text text NOT NULL,
  user_id integer NOT NULL references users(id) ON DELETE CASCADE
);


END;
