"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import {
  createProtocol,
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let ipcEvent;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1140,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // win.loadURL("http://127.0.0.1:5500/public/static/qq.html");
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

ipcMain.once("hapiv", (event, arg) => {
  console.log(arg); // prints "ping"
  // event.returnValue = "pong"; // 同步返回
  ipcEvent = event;
});

/* <select
  class="url-c url-text"
  title="如发现视频无法正常播放请尝试更换视频线路！"
  id="jk"
>
  <option value="http://okjx.cc/?url=" selected="">
    默认一{" "}
  </option>
  <option value="https://jiexi.380k.com/?url=">推荐二 </option>
  <option value="https://jx.99yyw.com/99/?url=">万能线路一 </option>
  <option value="http://jx.618g.com/?url=">线路四 </option>
  <option value="http://jx.598110.com/?url=">万能线路二 </option>
  <option value="https://cdn.yangju.vip/k/?url=">线路六 </option>
  <option value="https://j.wfss100.com/?url=">万能线路三 </option>
  <option value="https://vip.bljiex.com/?v=">万能线路四 </option>
  <option value="https://cs.drgxj.com/?url=">线路七 </option>
  <option value="https://vip.fxw.la/m3u8/index.php?url=">m3u8解析 </option>
  <option value="">直链 </option>
</select>; */

// 拦截iframe中的点击事件
app.on("web-contents-created", (e, webContents) => {
  webContents.on("new-window", (event, url) => {
    event.preventDefault();
    console.log(url);
    ipcEvent.sender.send("hapiv", "https://jx.99yyw.com/99/?url=" + url);

    // win.webContents.loadURL(url);
    // shell.openExternal(url);
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
