var lsHandle = require('../../src/storage.js');

// override the default cacheTime
lsHandle.options.cacheTime = 5 * 60 * 60;

// define a cacheKeyPrefix
var cacheKeyPrefix = 'lsHandle_example_';

// start a call for some dummy data
var getData = async () => {
	var data = [];
	var endpoints = ['photos', 'posts', 'comments'];
	var fromLocalstorage = false;

	for(var i = 0; i < endpoints.length; i++) {
		var endpoint = endpoints[i];
		var cacheKey = cacheKeyPrefix + endpoint;

		// at first ask the cache if there some data in the cache
		if (lsHandle.shouldUpdateStorage(cacheKey)) {
			data[endpoint] = await fetchData(endpoint);
		}else{

			// if there some Data in the cache load it from the localstorage
			fromLocalstorage = true;
			data[endpoint] = lsHandle.get(cacheKey);
		}
	}

	data['loadedFromCache'] = fromLocalstorage;
	data['options'] = lsHandle.options;

	return data;
};

// go fetch the data from the internet
var fetchData = async (endPoint) => {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://jsonplaceholder.typicode.com/' + endPoint);
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				let data = JSON.parse(xhr.response);
				storeData(data, endPoint);
				resolve(data);
			}
		};
		xhr.send();
	});
};

// after fetchData() write this into the localstorage
var storeData = (data, endPoint) => {
	if(data && endPoint){
		lsHandle.update(cacheKeyPrefix + endPoint, data);
	}
};

/* run example on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
	var zeit0 = performance.now();
	new Promise((resolve, reject) => {
			var data = getData();

			if(data){
				resolve(data);
			}
		}).then( (data) => {
		console.log(data);
		var zeit1 = performance.now();
		console.log("Der Aufruf von getData dauerte " + (zeit1 - zeit0) + " ms.");
	});

});



