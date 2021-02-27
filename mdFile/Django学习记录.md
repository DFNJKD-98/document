<h2 align="center">Django学习记录</h2>

> **数据库的操作**
>
> - 安装
> - 创建用户 + 授权
> - 连接
>   - 数据库——终端创建数据库（字符编码）
>   - 数据表——终端、ORM、pymysql
>   - 数据行——增、删、改、查
> - 关闭

### 自己开发Web框架

> Web应用（网站）：
>
> - HTTP协议（头和体）
>   - 发送：请求头`\r\b` 请求体
>   - 请求：响应头`\r\b` 响应体
>
> - 浏览器（socket客户端）
>
>   2. www.cnblogs.com(xx.xx.xx.xx)
>
>      sk.socket()
>
>      sk.connect((xx.xx.xx.xx))
>
>      sk.send('我想要xxx')
>
>   5. 接收
>   6. 连接断开
>
> - 博客园(socket服务端)
>
>   1. 监听ip和端口(xx.xx.xx.xx)
>
>      while True:
>
>      ​	用户 = 等待用户连接
>
>      3. 收到'我想要xxx'
>
>      	4. 响应：'好'
>
>      用户断开
> ---
> Web框架：
>
> - 框架组成：
>
>   a. socket服务端
>
>   b. 根据URL不同返回不同的内容
>
>   ​	路由系统：URL -> 函数
>
>   c. 字符串返回给用户
>
>   ​	模板引擎渲染：
>
>   ​		HTML充当模板（特殊字符）
>
>   ​		自己创造任意数据
>
>   ​	字符串替换
>
> - 框架种类：
>
>   - a, b, c ——> Tornado
>   - [x], b, c ——>wsgiref + Django
>   - [x], b, [x] ——> wsgiref + flask + jinjia2

- **socket**

  - TCP：不断开就可以一直发

- **http协议**

  - HTTP：无状态、短链接

- **HTML知识**

- **数据库（pymysql，SQLAlchemy）**

- **简易框架**

  ```python
  import socket
  sock = socket.socket()
  sock.bind(('127.0.0.1',4000))
  sock.listen(5)
  
  # 静态网页
  def f1(request):
      # 处理用户的请求，并返回相应的内容
      # request：用户请求的所有信息
      f = open('index.html', 'rb')
      data = f.read()
      f.close()
      return data
  
  # 动态网页——替换模板中的特殊字符
  def f2(request):
      f = open('article.html', 'r', encoding="utf-8")
      data = f.read()
      f.close()
      import time
      ctime = time.time()
      data = data.replace('@@sw@@', str(ctime))
      return bytes(data, encoding='utf-8')
  
  # 从数据库获取数据，拼接好替换模板内的特殊字符
  def f3(request):
      f = open('userlist.html', 'r', encoding='utf-8')
      data = f.read()
      f.close()
      content_list = ''
      # user_list即数据库中的数据
      for row in user_list:
          tp = '<tr><td>{}</td><td>{}</td><td>{}</td></tr>.format(row['id'],row['username'],row['password'])'
          content_list += tp
      data.replace('@@@@@', content_list)
      return bytes(data, encoding='utf-8')
  
  # 使用jinjia模块
  def f4(request)
  	with open('host.html', 'r', encoding='utf-8') as f:
          data = f.read()
  	from jinjia2 import Template
      template = Template(data)
      # user_list即数据库中的数据
      data = template.render(user_list = user_list)
      return bytes(data, encoding='utf-8')
  
  routers = [
      ('/', f1)
      ('/aaa', f1),
      ('/bbb', f2),
      ('/userlist.html', f3),
      ('/host.html', f4)
  ]
  
  while True:
  	conn, addr = sock.accept() # hang住
  	# 有人来连接了
  	# 获取用户发送的数据
  	data = conn.recv(8096)
      data = str(data, encoding='utf-8')
      headers, bodys = data.split('\r\n\r\n')
      temp_list = headers.split('\r\n')
      method, url, protocal = temp_list[0].split(' ')
      # 根据不同的url返回不同的数据
      conn.send(b'HTTP/1.1 200 OK\r\n\r\n')
      func_name = None
      # 找寻对应的url
      for item in routers:
          if item[0] == url:
              func_name = item[1]
              break
      if func_name:
          response = func_name(data)
      else:
          response = b'404'
      conn.send(response)
  	conn.close()
  ```


### 项目初始操作

- **安装**

  ```
  pip3 install django
  ```

- **建立项目**

  ```
  django-admin startproject projectname
  ```

- **运行项目**

  ```
  python manage.py runserver 127.0.0.1:8080
  ```

- **项目目录**

  - settings.py ——> Django配置文件
  - urls.py ——> 路由系统：url —> 函数
  - wsgi.py ——> 用于定义Django用什么socket：wsgiref, uwsgi
  - manage.py ——> 对当前Django程序所有操作可以基于 `python manage.py runserver manage.py`

- **修改urls.py**

  ```python
  from django.shortcuts import HttpResponse
  def login(request):
      # HttpResponse只可以返回单引号中的内容
  	# return HttpResponse('login')
      return render(request, 'login.html')
  urlpatterns = [
      url(r'^login/', login),
  ]
  ```

- **配置项目settings.py**

  ```python
  import os
  # settings.py->TEMPLATES->DIRS修改为：
  # TEMPLATES->DIRS指定了模板HTML的路径
  'DIRS':[os.path.join(BASE_DIR, 'templates')]
  ```

  ```python
  # settings.py->STATIC_URL:
  # STATIC_URL决定了链接静态文件时的前缀
  STATIC_URL = '/static/'
  
  # settings.py->STATICFILES_DIRS:
  # STATICFILES_DIRS指定了真实的静态文件所在的目录
  STATICFILES_DIRS = (
  	os.path.join(BASE_DIR, 'styles'),
  )
  ```

  ```python
  # settings.py->MIDDLEWARE:
  MIDDLEWARE = [
      'django.middleware.security.SecurityMiddleware',
      'django.contrib.sessions.middleware.SessionMiddleware',
      'django.middleware.common.CommonMiddleware',
      # 'django.middleware.csrf.CsrfViewMiddleware',
      'django.contrib.auth.middleware.AuthenticationMiddleware',
      'django.contrib.messages.middleware.MessageMiddleware',
      'django.middleware.clickjacking.XFrameOptionsMiddleware',
  ]
  ```


### 模板语言特殊标记

  ```python
request.method
request.GET
request.POST
******************************************
HttpResponse('直接写要显示的字符串')
return redirect('要跳转的网址')
return render(request, 'login.html', {'xxx': 'yyy'})
******************************************
'{{xxx}}'->直接显示xxx对应的内容
'{{xxx.0}}'->显示列表中的第一项值
'{{xxx.k1}}'->显示字典中 k1 的值
******************************************
# for 模板语言
{% for item in users %}
	<h3>{{item}}</h3>
{% endfor %}
# if 模板语言
{% if row.id == current_student_info.class_id %}
	<option selected value="{{row.id}}">{{row.title}}</option>
{% else %}
	<option value="{{row.id}}">{{row.title}}</option>
{% endif %}
  ```


### 模态对话框

```html
<style>
    .hide{
        display:none;
    }
    .shadow{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        opacity: 0.4;
        z-index: 999;
    }
    .modal{
        z-index: 1000;
        position: fixed;
        left: 50%;
        top: 50%;
        height: 300px;
        width: 400px;
        background-color: white;
        margin-left: -200px;
        margin-top: -150px;
    }
</style>
<body>
    <div>
        <a onclick="showModal();">对话框添加</a>
    </div>
    <div class="shadow hide" id="shadow"></div>
    <div class="modal hide" id="modal">
        <p>
            <input id="title" type="text" name="title"/>
        </p>
        <input type="button" value="提交" onclick="AjaxSend();"/>
        <input type="button" value="取消" onclick="cancleModal();"/>
        <span id="errormsg"></span>
    </div>
    <script src="/static/jquery-min.js"></script>
    <script>
    	function showModal(){
            document.getElementById('shadow').classList.remove('hide');
            document.getElementById('modal').classList.remove('hide');
        }
        function cancleModal(){
            document.getElementById('shadow').classList.add('hide');
            document.getElementById('modal').classList.add('hide');
        }
        function AjaxSend(){
            $.ajax({
                url: '/modal_add_class/',
                type: 'POST',
                data: {'title': $('#title').val()},
                // 当服务端处理完成后，返回数据时，该函数自动调用
                // data = 服务端返回的值
                success: function(data){
                    console.log(data);
                    if(data == 'ok'){
                        // 手动刷新
                        location.href = '/classes/';
                        // 当前页面刷新
                        // location.reload();
                    }else{
                        $('#errormsg').text(data);
                    }
                }
            })
        }
    </script>
</body>
```

### 模板引擎之母版

**后台管理布局**

```html
<!-- 该内容作为布局模板，存放于 layout.html 文件中 -->

<link rel="stylesheet" href="/static/css/bootstrap.css">
<link rel="stylesheet" href="/static/css/font-awesome.css">
<style>
    body{
        margin: 0;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .hide{
        display: none;
    }
    .pg-header{
        height: 48px;
        min-width: 1190px;
        background-color: #204d74;
        line-height: 48px;
    }
    .pg-header .logo{
        font-size: 18px;
        color: white;
        width: 200px;
        text-align: center;
        border-right: 1px solid white;
    }
    .pg-header .rmenus a{
        display: inline-block;
        padding: 0 15px;
        color: white;
    }
    .pg-header .rmenus a:hover{
        background-color: #269abc;
    }
    .pg-header .avatar{
        padding: 0 20px;
    }
    .pg-header .avatar img{
        border-radius: 50%;
    }
    .pg-header .avatar .user-info{
        position: absolute;
        width: 200px;
        top: 48px;
        right: 2px;
        z-index: 100;
        display: none;
        color: white;
        background-color: #269abc;
        border: 1px solid #ddd;
    }
    .pg-header .avatar:hover .user-info{
        display: block;
    }
    .pg-header .avatar .user-info a{
        display: block;
        text-align: center;
    }
    .menus{
        width: 200px;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 48px;
        border-right: 1px solid #dddddd;
    }
    .content{
        min-width: 990px;
        position: absolute;
        left: 200px;
        right: 0;
        top: 48px;
        bottom: 0;
        overflow: scroll;
        z-index:99;
    }
    .pg-body .menus a{
        display: block;
        text-align: center;
        padding: 10px 5px;
        border-bottom: 1px solid #ffffff;
    }
</style>
<body>
    <div class="pg-header">
    	<div class="logo left">后台管理</div>
        <div class="avatar right" style="position:relative">
            <img style="width:50px;height:40px;" src="/static/img/0.png">
            <div class="user-info">
                <a>个人资料</a>
                <a>注销</a>
            </div>
        </div>
        <div class="rmenus right">
            <a><i class="fa fa-commenting-o" aria-hidden="true"></i>消息</a>
            <a><i class="fa fa-envelope-o" aria-hidden="true"></i>邮件</a>
        </div>

    </div>
    <div class="pg-body">
    	<div class="menus">
            <a><i class="fa fa-futbol-o" aria-hidden="true"></i>班级管理</a>
            <a><i class="fa fa-futbol-o" aria-hidden="true"></i>学生管理</a>
            <a><i class="fa fa-futbol-o" aria-hidden="true"></i>老师管理</a>
        </div>
        <div class="content">
            <ol class="breadcrumb">
                <li><a href="#">首页</a></li>
                <li><a href="#">班级管理</a></li>
                <li class="active">添加班级</li>
            </ol>
            {% block xx %}{% endblock %}
        </div>
    </div>
</body>
<script>
</script>
```

```html
<!-- 该文件引用布局模板 -->

{% extends 'layout.html' %}

{% block xx %}
<!-- 这部分书写的内容会替换到模板中block xx的位置 -->
<h3>引用模板中的内容</h3>
{% endblock %}
```

### Cookie

> 保存在浏览器端的" 键值对 "
> 服务端可以向用户浏览器端写Cookie
> 客户端每次发请求时，会携带Cookie
>
> HTTP无状态 => 连接断开后，无法判断下次用户的身份 => 根据Cookie判断用户身份 
>
> 应用：投票；用户登录验证；

- **写Cookie**

  ```python
  def login(request):
  	if request.method == "GET":
  		return render(request, 'login.html')
  	else:
  		user = request.POST.get('username')
  		pwd = request.POST.get('password')
  		if user == 'alex' and pwd == '123':
  			obj = redirect('/classes/')
               # 设置Cookie
               # 本质上就是在响应头中写入Cookie
               # max_age=10 表示Cookie在浏览器上只存在10秒
               # expires=具体的超时日期
  			obj.set_cookie('ticket', 'tongguo', max_age=10)
  			return obj
  ```

- **请求中查询Cookie**

  ```python
  tk = request.COOKIES.get('ticket')
  # 如果Cookie中有对应的键值对，即返回后台管理页面
  # 如果Coolie中没有对应的键值对，则tk为None，执行if语句中的内容
  if not tk:
  	return redirect('/login/')
  ```

- **签名Cookie**

  ```python
  # 设置签名Cookie
  obj.set_signed_cookie('ticket', '123123', salt="aaa")
  # 获取签名Cookie
  tk = request.get_signed_cookie('ticket', salt='aaa')
  ```

- **装饰器？？？？？？？？？？？？？**



-----

### 程序目录介绍

> ```python
> # 创建app文件, 封装项目的一个功能
> python manage.py startapp app01
> ```
>
> project
>
> - app01
> - app02
> - app03
>
> 每个app文件都含有项目的一个功能。建立不同的文件，可以使项目的不同功能更加的独立。

- **migrations** 数据库相关使用
- **admin.py** 配置后台管理的相关操作，和数据库也有所相关
- **apps.py** 当前app相关的配置文件可以写在其中
- **models.py** 写一些类与数据库进行对应，根据类创建数据库表
- **tests.py** 快速的做一些单元测试
- **views.py** 做一些业务处理

### 路由系统

- **动态路由**

  ```python
  urlpatterns = [
      # url中可以写正则表达式
      # 伪静态写法：
  	url(r'^edit/(\w+).html$', views.edit)
      '''
      url(r'^edit/(?P<a1>\w+)/(?P<a2>\w+)/', views.edit)
      上面一行为可命名写法，会直接将对应的值传递到a1和a2,之后在函数中a1和a2的顺序就无所谓了
      上述两种url的写法不可以搭配使用！！！
      '''
      
      '''
      正则表达式中终止符的使用
      url(r'^edit$', views.edit)
      如此使用终止符，则只可以匹配到url为localhost:8000/eidt
      诸如：localhost:8000/edit/ 和 localhost:8000/eidtaaa 都将匹配不成功
      如果不加终止符，上述两种url都可匹配成功
      '''
  ]
  # a1 的值即为(\w+)
  def edit(request, a1):
      return HttpResponse(a1)
  ```

- **路由分发**

  ```python
  # 导入include
  from django.conf.urls import url, include
  urlpatterns = [
      url(r'^app01/', include('app01.urls')),
      url(r'^app02/', include('app02.urls')),
      # 设置默认页面
      url(r'^', views.index)
  ]
  ```

- **别名反向生成URL**

  ```python
  urlpatterns = [
      # name参数用于日后根据名字反生成url
      url(r'^index/(\d+)', views.index, name='n1')
  ]
  ```

  ```python
  # 根据名字获取URL
  from django.urls import reverse
  def index(request):
      # 参数args决定了动态url中的动态内容
      v = reverse('n1', args=(123,))
      
      '''
      不同的url，反向生成时动态内容写法不一样
      url(r'^index/(?P<a1>\d+)/', views.index, name='n1')
      v = reverse('n1', kwargs={'a1': 123})
      '''
      
      print(v)
      # v就是/index/123/
  ```

  **模板中使用别名**

  ```html
  <!-- 后面的 i和j 可以替换url中的动态参数，如果参数更多，则继续加即可 -->
  <form method="POST" action="{% url "n1" i j %}">
      <input type="text" />
      <input type="password" />
  </form>
  ```

### ORM

- **ORM操作之概要与准备**

  ```python
  # settings.py
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME':'dbname',
          'USER': 'root',
          'PASSWORD': 'xxx',
          'HOST': '',
          'PORT': '',
          }
  }
  ```

  ```python
  # _init_.py
  import pymysql
  pymysql.version_info = (1, 4, 13, "final", 0)
  pymysql.install_as_MySQLdb()
  ```

- **创建数据表**

  > **Django中创建表时，如果没有创建自增主键的一列，会自动创建一列自增且为主键的一列。这一列的名字为id**

  - **单表**

    ```python
    # app01=>models.py 编写表对应的类
    from django.db import models
    class UserInfo(models.Model):
        # int类型 自增
        nid = models.AutoField(primary_key=True)
        # models.BigAutoField() bigint类型
        username = models.CharField(max_length=32)
        password = models.CharField(max_length=64)
        '''
        修改表时，可以直接修改类，然后重新执行命令
        如果新增一列时，需要告诉新增列的值，可以为空，也可以有默认值
        age = models.IntegerField(null=True)
        age = models.IntegerField(default=1)
        '''
    ```

    ```python
    # 注册app
    INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app01',
    ]
    ```

    ```python
    # 命令创建数据库表
    python manage.py makemigrations
    python manage.py migrate
    ```

  - **一对多表**

    ```python
    # 部门
    class UserGroup(models.Model):
    	title = models.CharField(max_length=32)
    # 员工
    class UserInfo(models.Model):
        username = models.CharField(max_length=32)
        password = models.CharField(max_length=64)
        # 创建对应关系
        ug = models.ForeignKey("UserGroup", null=True)
    ```

- **单表增删改查**

  ```python
  from app01 import models
  def index(request):
      # 新增
      models.UserGroup.objects.create(title='销售部')
      models.UserInfo.objects.create(username='root',password='123',ug_id=1)
      
      # 查找
      # 1、UserInfo, ut是FK字段——正向操作
      group_list = models.UserInfo.objects.all() # QuerySet类型（列表）
      for row in group_list:
          print(row.username, row.password,row.ug_id,row.ug.title)
          '''
          row.ug_id 可以获取到关联表的id
          row.ug.title 可以通过id获取到关联表中的title内容
          '''
      # 2、UserGroup,表名小写_set.all()——反向操作
         # 取出UserGroup中的第一行
      obj = models.UserGroup.objects.all().first()
      print("用户类型", obj.id, obj.title)
         # 循环打印关联到第一行的UserInfo的信息
      for row in obj.userinfo_set.all():
          print(row.username, row.password)
      # 3、过滤器
         # id等于1，且title等于root
      models.UserGroup.objects.filter(id=1,title='root')
         # id大于1，且title等于root
      models.UserGroup.objects.filter(id__gt=1,title='root')
         # id小于1，且title等于root
      models.UserGroup.objects.filter(id__lt=1,title='root')
      
      # 删除
      models.UserGroup.objects.filter(id=2).delete()
      
      # 更新
      models.UserInfo.objects.filter(id=2).update(title='公关部')
  ```

- **ORM插入多条数据**

  ```python
  from django.db import models
  # Create your models here.
  class Test(models.Model):
      name = models.CharField(max_length=32, null=True, default=None)
      age = models.IntegerField(max_length=32, null=True, default=None)
  ```
  
  ```python
  def index(request):
      # ############### 添加数据 ###############
      import random
      product_list_to_insert = list()
      for x in range(100):
          product_list_to_insert.append(Test(name='apollo'+str(x), age=random.randint(18,89)))
      Test.objects.bulk_create(product_list_to_insert)
  return render(request, 'index.html')
  ```
  
- **ORM连表操作**

  ```python
  models.UserGroup.objects.all() => #返回所有记录
  models.UserGroup.objects.filter(id=2) => #返回id等于2的记录
  models.UserGroup.objects.all().first()=> #返回第一个记录，即第一行
  models.UserGroup.objects.all().values('id','title') => #返回结果为字典
  models.UserGroup.objects.all().values_list('id','title') => #以元组返回
  obj.userinfo_set.all() => #以列表返回关联到obj记 录的记录
  models.UserGroup.objects.all().values('id','title','ut__title') #跨表操作
  models.UserGroup.objects.all().values_list('id','title','ut__title') #跨表操作
  ```
  
- **排序**

  ```python
  # 类——表的建立
  class UserInfo(models.Model):
      name = models.CharField(max_length=16)
      age = models.IntegerField()
      ut = models.ForeignKey('UserType')
      
      # 该方法在输出该类的对象时，转为输出return回去的内容
      def __str__(self):
          return "%s-%s"&(self.id,self.name,)
  ```

  ```python
  # views.py
  
  # 根据id从小到大排序
  user_list = models.UserInfo.objects.all().order_by('id')
  # 根据id从大到小排序
  user_list = models.UserInfo.objects.all().order_by('-id')
  # 优先按照id进行排序，如果id相同，则按照name进行排序
  user_list = models.UserInfo.objects.all().order_by('id'，'name')
  ```

- **分组**

  ```python
  # views.py
  
  from django.db.models import Count,Sum,Max,Min
  # 根据ut进行分组
  # v = models.UserInfo.objects.values('ut_id').annotate(xxxx=Count('id'))
  v = models.UserInfo.objects.values('ut_id').annotate(xxxx=Count('id')).filter(xxxx__gt=2)
  '''
  models.UserInfo.objects.filter(id__gt=2).values('ut_id').annotate(xxxx=Count('id')).filter(xxxx__gt=2)
  filter在前面生成where语句
  filter在后面生成having语句
  '''
  # 查看生成的sql语句
  print(v.query)
  ```

- **基本操作**

  ```python
  models.UserInfo.objects.filter(id__gt=1) # 大于
  models.UserInfo.objects.filter(id__lt=1) # 小于
  models.UserInfo.objects.filter(id__gte=1) # 大于等于
  models.UserInfo.objects.filter(id__lte=1) # 小于等于
  models.UserInfo.objects.filter(id__in=[1,2,3]) # 查找id是1，2，3的记录
  models.UserInfo.objects.filter(id__range=[1,2]) # between and 查找id在1到2之间的记录
  models.UserInfo.objects.filter(name__startswith='xxxx') # 查找以xxxx开始的name
  models.UserInfo.objects.filter(name__endswith='xxxx') # 查找以xxxx结束的name
  models.UserInfo.objects.filter(name__contains='xxxx') # 查找包含xxxx的name
  models.UserInfo.objects.exclude(id=1) # 查找id不等于1的记录
  ```

- **更多操作请查看：https://www.cnblogs.com/wupeiqi/articles/6216618.html**

- **F** ——用于更新数据库

  ```python
  from django.db.models import F
  # 将所有用户的年龄加1
  models.UserInfo.objects.all().update(age=F('age')+1)
  ```

- **Q** —— 用于构造复杂的查询条件

  ```python
  # Q的使用方法一
  from django.db.models import Q
  condition = {
  	'id':1,
  	'name':'root'
  }
  # 此处可以使用字典，但是要有**
  models.UserInfo.objects.filter(**condition)
  # 也可以使用Q的对象
  models.UserInfo.objects.filter(Q(id=1))
  models.UserInfo.objects.filter(Q(id=1) | Q(id=2)) # 查找id为1或2的记录
  models.UserInfo.objects.filter(Q(id=1) & Q(name='alex')) # 查找id为1且name为alex的记录
  ```

  ```python
  # Q的使用方法二
  q1 = Q()
  q1.connector = 'OR'
  q1.children.append(('id__gt', 1))
  q1.children.append(('id__lt', 10))
  q1.children.append(('id', 9))
  
  q2 = Q()
  q2.connector = 'OR'
  q2.children.append(('c1', 1))
  q2.children.append(('c1', 10))
  q2.children.append(('c1', 9))
  
  q3 = Q()
  q3.connector = 'AND'
  q3.children.append(('id', 3))
  q3.children.append(('id', 4))
  
  q1.add(q3, 'OR')
  con = Q()
  con.add(q1, 'AND')
  con.add(q2, 'AND')
  # (id__gt=1 or id__lt=10 or id=9 or(id=3 and id=4))and(cl=1 or c1=10 or c1=9)
  models.UserInfo.objects.filter(con)
  ```

### 视图

- **CBV**

  ```python
  # urls.py
  urlpatterns = [
      url(r'^login.html$', views.Login.as_view())
  ]
  ```

  ```python
  # views.py
  from django.views import View
  class Login(View):
      '''
      get	    查
      post	创建
      put	    更新
      delete  删除
      '''
      def dispatch(self, request, *args, **kwargs):
          return super(Login, self).dispatch(request, *args, **kwargs)
      '''
      如果需要批量操作get或post，则可以修改dispatch
      dispatch的本质是getattr方法
      修饰器
      '''
      def get(self, request):
          return HttpResponse('Login.get')
      def post(self, request):
          return HttpResponse('Login.post')
  ```

- **内置分页**

  ```python
  from django.core.paginator import Paginator, Page
  current_page = request.GET.get('page')
  user_list = models.UserInfo.objects.all()
  paginator = Paginator(user_list,10) #10条一页
  '''
  per_page: 每页显示条目数量
  count: 数据总个数
  num_pages: 总页数
  page_range: 总页数的索引范围，如：（1，10），（1，200）
  page: page对象
  '''
  posts = paginator.page(current_page)
  '''
  has_next: 是否有下一页
  next_page_number: 下一页页码
  has_previous: 是否有上一页
  previous_page_number: 上一页页码
  object_list: 分页之后的数据列表
  number: 当前页
  paginator: paginator对象
  '''
  return render(request, 'index.html', {'posts': posts})
  ```

  ```html
  <div>
      {% if posts.has_previous %}
      <a href="/index.html?page={{posts.previous_page_number}}">上一页</a>
      {% endif %}
      {% if posts.has_next %}
      <a href="/index.html?page={{posts.next_page_number}}">下一页</a>
      {% endif %}
  </div>
  ```

- **自定义分页**

  ```python
  # view.py
  def custom(request):
      # 表示用户当前想要访问的页码: 8
      current_page = request.GET.get('page')
      current_page = int(current_page)
      # 每页显示的数据的个数
      per_page = 10
      all_count = models.UserInfo.objects.all().count()
      # models.UserInfo.objects.all()[起始位置：结束位置]
      # 1页 0：10
      # 2页 10：20
      # 3页 20：30
      start = (current_page-1)*per_page
      end = current_page * per_page
      user_list = models.UserInfo.objects.all()[start:end]
      return render(request, 'custom.html', {'user_list':user_list})
  
  ```

  ```html
  <!-- custom.html-->
  <body>
      <ul>
          {% for row in user_list %}
          	<li>{{row.name}}</li>
          {% endfor %}
      </ul>
  </body>
  ```

  **封装为类**

  ```python
  # 分页类
  class PageInfo(object):
      def __init__(self, current_page, all_count, per_page, base_url, show_page=3):
          try:
              # 当前页码
              self.current_page = int(current_page)
          except Exception as e:
              self.current_page = 1
          # 每页的显示的数量
          self.per_page = per_page
          # 计算总页码
          a, b = divmod(all_count, per_page)
          if b:
              a += 1
          self.all_pager = a
          self.show_page = show_page
          self.base_url = base_url
  
      # 访问数据库的起始位置
      def start(self):
          return (self.current_page - 1) * self.per_page
  
      # 访问数据库的结束位置
      def end(self):
          return self.current_page * self.per_page
  
      def pager(self):
          page_list = []
          half = int((self.show_page - 1) / 2)
          # 如果数据总页数小于11
          if self.all_pager < self.show_page:
              begin = 1
              stop = self.all_pager + 1
          # 如果数据总页数大于11
          else:
              # 如果当前页小于等于5，永远显示1，11
              if self.current_page <= half:
                  begin = 1
                  stop = self.show_page + 1
              else:
                  if self.current_page + half > self.all_pager:
                      begin = self.all_pager - self.show_page + 1
                      stop = self.all_pager + 1
                  else:
                      begin = self.current_page - half
                      stop = self.current_page + half + 1
          if self.current_page <= 1:
              prev = "<li class='page-item'><a class='page-link' href='#'>上一页</a></li>"
          else:
              prev = "<li class='page-item'><a class='page-link' href='%s?page=%s'>上一页</a></li>" % (self.base_url, self.current_page - 1,)
          page_list.append(prev)
          for i in range(begin, stop):
              if i == self.current_page:
                  temp = "<li class='page-item active'><a class='page-link' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i,)
              else:
                  temp = "<li class='page-item'><a class='page-link' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i,)
              page_list.append(temp)
          if self.current_page >= self.all_pager:
              nex = "<li class='page-item'><a class='page-link' href='#'>下一页</a></li>"
          else:
              nex = "<li class='page-item'><a class='page-link' href='%s?page=%s'>下一页</a></li>" % (self.base_url, self.current_page + 1,)
          page_list.append(nex)
        return ''.join(page_list)
  ```
  
  ```python
  # view.py
  def custom(request):
      all_count = models.UserInfo.objects.all().count()
      page_info = PageInfo(request.GET.get('page'), all_count, 6, 'custom.html', 5)
      user_list = models.UserInfo.objects.all()[page_info.start():page_info.end()]
    return render(request, 'custom.html', {'user_list': user_list, 'page_info': page_info})
  ```
  

### 底部

