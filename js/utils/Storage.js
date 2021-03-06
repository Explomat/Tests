var _storage = window.sessionStorage || window.localStorage;
var _root = 'tests';

var Storage = {
	
	clear: function() {
		_storage.clear();
	},

	getItems: function(isParse){
		if (isParse == undefined || isParse == null) 
			isParse = true;
		var root = _storage.getItem(_root);
		if (root && isParse)
			root = JSON.parse(root);
		return root;
	},

	getItem: function(key) {
		if(!_storage)
			throw new Error('Local storage not supported in your browser!');

		var root = _storage.getItem(_root);
		root = root ? JSON.parse(root) : Object.create(null) || {};

		return root[key];
	},

	setItem: function(key, value) {
		if(!_storage)
			throw new Error('Local storage not supported in your browser!');

		var root = _storage.getItem(_root);
		root = root ? JSON.parse(root) : Object.create(null) || {};

		root[key] = value;
		_storage.setItem(_root, JSON.stringify(root));
	}
}

module.exports = Storage;
	
