<template>
    <v-row>
        <v-col>
            <h3 class="my-2">Detalle</h3>
            <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                    <v-expansion-panel-header>Votación ordinaria ({{ getTotalOrdinarias() }})</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ul>
                            <li>{{ordinarias.aFavor.count}} votos a favor</li>
                            <ul>
                                <li v-for="u in ordinarias.aFavor.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>

                        <ul>
                            <li>{{ordinarias.enContra.count}} votos en contra</li>
                            <ul>
                                <li v-for="u in ordinarias.enContra.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                        <ul>
                            <li>{{ordinarias.enBlanco.count}} votos en blanco</li>
                            <ul>
                                <li v-for="u in ordinarias.enBlanco.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Votación nominativa ({{ getTotalNominativas() }})</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ul>
                            <li>{{nominativa.aFavor.count}} votos a favor</li>
                            <ul>
                                <li v-for="u in nominativa.aFavor.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>

                        <ul>
                            <li>{{nominativa.enContra.count}} votos en contra</li>
                            <ul>
                                <li v-for="u in nominativa.enContra.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                        <ul>
                            <li>{{nominativa.enBlanco.count}} votos en blanco</li>
                            <ul>
                                <li v-for="u in nominativa.enBlanco.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Votación nominal razonada ({{ getTotalNominalRazonada() }})</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ul>
                            <li>{{nominal_razonada.aFavor.count}} votos a favor</li>
                            <ul>
                                <li v-for="u in nominal_razonada.aFavor.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>

                        <ul>
                            <li>{{nominal_razonada.enContra.count}} votos en contra</li>
                            <ul>
                                <li v-for="u in nominal_razonada.enContra.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                        <ul>
                            <li>{{nominal_razonada.enBlanco.count}} votos en blanco</li>
                            <ul>
                                <li v-for="u in nominal_razonada.enBlanco.users" :key="u._id">
                                    {{ u.name }} {{ u.lastname }}
                                </li>
                            </ul>
                        </ul>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'DetailVote',
        props: {
            ordinarias: {
                type: Object,
                default: function () {
                    return {
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
            nominativa: {
                type: Object,
                default: function () {
                    return {
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
            nominal_razonada: {
                type: Object,
                default: function () {
                    return {
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
            }
        },
        data: () => ({
            panel: [],
        }),
        mounted() {
          if (this.getTotalOrdinarias()) {
              this.panel.push(0);
          }
            if (this.getTotalNominativas()) {
                this.panel.push(1);
            }
            if (this.getTotalNominalRazonada()) {
                this.panel.push(2);
            }
        },
        methods: {
            getTotalOrdinarias(){
                return this.ordinarias.aFavor.count + this.ordinarias.enContra.count + this.ordinarias.enBlanco.count;
            },
            getTotalNominativas(){
                return this.nominativa.aFavor.count + this.nominativa.enContra.count + this.nominativa.enBlanco.count;

            },
            getTotalNominalRazonada(){
                return this.nominal_razonada.aFavor.count + this.nominal_razonada.enContra.count + this.nominal_razonada.enBlanco.count;
            },
        }
    }
</script>

<style scoped>

</style>
