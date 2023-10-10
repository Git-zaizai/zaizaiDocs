# github自动化部署

**参考：** [资料地址](https://zhuanlan.zhihu.com/p/626270948)

首先在项目的根目录创建文件

```vbscript
.github  目录
  -workflows 目录
    -xxx.yml  文件 -- 文件名随意  支持 .yml .yaml 两种格式
```

然后再文件中写入

```yaml
ACCESS_TOKEN# 流程名称 随意起
name: Actions

# 触发条件
on:
  # 手动触发
  workflow_dispatch:
  # push 到指定分支
  push:
    branches:
      - main
    # 只在下列路径变更时触发
    paths:
      - 'docs/**'
      - 'package.json'

# 设置上海时区
env:
  TZ: Asia/Shanghai

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 安装 pnpm
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      # 设置 node 版本
      - name: Set node version to 18
        uses: actions/setup-node@v2
        with:
          node-version: 18
          cache: 'pnpm'

      # 打包静态文件
      - name: Build
        run: pnpm install && pnpm run docs:build

      # 部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4.4.0
        with:
          # GitHub 密钥
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # GitHub Pages 读取的分支
          BRANCH: gh-pages
          # 静态文件所在目录
          FOLDER: dist

```

**请根据实例实际修改相应的配置**，大概这些配置相信你大概能看得懂的，更多配置想请自行查阅

### 配置文件变量的使用

**--如没有使用请略过这一片段--**

```yaml
 # GitHub 密钥
 ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

**ACCESS_TOKEN** 这个是需要你再项目中进行配置

#### 配置方法

首先，要去github生成需要的token，[前往：生成token](https://github.com/settings/tokens?type=beta)

![png](http://110.41.157.104/server/uploads/2023-10-10/36b1a699da1696908579241.png)

然后点击生成，**生成好的token只能看见一次，请保存好token，忘了只能删除后重新生成**

接着去到github项目设置

![截图](http://110.41.157.104/server/uploads/2023-10-10/b588d188e21696908655721.png)

![截图](http://110.41.157.104/server/uploads/2023-10-10/121ffe63d51696908699286.png)

注意 **Name **字段不能随便写，根据你使用变量名填写；**value** 要看你使用的地方来，例如本文件中的 **ACCESS_TOKEN** 字段 就是需要你去生成token，当其他自行需要时可以自定义 value

## Actions permissions

接着需要开启仓库 **Actions ** 读写权限

![截图](http://110.41.157.104/server/uploads/2023-10-10/a482b496a21696908715131.png)

拉到页面最下面

![截图](http://110.41.157.104/server/uploads/2023-10-10/316b12bfe41696908727396.png)

选择 **  Read and write permissions** ，就完成了

## 正常提交代码...

额，这就不说了 git 提交都会的

## 查看部署情况

![png](https://gitcode.net/ajream/myimages/-/raw/master/img/20210913232007_image-20210913232006065.png)

点击正在运行的workflow就可以查看部署情况

![png](https://gitcode.net/ajream/myimages/-/raw/master/img/20210913233832_image-20210913233828678.png)

![png](https://gitcode.net/ajream/myimages/-/raw/master/img/20210913234019_image-20210913234018254.png)

# 结束

	到此，流程结束，不出意外你就可以去打开github pages，然后就可以访问到部署的网站。
