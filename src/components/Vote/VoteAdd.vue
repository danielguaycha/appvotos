<template>
    <v-card class="col-md-10 offset-md-1">
        <v-card-text>
            <h2> <v-icon class="mr-2">mdi-ballot</v-icon> Votación</h2>
            <v-divider class="my-3"/>
            <v-row>
                <v-col md="6" cols="12">
                    <!-- <v-text-field  v-model="form.dni" label="Documento de identificación" required />-->
                    <v-select
                            :items="users" :loading="loaderUsers"
                            item-text="name" label="Concejal">
                        <template slot="selection" slot-scope="data">
                            {{ data.item.lastname.toUpperCase() }} {{ data.item.name.toUpperCase() }}
                        </template>
                        <template slot="item" slot-scope="data">
                            {{ data.item.lastname.toUpperCase() }} {{ data.item.name.toUpperCase() }}
                        </template>
                    </v-select>
                </v-col>
                <v-col md="6">
                    <v-select label="Tipo de votación" :items="voteType" v-model="selectVoteType"></v-select>
                </v-col>
                <v-col md="12" class="mt-n5" cols="12">
                    <v-textarea label="Moción" rows="2"></v-textarea>
                </v-col>
                <v-col md="12" class="mt-n5">
                    <v-radio-group v-model="selectVote" label="Voto" >
                        <v-row>
                            <v-col cols="4">
                                <v-radio label="A Favor" value="a favor"></v-radio>
                            </v-col>
                            <v-col cols="4">
                                <v-radio label="En contra" value="en contra"></v-radio>
                            </v-col>
                            <v-col cols="4">
                                <v-radio label="En blanco" value="en blanco"></v-radio>
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-btn color="primary" class="mx-md-1" type="submit" :disabled="loader">
                    <v-progress-circular
                            class="mr-2"
                            size="20"
                            v-if="loader"
                            indeterminate
                            color="white"/>
                    Enviar
                </v-btn>
                <slot></slot>
                <v-btn color="red" class="mx-md-1" type="button" dark to="/person">Atrás</v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            error: '',
            loaderUsers: false,
            loader: false,
            users: [],
            voteType: ['ORDINARIA', 'NOMINATIVA', 'RAZONABLE'],
            selectUser: null,
            selectVoteType: '',
            selectVote: ''
        }),
        created() {
            this.getUsers();
        },
        methods: {
            getUsers(){
                this.loaderUsers = true;
                this.$http.get(`/users/1`).then(res => {
                    this.users = res.data.users;
                }).catch( () => {
                    this.$alert.err("Upps! no hemos podido obtaner la lista de usuarios, consulte con el administrador");
                }).finally( () => {
                    this.loaderUsers = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
