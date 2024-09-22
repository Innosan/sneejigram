const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../.data/db.sqlite3");
const db = new Database(dbPath);

const createTables = `
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS role (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS access_control_matrix (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER,
  resource TEXT NOT NULL,
  permission TEXT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id)
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

db.exec(createTables);

console.log("Database setup complete.");
db.close();
