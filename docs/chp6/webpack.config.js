const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	// entry: './src/index.js',
	entry: './src/test.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
	},
  	module: {
    	rules: [
      		{
        		test: /\.vue$/, // ファイルが.vueで終われば...
        		loader: 'vue-loader' // vue-loaderを使う
      		},
      		{
        		test: /\.js$/,
        		loader: 'babel-loader',
      		},
      		{
        		test: /\.css$/,
        		use: ['vue-style-loader', 'css-loader'] // css-loader -> vue-style-loaderの順で通していく
      		},
    	]
  	},
  	resolve: {
    	// import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
    	extensions: ['.js', '.vue'],
    	alias: {
      	// vue-template-compilerに読ませてコンパイルするために必要
      		vue$: 'vue/dist/vue.esm.js',
    	},
  	},
  	plugins: [new VueLoaderPlugin()],
};