import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
//import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
            iconfont: 'mdi'
        },
        themes: {
            light: {
                primary: '#0288D1',
                secondary: '#2c3e50',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
});
