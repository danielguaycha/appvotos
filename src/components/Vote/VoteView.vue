<template>
    <v-card class="col-md-12" elevation="0">
        <v-card-text>
            <h2> <v-icon class="mr-2">mdi-ballot</v-icon> Resultados de Votación</h2>
            <v-divider class="my-3"/>
            <v-row>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1 color-green">45</div>
                        <div>votos a favor</div>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1 color-red">10</div>
                        <div>votos en contra</div>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="text-center pa-2">
                        <div class="display-1">0</div>
                        <div>votos en blanco</div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h3>Detalle</h3>
                    <v-expansion-panels
                            v-model="panel"
                            multiple
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-header>Votación ordinaria</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul>
                                    <li>3 votos a favor</li>
                                    <ul>
                                        <li>Persona 1</li>
                                        <li>Persona 2</li>
                                        <li>Persona 2</li>
                                    </ul>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Votación Normativa</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul>
                                    <li>2 votos a favor</li>
                                    <ul>
                                        <li>Persona 1</li>
                                        <li>Persona 2</li>
                                    </ul>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Votación razonable</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Some content
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            panel: [0, 1, 2],
        }),
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
