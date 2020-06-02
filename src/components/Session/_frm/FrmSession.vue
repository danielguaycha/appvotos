<template>
    <v-form @submit.prevent="onSubmit">
        <v-row>
            <v-col>
                <div class="d-flex justify-center align-center" v-if="method==='POST'">
                    <v-text-field :disabled="!activeActa"
                                  id="txtActa" v-model="form.act" type="number"
                                  :readonly="!activeActa" label="Acta No." hide-details></v-text-field>
                    <v-checkbox @change="editarActa"
                            v-model="activeActa"
                            label="Modificar"
                    ></v-checkbox>
                </div>
                <small v-if="form.act">
                    {{ getActNumber() }}
                </small>
            </v-col>
            <v-col md="12" cols="12">
                <v-textarea autofocus id="txtTitle" :loading="loaderActa"
                            v-model="form.text" label="Tema de la sesión" required  rows="3"/>
            </v-col>

            <v-col md="12" cols="12" class="text-right">
                <slot></slot>
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
                        act: "",
                    }
                }
            }
        },
        data: () => ({
            loader: false,
            error: null,
            activeActa: false,
            loaderActa: false
        }),
        mounted() {
            this.predictActa();
        },
        methods: {
            // request
            onSubmit(){
                if(!this.form.text) {
                    this.$alert.err("Ingrese el tema de la session")
                    return;
                }
                this.loader = true;
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
                        this.$alert.err(err.response.data.message);
                    }
                }).finally( () => {
                    this.loader = false;
                })
            },
            predictActa(){
                if (this.method.toUpperCase() !== 'POST') {
                    return;
                }
                this.loaderActa = true;
                this.$http.get(`/obtener-maxsesiones`).then(res => {
                    if(res.data && res.data.status === 'success') {
                        this.form.act = res.data.num_act;
                    }
                }).catch(err => {
                    if(err.response && err.response.data){
                        this.$alert.err(err.response.data.message);
                    }
                }).finally(() => this.loaderActa = false);
            },
            // extra functions
            editarActa(e){
                setTimeout(() => {
                    if (e) {
                        document.getElementById("txtActa").focus();
                    } else {
                        document.getElementById("txtTitle").focus();
                    }
                }, 100);
            },
            getActNumber(){
                const year = this.$moment().format('Y');
                let ceros = "";
                for(let i=0; i<3-this.form.act.toString().length; i++) {
                    ceros+="0";
                }
                return `Acta No. ${ceros}${this.form.act}-${year}.-`;
            }
        }
    }
</script>

<style scoped>

</style>
