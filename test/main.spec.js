const express = require('express');
const path = require('path');
var Nightmare = require('nightmare');
var expect = require('chai').expect;

const app = express();
app.use(express.static(path.join(__dirname, '/../')));
app.listen(8888);

const url = 'http://localhost:8888';

var nightmare;

describe('San Diego Top Spots', function() {
  this.timeout(10000);
  this.slow(3000);

  beforeEach((done) => {
    nightmare = Nightmare();
    done();
  });

  it('should have the correct page title', function() {
    return nightmare
      .goto(url)
      .wait('table')
      .evaluate(function () {
        return document.querySelector('title').text
      })
      .end()
      .then(function(title) {
        expect(title).to.equal('San Diego Top Spots');
      })
  });

  it('should have a heading', function() {
    return nightmare
      .goto(url)
      .wait('table')
      .evaluate(function () {
        return document.querySelector('h1').innerHTML
      })
      .end()
      .then(function(text) {
        expect(text).to.equal("San Diego Top Spots");
      })
  });

  it('should find a row with data', function() {
    return nightmare
      .goto(url)
      .wait('table')
      .evaluate(function () {
        return document.querySelector('tr td').innerHTML
      })
      .end()
      .then(function(text) {
        expect(text).to.equal("Go For A Run In The San Diego Zoo Safari Park");
      })
  });

  it('should find a link with the correct map url', function() {
    nightmare
      .goto(url)
      .wait('table')
      .evaluate(function () {
        return document.querySelector('tr a').href
      })
      .end()
      .then(function(link) {
        expect(link).to.equal('https://www.google.com/maps?q=33.09745,-116.99572');
      })
  });

});
