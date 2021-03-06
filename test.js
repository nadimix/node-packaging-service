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

describe('Listing users', function() {

  it('Returns 200 status code', function(done) {
    request(app)
      .get('/users')
      .expect(200, done);
  });

  it('Returns an user list', function(done) {
    request(app)
      .get('/users')
      .expect('[]', done);
  });

  it('Return an user', function(done) {
    request(app)
      .get('/users/wololo')
      .expect('[]', done);
  });
});

describe('Adding new Users', function(){

    beforeEach(function(){
      client.flushdb();
    });

    it('Returns a 201 status code', function(done) {
      request(app)
        .post('/users')
        .send({'username':'wololo', 'email':'wololo@test.com', 'password':'woloword'})
        .expect(201, done);
    });

    it('Returns the username', function(done) {
      request(app)
        .post('/users')
        .send({'username':'wololo', 'email':'wololo@test.com', 'password':'woloword'})
        .expect(/wololo/i,done);
      });

    it('Validates username, password and email fields', function(done) {
      request(app)
        .post('/users')
        .send({'username':'', 'email':'', 'password':''})
        .expect(400, done);
    });
});

describe('Checks if an user exist before add a new one', function(done) {

    before(function() {
      var object = {
        'username': 'wololo',
        'email': 'wololo@test.com',
        'password': 'woloword'
      };
      client.hmset('wololo', object, function(error){
        if(error) throw error;
      });
    });

    it('Returns a 400 status code', function(done) {
      request(app)
        .post('/users')
        .send({'username':'wololo', 'email':'wololo@test.com', 'password':'woloword'})
        .expect(400, done);
    });
});

describe('List all the jobs for a certain user', function(done){

  before(function(){
    var object = {
      'username': 'wololo',
      'email': 'wololo@test.com',
      'password': 'woloword'
    };
    client.hmset('wololo', object, function(error){
      if(error) throw error;
    });
  });

  /*it('Returns a 200 ok', function(done){
    request(app)
      .get('/jobs')
      .expect(200, done);
  });*/

});
