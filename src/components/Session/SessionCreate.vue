<template>
    <div class="pa-3">
        <div class="d-flex justify-space-between align-center mb-5">
            <h3>Sesiones</h3>
            <v-btn color="primary" @click="dialog = true">Nueva</v-btn>
        </div>
        <!--Dialogo de agregar sesiones-->
        <DlgSession v-model="dialog" @session="getSessions"/>
        <DlgEditSession v-model="dialogEdit" :form="selectedSession" v-if="selectedSession" @session="getSessions"/>

        <v-row v-if="sessions.length > 0" dense>
            <v-col cols="12" sm="12" md="12" v-for="(s) in sessions" :key="s._id" >
                <v-card shaped outlined>
                    <v-card-text class="d-flex justify-space-between py-0 px-2">
                        <v-row class="d-flex align-center">
                            <v-col cols="9">
                                <router-link :to="`/session/${s._id}`" class="session-link">
                                    <div class="d-flex">
                                        <span>
                                            Sesión:
                                        </span>
                                        <h4 class="ml-2"> &nbsp;&nbsp;&nbsp; {{ s.text }}</h4>
                                    </div>
                                </router-link>
                            </v-col>

                            <v-col class="d-flex justify-end">
                                <v-btn fab dark x-small depressed color="error" class="mr-1">
                                    <v-icon @click="deleteSession(s)">mdi-delete</v-icon>
                                </v-btn>
                                <v-btn fab dark x-small depressed color="primary">
                                    <v-icon @click="editSession(s)">mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="secondary" elevation="0"
                                       class="ml-1"
                                       :to="`/session/${s._id}`">Mociones</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col md="12">
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount" @input="getSessions" ></v-pagination>
                </div>
            </v-col>

            <v-row v-if="sessions.length === 0 && !loader">
                <v-col md="12" class="text-center">
                    Aun no se han creado sesiones, Agregue una desde el botón "Nueva"
                </v-col>
            </v-row>
        </v-row>

        <Loader :show="loader" message="Cargando sesiones...."></Loader>

        <Confirm ref="confirm"></Confirm>
    </div>
</template>

<script>

    import DlgSession from "./_dialogs/DlgSession";
    import DlgEditSession from "./_dialogs/DlgEditSession";
    import Loader from "../System/Loader";
    import Confirm from "../System/Confirm";
    export default {
        components: {Confirm, Loader, DlgEditSession, DlgSession},
        data: () => ({
            dialog: false,
            dialogEdit: false,
            loader: false,
            sessions:  [],
            headers: [
                {text: 'Orden del dia', value: 'text'},
                {text: 'Opciones', value:'action', align: 'right', sortable: false}
            ],
            search: '',
            page: 1,
            pageCount: 1,
            itemsPerPage: 5,
            selectedSession: null
        }),
        created() {
            this.page = 1;
            this.getSessions();
        },
        methods: {
            getSessions() {
                this.loader = true;
                this.sessions = [];
                this.$http.get(`/listar-sesiones/${this.page}`).then(res => {
                    if(res.data) {
                        this.sessions = res.data.sessions;
                        this.pageCount = res.data.pages;
                    }
                }).finally(() => this.loader = false );
            },
            editSession(session){
                this.selectedSession = {
                    ...session,
                    text: session.text,
                }
                this.dialogEdit = true;
            },
            async deleteSession(session) {
                const confirm = await
                    this.$refs.confirm.open('Eliminar Sesión', `¿Esta seguro que desea eliminar esta sesión?`);
                if(!confirm) return;
                this.$http.delete(`/eliminar-sesion/${session._id}`).then(res => {
                        if(res.data && res.data.status === 'success') {
                            const index = this.sessions.indexOf(session);
                            this.sessions.splice(index, 1);
                            this.$alert.ok(res.data.message);
                        } else {
                            this.$alert.err("Upps! algo salió mal reintenta");
                        }
                    })
                    .catch(err => () => {
                        if(err.response && err.response.data){
                            this.$alert.err(err.response.data.message);
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .session-link{
        text-decoration: none;
        text-transform: uppercase;
        color: #6a6a6b;
    }
</style>
