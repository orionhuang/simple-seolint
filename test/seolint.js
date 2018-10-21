const should = require('should')
const rules = require('../lib/rules')
const seolint = require('../lib/seolint.js');
const content = '<head><title>test</title><meta name="desc" content="test"></head><h1 class="title">Hello world</h1><h1>test</h1><img alt="test" src="test.png"><img src="test2.jpg"><a href="href1">hf1</a><a href="href2" rel="rel">hf2</a><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong>';

describe('#rules load', () => {
	it('should not return empty', done => {

		// load html content
		seolint.load(content, function(error, data) {
			data.should.not.empty();
			done()
		});
	});
});

describe('#rules check', () => {
	it('should reponse defects', done => {

		// load html content
		seolint.load(content, function(error, data) {
			var result = seolint.check(data).outResult();
			result.defects.should.equal('<img /> tag without alt attribute\n<a /> tag without rel attribute\nheader doesn\'t have <title> or <meta name="description"> or <meta name="keywords">\n<strong /> more than 15\nmore than one <h1 />\n');
			done()
		});
	});
});