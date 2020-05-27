<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="5">
                <v-card class="mx-auto elevation-6 pb-1">
                    <v-card-text>
                        <div class="header-login">
                            <h3>Iniciar sesión</h3>
                            <img src="/logo.png" alt="">
                        </div>
                        {{/*Formulario de Login*/}}
                        <v-form @submit.prevent="login">
                            <v-text-field  v-model="form.email" label="Usuario/Correo" required type="email"/>
                            <v-text-field  v-model="form.password" label="Contraseña" required type="password"/>
                            <!-- Alert for Errors -->
                            <v-alert v-if="error" dense type="error">{{ error }}</v-alert>

                            <!-- Loader -->
                            <div class="text-center" v-if="loader">
                                <v-progress-circular class="mr-2" v-if="loader" indeterminate color="primary"/>
                                <p>{{ message }}</p>
                            </div>
                            <!-- Submit -->
                            <div class="text-center mt-2">
                                <v-btn color="primary" :disabled="loader" type="submit">
                                    <span v-if="!loader">Iniciar Sesión</span>
                                    <span v-else>Iniciando...</span>
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return {
                route: null,
                loader: false,
                message: null,
                error: '',
                form: {
                    email: 'daniel@hotmail.com',
                    password: '12345678',
                    gettoken: true
                }
            }
        },
        mounted(){
            if(this.$route)
                this.route = this.$route.query.redirect;
        },
        beforeCreate() {
            if(this.$auth.isAuth()) {
                this.$router.push('/session')
            }
        },
        methods: {
            async login(){
                if(!this.form.email || !this.form.password) {
                    this.error = 'Usuario y contraseña con requeridos';
                    return;
                }
                this.loader = true;
                this.message = 'Espere...';

                try{
                    this.$http.post("/login", this.form).then(res => {
                        if(res.data && res.data.token) {
                            this.$auth.setToken(res.data.token);
                            this.message = 'Validando datos...';
                            this.$store.dispatch("userRequest").then(() => {
                                if(this.route)
                                    this.$router.push(this.route);
                                else
                                    this.$router.push({name: 'session'})
                            }).catch(() => {
                                this.error = 'Ocurrió un error al validar sus datos, contacte con el administrador';
                            }).finally(() => {
                                this.loader = false;
                                this.message = '';
                            });
                        }
                    }).catch(err => {
                        if(err.response && err.response.data){
                            this.error = err.response.data.message;
                        }
                    }).finally(() => this.loader = false);

                } catch (err) {
                     if(err.response && err.response.data){
                         this.error = err.response.data.message;
                     }
                } finally {
                    this.message ='';
                }
            },

        }
    }
</script>

<style scoped>
    .header-login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    .header-login  h3 {
        color: #607d8b;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 1rem;
    }
</style>
