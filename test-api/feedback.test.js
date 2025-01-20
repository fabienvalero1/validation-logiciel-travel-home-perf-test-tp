import request from 'supertest';
import jwt from 'jsonwebtoken';

const baseUrl = 'http://127.0.0.1:3000';

describe(`${baseUrl}/feedback`, () => {
  let validToken;
  let createdFeedback;

  beforeAll(() => {
    validToken = jwt.sign(
      { login: { id: '6786390bf9b51470d6ff54b9', name: 'testadminuser' } },
      'SANDRA_SECRET'
    );
  });

  describe('POST /feedback/', () => {
    it('Should create a new feedback', async () => {
      const mockFeedback = {
        name: 'John Doe',
        message: 'Great service!',
      };

      const res = await request(baseUrl)
        .post('/feedback/')
        .send(mockFeedback);

      expect(res.statusCode).toBe(200);

      // get everything except the id

      mockFeedback.id = res.body.id;
      mockFeedback.createdAt = res.body.createdAt;

      createdFeedback = res.body;

      expect(createdFeedback).toEqual(mockFeedback);
    });
  });

  describe('GET /feedback/', () => {
    it('Should return all feedbacks', async () => {
      const res = await request(baseUrl)
        .get('/feedback/')
        .set('Authorization', `${validToken}`);

      expect(res.statusCode).toBe(200);

      const feedback = res.body.find(feedback => feedback.id === createdFeedback.id);

      expect(feedback).toEqual(createdFeedback);
    });
  });

  describe('DELETE /feedback/', () => {
    it('Should delete a feedback by ID', async () => {
      const res = await request(baseUrl)
        .delete('/feedback/')
        .set('Authorization', `${validToken}`)
        .query({ id: createdFeedback.id });

      expect(res.statusCode).toBe(200);
    });
  });
});
