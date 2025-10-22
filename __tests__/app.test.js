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

describe("GET /api/topics", () => {
    test("", () => {
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