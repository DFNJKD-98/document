---
title: Maven学习记录
---

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


## 三、Spring、SpringMVC、SpringBoot

> Spring 最初利用“工厂模式”（DI）和“代理模式”（AOP）解耦应用组件。
>
> 大家觉得挺好用，于是按照这种模式搞了一个 MVC框架（一些用Spring 解耦的组件），用开发 web 应用（ SpringMVC ）。
>
> 然后又发现每次开发都写很多样板代码，为了简化工作流程，于是开发出了一些“懒人整合包”（starter），这套就是 Spring Boot。
>
> 用最简练的语言概括就是：
>
> Spring 是一个“引擎”；
>
> Spring MVC 是基于Spring的一个 MVC 框架 ；
>
> Spring Boot 是基于Spring4的条件注册的一套快速开发整合包。

### Spring

- 一个轻量级控制反转(IOC)和面向切面(AOP)的容器框架

### SpringMVC

- **Spring MVC是Spring的一部分**，Spring 出来以后，大家觉得很好用，于是按照这种模式设计了一个MVC框架（一些用Spring解耦的组件），主要用于开发WEB应用和网络接口，**它是Spring的一个模块**，通过DispatcherServlet, ModelAndView 和View Resolver，让应用开发变得很容易。

### SpringBoot

- SpringBoot是一套整合了框架的框架
- 它的初衷：解决Spring框架配置文件的繁琐、搭建服务的复杂性
