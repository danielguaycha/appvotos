<template>
    <v-list dense >

        <v-list-item :to="menu.to" v-for="menu in menus" :key="menu.title">
            <v-list-item-action>
                <v-icon>{{ menu.action }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    {{ menu.title }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <!--

        <v-list-item @click="">
            <v-list-item-action>
                <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        -->

        <v-list-group
                v-for="item in submenu"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action>
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    :to="subItem.to">
                <v-list-item-content>
                    <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>

<script>
    export default {
        data: () => ({
            menus: [
                {
                    action: 'mdi-briefcase-account',
                    title: 'Personas',
                    to: '/person',
                    active: false,
                },
                // {
                //     action: 'mdi-ballot',
                //     title: 'Votación',
                //     to: '/vote',
                //     active: false,
                // },
                {
                    action: 'mdi-account-group',
                    title: 'Sesiones',
                    to: '/session',
                    active: false
                }
                // {
                //     action: 'mdi-account-circle',
                //     title: 'Doctores',
                //     to: '/doctor',
                //     active: false,
                // }
            ],
            submenu: [
                //
                // {
                //     action: 'mdi-ticket-account',
                //     title: 'Recetas',
                //     active: false,
                //     items: [
                //         { title: 'Lista', to: '/recipe' },
                //     ],
                // },
            ]
        })
    }
</script>

<style>
    .v-list--dense .v-list-item, .v-list-item--dense {
        height: 48px !important;
    }
</style>
