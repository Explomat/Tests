var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuestionConstants = require('../constants/QuestionConstants');
var ServerConstants = require('../constants/ServerConstants');
var AnswersStore = require('./AnswersStore');
var QuestionTypes = require('../utils/QuestionTypes');
var extend = require('extend-object');

var _question = {};

function loadQuestionData(data) {
	_question = data;
	AnswersStore.setAnswers(data.answers);
	AnswersStore.setQuestionType(data.type);
}

function saveQuestionData(){
	_question = null;
}

function setTitle(title) {
	_question.title = title;
}

function setText(txt) {
	_question.text = txt;
}

function selectType(type){
	if (type == QuestionTypes.keys.multiple_choice){
		AnswersStore.resetSelected();
	}
	AnswersStore.setQuestionType(type);
	_question.type = type;
}

function uploadedImg(img) {
	_question.img = img;
}

function errorImg(err) {
	_question.img = _question.img || {};
	_question.img.error = err;
	_question.img.name = null;
	_question.img.id = null;
}

function removeImg(){
	_question.img = null;
}

var QuestionStore = extend({}, EventEmitter.prototype, {

	getQuestion: function(){
		return _question;
	},

	getTitle: function(){
		return _question.title;
	},

	getImg: function() {
		return _question.img;
	},

	getText: function() {
		return _question.text;
	},

	getTypeSelected: function() {
		return _question.type;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

QuestionStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var isEmit = false;

	switch(action.actionType) {

		case QuestionConstants.RECEIVE_QUESTION_DATA:
			loadQuestionData(action.data);
			isEmit = true;
			break;
		case QuestionConstants.SAVE_QUESTION_DATA:
			saveQuestionData();
			break;
		case QuestionConstants.SET_TYPE_SELECTED:
			selectType(action.type);
			isEmit = true;
			break;
		case QuestionConstants.SET_TITLE:
			setTitle(action.title);
			isEmit = true;
			break;
		case QuestionConstants.SET_TEXT:
			setText(action.text);
			isEmit = true;
			break;
		case ServerConstants.UPLOADED_QUESTION_IMAGE:
			uploadedImg(action.img);
			isEmit = true;
			break;
		case ServerConstants.UPLOADED_QUESTION_ERROR_IMAGE:
			errorImg(action.err);
			isEmit = true;
			break;
		case ServerConstants.REMOVE_QUESTION_IMAGE:
			removeImg();
			isEmit = true;
			break;
		case ServerConstants.REMOVE_QUESTION_ERROR_IMAGE:
			errorImg(action.err);
			isEmit = true;
			break;
		default:
			return true;
	}

	if (isEmit) QuestionStore.emitChange();
	return true;
});

module.exports = QuestionStore;
