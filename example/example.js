var seolint = require('../lib/seolint.js');
var content = '<head><title>test</title><meta name="desc" content="test"></head><h1 class="title">Hello world</h1><h1>test</h1><img alt="test" src="test.png"><img src="test2.jpg"><a href="href1">hf1</a><a href="href2" rel="rel">hf2</a><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong><strong>a</strong>';

// load html content
seolint.load(content, function(error, data) {
	seolint.check(data).outConsole();
});

// load html content from file
seolint.loadFile('sample.html', function(error, data) {
	seolint.check(data, {'checkH1Limit': true, 'checkHead': true, 'checkStrongLimit': true}).outFile('file_result');
});

// load html content from readable stream
var fs = require('fs');
var rs = fs.createReadStream('sample.html');
var ws = fs.createWriteStream('stream_result');

rs.setEncoding('utf8');
seolint.loadStream(rs, function(error, data) {
	seolint.check(data, {'checkH1Limit': true, 'checkHead': true, 'checkStrongLimit': true, 'strongLimit': 1}).outStream(ws);
});
