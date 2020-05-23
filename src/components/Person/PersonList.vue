<template>
    <v-card class="col-md-12">
        <div class="d-flex justify-space-between">
            <h2> <v-icon class="mr-2">mdi-account-circle</v-icon>Personas</h2>
            <v-btn to="/person/create" rounded color="primary" dark><v-icon class="mr-1">mdi-plus</v-icon>Agregar</v-btn>
        </div>
        <v-card-title>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    item-key="id"
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table :headers="headers" :page.sync="page" @page-count="pageCount = $event" hide-default-footer
                          :loading="loader" loading-text="Obteniendo listado de personas, Espere..."
                          :items="users" :items-per-page="itemsPerPage"  :search="search">
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
                           class="mr-2" title="Modificar Persona"
                           :to="`/person/${item._id}/edit`">
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <!-- Change State Patient
                    <v-btn x-small outlined fab color="error" v-if="item.active"
                           title="Dar de baja a Paciente"
                           @click="changeStatus(item)">
                        <v-icon small>mdi-circle-off-outline</v-icon>
                    </v-btn>

                    <v-btn x-small outlined fab color="success" v-else
                           title="Dar de alta a Paciente"
                           @click="changeStatus(item)">
                        <v-icon small>mdi-circle-outline</v-icon>
                    </v-btn> -->
                </template>
            </v-data-table>
            <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
        </v-card-text>
        <Confirm ref="confirm"></Confirm>
    </v-card>
</template>

<script>
    import Confirm from "../System/Confirm";

    export default {
        name: 'UserList',
        components: {Confirm},
        data: () => ({
            headers: [
                {text: 'Nombre', value: 'name'},
                {text: 'Apellido', value: 'lastname'},
                {text: 'Correo', value: 'email'},
                {text: 'Rol', value: 'role'},
                //{text: 'Estado', value: 'actived', sortable: false, align: 'center'},
                {text: 'Opciones', value:'action', align: 'right', sortable: false}
            ],
            search: '',
            page: 1,
            pageCount: 0,
            itemsPerPage: 30,
            loader: false,
            users: []
        }),
        mounted() {
            this.getAllUsers();
        },
        methods: {
            // get all users for table
            getAllUsers() {
                this.loader = true;
                this.$http.get(`/users/${this.page}`).then(res => {
                    this.users = res.data.users;
                }).catch( () => {
                    this.$alert.err("Upps! no hemos podido obtaner la lista de usuarios, consulte con el administrador");
                }).finally( () => {
                    this.loader = false;
                })
            },
            /*changeStatus(item) {
                this.$http.patch(`/users/${item.id}/active`).then(res => {
                    if(res.data.object) {
                        let index = this.users.findIndex(i => i.id === item.id)
                        this.users[index].active = res.data.object.active;
                        this.$alert.ok(res.data.message);
                    } else {
                        this.$alert.err(res.data.message);
                    }
                });
            }*/
        }

    }
</script>

<style scoped>

</style>
