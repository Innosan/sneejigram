const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../.data/db.sqlite3");
const db = new Database(dbPath);

const seedData = `
INSERT INTO role (name) VALUES
('admin'),
('user'),
('guest');

INSERT INTO user (username, email, password, role_id) VALUES
('user1', 'user1@example.com', 'password1', 1),
('user2', 'user2@example.com', 'password2', 2);

INSERT INTO post (user, content) VALUES
(1, 'Hello World!'),
(2, 'This is a post.');

INSERT INTO tag (title) VALUES
('Tech'),
('Humor'),
('Education'),
('Question'),
('Bluff');

INSERT INTO post_tag (post, tag) VALUES
(1, 2),
(1, 5),
(1, 1),
(2, 1),
(2, 3);

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

INSERT INTO access_control_matrix (role_id, resource, permission) VALUES
(1, 'post', 'CREATE'),
(1, 'post', 'READ'),
(1, 'post', 'UPDATE'),
(1, 'post', 'DELETE'),
(1, 'comment', 'CREATE'),
(1, 'comment', 'READ'),
(1, 'comment', 'UPDATE'),
(1, 'comment', 'DELETE'),
(1, 'like', 'CREATE'),
(1, 'like', 'READ'),
(1, 'like', 'DELETE'),
(2, 'post', 'CREATE'),
(2, 'post', 'READ'),
(2, 'post', 'UPDATE'),
(2, 'comment', 'CREATE'),
(2, 'comment', 'READ'),
(2, 'comment', 'UPDATE'),
(2, 'like', 'CREATE'),
(2, 'like', 'READ'),
(2, 'like', 'UPDATE'),
(3, 'post', 'READ'),
(3, 'comment', 'READ'),
(3, 'like', 'READ');
`;

db.exec(seedData);

console.log("Database seed complete.");
db.close();
