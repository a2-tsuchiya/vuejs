# vuejs

## Vueオブジェクト

- Vueインスタンスをマウントした要素とその子孫にだけ適用される

- コンポーネントはtemplate, data, methodsで構成する
- Vueインスタンスのthisは自身を参照する
- Vueインスタンスのプロパティにアロー関数を使うと詰む！？
  - アロー関数はthisを束縛しない（呼び出し元のthisが保証される）
  - アロー関数を使うとthisの参照がwindowになってしまう

```javascript
new Vue({
  el:'マウントさせるDOM要素'
  data:'UIの状態'
  template:'DOMのマッピング定義'
  methods:'イベント発生時のイベント'
});
```

### テンプレート構文

```javascript
const items = [
	{
		name: 'pencil',
		price: 300,
		quantity: 0
	},
	{
		name: 'note',
		price: 400,
		quantity: 0
	},
	{
		name: 'eracer',
		price: 500,
		quantity: 0
	}
];
```

- #### Mustache記法によるデータの展開（{{ }}）

  - {{と}}の間にデータや式を記述する

    ```javascript
    /*vue.js*/
    new Vue({
      data: { items:items }
    }).$mount('p');
    ```

    ```html
    <!--index.html-->
    <p>{{items[0].name}}: {{items[0].price}} * {{items[0].quantity}}</p>
    ```

    

- #### ディレクティブによるHTML要素の拡張（v-で始まる属性）

  -  v-bind:属性名="dataプロパティの属性値"

    - Vue -> HTMLへの単方向データバインディング

    ```javascript
    /*vue.js*/
    new Vue({
      data: { canBuy:false }
    }).$mount('#b-button');
    ```

    ```html
    <!--index.html-->
    <button id="b-button" v-bind:disabled="!canBuy">Buy</button>
    ```

  - v-if/v-show="boolean"（条件付きレンダリング）

    - v-fiーDOM要素を追加、削除する
    - v-showーdisplayプロパティを切り替える

    ```html
    <!--index.html-->
    <p v-show="boolean">
      // 真なら表示、偽なら非表示
    </p>
    ```

  - class/styleのバインディング

    - v-bind:class="オブジェクト・配列"

      - 値が真のプロパティ名をclass属性値として反映する

        ```html
        <p v-bind:class="{error:!boolean}"></p> //boolean=falseならerrorクラスを付与
        ```

        or

        ```javascript
        /*vue.js - 算出プロパティとしてVue側に記述する（推奨）*/
        computed: {
          errorMessageClass: function() {
          	return { error:boolean }
          }
        ```

        ```html
        <p v-bind:class="errorMessageClass"></p>
        ```

    - v-bind:style="オブジェクト・配列"

      - オブジェクトのプロパティがスタイルのプロパティに対応する

        ```html
        <p v-bind:style="{color:red}"></p>
        ```

        or

        ```javascript
        /*vue.js - 算出プロパティとしてVue側に記述する（推奨）*/
        computed: {
        	errorMessageStyle: function() {
          	return {
            	boder: this.boolean ? '':'1px solid red',
              color: this.boolean ? '':'red'
            }
          }
        }
        ```

        ```html
        <p v-bind:style="errorMessageStyle"></p>
        ```

    - v-bindの省略記法

      ```JavaScript
      v-bind:disabled -> :disabled
      ```

    - v-for（リストレンダリング）

      - パフォーマンス向上のためv-bind:key= ~で一意なキーを各要素に与える（推奨）

      ```html
      <ul>
      	<li v-for="要素 in 配列" v-bind:key="要素"></li>
        <li v-for="(要素, インデックス) in 配列" v-bind:key="インデックス"></li>
        <li v-for="値 in オブジェクト"></li>
        <li v-for="(値, キー) in オブジェクト">
      </ul>
      
      ```

    - v-on（イベントハンドリング）

      ```html
      <!-- v-on:イベント名="式として実行したい属性値" -->
      <ul>
        <li v-for="item in items" v-bind:key="item.name">
          <input type="number" v-on:input="item.quantity = $event.target.value"
                 v-bind:value="item.quantity">
        </li>
      </ul>
      ```

    - v-onの省略記法

      ```javascript
      v-on:click -> @click
      ```

    - v-model（フォーム入力バインディング）

      - Vue <-> HTMLの双方向データバインディング

      ```html
      <!-- v-model 上述v-onの置換ver -->
      <ul>
        <li v-for="item in items" v-bind:key="item.name">
          <input type="number" v-model="item.quantity" min="0">
        </li>
      </ul
      ```

      

### フィルタ

テキストフォーマット処理をするコンストラクタオプション（パイプ記法）

```javascript
/*vue.js - 数値を3桁カンマ区切りにする*/
new Vue({
  data: { items:items }
  filters: {
  	numberWithDelimiter: (value) => {
  		if(!value) return '0';
  		return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		}
	}
}).$mount('p');
```

```html
<!--index.html-->
<p>{{items[0].price | numberWithDelimiter}}</p> //3,000
```



### 算出プロパティ（computed）

データそのものに処理を与えたものをプロパティにする

```javascript
let vm = new Vue({
	data: {
		items: items
	computed: {
		totalPrice: function() {
			return this.items.reduce((sum, item) => {
				return sum + (item.price * item.quantity);
			}, 0);
		},
		totalPriceWithTax: function() {
			return Math.floor(this.totalPrice * 1.08);
		}
	}
}).$mount('p');
```

```html
<!--index.html-->
<p>{{totalPriceWithTax}}</p> //1296
```



### ライフサイクルフック

Vueインスタンスの生成から消滅までに発生するイベント（フック）

- beforeCreate/createdーインスタンスが生成され、データが初期される前／後
- beforeMount/mountedーインスタンスがDOM要素にマウントされる前／後
- beforeUpdate/updatedーデータが変更され、DOMに適用される前／後
- beforeDestroy/destroyedーVueインスタンスが破棄される前／後

### メソッド（methods）

Vueインスタンスのメソッドを定義する

- v-onディレクティブにメソッドを指定すると、デフォルトでイベントオブジェクトを引数にとる

```javascript
/*vue.js*/
methods: {
  doBuy: function(event) { //EventListenerのイベントオブジェクトと同様
    alert(`${this.totalPriceWithTax}円のお買い上げ`);
    this.items.forEach(item => item.quantity = 0);
  }
}
```

```html
<button v-bind:disabled="!canBuy" v-on:click="doBuy">Buy</button>
```

### computedとmethodsの違い

- computedー計算結果をキャッシュし、依存するデータが変更しない限り再計算しない

  ※Vueインスタンスのデータでないものの変更は検知しない（日付、DOMの状態など）

- methodsーキャッシュしない。呼ばれるたびに計算する



### watch { [key: string]: string | Function | Object | Array}

パラメータの変更を検知する。キーが監視する評価式、値が対応するコールバック関数

例）Ajaxによる非同期通信を行う場合 -> created+watchを使って$routeオブジェクトを監視する

```JavaScript
const VueComponent = Vue.extend({
  template: {...},
  data: {...},
  created: function() { this.fetchData(); },
  /*Ajaxによる非同期通信を監視する*/
  watch: { '$route': 'fetchData' }, //メソッド名を文字列で指定可
  methods: { fetchData: function() {
    asyncApiOperation(); //非同期処理
  }
}),
```



## コンポーネント

Vue.jsのコンポーネントは、再利用可能なVueインスタンス

### Vueコンポーネントの定義（グローバルコンポーネント）

- #### カスタムタグ方式 - Vue.Component()

  ```javascript
  Vue.component(tagName, options) //tagName:カスタムタグ
  ```

  ```html
  <div id="main">
    <fruits-list></fruits-list>
  </div>
  <script>
    //子コンポーネント
    Vue.component('fruits-list-title', {
      template: '<h1>フルーツ一覧</h1>'
    });
    //親コンポーネント
    Vue.component('fruits-list', {
      template: '<div><fruits-list-title></fruits-list-title></div>'
    });
    new Vue({ el:'#main' });
  </script>
  ```

  - コンポーネントは再利用できる
  - コンポーネントは親子関係をもつ

- #### サブコンストラクタ方式 - Vue.Extend()

  Vueコンストラクタを継承してサブクラスコンストラクタを作成する

  ```html
  <div id="fruits-list"></div> <!--a.直接インスタンス化する場合-->
  <div id="fruits-list">
  	<fruits-list-title></fruits-list-title> <!--b.カスタムタグを使用する場合-->
  </div>
  ```

  ```javascript
  /*vue.js*/
  let FruitsListTitle = Vue.extend({
  	template: '<h1>フルーツ一覧</h1>'
  });
  // a.直接インスタンス化する場合
  new FruitsListTitle().$mount('#fruits-list') 
  // b.カスタムタグを使用する場合
  Vue.component('fruits-list-title', FruitsListTitle)
  new Vue({el:'#fruits-list'});
  ```

- #### ローカルコンポーネントの定義

    特定のVueインスタンスの中でのみ使えるコンポーネント

  ```html
  <div id="fruits-list">
    <fruits-list-title></fruits-list-title>
  </div>
  <script>
    new Vue({
      el: '#fruits-list',
      components: {
        // カスタムタグで定義
        'fruits-list-title': {
          template: '<h1>フルーツ一覧</h1>'
        },
        // サブコンストラクタで定義
        'fruits-list-title': FruitsListTitle
      }
    }); 
    let FruitsListTitle = Vue.extend({ template:'<h1>フルーツ一覧</h1>' })
  </script>
  ```

- #### text/x-template

  1. type="text/x-template"を指定したscript要素にidを付与する

     ※text/x-templateはHTMLが認識できないMINEタイプなのでVue.jsだけが処理する

  2. Vueコンポーネントのtemplteプロパティに定義したidを指定する

  ```html
  <div id="fruits-list">
    <fruits-list-title></fruits-list-title>
  </div>
  <script type="text/x-template" id="fruits-list-title">
  		<h1>フルーツ一覧</h1>		
  </script>
  <script>
    Vue.component('fruits-list-title', {
      template: '#fruits-list-title'
    });
    new Vue({
      el:'#fruits-list'
    });		
  </script>
  ```

  - ある程度複雑なテンプレートを書くときに使うと良いが、分離するので注意する

- #### 描画関数

  render関数を使ってコードで要素を生成する

  ```html
  <!--<input type="date" value="[today]">を生成する-->
  <div id="app">
  		<input-date-with-today></input-date-with-today>
  	</div>
  	<script>
  		Vue.component('input-date-with-today', {
  			render: function(createElement) {
  				return createElement(
  					'input',
  					{
  						attrs: {
  							type: 'date',
  							value: new Date().toISOString().substring(0,10)
  						}
  					}
  				);
  			}
  		});
  		new Vue({ el:'#app' });
  	</script>
  ```

  

- #### 単一ファイルコンポーネント（後述）

### コンポーネントのデータ

- コンポーネントのdataは関数で定義する
- コンポーネントの全てのインスタンスでdataオブジェクトを共有する

```javascript
Vue.component('fruits-list-title', {
  template: '<h1>{{ fruits[0] }}</h1>',
  data: function() {
    return { fruits:['apple','orange'] }
});
```



### コンポーネント間の通信

- #### 親コンポーネント -> props -> 子コンポーネント

  - propsオプション

    ```javascript
    Vue.component('コンポーネント名', {
      props: {
        '親から受け取る属性名': {
        	type: 'データ型',
          default: '初期値',
          required: '必須かどうかの真偽値',
          validator: 'バリデーション用の関数'
       	}
      },
      template:'<p>{{親から受け取る属性}}</p>' //使える
    })
    ```

  - ケバブケースとキャメルケース

    HTMLの属性名は大文字小文字を区別しない（キャメルケースで書いても認識しない）ので、

    HTML内ではケバブケース、JavaScript内ではキャメルケースで記述する。

    ```html
    <div id="app">
      <!-- HTML内ではケバブケース-->
      <item-desc v-bind:item-name="myItem"></item-desc>
    </div>
    <script>
    	Vue.component('item-desc', {
      	props: {
          // JavaScript内ではキャメルケース
        	itemName: {
          	type: String
          }
        },
        template: '<p>{{itemName}} is useful</p>'
      });
    	new Vue({
      	el:'#app',
        data:{ myItem:'pen' }
      });
    </script>
    ```

    

- #### 子コンポーネント -> event -> 親コンポーネント

  カスタムイベントを使用する（子で発火させて、親にリスナをセットする）

  <子コンポーネント側>

  1. （クリック時）v-on:clickでaddToCart()メソッドが呼ばれる
  2. addToCartメソッド内でincrementカスタムイベントが発火する

  <親コンポーネント側>

  3. v-onでincrementイベントをlistenしてるのでイベントが発火する
  4. incrementCartStaus()メソッドが呼ばれる

  ```html
  <div id="fruits-counter">
    <div v-for="fruit in fruits">
      {{fruit.name}}: 
      <counter-button v-on:increment="incrementCartStatus()"></counter-button>
    </div>
    <p>合計: {{total}}</p>
  </div>
  ```

  ```javascript
  /*子コンポーネント*/
  let counterButton = Vue.extend({
    template: '<span>{{counter}}個<button v-on:click="addToCart">追加</button></span>',
    data: function() { return { counter:0 }; },
    methods: {
      addToCart: function() {
        this.counter += 1;
        this.$emit('increment');
      }
    }
  });
  /*親コンポーネント*/
  new Vue({
    el:'#fruits-counter',
    components: {
      'counter-button': counterButton
    },
    data: {
      total:0,
      fruits:[
        {name: 'apple'},
        {name: 'orange'}
      ]
    },
    methods: {
      incrementCartStatus: function() {
        this.total += 1;
      }
    }
  });
  ```

- propsを使わないで$parentを使う（非推奨）

  ```html
  <div id="fruits-container">
    <fruits-container></fruits-container>
  </div>
  <script>
    Vue.component('fruits-container', {
      template:'<p>{{this.$parent.fruits[0].name}}</p>'・・・親プロパティを参照できる
    });
    new Vue({
      el:'#fruits-container',
      data: {
        fruits: [
          {name:'apple'},
          {name:'orange'}
        ]
      }
    });
  </script>
  ```

  

## ルーティング - Vue Router

### 定義

- ルータコンストラクタを定義してVueインスタンスに渡す
- router-viw要素ーマッピングしたコンポーネントをレンダリングする
- router-link要素ーリンクを定義する（宣言的）

```html
<script src="https://unpkg.com/vue@2.5.17"></script>
<script src="https://unpkg.com/vue-router@3.0.1"></script>
```

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/someurl',
      component: { template: 'Vueコンポーネント' }
    }    
  ]
});
const app = new Vue({ router:router }).$mount('#app');
```

```html
<div id="app">
	<router-link to="/someurl">どこかのページ</router-link>
  <router-link to="/top">トップページ</router-link>
  <router-view></router-view>
</div>
```

### 機能

- パターンマッチング

  - :（コロン）でパターンを記述できる
  - $route（Routeオブジェクト）からパラメータを取得できる　＊Routeオブジェクトは後述

  ```JavaScript
  /* /user/123にアクセスした場合 */
  {
  	path: '/user/:userId,
    component: { template:'<p>ユーザIDは{{ $route.params.userId }}</p>'}
  }
  ```

- 名前付きルート

  - ルート定義にnameを指定できる
  - router-link要素から、nameとURLパターンを渡せる

  ```javascript
  {
    path: '/user/:useId',
    name: 'user'
    component: {...}
  }
  ```

  ```html
  <router-link to="{ name:'user', params:{userId:123} }"></router-link>
  ```

- router.push()

  ソース上で直接画面遷移する。パラメータはrouter-link要素のtoと同じ

  ```javascript
  router.push({ name:'user', params:{userId:123} })
  ```

- フック関数

  ページ遷移が実行される前後に処理を追加する

  to/fromー遷移先/遷移元のRouteオブジェクト

  nextーフックを解決するための関数。引数で挙動が変わる。nextは必ず呼び出す

  - グローバルのフック関数

    - 全てのページ遷移に対して設定できるフック関数

    ```javascript
    router.beforeEach(function(to, from, next){
      if(to.path === '/users')
        next('/top'); //topへ遷移
      else
        next(); //通常通りの遷移
    });
    ```

  - ルート単位のフック関数

    - 特定のルート単位でフックを追加する

    ```javascript
    {
      path: '/users',
      component: {...},
      beforeEnter: function(to, from, next) {
        if(to.path === '/users')
          next('/top'); //topへ遷移
        else
          next(); //通常通りの遷移
      }
    }
    ```

  - コンポーネント内のフック関数

    ```javascript
    const UserList = Vue.extend({
    	template: {...},
      data: {...},
      beforeRouteEnter: function(to, from, next) {
      	...
      }
    })
    ```

- Route