var React = require('React');

var ImageSelect = React.createClass({

	componentWillReceiveProps: function(nextProps){
		//React.findDOMNode(this.refs.test).value = '';

	},
		
	handleChange: function(e) {
		if (this.props.uploadImage)
			this.props.uploadImage(e.target);
	},

	handleRemove: function(e) {
		//e.target.value = '';
		//React.findDOMNode(this.refs.test).value = '';
		if (this.props.removeImg)
			this.props.removeImg({id: this.props.id, name: this.props.name});
	},

	render: function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		return (
			<div className="input-group">
			   	<div tabIndex="-1" className="form-control file-caption  kv-fileinput-caption">
			   		<span title={imgName} className="file-caption-ellipsis">…</span>
			   		<div title={imgName} className="file-caption-name" style={isDisplayIcon}>
			   			<span className="glyphicon glyphicon-file kv-caption-icon"> {imgName}</span>
			   		</div>
				</div>
			   	<div className="input-group-btn">
			    	<button type="button" title="Clear selected files" className="btn btn-default fileinput-remove fileinput-remove-button" style={isDisplayIcon} onClick={this.handleRemove}>
			    		<i className="glyphicon glyphicon-trash"></i> 
			    	</button>
			       	<div style={{"overflow": "hidden"}} className="btn btn-primary btn-file">
			       		<i className="glyphicon glyphicon-picture"></i>
			       		<span> &nbsp; … </span>

			       		<div className="js-fileapi-wrapper upload-btn">
			       			<input accept="image/*" name="files" className="file" type="file" onChange={this.handleChange} title="Добавить изображение"/>
						</div>
			       	</div>
			   	</div>
			</div>
		);	
	}
});

module.exports = ImageSelect;