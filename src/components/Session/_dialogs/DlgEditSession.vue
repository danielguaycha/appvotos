<template>
    <v-dialog
            v-model="show" :fullscreen="$vuetify.breakpoint.smAndDown" width="600px" origin="center top">
        <v-card>
            <v-card-title>
                <span>Editar Sesión</span>
            </v-card-title>
            <v-card-text>
                <SessionForm @session="close"
                             v-if="form._id"
                             :url="`/actualizar-sesion/${form._id}`"
                             method="put" :form="form"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import SessionForm from "../_frm/FrmSession";
    export default {
        name: 'DlgEditSession',
        components: {SessionForm},
        props: {
            value: Boolean,
            form: {
                type: Object,
                default: function () {
                    return {
                        _id: null,
                        text: ''
                    }
                }
            }
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
