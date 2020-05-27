<template>
    <div>
        <v-form @submit.prevent="onSubmit">
            <v-row>
                <v-col md="6" cols="12">
                    <v-text-field  v-model="form.name" label="Nombres" required />
                </v-col>
                <v-col md="6" cols="12">
                    <v-text-field  v-model="form.lastname" label="Apellidos" required />
                </v-col>
            </v-row>

            <v-row>
                <v-col md="6" cols="12">
                    <v-text-field  v-model="form.email" label="Correo Electrónico" required type="email"/>
                </v-col>
                <v-col md="6" cols="12">
                <!-- <v-text-field  v-model="form.dni" label="Documento de identificación" required />-->
                    <v-select :items="roles" v-model="form.role" label="Seleccione un rol"></v-select>
                </v-col>
            </v-row>


            <!-- SHOW ONLY IN CREATE USER --->
            <v-row justify="space-around" v-if="method.toLowerCase() === 'post' && form.role === 'administrador'">
                <v-col md="8">
                    <v-text-field  v-model="form.password" label="Contraseña" required :type="type" />
                </v-col>
                <v-col md="4" class="d-flex align-center justify-center">

                    <v-btn tile color="success" class="mr-2" type="button" @click="viewOrHidePw">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-btn tile color="indigo" type="button" dark @click="getRandomPw">Generar</v-btn>

                </v-col>
            </v-row>

            <v-alert v-if="error" dense type="error"> {{ error }} </v-alert>

            <v-row justify="center">
                <v-btn color="primary" class="mx-md-1" type="submit" :disabled="loader">
                    <v-progress-circular
                            class="mr-2"
                            size="20"
                            v-if="loader"
                            indeterminate
                            color="white"/>
                    {{ this.method.toLowerCase() === 'post' ? 'Guardar': 'Actualizar' }}
                </v-btn>
                <slot></slot>
                <v-btn color="red" class="mx-md-1" type="button" dark to="/person">Atrás</v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: 'UserFrm',
        props: {
            url: {
                type: String,
                default: '/register'
            },
            method: {
                type: String,
                default: 'POST'
            },
            form: {
                type: Object,
                default: function () {
                    return {
                        name: "",
                        lastname: "",
                        email: "",
                        password:"",
                        role: 'CONCEJAL'
                    }
                }
            }
        },
        data: () => ({
            type:  'password',
            passwordLength: 10,
            error: '',
            loader: false,
            roles: ['CONCEJAL', 'ADMINISTRADOR']
        }),
        methods: {

            // submit form
            onSubmit() {
                if(! this.validate() ) return;
                this.loader = true;
                this.form.role = this.form.role.toLowerCase();
                this.$http({
                    method: this.method,
                    url: this.url,
                    data: this.form
                }).then(res => {
                    if(this.method.toLowerCase() === 'post'){
                        if(res.data && res.data.user) {
                            // on save user
                            this.$alert.ok(`${this.form.role.toUpperCase()} registrado con éxito`);
                            this.clearForm();
                        }
                    } else {
                        // on update user
                        if(res.data && res.data.status && res.data.status === 'success') {
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
            },
            // validate form
            validate() {
                const u = this.form;
                this.error = '';
                if(!u.name || !u.lastname || !u.email) {
                    this.error = 'El nombre, apellido y correo son requeridos!';
                    return false;
                }

                if(!u.password && this.method.toLowerCase() === 'post' && u.role === 'administrador') {
                    // comprobate password in post (store user)
                    this.error = 'Asegurese de ingresar o generar una contraseña';
                    return false;
                }

                return true;
            },
            // clear form
            clearForm() {
                this.form.name = '';
                this.form.lastname = '';
                this.form.email = '';
                this.form.role = 'CONCEJAL';
                this.form.password = '';
                this.type = 'password';
            },

            // generate password and view password
            viewOrHidePw() {
                if(this.type === 'password') {
                    this.type = 'text';
                } else {
                    this.type = 'password';
                }
            },

            getRandomPw() {
                let result           = '';
                const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                for ( let i = 0; i < this.passwordLength; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                this.form.password = result;
                this.type = 'text';
            }
        }
    }
</script>
