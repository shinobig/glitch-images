import React, { Component } from 'react';
import './App.scss';
import EventWillStartComponent from './components/eventWillStartComponent/eventWillStartComponent';
import MainGlitchImage from './components/mainGlitchImage/mainGlitchImage';
import song from './music/public-memory-as-you-wish.mp3'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showStart: true,
			songAudio: document.getElementById('song'),
		}
		this.clickOnStartHandler = this.clickOnStartHandler.bind(this);
		this.playAudioHandler = this.playAudioHandler.bind(this);
	}

	componentDidMount() {
		this.setState({
			songAudio: document.getElementById('song'),
		});
	}

	clickOnStartHandler() {
		this.playAudioHandler();
		this.setState({
			showStart: false,
		})
	}

	playAudioHandler() {
		document.getElementById('song').play();
	}

	render() {
		let mainComponent = this.state.showStart ? <EventWillStartComponent startHandler={this.clickOnStartHandler} /> : <MainGlitchImage />
		return (
			<div>
				{mainComponent}
				<audio id="song" src={song} />
			</div>
		);
	}
}
export default App;
