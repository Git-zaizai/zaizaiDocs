<a name="40b701aa"></a>
# 一、内置指令
| 名称 | 作用 |
| --- | --- |
| v-bind | 单向绑定解析表达式，可简写为 :xxx |
| v-model | 双向数据绑定 |
| v-for | 遍历数组、对象、字符串 |
| v-on | 绑定事件监听，可简写为@ |
| v-if | 条件渲染（动态控制节点是否存在) |
| v-else | 条件渲染（动态控制节点是否存在) |
| v-show | 条件渲染（动态控制节点是否展示) |
| v-text | 1.向其所在的节点中渲染文本内容。<br />2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会 |
| v-html | 1.作用：向指定节点中渲染包括html结构的内容，{{xx}}则不会<br />2。与差值语法的区别<br />（1）v-html会替换掉节点的所有内容，{{xx}}则不会<br />（2）v-html可以识别html结构 |
| v-cloak（没有值） | 1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性<br />2.使用css配合v-cloak可以结局网速慢时页面显示出{{xxx}}的问题<br />例如：<br />[v-cloak]{<br />                 disiplay：none；<br />}<br />解释：html中包含有 v-cloak 属性的标签隐藏 |
| v-once | 1.v-once所在节点在初次动态渲染后，就视为静态内容了<br />2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能 |
| v-pre | 1.跳过其所在节点的编译过程<br />2.可利用它跳过：没有使用指令语法、没有使用差值语法的节点，加快编译 |


```html
<div id="app">
    <!-- v-text -->
    <h1>{{name}}123</h1>
    <h1 v-text="name">123</h1>
    <h1 v-text="str"></h1>
    <!-- v-html -->
    <h1 v-html="str">123</h1>
    <!-- v-cloak -->
    <h1 v-cloak="str">{{name}}</h1>
    <!-- v-once -->
    <h1 v-once>v-once当前的n值是：{{n}}</h1>
    <h1>初始化n值是：{{n}}</h1>
    <button @click="n++">点我你+1</button>
    <!-- v-pre -->
    <h1 v-pre>初始化n值是：{{n}}</h1>
    <h1>初始化n值是：{{n}}</h1>
    <button @click="n++">点我你+1</button>
</div>
```

```javascript
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
      el: '#app',
      data: {
          name: '你好',
          str: '<h3>你好啊！</h3>',
          n: 0,
      },
  });
</script>
```

<a name="790ba60a"></a>
## 1、自定义指令

配置对象中常用的3个回调：

        1.bind：指令与元素成功绑定时回调

        2.inserted：指令所在元素被插入页面时调用

        3.update：指令所在模板结构被重新解析时调用。

      备注：

        1.指令定义时不加v-，但使用时要加v-

        2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camleCase命名

**局部定义**

```html
<div id="app">
    <h1>当前的n值是：<span v-text="n"></span></h1>
    <h1>放大10倍的n值是：<span v-big="n"></span></h1>
    <h1>放大10倍的n值是：<span v-big-number="n"></span></h1>
    <button @click="n++">点我n+1</button>
    <hr />
    <input type="text" v-fbind2:value="n" />
</div>
<div id="app2">
    <input type="text" v-fbind2:value="x" />
    <button @click="x++">点我n+1</button>
</div>
```

**全局定义**

解释：定义好后app和app2都可以使用 v-fbind2、big2

```javascript
Vue.config.productionTip = false;
			// 定义一个对象方式的全局的指令
			Vue.directive('fbind2', {
				// 指令元素成功绑定时（运行打开页面就绑定，但未插入页面）
				bind(element, binding) {
					element.value = binding.value;
				},
				// 指令元素被插入页面时
				inserted(element, binding) {
					element.focus();
				},
				// 指令所在元素的模板被重新解析时
				update(element, binding) {
					element.value = binding.value;
				},
			});
			// 定义一个函数方式的全局的指令
			Vue.directive('big2', function (element, binding) {
				// 将binding对象中的value乘10后赋值给真实DOM元素中的文本内容
				element.innerText = binding.value * 10;
			});
```

```javascript
new Vue({
    el: '#app',
    data: {
        n: 0,
    },
    // big函数可是会被调用？1.指令与元素成功绑定时  2.指令所在的模板被重新解析时
    // directives配置项自定义指令
    directives: {
        /*
        创建某个新指令后如下方的big，会接收两个值：element真实DOM元素，binding（绑定）对象（里面有value，value是n，n是data里面的数据项）
        big(element, binding)
        */
        big(element, binding) {
            // 将binding对象中的value乘10后赋值给真实DOM元素中的文本内容
            element.innerText = binding.value * 10;
        },
        // 带有横杠的命名规则需要加引号
        'big-number'(element, binding) {
            element.innerText = binding.value * 10;
        },
        fbind: {
            // 指令元素成功绑定时（一上来）
            bind(element, binding) {
                element.value = binding.value;
            },
            // 指令元素被插入页面时
            inserted(element, binding) {
                element.focus();
            },
            // 指令所在元素的模板被重新解析时
            update(element, binding) {
                element.value = binding.value;
            },
        },
    },
});
new Vue({
    el: '#app2',
    data: {
        x: 0,
    },
});
```

<a name="d3d86949"></a>
# 二、Object.defineProperty()

解释：方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```javascript
<script>
 Vue.config.productionTip = false; //取消Vue启动时的提示
 let num = 20;
 let person = {
     name: '张三',
     sex: '男',
 };
 Object.defineProperty(person, 'age', {
     // value: 18,
     // enumerable: false, //控制属性是否可以枚举(遍历/提取)，默认值是false
     // writable: false, //控制属性是否可以被修改，默认值是false
     // configurable: false, //控制属性是否可以被删除 ，默认值是false
     // // 当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
     get() {
         alert('有人读取age属性了');
         return num;
     },
     // 当有人读取person的age属性时，set函数(setter)就会被调用，且返回值就是age的值
     set(value) {
         alert('有人修改age属性了，且属性值是' + value);
         num = value;
     },
 });
 // enumerable设置为true后可使用keys()枚举(遍历 / 提取)person内的属性名，则反之
 console.log(Object.keys(person));
 console.log(person);
</script>
```

<a name="7d943e75"></a>
# 三、computed 计算属性

1.解释：计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。

2.注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。

3.注意如果你为一个计算属性使用了箭头函数，则 **this** 不会指向这个组件的实例，

**示例：**

```javascript
var vm = new Vue({
  data: { 
      a: 1 
  },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get() {
        return this.a + 1
      },
      set(Value) {
        this.a = Value - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3 //设置为3之后，经过set a=> 2
vm.a       // => 2
vm.aDouble // => 4
```

<a name="d82d91c6"></a>
# 四、methods 事件处理器

	解释：注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

	1.该methods常用于写**键盘**与**鼠标**事件的函数

**示例**

```javascript
var vm = new Vue({
  data: {
      a: 1 
  },
  methods: {
    plus() {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

<a name="a3c9b9c9"></a>
# 五、watch监视与深度监视

<a name="2cdde153"></a>
## 监视属性watch ：

		1.当被监视的属性变化时，回调函数自动调用，进行相关操作

        2.监事的属性必须存在，才能进行监视

        3.监视的两种写法

          （1）new Vue时传入watch配置

          （2）通过vm.$watch监视

```html
<div id="app">
    <!-- 方法一 -->
    <h1>今天天气很{{info}}</h1>
    <button @click="click">点我切换</button>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false; //取消Vue启动时的提示
    new Vue({
        el: '#app',
        data: {
            weather: true,
        },
        computed: {
            info() {
                return this.weather ? '炎热' : '凉爽';
            },
        },
        methods: {
            click() {
                this.weather = !this.weather;
            },
        },
        watch: {
            weather: {
                immediate: true, //初始化时让handler调用一下
                //  handler当weather发生改变时调用
                handler(newValue, oldValue) {
                    console.log('newValue = ' + newValue);
                    console.log('oldValue = ' + oldValue);
                },
            },
        },
    });
</script>
```

<a name="80b8ff40"></a>
## 深度监视 :

        1.Vue中的watch默认不监视对象内部值的改变（一层)

        2.配置deep:true可以监视对象内部值改变（多层）

      备注：

        1.Vue自身可以监视对象内部值的改变，但Vue提供的watch默认不可以！！

        2.使用watch时根据数据的具体结构，决定是否采用深度监视

```html
<div id="app">
    <h3>a的值是：{{Num.a}}</h3>
    <button @click="Num.a++">点我+1</button>
    <button @click="Num.a--">点我-1</button><br /><br />
    <h3>b的值是：{{Num.b}}</h3>
    <button @click="Num.b++">点我+1</button>
    <button @click="Num.b--">点我-1</button>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false; //取消Vue启动时的提示
    new Vue({
        el: '#app',
        data: {
            weather: true,
            Num: {
                a: 1,
                b: 2,
            },
        },

        // watch
        watch: {
            weather: {
                //初始化时让handler调用一下
                immediate: true,
                //  handler当weather发生改变时调用
                handler(newValue, oldValue) {
                    console.log('newValue = ' + newValue);
                    console.log('oldValue = ' + oldValue);
                },
            },
            // 监视多级结构中某个属性的变化
            'Num.a': {
                //  handler当Num发生改变时调用
                handler(newValue, oldValue) {
                    console.log('newValue = ' + newValue);
                    console.log('oldValue = ' + oldValue);
                },
            },
            'Num.b': {
                //  handler当Num发生改变时调用
                handler(newValue, oldValue) {
                    console.log('newValue = ' + newValue);
                    console.log('oldValue = ' + oldValue);
                },
            },
            // deep开启监视多级结构中多个属性的变化
            Num: {
                deep: true,
                //  handler当Num发生改变时调用
                handler(newValue, oldValue) {
                    console.log('Num内部属性发生改变了');
                },
            },
        },
    });
</script>
```

<a name="8fe20370"></a>
# 六、样式绑定

	绑定的类型：数组、对象、字符串（直接使用data的值去单向绑定）

```css
<style>
    .border {
        width: 300px;
        height: 100px;
        border: 1px solid #000;
    }
    .normal {
        width: 300px;
        height: 100px;
        border: 2px solid #000;
        background-color: green;
    }
    .sad {
        width: 300px;
        height: 100px;
        border: 2px solid #000;
        background-color: #ccc;
    }
    .happy {
        width: 300px;
        height: 100px;
        border: 3px solid #000;
        background-color: red;
    }
    .css1 {
        font-weight: 700;
        font-size: 18px;
    }
    .css2 {
        color: pink;
    }
    .css3 {
        border-radius: 30px;
    }
</style>
```

```html
<div id="app">
    <!-- 正常的样式正常写class="border"，变化的样式用绑定的形式去写:class="mood"。最终汇总成class="border normal" -->
    <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
    <div class="border" :class="mood" @click="changeMood">{{name}}</div>
    <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="border" :class="classArr" @click="changeArr">{{name}}</div>
    <!-- 绑定class样式-对象写法，适用于：要绑定的样式个数确定、名字也确定，要动态决定用不用 -->
    <div class="border" :class="classObj" @click="changeObjArr">{{name}}</div>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false; //取消Vue启动时的提示
    new Vue({
        el: '#app',
        data: {
            name: '韦琦峰',
              // 使用字符串的形式写，汇总成class="border normal"
            mood: 'normal',
              // 使用对象的形式写，汇总成class="border css1 css2 css3"
            classArr: ['css1', 'css2', 'css3'],
            // 使用对象的形式写，哪个样式是true哪个就使用，则反之
            classObj: {
                css1: false,
                css2: false,
                css3: false,
            },
        },
        methods: {
            // 点击随机绑定样式
            changeMood() {
                let arr = ['happy', 'sad', 'normal'];
                // Math.random() 返回0~1之间的随机数
                // Math.floor(1.6)返回 1，取整
                this.mood = arr[Math.floor(Math.random() * 3)];
            },
            // 点击删除数组中的第一个元素
            changeArr() {
                this.classArr.shift();
                console.log(this.classArr);
            },
            // 点击后将classObj中的css1改为true，即绑定该样式
            changeObjArr() {
                this.classObj.css1 = true;
            },
        },
    });
</script>
```

<a name="f5c26f2c"></a>
# 七、列表

<a name="fbace88a"></a>
## 1、过滤 filter()

解释：方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```html
<div id="app">
    查询：<input type="text" v-model="keyWord" placeholder="请输入您想搜索的数据" />
    <!-- 遍历数组 -->
    <h1>人员列表（遍历数组，用得最多）</h1>
    <ul>
        <li v-for="(item,index) of filperons" :key="index">{{item.id}}-{{item.name}}-{{item.age}}-{{item.sex}}</li>
    </ul>
</div>
```

<a name="a915a914"></a>
### 1、用watch实现

```javascript
Vue.config.productionTip = false; //隐藏启动Vue时的提示
// 用watch实现
new Vue({
    el: '#app',
    data: {
        keyWord: '',
        persons: [
            { id: '001', name: '马冬梅', age: 11, sex: '女' },
            { id: '002', name: '周冬雨', age: 22, sex: '女' },
            { id: '003', name: '周杰伦', age: 33, sex: '男' },
            { id: '004', name: '温兆伦', age: 44, sex: '男' },
        ],
        filperons: [],
    },
    watch: {
        keyWord: {
            //初始化时调用一下handler
            immediate: true,
            handler(NewVal) {
                this.filperons = this.persons.filter((item) => {
                    return item.name.indexOf(NewVal) !== -1;
                });
            },
        },
    },
});
```

<a name="d92f766b"></a>
### 2、用computed实现

```javascript
new Vue({
    el: '#app',
    data: {
        keyWord: '',
        persons: [
            { id: '001', name: '马冬梅', age: 11, sex: '女' },
            { id: '002', name: '周冬雨', age: 22, sex: '女' },
            { id: '003', name: '周杰伦', age: 33, sex: '男' },
            { id: '004', name: '温兆伦', age: 44, sex: '男' },
        ],
    },
    computed: {
        filperons() {
            return this.persons.filter((item) => {
                return item.name.indexOf(this.keyWord) !== -1;
            });
        },
    },
});
```

<a name="d1c9fa0d"></a>
## 2、排序

```html
<div id="app">
    查询：<input type="text" v-model="serch" placeholder="请输入您想搜索的数据" />
    <button @click="sorTing = 2">年龄升序</button>
    <button @click="sorTing = 1">年龄降序</button>
    <button @click="sorTing = 0">恢复排序</button>
    <!-- 遍历数组 -->
    <h1>人员列表（遍历数组，用得最多）</h1>
    <ul>
        <li v-for="(item,index) of filperons" :key="item.id">
            {{item.id}}-{{item.name}}-{{item.age}}-{{item.sex}}
            <input type="text" />
        </li>
    </ul>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false; //隐藏启动Vue时的提示

    // 用computed实现
    const vm = new Vue({
        el: '#app',
        data: {
            serch: '',
            sorTing: 0, //0原顺序 1降序 2升序
            persons: [
                { id: '001', name: '马冬梅', age: 22, sex: '女' },
                { id: '002', name: '周冬雨', age: 11, sex: '女' },
                { id: '003', name: '周杰伦', age: 44, sex: '男' },
                { id: '004', name: '温兆伦', age: 33, sex: '男' },
            ],
        },
        computed: {
            filperons() {
                const arr = this.persons.filter((item) => {
                    return item.name.indexOf(this.serch) !== -1;
                });
                if (this.sorTing) {
                    arr.sort((first, last) => {
                        return this.sorTing == 1 ? last.age - first.age : first.age - last.age;
                    });
                }
                return arr;
            },
        },
        watch: {
            sorTing(newValue, oldValue) {
                console.log('newValue:' + newValue + '  oldValue:' + oldValue);
            },
        },
    });
</script>
```

<a name="a69f22bb"></a>
# 八、Vue.set ()的使用

Vue.set( target, key, value ) / this.$set( target, key, value )<br />target：要更改的数据源(可以是对象或者数组)<br />key：要更改的具体数据<br />value ：重新赋的值

```html
<div id="app">
    <button @click="schoolPrincipal">点我生成学校校长</button>
    <h1>学校名称：{{school.name}}</h1>
    <h1>学校地址：{{school.address}}</h1>
    <h1 v-if="school.schoolPrincipal">学校校长：{{school.schoolPrincipal}}</h1>
    <hr />
    <button @click="addSex">点我生成学生性别</button>
    <button @click="addssAge">点我生成学生age11</button>
    <h1>学生姓名：{{student.name}}</h1>
    <h1 v-if="student.sex">学生性别：{{student.sex}}</h1>
    <h1 v-if="student.age.age11">学生age11：{{student.age.age11}}</h1>
    <h1>学生年龄：真实{{student.age.rAge}}---对外{{student.age.sAge}}</h1>
    <h1>朋友们</h1>
    <ul>
        <li v-for="(item,index) in student.friends" :key="index">
            <h2>{{item.name}}--{{item.age}}</h2>
        </li>
    </ul>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false; //隐藏启动Vue时的提示

    // 用computed实现
    const vm = new Vue({
        el: '#app',
        data: {
            school: {
                name: '玉林师范学院',
                address: '玉林',
            },
            student: {
                name: 'tom',
                age: {
                    rAge: 40,
                    Age: 29,
                },
                friends: [
                    { name: 'jerry', age: 36 },
                    { name: 'tony', age: 20 },
                ],
            },
        },
        methods: {
            addSex() {
                Vue.set(this.student, 'sex', '男');
            },
            addssAge() {
                Vue.set(this.student.age, 'age11', '123123');
            },
            schoolPrincipal() {
                Vue.set(this.school, 'schoolPrincipal', '韦琦峰');
            },
        },
    });
</script>
```

<a name="2986e8b2"></a>
# 九、收集表单数据转为Json格式

收集表单数据：

        若：，则v-model手机的是value值，用户输入的就是value值

        若：，则v-model收集的是value值，且要给标签配置value值

        若：[ ] 

          1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）

          2.v-model的初始值数数组，那么收集的就是value组成的数组

        备注：v-model的三个修饰符

          lazy：失去焦点再收集数据

          number：输入字符串转为有效的数字

          trim：输入首尾空格过滤

```html
<div id="app">
    <form @submit.prevent="demo">
        <label for="account">账号：</label>
        <input type="text" name="" id="account" v-model.trim="userInfo.account" /><br /><br />
        <label for="password">密码：</label>
        <input type="password" name="" id="password" v-model="userInfo.password" /><br /><br />
        <label for="age">年龄：</label>
        <input type="text" name="" id="age" v-model.number="userInfo.age" /><br /><br />
        性别：
        <label for="man">男</label>
        <input type="radio" name="sex" id="man" value="男" v-model="userInfo.sex" />
        <label for="woman">女</label>
        <input type="radio" name="sex" id="woman" value="女" v-model="userInfo.sex" /><br /><br />
        爱好：
        <label for="hobby1">抽烟</label>
        <input type="checkbox" name="抽烟" id="hobby1" value="抽烟" v-model="userInfo.hobby" />
        <label for="hobby2">喝酒</label>
        <input type="checkbox" name="喝酒" id="hobby2" value="喝酒" v-model="userInfo.hobby" />
        <label for="hobby3">烫头</label>
        <input type="checkbox" name="烫头" id="hobby3" value="烫头" v-model="userInfo.hobby" /><br /><br />
        所属校区：
        <select v-model="userInfo.city">
            <option value="null">请选择校区</option>
            <option value="玉林师范学院东校区">玉林师范学院东校区</option>
            <option value="玉林师范学院西校区">玉林师范学院西校区</option></select
        ><br /><br />
        其他信息：
        <textarea v-model.lazy="userInfo.textarea"></textarea>
        <br /><br />
        <input type="checkbox" name="" id="acceptUserAgreement" v-model="userInfo.acceptUserAgreement" />
        <label for="acceptUserAgreement">阅读并接受<a href="#">《用户协议》</a></label>
        <br /><br />
        <button>提交</button>
    </form>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false;
    new Vue({
        el: '#app',
        data: {
            userInfo: {
                account: '',
                password: '',
                sex: '男',
                age: '',
                hobby: [],
                city: 'null',
                textarea: '',
                acceptUserAgreement: '',
            },
        },
        methods: {
            demo() {
                console.log(JSON.stringify(this.userInfo));
            },
        },
    });
</script>
```

<a name="886f3df1"></a>
# 十、Vue生命周期
| 阶段 | 作用 |
| --- | --- |
| beforeCreate() | 将要创建 |
| created() | 创建完毕（重要），在实例挂载前geterr处理业务逻辑 |
| beforeMount() | 将要挂载 |
| mounted() | 挂载完毕(重要)，在实例挂载后geterr处理业务逻辑 |
| beforeUpdate() | 将要更新 |
| updated() | 更新完毕 |
| beforeDestroy() | 将要销毁(重要) |
| destroy() | 销毁完毕 |


常用的生命周期钩子：

        1.mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】

        2.beforeDestroy：清楚定时器、解绑自定义事件、取消订阅消息等【收尾工作】

      关于销毁Vue实力

        1.销毁后借助Vue开发者工具看不到任何消息

        2.销毁后自定义事件会失效，但原生DOM事件依然有效

        3.一般不会再beforeDestroy操作数据，因为即使操作数据，也不会再触发更新流程了

<a name="de7f762f"></a>
## 定时器案例

```html
<div id="app">
    <h1 :style="{opacity}">HolloWord</h1>
    <button @click="stop">点我停止变换</button>
</div>
```

```javascript
<script>
    Vue.config.productionTip = false;
    new Vue({
        el: '#app',
        data: {
            opacity: 1,
        },
        methods: {
            stop() {
                this.$destroy();
            },
        },
        // 挂载完毕
        mounted() {
            this.timer = setInterval(() => {
                this.opacity -= 0.01;
                if (this.opacity <= 0) {
                    this.opacity = 1;
                }
                console.log(1);
            }, 16);
        },
        // 将要销毁(销毁定时器)
        beforeDestroy() {
            clearInterval(this.timer);
        },
    });
</script>
```

<a name="293de43b"></a>
# 十一、组件

三部曲：创建组件、注册组件、使用组件

<a name="aea70a75"></a>
## 1、创建组件

```javascript
// 第一步：创建student组件
const student = Vue.extend({
    template: `
    <div>
        <h1>学生名称：{{studentName}}</h1>
        <h1>学生地址：{{studentAddress}}</h1>
    </div>
    `,
    data() {
        return {
            studentName: '韦琦峰',
            studentAddress: '广西宾阳',
        };
    },
});
```

<a name="7eff646a"></a>
## 2、注册组件

```javascript
// 第二步：创建实例并注册组件
new Vue({
    el: '#app',
    data: {
        msg: '欢迎学习Vue',
    },
    // 注册组件名称为：Mystudent
    components: {
        Mystudent: student,
    },
});
```

<a name="0e5a0a3c"></a>
## 3、使用组件

```html
<div id="app">
    <h1>{{msg}}</h1>
    <Mystudent></Mystudent>
</div>
```

<a name="a4e238ba"></a>
## 4、全局定义组件

	**全局定义组件后可使用在两个不同Vue实例**

```javascript
//注册组件（全局注册）
Vue.component('hello', hello);
```

<a name="41255f6d"></a>
## 5、嵌套组件

**首先创建组件（可见第一步）、组件嵌套、注册组件（可见第二步）、使用组件（可见第三步）**

```javascript
// 创建app组件
const app = {
    template: `
                <div>
                    <school></school>
                    <hello></hello>
                 </div>
    `,
    components: {
        // 创建app组件，组件内又有school、hello两个组件
        school,
        hello,
    },
};

// 创建实例注册组件，包括student
new Vue({
    el: '#root',
    components: {
        app,
    },
});
```

<a name="1578fcf2"></a>
# 十二、单文件组件

<a name="7bfc00f9"></a>
## 注意：直接打开浏览器会报错不显示，因为需要脚手架介入才能显示组件内容

<a name="5fc6be7b"></a>
## 步骤：创建组件 => 组件管理 => 注册组件  =>  使用组件

<a name="6a71dd76"></a>
## 1、创建组件（Student.vue）

```vue
<template>
	<div>
		<h1>学生名称：{{ name }}</h1>
		<h1>学生地址：{{ age }}</h1>
	</div>
</template>

<script>
export default {
	name: 'Student',
	data() {
		return {
			name: '韦琦峰',
			age: '21',
		};
	},
};
</script>
```

<a name="b4a5288d"></a>
## 2、组件管理（App.vue）

<a name="568a91be"></a>
### 解释：组件的管理者App.vue，所有的组件都在这里注册

```vue
<template>
	<div>
		<Student></Student>
	</div>
</template>

<script>
// 引入组件
import Student from './Student.vue';
export default {
	name: 'App',
    //注册子类组件
	components: {
		Student,
		School,
	},
};
</script>
```

<a name="ee18831d"></a>
## 3、注册组件（main.js）

<a name="58804345"></a>
### 解释：在这里创建Vue实例并注册组件

```javascript
//引入组件管理
import App from './App.vue';
new Vue({
    //挂载至root
	el: '#root',
    //APP组件管理中有Student组件
	templates: `<App></App>`,
    //注册组件管理
	comments: {
		App,
	},
});
```

<a name="0e5a0a3c-1"></a>
## 3、使用组件

```html
<body>
    <!-- 需要挂载组件的容器 -->
    <div id="root"></div>
    <!-- 引入vue的js文件 -->
    <script src="../js/vue.js"></script>
    <!-- 引入组件的js文件 -->
    <script src="./main.js"></script>
</body>
```

<a name="6abc2843"></a>
# 十三、使用脚手架

<a name="59371bb2"></a>
## 1.步骤：

注意：需要在cmd下运行安装

（1）出现下载缓慢先配置 npm 淘宝镜像：npm config set registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org)

（2）全局安装（中途卡住直接敲回车继续，安装完毕关掉重启cmd后输入vue查看是否有vue信息）：npm install -g @vue/cli

（3）切换到你要创建项目的目录，然后使用命令创建项目：vue create xxx

<a name="98eecaca"></a>
## 2.创建好后内部问文件说明
| 类型(d:文件夹，a：文件) | 最后写入时间 | 内存大小（字节）和名称 | 作用 |
| --- | --- | --- | --- |
| d | 2022/4/15     17:03 | public | 静态文件 |
| d | 2022/4/15     17:03 | src | 项目文件夹 |
| a | 2022/4/15     17:03 | 231            .gitignore | 非必要文件不上传git的文件 |
| a | 2022/4/15     17:03 | 73               babel.config.js | 编译js文件将其转换成大多数浏览器兼容的代码 |
| a | 2022/4/15     17:03 | 279             jsconfig.json | 编译后需要成为的配置文件 |
| a | 2022/4/15     17:03 | 347756       package-lock.json | 第三方包的信息（包名、版本号、下载地址等） |
| a | 2022/4/15     17:03 | 901             package.json | 当前项目信息说明书（如何运行、打包、检查、使用包的版本号信息等） |
| a | 2022/4/15     17:03 | 319             README.md | 项目说明书（怎么使用，什么方法实现了什么功能等） |
| a | 2022/4/15     17:03 | 118              vue.config.js | Vue的配置文件 |


<a name="e47fa81e"></a>
## 3.关于不同版本的Vue

1.vue.js与vue.runtime.xxx.js的区别：

	（1）vue.js是完整版的Vue，包含：核心功能+模板解析器。

	（2）vue.runtime.xxx.js是运行版的Vue，只包含：核心功能：没有模板解析器

2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到createElement函数去只能具体内容

```javascript
new Vue({
    el:'#app',
    render:h => (App),
    //同等：
    render:createElement => createElement('h1','你好啊'),
    //或者：
    render(createElement) {
    return createElement(App)
    },
    
})
```

<a name="4b29b1af"></a>
## 4、ref属性

（1）被用来给元素或组件注册引用信息（id的替代者）

（2）应用在html标签上获取的是真实DOM元素，应用在组件标签上时组件实例对象（vc）

（3）使用方式：

- 打标识

```html
<h1 v-text="msg" ref="xxx"></h1>
//或
<School ref="Sch" />
```

- 获取

```javascript
this.$refs.xxx
```

<a name="86cff837"></a>
## 5、props 配置项

功能：让组件接收外部传过来的数据

（1）传递数据：

```html
<Student name="xxx" sex="nv" :age="21" />
```

（2）传递接收：

- 第一种方式（只接收）

```javascript
props: ['name', 'sex', 'age'],//简单声明接收
```

- 第二种方式（限制类型）

```javascript
props: {
		name: String,
		sex: String,
		age: Number,
},
```

- 第三种方式（限制类型、限制必要性、指定默认值）

```javascript
props: {
		name: {
			type: String, //name的类型是字符串
			require: true, //原意：必须的、必要的；此意：名字是必传的
		},
		sex: {
			type: String, //sex的类型是字符串
			require: true, //性别是必传的
		},
		age: {
			type: Number, //age的类型是字符串
			default: 99, //默认值（在未指定必须传值的情况下使用）
		},
	},
```

**注意：props是只读的，Vue底层会监视你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。**

<a name="6d64a906"></a>
## 6、mixin（混合）配置项

功能：可以把多个组件公用的配置提取成一个混入对象；以**对象**的形式引入，接收以**数组**的形式（和props相同）

使用方式：

- 第一步**定义**混合，例如：

```javascript
export const mixin = {
    data：{......},
	methods: {
		showName() {
			alert(this.name);
		},
	},
};
```

-  第二步**使用**混合，例如：<br />（1）局部混入： 
```javascript
//引入mixin
import { mixin } from '../mixin.js';
export default {
	name: 'School',
	data() {......};
	},
    //使用
	mixins: [mixin],
};
```
<br />（2）全局混入： 

   - 全局引入后直接在功能需求的地方直接使用，各个不需要引用
```javascript
//引入mixin
import { mixin } from '../mixin.js';
//使用
```

Vue.mixin(mixin);

```



## 7、install插件

功能：用于增强Vue

本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的单数是插件使用者传递的数据

* 定义插件：

```js
export default {
  install(Vue, x, y, z) {
  	console.log(x, y, z);
  	// 定义filter全局过滤器
  	Vue.filter('mySlice', function (value) {
  		return value.slice(0, 4);
  	});

  	// 定义一个对象方式的全局的指令
  	Vue.directive('fbind', {
  		// 指令元素成功绑定时（运行打开页面就绑定，但未插入页面）
  		bind(element, binding) {
  			element.value = binding.value;
  		},
  		// 指令元素被插入页面时
  		inserted(element, binding) {
  			element.focus();
  		},
  		// 指令所在元素的模板被重新解析时
  		update(element, binding) {
  			element.value = binding.value;
  		},
  	});

  	//定义混入
  	Vue.mixin({
  		data() {
  			return {
  				x: 1,
  				y: 2,
  			};
  		},
  	});

  	//给Vue原型添加上一个hello方法（vc和vm都能用了）
  	Vue.prototype.hello = () => {
  		alert('hello');
  	};
  },
};
```

- 使用插件：

```javascript
// 使用插件
Vue.use(文件名,1,2,3);
```

<a name="938676e4"></a>
## 8、scoped样式

- 作用：让样式在局部生效，防止冲突。
- 写法如下 ↓↓↓↓↓↓↓↓↓

```css
<style scoped>
.test {
	background-color: rgba(146, 255, 246, 0.295);
}
```

<a name="c955c066"></a>
## 9、webStorage

（1）存储内容大小一般支持**5MB**左右（不同浏览器可能还不一样）

（2）浏览器通过 Window.sessionStorage 和 Window.localStorage 属性来实现本利存储机制。

（3）想换API：

```javascript
//1.该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
xxxStorage.setItem('key','value');
//2.该方法接受一个键作为参数，返回键名对应的值。
xxxStorage.getItem('key');
//3.该方法接受一个键作为参数，并把该键名从存储中删除。
xxxStorage.removeItem('key');
//4.该方法会清空存储中所有数据。
xxxStorage.clear();
```

（4）备注：

- SessionStorage存储的内容会随着浏览器窗口关闭而消失。
- LocalStorage存储的内容，需要手动清除才会消失。
- xxxStorage.getItem('key');如果key对应的value获取不到，那么getItem的返回值是null。
- Json.parse(null)的姐过依然是null。

<a name="38ed7f41"></a>
## 10、组件的自定义事件

（1）一种组件间通信的方式，适用于   子组件====>父组件

（2）使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义时间（事件的回调在A中）

（3）绑定自定义事件：

> -  第一种方式，在父组件中：`<Demoo @atduigu = "test"/>`或`<Demoo v-on:atduigu = "test"/>` 
> -  第二种方式，在父组件： 
> 
 
>  
> 3.若想让让自定义时间只能触发一次，可以使用`once`修饰符，或`$once`方法。

```javascript
<Demoo ref= "demo"/>
......
mounted(){
    this.$refs.xxx.$on('atguigu',this.test)
}
```

（4）触发自定义事件：`this.$emit('atguigu',数据)`

（5）解绑自定义事件：`this.$off('atguigu')`

（6）组件上也可以绑定原生DOM事件，需要使用`native`修饰符。

（7）注意：通过`this.$refs.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！！！

<a name="4692fb0c"></a>
## 11、全局时间总线（GlobalEventBus）

（1）一种组件间通信的方式，适用于任何组件通信

（2）安装全局事件总线：

```javascript
// 创建VM
new Vue({
	el: '#app',
	render: (h) => h(App),
	beforeCreate() {
		// 安装全局时间总线$bus，并且$bus就是当前应用的vm
		Vue.prototype.$bus = this;
	},
});
```

（3）使用事件总线：

> -  接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。 
>    - 提供数据：`this.$bus.$emit('xxx',数据)`
> 
 

```javascript
//A组件
methods(){
	demo(data){.....}
}
mounted() {
    //接收发送者的'hello'口令；若要使用函数需使用箭头函数
    this.$bus.$on('hello', (data) => {
        this.name = data;
    });
    //或者
    this.$bus.$on('xxx', this.demo)
	},
```
>  


（4）最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

<a name="63eb580e"></a>
## 12、消息订阅与发布（pubsub）

（1）一种组件间通信的方式，适用于任意组件通信。

（2）使用步骤：

> （1）安装pubsu：`npm i pubsub-js`
>  
> （2）引入：`import pubsub from 'pubsub-js'`
>  
> （3）接收数据：A组件想接收数据，则在A组建中订阅消息订阅的回调留在A组件自身
>  
>  
> （4）提供数据：`pubsub.publish('xxx',数据)`
>  
> （5）最好在beforeDestroy中，用`pubSub.unsubsribe(pubsubId)`去取消订阅
>  

```javascript
methods（）{
	demo(消息名,数据){......}
}
......
mounted(){
    this.pubsubId = pubsub.subscribe('xxx',this.demo)//订阅消息
}
```
```javascript
beforeDestroy() {
    // 在组件销毁前，解绑订阅
    pubsub.unsubscribe(this.pubsubId);
},
```

<a name="cc42e8c9"></a>
## 13、nexTick函数

（1）语法`this.$nextTick(回调函数)`

（2）作用：在下次DOM更新结束后执行其指定的回调。

（3）什么时候调用：当改变数组后，要基于更新后的新DOM进行某些操作是，要在nexTick所指定的回调函数中执行。

<a name="71538533"></a>
## 14、Vue封装的过度与动画

（1）作用：在插入、更新或移DOM元素时，在适合的时候给元素添加样式类名。

（2）图示：

![Vue动画](https://cn.vuejs.org/images/transition.png#id=R1q8z&originHeight=600&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=true&status=done&style=none&title=Vue%E5%8A%A8%E7%94%BB "Vue动画")

（3）写法：

> **1、准备好样式**
>  
> -  元素进入的样式： 
> -  元素离开的样式 
> 
 
> **2、使用**`**<transition>**`**包裹要过度的元素，并配置name属性：**
>  
>  
> **3、备注：若有多个元素动画需要过度，则需要使用：**`**transition-group**`**，且每个元素都要指定**`**key**`**值**

```html
<transition name="num_1_animation" appear>
    <h1 v-show="!isShow" key="1">你好啊{{ isShow }}</h1>
</transition>
```
> v-enter：进入的起点
>  
> v-enter：进入过程中
>  
> v-enter-to：进入的终点

>  

> v-leave：离开的起点
>  
> v-leave-active：离开过程中
>  
> v-leave-to：离开的终点

>  

