# vuejs

## Vueオブジェクト

Vueインスタンスをマウントした要素とその子孫にだけ適用される

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

- thisによる参照・・・**Vueインスタンス自身**を指す

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

  ※Vueインスタンスのデータでないもの変更は検知しない（日付、DOMの状態など）

- methodsーキャッシュしない。呼ばれるたびに計算する



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

## next