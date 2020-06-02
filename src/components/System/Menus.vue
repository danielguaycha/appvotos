<template>
    <div v-if="$store.getters.isAuth">
        <v-navigation-drawer
                dark
                v-model="primaryDrawer.model"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                :mini-variant="primaryDrawer.mini"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                app
                overflow>
            <SidebarMenu/>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="primaryDrawer.clipped" app >
            <v-app-bar-nav-icon v-if="primaryDrawer.type !== 'permanent'"
                                @click.stop="primaryDrawer.model = !primaryDrawer.model"/>
            <v-toolbar-title class="d-flex justify-center align-center">

             <v-avatar size="33px" item class="mr-3">
               <img src="/logo.png"  alt="">
             </v-avatar>
                Dashboard
<!--                {{$store.getters.enterprise.bussines_name}}-->
            </v-toolbar-title>
            <div class="flex-grow-1"></div>


            <v-menu offset-y transition="slide-y-transition" bottom>
                <template v-slot:activator="{ on }">

                    <v-btn large v-on="on" tile elevation="0" text>
                        <v-avatar color="secondary" size="32">
                            <span class="white--text headline">U</span>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
<!--                    <v-list-item to="/profile/config" >-->
<!--                        <v-list-item-title>Configurar Perfil</v-list-item-title>-->
<!--                    </v-list-item>-->
                    <v-list-item @click="logout" >
                        <v-list-item-title>Cerrar Sesión</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>
<script>
    export default {
        name: 'Menus',
        data: () => ({
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
            primaryDrawer: {
                model: null,
                type: 'default (no property)',
                clipped: true,
                floating: false,
                mini: false,
            },
            footer: {
                inset: false,
            }
        }),
        methods:{
            logout() {
                this.$store.commit('setLoader', true);
                this.$store.commit('destroyAll');
                this.$auth.destroyToken();
                this.$router.push('/login');
                this.$store.commit('setLoader', false);
            }
        },
        components: {
            SidebarMenu: () => import('./SidebarMenu.vue')
        },
    }
</script>
