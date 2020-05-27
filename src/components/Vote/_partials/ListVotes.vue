<template>
    <div>
        <v-row v-if="loader" class="py-4">
            <v-col class="text-center d-flex flex-column justify-center align-center">
                <v-progress-circular color="primary" class="mb-3" indeterminate></v-progress-circular>
               Cargando resultados...
            </v-col>
        </v-row>
        <div v-else>
            <v-row>
                <v-card-subtitle v-if="motionName"><h3><b>Moción: </b>{{ motionName }}</h3></v-card-subtitle>
            </v-row>
            <v-row>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1 color-green">{{aFavor}}</div>
                        <div>votos a favor</div>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1 color-red">{{ enContra }}</div>
                        <div>votos en contra</div>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1">{{ enBlanco }}</div>
                        <div>votos en blanco</div>
                    </v-card>
                </v-col>
            </v-row>

            <DetailVote :nominal_razonada="nominal_razonada" :nominativa="nominativa" :ordinarias="ordinarias"/>

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Concejal</th>
                        <th class="text-left">Opción</th>
                        <th class="text-left">Tipo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in votes" :key="item._id">
                        <td>{{item.user[0].name}} {{ item.user[0].lastname }}</td>
                        <td>{{ item.options }}</td>
                        <td>{{ item.type_poll }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
    import DetailVote from "./DetailVote";
    export default {
        name: 'ListVotes',
        components: {DetailVote},
        props: {
            motion: {
                type: String,
            }
        },
        data: () => ({
            votes: [],
            motionName: '',
            loader: false,
            loaderCalc: false,
            aFavor: 0,
            enContra: 0,
            enBlanco: 0,
            ordinarias: {
                aFavor: {
                    count: 0,
                    users: []
                },
                enContra: {
                    count: 0,
                    users: []
                },
                enBlanco: {
                    count: 0,
                    users: []
                }
            },
            nominativa: {
                aFavor: {
                    count: 0,
                    users: []
                },
                enContra: {
                    count: 0,
                    users: []
                },
                enBlanco: {
                    count: 0,
                    users: []
                }
            },
            nominal_razonada: {
                aFavor: {
                    count: 0,
                    users: []
                },
                enContra: {
                    count: 0,
                    users: []
                },
                enBlanco: {
                    count: 0,
                    users: []
                }
            }
        }),
        mounted() {
            this.getVotes();
        },
        methods: {

            getVotes(){
                this.loader = true;
                this.$http.get(`/lista-voto-usuario-mocion/${this.motion}`).then(res => {
                    console.log(res.data.motion.text);
                    if(res.data && res.data.motion) {
                        this.votes = res.data.motion.vote;
                        this.motionName = res.data.motion.text;
                        this.countVotes();
                    }
                }).finally(() => {
                    this.loader = false;
                })
            },
            countVotes(){
                this.clearCounters();
                for(let i=0; i<this.votes.length; i++) {
                    const v = this.votes[i];

                    switch (v.options.toLowerCase()) {
                        case 'a favor':
                            this.aFavor++;
                            break;
                        case 'en contra':
                            this.enContra++;
                            break;
                        case 'en blanco':
                            this.enBlanco++;
                            break;
                    }

                    switch (v.type_poll.toUpperCase()) {
                        //ORDINARIA, NOMINATIVA, NOMINAL RAZONADA
                        case 'ORDINARIA':
                            //let op = v.options.toLowerCase();
                            if (v.options.toLowerCase() === 'a favor') {
                                this.ordinarias.aFavor.count++;
                                this.ordinarias.aFavor.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en contra') {
                                this.ordinarias.enContra.count++;
                                this.ordinarias.enContra.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en blanco') {
                                this.ordinarias.enBlanco.count++;
                                this.ordinarias.enBlanco.users.push(v.user[0]);
                            }
                            break;
                        case 'NOMINATIVA':
                            if (v.options.toLowerCase() === 'a favor') {
                                this.nominativa.aFavor.count++;
                                this.nominativa.aFavor.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en contra') {
                                this.nominativa.enContra.count++;
                                this.nominativa.enContra.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en blanco') {
                                this.nominativa.enBlanco.count++;
                                this.nominativa.enBlanco.users.push(v.user[0]);
                            }
                            break;
                        case 'NOMINAL RAZONADA':
                            if (v.options.toLowerCase() === 'a favor') {
                                this.nominal_razonada.aFavor.count++;
                                this.nominal_razonada.aFavor.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en contra') {
                                this.nominal_razonada.enContra.count++;
                                this.nominal_razonada.enContra.users.push(v.user[0]);
                            }
                            if (v.options.toLowerCase() === 'en blanco') {
                                this.nominal_razonada.enBlanco.count++;
                                this.nominal_razonada.enBlanco.users.push(v.user[0]);
                            }
                            break;
                        default:
                            console.log(v.type_poll);
                            break;
                    }
                }
            },
            clearCounters() {
                this.aFavor= 0;
                this.enContra= 0;
                this.enBlanco= 0;
                this.ordinarias = {
                    aFavor: {
                        count: 0,
                            users: []
                    },
                    enContra: {
                        count: 0,
                            users: []
                    },
                    enBlanco: {
                        count: 0,
                            users: []
                    }
                }
                this.nominativa = {
                    aFavor: {
                        count: 0,
                            users: []
                    },
                    enContra: {
                        count: 0,
                            users: []
                    },
                    enBlanco: {
                        count: 0,
                            users: []
                    }
                }
                this.nominal_razonada = {
                    aFavor: {
                        count: 0,
                            users: []
                    },
                    enContra: {
                        count: 0,
                            users: []
                    },
                    enBlanco: {
                        count: 0,
                            users: []
                    }
                }
            }
        },

    }
</script>

<style scoped>
    .color-green {
        color: green;
    }
    .color-red {
        color: red;
    }
</style>
