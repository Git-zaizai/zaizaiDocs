# git 操作集合

## git 配置系列

```shell
// 查git用户名
git config --global user.name

// 查git的email
git config --global user.email



// 查看当前项目 git 远程地址
git remote -v

// 设置git远程地址 （通常在更换了git的远程地址之后，需要重新关联）
git remote set-url origin http://liujunyang:liujunyang@gitlab/nodejs/egg-web.git

// 当直接使用以上方式无法重新设置git远程地址时，可尝试先remove+add,具体如下：
git remote remove origin   //移除原来仓库地址
git remote add origin 新仓库地址xxx    //添加新仓库地址

```

**配置 ssh key**

**_方法 1._**

1.  查询是否已经本地生成了 ssh key,命令行直接输入：`～/.ssh`
2.  命令行会输出：`-bash: /Users/admin/.ssh: is a directory` 或者输出没有这个文件夹，没有时就需要重新生成 key
3.  /Users/admin/.ssh 就是.ssh 的目录
4.  `cd /Users/admin/.ssh`
5.  ls 查看.ssh 文件夹下的所有文件，找到`id_rsa.pub`
6.  `cat id_rsa.pub` 查看公钥
7.  复制公钥内容到 gitlab 等仓库中，通常为设置- sshkey - key - 粘贴 - 保存即可
8.  具体步骤如下图：  
    无图

**_方法 2._**

`cat ~/.ssh/id_rsa.pub` 直接查看公钥内容，复制到 gitlab 上的 sshkey 配置处即可

**生成 ssh key**

如果没有生成过 shh key 的话，那么命令行输入:

```shell
ssh - keygen
```

一路 enter 即可，最后再复制 key 到 gitlab 中的 sshkey 配置处即可  
**无图**

重新生成 sshkey，尤其是换电脑时，需要换 git 时，先使用 git config --global [user.name](http://user.name) 和 user.email 修改本地 git 用户名+邮箱，然后重新生成 shh key，然后查询`cat ~/.ssh/id_rsa.pub`查询密钥，并在 gitlab 中配置，最后 git clone 克隆代码即可

```shell
ssh-keygen -t rsa -C "邮箱"
```

注意，执行以上命令时，然后按回车键若干次

如果出现 Overwrite (y/n) 选择 y,然后密码不用设置，

windows  
执行`ssh-keygen` 即可查看路径，然后使用 cd,进入到.ssh 文件夹，使用`type id_rsa.pub` 即可查看生成的公钥，然后复制到 gitee 中即可

## git 常用操作

```shell
// 拉取代码
git clone 克隆的地址

// 当本机已经有一个git账号了，又想用另一个git账号拉取其他代码，
模板: git clone http://邮箱(或用户名):密码@仓库
eg: git clone http://15000000000:123456@git.test.com/abc/projectName.git

// 拉取代码
git pull

//  提交修改+新建的文件 不提交删除的文件
git add .

//  提交所有修改删除新增
git add -a

//  提交所有修改删除,不包括新增
git add -u

//  提交所有修改项
git commit -m "备注"

// 推送
git push

// 合并 将a分支合并到当前分支
git merge

// 合并的时候冲突了，要是二进制/无法打开的文件，无法选择某个版本的话，那么直接使用命令进行合并
// 比如：当前在a分支，执行git merge b 冲突了二进制等文件，则执行以下命令
git checkout FILE --ours{--theirs}

eg: git checkout abc.eot --ours
其中 abc.eot 应该是相对地址   ours是用a分支  theirs则是用b分支的



// 当由于某些操作，导致命令行处一直处于输入文字状态，无法正常敲击命令并执行时，
// 按control+c无法退出时，可使用以下代码：
shift + .
```

## git 分支系列

```shell
// 查看所有本地分支 注意（高亮的就是当前分支）
git branch

// 查看所有分支（本地和远程）
git branch -a
git branch --all

// 切换到分支aaa
git checkout aaa

// 切换到上一个分支
git checkout -

// 从指定分支创建一个本地分支
 方式1. git branch aaa  和  git checkout aaa
 方式2. git checkout -b aaa

// 关联远程仓库的上游分支 (创建一个本地分支，远程上是不会有与之对应的分支的，
// 除非主动创建一个与之关联，且远程分支通常与本地分支同名，如果不进行关联，
// 那么git pull 或 git push 时：将无法正常执行)
// 新创建一个本地分支后，直接执行git push ，就会提示以下代码让你关联远程连接，执行一下即可
git push --set-upstream origin aaa

// 从指定分支创建一个本地分支，并与远程建立链接
git checkout -b aaa origin/aaa

// 当本地有test分支，远程没有origin/test时，直接push是不行，
// 需要创建远端，可以执行以下代码：推送并且创建远端分支
git push -u origin test

// 当远程上已经有分支/别人创建的分支提交到远程你要拉下来时，可以通过以下方式实现
方式1.
git fetch origin test   // test:远程上的分支名
git checkout test
方式2.
// 创建一个本地分支，且与远程上的test建立关系，其中test可以自定义
git checkout -b test origin/test
方式3.
// 创建一个本地分支，且与远程上的test建立关系，本地分支与远程同名
git checkout --track origin/test

删除本地分支（需要切换到其他分支）：
git branch -d aaa     （会做校验等，有没有没提交的代码，有没有合并什么的）
git branch -D aaa     （不做校验，直接删除）

删除远程分支（需要切换到其他分支）：
git push origin -d aaa
```

## git 撤回系列

```shell
// merge的路上突然不想merge了或者merge的时候冲突自己解决不了，想将此分支回到merge之前的状态
方式1(推荐). git merge --abort
方式2(不推荐).  
// 如果是由于冲突解决不了，想回到merge之前的状态，
// 则先随便合并，然后暂存，之后撤销所有修改，
// 然后需要重新merge代码的时候，会报错，此时需要重制一下merge状态，执行:
git reset --merge

// 查看当前是在哪个commitID版本下
git reset --hard HEAD

// 回退到上一个版本
git reset --hard HEAD^

// 回退到上上一个版本
git reset --hard HEAD^^

// 回退到倒数第5个版本
git reset --hard～5

// 直接回推倒commitID为ad2080c版本
git reset --hard ad2080c

// 通常回退后，需要push，但会报什么rejected，然后执行git push的时候 增加--force强制回退即可，
// 最后将之后的代码重新合并即可
git push --force

// 如果回退成功了 但是你丫后悔了，好的，请执行
git reflog
就可以查看所有的commitID记录，找到后悔的那一条commitID ， 执行
git reset --hard nfdafllg
就可以回到指定的commitID那个版本

// 把修改的所有文件都从暂存区域拿出来，放到修改时的状态
git reset HEAD

// 把file文件从暂存区域拿出来，放到修改时的状态  <file> 需要相对路径，
// 比如: git reset HEAD ./abc/a.js
git reset HEAD <file>

// 将本地分支重置为远程分支的状态
git reset --hard origin/dev

// 撤回单个文件的修改
方式1. git checkout -- a.js
方式2. git restore a.js
方式3. git checkout a.js

// 撤回所有文件的修改，加个点
方式1. git checkout -- .
方式2. git restore .
方式3. git restore .
```

## git 打 tag 系列

```shell
// 查看此分支下所有的tag号
git tag

// 列举出所有2.5开头的tag号码，-l 或者--list 是字母L小写
git tag -l “2.5*”

// 2.1.3是tag号码。可查这个tag是谁打的，时间，作者，提交记录等等基本信息
git show 2.1.3

// 复杂一点的打tag，标注各种信息 。 -a tag号  -m tag的备注信息
git tag -a  2.1.3 -m "我是2.1.3版本"

// 简单的打tag
git tag 2.1.3

// 如果在之前的某个提交commit忘记打tag，可以使用以下命令：
// 注意：jfajflfla 为commit号，可以全部号码 。
// 也可以是号码开头的部分
git tag -a 2.1.2 jfajflfla

// 只推自己的tag号
git push origin 2.1.2

// 推送所有的tag号
git push origin --tags

```

## git 暂存系列

```shell
// 此命令主要用于：
// 1. 当你在a分支修改代码时，突然要去其他分支修改东西，
// 但又不想push当前修改的代码，此时可以选择暂存起来
// 2. 当你的项目运行需要配置很多东西时，且多个分支配置的东西都不一样，
// 此时，可以在个别分支配置完后，暂存，当你回到这个分支的时候，
// 在将暂存的代码取回到分支即可

// 暂存  - 当你在a分支正在开发，修改了部分东西但是不想提交，但是又必须去b分支改东西，
// 此时，可以执行以下命令暂存修改的项目（新增加的文件无效）
git stash

// 暂存 自己加备注
git stash save "我是a分支的备注哈"

// 查看暂存区所有暂存的项
git stash list
// stash@{0}: On cd_major_construction: 我是a分支的备注哈

// git stash apply 是将堆栈中最近一次的暂存恢复到当前分支， 
// git stash apply num  是将制定的stash恢复到当前分支,
// num是通过git stash list 查出的列表中的stash@{0} 的数字（就是0）
// ⚠️注意：apply 意思是应用，不会将stash堆栈中的记录删除，只是恢复代码到当前分支
git stash apply
git stash apply 1

// git stash pop 将最新的一次stash暂存内容，恢复到当前分支，
// 同时删除最新的一次stash记录，与apply不同的是，pop会删除暂存的记录
git stash pop

// 将stash nun = 1的暂存，恢复到当前分支，同时从stash堆栈中删除stash nun = 1的暂存
git stash pop 1

// 删除最新的一次stash暂存记录 ， 仅删除，不会恢复暂存到当前分支
git stash drop

// 删除指定stash暂存记录
git stash drop 1

// 清空暂存记录
git stash clear

```

## git 查看状态类

```shell
// 查看日志一天
git log

// 查看当前分支的状态，有没有commmit没有push啦，有没有merge了的，
// 忘记push拉，或者有没有冲突什么的
git status

// 查看本地所有分支 以及其对应的远程分支
git branch -vv

// 查看改了哪些文件和内容
git diff
```
