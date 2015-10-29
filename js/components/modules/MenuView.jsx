var React = require('react');

function getHashIndex(hash, routes){
    for (var i = routes.length - 1; i >= 0; i--) {
        if (routes[i].route === hash) {
            return i;
        }
    };
    return -1;
}

function getRoute(index, routes){
    for (var i = routes.length - 1; i >= 0; i--) {
        if (i === index) {
            return routes[i];
        }
    };
    return null;
}

var MenuItem = React.createClass({

    propTypes: {
        route: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired
    },

    handleChangeRoute: function(){
        if (this.props.changeRoute) {
            this.props.changeRoute(this.props.route, this.props.index);
        }
    },

    render: function(){
        return (
            <div className="menu-box__item">
                <a onClick={this.handleChangeRoute} className="menu-box__button" href={this.props.route}>{this.props.title}</a>
                <div className="menu-box__helper" />
            </div>
        );
    }
})

var MenuView = React.createClass({

    propTypes: {
        defaultRoute: React.PropTypes.string.isRequired,
        routes: React.PropTypes.array.isRequired, //[{route: '#settings', title: 'test'}, {...}, {..}]
        changeMenuItem: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            curHashIndex: 0,
            prevHashIndex: 0,
            borderShift: 0,
            borderWidth: 0
        }
    },

    componentDidMount: function() {
        var curHashIndex = getHashIndex(this.props.defaultRoute, this.props.routes);
        curHashIndex = curHashIndex === -1 ? this.state.curHashIndex : curHashIndex;

        var borderShift = this.getBorderShift(curHashIndex);
        var borderWidth = this.getBorderWidth(curHashIndex, curHashIndex);
        this.setState({
            curHashIndex: curHashIndex,
            borderShift: borderShift,
            borderWidth: borderWidth
        });
    },

    getBorderShift: function(indexCurElem){
        var shift = 0;
        var menuBoxeElem = this.refs.menuBox;
        var children = menuBoxeElem.querySelectorAll(".menu-box__item");
        for (var i = 0; i < indexCurElem; i++) {
            shift += children[i].offsetWidth;
        }
        return shift;
    },

    getBorderWidth: function(indexCurElem, indexPrevElem) {
        if (indexCurElem === -1 && indexPrevElem === -1) return 0;
        var menuBoxeElem = this.refs.menuBox;
        indexPrevElem = indexPrevElem !== -1 ? indexPrevElem : indexCurElem;
        var width = 0;
        var i = indexCurElem >= indexPrevElem ? indexPrevElem : indexCurElem;
        var count = indexCurElem >= indexPrevElem ? indexCurElem : indexPrevElem;
        var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
        for (i; i <= count; i++) {
            width += elems[i].offsetWidth;
        }
        return width;
    },

	handleChangeRoute: function(route, index){
        var prevHashIndex = this.state.curHashIndex;
        var curHashIndex = index;

        var borderShift = this.getBorderShift(curHashIndex);
        var borderWidth = this.getBorderWidth(curHashIndex, prevHashIndex);
        this.setState({ 
            borderWidth: borderWidth,
            curHashIndex: curHashIndex,
            prevHashIndex: prevHashIndex 
        }); 

        if (curHashIndex < prevHashIndex) {
            this.setState({ borderShift: borderShift }); 
        }

        var border = this.refs.border;
        border.classList.remove('menu-box__border_contract');
        border.classList.add('menu-box__border_expand');
        setTimeout(function(){
            border.classList.remove('menu-box__border_expand');
            border.classList.add('menu-box__border_contract');
            this.setState({
                borderShift: borderShift,
                borderWidth: this.getBorderWidth(curHashIndex, curHashIndex)
            });
            if (this.props.changeMenuItem) {
                this.props.changeMenuItem(getRoute(curHashIndex, this.props.routes));
            }
        }.bind(this), 250);
	},

	render: function () {
        var borderStyles = { left: this.state.borderShift, width: this.state.borderWidth };
		return (
			<div ref="menuBox" className="menu-box">
				{this.props.routes.map(function(r, index){
					return <MenuItem key={index} route={r.route} title={r.title} index={index} changeRoute={this.handleChangeRoute}/>;
				}.bind(this))}
				<div ref="border" style={borderStyles} className="menu-box__border"></div>
			</div>
		);
	}
});

module.exports = MenuView;