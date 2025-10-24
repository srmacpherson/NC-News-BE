const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("ALL /*", () => {
  test("404: Responds with a 404 error when the path is not found", () => {
    return request(app)
      .get("/non-existent-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path Not Found");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object with the key of topics and the value of an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        for (const topic of body.topics) {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        }
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object with the key of articles and the value of an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
        for (const article of body.articles) {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        }
      });
  });
  test("200: Responds with the data making use of the 'sort_by' and/or 'order' queries", () => {
    return request(app)
      .get('/api/articles?sort_by=article_id&order=desc')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(body.articles).toBeSortedBy("article_id", { descending: true });
        for (const article of body.articles) {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        }
      });
  })
  test("400: Responds with an error message when passed a bad 'sort_by' query", () => {
    return request(app)
    .get('/api/articles?sort_by=not_a_column&order=desc')
    .expect(400)
    .then(({body}) => {
        expect(body.msg).toBe("Invalid input")
    });
  });
  test("400: Responds with an error message when passed a bad 'order' query", () => {
    return request(app)
    .get('/api/articles?sort_by=article_id&order=non_directional')
    .expect(400)
    .then(({body}) => {
        expect(body.msg).toBe("Invalid input")
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object with the key of article and the value of an article object", () => {
    return request(app)
      .get("/api/articles/7")
      .expect(200)
      .then(({ body }) => {
        const {
          author,
          title,
          article_id,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof body.article).toBe("object");
        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(article_id).toBe(7);
        expect(typeof body.article.body).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(typeof votes).toBe("number");
        expect(typeof article_img_url).toBe("string");
      });
  });
  test("400: Responds with an error message when passed a bad article ID", () => {
    return request(app)
      .get("/api/articles/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Responds with an error message when passed a valid article ID but no results are found", () => {
    return request(app)
      .get("/api/articles/8278")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an object with the key of comments and the value of an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
        for (const comment of body.comments) {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(9);
        }
      });
  });
  test("400: Responds with an error message when passed a bad article ID", () => {
    return request(app)
      .get("/api/articles/not-an-id/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Responds with an error message when passed a valid article ID but no results are found", () => {
    return request(app)
      .get("/api/articles/7345/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an object with the key of users and the value of an array of objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        for (const user of body.users) {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        }
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with the posted comment", () => {
    const payload = {
      username: "butter_bridge",
      body: "duck, duck, duck, duck, duck, duck... goose!",
    };

    return request(app)
      .post("/api/articles/3/comments")
      .send(payload)
      .expect(201)
      .then(({ body }) => {
        const { comment_id, article_id, votes, author, created_at } =
          body.comment;
        expect(typeof body).toBe("object");
        expect(typeof comment_id).toBe("number");
        expect(typeof article_id).toBe("number");
        expect(votes).toBe(0);
        expect(author).toBe("butter_bridge");
        expect(body.comment.body).toBe(
          "duck, duck, duck, duck, duck, duck... goose!"
        );
        expect(typeof created_at).toBe("string");
      });
  });
  test("400: Responds with an error message when passed a bad article ID", () => {
    const payload = {
      username: "butter_bridge",
      body: "duck, duck, duck, duck, duck, duck... goose!",
    };
    return request(app)
      .post("/api/articles/not-an-id/comments")
      .send(payload)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Responds with an error message when passed a valid article ID but no results are found", () => {
    const payload = {
      username: "butter_bridge",
      body: "duck, duck, duck, duck, duck, duck... goose!",
    };
    return request(app)
      .post("/api/articles/8278/comments")
      .send(payload)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("PUT /api/articles/:article_id", () => {
  test("200: Responds with the updated article", () => {
    const payload = { inc_votes: -10 };
    return request(app)
      .put("/api/articles/4")
      .send(payload)
      .expect(200)
      .then(({ body }) => {
        const {
          article_id,
          title,
          topic,
          author,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof body.article).toBe("object");
        expect(article_id).toBe(4);
        expect(typeof title).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof author).toBe("string");
        expect(typeof body.article.body).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(typeof votes).toBe("number");
        expect(typeof article_img_url).toBe("string");
      });
  });
  test("400: Responds with an error message when passed a bad article ID", () => {
    const payload = { inc_votes: 10 };
    return request(app)
      .put("/api/articles/bad-id")
      .send(payload)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Responds with an error message when passed a valid article ID but no results are found", () => {
    const payload = { inc_votes: 10 };
    return request(app)
      .put("/api/articles/6543")
      .send(payload)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Responds with status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(Object.keys(body).length).toBe(0);
      });
  });
  test("400: Responds with an error message when passed a bad comment ID", () => {
    return request(app)
      .delete("/api/comments/bad-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Responds with an error message when passed a valid comment ID but no results are found", () => {
    return request(app)
      .delete("/api/comments/6543")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
