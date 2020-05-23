<template>
  <div id="app">
    <v-app>
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
