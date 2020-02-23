import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import "material-design-icons/iconfont/material-icons.css";
import Index from '../components/Index.vue';

let all = {
    /**includes organizatons, groups, rolls */
    users:[],
    apps:[],
};
let aclsByUser={};
let aclsByApp={};

const apis = {
    getAllUsers() {
        return new Promise((resolve, reject) => {
            function getUsers(offset) {
                const param = { offset: offset || 0 };
                return kintone.api(kintone.api.url('/v1/users', true), 'GET', param).then(resp => {
                    let arr=[];
                    resp.users.forEach(user => {
                        arr.push({
                            id: user.id,
                            code: user.code,
                            name: user.name,
                            type: 'user'
                        });
                    });
                    all.users = all.users.concat(arr);
                    if(resp.users.length >= 100)
                        getUsers(offset + 100);
                    else
                        resolve();
                }).catch(err => reject(err));
            }
            getUsers(0); 
        });       
    },
    getAllApps() {
        return new Promise((resolve, reject) => {
            function getApps(offset) {
                const param = { offset: offset || 0 };
                return kintone.api(kintone.api.url('/k/v1/apps', true), 'GET', param).then(resp => {
                    let arr=[];
                    resp.apps.forEach(app => {
                        arr.push({
                            appId: app.appId,
                            name: app.name
                        });
                    })
                    all.apps = all.apps.concat(arr);
                    if(resp.apps.length >= 100)
                        getApps(offset + 100)
                    else
                        resolve();
                }).catch(err => reject(err));
            }
            getApps(0);
        });
    },
    getAllOrganizations() {
        return new Promise((resolve, reject) => {
            function getOrganizations(offset) {
                const param = { offset: offset || 0 };
                return kintone.api(kintone.api.url('/v1/organizations', true), 'GET', param).then(resp => {
                    let arr=[];
                    resp.organizations.forEach(organization => {
                        arr.push({
                            id: organization.id,
                            code: organization.code,
                            name: organization.name,
                            type: 'organization'
                        });
                    });
                    all.users = all.users.concat(arr);
                    if(resp.organizations.length >= 100) {
                        getOrganizations(offset + 100);
                    } else {
                        resolve();
                    }                    
                }).catch(err => reject(err));
            }
            getOrganizations(0);
        })
    },
    getAllGroups() {
        return new Promise((resolve, reject) => {
            function getGroups(offset) {
                const param = { offset: offset || 0 };
                return kintone.api(kintone.api.url('/v1/groups', true), 'GET', param).then(resp => {
                    let arr=[];
                    resp.groups.forEach(group => {
                        arr.push({
                            id: group.id,
                            code: group.code,
                            name: group.name,
                            type: 'group'
                        });
                    });
                    all.users = all.users.concat(arr);
                    if(resp.groups.length >= 100)
                        getGroups(offset + 100);
                    else
                        resolve();
                }).catch(err => reject(err));
            }
            getGroups(0);
        })
    },
    // getAllAclsByApp() {
    //     return new Promise((resolve ,reject) => {
    //         function getAcl(index) {
    //             return new Promise((resolve, reject) => {
    //                 const appId = all.apps[index].appId;
    //                 return kintone.api(kintone.api.url('/k/v1/app/acl', true), 'GET', {app:appId}).then(resp => {
    //                     console.log(resp);
    //                     resp.rights.forEach(right => {
    //                         let obj={};
    //                         obj.userCode = right.entity.code;
    //                         obj.viewable = right.recordViewable;
    //                         obj.addable = right.recordAddable;
    //                         obj.editable = right.recordEditable;
    //                         obj.deletable = right.recordDeletable;
    //                         obj.appEditable = right.appEditable;
    //                         obj.importable = right.recordImportable;
    //                         obj.exportable = right.recordExportable;
    //                         obj.includeSubs = right.includeSubs;

    //                         if(!(all.apps[index].appId in aclsByApp)) aclsByApp[all.apps[index].appId]=[];
    //                         aclsByApp[all.apps[index].appId].push(obj);
    //                     });
    //                     resolve();
    //                 });
    //             });
    //         }
    //         let promises = all.apps.map((app,index) => getAcl(index));
    //         Promise.all(promises)
    //             .then(() => resolve())
    //             .catch(err => console.log(err));            
    //     });
    // },
    getAllAclsByUser() {
        return new Promise((resolve, reject) => {
            function getAcl(index) {
                return new Promise((resolve, reject) => {
                    const appId = all.apps[index].appId;
                    return kintone.api(kintone.api.url('/k/v1/app/acl', true), 'GET', {app:appId}).then(resp => {
                        resp.rights.forEach(right => {
                            if(all.users.find(user => user.code === right.entity.code)) {
                                let obj={};
                                obj.appId = appId;
                                obj.appName = all.apps[index].name;
                                obj.viewable = right.recordViewable;
                                obj.addable = right.recordAddable;
                                obj.editable = right.recordEditable;
                                obj.deletable = right.recordDeletable;
                                obj.appEditable = right.appEditable;
                                obj.importable = right.recordImportable;
                                obj.exportable = right.recordExportable;
                                obj.includeSubs = right.includeSubs;
                                
                                if(!(right.entity.code in aclsByUser)) aclsByUser[right.entity.code]=[];
                                aclsByUser[right.entity.code].push(obj);
                            }
                        });
                        resolve();
                    }).catch(err => console.log(err));
                });
            }
            const promises = all.apps.map((app, index) => getAcl(index));
            Promise.all(promises)
                .then(() => resolve())
                .catch(err => console.log(err));            
        })
    }
}
kintone.events.on('app.record.index.show', function(e) {
    if(e.viewId !== 5549961) return e;
    let promise = Promise.resolve();
    Object.keys(apis).forEach(api => {
        promise = promise.then(() => apis[api].call());
    })
    promise
        .then(()=> {
            Vue.use(Vuetify);
            new Vue({
                vuetify: new Vuetify(),
                el: '#app',
                template: '<Index :aclsByUser="aclsByUser" :users="users" />',
                components: {Index},
                data:() => ({
                    aclsByUser: aclsByUser,
                    users: all.users
                }),            
            });             
        })
        .catch(err => console.log(err));  
});