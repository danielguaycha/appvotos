<template>
    <v-form @submit.prevent="onSubmit">
        <v-row justify="center" align="center" dense>
            <div class="flex-grow-1">
                <v-text-field full-width v-model="form.text" outlined autofocus shaped
                              prepend-icon="mdi-ballot" label="Escriba aquí el texto de su nueva moción" hide-details></v-text-field>
            </div>
            <div class="ml-2 d-flex align-center justify-end">
                <v-btn type="submit"
                       :loading="loader"
                       fab dark small depressed color="primary">

                    <v-icon v-if="method==='POST'">mdi-plus</v-icon>
                    <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: 'MotionForm',
        props: {
            url: {
                type: String,
                default: '/registrar-mocion'
            },
            method: {
                type: String,
                default: 'POST'
            },
            form: {
                type: Object,
                default: function () {
                    return {
                        text: "",
                    }
                }
            }
        },
        data: () => ({
            id: null,
            loader: false,
        }),
        mounted() {
            this.id = this.$route.params.session;
        },
        methods: {
            onSubmit(){
                if(!this.form.text) {
                    this.$alert.err("Ingrese el tema de la moción")
                    return;
                }
                if(this.method === 'POST'){
                    this.form.id = this.id;
                }

                this.loader = true;

                // this.$http.post(`/registrar-mocion`, this.form).then(res => {
                //     if (res.data && res.data.status === 'success') {
                //         this.$alert.ok(res.data.message);
                //         this.form.text = '';
                //         this.$emit('motion', res.data.motion);
                //     }
                // }).finally(() => this.loader = false);
                this.$http({
                    method: this.method,
                    url: this.url,
                    data: this.form
                }).then(res => {
                    if(this.method.toLowerCase() === 'post'){
                        if(res.data && res.data.status === 'success') {
                            this.form.text = '';
                            this.$emit('motion', res.data.motion);
                            this.$alert.ok(res.data.message);
                        }
                    } else {
                        // on update user
                        if(res.data && res.data.status && res.data.status === 'success') {
                            this.$emit('motion', res.data.motion);
                            this.$alert.ok(res.data.message);
                        }
                    }
                }).catch(err => {
                    if(err.response && err.response.data){
                        this.error = err.response.data.message;
                    }
                }).finally( () => {
                    this.loader = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
