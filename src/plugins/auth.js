export default function(Vue) {
    Vue.auth = {
        // set token
        setToken(token, expiration = null) {
            localStorage.setItem('token', token);
            if (expiration !== null)
                localStorage.setItem('expiration', expiration)
        },
        // get token
        // destroy token
        destroyToken() {
            localStorage.removeItem("token");
            //localStorage.removeItem("expiration");
        },
        getToken() {
            let token = localStorage.getItem("token");
            if (!token) {
                return null;
            } else {
                return token;
            }
        },
        isAuth() {
            if (this.getToken())
                return true;
            else
                return false;
        },
        headers() {
            return {
                'Authorization': '' + this.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            };
        },
    };
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth
            }
        }
    })
}
