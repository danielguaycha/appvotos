<template>
    <v-row v-show="show" class="loader">
        <v-col class="text-center d-flex flex-column justify-center align-center">
            <v-progress-circular color="primary" class="mb-3" indeterminate></v-progress-circular>
            {{message}}
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Loader',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            message: {
                type: String,
                default: "Cargando..."
            },
        }
    }
</script>

<style scoped>
    .loader {
        text-align: center;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
