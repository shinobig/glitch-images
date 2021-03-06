/* eslint-disable */
import React, { Component } from 'react';
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import image3 from '../../images/image3.jpg'
import image4 from '../../images/image4.jpg'
import image5 from '../../images/image5.jpg'
import image6 from '../../images/image6.jpg'
import image7 from '../../images/image7.jpg'
import { randomNumberCreator } from '../ultis/utils';
import RandomGlitchZoomComponent from '../randomGlitchZoomComponent/randomGlitchZoomComponent';
import RandomTextComponent from '../randomTextComponent/randomTextComponent';
import CSSPlugin from 'gsap/CSSPlugin';

const C = CSSPlugin;

import { Power3, TweenLite } from 'gsap';
class mainGlitchImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			e: {
				offsetX: 80,
				offsetY: 80
			},
			layers: [],
			backgroundImage: image1,
			imagesArr: [image1, image2, image3, image4, image5, image6, image7],
			interval: '',
			imageInterval: '',
			seconds: -1,
			randomGlitchZoom: false,
			glitchSizes: {},
			numberofGlitches: 0,
			glitchesAvailable: [],
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
		this.selectImageHandler = this.selectImageHandler.bind(this);
		this.tweenLitHandler = this.tweenLitHandler.bind(this);
	}

	componentDidMount() {
		let newLayers = [this.layer1, this.layer2, this.layer3];
		this.imageTimerHandler();
		this.setState({
			layers: newLayers,
		});

		this.tweenLitHandler(this.state.e, 12, 0);
		this.tweenLitHandler(this.state.e, 23, 1.5);
		this.tweenLitHandler(this.state.e, 1.5, 3);
		document.addEventListener("mousemove", e => {
			this.moove(e);
		});

	}

	tweenLitHandler (state, quantity, delay){
		TweenLite.to(state, quantity, {
			delay: delay,
			ease: Power3.easeOut,
			offsetX: Math.random() * window.innerWidth,
			offsetY: Math.random() * window.innerHeight,
			onUpdate: () => {
				this.moove(state);
			}
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
			interval: setInterval(() => {
				this.randomGlitchZoomHandler();
				this.createGlitchRows();
				let newSeconds = this.state.seconds + .1;
				this.setSeconds(newSeconds);
				this.selectImageHandler(newSeconds);
				
			}, 100),
		});
	}

	setSeconds(newSecond) {
		this.setState({
			seconds: newSecond,
		})
	}

	randomGlitchZoomHandler() {
		let chanceOfGlitch = randomNumberCreator(10, 1);
		this.setState({
			randomGlitchZoom: (chanceOfGlitch > 5),
		})
	}

	calculateGlitch() {
		let maxWidth = randomNumberCreator(50, 15);
		let maxHeight = randomNumberCreator(10, 1);
		let positionx = randomNumberCreator(0, 0);
		let positiony = randomNumberCreator(100, 0);
		return {
			maxWidth,
			maxHeight,
			positionx,
			positiony
		}
	}

	createGlitchRows() {
		let numberOFGlitches = randomNumberCreator(6, 1);
		let glitchesArr = [];
		for (let i = 0; i <= numberOFGlitches; i++) {
			glitchesArr.push(this.calculateGlitch());
		}
		this.setState({
			glitchesAvailable: glitchesArr
		});
	}

	selectImageHandler(counter) {
		if (counter > 5) {
			const randomImage = this.state.imagesArr[randomNumberCreator((this.state.imagesArr.length), 0)];
			this.setState({
				backgroundImage: randomImage,
				seconds: -1,
			})
		}
	}

	render() {
		let randomGlitches = this.state.glitchesAvailable.map(glitch => (<RandomGlitchZoomComponent
			maxHeight={glitch.maxHeight}
			maxWidth={glitch.maxWidth}
			positionx={glitch.positionx}
			positiony={glitch.positiony}
			key={`${glitch.maxHeight}${glitch.positionx}-${randomNumberCreator(10000, 0)}`}
			imageSrc={this.state.backgroundImage}
		/>
		));
		return (
			<div className="App">
				<RandomTextComponent />
				<div className="text-container" >
				{}
				</div>		
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

export default mainGlitchImage;
