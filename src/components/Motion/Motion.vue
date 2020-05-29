<template>
    <div class="px-2">
        <div class="pa-1 mb-2">
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template v-slot:item="{ item }">
                        <v-breadcrumbs-item replace :to="`/${item.href}`" exact :link="false" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </template>
                </v-breadcrumbs>
        </div>
        <MotionForm class="px-1" @motion="addMotion"/>
        <DlgEditMotion v-model="dlgEditMotion" :form="selectedMotion" v-if="selectedMotion" />

        <Loader :show="loader" message="Cargando mociones..."></Loader>
        <v-row v-if="session.motions.length>0">
            <v-col md="3" v-for="(m, i) in session.motions" :key="m._id">
                <v-card>
                    <v-card-title>
                        <v-icon left>
                            mdi-vote
                        </v-icon>
                        <span class="subtitle-1 font-weight-light">Moción {{i+1}}</span>
                    </v-card-title>
                    <v-card-text class="font-weight-bold">
                        {{ m.text }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary"
                               :to="`/vote/${session._id}/${m._id}`">Votar</v-btn>
                        <v-spacer></v-spacer>
<!--                        <v-btn icon @click="viewDetail(m)">-->
<!--                            <v-icon>mdi-eye</v-icon>-->
<!--                        </v-btn>-->
                        <v-btn icon @click="deleteMotion(m)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn icon @click="editMotion(m)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="session.motions.length === 0 && !loader">
            <v-col class="text-center pa-5">
                <small>Aun no se han agregado mociones a esta sesión</small>
            </v-col>
        </v-row>
<!--        <DlgVoteDetail :motion="selectedMotion._id" v-if="selectedMotion" ref="form" v-model="dlgDetail"/>-->
        <Confirm ref="confirm"></Confirm>
    </div>
</template>

<script>
    import MotionForm from "./_frm/MotionFrm";
    import Loader from "../System/Loader";
    import DlgEditMotion from "./_dlg/DlgEditMotion";
    import Confirm from "../System/Confirm";

    export default {
        name: 'Motion',
        components: {Confirm, DlgEditMotion, Loader, MotionForm},
        data: () => ({
            id: null,
            loader: false,
            deleteLoader: false,
            session: {
                motions: []
            },
            selectedMotion: null,
            dlgEditMotion: false,
            dlgDetail: false,
            breadcrumbs: [
                {
                    text: 'Sesiones',
                    href: `session`,
                    disabled: false
                }
            ]
        }),
        mounted() {
            this.id = this.$route.params.session;
            this.getMotions();
        },
        methods: {
            getMotions() {
                this.loader = true;
                this.$http.get(`/listar-sesion/${this.id}`).then(res => {
                    if (res.data) {
                        this.session = res.data.session;
                        this.breadcrumbs.push({
                            text: this.session.text.substring(0, 100)+"...",
                            disabled: true
                        })
                    }
                }).finally(() => this.loader = false);
            },
            async deleteMotion(motion){
                const confirm = await this.$refs.confirm.open('Eliminar Moción', `¿Esta seguro que desea eliminar esta moción?`);
                if(!confirm) return;
                if(!motion){return;}
                this.deleteLoader = true;
                this.$http.delete(`/elimina-mocion/${motion._id}`).then(res => {
                    if(res.data.status === 'success') {
                        const index = this.session.motions.indexOf(motion);
                        this.session.motions.splice(index, 1);
                        this.$alert.ok(res.data.message);
                    }
                }).finally(() => this.deleteLoader=false)
            },
            addMotion(motion) {
                this.session.motions.push(motion);
            },
            editMotion(motion) {
                this.selectedMotion = motion;
                this.dlgEditMotion = true;
            },
            // viewDetail(motion) {
            //     this.selectedMotion = motion;
            //     this.dlgDetail = true;
            // }
        }
    }
</script>

<style scoped>

</style>
