# Example

The quick-app-fetch service usage example

## Platform Support

![QuickApp](https://doc.quickapp.cn/assets/images/logo.png)

## Installing

Using npm:

```bash
$ npm install
```

## Debug

```bash
$ npm run start
```

[See Quick App](https://doc.quickapp.cn/tutorial/overview/debug.html)

## Directory structure

```
├── build --------------- 编译器生成的临时文件
├── dist ---------------- 编译后生成的rpk文件
├── sign ---------------- 打包用的签名文件
│   ├── debug
│   └── release
├── src    源文件
│   ├── assets ---------- 资源文件
│   ├── services -------- 公共服务，处理各种业务数据  
│   │   ├── api --------- 接口
│   │   └── http -------- http拦截器
│   ├── views ----------- 页面视图
│   │   └── Home
│   ├── app.ux ---------- APP文件，可引入公共脚本，暴露公共数据和方法等
│   └── manifest.json --- 项目配置文件
├── tools --------------- 工具
└── package.json -------- 定义项目需要的各种模块及配置信息
```
