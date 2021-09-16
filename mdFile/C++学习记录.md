<h1 align="center" id="index">C++学习记录</h1>


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
