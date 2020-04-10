CREATE TABLE users(
  id    SERIAL PRIMARY KEY,
  username  TEXT,
  password TEXT,
  sentiment_rating TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP
);

CREATE TABLE chatrooms(
  id    SERIAL PRIMARY KEY,
  name  TEXT,
  average_sentiment TEXT
);

CREATE TABLE messages(
  id    SERIAL PRIMARY KEY,
  content  VARCHAR(200),
  sentiment TEXT,
  created_at TIMESTAMP,
  user_id INTEGER REFERENCES users(id),
  chatroom_id INTEGER REFERENCES chatrooms(id)
  );


CREATE TABLE chatroom_users(
    id SERIAL PRIMARY KEY,
    chatroom TEXT,
    users TEXT
);

INSERT INTO chatrooms(name) VALUES('test room');

INSERT INTO users(name) VALUES('test user 1');

INSERT INTO users(name) VALUES('test user 2');



INSERT INTO chatroom_users(chatroom, users) VALUES('test user 1, test room');
INSERT INTO chatroom_users(chatroom, users) VALUES('test user 2, test room');

