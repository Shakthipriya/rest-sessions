// Generated by CoffeeScript 1.6.3
(function() {
  var app, async, http, should, _;

  _ = require("underscore");

  should = require("should");

  async = require("async");

  app = require("../app");

  http = require("../test/support/http");

  describe('REST-Sessions Test', function() {
    var token1, token2, user1, user2;
    before(function(done) {
      http.createServer(app, done);
    });
    after(function(done) {
      done();
    });
    token1 = null;
    token2 = null;
    user1 = null;
    user2 = null;
    it('POST /TestApp/create/user1 should return 200 and a token', function(done) {
      http.request().put('/TestApp/create/user1?ip=127.0.0.1').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        token1 = body.token;
        token1.length.should.equal(64);
        done();
      });
    });
    it('GET /TestApp/get/{token} should return 200 and user1', function(done) {
      http.request().get('/TestApp/get/' + token1).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.id.should.equal('user1');
        user1 = body;
        done();
      });
    });
    it('PUT /TestApp/create/user2 should return 200 and a token', function(done) {
      http.request().put('/TestApp/create/user2?ip=127.0.0.1').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        token2 = body.token;
        token2.length.should.equal(64);
        done();
      });
    });
    it('GET /TestApp/get/{token} should return 200 and user2', function(done) {
      http.request().get('/TestApp/get/' + token2).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.id.should.equal('user2');
        user2 = body;
        done();
      });
    });
    it('POST /TestApp/set/{token} set some data', function(done) {
      http.request().post('/TestApp/set/' + token1).set('Content-Type', 'application/json').write(JSON.stringify({
        somebool: true,
        account: 120.55,
        name: "Peter Smith"
      })).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.id.should.equal('user1');
        body.d.somebool.should.equal(true);
        body.d.account.should.equal(120.55);
        body.d.name.should.equal("Peter Smith");
        return done();
      });
      return;
    });
    it('DELETE /TestApp/kill should return 200 ', function(done) {
      http.request()["delete"]('/TestApp/kill/' + token2).expect(200, done);
    });
    it('GET /TestApp/activity should return 200 and 1 session', function(done) {
      http.request().get('/TestApp/activity?dt=600').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.activity.should.equal(1);
        done();
      });
    });
    it('GET /TestApp/get/{token} should not return a session', function(done) {
      http.request().get('/TestApp/get/' + token2).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.should.not.have.keys('id');
        user2 = body;
        done();
      });
    });
    it('PUT /TestApp/create/user2 should return 200 and a token', function(done) {
      http.request().put('/TestApp/create/user2?ip=127.0.0.1').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        token2 = body.token;
        token2.length.should.equal(64);
        done();
      });
    });
    it('GET /TestApp/get/{token} should return a session', function(done) {
      http.request().get('/TestApp/get/' + token2).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.should.not.have.keys('id');
        user2 = body;
        done();
      });
    });
    it('PUT /TestApp/create/user2 create another session for user2', function(done) {
      http.request().put('/TestApp/create/user2?ip=127.0.0.2').end(function(resp) {
        resp.statusCode.should.equal(200);
        done();
      });
    });
    it('GET /TestApp/activity should return 200 and equal 2 even if we got 3 sessions', function(done) {
      http.request().get('/TestApp/activity?dt=600').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.activity.should.equal(2);
        done();
      });
    });
    it('GET /TestApp/soapp should return 200 and 3 sessions', function(done) {
      http.request().get('/TestApp/soapp?dt=600').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.sessions.length.should.equal(3);
        done();
      });
    });
    it('GET /TestApp/soid/user2 should return 200 and 2 sessions', function(done) {
      http.request().get('/TestApp/soid/' + user2.id).end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.sessions.length.should.equal(2);
        done();
      });
    });
    it('DELETE /TestApp/killsoid/user2 should return 200 ', function(done) {
      http.request()["delete"]('/TestApp/killsoid/' + user2.id).expect(200, done);
    });
    it('GET /TestApp/activity should return 200 and equal 1', function(done) {
      http.request().get('/TestApp/activity?dt=600').end(function(resp) {
        var body;
        resp.statusCode.should.equal(200);
        body = JSON.parse(resp.body);
        body.activity.should.equal(1);
        done();
      });
    });
    it('DELETE /TestApp/killall should return 200 ', function(done) {
      http.request()["delete"]('/TestApp/killall').expect(200, done);
    });
  });

}).call(this);
