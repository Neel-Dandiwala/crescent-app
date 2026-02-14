<template>
  <div class="bar-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip)

const props = defineProps({
  data: { type: Array, default: () => [] },
})

const canvas = ref(null)
let chart = null

function build() {
  if (!canvas.value || !props.data?.length) return
  const ctx = canvas.value.getContext('2d')
  if (chart) chart.destroy()
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.data.map(d => d.label),
      datasets: [{
        label: 'ROAS',
        data: props.data.map(d => d.value),
        backgroundColor: ['#1E2A38', '#5E8C61', '#C68A2B'],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.raw + 'x' } } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#5a5a5a' },
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.06)' },
          ticks: { font: { size: 11 }, color: '#5a5a5a', callback: v => v + 'x' },
        },
      },
    },
  })
}

onMounted(build)
watch(() => props.data, build, { deep: true })
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
  min-height: 180px;
}
</style>
