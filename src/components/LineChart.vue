<template>
  <div class="line-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

const props = defineProps({
  labels: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] },
})

const canvas = ref(null)
let chart = null

function build() {
  if (!canvas.value || !props.labels?.length) return
  const ctx = canvas.value.getContext('2d')
  if (chart) chart.destroy()
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [{
        label: 'Revenue',
        data: props.values,
        borderColor: '#1E2A38',
        backgroundColor: 'rgba(30, 42, 56, 0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#1E2A38',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#5a5a5a' },
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.06)' },
          ticks: { font: { size: 11 }, color: '#5a5a5a', callback: v => '$' + (v / 1000) + 'k' },
        },
      },
    },
  })
}

onMounted(build)
watch(() => [props.labels, props.values], build, { deep: true })
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 100%;
  min-height: 180px;
}
</style>
