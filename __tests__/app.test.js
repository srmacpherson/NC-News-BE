const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
    return seed(data);
});

// afterAll(() => {
//     return db.end();
// });

describe("GET /api/topics", () => {
    test("200: Responds with an object with the key of topics and the value of an array of topic objects", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body.topics)).toBe(true);
            for (const topic of body.topics) {
                expect(typeof topic.slug).toBe("string");
                expect(typeof topic.description).toBe("string");
            }
        })
    });
});

describe("GET /api/articles", () => {
    test("200: Responds with an object with the key of articles and the value of an array of article objects", () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body.articles)).toBe(true);
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
});

describe("GET /api/users", () => {
    test("200: Responds with an object with the key of users and the value of an array of objects", () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body.users)).toBe(true);
            for (const user of body.users) {
                expect(typeof user.username).toBe("string");
                expect(typeof user.name).toBe("string");
                expect(typeof user.avatar_url).toBe("string");
            }
        });
    });
});