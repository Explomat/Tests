var React = require('react');

var Item = React.createClass({

	handleChange: function(e) {
		if (this.props.onChange)
			this.props.onChange(e, this.props.payload, this.props.text, this.props.index);
	},

	render: function() {
		var classNameItem = this.props.selected ? "dropdown-list__item_selected": "";
		return (
			<li className={"dropdown-list__item " + classNameItem} onClick={this.handleChange}>
				<span>{this.props.text}</span>
			</li>
		);
	}
});

var DropDown = React.createClass({

	propTypes: {
		items: React.PropTypes.array.isRequired, //[{ payload: 1, text: 'Test' },{...}]
		deviders: React.PropTypes.array, //указать индексы элементов после которых вставлять разделители
		selectedPayload: React.PropTypes.string
	},

	getDefaultProps: function(){
		return {
			items: [],
			deviders: [],
			selectedPayload: ''
		}
	},

	getInitialState: function() {
		return {
			display: false
		}
	},

	_getSelectedItemText: function(items, payload){
		if (!payload) return items[0].text;
		for (var i = items.length - 1; i >= 0; i--) {
			if (items[i].payload === payload)
				return items[i].text;
		};
		return '';
	},

	_stopPropagation: function(e){
		if (!e || (!e.stopPropagation && !e.nativeEvent)) return;
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
	},

	_unmountComponent: function(){
		document.removeEventListener('click', this.handleBlur);
	},	

	componentWillUnmount: function() {
		this._unmountComponent();
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlur);
	},

	handleChange: function(e, payload, text, index) {
		if (this.props.onChange) {
			this.props.onChange(e, payload, text, index);
		}
	},

	handleBlur: function() {
		if (this.state.display)
			this.setState({display: false});
	},

	handleToogelDisplay: function(e) {
		this._stopPropagation(e);
		this.setState({display: !this.state.display});
	},

	render: function() {
		var isTypeDisplayStyle = { display: this.state.display ? "block" : "none" };
		var list = [];
		this.props.items.forEach(function(item, index){
			if (index % 2 == 0 && index !== 0 && this.props.deviders.indexOf(index !== -1)){
				list.push(<li key={"divider"+ index} className="dropdown-list__devider"></li>);
			}
			var selected = this.props.selectedPayload === item.payload ? true : false;
			list.push(<Item key={index} selected={selected} text={item.text} payload={item.payload} onChange={this.handleChange} index={index}/>);
		}.bind(this))
		return (
			<div className="dropdown-box">
				<button className="dropdown-box__default-item" type="button" onClick={this.handleToogelDisplay}>
					<span className="dropdown-box__title">{this._getSelectedItemText(this.props.items, this.props.selectedPayload)}</span>
					<span className="dropdown-box__caret caret"></span>
				</button>
				<ul className="dropdown-list" style={isTypeDisplayStyle}>{list}</ul>
			</div>
		);
	}
});

module.exports = DropDown;