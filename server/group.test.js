import request from 'supertest';
import app from './group.js';  // Path to your Express app

let token;

beforeAll(async () => {
  // Simulate logging in and getting a valid JWT token
  const res = await request(app)
    .post('/login')  // Assuming you have a /login route
    .send({ username: 'testuser', password: 'password' });

  token = res.body.token;  // Save the token for use in subsequent tests
});

describe('Group API Endpoints', () => {
  it('should create a new group', async () => {
    const res = await request(app)
      .post('/groups')
      .send({ name: 'Test Group' })
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Group');
  });
});
