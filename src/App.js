/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import image1 from './images/pexels-fikret-kabay-4786366.jpg'
import RandomGlitchZoomComponent from './components/randomGlitchZoomComponent/randomGlitchZoomComponent';
import TitleGlitchComponent from './components/ttitleGlitchComponent/titleGlitchComponent';
//import RandomGlitchZoomComponentTest from './components/randomGlitchZoomComponent/randomGlitchZoomComponentTest';

import { TweenMax, Power3, TweenLite } from 'gsap';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			e: {
				offsetX: 100,
				offsetY: 100
			},
			layer: [],
			backgroundImage: image1,
			interval: '',
			seconds: -1,
			randomGlitchZoom: false,
			glitchSizes: {},
			numberofGlitches: 0,
			glitchesAvailable: [],
			titleText: '',
		}
		this.imageItem = null;
		this.myTween = null;
		this.moove = this.moove.bind(this);
		this.layer1 = null;
		this.layer2 = null;
		this.layer3 = null;
		this.mapRange = this.mapRange.bind(this);
		this.imageTimerHandler = this.imageTimerHandler.bind(this);
		this.setSeconds = this.setSeconds.bind(this);
		this.randomGlitchZoomHandler = this.randomGlitchZoomHandler.bind(this);
		this.calculateGlitch = this.calculateGlitch.bind(this);
		this.selectTitleTextHandler = this.selectTitleTextHandler.bind(this);
	}

	componentDidMount() {
		let newLayers = [this.layer1, this.layer2, this.layer3];
		this.imageTimerHandler();
		//this.createGlitchRows();
		this.setState({
			layers: newLayers
		});


		TweenLite.to(this.state.e, 12, {
			ease: Power3.easeOut,
			offsetX: Math.random() * window.innerWidth,
			offsetY: Math.random() * window.innerHeight,
			onUpdate: () => {
				this.moove(this.state.e);
			}
		});

		TweenLite.to(this.state.e, 23, {
			delay: 1.5,
			ease: Power3.easeOut,
			offsetX: Math.random() * window.innerWidth,
			offsetY: Math.random() * window.innerHeight,
			onUpdate: () => {
				this.moove(this.state.e);
			}
		});

		TweenLite.to(this.state.e, 1.5, {
			delay: 3,
			ease: Power3.easeOut,
			offsetX: Math.random() * window.innerWidth,
			offsetY: Math.random() * window.innerHeight,
			onUpdate: () => {
				this.moove(this.state.e);
			}
		});


		document.addEventListener("mousemove", e => {
			this.moove(e);
		});

	}

	mapRange(value, low1, high1, low2, high2) {
		return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}

	moove(e) {
		this.state.layers.forEach(layer => {


			let duration = parseFloat(layer.getAttribute("data-duration"));

			let offsetX = window.innerWidth / 2 - e.offsetX;
			let offsetY = window.innerHeight / 2 - e.offsetY;



			let x = this.mapRange(offsetX, 0, window.innerWidth / 2, 0, 100);
			let y = this.mapRange(offsetY, 0, window.innerHeight / 2, 0, 100);
			// console.log(x, y);
			TweenLite.to(layer, duration, {
				ease: Power3.easeOut,
				y: y,
				x: x,
				scale: 1.25
			});


		});
	}

	imageTimerHandler() {
		this.setState({
			interval: setInterval(() => {/*
				const newSecond = this.state.seconds + .1
		this.selectTitleTextHandler(newSecond);
	
				this.setSeconds(newSecond);	*/
				this.randomGlitchZoomHandler();
				this.createGlitchRows();
			}, 100)
		});
	}


	setSeconds(newSecond) {
		this.setState({
			seconds: newSecond,
		})
	}

	randomGlitchZoomHandler() {
		let chanceOfGlitch = parseInt(Math.random() * (10 - 1) + 1);
		this.setState({
			randomGlitchZoom: (chanceOfGlitch > 5),
		})
	}

	calculateGlitch() {
		let maxWidth = parseInt(Math.random() * (50 - 15) + 15);
		let maxHeight = parseInt(Math.random() * (10 - 1) + 1);
		let positionx = parseInt(Math.random() * (0 - 0) + 0);
		let positiony = parseInt(Math.random() * (100 - 0) + 0);

		return {
			maxWidth,
			maxHeight,
			positionx,
			positiony
		}
	}

	createGlitchRows() {
		let numberOFGlitches = parseInt(Math.random() * (6 - 1) + 1);
		let glitchesArr = [];
		for (let i = 0; i <= numberOFGlitches; i++) {
			glitchesArr.push(this.calculateGlitch());
		}
		this.setState({
			glitchesAvailable: glitchesArr
		});
	}



	selectTitleTextHandler(time) {
		console.log(time)
		switch (time) {
			case 2:
				this.setState({
					titleText: 'Slum'
				});
				break;

			case 33:
				this.setState({
					titleText: 'Will'
				});
				break;
			case 34:
				this.setState({
					titleText: 'Catch'
				});
				break;

			case 34:
				this.setState({
					titleText: 'My'
				});
				break;
		}
	}



	render() {

		let randomGlitches = this.state.glitchesAvailable.map(glitch => (<RandomGlitchZoomComponent
			maxHeight={glitch.maxHeight}
			maxWidth={glitch.maxWidth}
			positionx={glitch.positionx}
			positiony={glitch.positiony}
			key={`${glitch.maxHeight}${glitch.positionx}-${Math.random() * (100 - 0) + 0}`}
			imageSrc={this.state.backgroundImage}
		/>
		));

		return (
			<div className="App">
				{/*
<RandomGlitchZoomComponentTest
			maxHeight={30}
			maxWidth={30}
			positionx={30}
			positiony={30}
			imageSrc = {this.state.backgroundImage}
			/> 

				*/}
				<TitleGlitchComponent titleText={this.state.titleText} />
				{this.state.randomGlitchZoom ? randomGlitches : ''}
				<div className="container">


					<div style={{ backgroundImage: "url(" + this.state.backgroundImage + ")" }} ref={el => this.layer3 = el} className="b" data-duration="5"></div>
					<div style={{ backgroundImage: "url(" + this.state.backgroundImage + ")" }} ref={el => this.layer2 = el} className="g" data-duration="3"></div>
					<div style={{ backgroundImage: "url(" + this.state.backgroundImage + ")" }} ref={el => this.layer1 = el} className="r" data-duration="1"></div>
				</div>



			</div>
		);
	}

}

export default App;
