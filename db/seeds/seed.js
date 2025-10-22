const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookupObj } = require("./utils.js");

const seed = ({ topicData, userData, articleData, commentData, emojiData }) => {
  return db
    .query(`DROP TABLE IF EXISTS emojis;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY UNIQUE,
      description VARCHAR,
      img_url VARCHAR(1000)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR PRIMARY KEY UNIQUE,
        name VARCHAR,
        avatar_url VARCHAR(1000)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR,
        topic VARCHAR REFERENCES topics (slug),
        author VARCHAR REFERENCES users (username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles (article_id),
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR REFERENCES users (username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE emojis (
        emoji_id SERIAL PRIMARY KEY,
        comment INT REFERENCES comments (comment_id),
        emoji VARCHAR NOT NULL
        );`);
    })
    .then(() => {
      const dataArr = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const formattedInput = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L;`,
        dataArr
      );
      return db.query(formattedInput);
    })
    .then(() => {
      const dataArr = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const formattedInput = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L;`,
        dataArr
      );
      return db.query(formattedInput);
    })
    .then(() => {
      const newArticleData = [];
      for (let articleObj of articleData) {
        newArticleData.push(convertTimestampToDate(articleObj));
      }
      const dataArr = newArticleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const formattedInput = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING*;`,
        dataArr
      );
      return db.query(formattedInput);
    })
    .then(({ rows }) => {
      const lookup = createLookupObj(rows, "title", "article_id");
      const newCommentData = [];
      for (const commentObj of commentData) {
        newCommentData.push(convertTimestampToDate(commentObj));
      }
      const dataArr = newCommentData.map((comment) => {
        return [
          lookup[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });
      const formattedInput = format(
        `INSERT INTO comments (
        article_id, body, votes, author, created_at) VALUES %L RETURNING *;`,
        dataArr
      );
      return db.query(formattedInput);
    })
    .then(({rows}) => {
      const dataArr = emojiData.map((emoji, index) => {
        return [rows[index].comment_id, emoji.emoji]
      })
      const formattedInput = format(`INSERT INTO emojis (comment, emoji) VALUES %L;`, dataArr);
      return db.query(formattedInput);
    });
};
module.exports = seed;
