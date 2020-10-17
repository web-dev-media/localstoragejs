const localstorage = {
	options: {
		cacheTime    : 24 * 60 * 60,
		cacheTimeKey: '',
		cacheKey     : ''
	},

	cacheTime: function() {
		let self = this;

		let functions = {
			setKey: function() {
				let cacheTimeKey = self.options.cacheKey ? self.options.cacheKey + '_cacheTime' : '';

				if ( cacheTimeKey ) {
					self.options.cacheTimeKey = cacheTimeKey;
				}
			},

			getKey: function() {
				return self.options.cacheTimeKey;
			},

			get: function() {
				let t = localStorage.getItem( self.options.cacheTimeKey );
				return t ? t : this.set();
			},

			set: function() {
				return localStorage.setItem( self.options.cacheTimeKey, (
					new Date().getTime() + self.options.cacheTime
				) );
			},

			purge: function() {
				localStorage.removeItem( self.options.cacheTimeKey );
			}
		};

		functions.setKey();

		return functions;
	},

	shouldUpdateStorage: function( localStorageKey ) {
		if ( !this.get( localStorageKey ) ) {
			return true;
		}

		return this.cacheTime().get() ? this.cacheTime().get() < new Date().getTime() : true;
	},

	update: function( localStorageKey, data ) {
		this.options.cacheKey = localStorageKey ? localStorageKey : false;

		if(this.options.cacheTime > 1) {
			localStorage.setItem( this.cacheTime().getKey(), (
				new Date().getTime() + this.options.cacheTime
			) );
		}

		localStorage.setItem( localStorageKey, JSON.stringify( data ) );
	},

	get: function( localStorageKey ) {
		this.options.cacheKey = localStorageKey ? localStorageKey : false;
		return JSON.parse( localStorage.getItem( this.options.cacheKey ));
	},

	purge: function( localStorageKey ) {
		localStorage.removeItem( localStorageKey );
		this.cacheTime().purge();
	}

};

module.exports = localstorage;