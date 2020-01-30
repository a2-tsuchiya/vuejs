import Vue from 'vue';
import Router from 'vue-router';

import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserCreate from './components/UserCreate';
import Login from './components/Login'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです</div>'
            }
        },
        {
            path: '/users',
            component: UserList
        },
        {
            path: '/users/new',
            component: UserCreate
        },        
        {
            path: '/users/:userId',
            component: UserDetail
        },
        {
            path: '/login',
            component: Login
        }
    ]
});