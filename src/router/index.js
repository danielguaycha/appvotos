import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      meta: { auth: false }
    },
    {
      path: '/person/create',
      name: 'newPerson',
      component: () => import(/* webpackChunkName: "about" */ '../components/Person/PersonCreate'),
      meta: { auth: true }
    },
    {
      path: '/person',
      name: 'person',
      component: () => import(/* webpackChunkName: "about" */ '../components/Person/PersonList'),
      meta: { auth: true }
    },
    {
      path: '/person/:id/edit',
      name: 'editPerson',
      component: () =>
          import ('../components/Person/PersonEdit'),
      meta: { auth: true }
    },
    //* votos
    {
      path: '/vote/:session/:motion',
      name: 'vote',
      component: () =>
          import ('../components/Vote/VoteAdd'),
      meta: { auth: true }
    },
    //* Sesiones
    {
      path: '/session',
      name: 'session',
      component: () =>
          import ('../components/Session/SessionCreate'),
      meta: { auth: true }
    },
    //* Mociones
    {
      path: '/session/:session',
      name: 'sessionMotion',
      component: () =>
          import ('../components/Motion/Motion'),
      meta: { auth: true }
    }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth === undefined) { return next(); }

  const authRoute = (to.meta.auth);
  if (authRoute) {
    if (!Vue.auth.isAuth()) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else next();
  } else {
    if (Vue.auth.isAuth()) {
      next({ path: '/session' })
    } else next();
  }
  next();
});


export default router
