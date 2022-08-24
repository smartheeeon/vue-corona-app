<template>
  <div>
    <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "ChartGraph",
  props: {
    chartOptions: {
      type: Object,
      default() {
        return {
          type: "bar",
          labels: ["red", "blue"],
          datasets: [
            {
              data: [12, 19],
              label: "Test",
              borderWidth: 1,
              backgroundColor: ["rgba(255,99,132,0.2)", "rgba(54,162,235,0.2)"],
              borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)"],
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
      },
    },
  },
  mounted() {
    this.drawChart();
  },
  data() {
    return {
      chartObject: null,
    };
  },
  methods: {
    drawChart() {
      const { type, datasets, labels, options } = this.chartOptions;

      const ctx = this.$refs.myChart.getContext("2d");
      this.chartObject = new Chart(ctx, {
        type,
        data: {
          labels,
          datasets,
        },
        options,
      });
    },
  },
};
</script>

<style></style>
