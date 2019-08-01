var lsHandle = require('../../localstorage.js');

lsHandle.options.cacheTime = 1000;

var cacheKeyPrefix = 'lsHandle_example_';

var getData = async () => {
	var endpoints = ['photos', 'posts', 'comments'];

	for(var i = 0; i < endpoints.length; i++) {
		var cacheKey = cacheKeyPrefix + endpoints[i];

		if (lsHandle.shouldUpdateStorage(cacheKey)) {
			await fetchData(endpoints[i]);
		}

		console.log(lsHandle.get(cacheKey));
	}
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
				storeData(JSON.parse(xhr.response), endPoint);
				resolve();
			}
		};
		xhr.send();
	});
};

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
	getData();
});



