var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function() {

  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
   });

   it('Returns a HTML format', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done);
   });

});

describe('Requests to the /presets path', function(done) {

   it('Returns a 200 status code', function(done) {
      request(app)
        .get('/presets')
        .expect(200, done);
   });

   it('Returns a JSON format', function(done) {
      request(app)
        .get('/presets')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done);
   });

   it('Returns a set of formats', function(done) {
      request(app)
        .get('/presets')
        .expect(JSON.stringify(["480p","720p","1080p","2160p"]), done);
   });

});
