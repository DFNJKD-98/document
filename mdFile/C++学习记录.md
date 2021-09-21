<h1 align="center" id="index">C++学习记录</h1>



## 头文件和源文件

C++程序在构建的时候，有两个主要的时期

compile-time
linkage-time

在compile-time，编译是以编译单元进行的——每一个cpp源文件就是一个编译单元，compiler会逐cpp进行编译，每一个cpp中的h头文件都包含进这个单元进行编译（编译时需要，函数声明，不然无法进行语法检查），一个编译单元只要保证所有要用到的符号都可以查找到就可以了。这产生一个obj目标文件，该cpp中所有定义的符号都在里面。

在linkage-time所有被编译好的obj文件被linker进行符号链接以产生最终文件，但符号定义必须保证存在和唯一

## typedef 和 #define

### typedef

- 可以使用它来为类型取一个新的名字

  ```C++
  typedef unsigned char BYTE;
  ```

- 也可以使用 typedef 来为用户自定义的数据类型取一个新的名字

  ```c++
  typedef struct Books
  {
     char  title[50];
     char  author[50];
     char  subject[100];
     int   book_id;
  } Book;
  ```

### #define

- #define是 C 指令，用于为各种数据类型定义别名

### 二者区别

- **typedef** 仅限于为类型定义符号名称，**#define** 不仅可以为类型定义别名，也能为数值定义别名，比如可以定义 1 为 ONE
- **typedef** 是由编译器执行解释的，**#define** 语句是由预编译器进行处理的

## 命名空间

### 为什么有命名空间

- 解决多人协作时标识符重复命名的问题

### 什么是命名空间

```c++
namespace A{
    int name='bob';
    void show(){
        cout<<"hello"<<endl;
	}
}
```

### 使用命名空间

#### 作用域运算符的使用

```c++
int main(){
    std::cout<<"Hello World!"<<endl;
}
```

#### 匿名空间

- 意味着命名空间中的标识符只能在本文件内访问，相当于给这个标识符加上了static，使得其可以作为内部连接

  ```c++
  namespace{
      d=30;
  }
  int main(){
      cout<<d<<endl;
  }
  ```

#### 给命名空间取别名

- `namespace 新名字=旧名字`

  ```c++
  int main(){
      namespace newA = A;
      cout<<newA::a<<endl;
  }
  ```

#### using

- using声明是让命名空间中的某个标识符可以直接使用

  ```c++
  namespace A{
      int a=10;
  }
  int main(){
      using A::a;
      cout<<a<<endl; // a -> 10
  }
  ```

- **注意using声明了某个变量后，在该作用域不能定义同名的变量**

  ```c++
  namespace A{
      int a=10;
  }
  int main(){
      using A::a;
      cout<<a<<endl;
      int a; // 这是错误的，不能再定义同名的变量了
  }
  ```

#### using namespace

- 让某个命名空间中的所有标识符可以直接使用，不需要使用作用域运算符

- **同时可以在该作用域内定义同名的变量**

  ```c++
  namespace A{
      int a=10;
      int b=20;
      int c=30;
  }
  int main(){
      using namespace A;
      cout<<a<<endl; // a->10
      cout<<b<<endl; // b->20
      cout<<c<<endl; // c->30
      int a=40;
      cout<<a<<endl; // a->40
  }
  ```


### 注意

- 命名空间只能写在全局

- 命名空间可以嵌套命名空间

  ```c++
  namespace A{
      int a=10;
      namespace B{
          int b=20;
      }
  }
  ```

- 命名空间是开放的，随时可以加入新成员。但是，新成员只能在加入后使用

  ```c++
  namespace A{
      int c=30;
  }
  // 命名空间A中不只是有变量c，还有上面的变量a和命名空间B
  ```

- 声明和实现可分离

  ```c++
  // test.h
  namespace A{
      void func1();
      void func2(int param);
  }
  // test.cpp
  void A::func1(){
      cout<<"A::func1"<<endl;
  }
  void A::func2(int param){
      cout<<"B::func2"<<endl;
  }
  ```

## 引用

### 什么是引用

- **引用是c++对c的重要扩充。**在c/c++中指针的作用基本都是一样的，但是c++增加了另外一种给函数传递地址的途径，这就是按引用传递(pass-by-reference)

- 引用可以作为一个已定义变量的别名

- 引用在C++内部的实现是**常指针**(别人可以变，自己不能)，注意区别于**指针常量**(指向谁，谁不能变)

  ```c++
  Type& ref = val;
  // Type* const ref = &val;
  // const修饰变量ref，指定变量ref的内容不可改变；其表现为，指针不能再指向别的内存空间
  ```

### 基本使用

- 使用格式：`Type &ref=value`

  ```c++
  void test01(){
  	int a = 10;
  	//给变量a取一个别名b
  	int& b = a;
  	cout << "a:" << a << endl;
  	cout << "b:" << b << endl;
  	cout << "------------" << endl;
  	//操作b就相当于操作a本身
  	b = 100;
  	cout << "a:" << a << endl;
  	cout << "b:" << b << endl;
  	cout << "------------" << endl;
  	//一个变量可以有n个别名
  	int& c = a;
  	c = 200;
  	cout << "a:" << a << endl;
  	cout << "b:" << b << endl;
  	cout << "c:" << c << endl;
  	cout << "------------" << endl;
  	//a,b,c的地址都是相同的
  	cout << "a:" << &a << endl;
  	cout << "b:" << &b << endl;
  	cout << "c:" << &c << endl;
  }
  ```

### 数组引用

  - 数组也是一种数据类型
  - `int`和`int *`是不同的数据类型

  ```c++
  int arr[] = {1,2,3,4,5};
  
  // 第一种方式
  typedef int(MY_ARR)[5]; // 定义数组类型
  MY_ARR &arref = arr; // 建立引用，相当于 int &b = a
  
  // 第二种方式
  int (&arref2)[5] = arr;
  
  // 第三种方式
  typedef int(&MY_ARR2)[5]; // 建立引用数组类型
  MY_ARR2 arref3 = arr;
  ```

### 指针引用

### 常量引用

- 使用格式：`const Type &ref = val;`

```c++
void test01(){
	int a = 100;
	const int& aRef = a; //此时aRef就是a
	//aRef = 200; 不能通过aRef修改值
	a = 100; //OK
	cout << "a:" << a << endl;
	cout << "aRef:" << aRef << endl;
}
void test02(){
	//不能把一个字面量赋给引用
	//int& ref = 100;
	//但是可以把一个字面量赋给常引用
	const int& ref = 100; //编译器会这样子做：int temp = 100; const int& ret = temp;
}
```

### 注意

- `&`在此不是求地址运算，而是起标识作用
- 必须在声明引用变量时进行初始化
- 引用初始化之后不能改变，即b是a的别名后，不能改为是c的别名
- 不能有NULL引用。必须确保引用是和一块合法的存储单元关联
- 类型标识符是指目标变量的类型
- 不能把一个字面量赋给引用，但是可以把一个字面量赋给常引用
- const修饰的引用(即常引用)，不能修改(自己的内存空间和被指向的内存空间都不能改变)
- 函数不要返回局部变量的引用，如果要返回，可以讲变量定义为static，在预处理程序时，提前分配空间
