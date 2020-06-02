<template>
  <div id="app">
    <div class="loader" v-if="$store.getters.loader">
      <div class="d-flex justify-center align-center" style="height: 100vh">
          <Loader show message="''" />
      </div>
    </div>
    <v-app v-else>
      <Menus />
      <v-content v-if="$store.getters.isAuth">
        <v-container fluid >
          <v-row justify="center">
            <v-col cols="12 pt-0">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <router-view v-else />
    </v-app>
  </div>
</template>
<script>
  import Loader from "./components/System/Loader";
  export default {
    name: "App",
    data: () => ({
      auth: false,
    }),
    beforeMount: async function() {
      this.auth = this.$auth.isAuth();
      if (this.$store.getters.auth.id === undefined && this.auth) {
        await this.$store.dispatch("userRequest");
      }
    },
    mounted() {
    },
    components: {
      Loader,
      Menus: () => import("./components/System/Menus.vue")
    }
  };
</script>
<style>
  .alert-family {
    font-family: Roboto, sans-serif;
    font-size: 16px !important;
    font-weight: 400;
    padding: 0.7rem 1.5rem !important;
  }
</style>
