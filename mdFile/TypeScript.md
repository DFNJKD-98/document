## TypeScript

### 安装

- **下载Node.js**
- **安装Node.js**
- **使用 npm 全局安装 ts** —— `npm i -g typescript`
- **测试是否安装成功** —— `tsc --version`

### Hello TS

- **新建 ts 文件** —— `hellots.ts`

- **书写内容**

  ```js
  console.log('hello ts');
  ```

- **编译 ts 文件**

  `tsc hellots.ts`

- **编译成功后，生成 js 文件** —— `hellots.js`

---

### 项目环境搭建

- **创建一个简答的项目目录结构**

  ```
  │  index.html
  ├─build
  │      webpack.config.js
  └─src
          main.ts
  ```

  目录和文件夹结构分析:

  - index.html是跑在浏览器上的模块文件
  - build文件夹中用于存放webpack的配置信息
  - src用于存放我们之后编写的所有 TypeScript 代码

- **使用 npm 管理项目的依赖** —— 初始化 package.json 文件

  ```
  npm init -y
  ```

- **安装 TypeScript 的本地依赖**

  ```
  npm install typescript
  ```

- **初始化 tsconfig.json 文件**

  > 该文件用于存放对TypeScript的相关配置

  ```
  tsc --init
  ```

- **安装 tslint **(可选)

  ```
  npm install tslint -g
  ```

  **初始化 tslint 的配置文件**

  ```
  tslint -i
  ```

- **配置 webpack**

  - 安装 webpack 相关的依赖

    ```
    npm install webpack webpack-cli webpack-dev-server -D
    ```

  - 在 package.json 中添加启动命令

    ```js
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "serve": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config build/webpack.config.js"
    },
    ```

  - 添加 webpack 的其他相关依赖

    - cross-env

      > 可以在 webpack.config.js 中通过 process.env.NODE_ENV 来获取当前是开发还是生产环境

      ```
      npm install cross-env -D
      ```

    - ts-loader

      > 解析 .ts 文件

      ```
      npm install ts-loader -D
      ```

    - html-webpack-plugin

      > 编译后的代码需要对应的html模块作为它的运行环境，所以我们需要使用html-webpack-plugin来将它插入到对应的模板中：

      ```
      npm install html-webpack-plugin -D
      ```

  - 配置 webpack.config.js 文件

    ```js
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    
    module.exports = {
      entry: "./src/main.ts",
      output: {
        filename: "build.js"
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
          }
        ]
      },
      devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
      devServer: {
        contentBase: "./dist",
        stats: "errors-only",
        compress: false,
        host: "localhost",
        port: 8080
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./index.html"
        })
      ]
    };
    ```

- **代码测试**

  - 编写 main.ts 文件

    ```js
    // src/main.ts
    
    let message: string = "Hello World";
    console.log(message);
    ```

  - 启动服务

    ```
    npm run serve
    ```



---

### TypeScript 类型声明

```js
// 声明变量并指定类型
// 声明变量如果不指定类型，则变量类型为any
let a: number;
a = 10;
a = 'hello'; // 会报错

// 声明完变量直接进行赋值
let b: boolean = true;

// 如果变量的声明和赋值是同时进行的， TS可以自动对变量进行类型检测
let c = 'hello';
c = true; // 会报错

// 指定函数参数的类型
function sum(a: number, b: number){
    return a + b;
}
sum(123, 456);

// 指定函数返回值的类型
function sum2(a: number, b: number): number{
    return a + b;
}
let result = sum(123, 456);
```

```js
// 可以使用 | 来连接多个类型（联合类型）
let b: 'male' | 'female';
b = 'male';
b = 'female';
b = 'hello'; // 会报错

let c: boolean | string;
c = true;
c = 'hello';
c = 12; // 会报错

// 可以使用 & 连接多个类型
let j: {name: string} & {age: number};
j = {name: '孙悟空', age: 18};

// 类型的别名
type myType = 1|2|3|4|5;
let j: myType;
let k: myType;
let m: myType;
```

- number

  ```js
  let a: number = 10;
  ```

- string

  ```js
  let b: string = 'hello';
  ```

- boolean

  ```js
  let c: boolean = true;
  ```

- any

  ```js
  // any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
  let d: any; // let d; 效果相同
  d = 10;
  d = 'hello';
  d = true;
  ```

- unknown

  ```js
  // unknown 表示未知类型的值
  let e: unknown;
  e = 10;
  e = 'hello';
  e = true;
  
  let s: string;
  // d 的类型为 any， 它可以赋值给任意变量！！！
  s = d; // 不会报错
  // e 的类型为 unknown， 它不可以赋值为其他变量！！！
  // unknown 实际上就是一个类型安全的 any
  s = e; // 会报错
  // 解决方法1
  if(typeof e === "string"){
      s = e;
  }
  // 解决方法2
  // 类型断言， 可以用来告诉解析器变量的实际类型
  /*
  *  语法
  *  	  变量 as 类型
  * 	  <类型> 变量
  */
  s = e as string
  s = <string>e;
  ```

- void

  ```js
  function fn() :number{
      return 123;
  }
  function fn() :boolean{
      return true;
  }
  // void 表示函数不会有返回值，如果有返回值返回，就会报错
  function fn() :void{
      return;            //不会报错
      return undefined;  //不会报错
      return null;       //不会报错
  }
  ```

- never

  ```js
  // never 表示永远不会有返回值
  function fn() :never{
      return;            //会报错
      return undefined;  //会报错
      return null;       //会报错
  }
  ```

- object

  ```js
  // object 表示一个 js 对象
  let a: object;
  a = {};
  a = function(){};
  // {} 用来指定对象中可以包含哪些属性
  // 语法： {属性名：属性值， 属性名：属性值}
  // 在属性名后边加上?, 表示属性是可选的
  let b: {name: string, age?: number};
  b = {name: '孙悟空'};
  b = {name: '孙悟空', age: 18};
  
  // [propName: string]: any 表示任意类型的属性
  let c: {name: string, [propName: string]: any};
  
  let d: (a: number, b: number) => number;
  d = function (n1, n2): number{
      return 10;
  }
  ```

- array

  ```js
  /*
  	数组的类型声明： 
  		类型[]
  		Array<类型>
  */
  // string[] 表示字符串数组，数组中的元素只能是字符串
  let e: string[];
  // number[] 表示数值数组
  let f: number[];
  // Array<number> 表示数值数组
  let g: Array<number>;
  ```

- tuple

  ```js
  // 元组，元组就是固定长度的数组
  let h: [string, string];
  h = ['hello', 'typescript']; // 不会报错
  h = ['hello', 'type', 'script']; // 会报错
  ```

- enum

  ```js
  enum Gender{
      Male = 0,
      Female = 1
  }
  let i: {name: string, gender: Gender};
  i = {
      name: '孙悟空',
      gender: Gender.Male // male
  }
  console.log(i.gender === Gender.Male);
  ```

- 字面量

---

### 编译选项

- 自动编译文件

  - 编译文件时，使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

  - 示例：

    - ```
      tsc xxx.ts -w
      ```

- 自动编译整个项目

  - 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件

  - 但是能直接使用tsc命令的前提是，要先在项目根目录下创建一个ts的配置文件 tsconfig.json

  - tsconfig.json 是一个json文件，添加配置文件后，只需tsc命令即可完成对整个项目的编译

  - 配置选项：

    - include

      - 定义希望被编译文件所在的目录

      - 默认值： ["/"]

      - 示例：

        - ```json
          "include": ["src/**/*", "tests/**/*"]
          ```

        - 上述示例中，所有src目录和tests目录下的文件都会被编译

    - exclude

      - 定义需要排除在外的目录

      - 默认值：["node_modules", "bower_components", "jspm_packages"]

      - 示例：

        - ```js
          "exclude": ["./src/hello/**/*"]
          ```

        - 

