<template>
    <v-form @submit.prevent="onSubmit">
        <v-row>
            <v-col md="12" cols="12">
                <v-text-field  v-model="form.text" label="Tema de la sessión" required />
            </v-col>
            <v-col md="12" cols="12">
                <v-btn color="primary" class="mx-md-1" type="submit" :disabled="loader">
                    <v-progress-circular
                            class="mr-2"
                            size="20"
                            v-if="loader"
                            indeterminate
                            color="white"/>
                    {{ this.method.toLowerCase() === 'post' ? 'Agregar': 'Actualizar' }}
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: 'SessionForm',
        props: {
            url: {
                type: String,
                default: '/registrar-sesion'
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
            loader: false,
            error: null
        }),
        methods: {
            onSubmit(){
                if(!this.form.text) {
                    this.$alert.err("Ingrese el tema de la session")
                    return;
                }
                this.loader = true;
                // this.$http.post(`/registrar-sesion`, this.form).then(res => {
                //     if(res.data && res.data.status === 'success') {
                //         this.$emit('session', res.data.session);
                //         this.$alert.ok("Sesión registrada con éxito");
                //     }
                // }).catch(err => {
                //     console.log(err);
                // }).finally(() => this.loader = false);

                this.$http({
                    method: this.method,
                    url: this.url,
                    data: this.form
                }).then(res => {
                    if(this.method.toLowerCase() === 'post'){
                        if(res.data && res.data.status === 'success') {
                            this.$emit('session', res.data.session);
                            this.$alert.ok("Sesión registrada con éxito");
                        }
                    } else {
                        // on update user
                        if(res.data && res.data.status && res.data.status === 'success') {
                            this.$emit('session', res.data.session);
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
