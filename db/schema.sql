CREATE TABLE user_table(
  id    SERIAL PRIMARY KEY,
  username  TEXT NOT NULL,
  password TEXT,
  sentiment_rating TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP
);

CREATE TABLE chatroom_table(
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  average_sentiment TEXT
);

CREATE TABLE message_table(
  id    SERIAL PRIMARY KEY,
  content  VARCHAR(200),
  sentiment TEXT,
  created_at TIMESTAMP,
  user_id INTEGER REFERENCES user_table(id) NOT NULL,
  chatroom_id INTEGER REFERENCES chatroom_table(id) NOT NULL
  );

 

CREATE TABLE chatroom_user_join_table(
    id SERIAL PRIMARY KEY,
    user_table TEXT NOT NULL,
    chatroom_table TEXT NOT NULL
);


///DEFAULT CHATROOM
INSERT INTO chatroom_table(name) VALUES('default chatroom');


/// DEFAULT USER TESTING
INSERT INTO user_table(username) VALUES('default user 1');
INSERT INTO user_table(username) VALUES('default user 2');






/// RELATIONSHIP TESTING 
INSERT INTO chatroom_table(name) VALUES('test room');

INSERT INTO chatroom_table(name) VALUES('test room 2');


INSERT INTO user_table(username) VALUES('test user 1');

INSERT INTO user_table(username) VALUES('test user 2');

INSERT INTO user_table(username) VALUES('test user 3');


INSERT INTO chatroom_user_join_table(chatroom_table, user_table) VALUES('test room','test user 1');
INSERT INTO chatroom_user_join_table(chatroom_table, user_table) VALUES('test room', 'test user 2');
INSERT INTO chatroom_user_join_table(chatroom_table, user_table) VALUES('test room 2','test user 2');
INSERT INTO chatroom_user_join_table(chatroom_table, user_table) VALUES('test room 2', 'test user 3');



 INSERT INTO message_table(content, user_id, chatroom_id) VALUES('this message is sent by user 1 in test room', 1, 1);

 INSERT INTO message_table(content, user_id, chatroom_id) VALUES('this the 2nd message is sent by user 1 in test room', 1, 1);

INSERT INTO message_table(content, user_id, chatroom_id) VALUES('this a message is sent by user 2 in test room ', 2, 1);

INSERT INTO message_table(content, user_id, chatroom_id) VALUES('this a message is sent by user 2 in test room 2', 2, 2);

INSERT INTO message_table(content, user_id, chatroom_id) VALUES('this a message is sent by user 3 in test room 2', 3, 2);





