<template>
  <div class="integrations fade-in">
    <h1>Integrations</h1>
    <p class="page-tagline">Connected data sources (mocked).</p>

    <div class="integration-cards">
      <div v-for="int in list" :key="int.id" class="panel integration-card">
        <div class="integration-header">
          <span class="integration-name">{{ int.name }}</span>
          <span class="integration-status">
            <span class="sync-dot" :class="{ pulse: syncing }" />
            {{ int.status }}
          </span>
        </div>
        <div class="integration-meta">
          <span>Last sync: {{ int.lastSync }}</span>
          <span>Historical data points: {{ int.dataPoints.toLocaleString() }} orders</span>
        </div>
        <div v-if="syncing" class="syncing-indicator">Syncing…</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getIntegrations } from '../api/mock.js'

const list = ref([])
const syncing = ref(true)

onMounted(async () => {
  const json = getIntegrations()
  list.value = json.integrations || []
  setTimeout(() => { syncing.value = false }, 2000)
})
</script>

<style scoped>
.integrations h1 {
  margin-bottom: 0.25rem;
}
.page-tagline {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 1.5rem;
}
.integration-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.integration-card {
  position: relative;
}
.integration-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}
.integration-name {
  font-weight: 600;
  font-size: 1rem;
}
.integration-status {
  font-size: 12px;
  color: var(--success);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.sync-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
}
.sync-dot.pulse {
  animation: pulse 1s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.integration-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 12px;
  color: var(--text-muted);
}
.syncing-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 11px;
  color: var(--accent);
}
</style>
