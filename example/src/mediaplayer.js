let lsHandle = require('../../src/storage.js');
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

		lsHandle.options.cacheTime = -1;

		this.collectPlayers();
		this.addEvents();
		this.setAllPlayerTime();
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

					if ( sources && audio) {
						[].forEach.call( sources, function( source ) {
							let type = source.getAttribute( 'type' );
							playerSources[ type ] = source.getAttribute( 'src' );
						} );

						for ( selector in self.options.selectors.controls ) {
							playerControls[ selector ] = player.querySelector( self.options.selectors.controls[ selector ] );
						}

						self.options.players.push( {
							node  : player,
							audio   : audio,
							controls: playerControls,
							sources : playerSources,
							hash    : hash( playerSources )
						} );
					}
				} );
			}
		}
	}

	addEvents() {
		let mediaPlayerClass = this;
		if(mediaPlayerClass.options.players) {
			mediaPlayerClass.options.players.map(player => {
				[ 'play', 'pause', 'progress', 'timeupdate', 'loadeddata'].map( event => {
					player.audio.addEventListener( event, (e) => mediaPlayerClass[event](player, e) );
				});
			});
		}
	}

	setPlayerTime(player){
		player.time = player.time ? player.time : lsHandle.get(player.hash + '_currentTime');

		if(player.time) {
			let sources = player.node.querySelectorAll( 'source' );

			[].forEach.call( sources, function( source ) {
				source.setAttribute( 'src', source.getAttribute( 'src' ) + '#t=' + player.time );
			} );



			//this.autoPlay(player);
		}
	}

	setAllPlayerTime(){
		this.options.players.map(player => {
			this.setPlayerTime(player);
		});
	}

	play(player){
		this.setPlayerTime(player);
		lsHandle.update(player.hash + '_isPlaying', 1);
	}

	pause(player){
		lsHandle.update(player.hash + '_isPlaying', 0);
	}

	loadeddata(player, event){
		console.log({
			player: player,
			event: event,
			isPlaying: lsHandle.get(player.hash + '_isPlaying'),
			playerTime: lsHandle.get(player.hash + '_currentTime')
			});

		if(lsHandle.get( player.hash + '_isPlaying' )) {
			player.audio.focus();
		}
	}

	progress(player, event){
		player.time = lsHandle.get(player.hash + '_currentTime');
		player.progress = Math.floor( ( 100 / player.audio.duration ) * player.time );
	}

	timeupdate(player, event){
		if(player.audio.paused) {
			player.audio.currentTime = lsHandle.get( player.hash + '_currentTime' );
		}else{
			lsHandle.update( player.hash + '_currentTime', player.audio.currentTime );
		}

	}

}

document.addEventListener('DOMContentLoaded', function(event) {
	new mediaPlayer();
	function startPlayback() {
		return document.querySelector('.mediaAudio audio').play();
	}

	console.log('Attempting to play automatically...');

	startPlayback().then(function() {
		console.log('The play() Promise fulfilled! Rock on!');
	}).catch(function(error) {
		console.log('The play() Promise rejected!');
		console.log('Use the Play button instead.');
		console.log(error);

		var playButton = document.querySelector('.mediaAudio .playStop');
		// The user interaction requirement is met if
		// playback is triggered via a click event.
		playButton.addEventListener('click', startPlayback);
		playButton.hidden = false;
	});
});