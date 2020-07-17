# quickapp-axios

Promise based HTTP client for the quick-app

## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the quick-app
- Supports the Promise API
- New fetch request alias
- Intercept request and response
- Transform request and response data

## Platform Support

![QuickApp](https://doc.quickapp.cn/assets/images/logo.png)

## Config manifest. json

``` 
{ "name": "system.fetch" }
```

## Installing

Using npm:

``` bash
$ npm install @quickapp-eco/quickapp-axios
```

## Example

Performing a `GET` request

``` js
// Make a request for a user with a given ID
fetch.get('/example?id=12345')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

// Optionally the request above could also be done as
fetch.get('/example', {
        params: {
            id: 12345
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
```

Performing a `POST` request

``` js
fetch.post('/example', {
        name: 'HeartCloud',
        password: '12345'
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
```

## fetch API

Requests can be made by passing the relevant config to `fetch` . 

##### fetch(config)

``` js
// Send a POST request
fetch({
    method: 'post',
    url: '/example/12345',
    data: {
        name: 'HeartCloud',
        password: '12345'
    }
});
```

### Request method aliases

For convenience aliases have been provided for all supported request methods. 

##### fetch. get(url[, config])

##### fetch. delete(url[, config])

##### fetch. head(url[, config])

##### fetch. options(url[, config])

##### fetch. post(url[, data[, config]])

##### fetch. put(url[, data[, config]])

##### fetch. patch(url[, data[, config]])

### Creating an instance

You can create a new instance of fetch with a custom config. 

##### fetch. create([config])

``` js
let instance = fetch.create({
    baseURL: 'https://www.example.com/api/',
    header: {
        'X-Custom-Header': 'example'
    }
});
```

## Request Config

These are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified. 

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch` . 

``` js
// Add a request interceptor
fetch.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
fetch.interceptors.response.use(response => {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});
```

If you may need to remove an interceptor later you can. 

``` js
let myInterceptor = fetch.interceptors.request.use(function() {
    /*...*/ });
fetch.interceptors.request.eject(myInterceptor);
```

You can add interceptors to a custom instance of fetch. 

``` js
let instance = fetch.create();
instance.interceptors.request.use(function() {
    /*...*/ });
```

## TypeScript

fetch includes [TypeScript](http://typescriptlang.org) definitions. 

``` typescript
import fetch from '@quickapp-eco/quickapp-axios';
fetch.get('/example?id=12345');
```

## License

[MIT](./LICENSE)
