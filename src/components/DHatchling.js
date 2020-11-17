import React from 'react';
import DColorWheel from './../components/DColorWheel.js';

class DHatchling extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			colors: { 
				primary   : ['none'],
				secondary : ['none'],
				tertiary  : ['none']
			},
			breed: {},
			element: {},
			gender: {},
			eyeType: {}
		}
	}
	
	weightedRandomItem(itemArray) {
		let weightTotal = 0;
		
		itemArray.forEach(function(currentItem) {
			weightTotal += currentItem.weight;
		});
		
		let randomNumber    = Math.floor(Math.random()*weightTotal);
		let iteratingSum    = 0;
		let returnedElement = null;
		
		itemArray.forEach(function(currentItem) {
			iteratingSum += currentItem.weight;
			
			if((iteratingSum >= randomNumber) && (returnedElement === null)) {
				returnedElement = currentItem;
			}
		});
		
		return returnedElement;
	}
	
	componentDidMount() {
		this.setState({
			breed: 		this.weightedRandomItem(this.props.breeds),
			element:	this.weightedRandomItem(this.props.elements),
			gender:		this.weightedRandomItem(this.props.genders),
			eyeType:	this.weightedRandomItem(this.props.eyeTypes)
		});
	}
	
	onWheelLoaded(wheelState) {
		this.setState({
			colors: { 
				primary   : wheelState.colors[wheelState.pColor],
				secondary : wheelState.colors[wheelState.sColor],
				tertiary  : wheelState.colors[wheelState.tColor]
			}
		});
	}
	
	render() {
		return (
			<div>
				<div>
					<DColorWheel
						whenLoaded={this.onWheelLoaded.bind(this)}
						breed={this.state.breed}
						element={this.state.element}
						gender={this.state.gender}
						eyeType={this.state.eyeType}
					/>
				</div>
				<div>
					
				</div>
			</div>
		);
	}
}

export default DHatchling;