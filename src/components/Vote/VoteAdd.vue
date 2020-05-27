<template>
    <div>
    <div class="pa-1 mb-2">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0" v-if="breadcrumbs.length>0">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item replace :to="`/${item.href}`" exact :link="false" :disabled="item.disabled">
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </div>
    <v-card class="col-md-12">
        <v-card-text>
            <h2> <v-icon class="mr-2">mdi-ballot</v-icon> Votación</h2>
            <v-divider class="my-3"/>
            <v-form @submit.prevent="onSubmit">
                <v-row>
                    <v-col md="6" cols="12">
                        <!-- <v-text-field  v-model="form.dni" label="Documento de identificación" required />-->
                        <v-select v-model="form.user"
                                :items="users" :loading="loaderUsers" item-value="_id"
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
                        <v-select label="Tipo de votación"
                                  :items="voteType"
                                  v-model="form.type_poll"></v-select>
                    </v-col>
                    <v-col md="12" class="mt-n5" cols="12">
                        <v-textarea :loading="loaderMotion" v-if="motionInfo" label="Moción" rows="2" v-model="motionInfo.text" readonly></v-textarea>
                    </v-col>
                    <v-col md="12" class="mt-n5">
                        <v-radio-group v-model="form.options" label="Voto" >
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
                    Guardar votación
                </v-btn>
                <v-spacer />
                    <v-btn color="secondary"
                           class="mx-md-1"
                           type="button" text dark @click="viewDetail()">Ver resultados</v-btn>
                <v-btn color="red" class="mx-md-1" type="button" text dark :to="`/session/${this.session}`">Atrás</v-btn>
            </v-row>
            </v-form>
        </v-card-text>
    </v-card>
        <DlgVoteDetail :motion="motion" ref="form" v-model="dlgDetail"/>
    </div>
</template>

<script>

    import DlgVoteDetail from "./_dlg/DlgVoteDetail";
    export default {
        components: {DlgVoteDetail},
        data: () => ({
            session: null,
            motion: null,
            error: '',
            loaderUsers: false,
            loader: false,
            loaderMotion: false,
            users: [],
            voteType: ['ORDINARIA', 'NOMINATIVA', 'NOMINAL RAZONADA'],
            breadcrumbs: [
            ],
            motionInfo: null,
            form: {
                options: 'a favor',
                user: null,
                session: null,
                motion: null,
                type_poll: null,
                poll: null
            },
            dlgDetail: false,
        }),
        async created() {
            this.session =  this.$route.params.session;
            this.form.session = this.session;
            this.motion =  this.$route.params.motion;
            this.form.motion = this.motion;
            await this.getUsers();
            this.getInfoMotion();
        },
        methods: {
            onSubmit(){
                if(!this.form.user) {
                    this.$alert.err("Seleccione un concejal");
                    return;
                }
                if (!this.form.type_poll) {
                    this.$alert.err("Falta el tipo de votación");
                    return;
                }
                if (!this.form.poll) {
                    this.$alert.err("Esta moción no tiene una votación asignada");
                    return;
                }
                // send form
                this.loader=true;
                this.$http.post(`/registrar-voto`, this.form).then(res =>{
                    if(res.data) {
                        this.$alert.ok(res.data.message);
                        this.form = {
                            ...this.form,
                            user: null,
                        };
                    }
                    this.$refs.form.updateVotes()
                }).catch(err => {
                    if(err.response && err.response.data){
                        this.$alert.err(err.response.data.message);
                    }
                }).finally(() => this.loader = false);
            },
            getUsers(){
                this.loaderUsers = true;
                this.$http.get(`/users/1`).then(res => {
                    this.users = res.data.users;
                }).catch( () => {
                    this.$alert.err("Upps! no hemos podido obtaner la lista de usuarios, consulte con el administrador");
                }).finally( () => {
                    this.loaderUsers = false;
                })
            },
            getInfoMotion() {
                this.loaderMotion = true;
                this.$http.get(`/listar-mocion/${this.motion}`).then(res => {
                    if(res.data.status === 'success') {
                        this.motionInfo = res.data.motion;
                        if (this.motionInfo.poll) {
                            this.form.poll = this.motionInfo.poll;
                        }
                        this.addBreadcrumbs();
                    }
                }).finally(() => this.loaderMotion = false);
            },
            addBreadcrumbs(){
                if(!this.motionInfo) return;
                this.breadcrumbs = [
                    {
                        text: 'Sesiones',
                        href: `session`,
                        disabled: false
                    },
                    {
                      text: `${this.motionInfo._session.text.substring(0, 80)+""}`,
                    href: `session/${this.session}`,
                    },
                    {
                        text: `${this.motionInfo.text}`,
                        href: `session/${this.session}`,
                        disabled: false
                    },
                    {
                        text: 'Votación',
                        disabled: true
                    }
                ]
            },
            viewDetail(){
                this.dlgDetail = true;
            }
        },

    }
</script>

<style scoped>

</style>
