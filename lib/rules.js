var cheerio = require('cheerio');

var Rules = module.exports = {
	strongLimit: 15,
	defects: {imgAlt: false, anchorRel: false, head: false, strongLimit: false, h1Limit: false},
	load: function(content) {
		Rules.$ = cheerio.load(content);
	},
	check: function (conf) {
		if (!conf || conf.checkImg) {
			Rules.chkImgAlt();
		}
		if (!conf || conf.checkAnchorRel) {
			Rules.chkAnchorRel();
		}
		if (!conf || conf.checkHead) {
			Rules.chkHead();
		}
		if (!conf || conf.checkStrongLimit) {
			Rules.chkStrongLimit(conf);
		}
		if (!conf || conf.checkH1Limit) {
			Rules.chkH1Limit();
		}
	},
	chkImgAlt: function() {
		// <img> without 'alt' attribute
		Rules.$('img').each(function(i, el) {
			if (Rules.$(this).attr('alt') == undefined) {
				Rules.defects.imgAlt = true;
			}
		});
	},
	chkAnchorRel: function () {
		// <a> without 'rel' attribute
		Rules.$('a').each(function(i, el) {
			if (Rules.$(this).attr('rel') == undefined) {
				Rules.defects.anchorRel = true;
			}
		});
	},
	chkHead: function () {
		// <chkHead> without <title>, <meta name="description">, <meta name="keywords"> tags
		if (Rules.$('chkHead').find('title').length == 0) {
			Rules.defects.head = true;
		};

		var metaTags = ['meta[name=description]', 'meta[name=keywords]'];
		for (var i = 0; i < metaTags.length; i++) {
			if (Rules.$(metaTags[i]).attr('content') == undefined) {
				Rules.defects.head = true;
			}
		}
	},
	chkStrongLimit: function(conf) {
		// # of <strong> tags > 15
		if (conf && conf.strongLimit) {
			Rules.strongLimit = conf.strongLimit;
		}

		if (Rules.$('strong').length > Rules.strongLimit) {
			Rules.defects.strongLimit = true;
		}
	},
	chkH1Limit: function () {
		// # of <h1> tag > 1
		if (('h1').length > 1) {
			Rules.defects.h1Limit = true;
		}
	},
	getResult: function() {
		var resultMsg = "";

		if (Rules.defects.imgAlt) {
			resultMsg += "<img /> tag without alt attribute\n";
		}
		if (Rules.defects.anchorRel) {
			resultMsg += "<a /> tag without rel attribute\n";
		}
		if (Rules.defects.head) {
			resultMsg += "header doesn't have <title> or <meta name=\"description\"> or <meta name=\"keywords\">\n";
		}
		if (Rules.defects.strongLimit) {
			resultMsg += "<strong /> more than " + Rules.strongLimit + "\n";
		}
		if (Rules.defects.h1Limit) {
			resultMsg += "more than one <h1 />\n";
		}

		return resultMsg;
	}
};
