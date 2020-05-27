<template>
    <v-dialog
            v-model="show" :fullscreen="$vuetify.breakpoint.smAndDown" width="600px" origin="center top">
        <v-card>
            <v-card-title>
                <span>Editar Moción</span>
            </v-card-title>
            <v-card-text>
                <MotionFrm @motion="close"
                             v-if="form._id"
                             :url="`/actualiza-mocion/${form._id}`"
                             method="put" :form="form"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import MotionFrm from "../_frm/MotionFrm";
    export default {
        name: 'DlgEditMotion',
        components: {MotionFrm},
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
                this.$emit('motion', $event);
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
