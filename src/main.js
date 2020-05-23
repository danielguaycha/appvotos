import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Config from './config';
import vuetify from './plugins/vuetify';
import Auth from './plugins/auth';

import "./plugins/toasted";
import './plugins/axios';

Vue.config.productionTip = false
Vue.prototype.$env = {
  api: Config.api,
  appName: Config.appName
};
Vue.use(Auth);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
