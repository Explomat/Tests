var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');
var ServerConstants = require('../constants/ServerConstants');
var QuestionAPI = require('../api/QuestionAPI');

var QuestionActions = {

	receiveQuestion: function(data) {
		AppDispatcher.handleData({
			actionType: QuestionConstants.RECEIVE_QUESTION_DATA,
			data: data
		});
	},

	saveQuestion: function(question, sectionUuid){
		if (QuestionAPI.saveQuestionData(question, sectionUuid)) {
			AppDispatcher.handleData({
				actionType: QuestionConstants.SAVE_QUESTION_DATA,
				question: question,
				sectionUuid: sectionUuid
			});
		}
	},

	changeTitle: function(title){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TITLE,
			title: title
		});
	},

	changeText: function(text) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TEXT,
			text: text
		});
	},

	selectType: function(type) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TYPE_SELECTED,
			type: type
		});
	},

	//eventTarget - DOM input for FileAPI
	uploadImage: function(eventTarget){
		QuestionAPI.uploadImage(eventTarget).then(function(img){
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_QUESTION_IMAGE,
				img: img
			});
		}, function(err) {
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_QUESTION_ERROR_IMAGE,
				err: err
			});
		});
	},

	removeImage: function(img){
		QuestionAPI.removeImage(img).then(function(){
			AppDispatcher.handleData({
				actionType: ServerConstants.REMOVE_QUESTION_IMAGE
			});
		}, function(err) {
			AppDispatcher.handleData({
				actionType: ServerConstants.REMOVE_QUESTION_ERROR_IMAGE,
				err: err
			});
		});
	}
}

module.exports = QuestionActions;