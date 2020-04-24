<p align="center"><img src="./hapv.png" alt="hapv"></p>

一个快速，简单，干净可以播放并且下载国内主流视频的播放器。A fast, simple, clean player that can play and download mainstream video in China.

## 下载

- [v0.1.x-alpha](https://gitee.com/meetqy/hapv/releases)

## 界面

1. 打开软件

![](./preview/1.png)

2. 搜索视频

![](./preview/2.png)

3. 直接观看

![](./preview/3.png)

## 技术栈&插件

- Electron
- Vue
- vue-cli-plugin-electron-builder
- Element

下载功能需安装 [annie](https://github.com/iawia002/annie)

## 如何运行

```
git clone git@github.com:meetqy/hapv.git
```

```
cd hapv
```

```
npm install
```

```
npm start
```

## 原理

1. 利用`electron`框架，返回 web 页面
2. 页面中嵌入 webview，url 为各平台官网
3. 利用`electron`提供的 api，监听页面跳转，劫持链接，返回解析之后的视频链接。

## 开发规范

- [开发规范](./开发规范.md)

## v0.1.x-alpha 待完善

- [x] 非新窗口没有监听
- [ ] 爱奇艺空白页面重定向问题
- [x] 进入视频播放无法返回
- [ ] mac 打包 Windows 问题
- [x] 前进后退刷新

## v0.2.0-alpha backlog

- [ ] 播放记录
