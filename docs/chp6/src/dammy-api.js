/**user-data */
let userData = [
    {
        id:1,
        name:'Suzuki Ichiro',
        description:'Baseball Player'
    },
    {
        id:2,
        name:'Yamada Hanako',
        description:'Comedian'
    }
];
/**dammy-api */
const api = {
    getUsers: function() {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                return resolve(userData);
            }, 1000);
        });
    },
    getUser: function(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const filteredUsers = userData.filter(user => user.id === parseInt(userId, 10));
                return resolve(filteredUsers && filteredUsers[0]);
            }, 1000);
        })
    },
    postUser: function(params) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                params.id = userData.length + 1;
                userData.push(params);
                return resolve(params);
            }, 1000);
        });
    }
}
export default api;