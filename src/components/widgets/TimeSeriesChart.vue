<template>
  <div>
    <highcharts :options="chartOptions" ref="highcharts"></highcharts>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart } from 'highcharts-vue';
import { Options as HighchartsOptions } from 'highcharts';
import { Ref } from 'vue';

@Options({
  components: {
    highcharts: Chart,
  },
  props: {
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
})
export default class TimeSeriesChart extends Vue {
  chartOptions!: HighchartsOptions;
  readonly highcharts!: Ref<Chart> | null;

  // Add this method to provide access to the chart title element
  getChartTitle(): HTMLElement | null {
    const highcharts = this.$refs.highcharts as Vue & { $el: HTMLElement };
    return highcharts.$el.querySelector('.highcharts-title');
  }
}
</script>
