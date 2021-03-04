## ES6

### ES6 常见语法的使用

- let const
- 箭头函数 （vue学习记录中有所记录）
- 方法、属性的简写
- 模板字符串
- Promise

### Async、Await 和 Promise 的使用

> async 用于申明一个异步的 function
>
> await 用于等待一个异步方法执行完成

- **使用例子**

  ```js
  async function test(){
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              let data = 'hello, nodejs';
              resolve(data);
          }, 1000)
      })
  }
  
  async function main(){
      let data = await test();
      console.log(data); // 打印出 hello, nodejs
  }
  main();
  ```

  