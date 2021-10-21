class Localstorage {
	options = {
		cacheTime    : 24 * 60 * 60,
		cacheTimeKey: '',
		cacheKey     : ''
	};

	/**
	 * Cache time methods to handle the storage cache time
	 *
	 * @namespace RecommendationStorage/cacheTime
	 * @return {Object}
	 */
	cacheTime() {
		let self = this;

		return {

			/**
			 * Setter for cache time key it will used at the
			 * localstorage to identify the right cache time for an entry.
			 *
			 * @namespace RecommendationStorage/cacheTime/setKey
			 * @return void
			 */
			setKey: () => {
				let cacheTimeKey = self.options.cacheKey ? self.options.cacheKey + '_cacheTime' : '';

				if ( cacheTimeKey ) {
					self.options.cacheTimeKey = cacheTimeKey;
				}
			},

			/**
			 * Getter for cache time key.
			 *
			 * @namespace RecommendationStorage/cacheTime/key
			 * @return {string} cacheTimeKey
			 */
			key: () => {
				return self.options.cacheTimeKey;
			},

			/**
			 * Getter for cache timestamp.
			 *
			 * @namespace RecommendationStorage/cacheTime/time
			 * @return {string|null} timestamp
			 */
			time: () => {
				if(!self.options.cacheTimeKey){
					return null;
				}

				let t = localStorage.getItem( self.options.cacheTimeKey );
				return t ? t : null;
			},

			/**
			 * Setter for cache timestamp.
			 *
			 * @namespace RecommendationStorage/cacheTime/set
			 * @return {void|null}
			 */
			set: () => {
				if(!self.options.cacheTimeKey){
					return null;
				}

				localStorage.setItem( self.options.cacheTimeKey, (
					new Date().getTime() + self.options.cacheTime
				) );
			},

			/**
			 * Remove cacheTime entry.
			 *
			 * @namespace RecommendationStorage/cacheTime/purge
			 * @return {void|null}
			 */
			purge: () => {
				if(!self.options.cacheTimeKey){
					return null;
				}

				localStorage.removeItem( self.options.cacheTimeKey );
			}
		};
	};

	/**
	 * Validate if should update the storage entry
	 * @namespace RecommendationStorage/shouldUpdate
	 * @param {String} storageKey
	 * @return {Boolean}
	 */
	shouldUpdate( storageKey ) {
		if ( !this.get( storageKey ) ) {
			return true;
		}

		return this.cacheTime().get() ? this.cacheTime().get() < new Date().getTime() : true;
	};

	/**
	 * Update the storage entry
	 * @namespace RecommendationStorage/update
	 * @param {String} storageKey
	 * @param {String} data
	 * @return {void}
	 */
	update( storageKey, data ) {
		this.options.cacheKey = storageKey ? storageKey : false;

		if(this.options.cacheTime > 1) {
			localStorage.setItem( this.cacheTime().getKey(), (
				new Date().getTime() + this.options.cacheTime
			) );
		}

		localStorage.setItem( storageKey, JSON.stringify( data ) );
	};

	/**
	 * get the storage entry
	 * @namespace RecommendationStorage/get
	 * @param {String} storageKey
	 * @return {String}
	 */
	get( storageKey ) {
		this.options.cacheKey = storageKey ? storageKey : false;
		return JSON.parse( localStorage.getItem( this.options.cacheKey ));
	};

	/**
	 * purge the storage entry
	 * @namespace RecommendationStorage/purge
	 * @param {String} storageKey
	 * @return {void}
	 */
	purge( storageKey ) {
		localStorage.removeItem( storageKey );
		this.cacheTime().purge();
	};
};

module.exports = Localstorage;