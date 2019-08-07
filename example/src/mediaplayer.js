let lsHandle = require('../../src/localstorage.js');
let hash = require('object-hash');

class mediaPlayer {
	constructor() {
		this.options = {
			storage_key: 'audio-play-storage',
			currentpos : 0,
			selectors  : {
				player  : '.mediaAudio',
				controls: {
					startStop  : '.playStop',
					mute       : '.mute',
					progressBar: '.progress-bar'
				}
			},
			players    : []
		};

		this.collectPlayers();
		this.addEvents();
	}

	collectPlayers() {
		let self = this;

		if ( self.options.selectors ) {
			let selector = self.options.selectors.player;

			if ( selector ) {
				let players = document.querySelectorAll( selector );
				[].forEach.call( players, function( player ) {
					let playerControls = {};
					let playerSources = {};

					let audio = player.querySelector( 'audio' );
					let sources = player.querySelectorAll( 'source' );

					[].forEach.call( sources, function( source ) {
						let type = source.getAttribute('type');
						playerSources[type] = source.getAttribute('src');
					});

					for ( selector in self.options.selectors.controls ) {
						playerControls[ selector ] = player.querySelector( self.options.selectors.controls[ selector ] );
					}

					self.options.players.push({
						player: player,
						audio: audio,
						controls: playerControls,
						sources: playerSources,
						playerHash: hash(playerSources)
					});

				} );
			}
		}
	}

	addEvents() {
		let mediaPlayerClass = this;
		if(mediaPlayerClass.options.players) {
			mediaPlayerClass.options.players.map(player => {
				[ 'play', 'pause', 'playing', 'progress', 'timeupdate'].map( event => {
					player.audio.addEventListener( event, mediaPlayerClass[event](event) );
				});
			});
		}
	}

	play(event){
		console.log(this);
	}

	pause(event){
		console.log(this);
	}


	playing(event){
		console.log(this);
	}

	progress(event){
		console.log(event);
	}

	timeupdate(event){
		console.log(this);
	}

}

document.addEventListener('DOMContentLoaded', function(event) {
	new mediaPlayer();
});

/*
var mediaPlayer;
var storage;
var storage_key = 'audio-play-storage';
var currentpos = 0;
var progressBar;

function initialiseMediaPlayer() {

	//get the mediaplayer element
	mediaPlayer = document.getElementById( 'media-audio' );

	//update currentpos in at the stoarage
	mediaPlayer.addEventListener('timeupdate', Progress, false );

	//reset the player
	mediaPlayer.addEventListener('ended', Reset, false );

	//inital the storage
	storage = new Persist.Store( storage_key );

	currentpos = storage.get( storage_key );

	if( currentpos > 0 ){
		setPlayPos( currentpos );
	}

	//select the play Button
	playPauseBtn = document.getElementById('play-pause-button');

	muteBtn = document.getElementById('mute-button');

	progressBar = document.getElementById('progress-bar');

	//Supports the default player ui
	mediaPlayer.addEventListener('play', function(){
		storage.set( 'mediaPlayer.isPlaying', 1 );
	}, false );

	mediaPlayer.addEventListener('pause', function(){
		storage.set( 'mediaPlayer.isPlaying', 0 );
	}, false );


}

function setPlayPos( ToSetPos ) {

	mediaPlayer_sources = mediaPlayer.getElementsByTagName( 'source' );

	for( i = 0; i < mediaPlayer_sources.length; ++i ) {

		src = mediaPlayer_sources[i].getAttribute("src").split('#');
		mediaPlayer_sources[i].setAttribute("src", src[0] + '#t=' + ToSetPos );
		mediaPlayer.currentTime = ToSetPos;

	}

	if( storage.get( 'mediaPlayer.isPlaying' ) == 1 ){
		mediaPlayer.play();
	}

}

function Progress() {
	//cache the current pos.
	storage.set( storage_key, mediaPlayer.currentTime);

	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor( ( 100 / mediaPlayer.duration ) * mediaPlayer.currentTime );

	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	progressBar.innerHTML = percentage + '% played';

}

function Reset() {
	storage.set( storage_key, '' );
}

function togglePlayPause() {

	setPlayPos( mediaPlayer.currentTime );

	// If the mediaPlayer is currently paused or has ended
	if ( mediaPlayer.paused || mediaPlayer.ended ) {
		// Change the button to be a pause button
		changeButtonType( playPauseBtn, 'pause' );
		// Play the media
		mediaPlayer.play();


		storage.set( 'mediaPlayer.isPlaying', 1 );
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType( playPauseBtn, 'play' );
		// Pause the media
		mediaPlayer.pause();

		storage.set( 'mediaPlayer.isPlaying', 0 );
	}
}

// Stop the current media from playing, and return it to the start position
function replayMedia() {
	mediaPlayer.pause();
	mediaPlayer.currentTime = 0;
	mediaPlayer.play();
}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}

function togglePos(){

	progressBar.addEventListener('click', function (event) {

		elmwith = progressBar.offsetWidth;

		var xconvert = event.offsetX / elmwith;
		var finalx = (xconvert).toFixed(1);

		time = mediaPlayer.duration * finalx;

		setPlayPos( time );


	});

}*/


