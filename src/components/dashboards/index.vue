<template>
  <div>
    <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
    <v-row>
      <v-col>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-col>
      <v-col  cols="auto">
        <v-btn size="large" icon="mdi-plus"></v-btn>
      </v-col>
    </v-row>

    <v-data-table  :headers="headers" :items="dashboardSummaries" :items-per-page="2" :search="search">
      <template v-slot:item.name="{ item }">
        <router-link :to="'/dashboards/' + item.value">{{ item.props.title.name }}</router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {Options, Vue} from "vue-class-component";
import {DashboardSummary} from "../../models/DashboardSummary";


@Options({})
export default class DashboardIndex extends Vue {
  dashboardSummaries: DashboardSummary[] = [];
  errorMessage: string | null = null;
  search: string = "";

  headers = [
    {
      title: 'Name',
      align: 'start',
      sortable: false,
      key: 'name',
      value: 'name'
    }
  ];

  editTutorial(id: string){
    console.log(id)
  }

  async created() {
    this.dashboardSummaries = await axios
        .get("/data/dashboardSummaries.json")
        .then((s) => s.data)
        .catch((error) => {
          this.errorMessage = "Failed to fetch dashboards: " + error.message;
          return [];
        });
  }
}
</script>
