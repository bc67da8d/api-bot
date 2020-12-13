const crudController = require('crud/controller');

class Controller extends crudController{

	build(){
		this.mockPost('login', this.login.bind(this));
		return super.build();
	}

	login(req, res, next) {
		this.getServiceIns().login(req.body.username, req.body.password)
		.then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
		.catch(err => next(err));
	}

	readAll(req, res, next) {
		var filter = {};
		var page = req.query.page?req.query.page:1;
		var limit = req.query.limit?req.query.limit:99999;
		var start = (page > 0)?page - 1:0;
		var end = page>1?page:1;
		limit = limit > 0?limit:20;
		
		// if (parseInt(req.query.status)) filter["status"] = parseInt(req.query.status);
		// if (parseInt(req.query.tinh)) filter["tinh"] = parseInt(req.query.tinh);
		// if (parseInt(req.query.huyen)) filter["huyen"] = parseInt(req.query.huyen);
		// if (parseInt(req.query.xa)) filter["xa"] = parseInt(req.query.xa);

		this.getServiceIns().readByFilterNoLimit(filter)
        .then(models => res.json({
        	"results": models
        }))
        .catch(err => next(err));
	}

	reloadDb(req, res, next) {
		this.getServiceIns().reloadDb();
        return res.status(200).json({ message: "Reloaded!" });
	}
	
}

module.exports = Controller;