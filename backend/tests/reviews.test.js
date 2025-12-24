const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongod;

const Product = require('../src/models/Product');
const Review = require('../src/models/Review');

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // require app after mongoose connected
  app = require('../src/app');
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

afterEach(async () => {
  await Review.deleteMany({});
  await Product.deleteMany({});
});

describe('Reviews API', () => {
  test('GET with invalid productId should return 400', async () => {
    const res = await request(app).get('/api/reviews/product/invalid-id');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('GET for existing product returns empty array', async () => {
    const product = await Product.create({
      name: 'Test Product',
      description: 'A product',
      price: 10,
      image: 'img.png',
      category: mongoose.Types.ObjectId(),
    });

    const res = await request(app).get(`/api/reviews/product/${product._id}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
