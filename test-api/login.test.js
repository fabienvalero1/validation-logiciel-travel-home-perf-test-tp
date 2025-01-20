import request from 'supertest';
import jwt from 'jsonwebtoken';

const baseUrl = 'http://127.0.0.1:3000';

describe(`${baseUrl}/login`, () => {
  describe('GET /login/?name=??&&password=??', () => {
    it('Should get a token authentification', async () => {
      const name = 'testuser';
      const password = 'testuser';
      const res = await request(baseUrl)
        .get('/login/')
        .query({ name, password });

      const { token } = res.body;
      jwt.verify(token, 'SANDRA_SECRET', (err, user) => {
        expect(user.login.id).toBe('67863c2ef9b51470d6ff54ba');
      });

      expect(res.statusCode).toBe(200);
    });

    it('Should get a token authentification (for admin)', async () => {
      const name = 'testadminuser';
      const password = 'testadminuser';
      const res = await request(baseUrl)
        .get('/login/')
        .query({ name, password });

      const { token } = res.body;
      jwt.verify(token, 'SANDRA_SECRET', (err, user) => {
        expect(user.login.id).toBe('6786390bf9b51470d6ff54b9');
      });

      expect(res.statusCode).toBe(200);
    });

    it('Should return 403 for invalid credentials with good login', async () => {
      const name = 'testuser';
      const password = 'wrongpassword';

      const res = await request(baseUrl)
        .get('/login/')
        .query({ name, password });

      expect(res.statusCode).toBe(403);
      expect(res.body.token).toBeUndefined();
    });

    it('Should return 403 for invalid credentials with good login (for admin)', async () => {
      const name = 'testadminuser';
      const password = 'wrongpassword';

      const res = await request(baseUrl)
        .get('/login/')
        .query({ name, password });

      expect(res.statusCode).toBe(403);
      expect(res.body.token).toBeUndefined();
    });

    it('Should return 403 for invalid credentials', async () => {
      const name = 'wronguser';
      const password = 'wrongpassword';

      const res = await request(baseUrl)
        .get('/login/')
        .query({ name, password });

      expect(res.statusCode).toBe(403);
      expect(res.body.token).toBeUndefined();
    });
  });

  describe('GET /auth/', () => {
    it('Should return 200 for valid token', async () => {
      const login = { id: '67863c2ef9b51470d6ff54ba', email: 'testuser' };
      const body = { id: login.id, email: login.email };
      const token = jwt.sign({ login: body }, 'SANDRA_SECRET');

      const res = await request(baseUrl)
        .get('/auth/')
        .set('Authorization', `${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('ok');
    });

    it('Should return 200 for valid token (for admin)', async () => {
      const login = { id: '6786390bf9b51470d6ff54b9', email: 'testadminuser' };
      const body = { id: login.id, email: login.email };
      const token = jwt.sign({ login: body }, 'SANDRA_SECRET');

      const res = await request(baseUrl)
        .get('/auth/')
        .set('Authorization', `${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('ok');
    });

    it('Should return 403 for missing or invalid token', async () => {
      const res = await request(baseUrl)
        .get('/auth/')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toBe(403);
    });
  });
});
