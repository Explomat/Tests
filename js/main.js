var Router = require('./utils/Crossroads');
var Hasher = require('./utils/Hasher');
var UI = require('./utils/UI');
var StructureController = require('./controllers/StructureController');
var ViewMappingController = require('./controllers/ViewMappingController');
var QuestionController = require('./controllers/modal/QuestionController');
var SettingsController = require('./controllers/SettingsController');
var SectionController = require('./controllers/modal/SectionController');

window.onload = function(){

	Router.addRoute('settings', function(){
	    SettingsController.start();
	});
	Router.addRoute('structure', function(id){
	    StructureController.start();
	});
	Router.addRoute('structure/section/:sectionId:', function(sectionId){
		StructureController.start();
	    SectionController.start(sectionId);
	});
	Router.addRoute('structure/question/{sectionId}/:questionId:', function(sectionId, questionId){
		StructureController.start();
	    QuestionController.start(sectionId, questionId);
	});
	Router.addRoute('view', function(){
	    ViewMappingController.start();
	});

	function changeTabClass(){

		function getHashRoot(hash){
			var isChainHash = hash.indexOf('/');
			return isChainHash == -1 ? hash : hash.substring(0, isChainHash);
		}

		var curElem = UI.getElementByHash('app-container', getHashRoot(window.location.hash));
		if (curElem){
		    UI.toggleList(curElem, 'active');
		}
	}

	function initHash(curHash){
		curHash = curHash === '' ? 'settings' : curHash;
		Hasher.setHash(curHash);
		changeTabClass();
		Router.parse(curHash);
	}

	//setup hasher
	function parseHash(newHash){
		changeTabClass();
		Router.parse(newHash);
	}

	Hasher.changed.add(parseHash); //parse hash changes
	Hasher.initialized.add(initHash); //parse initial hash
	
	Hasher.prependHash = '';
	Hasher.init(); //start listening for history change
	
	//update URL fragment generating new history record
	//Hasher.setHash('structure');

	/*Router.config({ defaultRoute: '#settings', interval: 100, callBack: function(){
		  var curElem = UI.getElementByHash('app-container', window.location.hash);
		  if (curElem)
		    UI.toggleList(curElem, 'active');
		}
	});

	Router.addRoute(/^#settings$/, function() {
		SettingsController.start();
	})
	.addRoute(/#structure/, function() {
		StructureController.start();
	})
	.addRoute(/#structure\/(.*)\/(.*)?/, function(sectionUuid, questionUuid){
		QuestionController.start(sectionUuid, questionUuid);
	})
	.startRouting();*/
}


