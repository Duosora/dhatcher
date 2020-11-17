import React from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DHatchForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eggTypes: ['Nocturne','Bogsneak','Banescale'],
			selectedEgg: 'Nocturne'
		}
	}

	componentDidMount() {
		let eggTypes = [].concat(this.state.eggTypes);

		this.props.elements.forEach(function(e) {
			eggTypes.push(e.name);
		});

		this.setState({
			eggTypes: eggTypes
		});

		this.updateFormData		= this.updateFormData.bind(this);
		this.sendHatchRequest = this.sendHatchRequest.bind(this);
	}

	updateFormData(event) {
		let selEgg = event.target.value;

		this.setState({
			selectedEgg: selEgg
		});
	}

	sendHatchRequest(event) {
		if(this.props.hatchRequest) {
			this.props.hatchRequest(this.state.selectedEgg);
		}
	}

	render() {
		return (
			<div>
				<div>
					<Alert variant="info">
						So, you came here to hatch an egg and see what comes out. Let me tell you what's about to happen. You'll choose an egg. Hatch it. And see the dragon coming out. It can be just a beautiful dragon, the fabulous triple, as well as another eyeburner. Be wary this type of activity can cure addiction to hatching real eggs, and thus, saving you money and lair space.
					</Alert>
				</div>
				<Form>
					<Form.Group>
						<Form.Control onChange={this.updateFormData} as="select" size="lg">
							{
								this.state.eggTypes.map((item,index) => (
									<option key={`eggType_${index}`}>{item}</option>
								))
							}
						</Form.Control>
						<br/>
						<Button onClick={this.sendHatchRequest} variant="success" size="lg" block>Hatch!</Button>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

export default DHatchForm;
