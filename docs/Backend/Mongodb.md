# `mongodb`

## `node使用mongodb`

环境：

- mongodb 6.0.1
- node 18+ module:module
- mongodb 链接库 官方出的 mongodb 链接库

```shell
pnpm add mongodb
```

不多 bb 直接开码

首先，简单的封装一下

```js
import { MongoClient } from 'mongodb'

const MONGDB_CONFIG = {
  url: 'mongodb://127.0.0.1:27017/',
  database: 'gadgets'
}

async function mongodb(title) {
  try {
    await mongoClient.connect()
    const db = mongoClient.db(MONGDB_CONFIG.database)
    const titleDB = await db.collection(title)
    console.log('mongodb 连接 ===> 成功')
    return {mongoClient, db, titleDB}
  } catch (e) {
    console.log('mongodb 连接 ===> 失败')
    return Promise.reject(e)
  }
}
```

 使用

 ```js
 async function init(){
    const { titleDB } = await mongodb('user')
    const userArr = await titleDB.find({}).toArray()
    console.log(userArr)
}
```

文档：[node mongodb](https://www.mongodb.com/docs/drivers/node/current/)

## `ObjectId`


