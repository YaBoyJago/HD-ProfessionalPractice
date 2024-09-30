const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary

describe('GET /', function () {
  it('should return the HTML file', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
