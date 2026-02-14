<template>
  <div class="dashboard fade-in">
    <h1>Dashboard</h1>
    <p class="page-tagline">Simulate before you spend.</p>

    <div class="dashboard-cards">
      <div class="card metric-card">
        <div class="metric-value">${{ formatNum(data.monthlyRevenue) }}</div>
        <div class="metric-label">Monthly Revenue</div>
      </div>
      <div class="card metric-card">
        <div class="metric-value">{{ data.blendedRoas }}x</div>
        <div class="metric-label">Blended ROAS</div>
      </div>
      <div class="card metric-card">
        <div class="metric-value">${{ data.aov }}</div>
        <div class="metric-label">Average Order Value</div>
      </div>
      <div class="card metric-card">
        <div class="metric-value">{{ data.conversionRate }}%</div>
        <div class="metric-label">Conversion Rate</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="panel chart-panel">
        <h3>Revenue (last 6 months)</h3>
        <div class="chart-container">
          <LineChart v-if="data.revenueHistory?.length" :labels="revenueLabels" :values="data.revenueHistory" />
        </div>
      </div>
      <div class="panel chart-panel">
        <h3>Channel ROAS</h3>
        <div class="chart-container bar-chart-wrap">
          <BarChart v-if="channelData.length" :data="channelData" />
        </div>
      </div>
      <div class="panel insight-panel">
        <h3>Opportunity Insights</h3>
        <p class="insight-text">{{ data.opportunityInsight }}</p>
        <p class="insight-sub">This must feel intelligent.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import { getDashboard } from '../api/mock.js'

const data = ref({
  monthlyRevenue: 180450,
  blendedRoas: 2.3,
  aov: 85,
  conversionRate: 2.4,
  revenueHistory: [],
  channelRoas: [],
  opportunityInsight: '',
})

const revenueLabels = computed(() => {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.slice(-(data.value.revenueHistory?.length || 0))
})

const channelData = computed(() =>
  (data.value.channelRoas || []).map(r => ({ label: r.channel, value: r.roas }))
)

function formatNum(n) {
  return n != null ? n.toLocaleString() : '—'
}

onMounted(async () => {
  data.value = getDashboard()
})
</script>

<style scoped>
.dashboard h1 {
  margin-bottom: 0.25rem;
}
.page-tagline {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 1.5rem;
}
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.metric-card {
  padding: 1.25rem;
}
.metric-value {
  font-size: 1.5rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.chart-panel h3,
.insight-panel h3 {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}
.chart-container {
  height: 200px;
}
.bar-chart-wrap {
  height: 200px;
}
.insight-panel {
  grid-column: 1 / -1;
  max-width: 640px;
}
.insight-text {
  margin: 0 0 0.5rem;
  font-size: 14px;
  line-height: 1.6;
}
.insight-sub {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
}
@media (max-width: 900px) {
  .dashboard-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
