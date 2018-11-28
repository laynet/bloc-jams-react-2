import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      curentSong: album.songs[0],
      isPlaying: false,
      hovering: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    console.log('clicked');
    const isSameSong = this.state.curentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {this.setSong(song); }
      this.play();
    }

}
    onMouseEnter(index) {
      console.log('hovering', index);
      this.setState({ hovering: index })
      //show the fucking button here? idk. kill me

    }

    onMouseLeave() {
      this.setState({ hovering: false })
    }

    getIcon(song, index) {
      if(this.state.hovering === index) {
        return (
          <Ionicon icon="md-arrow-dropright-circle"/>
        )
      } else if (this.state.isPlaying && this.state.currentSong === index) {
        return (
          <Ionicon icon="md-pause"/>
        )

      } else {
        return index + 1;
      }
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
             <col id="song-number-column" />
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
      </section>
    );
  }
}

export default Album;

//You can return the song number there as well rather than using  `<td>{index+1}</td>`

//Also, since we are setting `this.state.hovering` to an index value (rather than to true) in` onMouseEnter()`, we should test it against the parameter `index` inside `getIcon` to determine whether a particular song is being hovered over.
