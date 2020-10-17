/* eslint-disable */
import React, { Component } from 'react';
import './App.scss';
import image1 from './images/photo-1602688355949-ae34f91c79c6.jpg'

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
		}
		this.imageItem = null;
		this.myTween = null;
		this.moove = this.moove.bind(this);
		this.layer1 = null;
		this.layer2 = null;
		this.layer3 = null;
		this.mapRange = this.mapRange.bind(this);
	}

	componentDidMount() {
		let newLayers = [this.layer1, this.layer2, this.layer3];

		this.setState({
			layers: newLayers
		});


		TweenLite.to(this.state.e, 1.5, {
			ease: Power3.easeOut,
			offsetX: Math.random() * window.innerWidth,
			offsetY: Math.random() * window.innerHeight,
			onUpdate: () => {
				this.moove(this.state.e);
			}
		});

		TweenLite.to(this.state.e, 1.5, {
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

	render() {
		return (
			<div className="App">


				<div className="container">
					<div style={{ backgroundImage: "url(" + this.state.backgroundImage +")" }} ref={el => this.layer3 = el} className="b" data-duration="3"></div>
					<div style={{ backgroundImage: "url(" + this.state.backgroundImage +")"}} ref={el => this.layer2 = el} className="g" data-duration="1.5"></div>

					<div style={{ backgroundImage: "url(" + this.state.backgroundImage +")"}} ref={el => this.layer1 = el} className="r" data-duration="0.5"></div>
				</div>



			</div>
		);
	}

}

export default App;
