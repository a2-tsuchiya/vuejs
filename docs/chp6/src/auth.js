const Auth = {
    login: function(email, pass) {
        return new Promise((resolve, rejecgt) => {
            if(email === 'vue@example.com' && pass === 'vue') {
                localStorage.token = Math.random().toString(36).substring(7);
                return resolve(true);
            } else {
                return rejecgt(false);
            }
        });
    },
    logout: function() {
        delete localStorage.token;
    },
    loggedin: function() {
        return !!localStorage.token;
    }
};
export default Auth;