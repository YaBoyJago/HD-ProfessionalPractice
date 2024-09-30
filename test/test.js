const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  // Assuming your app is in app.js
const server = app.listen(3000);
chai.should();
chai.use(chaiHttp);

describe('App', () => {
  after(() => {
    // Ensure the server is closed after the tests
    server.close();
  });

  it('should return the HTML file', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
