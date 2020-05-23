<template>
    <v-card>
        <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
                <h3>Sesiones</h3>
                <v-btn color="primary" @click="dialog = true">Nueva</v-btn>
            </div>
            <v-divider/>
            <!--Dialogo de agregar sesiones-->
            <DlgSession v-model="dialog" @session="getSessions"/>
            <DlgEditSession v-model="dialogEdit" :form="selectedSession" v-if="selectedSession" @session="getSessions"/>

            <!--Tabla de sesiones-->
            <v-data-table :headers="headers" :page.sync="page" @page-count="pageCount = $event" hide-default-footer
                          :loading="loader" loading-text="Obteniendo listado de personas, Espere..."
                          :items="sessions" :items-per-page="itemsPerPage"  :search="search">
                <!-- STATUS -->
                <template v-slot:item.actived="{ item }">
                    <v-chip color="green" dark small v-if="item.active">Activo </v-chip>
                    <v-chip color="red" dark small v-else>Inactivo </v-chip>
                </template>

                <!-- OPTIONS BUTTONS -->
                <template v-slot:item.action="{ item }">
                    <!-- Delete Patient -->

                    <!-- Edit Patient -->
                    <v-btn x-small fab color="primary" elevation="0"
                           class="mr-2" title="Modificar Sesión" @click="editSession(item)">
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <!-- Change State Patient
                    <v-btn x-small outlined fab color="error" v-if="item.active"
                           title="Dar de baja a Paciente"
                           @click="changeStatus(item)">
                        <v-icon small>mdi-circle-off-outline</v-icon>
                    </v-btn>
                    -->
                    <v-btn x-small outlined fab color="success"
                           title="Ingresar a la sesión">
                        <v-icon small>mdi-check</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>

    import DlgSession from "./_dialogs/DlgSession";
    import DlgEditSession from "./_dialogs/DlgEditSession";
    export default {
        components: {DlgEditSession, DlgSession},
        data: () => ({
            dialog: false,
            dialogEdit: false,
            loader: false,
            sessions:  [],
            headers: [
                {text: 'Orden del dia', value: 'pointOrder'},
                {text: 'Opciones', value:'action', align: 'right', sortable: false}
            ],
            search: '',
            page: 1,
            pageCount: 0,
            itemsPerPage: 30,
            selectedSession: null
        }),
        created() {
            this.getSessions();
        },
        methods: {
            getSessions() {
                this.loader = true;
                this.$http.get(`/listar-sesiones/${this.page}`).then(res => {
                    if(res.data) {
                        this.sessions = res.data.sessions;
                    }
                }).finally(() => this.loader = false );
            },
            editSession(session){
                this.selectedSession = {
                    ...session,
                    text: session.pointOrder,
                }
                this.dialogEdit = true;
            }
        }
    }
</script>

<style scoped>

</style>
