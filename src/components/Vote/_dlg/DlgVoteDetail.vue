<template>
    <v-dialog
            v-model="show" :fullscreen="$vuetify.breakpoint.smAndDown" width="800px" origin="center top">
        <v-card>
            <v-card-title>Resultados</v-card-title>
            <v-card-text>
                <ListVotes
                        :act="act"
                        :motion="motion"
                           :session="session"
                           v-if="motion" ref="form"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import ListVotes from "../_partials/ListVotes";
    export default {
        name: 'DlgVoteDetail',
        components: {ListVotes},
        props: {
            motion: {
                type: String,
            },
            session:  {
                type: String,
                default: ''
            },
            act: {
                type: Number,
            },
            value: Boolean,
        },
        data: () => ({

        }),
        methods: {
            close($event) {
                this.$emit('session', $event);
                this.show = false;
            },
            updateVotes(){
                this.$refs.form.getVotes()
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
