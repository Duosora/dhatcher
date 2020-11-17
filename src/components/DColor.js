import React from 'react';

class DColor extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			invertedColor: false
		}
	}
	
	padZero(str, len) {
		len = len || 2;
		var zeros = new Array(len).join('0');
		return (zeros + str).slice(-len);
	}

	invertColor(hex, bw) {
		if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
		}
		// convert 3-digit hex to 6-digits.
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
		}
		var r = parseInt(hex.slice(0, 2), 16),
			g = parseInt(hex.slice(2, 4), 16),
			b = parseInt(hex.slice(4, 6), 16);
		if (bw) {
			// http://stackoverflow.com/a/3943023/112731
			return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
		}
		// invert color components
		r = (255 - r).toString(16);
		g = (255 - g).toString(16);
		b = (255 - b).toString(16);
		// pad each with zeros and return
		return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
	}
	
	componentDidMount() {
		this.invertColor = this.invertColor.bind(this);
		
		this.setState({ invertedColor: this.invertColor(this.props.colorCode,true) });
	}
	
	render() {
		return this.state.invertedColor ? (
			<text width={this.props.textWidth} fontSize={this.props.fontSize} fill={this.state.invertedColor} letterSpacing={this.props.letterSpacing}>
				<textPath xlinkHref={this.props.xlinkHref} startOffset="50%" textAnchor="middle">
					{this.props.colorName}
				</textPath>
			</text>
		) : (
			<span>Loading...</span>
		);
	}
}

export default DColor;