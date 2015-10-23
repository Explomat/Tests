var React = require('react');
var Config = require('../config');
//var MappingStore = require('../stores/MappingStore');
//var MappingActions = require('../actions/SectionActions');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash.substring(1, hash.length) : hash.substring(1, isChainHash);
}

var BasicView = React.createClass({

	componentDidMount: function() {
		//MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		//this.setState(getMappingState());
	},

	render: function () {

		var curHash = getHashRoot(window.location.hash);
		var isActiveStructureClass = curHash === Config.hashes.structure.key ? 'menu-box__item_active' : '';
		var isActiveViewClass = curHash === Config.hashes.view.key ? 'menu-box__item_active' : '';
		var isActiveSettingsClass = curHash === Config.hashes.settings.key || (curHash !== Config.hashes.settings.key && curHash !== Config.hashes.view.key && curHash !== Config.hashes.structure.key) ? 'menu-box__item_active' : '';

		return (
			<div className="tests">
				<div className="tests__header">
					<div className="menu-box">
						<div className={"menu-box__item " + isActiveSettingsClass}>
							<a className="menu-box__button" href="#settings">Общие сведения</a>
						</div>
						<div className={"menu-box__item " + isActiveStructureClass}>
							<a className="menu-box__button" href="#structure">Структура теста</a>
						</div>
						<div className={"menu-box__item " + isActiveViewClass}>
							<a className="menu-box__button" href="#view">Отображение теста</a>
						</div>
						<div className="menu-box__item_border"></div>
					</div>
				</div>
			    <div id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;