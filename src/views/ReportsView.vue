<template>
  <div class="reports fade-in">
    <h1>Reports</h1>
    <p class="page-tagline">Predicted vs Actual (mocked).</p>

    <div class="panel report-accuracy">
      <span class="accuracy-label">Accuracy</span>
      <span class="accuracy-value">{{ data.accuracy }}%</span>
    </div>

    <div class="panel chart-panel">
      <h3>Predicted vs Actual ROAS</h3>
      <div class="chart-container">
        <PredictedActualChart
          v-if="data.labels?.length"
          :labels="data.labels"
          :predicted="data.predicted"
          :actual="data.actual"
        />
      </div>
    </div>

    <div class="report-actions">
      <button class="btn btn-primary" disabled>Download PDF</button>
      <span class="mock-note">(mock)</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PredictedActualChart from '../components/PredictedActualChart.vue'
import { getReports } from '../api/mock.js'

const data = ref({
  accuracy: 87,
  labels: [],
  predicted: [],
  actual: [],
})

onMounted(async () => {
  data.value = getReports()
})
</script>

<style scoped>
.reports h1 {
  margin-bottom: 0.25rem;
}
.page-tagline {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 1.5rem;
}
.report-accuracy {
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.accuracy-label {
  font-size: 13px;
  color: var(--text-muted);
}
.accuracy-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--success);
}
.chart-panel {
  margin-bottom: 1.5rem;
}
.chart-panel h3 {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}
.chart-container {
  height: 260px;
}
.report-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.mock-note {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
