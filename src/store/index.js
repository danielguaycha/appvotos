import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: [],
    loader: false
  },
  mutations: {
    setAuth(state, user) {
      state.auth = user;
    },
    destroyAll(state) {
      state.auth = []
    },
    setLoader(state, loader) {
      state.loader = loader;
    }
  },
  getters: {
    auth: state => {
      return state.auth;
    },
    isAuth: state => {
      return (state.auth._id !== undefined);
    },
    loader: state => {
      return state.loader;
    }
  },
  actions: {
    userRequest: ({ commit }) => {
      commit('setLoader', true);
      return Axios.get('/private') //return the promise
          .then((resp) => {
            commit('setAuth', resp.data.user);
            return resp.data.user; //return the profile after response complete
          })
          .catch(() => {
            commit('destroyAll');
          }).finally(() => commit('setLoader', false));
    },
  },
  modules: {
  }
})
