import React, { Component } from 'react';
import Ionicon from 'react-ionicons';

class PlayerBar extends Component {
  render() {
    return(
      <section className="player-bar">
        player bar goes here
        <section id="button">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <Ionicon icon="md-skip-backward" />
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <Ionicon icon={this.props.isPlaying ? 'md-pause' : 'md-play'}/>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <Ionicon icon="md-skip-forward" />
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">-:--</div>
          <input type="range" className="seek-bar" value="0" />
          <div className="total-time">-:--</div>
        </section>
        <section id="volume-control">
          <Ionicon icon="md-volume-low"/>
          <input type="range" className="seek-bar" value="80" />
          <Ionicon icon="md-volume-high"/>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
