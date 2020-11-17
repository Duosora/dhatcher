import React from 'react';
import raw from 'raw.macro';

const SLOGAN_LIST = raw('./../config/slogans.dcnf');

class DSlogan extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			slogans				: [],
			currentSlogan	: 0
		}
	}
	
	rerollSlogan() {
		let randomIndex = Math.floor(Math.random()*this.state.slogans.length);
		
		if(this.state.currentSlogan !== -1) {
			// if slogan exists, make sure the thing won't be the same.
			while(this.state.currentSlogan === randomIndex) {
				randomIndex = Math.floor(Math.random()*this.state.slogans.length);
			}
		}
		
		this.setState({
			currentSlogan: randomIndex
		});
	}
	
	componentDidMount() {
		this.rerollSlogan = this.rerollSlogan.bind(this);
		
		this.setState({
			slogans: SLOGAN_LIST.split("\n")
		},() => {
			this.rerollSlogan();
		});
	}
	
	render() {
		return (
			<span dangerouslySetInnerHTML={{__html: this.state.slogans[this.state.currentSlogan]}}></span>
		);
	}
}

export default DSlogan;