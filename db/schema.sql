CREATE TABLE users(
  id    SERIAL PRIMARY KEY,
  username  TEXT NOT NULL,
  password TEXT,
  sentiment_rating TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP
);

CREATE TABLE chatrooms(
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  average_sentiment TEXT
);

CREATE TABLE messages(
  id    SERIAL PRIMARY KEY,
  content  VARCHAR(200),
  sentiment TEXT,
  created_at TIMESTAMP,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  chatroom_id INTEGER REFERENCES chatrooms(id) NOT NULL
  );

 

CREATE TABLE chatroom_users(
    id SERIAL PRIMARY KEY,
    chatroom TEXT NOT NULL,
    users TEXT NOT NULL
);

INSERT INTO chatrooms(name) VALUES('test room');

INSERT INTO chatrooms(name) VALUES('test room 2');


INSERT INTO users(username) VALUES('test user 1');

INSERT INTO users(username) VALUES('test user 2');

INSERT INTO users(username) VALUES('test user 3');


INSERT INTO chatroom_users(chatroom, users) VALUES('test room','test user 1');
INSERT INTO chatroom_users(chatroom, users) VALUES('test room', 'test user 2');
INSERT INTO chatroom_users(chatroom, users) VALUES('test room 2','test user 2');
INSERT INTO chatroom_users(chatroom, users) VALUES('test room 2', 'test user 3');



 INSERT INTO messages(content, user_id, chatroom_id) VALUES('this message is sent by user 1 in test room', 1, 1);

 INSERT INTO messages(content, user_id, chatroom_id) VALUES('this the 2nd message is sent by user 1 in test room', 1, 1);

INSERT INTO messages(content, user_id, chatroom_id) VALUES('this a message is sent by user 2 in test room ', 2, 1);

INSERT INTO messages(content, user_id, chatroom_id) VALUES('this a message is sent by user 2 in test room 2', 2, 2);

INSERT INTO messages(content, user_id, chatroom_id) VALUES('this a message is sent by user 3 in test room 2', 3, 2);





