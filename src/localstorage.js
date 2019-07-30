const localstorage = {
	options: {
		cacheTime: 24 * 60 * 60,
		transientKey: '',
		cacheKey: ''
	},

	transient: function(){
		let self = this;

		let functions =  {
			updateKey: function () {
				if(!self.options.transientKey) {
					self.options.transientKey = self.options.cacheKey + '_transient';
				}
			},

			getKey: function () {
				return self.options.transientKey;
			},

			get: function () {
				let t = localStorage.getItem(self.options.transientKey);
				return t ? t : this.set();
			},

			set: function () {
				return localStorage.setItem(self.options.transientKey, (new Date().getTime() + self.options.cacheTime));
			},

			purge: function () {
				localStorage.removeItem(self.options.transientKey);
			}
		};

		functions.updateKey();

		return functions;
	},

	shouldUpdateStorage: function(localStorageKey) {
		if ( !this.get(localStorageKey) ) {
			return true;
		}

		return this.transient().get() ? this.transient().get() < new Date().getTime() : true;
	},

	update: function(localStorageKey, data){
		localStorage.setItem( this.transient().getKey(), (new Date().getTime() + this.options.cacheTime ));
		localStorage.setItem( localStorageKey, JSON.stringify(data));
	},

	get: function(localStorageKey){
		this.options.cacheKey = localStorageKey ? localStorageKey : false;
		this.sorageData = localStorage.getItem( this.options.cacheKey );

		return this.sorageData ? JSON.parse(this.sorageData) : null;
	},

	purge: function(localStorageKey) {
		localStorage.removeItem(localStorageKey);
		this.transient().purge();
	}
};

module.exports = localstorage;
