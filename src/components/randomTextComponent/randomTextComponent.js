import React, { Component } from 'react';
import { randomNumberCreator } from '../ultis/utils';

class randomTextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArr: "et datum est illis ne occiderent eos: sed ut cruciarent mensibus quinque: et cruciatus eorum, ut cruciatus scorpii cum percutit hominem Et in diebus illis quaerent homines mortem, et non invenient eam: et desiderabunt mori, et fugiet mors ab eis Et similitudines locustarum, similes equis paratis in praelium: et super capita earum tamquam coronae similes auro: et facies earum tamquam facies hominum".split(' '),
      textToShot: '',
      isTextShowing: false,
      textTimer: '',
      textTimerCounter: -1,
      textBoxSize: {
        positionX: '10%',
        positionY: '10%',
        width: '500px',
      },
    }
    this.timeHandler = this.timeHandler.bind(this);
    this.addtextHandler = this.addtextHandler.bind(this);
    this.textBozSizeHandler = this.textBozSizeHandler.bind(this);
    this.showOrStopTextHandler = this.showOrStopTextHandler.bind(this);
    this.setCounter = this.setCounter.bind(this);
  }

  componentDidMount() {
    this.timeHandler();
  }

  timeHandler() {
    this.setState({
      interval: setInterval(() => {
        let newSecond = this.state.textTimerCounter + .1;
        this.setCounter(newSecond);
        this.showOrStopTextHandler(newSecond);


        if (this.state.isTextShowing) {
          this.addtextHandler();
        }

      }, 100),
    });
  }


  setCounter(newSecond) {
    this.setState({
      textTimerCounter: newSecond,
    })
  }

  addtextHandler() {
    let newTextToShot = `${this.state.textToShot} ${this.state.textArr[this.state.textToShot.split(' ').length]}`;
    this.setState({
      textToShot: newTextToShot,
    })
  }

  textBozSizeHandler() {
    let positionX = `${randomNumberCreator(80, 0)}%`;
    let positionY = `${randomNumberCreator(80, 0)}%`;
    let width = `${randomNumberCreator(800, 250)}px`;

    this.setState({
      textBoxSize: {
        positionX,
        positionY,
        width
      }
    });
  }

  showOrStopTextHandler(counter) {
    if (counter > 3) {
      if (5 > randomNumberCreator(10, 0)) {
        this.textBozSizeHandler()
        this.setState({
          isTextShowing: !this.state.isTextShowing,
          textTimerCounter: -1,
          textToShot: '',
        })
      }
    }
  }

  render() {

    return (
      <div className="glitch-text-holder" style={{ top: this.state.textBoxSize.positionY, left: this.state.textBoxSize.positionX, width: this.state.textBoxSize.width }}>
        <h1>
          <span className="glitch" data-text={this.state.textToShot}>
            {this.state.textToShot}
          </span>
        </h1>
      </div>

    )
  }

}

export default randomTextComponent;