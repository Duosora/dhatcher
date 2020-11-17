import React from 'react';
import raw from 'raw.macro';
import DColor from './../components/DColor.js';

const RAW_COLOR_WHEEL = raw('./../config/colors.dcnf');

class DColorWheel extends React.Component {
	constructor(props) {
		super(props);

		this.state = { colors: [], loaded: false, pColor: 0, sColor: 0, tColor: 0 };
	}

	createSvgArc(x, y, r, startAngle, endAngle) {
    if (startAngle > endAngle) {
      var s = startAngle;
      startAngle = endAngle;
      endAngle = s;
    }
    if (endAngle - startAngle > Math.PI * 2) {
      endAngle = Math.PI * 1.99999;
    }

    var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

    return [
      "M",
      x,
      y,
      "L",
      x + Math.cos(startAngle) * r,
      y - Math.sin(startAngle) * r,
      "A",
      r,
      r,
      0,
      largeArc,
      0,
      x + Math.cos(endAngle) * r,
      y - Math.sin(endAngle) * r,
      "L",
      x,
      y
    ].join(" ");
  }

	componentDidMount() {
		let colorArray   = [];

		RAW_COLOR_WHEEL.split("\n").forEach(function(e) {
			colorArray.push(e.split(","));
		});

		this.setState({
			colors: colorArray,
			pColor: Math.floor(Math.random()*colorArray.length),
			sColor: Math.floor(Math.random()*colorArray.length),
			tColor: Math.floor(Math.random()*colorArray.length)
		}, () => {
			this.setState({ loaded: true }, () => {
				// Since the component is now fully loaded, return callback to parent.
				if(this.props.whenLoaded) {
					this.props.whenLoaded(this.state);
				}
			});
		});
	}

	render() {
		return this.state.loaded ? (
			<div>
				<div>
					<svg style={{width: '100%', maxWidth: '450px'}} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
						<g>
							<circle cx="400" cy="400" r="300" fill="#660"/>
							<g transform=" translate(400 400) rotate(-90) scale(1 -1)">
								<path d={this.createSvgArc(0,0,300,0,2*Math.PI/3)} fill={'#'+this.state.colors[this.state.pColor][1]} />
								<path d={this.createSvgArc(0,0,300,0,-2*Math.PI/3)} fill={'#'+this.state.colors[this.state.sColor][1]} />
								<path d={this.createSvgArc(0,0,300,2*Math.PI/3,4*Math.PI/3)} fill={'#'+this.state.colors[this.state.tColor][1]} />
							</g>
							<circle cx="400" cy="400" r="140" fill="#fff" stroke="#000"/>

							<text fontSize="35px" transform="translate(400 350)" textAnchor="middle">
								{this.props.breed.name}
							</text>
							<text fontSize="35px" transform="translate(400 390)" textAnchor="middle">
								{this.props.gender.name}
							</text>
							<text fontSize="35px" transform="translate(400 430)" textAnchor="middle">
								{this.props.element.name}
							</text>
							<text fontSize="35px" transform="translate(400 470)" textAnchor="middle">
								{this.props.eyeType.name}
							</text>

							<path transform="translate(490 60) rotate(60)" id="curve1" fill="transparent" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
							<path transform="translate(60 490) rotate(-60)" id="curve2" fill="transparent" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
							<path transform="translate(-290 150) rotate(-45)" d="M400,400a255,255 0 1,0 180,180" fill="transparent" id="curve3" />


							<DColor
								textWidth="600"
								fontSize="55px"
								xlinkHref="#curve1"
								colorName={this.state.colors[this.state.pColor][0]}
								colorCode={this.state.colors[this.state.pColor][1]}
								letterSpacing="2"
							/>

							<DColor
								textWidth="600"
								fontSize="55px"
								xlinkHref="#curve2"
								colorName={this.state.colors[this.state.sColor][0]}
								colorCode={this.state.colors[this.state.sColor][1]}
								letterSpacing="2"
							/>

							<DColor
								textWidth="600"
								fontSize="55px"
								xlinkHref="#curve3"
								colorName={this.state.colors[this.state.tColor][0]}
								colorCode={this.state.colors[this.state.tColor][1]}
								letterSpacing="7"
							/>
						</g>
					</svg>
				</div>
			</div>
		) : (
			<span>Loading...</span>
		);
	}
}

export default DColorWheel;
