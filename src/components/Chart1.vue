<template>
    <div class="flex relative justify-start items-start top-12">
      <div class="absolute w-[400px] h-[300px]  justify-center items-center bg-[#ffffff] rounded-lg border-2 border-[#14213d] shadow-lg flex top-4">
        <canvas  ref="radarChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'Chart1',
    computed: {
      ...mapGetters(['languageData']),
    },
    data() {
      return {
        chart: null,
      };
    },
    async mounted() {
      await this.loadChartJs();
      this.renderChart();
    },
    methods: {
      async loadChartJs() {
        return new Promise((resolve) => {
          if (window.Chart) {
            resolve();
          } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => {
              resolve();
            };
            script.onerror = () => {
              console.error('Failed to load Chart.js');
              resolve();
            };
            document.head.appendChild(script);
          }
        });
      },
      renderChart() {
        if (this.chart) {
          this.chart.destroy();
        }
        const ctx = this.$refs.radarChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'radar',
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
                  label: function(context) {
                    return `${context.label}: ${context.raw}`;
                  }
                },
                backgroundColor: '#333333', // Tooltip background color
                titleColor: '#ffffff', // Tooltip title color
                bodyColor: '#ffffff', // Tooltip body color
              },
            },
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: '#87bcde', // Angle lines color
                },
                grid: {
                  color: '#87bcde', // Grid color
                },
                pointLabels: {
                  color: '#ffffff', // Point labels color
                },
                ticks: {
                  beginAtZero: true,
                  color: '#0d1821', // Ticks color
                },
                suggestedMin: 0,
                suggestedMax: 100,
                
              },
            },
          },
        });
      }
    },
    watch: {
      languageData: 'renderChart'
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  