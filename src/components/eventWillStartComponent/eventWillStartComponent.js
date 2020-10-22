import React from 'react';
import album from '../../images/public-memory-image.jpg'

const eventWillStart = (props) => {
  return (
    <div className="event-will-start">
      <div className="album-image-holder">
        <img className="album-image" src={album} alt="" onClick={props.startHandler} />
      </div>
      <p>Song: As you wish</p>
      <p>Author: Public Memory</p>
      <p>Model: Maria Castillo</p>
      <p>Shinobi Gakiya Project</p>
    </div>
  );

}

export default eventWillStart;