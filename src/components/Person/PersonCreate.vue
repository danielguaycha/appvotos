<template>
    <v-card class="col-md-8 offset-md-2">
        <v-card-text>
            <h2> <v-icon class="mr-2">mdi-account-plus</v-icon> Crear persona</h2>
            <v-divider class="my-3"/>
            <PersonFrm />
        </v-card-text>
    </v-card>
</template>

<script>
    import PersonFrm from "./_frm/PersonFrm";

    export default {
        name: 'UserCreate',
        components: {PersonFrm},
        data: () => ({

        }),
    }
</script>

<style scoped>

</style>
