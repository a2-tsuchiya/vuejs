<template>
<div id="nav">
    <router-link to="/top">トップページ</router-link>
    <router-link to="/users">ユーザ一覧ページ</router-link>
    <router-link to="/users/new">新規ユーザ登録</router-link>
    <router-link to="/login">ログイン</router-link>
    <router-link to="/logout">ログアウト</router-link>
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'App',
    components: {}
}
</script>

<style>
#nav a {
    color: #42b983;
    text-decoration: none;  
}
.router-link-exact-active {
    color: #00252b;
}
</style>