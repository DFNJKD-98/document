<h1 align="center" id="index">Docker学习记录</h1>

## 安装docker

- https://www.jianshu.com/p/da1c7dc4217a

## 卸载docker

- 卸载Docker镜像，客户端和容器

  ```shell
  sudo apt-get purge docker-ce docker-ce-cli containerd.io
  ```

- 卸载镜像，容器，卷

  ```shell
   sudo rm -rf /var/lib/docker
  
   sudo rm -rf /var/lib/containerd
  ```

- 手动删除可编辑配置文件

## 配置镜像加速器

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://nwxzkbs8.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## docker命令

- 查看docker版本信息
  - `docker version`
- 查看docker系统信息，包括镜像和容器的数量
  - `docker info`
- 查看已经安装镜像
  - `docker images`
- 搜索镜像
  - `docker search`

- 下载镜像

  - `docker pull`

- 删除镜像

  - `docker rmi -f [镜像id...]`
  - 删除所有容器 - `docker rmi -f $(docker images -aq)`

- 新建容器并启动

  - `docker run [可选参数] image`

  - 参数说明

    | 参数                                  | 说明                               |
    | ------------------------------------- | ---------------------------------- |
    | --name=“Name”                         | 容器名字                           |
    | -d                                    | 后台运行                           |
    | -it (docker run -it centos /bin/bash) | 使用交互方式运行，进入容器查看内容 |
    | -p                                    | 指定容器的端口                     |
    | -p ip:主机端口:容器端口               |                                    |
    | -p 主机端口:容器端口                  |                                    |
    | -p 容器端口                           |                                    |
    | 容器端口                              |                                    |
    | -P（大P）                             | 随机指定端口                       |

- 查看容器

  - `docker ps` - 查看正在运行的容器
  - `docker ps -a`  - 列出所有容器
  - `docker ps -n=?`  - 显示最近创建的n个容器 

- 删除容器
  - `docker rm 容器id` - 删除指定的容器（不能删除正在运行的容器）
  - `docker rm -f $(docker ps -aq)`  - 删除所有的容器
- 启动容器
  - `docker start`
- 停止容器
  - `docker stop`
- 重启容器
  - `docker restart`
- 强制停止容器
  - `docker kill`
- 查看日志
  - `docker logs`
- 查看容器中进程信息
  - `docker top 容器id`
- 查看容器的信息（元数据）
  - `docker inspect 容器id`

- 进入当前正在运行的容器
  - `docker exec -it 容器id bashShell` - 进入容器后开启一个新的终端
  - `docker attach  容器id` - 进入容器正在执行的终端，不会启动新的进程
- 从容器内拷贝文件到主机上
  - `docker cp 容器id:容器内路径 目的主机路径`
