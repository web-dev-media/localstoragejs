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

const cacheOptions = {
    cacheTime: 24 * 60,
    cacheKey: 'fooo_bar',
    data: 'foo_abcd',
};

localstorageJs.set(
    cacheOptions.cacheKey,
    cacheOptions.data,
    cacheOptions.cacheTime
);

let dataFromLocalCache = localstorageJs.get(cacheOptions.cacheKey);

localstorageJs.remove(cacheOptions.cacheKey)
```

#### contact
* info@web-dev-media.de
* https://web-dev-media.de
