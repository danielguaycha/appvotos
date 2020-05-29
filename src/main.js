import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Config from './config';
import vuetify from './plugins/vuetify';
import Auth from './plugins/auth';
import moment from 'moment-timezone'
import "./plugins/toasted";
import './plugins/axios';
require('moment/locale/es');

Vue.config.productionTip = false
Vue.prototype.$env = {
  api: Config.api,
  appName: Config.appName
};
Vue.use(Auth);
Vue.use(require('vue-moment'),{
  moment
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
