var request = require('supertest');
var app = require('./app');

var client = require('redis').createClient();
client.select('test'.length);
client.flushdb();

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

   it('Returns initial formats', function(done) {
      request(app)
        .get('/presets')
        .expect('[]', done);
   });

});

describe('Creating new presets', function() {

  it('Returns a 201 status code', function(done) {
      request(app)
        .post('/presets')
        .send({'name':'4320p', 'description': 'A stunning 8K quality'})
        .expect(201, done);
   });

   it('Returns the preset name', function(done){
      request(app)
        .post('/presets')
        .send({'name':'4320p', 'description': 'A stunning 8K quality'})
        .expect(/4320p/i, done);
   });

   it('Validates preset name and description', function(done) {
      request(app)
        .post('/presets')
        .send({'name':'', 'description':''})
        .expect(400, done);
   });

});
