const request = require("supertest");
const app = require("../server");
const db = require("../models");

let token;
let postId;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Register user
  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  });

  // Login user
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123"
  });

  token = res.body.token;
});

describe("Post API", () => {
  test("should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Hello, this is a test post!" });

    expect(res.statusCode).toBe(201);
    expect(res.body.content).toBe("Hello, this is a test post!");
    postId = res.body.id;
  });

  test("should fetch all posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should get a single post by ID", async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(postId);
  });

  test("should update a post", async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Updated content" });

    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe("Updated content");
  });

  test("should delete a post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post deleted");
  });
});