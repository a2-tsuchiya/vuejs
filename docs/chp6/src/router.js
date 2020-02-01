import Vue from 'vue';
import Router from 'vue-router';

import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserCreate from './components/UserCreate';
import Login from './components/Login';

import Auth from './auth.js';

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
            component: UserCreate,
            beforeEnter: function(to, from, next) {
                if(!Auth.loggedin) {
                    next({
                        path: '/login',
                        query: { redirect:to.fullPath }
                    });
                } else {
                    next();
                }
            }
        },        
        {
            path: '/users/:userId',
            component: UserDetail
        },
        {
            path: '/login',
            component: Login
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