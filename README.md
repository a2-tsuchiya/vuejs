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

## テンプレート構文

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

- ### Mustache記法によるデータの展開（{{ }}）

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

    

- ### ディレクティブによるHTML要素の拡張（v-で始まる属性）

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

      

## フィルタ

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



## 算出プロパティ（computed）

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

## ライフサイクルフック

Vueインスタンスの生成から消滅までに発生するイベント（フック）

- beforeCreate/createdーインスタンスが生成され、データが初期される前／後
- beforeMount/mountedーインスタンスがDOM要素にマウントされる前／後
- beforeUpdate/updatedーデータが変更され、DOMに適用される前／後
- beforeDestroy/destroyedーVueインスタンスが破棄される前／後

## メソッド（methods）

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

## computedとmethodsの違い

- computedー計算結果をキャッシュし、依存するデータが変更しない限り再計算しない

  ※Vueインスタンスのデータでないもの変更は検知しない（日付、DOMの状態など）

- methodsーキャッシュしない。呼ばれるたびに計算する

## next

