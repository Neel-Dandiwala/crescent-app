<template>
  <div class="predicted-actual-chart">
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
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const props = defineProps({
  labels: { type: Array, default: () => [] },
  predicted: { type: Array, default: () => [] },
  actual: { type: Array, default: () => [] },
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
      datasets: [
        {
          label: 'Predicted',
          data: props.predicted,
          borderColor: '#1E2A38',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 4,
        },
        {
          label: 'Actual',
          data: props.actual,
          borderColor: '#5E8C61',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': ' + ctx.raw + 'x' } },
      },
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
watch(() => [props.labels, props.predicted, props.actual], build, { deep: true })
</script>

<style scoped>
.predicted-actual-chart {
  width: 100%;
  height: 100%;
  min-height: 220px;
}
</style>
