<template>
    <div class="flex relative justify-end items-end top-12">
      <div class="absolute w-[400px] h-[300px] bg-[#ffffff] rounded-lg border-2 border-[#14213d] shadow-lg flex items-center justify-center top-4">
        <canvas ref="pieChartCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import Chart from 'chart.js/auto';
  
  export default {
    computed: {
      ...mapGetters(['languageData']),
    },
    mounted() {
      if (this.languageData) {
        this.renderChart();
      }
    },
    watch: {
      languageData(newData) {
        if (newData) {
          this.renderChart();
        }
      },
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.pieChartCanvas.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: this.languageData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#000000', 
                },
                
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value} bytes`;
                  },
                },
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  