import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Table } from 'reactstrap';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      curentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      hovering: false
  };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.state.currentSong = album.songs[0];
  }

  componentDidMount() {
    this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     }

   componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
    console.log(this.state.album.songs.findIndex(song => this.state.currentSong === song));
    console.log("currentSong: " + this.state.currentSong);
  }




  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    console.log("setSong called");
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    console.log('clicked');
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song); }
      this.play();
    }

}
    onMouseEnter(index) {
      this.setState({ hovering: index })


    }

    onMouseLeave() {
      this.setState({ hovering: false })
    }

    getIcon(song, index) {
      if(this.state.hovering === index  && !this.state.isPlaying) {
        return (
          <Ionicon icon="md-arrow-dropright-circle"/>
        )
      } else if (this.state.isPlaying && this.state.currentSong === song) {
        return (
          <Ionicon icon="md-pause"/>
        )

      } else {
        return index + 1;
      }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
  }

  handleNextClick() {
    let currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    console.log(currentIndex);
    if (currentIndex < this.state.album.songs.length -1) {
      currentIndex = currentIndex + 1;
      const newSong = this.state.album.songs[currentIndex];
      this.setSong(newSong);
      this.play();
      }
    }

    handleTimeChange(evt) {
         const newTime = this.audioElement.duration * evt.target.value;
         this.audioElement.currentTime = newTime;
         this.setState({ currentTime: newTime });
       }

    formatTime(tis) {
      if (isNaN(tis)){
        return "-:--";
      } else {
      let minutes = Math.floor(tis / 60);
      let seconds = Math.floor(tis % 60);
      let time = minutes + ":" + seconds;
      if (seconds < 10) {
        return minutes + ":0" + seconds;
      } else {
        return time;
      }
      };
    }

    handleVolumeChange(evt) {
      this.audioElement.volume = evt.target.value;

    }








  render() {
    return(
      <section className="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column"/>
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
            {
              this.state.album.songs.map( (song, index ) =>
                <tr className="song"
                key={index} onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.onMouseEnter(index)}
                onMouseLeave={() => this.onMouseLeave()}>
                  <td>{this.getIcon(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
              )
            }
           </tbody>
         </table>
         <PlayerBar
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         currentTime={this.audioElement.currentTime}
         duration={this.audioElement.duration}
         volume={this.state.volume}
         formatTime={(tis) => this.formatTime(tis)}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
         handleTimeChange={(evt) => this.handleTimeChange(evt)}
         handleVolumeChange={(evt) => this.handleVolumeChange(evt)}
         />
      </section>
    );
  }
}

export default Album;
