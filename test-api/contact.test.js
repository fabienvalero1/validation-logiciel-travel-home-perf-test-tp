import request from 'supertest';
import jwt from 'jsonwebtoken';

const baseUrl = 'http://127.0.0.1:3000';

describe(`${baseUrl}/contact`, () => {
  let validToken;
  let createdContact;

  beforeAll(() => {
    validToken = jwt.sign(
      { login: { id: '67863c2ef9b51470d6ff54ba', name: 'testuser' } },
      'SANDRA_SECRET'
    );
  });

  describe('POST /contact/', () => {
    it('Should create a new contact', async () => {
      const mockContact = {
        firstName: 'John',
        lastName: 'Doe',
        mobilePhone: '1234567890',
        email: 'johndoe@example.com',
        arrivedAt: new Date().toJSON(),
        departureAt: new Date(new Date().getTime() + 3600000).toJSON(), // 1 hour later
        message: 'Looking forward to meeting you!',
      };

      const res = await request(baseUrl)
        .post('/contact/')
        .send(mockContact);

      expect(res.statusCode).toBe(200);

      // get everything except the id

      mockContact.id = res.body.id;
      mockContact.createdAt = res.body.createdAt;

      createdContact = res.body;

      expect(createdContact).toEqual(mockContact);
    });
  });

  describe('GET /contacts/', () => {
    it('Should return all contacts', async () => {
      const res = await request(baseUrl)
        .get('/contacts/')
        .set('Authorization', `${validToken}`);

      expect(res.statusCode).toBe(200);

      const contact = res.body.find(contact => contact.id === createdContact.id);

      expect(contact).toEqual(createdContact);
    });
  });

  describe('DELETE /contact/:id', () => {
    it('Should delete a contact by ID', async () => {
      const res = await request(baseUrl).delete(`/contact/${createdContact.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(createdContact);
    });

    it('Should return 403 for invalid ID', async () => {
      const res = await request(baseUrl).delete('/contact/invalid_id');

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe('Bad request');
    });
  });
});
