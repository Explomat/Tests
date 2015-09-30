var Config = require('../config');
var Ajax = require('../utils/Ajax');
var QuestionData = require('../data/QuestionData');

module.exports = {

	createQuestion: function(){
		return QuestionData.create();
	},

	getQuestion: function(questionUuid){
		return QuestionData.get(questionUuid);
	},

	saveQuestionData: function(question, sectionUuid) {
		try {
			QuestionData.save(question, sectionUuid);
		}
		catch(e) { return false; }
		return true;
	},

	//eventTarget - DOM input tag for FileAPI
	uploadImage: function(eventTarget){
		return Ajax.uploadFiles(eventTarget, Config.url.createPath({action_name: 'uploadFile'}));
	},

	removeImage: function(img){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'removeImage', id: img.id, name: img.name}));
	}
}