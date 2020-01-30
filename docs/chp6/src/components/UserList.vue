<template>
<div>
    <div class="loading" v-if="loading">Now loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-for="user in users" :key="user.id">
        <router-link :to="{path:'/users/' + user.id}">{{ user.name }}</router-link>
    </div>
</div>
</template>

<script>
import api from '../dammy-api.js';

export default {
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
            this.loading = true;
            api.getUsers().then(users => {
                this.loading = false;
                this.users = users;
            }).catch(err => {
                this.loading = false;
                this.error = err.message;
            });
        }
    }
}
</script>

<style>
.loading { color: #42b983; }
.error { color: crimson; }
</style>