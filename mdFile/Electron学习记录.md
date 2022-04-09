<h1 align="center" id="index">Electron学习记录</h1>

## 安装Electron包

- 设置淘宝镜像

  ```sh
  npm config set registry=http://registry.npmmirror.com/
  ```
  
- 安装electron包

  ```sh
  npm install electron --save-dev
  ```

- 问题解决

  > Electron failed to install correctly, please delete node_modules/electron and try installing again

  - 手动下载electron压缩包，如：`electron-v13.5.1-win32-x64.zip`。
    **注意**：别的版本在创建无边框窗口时可能存在bug，这里跟随vscode中electron的版本
  
  - 终端进入到`node_modules/electron`目录，编辑器打开`install.js`
  
  - 修改`install.js`文件如下内容：
  
    ```js
    // downloads if not cached
    // downloadArtifact({
    //   version,
    //   artifactName: 'electron',
    //   force: process.env.force_no_cache === 'true',
    //   cacheRoot: process.env.electron_config_cache,
    //   checksums: process.env.electron_use_remote_checksums ? undefined : require('./checksums.json'),
    //   platform,
    //   arch
    // }).then(extractFile).catch(err => {
    //   console.error(err.stack);
    //   process.exit(1);
    // });
    extractFile('./electron-v13.5.1-win32-x64.zip')
    ```
  
  - 终端执行`node install.js`即可解决问题

## vue-cli3 中 electron 环境搭建

  - 创建项目

    ```
    vue create my-project
    ```

  - 添加插件

    ```
    vue add electron-builder
    ```

  - 使用开发模式运行

    ```
    npm run electron:serve
    ```

  - 打包程序

    ```
    npm run electron:build
    ```
    

## Hello World

- index.html

  ```html
  <body>
      <h2>Hello,World</h2>
  </body>
  ```

- main.js

  ```js
  let electron = require('electron')
  let app = electron.app
  let BrowserWindow = electron.BrowserWindow
  let mainWindow = null //声明要打开的主窗口
  app.on('ready', () => {
      mainWindow = new BrowserWindow({
      width: 1100,
      height: 680,
      minHeight: 680,
      minWidth: 1100,
      webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          enableRemoteModule: true,
      },
      });
      // 加载 html 页面
      mainWindow.loadFile('index.html')
      // 监听窗口的关闭事件，若关闭，则赋值为null，否则内存会占用越来越多
      mainWindow.on('closed', ()=> {
          mainWindow = null
      })
  })
  ```

- **运行程序**

  ```
  electron .
  ```

## Remote模块

```js
const btn = this.document.querySelector("#btn")
const BrowserWindow = require('electron').remote.BrowserWindow
window.onload = ()=>{
	btn.onclick = ()=>{
        newWindow = new BrowserWindow({
            width:  500,
            height: 500
        })
        newWin.loadFile('index2.html')
        newWin.on('closed',()=>{
            newWin = null
        })
    }
}
```

## Background图片路径问题

- **组件 data 中 require 引入文件**

  ```js
  data(){
      return{
          backgroundImage: require('../assets/01.jpg'),
          testImage: require('D://01.jpg')
      }
  }
  ```

  > - 绝对路径 和 相对路径 都可以
  > - 可以含有中文
  > - **路径中不能有空格**

- **refs 设置背景图片**

  ```js
  methods: {
      setBackground(){
          this.$refs.bigBox.style.background = `url(${this.backgroundImage}) no-repeat`;
          this.$refs.bigBox.style.backgroundSize = '100% 100%';
          this.$refs.bigBox.style.filter = 'blur(14px)';
      }
  }
  ```

- **毛玻璃效果**

  ```css
  .big-box{
      height: 100vh;
      display: flex;
      align-items: stretch;
      z-index: 1;
      position: relative;
      overflow: hidden;
  }
  .big-box .background{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      margin: -30px;
  }
  ```

  ```html
  <div class="big-box">
      <side-bar/>
      <main-win class="main-win"/>
      <div class="background" ref="bigBox"></div>
  </div>
  ```

  

