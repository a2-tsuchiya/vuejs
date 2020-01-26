/*jshint esversion:8*/

/*auth*/
const Auth = {
	// login: function(email, pass, cb) {
	// 	setTimeout(() => {
	// 		if(email === 'vue@example.com' && pass === 'vue') {
	// 			localStorage.token = Math.random().toString(36).substring(7);
	// 			if(cb) cb(true);
	// 		} else {
	// 			if(cb) cb(false);
	// 		}
	// 	}, 0);
	// },
	login: function(email, pass) {
		return new Promise((resolve, reject) => {
			if(email === 'vue@example.com' && pass === 'vue') {
				localStorage.token = Math.random().toString(36).substring(7);
				return resolve(true);
			} else {
				return reject(false);
			}
		});
	},
	logout: function() {
		delete localStorage.token;
	},
	loggedIn: function() {
		return !!localStorage.token;
	}
};

/*dammy API*/
let api = {
	getUsersCallback: (callback) => {
		setTimeout(() => {
			callback(null, userData);
		}, 1000);
	},
	getUsersPromise: function() {
		return new Promise((resolve, reject) => {
			return resolve(userData);
		});
	},
	getUserCallback: function(userId, callback) {
		setTimeout(() => {
			const filteredUsers = userData.filter(user => user.id === parseInt(userId, 10));
			/*配列の中身があることを判定してから、配列の中身を返してると解釈*/
			callback(null, filteredUsers && filteredUsers[0]);
		}, 1000);
	},
	getUserPromise: function(userId) {
		return new Promise((resolve, reject) => {
			const filteredUsers = userData.filter(user => user.id === parseInt(userId, 10));
			return resolve(filteredUsers && filteredUsers[0]);
		});
	},
	postUserCallback: function(params, callback) {
		setTimeout(() => {
			params.id = userData.length + 1;
			userData.push(params);
			callback(null, params);
		}, 1000);
	},
	postUserPromise: function(params) {
		return new Promise((resolve, reject) => {
			params.id = userData.length + 1;
			userData.push(params);
			return resolve(params);
		});
	}
};
/*user-data*/
let userData = [
	{
		id:1,
		name: 'Suzuki Ichiro',
		description: '東南アジアで働くエンジニアです',
	},
	{
		id:2,
		name: 'Yamada Hanako',
		description: 'フットサルが趣味のエンジニアです',
	}
];
/*components*/
const components = {
	/*user index*/
	UserList: Vue.extend({
		template: `
			<div>
				<div class="loading" v-if="loading">Now loading...</div>
				<div v-if="error" class="error">{{ error }}</div>
				<div v-for="user in users" :key="user.id">
					<router-link :to="{path:'/users/' + user.id}">{{ user.name }}</router-link>
				</div>
			</div>
		`,
		data: function() {
			return {
				loading: false,
				users: [],
				error: null
			};
		},
		created: function() { 
			this.fetchData();
		},
		watch: { '$route': 'fetchData' },
		methods: {
			fetchData: function() {
				/*callback-pattern*/
				// this.loading = true;
				// api.getUsersCallback(((err, users) => {
				// 	this.loading = false;
				// 	if(err)
				// 		this.error = err.toString();
				// 	else
				// 		this.users = users;
				// }).bind(this));

				/*promise-patter*/
				this.loading = true;
				api.getUsersPromise().then(users => {
					this.loading = false;
					this.users = users;
				}).catch(err => {
					this.loading = false;
					this.error = err.message;
				});
			}
		}
	}),
	/*user detail*/
	UserDetail: Vue.extend({
		template: `
			<div>
				<div class="loading" v-if="loading">Now loading...</div>
				<div v-if="error" class="error">{{ error }}</div>
				<div v-if="user">
					<h2>{{ user.name }}</h2>
					<p>{{ user.description }}</p>
				</div>			
			</div>
		`,
		data: function() {
			return {
				loading: false,
				user: null,
				error: null,
			};
		},
		created: function() {
			this.fetchData();
		},
		watch: { '$route': 'fetchData' },
		methods: {
			fetchData: function() {
				// this.loading = true;
				// api.getUserCallback(this.$route.params.userId, (function(err, user) {
				// 	this.loading = false;
				// 	if(err)
				// 		this.error = err.toString();
				// 	else
				// 		this.user = user;
				// }).bind(this));
				this.loading = true;
				api.getUserPromise(this.$route.params.userId).then(user => {
					this.loading = false;
					this.user = user;
				}).catch(err => {
					this.loading = false;
					this.error = err.message;
				});
			}
		}
	}),
	/*user create*/
	UserCreate: Vue.extend({
		template: `
			<div>
				<div class="sending" v-if="sending">Sending...</div>
				<div>
					<h2>新規ユーザ作成</h2>
					<div>
						<label>名前: </label>
						<input type="text" v-model="user.name">
					</div>
					<div>
						<label>説明文: </label>
						<textarea v-model="user.description"></textarea>
					</div>
					<div v-if="error" class="error">{{ error }}</div>
					<div>
						<input type="button" @click="createUser" value="送信">
					</div>
				</div>
			</div>
		`,
		data: function() {
			return {
				sending: false,
				user: this.defaultUser(),
				error: null
			};
		},
		created: function() {},
		methods: {
			defaultUser: function() {
				return {
					name: '',
					description: ''
				};
			},
			createUser: function() {
				console.log(this);
				if(this.user.name.trim() === '') {
					this.error = 'Nameは必須です';
					return;
				}
				if(this.user.description.trim() === '') {
					this.error = 'Descriptionは必須です';
					return;
				}
				// api.postUserCallback(this.user, (function(err, user) {
				// 	this.sending = false;
				// 	if(err) {
				// 		this.error = err.toString();
				// 		return;
				// 	}
				// 	this.error = null;
				// 	this.user = this.defaultUser();
				// 	alert('新規ユーザが登録されました');
				// 	this.$router.push('/users');
				// }).bind(this));
				api.postUserPromise(this.user).then(user => {
					this.sending = false;
					this.error = null;
					this.user = this.defaultUser();
					alert('新規ユーザが登録されました');
					this.$router.push('.users');
				}).catch(err => {
					this.sending = false;
					this.error = err.message;
				});
			}
		}
	}),
	/*login*/
	Login: Vue.extend({
		template: `
			<div>
				<h2>Login</h2>
				<p v-if="$route.query.redirect">ログインしてください</p>
				<form @submit.prevent="login">
					<label><input v-model="email" placeholder="email"</label>
					<label><input v-model="pass" placeholder="password" type="password"></label>
					<br>
					<button type="submit">ログイン</button>
					<p v-if="error" class="error">ログインに失敗しました</p>				
				</form>
			</div>
		`,
		data: function() {
			return {
				email: 'vue@example.com',
				pass: 'vue',
				error: false
			};
		},
		methods: {
			login: function() {
				// Auth.login(this.email, this.pass, (function(loggedIn) {
				// 	if(!loggedIn) {
				// 		this.error = true;
				// 	} else {
				// 		this.$router.replace(this.$route.query.redirect || '/');
				// 	}
				// }).bind(this));
				Auth.login(this.email, this.pass).then(loggedIn => {
					this.$router.replace(this.$route.query.redirect || '/');
				}).catch(err => this.error = err);
			}
		}
	}),
};

/*router*/
const router = new VueRouter({
	routes: [
		{
			path: '/top',
			component: {
				template: '<div>トップページです</div>'
			}
		},
		{
			path: '/users',
			component: components.UserList
		},
		/*ルータの解釈は配列の先頭から行われる*/
		{
			path: '/users/new',
			component: components.UserCreate,
			beforeEnter: function(fo, from, next) {
				if(!Auth.loggedIn) {
					next({
						path: '/login',
						query: { redirect: to.fullPath }
					});
				} else {
					next();
				}
			}
		},		
		{
			path: '/users/:userId',
			component: components.UserDetail
		},
		{
			path: '/login',
			component: components.Login
		},
		{
			path: '/logout',
			beforeEnter: function(to, from, next) {
				Auth.logout();
				next('/');
			}
		}
	]
});
/*render*/
const app = new Vue({
	el: '#app',
	data: { Auth:Auth },
	router: router
});