<template>
    <v-dialog
            v-model="show" :fullscreen="$vuetify.breakpoint.smAndDown" width="600px" origin="center top">
        <v-card>
            <v-card-title>
                <span>Agregar Sesión</span>
            </v-card-title>
            <v-card-text>
                <SessionForm @session="close"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import SessionForm from "../_frm/FrmSession";
    export default {
        name: 'DlgSession',
        components: {SessionForm},
        props: {
            value: Boolean,
        },
        data: () => ({

        }),
        methods: {
            close($event) {
                this.$emit('session', $event);
                this.show = false;
            }
        },
        computed: {
            show: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>
