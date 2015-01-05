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

describe('Listing presets', function() {
    
   it('Returns a 200 status code', function(done) {
      request(app)
        .get('/presets')
        .expect(200, done);
   });

   it('Returns a JSON format', function(done) {
      request(app)
        .get('/presets')
        .expect('Content-Type', /json/, done);
   });

   it('Returns a set of formats', function(done) {
      request(app)
        .get('/presets')
        .expect(JSON.stringify('[["480p"],["720p"],["1080p"],["2160p"]]'), done);
   });

});

describe('Creating new presets', function() {

  it('Returns a 201 status code', function(done) {
      request(app)
        .post('/presets')
        .send(JSON.stringify({'4320p': 'A stunning 8K quality'}))
        .expect(201, done);
   });

});
