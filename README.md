<p align="center"><img src="./hapv.png" alt="hapv"></p>

electron 开发的一个可以播放,下载国内主流视频的播放器。A player developed by electron that can play and download domestic mainstream video.

> 项目想法来源于[ivideo](https://github.com/phobal/ivideo)，另外增加了视频下载功能。

## 下载

- [mac 下载体验](https://gitee.com/meetqy/hapv/releases)

> windows 可拉取代码自行打包.

## 界面

|              -               |              -               |
| :--------------------------: | :--------------------------: |
| <img src='./preview/1.png' > | <img src='./preview/4.png' > |
| <img src='./preview/2.png' > | <img src='./preview/3.png' > |

## 技术栈&插件

- Electron
- Vue
- Vuex
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

## 项目结构

```tree
src
├─App.vue
├─background.js // electron后台文件
├─element-variables.scss
├─main.js
├─views
├─store
├─router
├─plugins
├─config
|   ├─analysis.js // 解释视频的配置文件
|   ├─index.js
|   └platform.js  // 各大视频平台url，视频解析规则的配置文件
├─components
├─assets
```

## 播放视频原理

1. 利用`electron`框架，返回 web 页面
2. 页面中嵌入 webview，url 为各平台官网
3. 利用`electron`提供的 api，监听页面跳转，劫持链接，返回解析之后的视频链接。

## 快捷小技巧

- 双击导航栏快速全屏
- <kbd>ESC</kbd>取消全屏

## 开发规范

- [开发规范](./开发规范.md)

## 版本记录

最近更新：

- 0.4.0-alpha

- [x] 修改播放视频逻辑
- [x] 首页删除选择解析地址
- [x] 正在播放中增加播放记录
- [x] 播放记录优化
- [x] 没有播放记录优化
- [x] 无正在播放的视频优化

* [版本记录](./版本记录.md)

## 参与贡献

<a href="https://gitee.com/xz2048" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADw0lEQVRoQ+2YaUhUURTH/zOjuTFZUmoN2CJJpW2maFkzmoVIRAummULYJ1tIKhKpD4UfMshEaS+C+lCaVEiEtGCOOGallWZBhQuZ2TaVljqN28Qd8+roYDPw7ns03fNt5p33zvmd/3n33XNl5xOLTfiPTMaBHVxtrrCDCwyuMFfYwSrAW9rBBB2FwxXmCjtYBXhLO5igfNHiLc1b2sEqIHhLy2QyJJ+NhsJZbi5VX08/CveUwdjR89fSBcVOR0h8APUrP1+Hhgcf/nqfPQ6CA5PgYUmzMW/1DJrHt+afuJGhGzMvLz8l1mdFgBSMWIfegIJdWntYbPJlAkwix+doMN7XnSZRXfgGNUUNVpMi3ZB0egXGuTubr/f3mXA1TYvOb79sgrDHiRmwh5crEvIiIVcMKAYTcC29HG3vO0blt+ZQOHwCJtL/7x+vQWOlsK08+HBmwCRAgFoFdep8CmJoN+LK9lKYTEMnwwvX+Vu8tw0VrSg9WWuPaHb5MgUmmcTuD4UqaBJNql7XCu2pAaDJ/p5Ym7kU+NMEpIXzd5baBWCvM3Ng8n4mn4mGs5sTze3mwUroG9vNq/nw97Zwd5l5sWJpzIFJ8uT9XHMwnCpJPlGf3nyHX7A3ZSOqE/VZmyjABGLJlrkIjJlmlafp0UeU5D1jzWp+vmjAJFhCbiSU3m4WYF1tRuTvsFzIWJKLCqz0dkdCrsaC5/aRKrQ817NktHi2qMCxGaFQzR9asUkmhjYjrjiiwnNW+iFia6BVJesrWqFl+O0dHlQUhT2neCAuezndJxs7e6BwksPJRUFzuXO0Gu+efWHe2syBZXIZNp+MgpunC4W5lfnQ/F2O2RdC/yNT1eVtJeju6mUKzRx41d5gTFvsQyFelTRDd+Gl+feKXQsxM3wKvaZv+oGiAxX/LvAstQqaYXvpkSMfUZ9MSa7KcRSyquA1am82MoNmprByshs25mjotERGPmtbRzIHb8haRndhZLC4nq6zOlUJUQUmwGSI33Q8EmREHLTyc3V4rW2xmjM55SBT06BZm6qEgGW204rasQD+EVNpjq0vvqL48OMxc47LVmPCVA/qQ+ZhMhcLbYIrPCPMF9Fpi2ie3YZeXE4tMZ9tjWVkFU88ETV0YADg3rGnePvkk6DMggOnXIqhB3jklIOMgp/r22xKeuQi12vsw8WUuzbda6uT4MC2BpbKjwNLVXmx4nKFxaq0VHG4wlJVXqy4XGGxKi1VHK6wVJUXKy5XWKxKSxWHKyxV5cWKyxUWq9JSxeEKS1V5seL+BkqQpuj1kXC3AAAAAElFTkSuQmCC"></a>
