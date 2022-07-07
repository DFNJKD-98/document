---
title: ES6学习记录
---

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


### for 循环的使用

- **let···in**

  ```js
  let books = [
      {id: 1, name: 'a'},
      {id: 2, name: 'b'},
      {id: 3, name: 'c'},
      {id: 4, name: 'd'},
  ]
  for(let i in books){
      console.log(books[i]);
  }
  /*
  遍历对象是数组时，i就是索引
  遍历对象是对象时，i就是对象的key值
  */
  ```

- **let···of**

  ```js
  let books = [
      {id: 1, name: 'a'},
      {id: 2, name: 'b'},
      {id: 3, name: 'c'},
      {id: 4, name: 'd'},
  ]
  for(let book of books){
      console.log(book);
  }
  /*
  遍历对象是数组时，i就是一个个元素
  遍历对象是对象时，如果没有实现iterator方法则会报错
  */
  ```
  

### Array

#### Array.from

- 从一个类似数组或迭代对象中创建一个新的数组实例

- 可以实现数组去重

  ```js
  Array.from( new Set( [ 1,22,23,22,3,1 ] ) ) // [1, 22, 23, 3]
  ```

#### Array.of

- 将参数中所有值作为元素形成数组。

- 参数可以是不同的类型

  ```js
  console.log(Array.of(1, '2', true)); // [1, '2', true]
  ```

#### Array.find

- 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。

  ```js
  let arr2 = Array.of(1, 2, 3, 4);
  console.log(arr2.find(item => item > 2)); // 3
  ```

#### Array.entries

- 遍历键值对

  ```js
  for(let [key, value] of ['a', 'b'].entries()){
      console.log(key, value);
  }
  
  // 0 "a"
  // 1 "b"
  ```

#### Array.unshift

- 在数组的开头增加一个或多个元素，并返回数组的新长度

#### Array.push

- 可向数组的末尾添加一个或多个元素，并返回新的长度

#### Array.shift

- 用于删除第一个元素并返回数组的第一个元素的值

#### Array.pop

- 用于删除并返回数组的最后一个元素

#### Array.join

- 返回一个字符串，元素是通过指定的分隔符进行分隔

#### Array.concat

- 合并两个或多个数组，返回一个新的数组

