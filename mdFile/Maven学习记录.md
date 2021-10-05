<h1 align="center" id="index">Maven 学习记录</h1>

## 一、了解Maven

### 1.1 什么是Maven

- Maven 翻译为"专家"、"内行"
- Apache 下的一个纯 Java 开发的开源项目
- Maven 是一个项目管理工具，对 Java 项目进行构建、依赖管理
- Maven 也可被用于构建和管理各种项目，例如 C#，Ruby，Scala 和其他语言编写的项目
- Maven 使用约定优于配置的原则

### 1.2 Maven的功能

Maven 能够帮助开发者完成以下工作：

- 构建
- 文档生成
- 报告
- 依赖
- SCMs
- 发布
- 分发
- 邮件列表

### 1.3 约定目录结构

| 目录                               | 目的                                                         |
| :--------------------------------- | :----------------------------------------------------------- |
| ${basedir}                         | 存放pom.xml和所有的子目录                                    |
| ${basedir}/src/main/java           | 项目的java源代码                                             |
| ${basedir}/src/main/resources      | 项目的资源，比如说property文件，springmvc.xml                |
| ${basedir}/src/test/java           | 项目的测试类，比如说Junit代码                                |
| ${basedir}/src/test/resources      | 测试用的资源                                                 |
| ${basedir}/src/main/webapp/WEB-INF | web应用文件目录，web项目的信息，比如存放web.xml、本地图片、jsp视图页面 |
| ${basedir}/target                  | 打包输出目录                                                 |
| ${basedir}/target/classes          | 编译输出目录                                                 |
| ${basedir}/target/test-classes     | 测试编译输出目录                                             |
| Test.java                          | Maven只会自动运行符合该命名规则的测试类                      |
| ~/.m2/repository                   | Maven默认的本地仓库目录位置                                  |

## 二、安装与配置

### 2.1 安装JDK

- Maven 3.3 要求 JDK 1.7 或以上 

- Maven 3.2 要求 JDK 1.6 或以上 

- Maven 3.0/3.1 要求 JDK 1.5 或以上

- 查看JDK版本号

  ```shell
  java -version
  ```

### 2.2 下载

- 下载地址：https://maven.apache.org/download.cgi
- Windows下载zip压缩包(Linux下载tar.gz压缩包)后，解压到一个目录下即可

### 2.3 配置

- 新建系统变量`MAVEN_HOME` - ` D:\apache-maven-3.8.2`

- 编辑系统变量Path，添加变量值：`%MAVEN_HOME%\bin`

- 查看版本号

  ```shell
  mvn -v
  ```

- 配置本地仓库和镜像 - `D:\apache-maven-3.8.2\conf\settings.xml`

  ```xml
  <localRepository>E:\LocalRepository</localRepository>
  ```

  ```xml
  <mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>central</mirrorOf>
      <name>Nexus aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </mirror>
  ```

  

