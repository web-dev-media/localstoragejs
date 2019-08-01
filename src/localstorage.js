const localstorage = {
	options: {
		cacheTime    : 24 * 60 * 60,
		cacheTimetKey: '',
		cacheKey     : ''
	},

	cacheTime: function() {
		let self = this;

		let functions = {
			updateKey: function() {
				if ( !self.options.cacheTimetKey ) {
					self.options.cacheTimetKey = self.options.cacheKey + '_cacheTime';
				}
			},

			key: function() {
				return self.options.cacheTimetKey;
			},

			get: function() {
				let t = localStorage.getItem( self.options.cacheTimetKey );
				return t ? t : this.set();
			},

			set: function() {
				return localStorage.setItem( self.options.cacheTimetKey, (
					new Date().getTime() + self.options.cacheTime
				) );
			},

			purge: function() {
				localStorage.removeItem( self.options.cacheTimetKey );
			}
		};

		functions.updateKey();

		return functions;
	},

	shouldUpdateStorage: function( localStorageKey ) {
		if ( !this.get( localStorageKey ) ) {
			return true;
		}

		return this.cacheTime().get() ? this.cacheTime().get() < new Date().getTime() : true;
	},

	update: function( localStorageKey, data ) {
		localStorage.setItem( this.cacheTime().key(), (
			new Date().getTime() + this.options.cacheTime
		) );
		localStorage.setItem( localStorageKey, JSON.stringify( data ) );
	},

	get: function( localStorageKey ) {
		this.options.cacheKey = localStorageKey ? localStorageKey : false;
		this.sorageData = localStorage.getItem( this.options.cacheKey );

		return this.sorageData ? JSON.parse( this.sorageData ) : null;
	},

	purge: function( localStorageKey ) {
		localStorage.removeItem( localStorageKey );
		this.cacheTime().purge();
	}

};

module.exports = localstorage;
