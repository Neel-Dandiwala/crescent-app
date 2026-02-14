<template>
  <div class="creator-analysis fade-in">
    <router-link to="/creators" class="back-link">← Creators</router-link>

    <template v-if="result">
      <div class="result-hero">
        <div class="roas-badge">🔮 {{ result.predictedRoas }}x Predicted ROAS</div>
      </div>

      <div class="result-grid">
        <div class="panel metrics-grid">
          <div class="metric-item">
            <span class="metric-value">{{ formatNum(result.predictedViews) }}</span>
            <span class="metric-label">Predicted Views</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">{{ result.estimatedCtr }}%</span>
            <span class="metric-label">Estimated CTR</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">{{ formatNum(result.estimatedConversions) }}</span>
            <span class="metric-label">Estimated Conversions</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">${{ formatNum(result.estimatedRevenue) }}</span>
            <span class="metric-label">Estimated Revenue</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">${{ formatNum(result.campaignCost) }}</span>
            <span class="metric-label">Campaign Cost</span>
          </div>
          <div class="metric-item">
            <span class="metric-value" :class="confidenceClass">{{ result.confidence }}%</span>
            <span class="metric-label">Confidence</span>
          </div>
          <div class="metric-item">
            <span class="metric-value" :class="riskClass">{{ result.riskLevel }}</span>
            <span class="metric-label">Risk Level</span>
          </div>
        </div>

        <div class="panel funnel-panel">
          <h3>Funnel</h3>
          <div class="funnel-viz">
            <div class="funnel-stage">
              <span class="funnel-label">Views</span>
              <span class="funnel-value">{{ formatNum(result.funnel?.views) }}</span>
            </div>
            <div class="funnel-arrow">→</div>
            <div class="funnel-stage">
              <span class="funnel-label">Clicks</span>
              <span class="funnel-value">{{ formatNum(result.funnel?.clicks) }}</span>
            </div>
            <div class="funnel-arrow">→</div>
            <div class="funnel-stage">
              <span class="funnel-label">Conversions</span>
              <span class="funnel-value">{{ formatNum(result.funnel?.conversions) }}</span>
            </div>
            <div class="funnel-arrow">→</div>
            <div class="funnel-stage">
              <span class="funnel-label">Revenue</span>
              <span class="funnel-value">${{ formatNum(result.funnel?.revenue) }}</span>
            </div>
          </div>
        </div>

        <div class="panel insight-panel full-width">
          <h3>AI Insight</h3>
          <p class="insight-text">{{ result.aiInsight }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <p>Loading analysis…</p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCreators, analyzeCreator } from '../api/mock.js'

const route = useRoute()
const result = ref(null)

const confidenceClass = computed(() => {
  if (!result.value?.confidence) return ''
  if (result.value.confidence >= 80) return 'text-success'
  if (result.value.confidence >= 60) return 'text-risk'
  return 'text-danger'
})

const riskClass = computed(() => {
  const r = result.value?.riskLevel
  if (r === 'Low') return 'text-success'
  if (r === 'Medium') return 'text-risk'
  return 'text-danger'
})

function formatNum(n) {
  return n != null ? n.toLocaleString() : '—'
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    const list = getCreators()
    const creator = list.find(c => c.id === id)
    if (creator) {
      result.value = analyzeCreator({
        name: creator.name,
        platform: creator.platform,
        followers: creator.followers,
        avgViews: creator.avgViews,
        engagementRate: creator.engagementRate,
        costPerCampaign: creator.costPerCampaign,
      })
      return
    }
  }
  result.value = {
    predictedRoas: 3.4,
    predictedViews: 148000,
    estimatedCtr: '1.9',
    estimatedConversions: 280,
    estimatedRevenue: 23800,
    campaignCost: 7000,
    confidence: 84,
    riskLevel: 'Medium',
    funnel: { views: 148000, clicks: 2812, conversions: 280, revenue: 23800 },
    aiInsight: 'This creator performs best with problem-solution hooks. Audience overlaps 62% with your top converting demographic. Suggest UGC-style storytelling for optimal performance.',
  }
})
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 13px;
  color: var(--text-muted);
}
.back-link:hover {
  color: var(--accent);
  text-decoration: none;
}
.result-hero {
  text-align: center;
  margin-bottom: 2rem;
}
.roas-badge {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent);
  display: inline-block;
  padding: 1rem 1.5rem;
  background: var(--bg-panel);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
}
.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.metric-item {
  display: flex;
  flex-direction: column;
}
.metric-item .metric-value {
  font-size: 1.1rem;
}
.funnel-panel h3,
.insight-panel h3 {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}
.funnel-viz {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.funnel-stage {
  background: rgba(30, 42, 56, 0.06);
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  text-align: center;
  min-width: 80px;
}
.funnel-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}
.funnel-value {
  font-weight: 600;
  font-size: 13px;
}
.funnel-arrow {
  color: var(--text-muted);
  font-size: 12px;
}
.insight-panel.full-width {
  grid-column: 1 / -1;
}
.insight-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}
@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
