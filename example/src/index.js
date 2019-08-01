const localstorageHandler = require('../../localstorage.js');

let getData = async () => {
  await fetchData('https://jsonplaceholder.typicode.com/photos');
  await fetchData('https://jsonplaceholder.typicode.com/posts');
  await fetchData('https://jsonplaceholder.typicode.com/comments');
};

let storeData = (data) => {
    console.log(data);
};

let fetchData = async (url) => {
  await fetch(url)
    .then(response => response.json())
    .then(json => storeData(json))
};

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  getData();
});


