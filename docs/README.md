## Vueの基礎

### 1. はじめに

```javascript
/*Vue.js*/
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello, Vue.js'
});
```

```html
<!-- テンプレート構文 -->
<div id="app">
  <h1>{{ message }}</h1>
</div>
```

```html
<!-- v-textディレクティブ -->
<div id="app">
  <h1 v-text="message"></h1>
</div>
```

### 2. タグ属性へのバインド

- タグの属性値をv-bindを使って設定する
- オブジェクト利用して適用した場合は、**キャメルコード**で記述する
- :class="{クラス名: プロパティ名 or 真偽値}"

```javascript
/*Vue.js*/
const app = new Vue({
    el:'#app',
    data: {
        google: 'https://google.com',
        style: 'font-size:12px; color:red',
        applyFontSize: '12px',
        fontColor: 'red',
      	isActive: true,
      	hasError: false,
      	setActive: 'active',
    }
});
```

```html
<div id="app">
  <!--vueインスタンスのプロパティを参照する -->
  <a v-bind:href="google" v-bind:style="style">検索エンジン</a>
  <!--オブジェクトを利用して適用する -->  
  <a v-bind:style="{ fontSize:applyFontSize, color:fontColor }">検索エンジン</a>
  <!--class属性へのバインド(真偽値)-->  
  <h1 v-bind:class="{ active:isActive, error:hasError }">class属性のバインド</h1>
  <!--class属性へのバインド(配列) *直接クラス名を指定する場合は配列にする -->    
  <h1 v-bind:class="[setActive]">class属性のバインド</h1>
</div>
<style>
  .active {}
  .error {}
</style>
```

### 3. 条件付きレンダリング

- v-ifによる表示の切り替え（removeChild()と同義）

```javascript
const app = new Vue({
  el:'#app',
  data: {
    stock_number:0,
})
```

```html
<div id="app">
  <p v-if="stock_number > 3">販売中です</p>
  <p v-else-if="stock_number <= 3">残りわずか</p>
  <p v-else>在庫切れ</p>
</div>
```

- v-showによる表示の切り替え（display:noneと同義）

  v-else等による表示の切り替えができない

```html
<div id="app">
  <p v-show="stock_number > 0">販売中です</p>
</div>
```

- 複数の要素の表示/非表示

  templateタグで一括して表示/非表示を切り替える

```html
<div id="app">
  <template v-if="stock_number > 0">
    <p>販売中です</p>
    <p>残り在庫: {{ stock_number }}</p>
  </template>
</div>
```

### 4. リストレンダリング

- 配列のリスト表示

```javascript
const app = new Vue({
    el:'#app',
    data: {
        friends: ['Ken', 'Mike', 'John', 'Lisa']
    }
});
```

```html
<div id="app">
  <ul>
    <li v-for="friend in friends">{{ friend }}</li>
  </ul>
</div>
```

- 配列+オブジェクトのリスト表示

```javascript
const app = new Vue({
    el:'#app',
    data: {
        users: [
            { id:1, name:'Ken', age:20 },
            { id:2, name:'Mike', age:23 },
            { id:3, name:'John', age:21 },
            { id:4, name:'Lisa', age:20 },
        ]
    }
});
```

```html
<div id="app">
  <ul>
    <li v-for="user in users">{{ user.name }}({{ user.age}})</li>
  </ul>
</div>
```

- 配列とオブジェクトの組み合わせ

```html
<div id="app">
  <ul>
    <li v-for="(user, index) in users">{{index}}: {{user.name}}</li>
  </ul>
</div>
```

- オブジェクト in オブジェクトのリスト表示

  引数の順番は(Object, key, index)

```JavaScript
const app = new Vue({
    el:'#app',
    data: {
        users: {
            'Ken': {
                age: 20,
                email: 'ken@gmail.com'
            },
            'Mike': {
                age: 23,
                email: 'mike@yahoo.com'
            }
        }
    }
});
```

```html
<div id="app">
  <ul>
    <li v-for="(user, name, index) in users">{{name}}: {{user.email}}</li>
  </ul>
</div>
```

### 5. フォーム入力(v-model)

- input要素にvalueを指定しても反映されない。vueインスタンスのプロパティに設定する

```JavaScript
const app = new Vue({
    el:'#app',
    data: {
        textInput: '',
    }
});
```

```html
<div id="app">
  <input type="text" v-model="textInput" value="vuejs"> <!--valueは反映されない-->
  <p>{{ textInput }}</p>
</div>
```

### 6. イベント(v-on)

```javascript
const app = new Vue({
    el:'#app',
    data: {
        isActive: true,
    },
    methods: {
        classToggle() {
            this.isActive = !this.isActive
        }
    }
});
```

```html
<!-- v-onイベントでclassの適用/非適用を切り替える-->
<div id="app">
  <h1 :class="{active: isActive}">Hello World</h1>
  <button v-on:click="classToggle">Button</button>
</div>
<style>
  .active {}
</style>
```

### 7. 算出プロパティ

Vueインスタンスのdataを利用して別の処理を行う

```javascript
const app = new Vue({
    el:'#app',
    data: {
        inputCharactors:''
    },
    computed: {
        inputNumber() {
            return this.inputCharactors.length;
        },
        needNumbers() {
            return 10 - this.inputNumber;
        }
    }
});
```

```html
<!--文字数が10文字以上ならその旨を、それ以下なら不足している文字数を表示する-->
<div id="app">
  <p>10文字以上の文字列を入力してください</p>
  <input type="text" v-model="inputCharactors">
  <p v-if="inputNumber < 10">必要な文字数は{{ needNumbers }}です</p>
  <p v-else>10文字以上入力されています</p>
</div>
```

### 8.データを監視する(watch)

watch(key: callback)ーkeyはデータを監視する評価式、callbackはコールバック関数

```JavaScript
const app = new Vue({
    el:'#app',
    data: { count:0 },
    watch: {
        count: function(value) {
            if(value > 100) console.log('入力値が100を超えました');
        }
    }
});
```

```html
<div id="app">
  <input type="number" v-model="count">
</div>
```

- 直前の値を保持する

  ```javascript
  const app = new Vue({
      el:'#app',
      data: { count:0 },
      watch: {
          count: function(next, prev) {
              console.log(`next: ${next}`);
              console.log(`prev: ${prev}`);
          }
      }
  });
  ```

  

## Vueコンポーネント

### 1. グローバルコンポーネント

 ```JavaScript
/*Vueインスタンスよりも先に定義する*/
Vue.component('hello-world', {
    template: '<h1>Hello, World</h1>'
});
const app = new Vue({
    el:'#app',
    data: {},
});
 ```

```html
<div id="app">
    <hello-world></hello-world>
    <hello-world></hello-world> <!--再利用できる-->
</div>
```

### 2. ローカルコンポーネント

```javascript
const app = new Vue({
    el:'#app',
    data: {},
    components: {
        'hello-world': {
            template: '<h1>Hello World</h1>'
        }
    }
});
```

### 3. グローバルとローカルの違い

```javascript
Vue.component('hello-world', {
    template: '<h1>Hello World</h1>'
})
const app = new Vue({
    el:'#app'
});
const app2 = new Vue({
    el:'#app2',
    data: {},
    components: {
        'hello-view': {
            template: '<h1>Hello View</h1>'
        }
    }
});
```

```html
<div id="app">
    <hello-world></hello-world>
    <hello-view></hello-view> <!--レンダリングされない-->
</div>
<div id="app2">
    <hello-world></hello-world>
    <hello-view></hello-view>    
</div>
```

### 4. templateタグに複数タグ

- templateタグは1つのルート要素出なければならない

 ```javascript
Vue.component('hello-world', {
    /*template: '<p>{{ message }}</p><p>Hello World</p>',*/ //NG(2つのルート要素)
    template: '<div><p>{{ message }}</p><p>Hello World</p></div>', //OK(1つのルート要素)
    data() {
        return {
            message: 'Hello Vue'
        }
    }
})
 ```

### 5. コンポーネントでdata/methodsを使う

- コンポーネントではdataプロパティは関数にする

```javascript
Vue.component('button-counter', {
    template: `
        <p>カウント:{{count}}
            <button v-on:click="countUp">Up</button>
            <button v-on:click="countDown">Down</button>
        </p>
    `,
    data() {
        return { count:0 }
    },
    methods: {
        countUp() { this.count++ },
        countDown() { this.count-- }
    }
});
```

```html
<div id="app">
    <button-counter></button-counter> <!--それぞれ独立してカウントされる-->
    <button-counter></button-counter> <!--それぞれ独立してカウントされる-->
</div>
```

### 6. データの受け渡し（親→子）

- 親の属性を子へ

```javascript
/*子コンポーネント*/
Vue.component('hello-world', {
    template: '<h1>Hello World and {{ message }}</h1>',
    props: ['message']
})
```

```html
<!--親コンポーネント-->
<div id="app">
    <hello-world message="Hello Vue"></hello-world>
</div>
```

- 親のdataプロパティを子へ
  - v-bindとpropsを使って渡す

```javascript
/*子コンポーネント*/
Vue.component('hello-world', {
    template: '<h1>Hello World and {{ message }}</h1>',
    props: ['message']
})
/*親コンポーネント*/
const app = new Vue({
    el:'#app',
    data: { inputText:'' }
});
```

```html
<!--親コンポーネント-->
<div id="app">
    <input type="text" v-model="inputText">
    <hello-world v-bind:message="inputText"></hello-world> //ココ
</div>
```

- リストデータを子に渡す

```javascript
/*子コンポーネント*/
Vue.component('blog-post', {
    template: `<div><h2>{{post.title}}</h2><p>{{post.content}}</p></div>`,
    props: ['post']
})
/*親コンポーネント*/
const app = new Vue({
    el:'#app',
    data: {
        posts: [
            { id:0, title:'vue.jsの基礎', content:'about vue.js...' },
            { id:1, title:'componentの基礎', content: 'about component...' },
            { id:2, title:'Vue CLIの基礎', content: 'about Vue CLI...' }
        ]
    }
});
```

```html
<!--親コンポーネント-->
<div id="app">
    <!--[TIPS] v-forでv-bind:keyを指定しないと怒られる-->
    <blog-post v-for="post in posts" :key="post.id" :post="post"></blog-post> //ココ
</div>
```

### 7. データの受け渡し（子→親）

- $emitを使って子から親へ（子イベントで親イベントを起爆する）
  1. 子コンポーネントで子イベントを設定する
  2. 子イベント内で$emitメソッドを実行し、親イベントを発火させる
  3. 親イベントが発火してメソッドが実行される

```javascript
/*子コンポーネント*/
Vue.component('emit-event', {
    template: `<button v-on:click="clickEvent">Button</button>`,
    methods: {
        clickEvent() {			//①子イベント発火
          this.$emit('from-child')	//②親イベント起爆
        }
    }
})
/*親コンポーネント*/
const app = new Vue({
    el:'#app',
    methods: {
        alertMessage() { alert('子からイベント受け取ったよ'); } //④親イベントのメソッド実行
    }
});
```

```html
<!--親コンポーネント-->
<div id="app">
    <emit-event v-on:from-child="alertMessage"></emit-event> //③親イベント発火
</div>
```

- v-on:clickに直接$emitを記述する

```javascript
Vue.component('emit-event', {
    template: `<button v-on:click="$emit('from-child)">Button</button>`,
})
```

- 子から親へdataプロパティを送る

  ```javascript
  $emit(eventName, [...args]) //argsはリスナのcallback関数に渡される
  ```

  ```JavaScript
  Vue.component('emit-event', {
      template: `
          <div>
              <input type="text" v-model="inputText">
              <button @click="clickEvent">Submit</button>
          </div>
      `,
      data() {return {inputText:''}},
      methods: {
        	/*①親イベント(from-child)に子のdataを渡す*/
          clickEvent() { this.$emit('from-child', this.inputText) }
      }
  })
  const app = new Vue({
      el:'#app',
      data: { message:'' },
      methods: {
          receiveMessage(message) {
              this.message = message; //②子から渡されたdataを親dataに代入
          }
      }
  });
  ```

  ```html
  <div id="app">
      <p>{{ message }}</p>　<!--③子から渡されたdataが表示される-->
      <emit-event v-on:from-child="receiveMessage"></emit-event>
  </div>
  ```

### 8. コンポーネントとSlot

- Slotー親コンポーネントから子コンポーネントにコンテンツを挿入する

```JavaScript
Vue.component('slot-test', {
    template: '<p><slot>デフォルト</slot></p>'
})
```

```html
<div id="app">
    <slot-test>スロットによる挿入</slot-test>
    <slot-test></slot-test> <!--デフォルトが表示される-->
</div>
```

- 名前付きスロット
  - 子: slotタグのname属性にslot名をつける
  - ~~親: 挿入するタグのslot属性にslot名をつける~~ ＊スロット属性を設定したタグもレンダリングされる
  - 親: templateタグのslot属性にslot名をつける

```javascript
/*子コンポーネント*/
Vue.component('slot-test', {
    template: `
        <div>
            <h1><slot name="title">タイトル</slot></h1>
            <p><slot name="content">内容</slot></p>
        </div>
    `
})
```

```html
<!--親コンポーネント-->
<div id="app">
    <slot-test>
        <div slot="title">vue.jsの基礎</div>
        <p slot="content">vue.jsについて</p>
    </slot-test>
</div>
<!--レンダリングされたHTML-->
<div>
  <h1><div>vue.jsの基礎</div></h1>
  <p><p>vue.jsについて</p></p>
</div>
```

```html
<!--親コンポーネント-->
<div id="app">
    <slot-test>
        <template slot="title">vue.jsの基礎</template>
        <template slot="content">vue.jsについて</template>
    </slot-test>
</div>
<!--レンダリングされたHTML-->
<div>
  <h1>vue.jsの基礎</h1>
  <p>vue.jsについて</p>
</div>
```



## Slot（vue.js2.6+/vue-cli）- Vuetifyへの渡り -

### 1. 基本のSlot

- 親コンポーネントから子コンポーネントにコンテンツを挿入する

```vue
/*User.vue - 子コンポーネント*/
<template>
	<p>この人の名前は<slot>名無しの権兵衛</slot>です</p> //デフォルト値
</template>
<script>
export default {
}
</script>
```

```vue
/*Test.vue - 親コンポーネント*/
<template>
    <User>John Doe</User>	//この人の名前はJohn Doeです
    <User></User>		//この人の名前は名無しの権兵衛です
</template>
<script>
import User from './components/User'
export default {
    name: 'test',
    components: { User },
}
</script>
```

### 2. Named Slot（名前付きスロット）

- 子: slotタグのname属性にslot名をつける
- 親: templateタグの**v-slotディレクティブ**にslot名をつける

```vue
/*User.vue - 子コンポーネント*/
<template>
    <ul>
        <li>NAME:<slot>名無しの権兵衛</slot></li>
        <li>AGE:<slot name="age">記入なし</slot></li>
        <li>SEX:<slot name="sex">不明</slot></li>
    </ul>
</template>
<script>
export default {
}
</script>
```

```vue
/*Text.vue - 親コンポーネント*/
<template>
    <User>
        <template v-slot:default>John Doe</template>
        <template v-slot:age>25</template>
        <template v-slot:sex>男性</template>
    </User>
</template>
<script>
import User from './components/User'
export default {
    name: 'test',
    components: { User },
}
</script>
```

```html
NAME:John Doe
AGE:25
SEX:男性
```

### 3. v-slotの省略記法(#)

- v-slot:slotName -> #slotName

### 4. Scoped Slot（スコープ付きスロット）

- 子コンポーネントのdataプロパティを親コンポーネントで使用する
  - 子コンポーネントはv-bindでdataを渡して、親コンポーネントはv-slotでdataを受け取る

```vue
/*User.vue - 子コンポーネント*/
<template>
<span>
    <slot name="firstName" v-bind:user="user">{{ user.lastName }}</slot> //親にdataを渡す
</span>
</template>
<script>
export default {
    data() {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
                age:'25',
                sex:'男性'
            }
        }        
    }
}
</script>
```

```vue
/*Test.vue - 親コンポーネント*/
<template>
    <User v-slot:firstName="slotProps">　//子のデータを受け取る
      {{ slotProps.user.firstName }}　//John:子から受け取ったslotPropsプロパティを参照する
    </User>
    <User></User> //Doe:デフォルト値（子コンポーネントが自身のdataプロパティ）を参照する
</template>
<script>
import User from './components/User'
export default {
    name: 'test',
    components: {
        User,
    },
}
</script>
```

```html
JohnDoe
<!--slotPropsの中身-->
{ "user": { "firstName": "John", "lastName": "Doe", "age": "25", "sex": "男性" } }
```

- v-slotに子のdataプロパティ（オブジェクト）をそのまま代入する

```vue
/*Test.vue - 親コンポーネント*/
<template>
<div>
    <User v-slot:firstName="{ user }">{{ user.firstName }}</User>
</div>
</template>
<script>
import User from './components/User'
export default {
    name: 'test',
    components: {
        User,
    },
}
</script>
```

- 複数のdataプロパティを渡す
  - 親コンポーネントのv-slotでまとめて取得できる

```vue
<template>
<span>
    <slot name="firstName" v-bind:user="user" v-bind:message="message">
        {{ user.lastName}}
    </slot>
</span>
</template>
<script>
export default {
    data() {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
                age:'25',
                sex:'男性'
            },
            message: 'Hello Scoped Slot',
        }        
    }
}
</script>
```

```vue
<template>
<div>
    <User v-slot:firstName="childProps">{{ childProps }}</User>
</div>
</template>
<script>
import User from './components/User'
export default {
    name: 'test',
    components: {
        User,
    },
}
</script>
```

```html
{
	"user": { "firstName": "John", "lastName": "Doe", "age": "25", "sex": "男性" },
	"message": "Hello Scoped Slot"
}
```

- 関数（methods）を渡す

```vue
/*Menu.vue - 子コンポーネント*/
<template>
<div>
    <button @click="on">Click</button>　//子のボタンとメソッドで制御してるだけ（関数渡してない）
    <slot v-if="display"></slot>
</div>
</template>
<script>
export default {
    data() { return { display:true } },
    methods: {
        on() { return this.display = !this.display }
    }
}
</script>
```

```vue
/*Test.vue - 親コンポーネント*/
<template>
<Menu>
    <ul>
        <li>List1</li>
        <li>List2</li>
        <li>List3</li>
    </ul>
</Menu>
</template>
<script>
import Menu from './components/User'
export default {
    name: 'test',
    components: {
        Menu,
    },
}
</script>
```

- 親から表示/非表示を切り替える

```vue
/*子*/
<template>
<div>
    <slot name="activator" v-bind:on="on"></slot> //親に関数を渡す
    <slot v-if="display"></slot>
</div>
</template>
<script>
export default {
    data() { return { display:true } },
    methods: {
        on() { return this.display = !this.display }
    }
}
</script>
```

```vue
/*親*/
<template>
<Menu>
    <template v-slot:activator="{ on }"> 		//子のon関数を受け取り
        <button v-on:click="on">Click it</button>	//挿入するタグのリスナに設定
    </template>
    <ul>
        <li>List1</li>
        <li>List2</li>
        <li>List3</li>
    </ul>
</Menu>
</template>
```

### 5. 【まとめ】再利用可能なテーブルコンポーネント

```vue
/*子 - Table.vue*/
<template>
    <table border="1">
        <thead>
            <tr>
                <th v-for="row_name in header" :key="row_name">{{ row_name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index"> //親dataを受け取る
                <slot v-bind:item="item"> //親にitemを渡す
                  	//デフォルト: 親からコンテンツが渡されなければ普通にレンダリングする
                    <td v-for="(value, index) in item" :key="index">{{ value }}</td>
                </slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        header: {
            type: Array,
            required: true,
        },
        items: { type: Array, }        
    },
}
</script>
```

```vue
/*親 - 親側でテーブルのカラム構造を可変させる*/
<template>
<Table :header="header" :items="items"> //子にdataを渡す
  	/*ID, NAME, EMALのカラムを表示する場合*/
    <template v-slot:default="{item}"> //子のitemを受け取ってslotを差し替える
        <td>{{item.id}}</td>
        <td>{{item.firstName}} {{item.lastName}}</td>
        <td>{{item.email}}</td>
    </template>
		/*全てのカラムを表示する場合 -> templateタグを削除する*/
</Table>
</template>
<script>
import Table from './components/Table'
export default {
    name: 'test',
    components: {
        Table,
    },
    data() {
        return {
            // header:['ID', 'FIRSTNAME', 'LASTNAME', 'EMAIL'],
            header:['ID', 'NAME', 'EMAIL'],
            items: [/*省略*/]
        }
    }
}
</script>
```

### 6. 【おまけ】this.$slotsの中身

```vue
<template>
<div>
    <h1><slot name="title">Title</slot></h1>
    <p><slot></slot></p>
    <p>Slot:{{slotValue}}</p>
</div>
</template>
<script>
export default {
    computed: {
        slotValue() { return this.$slots; }
    }
}
</script>
```

```vue
<template>
<div>
    <BlogPost>
        <template #title>vue.js</template>
        I'd like to know about $vm.slots.
    </BlogPost>
</div>
</template>
<script>
import BlogPost from './components/User';
export default {
    name: 'test',
    components: { BlogPost }
}
</script>
```

```javascript
this.$slots.default[0].text //Slotの値
```

```html
Slot:{ "default": [ { "text": " I'd like to know about $vm.slots. ", "raw": false, "isStatic": false, "isRootInsert": true, "isComment": false, "isCloned": false, "isOnce": false, "isAsyncPlaceholder": false } ], "title": [ { "text": "vue.js", "raw": false, "isStatic": false, "isRootInsert": true, "isComment": false, "isCloned": false, "isOnce": false, "isAsyncPlaceholder": false } ] }
```





## Render関数

### 1. vue-cliのrender関数

```javascript
new Vue({
	render:h => h(App),
}).$mount('#app');
/*h:hyper Scriptの略で以下と同義*/
new Vue({
  render:function(createElement) {
  	return createElement(App);
  }
});
```

### 2. 基本のrender関数

```vue
<div id="app"></div>
<script>
const app = new Vue({
    el:'#app',
    data: {
        message: 'Hello World'
    },
    render(createElement) {
        return createElement('h1',
        {
            class:'hello',
            style:'background-color:red; color:white;'
        },
        this.message);
    }
});
</script>
```

- v-bindでclassを設定する

```javascript
const app = new Vue({
    el:'#app',
    data: {
        message: 'Hello World',
        isActive: true,
        isFalse: false,
    },
    render(createElement) {
        return createElement('h1', { class: {
            foo: this.isActive,
            bar: this.isFalse
        }}, this.message);
    }
});
```

- イベントを設定する

```javascript
const app = new Vue({
    el:'#app',
    data: {
        message: 'Hello World',
    },
    methods: {
        alert() { alert('click') }
    },
    render(createElement) {
        return createElement('h1', { on:
            { click: this.alert }
        }, this.message)
    }
});
```

- 子要素を追加する

```javascript
const app = new Vue({
    el:'#app',
    data: {
        message: 'Hello World',
    },
    render(createElement) {
        return createElement('ul', {class:'hello'},
            [
                createElement('li', this.message),
                createElement('li', 'Hello Vue')
            ]
        );
    }
});
```

### 3. コンポーネントでrender関数を使う

```vue
/*親*/
<template>
<div><Header :level="1">Render関数を理解する</Header></div>
</template>
<script>
import Header from './components/Header';
export default {
    name: 'test',
    components: { Header }
}
```

```vue
/*子- render関数を使う場合*/
<script>
export default {
    name: 'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    render: function(createElement) {
        return createElement(
            'h' + this.level,
            this.$slots.default
        )
    },
}
</script>
```

```vue
/*子- templateタグを使う場合*/
<template>
    <h1 v-if="level === 1"><slot></slot></h1>
</template>
<script>
export default {
    name: 'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
}
</script>
```

- h2タグに変更する場合
  - render関数ー親コンポーネントを変えるだけ（再利用性が高い）
  - templateタグーh2,h3,...と子コンポーネントを条件を都度変更する

```vue
/*親 - render関数を使う場合*/
<template>
<div><Header :level="2">Render関数を理解する</Header></div> //levelの値を変えるだけ
</template>
<script>
import Header from './components/Header';
export default {
    name: 'test',
    components: { Header }
}
```

```vue
/*子- templateタグを使う場合*/
<template>
<div>
    <h1 v-if="level === 1"><slot></slot></h1>
    <h2 v-if="level === 2"><slot></slot></h2>
</div>
</template>
<script>
export default {
    name: 'Header',
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
}
</script>
```



## Vue Router

## Vuetify



