var express = require('express');
var swig = require('swig');

var app = express();

app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function (req, res) {
	res.render('home', {})
})

module.exports = app.listen(3000, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('run success')
});