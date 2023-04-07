<template>
  <v-container class="overflow-y-auto">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <router-link to="/dashboards">
          <v-btn text small color="primary">Back to Dashboards</v-btn>
        </router-link>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-select :items="[{title: '1m', value: 1},{title: '5m', value: 5},{title: '15m', value: 15}]"
                  label="Refresh Interval" v-model.number="refreshInterval" dense>
        </v-select>
      </v-col>
    </v-row>

    <v-card v-if="dashboard">
      <v-card-title>{{ dashboard.name }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="widget in dashboard.widgets" :key="widget.name" cols="12" md="6">
            <widget-view :widget="widget" :refresh-interval="refreshInterval"></widget-view>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
  </v-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import { Dashboard } from '../../models/Dashboard';
import WidgetView from '../widgets/WidgetView.vue';

@Options({
  components: {
    WidgetView,
  },
})
export default class DashboardDetails extends Vue {
  dashboard: Dashboard | null = null;
  errorMessage: string | null = null;
  refreshInterval = 5;

  async mounted() {
    const dashboardId = this.$route.params.id;
    try {
      const response = await axios.get<Dashboard>(`/data/dashboards/${dashboardId}.json`);
      this.dashboard = response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      this.errorMessage = 'Failed to fetch dashboard';
    }
  }
}
</script>
