<template>
  <div class="creator-share">
    <header class="share-header">
      <div class="share-logo">Alloc8</div>
      <span class="share-badge">Creator insight — read only</span>
    </header>

    <div class="share-container" v-if="data">
      <h1>{{ data.name }}</h1>
      <p class="platform-meta">{{ data.platform }} · {{ formatNum(data.followers) }} followers</p>

      <div class="share-cards">
        <div class="panel share-card">
          <span class="share-card-label">Brand fit score</span>
          <span class="share-card-value">{{ data.brandFitScore }}%</span>
        </div>
        <div class="panel share-card">
          <span class="share-card-label">Predicted ROAS</span>
          <span class="share-card-value">{{ data.predictedRoas }}x</span>
        </div>
        <div class="panel share-card">
          <span class="share-card-label">Estimated impact</span>
          <span class="share-card-value">${{ formatNum(data.predictedRevenue) }} revenue</span>
        </div>
      </div>

      <div class="panel share-section">
        <h3>Suggested hook style</h3>
        <p>{{ data.suggestedHookStyle }}</p>
      </div>
      <div class="panel share-section">
        <h3>Messaging direction</h3>
        <p>{{ data.messagingDirection }}</p>
      </div>

      <p class="tagline-footer">Allocate marketing capital with precision. Simulate before you spend.</p>
    </div>

    <div v-else class="share-container">
      <p>Loading…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCreatorShare } from '../api/mock.js'

const route = useRoute()
const data = ref(null)

function formatNum(n) {
  return n != null ? n.toLocaleString() : '—'
}

onMounted(async () => {
  data.value = getCreatorShare(route.params.id)
})
</script>

<style scoped>
.creator-share {
  min-height: 100vh;
  background: var(--bg-page);
}
.share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.share-logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--accent);
}
.share-badge {
  font-size: 12px;
  color: var(--text-muted);
}
.share-container {
  max-width: 560px;
  margin: 0 auto;
  padding: 2rem;
}
.share-container h1 {
  margin-bottom: 0.25rem;
}
.platform-meta {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 1.5rem;
}
.share-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.share-card {
  text-align: center;
  padding: 1.25rem;
}
.share-card-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}
.share-card-value {
  font-weight: 700;
  font-size: 1.25rem;
}
.share-section {
  margin-bottom: 1rem;
}
.share-section h3 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.share-section p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}
.tagline-footer {
  margin-top: 2rem;
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}
@media (max-width: 600px) {
  .share-cards {
    grid-template-columns: 1fr;
  }
}
</style>
