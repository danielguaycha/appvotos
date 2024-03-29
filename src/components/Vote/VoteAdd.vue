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
                        <v-select :loading="loaderMotion" label="Tipo de votación" :readonly="selectedTypePoll != null || loaderMotion"
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
                <v-divider class="mt-2 mb-4"></v-divider>
                <v-row justify="center">

                    <v-btn color="red" class="mx-md-1" type="button"
                           text dark :to="`/session/${this.session}`">
                        <v-icon left dark>mdi-arrow-left</v-icon>
                        Atrás
                    </v-btn>
                    <v-btn color="secondary" v-if="motionInfo && motionInfo.vote && motionInfo.vote.length > 0"
                           class="mx-md-1"
                           type="button" tile text @click="viewDetail()">

                        <v-icon left dark>mdi-file-pdf</v-icon>
                        Ver resultados
                    </v-btn>
                    <v-spacer />
                    <v-btn color="primary" class="mx-md-1" type="submit" :disabled="loader" :loading="loader">
                        <v-icon left dark>mdi-vote</v-icon>
                        Guardar votación
                    </v-btn>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
        <DlgVoteDetail
                :act="motionInfo._session.act"
                :motion="motion"
                :session="motionInfo._session.text"
                ref="form" v-model="dlgDetail" v-if="motionInfo"/>
        <Confirm ref="confirm"></Confirm>
    </div>
</template>

<script>

    import DlgVoteDetail from "./_dlg/DlgVoteDetail";
    import Confirm from "../System/Confirm";
    export default {
        components: {Confirm, DlgVoteDetail},
        data: () => ({
            session: null,
            motion: null,
            loader: false,
            loaderUsers: false,
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
            selectedTypePoll: null,
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
            async onSubmit(){
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
                const confirm = await this.$refs.confirm.open(`Votación ${this.form.options}`, `¿Está seguro de enviar la votación "${this.form.options.toUpperCase()}" con el tipo de votación ${this.form.type_poll.toUpperCase()}?`);
                if(!confirm) return;
                this.loader=true;
                this.$http.post(`/registrar-voto`, this.form).then(res =>{
                    if(res.data) {
                        this.$alert.ok(res.data.message);
                        this.form = {
                            ...this.form,
                            user: null,
                        };
                        this.selectedTypePoll = this.form.type_poll;
                        this.motionInfo.vote.push(res.data.votes._id);
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
                this.$http.get(`/lista-mocion-tipovotacion/${this.motion}`).then(res => {
                    if(res.data.status === 'success') {
                        this.motionInfo = res.data.motion;
                        if (this.motionInfo.poll) {
                            this.form.poll = this.motionInfo.poll._id;
                            if(this.motionInfo.poll.type_poll) {
                                this.selectedTypePoll = this.motionInfo.poll.type_poll;
                                this.form.type_poll = this.selectedTypePoll;
                            }
                        }
                        this.addBreadcrumbs();
                    }
                }).finally(() => this.loaderMotion = false);
            },
            addBreadcrumbs(){
                if(!this.motionInfo) return;
                this.breadcrumbs = [
                    {
                        text: 'Sesión',
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

<style>
    .disabled {
        pointer-events:none;
        color: #bfcbd9;
        cursor: not-allowed;
        background-image: none;
        background-color: #eef1f6;
        border-color: #d1dbe5;
    }
</style>
