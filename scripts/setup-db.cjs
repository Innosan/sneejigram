const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../.data/db.sqlite");
const db = new Database(dbPath);

const createTables = `
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user INTEGER,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user INTEGER,
  post INTEGER,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user) REFERENCES user(id),
  FOREIGN KEY (post) REFERENCES post(id)
);

CREATE TABLE IF NOT EXISTS \`like\` (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user INTEGER,
  post INTEGER,
  status INTEGER,
  FOREIGN KEY (user) REFERENCES user(id),
  FOREIGN KEY (post) REFERENCES post(id)
);

CREATE TABLE IF NOT EXISTS community (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user INTEGER,
  community INTEGER,
  role INTEGER,
  FOREIGN KEY (user) REFERENCES user(id),
  FOREIGN KEY (community) REFERENCES community(id)
);
`;

const seedData = `
INSERT INTO user (username, email, password) VALUES
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2');

INSERT INTO post (user, content) VALUES
(1, 'Hello World!'),
(2, 'This is a post.');

INSERT INTO comment (user, post, content) VALUES
(1, 1, 'Nice post!'),
(2, 1, 'Thank you!');

INSERT INTO \`like\` (user, post, status) VALUES
(1, 1, 1),
(2, 1, 1);

INSERT INTO community (name, description) VALUES
('Community1', 'This is the first community.'),
('Community2', 'This is the second community.');

INSERT INTO community_user (user, community, role) VALUES
(1, 1, 1),
(2, 1, 2),
(1, 2, 1);
`;

db.exec(createTables);
db.exec(seedData);

console.log("Database setup complete.");
db.close();
