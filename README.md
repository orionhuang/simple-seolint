# simple-seolint
A simple SEO lint npm module.

## Installation
```
npm install simple-seolint
```

## Getting Started
### Console Input/Console Output
```
// load html content
var seolint = require('./seolint.js');
var content = '<html>simple html</html>';

seolint.load(content, function(error, data) {
  seolint.check(data).outConsole();
});
```

### File Input/File Output
```
// load html content from file
seolint.loadFile('sample.html', function(error, data) {
	seolint.check(data, {'checkH1Limit': true, 'checkHead': true, 'checkStrongLimit': true}).outFile('file_result');
});
```

### Stream Input/Stream Output
```
// load html content from readable stream
var fs = require('fs');
var rs = fs.createReadStream('test.html');
var ws = fs.createWriteStream('stream_result');

rs.setEncoding('utf8');
seolint.loadStream(rs, function(error, data) {
	seolint.check(data, {'checkH1Limit': true, 'checkHead': true, 'checkStrongLimit': true, 'strongLimit': 1}).outStream(ws);
});
```

### Rules Configuration
Pre-defined rules that detect defects as below:
1. \<img /> tag without alt attribute
2. \<a /> tag without rel attribute
3. In \<head> tag
   - it doesn’t have \<title> tag
   - it doesn’t have <meta name=“descriptions” /> tag
   - it doesn’t have <meta name=“keywords” /> tag
4. more than N \<strong> tag (N default value = 15)
5. more than one \<h1> tag

```
// if no config parameter passed, check() will apply default rule config as below
// {'checkImg': true, 'checkAnchorRel': true, 'checkHead': true, 'checkStrongLimit': true, 'strongLimit': 15, 'checkH1Limit': true,}
seolint.load(content, function(error, data) {
  seolint.check(data).outConsole();
});

```
### Output Example
```
> node example
<img /> tag without alt attribute
<a /> tag without rel attribute
header doesn't have <title> or <meta name="description"> or <meta name="keywords">
<strong /> more than 15
more than one <h1 />

```
