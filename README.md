# quickapp-axios

网络请求axios工具库在快应用平台上的实现

## 特性

- 从快应用中出创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 支持 Promise API
- 创建建fetch请求别名
- 拦截请求和响应
- 转换请求和响应数据

## 平台支持

![QuickApp](https://doc.quickapp.cn/assets/images/logo.png)

## manifest.json 配置

``` 
{ "name": "system.fetch" }
```

## 安装

使用 npm:

``` bash
$ npm install @quickapp-eco/quickapp-axios
```

## 示例

执行 `GET` 请求

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

执行 `POST` 请求

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

可以通过将相关配置传递给 `fetch` 来进行请求

##### fetch(config)

``` js
// 发送一个 POST 请求
fetch({
    method: 'post',
    url: '/example/12345',
    data: {
        name: 'HeartCloud',
        password: '12345'
    }
});
```

### 请求方法别名

为了方便起见，已经为所有支持的请求方法提供了别名。

##### fetch. get(url[, config])

##### fetch. delete(url[, config])

##### fetch. head(url[, config])

##### fetch. options(url[, config])

##### fetch. post(url[, data[, config]])

##### fetch. put(url[, data[, config]])

##### fetch. patch(url[, data[, config]])

### 创建实例

您可以使用自定义配置创建axios的新实例。

##### fetch. create([config])

``` js
let instance = fetch.create({
    baseURL: 'https://www.example.com/api/',
    header: {
        'X-Custom-Header': 'example'
    }
});
```

## 请求配置

这些是用于发出请求的可用配置选项。 只有url是必需的。 如果未指定method，请求将默认为GET。

## 拦截器

你可以截取请求或响应在被 `then` 或者 `catch` 处理之前

``` js
// 添加请求拦截器
fetch.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加响应拦截器
fetch.interceptors.response.use(response => {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});
```

如果你之后可能需要删除拦截器。

``` js
let myInterceptor = fetch.interceptors.request.use(function() {
    /*...*/ });
fetch.interceptors.request.eject(myInterceptor);
```

你可以将拦截器添加到fetch的自定义实例。

``` js
let instance = fetch.create();
instance.interceptors.request.use(function() {
    /*...*/ });
```

## TypeScript


fetch包括 [TypeScript](http://typescriptlang.org) 定义。

``` typescript
import fetch from '@quickapp-eco/quickapp-axios';
fetch.get('/example?id=12345');
```

## License

[MIT](./LICENSE)
