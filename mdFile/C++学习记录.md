<h1 align="center" id="index">C++学习记录</h1>

## GCC、MinGW、MinGW-w64、TDM-GCC 区别与联系

### GCC

GCC（**GNU Compiler Collection，GNU编译器套件**）是由GNU开发的编程语言译器。GNU编译器套件包括C、C++、 Objective-C、 Fortran、Java、Ada和Go语言前端，也包括了这些语言的库（如libstdc++，libgcj等。）

### MinGW

MinGW (**Minimalist GNU For Windows**) 是一套 GNU 工具集合。开发 MinGW 是为了那些不喜欢工作在 Linux(FreeBSD) 操作系统而留在 Windows 的人提供一套符合 GNU 的 GNU 工作环境。

MinGW包含GNU自由软件集合中的GCC

#### 组成

- 编译器 (支持 C、C++、ADA 和 Fortran )
- GNU 工具
- mingw-get (用于 Windows 平台安装和部署 MinGW 和 MSYS 的命令行安装器)
- mingw-get-inst (用于 GUI 打包)

### MinGW-w64

MinGW-w64 是衍生自 MinGW 的项目。编译目标兼容32位应用程序与64位应用程序

### TDM-GCC

衍生自 MinGW 和 MinGW-w64 的项目，分为 32 位与 64 位两个版本，32 位版本的编译目标仅兼容 32 位应用程序，64位版本的编译目标兼容 32 位应用程序和 64 位应用程序。

## 头文件和源文件

### 头文件如何来关联源文件?

这个问题实际上是说，已知头文件`"a.h"`声明了一系列函数(仅有函数原型,没有函数实现)，`"b.cpp"`中实现了这些函数，那么如果我想在`"c.cpp"`中使用`"a.h"`中声明的这些在`"b.cpp"`中实现的函数，通常都是在`"c.cpp"`中使用`#include "a.h"`,那么`c.cpp`是怎样找到`b.cpp`中的实现呢?其实`.cpp`和`.h`文件名称没有任何直接关系，很多编译器都可以接受其他扩展名。
谭浩强老师的《C程序设计》一书中提到，编泽器预处理时，要对`#include`命令进行"文件包含处理"：将`headfile.h`的全部内容复制到`#include headfile.h"`处。这也正说明了，为什么很多编译器并不care到底这个文件的后缀名是什么----因为`#include`预处理就是完成了一个"复制并插入代码”的工作。

**程序编译的时候，并不会去找` b.cpp`文件中的函数实现，只有在link的时候才进行这个工作**。我们在 `b.cpp`或`c.cpp` 中用`#include "a.h"`实际上是引入相关声明，使得编译可以通过，程序并不关心实现是在哪里，是怎么实现的。源文件编译后生成了目标文件（.o或.obj文件〉，目标文件中，这些函数和变量就视作一个个符号。在link的时候，需要在 `makefile`里面说明需要连接哪个.o或.cbj文件(在这里是b.cpp生成的.o或.obj文件〕，此时，连接器会去这个.o或.obj文件中找在 `b.cpp`中实现的函数，再把他们 build到 `makefile`中指定的那个可以执行文件中。
在VC中，一帮情况下不需要自己写`makefile`，只需要将需要的文件都包括在project中，VC会自动帮你把makefile写好。
通常，编译器会在每个.o或.obj文件中都去找一下所需要的符号，而不是只在某个文件中找或者说找到一个就不找了。因此，如果在几个不同文件中实现了同一个函数，或者定义了同一个全局变量，链接的时候就会提示`"redefined"`.

---
参考链接：[C语言中,头文件和源文件的关系](https://wenku.baidu.com/view/2a120b16a45177232f60a2bd.html)

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
