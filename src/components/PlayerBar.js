import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import { Button } from 'reactstrap';

class PlayerBar extends Component {
  render() {
    return(
      <section className="player-bar">
        <section id="button">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <Ionicon icon="md-skip-backward" />
          </button>
          <button id="play-pause"
          onClick={this.props.handleSongClick}>
            <Ionicon icon={this.props.isPlaying ? 'md-pause' : 'md-play'}/>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <Ionicon icon="md-skip-forward" />
          </button>
        </section>
        <section id="time-control">
        <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
         <input
           type="range"
           className="seek-bar"
           value={(this.props.currentTime / this.props.duration) || 0}
           max="1"
           min="0"
           step="0.01"
           onChange={this.props.handleTimeChange}
         />
         <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control" >
          <Ionicon icon="md-volume-down"/>
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
           />
          <Ionicon icon="md-volume-up"/>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
