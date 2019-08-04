var lsHandle = require('../../src/localstorage.js');

lsHandle.options.cacheTime = 5 * 60 * 60;

var cacheKeyPrefix = 'lsHandle_example_';

var getData = async () => {
	var data = [];
	var endpoints = ['photos', 'posts', 'comments'];

	for(var i = 0; i < endpoints.length; i++) {
		var cacheKey = cacheKeyPrefix + endpoints[i];

		if (lsHandle.shouldUpdateStorage(cacheKey)) {
			let result = await fetchData(endpoints[i]);
			data.push(result);
		}else{
			data.push(lsHandle.get(cacheKey));
		}
	}

	data.push(lsHandle.options);

	return data;
};

var storeData = (data, endPoint) => {
	if(data && endPoint){
		lsHandle.update(cacheKeyPrefix + endPoint, data);
	}
};

var fetchData = async (endPoint) => {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://jsonplaceholder.typicode.com/' + endPoint);
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				let data = JSON.parse(xhr.response);
				storeData(data, endPoint);
				resolve({entry: data});
			}
		};
		xhr.send();
	});
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



