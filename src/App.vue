<template>

    <v-card>
      <v-layout>
        <v-navigation-drawer
            app
            permanent
            expand-on-hover
            rail
        >
          <v-list>
            <v-list-item :to="'/'"
                         prepend-avatar="/vite.svg"
                         title="Visiualitix"

            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" :to="'/'" title="Home" value="Home"></v-list-item>
            <v-list-item prepend-icon="mdi-view-dashboard" :to="'/dashboards'" title="Dashboards"
                         value="Dashboards"></v-list-item>
            <v-list-item prepend-icon="mdi-chart-box" :to="'/reports'" title="Reports" value="Reports"></v-list-item>
            <v-list-item prepend-icon="mdi-file-document-multiple" :to="'/Documents'" title="Documents" value="Documents"></v-list-item>
            <v-list-item prepend-icon="mdi-theme-light-dark" title="Theme" value="Theme"
                         @click="toggleTheme"></v-list-item>

          </v-list>
        </v-navigation-drawer>

        <v-main >
          <router-view></router-view>
        </v-main>
      </v-layout>
    </v-card>

</template>

<script lang="ts">
import {defineComponent, ref, watchEffect } from 'vue';
import Highcharts from 'highcharts';
import {useTheme} from 'vuetify'

import brandDark from 'highcharts/themes/high-contrast-dark';
import brandlight from 'highcharts/themes/brand-light';

export default defineComponent({
  setup() {
    const theme = useTheme()
    const storedTheme = localStorage.getItem('userTheme') || 'light';
    theme.global.name.value = storedTheme;

    watchEffect(() => {
      if (theme.global.current.value.dark) {
        brandDark(Highcharts);
      } else {
        Highcharts.setOptions(Highcharts.getOptions())
      }
    });

    return {
      theme,
      toggleTheme: () => {
        const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
        localStorage.setItem('userTheme', newTheme);
        theme.global.name.value = newTheme
      }
    };
  },
});
</script>
