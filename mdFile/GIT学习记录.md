## GIT学习记录

### 基本操作

#### ``` git init``` 初始化仓库

#### ```git status``` 查看仓库的状态

#### ```git add``` 向暂存区中添加文件

- `git add '文件名称' `
- `git add -A` 添加该文件夹下所有文件

#### ```git commit``` 保存仓库的历史记录

- 提交信息格式

  > 在编辑器中记述提交信息的格式如下。
  >
  > - 第一行：用一行文字简述提交的更改内容 
  > - 第二行：空行 
  > - 第三行以后：记述更改的原因和详细内容

- `git commit --amend` 修改提交信息 （提交信息的命令是 `git commit -m xxx`)

- `git commit --am '提交信息'` 可以合并`git add '文件名称'` 和 ` git commit -m '提交信息'` 两个步骤为一个步骤

#### ```git log``` 查看提交日志

- 只显示提交信息的第一行：``` git log --pretty=short```
- 只显示指定目录、文件的日志：``` git log 目录名/文件名```
- 显示文件的改动：```git log -p 文件名```

#### ```git diff``` 查看更改前后的区别

查看工作树和最新提交的差别：``` git diff HEAD```

> 这里的 HEAD 是指向当前分支中最新一次提交 的指针。
>
> “+”号标出的是新添加的行，被删除的 行则用“-”号标出。

### 分支的操作

```git branch``` 显示分支一览表，同时可以确认当前所在分支

``` git branch xxx``` 创建xxx分支

> 创建分支时，在哪个分支下执行该命令，好像就是以这个分支为基础进行创建

``` git branch -a ``` 添加 -a 参数可以同时显示本地仓库和远程仓库的分支信息。

``` git checkout -b ``` 创建并切换到分支

``` git checkout xxx``` 切换到xxx分支

``` git checkout - ``` 可以切换到上一分支

**想要将xxx分支合并到master主干分支，需要先回到master分支**

``` git merge ``` 分支合并

> ``` git merge --no-ff xxx ```  将xxx分支合并到master分支
>
> 为了在历史记录中明确记录下本次分支合 并，我们需要创建合并提交。因此，在合并时加上 --no-ff参数。
>
> 随后编辑器会启动，用于录入合并提交的信息。
>
> 默认信息中已经包含了是从 feature-A 分支合并过来的相关内容，所 以可不必做任何更改。

``` git log --graph ``` 以图表形式查看分支

### 更改提交的操作

``` git reset ``` 回溯历史版本

> 要让仓库的HEAD、暂存区、当前工作树回溯到指定状态，需要用到`git rest --hard`命令
>
> ``` git reset --hard 哈希值``` 
>
> 只要提供目标时间点的哈希值，就可以完全恢复至该时间点的状态。
>
> **哈希值在 ``` git log --graph ``` 中查看 ** ，类似： ```fd0cbf0d4a25f747230694d95cac1be72d33441d```

```git log``` 命令只能查看以当前状态为终点的历史日志。所以这里要使用 ```git reflog```命令，查看当前仓库的操作日志。在日志中找出回溯历史之前的哈希值，通过 ```git reset --hard``` 命令恢复到回溯历史前的状态。例如： `git reset --hard 83b0b94`

> 即便开发者错误执行了 Git 操作， 基本也都可以利用 ```git reflog```命令恢复到原先的状态，所以务必牢记本部分。
>
> 在实际的软件开发中，不同分支合并到master主支时会产生冲突，例如：README文件修改的内容不一致。
>
> 此时，往往需要删除其中之一（手动修改文件内容）。冲突解决后，执行`git add`命令和`git commit`命令

### 推送至远程仓库

> 创建时请不要勾选 ```Initialize this repository with a README``` 选项。因为一旦勾选该选项，GitHub 一侧的仓库就会自动生成 README 文件，**从创建之初便与本地仓库失去了整合性**。虽然到时也可以强制覆盖，但为防止这一情况发生还是建议不要勾选该选项，直接点击 ```Create repository``` 创建仓库。

#### 设置本地仓库的远程仓库

``` git remote add origin git@github.com:DFNJKD-98/strong-tears.git``` 

执行该命令后，GIT会自动将该远程仓库的名称设置为origin（标识符）

##### 推送至master分支

``` git push -u origin master``` 

> 像这样执行 git push命令，当前分支的内容就会被推送给远程仓库 origin 的 master 分支。
>
> **-u参数可以在推送的同时，将 origin 仓库的 master 分支设置为本地仓库当前分支的 upstream（上游）。**
>
> 简单来说 upstream 就是于你本地分支对应的远端分支，push pull 或 fetch 时如果不指定远端分支，就会使用 upstream 分支。意思就是好像可以直接使用`git push`或者`git pull`而不用加远程分支。
>
> 添加了这个参数，将来运行 git pull命令从远程仓库获取内容时，本地仓库的这个分支就可以直接从 origin 的 master 分支获取内容，省去了另外添加参数的麻烦。

##### 推送至master以外的分支

``` git push -u origin xxx分支``` 

##### 将本地新建分支推送到远程仓库

`git push --set-upstream origin xxx分支`

##### 推送失败解决方法

- 错误内容

  ````
  Updates were rejected because the tip of your current branch is behind
  ````

  ```
  fatal: refusing to merge unrelated histories
  （拒绝合并不相关的历史）
  ```

- 解决方法

  - 使用强制push的方法：
    `git push -u origin master -f`
    这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

  - push前先将远程repository修改pull下来
    `git pull origin master`
    `git push -u origin master`

  - 若不想merge远程和本地修改，可以先创建新的分支：
    `git branch [name]`
    然后`push`
    `git push -u origin [name]`
    
  - **拉取远程仓库**(这个方法比较管用)
    
    ```
    git pull origin master --allow-unrelated-histories
    // --allow-unrelated-histories 允许合并不相关历史
    git add .
    git commit
    git push -u origin master
    ```


#### 从远程仓库获取

##### 获取远程仓库

``` git clone git@github.com:DFNJKD-98/strong-tears.git```

> 执行 git clone命令后我们会默认处于 master 分支下，同时系统会自动将 origin 设置成该远程仓库的标识符。
>
> 也就是说，当前本地仓库的 master 分支与 GitHub 端远程仓库（origin）的 master 分支在内容上是完全相同的。

##### 获取远程的xxx分支

```  git checkout -b feature-D origin/feature-D```

将远程仓库的feature-D分支克隆到本地，并也命名为feature-D

##### 获取最新的远程仓库分支

``` git pull origin feature-D```

将远程仓库的feature-D分支拉取到本地仓库，更新本地仓库的分支



