BEGIN;

-- model user
INSERT INTO users (name) VALUES ('Asis Hallab'), ('Josef Schmitz');


-- model post
INSERT INTO posts (text, user_id)
  VALUES 
    ( 'interesting post no. 1',
      (SELECT id FROM users WHERE name = 'Asis Hallab')
    ),
    ( 'interesting post no. 2',
      (SELECT id FROM users WHERE name = 'Asis Hallab')
    ),
    ( 'boring post no. 1',
      (SELECT id FROM users WHERE name = 'Josef Schmitz')
    );


END;
