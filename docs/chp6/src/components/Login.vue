<template>
<div>
    <h2>ログイン</h2>
    <p v-if="$route.query.redirect">ログインしてください</p>
    <form @submit.prevent="login">
        <label><input v-model="email" placeholder="email"></label>
        <label><input v-model="pass" placeholder="password" type="password"></label>
        <br>
        <button type="submit">ログイン</button>
        <p v-if="error" class="error">ログインに失敗しました</p>
    </form>
</div>
</template>

<script>
import Auth from '../auth.js';
export default {
    data: function() {
        return {
            email: 'vue@example.com',
            pass: 'vue',
            error: false
        };
    },
    methods: {
        login: function() {
            Auth.login(this.email, this.pass).then(loggedIn => {
                this.$router.replace(this.$route.query.redirect || '/');
            }).catch(err => this.error = err);
        }
    }
}
</script>

<style scoped>
</style>