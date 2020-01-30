<template>
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
</template>

<script>
import api from '../dammy-api.js';
const swal = require('sweetalert');

export default {
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
                name:'',
                description:''
            };
        },
        createUser: function() {
            if(this.user.name.trim() === '') {
                this.error = 'Nameは必須です';
                return;
            }
            if(this.user.description.trim() === '') {
                this.error = 'Descriptionは必須です';
                return;
            }
            this.sending = true;
            api.postUser(this.user).then(user => {
                this.sending = false;
                this.error = null,
                this.user = this.defaultUser();
                swal({ title:'新規ユーザが登録されました', icon:'success' });
                this.$router.push('/users');
            }).catch(err => {
                this.sending = false;
                this.error = err.message;
            });
        }
    }
}
</script>

<style>
</style>