import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import {VDataTable, VDataTableRows} from 'vuetify/labs/VDataTable'
import {
    VAlert, VApp, VAppBar, VAppBarTitle, VBtn, VBtnToggle,
    VCard, VCardText, VCardTitle,
    VCol, VContainer,
    VDivider, VIcon,
    VLayout,
    VList,
    VListItem,
    VMain,
    VNavigationDrawer,
    VRow, VSelect, VTextField

} from "vuetify/components";

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {

            },
            dark: {

            },
        },
    },
    components: {
        VApp,
        VAppBar,
        VAppBarTitle,
        VDataTable,
        VList,
        VListItem,
        VDivider,
        VNavigationDrawer,
        VMain,
        VLayout,
        VCard,
        VAlert,
        VCol,
        VRow,
        VDataTableRows,
        VIcon,
        VBtn,
        VBtnToggle,
        VContainer,
        VSelect,
        VTextField,
        VCardTitle,
        VCardText
    },
    directives
});
export default vuetify;
