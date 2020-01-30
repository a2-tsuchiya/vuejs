<template>
<div>
    <div class="loading" v-if="loading">Now loading...</div>
    <div v-if="error" class="class">{{ error }}</div>
    <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>{{ user.description }}</p>
    </div>
</div>
</template>

<script>
import api from '../dammy-api.js';
export default {
    data: function() {
        return {
            loading: false,
            user: null,
            error: null
        }
    },
    created: function() {
        this.fetchData();
    },
    watch: { '$route': 'fetchData' },
    methods: {
        fetchData: function() {
            this.loading = true;
            api.getUser(this.$route.params.userId).then(user => {
                console.log(user);
                this.loading = false;
                this.user = user;
            }).catch(err => {
                this.loading = false;
                this.error = err.message;
            })
        }
    }
}
</script>

<style>

</style>