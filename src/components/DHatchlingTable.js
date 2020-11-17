import React from 'react';
import { globalState } from '../components/GlobalState.js';
import { Container, Row, Col, Table } from 'react-bootstrap';

class DHatchlingTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {

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

	render() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Breed</th>
						<th>Element</th>
						<th>Eye</th>
						<th>Colors</th>
						<th>Find!</th>
					</tr>
				</thead>
				<tbody>
				{	[...globalState.hatchedDragons].reverse().map((item,index) => (
					<tr key={`dragonEntry${index}`}>
						<td>{globalState.hatchedDragons.length-index}</td>
						<td>{globalState.breeds[item.breed].name+' '+globalState.genders[item.gender].name}</td>
						<td>{globalState.elements[item.element].name}</td>
						<td>{globalState.eyeTypes[item.eyeType].name}</td>
						<td>
							<Container fluid>
								<Row>
									<Col style={{background: `#${this.props.colors[item.pColor][1]}`, color: this.invertColor(this.props.colors[item.pColor][1],true)}}>
										{this.props.colors[item.pColor][0]}
									</Col>
								</Row>
								<Row>
									<Col style={{background: `#${this.props.colors[item.sColor][1]}`, color: this.invertColor(this.props.colors[item.sColor][1],true)}}>
										{this.props.colors[item.sColor][0]}
									</Col>
								</Row>
								<Row>
									<Col style={{background: `#${this.props.colors[item.tColor][1]}`, color: this.invertColor(this.props.colors[item.tColor][1],true)}}>
										{this.props.colors[item.tColor][0]}
									</Col>
								</Row>
							</Container>
						</td>
						<td>
							<div>
								<a rel="noreferrer noopener"
									target="_blank"
									href={`https://www1.flightrising.com/scrying/predict?breed=${globalState.breeds[item.breed].scryID}&gender=${globalState.genders[item.gender].scryID}&age=0&bodygene=0&body=${this.props.colors[item.pColor][3]}&winggene=0&wings=${this.props.colors[item.sColor][3]}&tertgene=0&tert=${this.props.colors[item.tColor][3]}&element=${globalState.elements[item.element].scryID}&eyetype=${globalState.eyeTypes[item.eyeType].scryID}`}
								>Scry</a>
							</div>
						</td>
					</tr>
				)) }
				</tbody>
			</Table>
		);
	}
}

export default DHatchlingTable;
