var jwt = require('jsonwebtoken');
function authentication(req, res, next) {

	console.log("2", 'aa', req.originalUrl,req.headers['authorization']);
	if (req.originalUrl == "/user/logout") {
		console.log("from LOGOUT")
		var token = null
		res.json({ success: true, msg: ' Loged Out ' });
	}
	else {
			if (!req.headers['authorization']) {
				console.log("NO AUTHORIZATION")
				res.status(400).send();
			}
			var token = req.headers['authorization'];

			console.log("9", token);
			return jwt.verify(token, 'AUTHHEADER', function (err, result) {
				if (err) {
					console.log("TOKEN NOT VALID")
					res.json({msg: 'Invalid User'});
					return res.status(400).send();
				}
				return next();
			});
	}

}

module.exports = authentication;