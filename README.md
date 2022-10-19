# localstorage made simple
**a lightweight javascript to handel localstorage.**

## Install
```sh
npm install --save @web-dev-media/localstorage
```

## Usage
#### require
```js
const localstorageJs = require("@web-dev-media/localstorage");

const testOptions = {
    cacheTime: 24 * 60,
    cacheKey: 'fooo_bar',
    data: 'foo_abcd',
};

localstorageJs.get(testOptions.cacheKey);



localStorageHandle.set(testOptions.cacheKey, testOptions.data, testOptions.cacheTime);
```

#### contact
* info@web-dev-media.de
* https://web-dev-media.de
