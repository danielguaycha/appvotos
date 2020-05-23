<template>
    <v-card class="col-md-8 offset-md-2">
        <v-card-text v-if="form && form.name">
            <h2> <v-icon class="mr-2">mdi-account-edit</v-icon> Modificar Persona</h2>
            <v-divider class="my-3"/>

            <!-- Update User And Include Change password button-->
            <UserFrm v-if="id" :url="`/actualiza-usuario/${id}`" method="put" :form="form" ></UserFrm>
        </v-card-text>
        <v-card-text v-else>
            <div class="text-center" v-if="loader">
                <v-progress-circular class="mr-2" v-if="loader" indeterminate color="primary"/>
                <p>Cargando datos...</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import UserFrm from "./_frm/PersonFrm";

    export default {
        name: 'UserEdit',
        components: {UserFrm},

        data: () => ({
            id: null,
            loader: false,
            form: {},
            dialog: false
        }),

        mounted() {
            this.id = this.$route.params.id;
            this.getUser();
        },
        methods: {
            getUser() {
                if(this.id === null) {return;}

                this.loader = true;

                this.$http.get(`/user/${this.id}`).then(res => {
                    if(res.data && res.data.user) {
                        this.form = res.data.user;
                        this.form.password = '';
                    }
                }).finally(() => {
                    this.loader = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
