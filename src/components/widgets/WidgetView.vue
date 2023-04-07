<template>
  <div ref="widget" class="widget">
    <div class="resize-handle" ref="resizeHandle"></div>
    <div class="widget-content">
      <TimeSeriesChart :chartOptions="chartOptions" ref="timeSeriesChart"></TimeSeriesChart>
    </div>

  </div>
</template>

<script lang="ts">

import interact from 'interactjs';
import {Options, Vue} from 'vue-class-component';

import {Widget} from '../../models/Widget';
import {SeriesView} from '../../models/SeriesView';
import TimeSeriesChart from "./TimeSeriesChart.vue";


@Options({
  components: {
    TimeSeriesChart,

  },
  props: {
    widget: Object,
    refreshInterval: {
      type: Number,
      default: 5, // Default value in minutes, you can change it as needed
    },
  },
})
export default class WidgetView extends Vue {
  widget!: Widget;
  refreshInterval!: number;
  refreshTimer!: number;

  chartOptions: Highcharts.Options = {
    title: {
      text: ' ',
    },
    xAxis: {
      type: 'datetime',
    },
    series: [],
    chart: {
      zooming: {
        type: 'x'
      },
      // Ensures the chart is responsive by default
      // For more advanced responsiveness, use the 'responsive' option
      width: null,
    },
    credits: {
      enabled: false
    },
  };

  created() {
    this.fetchAndLoadData();
    this.updateChartTitle();
    this.setRefreshTimer();
  }

  setRefreshTimer() {

    this.refreshTimer = window.setInterval(() => {
      this.fetchAndLoadData();
    }, this.refreshInterval * 60 * 1000) as unknown as number;
  }

  beforeUnmount() {
    clearInterval(this.refreshTimer);
  }
  async fetchAndLoadData(): Promise<void> {
    this.chartOptions.series = [];
    for (const seriesInfoKeyObj of this.widget.seriesInfoKeys) {
      const response: Response = await fetch(`/data/series/${seriesInfoKeyObj.seriesInfoKey}.json`);
      const seriesView: SeriesView = await response.json();

      const chartSeries: Highcharts.SeriesOptionsType = {
        type: 'line',
        name: seriesInfoKeyObj.seriesName,
        data: seriesView.data,
      };

      this.chartOptions.series.push(chartSeries);
    }

    // Update chart options
    this.chartOptions = {...this.chartOptions};
  }

  updateChartTitle() {
    if (this.widget?.name) {
      this.chartOptions.title!.text = this.widget.name;
      this.chartOptions = { ...this.chartOptions };
    }
  }
  mounted(): void {
    const widget: HTMLElement = this.$refs.widget as HTMLElement;
    const resizeHandle: HTMLElement = this.$refs.resizeHandle as HTMLElement;

    const timeSeriesChart = this.$refs.timeSeriesChart as Vue & { getChartTitle: () => HTMLElement | null };
    const chartTitle = timeSeriesChart.getChartTitle();

    if (chartTitle) {
      interact(chartTitle)
          .draggable({
            onmove: this.dragMoveListener,
          });
    }

    interact(widget)
        .resizable({
          edges: { right: true, bottom: true },
          onmove: this.resizeMoveListener,
        })
        .styleCursor(false)
        .on('tap', (event) => {
          event.currentTarget.style.zIndex = '1';
        });

    interact(resizeHandle).styleCursor(true);
  }

  dragMoveListener(event: Interact.InteractEvent): void {
    const target = event.target as HTMLElement;
    const widget = target.closest('.widget') as HTMLElement;
    const x = (parseFloat(widget.getAttribute('data-x')!) || 0) + event.dx;
    const y = (parseFloat(widget.getAttribute('data-y')!) || 0) + event.dy;

    widget.style.transform = `translate(${x}px, ${y}px)`;
    widget.setAttribute('data-x', x.toString());
    widget.setAttribute('data-y', y.toString());
  }

  resizeMoveListener(event: Interact.InteractEvent): void {
    const target = event.target as HTMLElement;
    const x = (parseFloat(target.getAttribute('data-x')!) || 0);
    const y = (parseFloat(target.getAttribute('data-y')!) || 0);

    // Update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // Translate when resizing from top or left edges
    const dx = event.delta.x;
    const dy = event.delta.y;
    target.style.transform = `translate(${x + dx}px, ${y + dy}px)`;

    target.setAttribute('data-x', (x + dx).toString());
    target.setAttribute('data-y', (y + dy).toString());
  }

}
</script>
