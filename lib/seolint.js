var rules = require('./rules.js');

var cheerio = require('cheerio');
var request = require('request').defaults({rejectUnauthorized: false});
var fs = require('fs');

var Seolint = module.exports = {
	check: function(content, conf) {
		Seolint.error = null;
		Seolint.defects = null;
		if (content == undefined) {
			Seolint.error = new Error('empty data');
			return Seolint;
		}

		rules.load(content);
		rules.check(conf);
		Seolint.defects = rules.getResult();

		return Seolint;
	},
	load: function(content, callback) {
		Seolint.data = content;

		return callback(Seolint.error, Seolint.data);
	},
	loadFile: function(filepath, callback) {
		fs.readFile(filepath, function(err, data) {
			if (err) {
				Seolint.error = err;
			}
			Seolint.data = data;
			return callback(Seolint.error, Seolint.data);
		});
	},
	loadPage: function(url, callback) {
		if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
			url = 'http://' + url;
		}

		request.get(url.toLowerCase(), function(error, response, body) {
			if (error) {
				Seolint.errro = error;
			}
			if (response.statusCode !== 200) {
				error = new Error('http status error: response.statusCode');
			}
			return callback(Seolint.error, Seolint.data);
		});
	},
	loadStream: function(rs, callback) {
		rs.on('data', function(chunk){
			data = chunk;
		});

		rs.on('error', function(error) {
			Seolint.error = error;
			return callback(Seolint.error, Seolint.data);
		});

		rs.on('end', function(){
			Seolint.data = data;
			return callback(Seolint.error, Seolint.data);
		});
	},
	outConsole: function() {
		if (Seolint.error) {
			console.log(Seolint.error);
		} else {
			console.log(Seolint.defects);
		}
	},
	outFile: function(filepath) {
		var output = '';

		if (Seolint.error) {
			output = Seolint.error.toString();
		} else {
			output = Seolint.defects;
		}

		fs.writeFile(filepath, output, function (err) {
			if(err){
				throw err;
			}
		});
	},
	outStream: function(ws) {
		var output = '';

		if (Seolint.error) {
			output = Seolint.error.toString(); 
		} else {
			output = Seolint.defects;
		}

		ws.write(output, 'UTF8');
		ws.end();
	},
	callback: function(callback) {
		return callback(Seolint.error, Seolint.defects);
	}
};
