import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import raw from 'raw.macro';
import { globalState } from './components/GlobalState.js';
import DHatchlingTable from './components/DHatchlingTable.js';
import DTimeMeasure from './components/DTimeMeasure.js';
import DSlogan from './components/DSlogan.js';
import DHatchling from './components/DHatchling.js';
import DHatchForm from './components/DHatchForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const RAW_COLOR_WHEEL = raw('./config/colors.dcnf');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hatchlings: []
		}
	}

	componentDidMount() {
		this.listHatchling = this.listHatchling.bind(this);

		let colorArray   = [];

		RAW_COLOR_WHEEL.split("\n").forEach(function(e) {
			colorArray.push(e.split(","));
		});

		this.setState({
			colors: colorArray
		});
	}

	weightedRandomItem(itemArray) {
		let weightTotal = 0;

		itemArray.forEach(function(currentItem) {
			weightTotal += currentItem.weight;
		});

		let randomNumber    = Math.floor(Math.random()*weightTotal);
		let iteratingSum    = 0;
		let returnedElement = null;

		itemArray.forEach(function(currentItem,currentIndex) {
			iteratingSum += currentItem.weight;

			if((iteratingSum >= randomNumber) && (returnedElement === null)) {
				returnedElement = currentIndex;
			}
		});

		return returnedElement;
	}

	listHatchling(hatchIndex) {
		let allHatchlings = this.state.hatchlings;

		if (allHatchlings[hatchIndex] !== undefined) {
			return (
				<DHatchling
					breeds={this.breeds}
					genders={this.genders}
					elements={this.elements}
					eyeTypes={this.eyeTypes}
					specs={allHatchlings[hatchIndex]}
					asRow={+(hatchIndex === (allHatchlings.length-1))}
				/>
			);
		}

		return <></>;
	}

	addHatchling(eggElement) {
		/* Workflow for tomorrow.
			1. Hatchling array management:
				- 'Hatch' pressed = generate new hatchling.
				- Append this hatchling to the array this.state.hatchlings
				- eggElement is the NAME of the element.
				- If eggElement is one of the elements, random element ELSE RANDOM BREED
			2. ......loading.......
				уф, мне и этого хватит. :"D
		*/

		const pColor = Math.floor(Math.random()*this.state.colors.length);
		const sColor = Math.floor(Math.random()*this.state.colors.length);
		const tColor = Math.floor(Math.random()*this.state.colors.length);

		let eIndex = globalState.elements.findIndex(e => e.name === eggElement);

		if(eIndex === -1) {
			eIndex = this.weightedRandomItem(globalState.elements);
		}

		const eyeType = this.weightedRandomItem(globalState.eyeTypes);
		const gender  = this.weightedRandomItem(globalState.genders);

		let breedIndex = -1;

		if((eggElement !== 'Nocturne') && (eggElement !== 'Banescale') && (eggElement !== 'Bogsneak')) {
			breedIndex = this.weightedRandomItem(globalState.breeds);
		} else {
			breedIndex = globalState.breeds.findIndex(e => e.name === eggElement);
		}

		globalState.hatchedDragons.push({
			breed: breedIndex,
			gender: gender,
			element: eIndex,
			eyeType: eyeType,
			pColor: pColor,
			sColor: sColor,
			tColor: tColor
		});

		this.setState({hatchlings: globalState.hatchedDragons});

		console.log(globalState.breeds[breedIndex].name,globalState.genders[gender].name,globalState.elements[eIndex].name,globalState.eyeTypes[eyeType].name,this.state.colors[pColor][0],this.state.colors[sColor][0],this.state.colors[tColor][0]);
	}

	render () {
		return (
			<Container className="App" fluid>
				<Row className="Header">
					<Col>
						<h1>Duosora's Egg Hatching Simulator<sup>v2.0</sup></h1>
						<DSlogan />
						<DTimeMeasure />
					</Col>
				</Row>
				<Row>
					<Col sm={12} lg={6}>
						<h3>Choose Your Egg</h3>

						<DHatchForm
							elements={globalState.elements}
							hatchRequest={this.addHatchling.bind(this)}
						/>

						<DHatchlingTable
							colors={this.state.colors}
						/>
					</Col>
					<Col sm={12} lg={6}>
						<h2>Random Hatchling</h2>
						<DHatchling
							breeds={globalState.breeds}
							genders={globalState.genders}
							elements={globalState.elements}
							eyeTypes={globalState.eyeTypes}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
