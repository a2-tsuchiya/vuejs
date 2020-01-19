/*jshint esversion:8*/
const items = [
	{
		name: 'pencil',
		price: 300,
		quantity: 1
	},
	{
		name: 'note',
		price: 400,
		quantity: 1
	},
	{
		name: 'eracer',
		price: 500,
		quantity: 0
	}
];
let vm = new Vue({
	el: '#app',
	data: {
		items: items
	},
	filters: {
		numberWithDelimiter: function(value) {
			if(!value) return '0';
			return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		}
	},
	computed: {
		totalPrice: function() {
			return this.items.reduce((sum, item) => {
				return sum + (item.price * item.quantity);
			}, 0);
		},
		totalPriceWithTax: function() {
			return Math.floor(this.totalPrice * 1.08);
		},
		canBuy: function() {
			return this.totalPrice >= 1000;
		},
		errorMessageStyle: function() {
			return {
				border: this.canBuy ? '' : '1px solid red',
				color: this.canBuy ? '' : 'red'
			};
		}
	},
	methods: {
		doBuy: function(event) {
			console.log(event);
			alert(`${this.totalPriceWithTax}円のお買い上げ`);
			this.items.forEach(item => item.quantity = 0);
		}
	}
});
window.vm = vm;
console.log(vm);