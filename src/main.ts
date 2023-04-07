import { createApp } from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import exportingInit from 'highcharts/modules/exporting';
import App from './App.vue';
import router from './router';
import vuetify from './vuetify'

// Import accessibility module and initialize it after exportingInit
import AccessibilityModule from 'highcharts/modules/accessibility';

exportingInit(Highcharts);
AccessibilityModule(Highcharts);

const app = createApp(App);
app.use(vuetify);
app.use(router).use(_=>HighchartsVue);

app.mount('#app');
