<template>
  <div class="simulator fade-in">
    <h1>Capital Allocation Simulator</h1>
    <p class="page-tagline">Simulate before you spend. Allocate marketing capital with precision.</p>

    <div class="simulator-controls panel">
      <div class="control-row">
        <div class="form-group budget-group">
          <label>Total Budget ($)</label>
          <input
            v-model.number="totalBudget"
            type="number"
            min="1000"
            step="1000"
            class="budget-input"
          />
        </div>
        <div class="slider-wrap">
          <input
            v-model.number="totalBudget"
            type="range"
            min="5000"
            max="50000"
            step="1000"
            class="budget-slider"
          />
          <span class="slider-labels">
            <span>$5k</span>
            <span>$50k</span>
          </span>
        </div>
      </div>
      <p v-if="allocation.diminishingMessage" class="diminishing-msg text-risk">
        {{ allocation.diminishingMessage }}
      </p>
    </div>

    <div class="blended-roas panel">
      <span class="blended-label">Blended ROAS</span>
      <span class="blended-value" :class="{ 'roas-bump': justUpdated }">{{ displayRoas }}x</span>
    </div>

    <div class="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th>Creator</th>
            <th>Allocation</th>
            <th>Predicted Revenue</th>
            <th>ROAS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in allocation.allocations" :key="row.id">
            <td>{{ row.name }}</td>
            <td>${{ formatNum(row.allocation) }}</td>
            <td>${{ formatNum(row.predictedRevenue) }}</td>
            <td>{{ row.roas }}x</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="creator-select panel">
      <h3>Select creators to include</h3>
      <div class="creator-chips">
        <label v-for="c in creators" :key="c.id" class="chip">
          <input type="checkbox" :value="c.id" v-model="selectedCreatorIds" />
          <span>{{ c.name }} ({{ c.platform }})</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getCreators, allocateSimulator } from '../api/mock.js'

const totalBudget = ref(20000)
const creators = ref([])
const selectedCreatorIds = ref([])
const displayRoas = ref(0)
const justUpdated = ref(false)
const allocation = ref({
  allocations: [],
  totalBudget: 0,
  totalRevenue: 0,
  blendedRoas: 0,
  diminishingMessage: null,
})

function formatNum(n) {
  return n != null ? n.toLocaleString() : '—'
}

function animateRoas(from, to) {
  const steps = 12
  const step = (to - from) / steps
  let i = 0
  const id = setInterval(() => {
    i++
    displayRoas.value = Math.round((from + step * i) * 10) / 10
    if (i >= steps) {
      displayRoas.value = to
      clearInterval(id)
      setTimeout(() => { justUpdated.value = false }, 300)
    }
  }, 40)
}

async function fetchAllocation() {
  const prevRoas = allocation.value.blendedRoas
  const data = allocateSimulator({
    totalBudget: totalBudget.value,
    creatorIds: selectedCreatorIds.value.length ? selectedCreatorIds.value : null,
  })
  allocation.value = data
  justUpdated.value = true
  if (prevRoas !== undefined && prevRoas !== data.blendedRoas) {
    animateRoas(prevRoas, data.blendedRoas)
  } else {
    displayRoas.value = data.blendedRoas
    justUpdated.value = false
  }
}

onMounted(async () => {
  creators.value = getCreators()
  selectedCreatorIds.value = creators.value.slice(0, 3).map(c => c.id)
  await fetchAllocation()
})

watch([totalBudget, selectedCreatorIds], fetchAllocation, { deep: true })
</script>

<style scoped>
.simulator h1 {
  margin-bottom: 0.25rem;
}
.page-tagline {
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 1.5rem;
}
.simulator-controls {
  margin-bottom: 1rem;
}
.control-row {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.budget-group {
  margin-bottom: 0;
  min-width: 140px;
}
.budget-input {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
}
.slider-wrap {
  flex: 1;
  min-width: 200px;
  max-width: 320px;
}
.budget-slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}
.budget-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}
.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 0.25rem;
}
.diminishing-msg {
  margin: 1rem 0 0;
  font-size: 13px;
}

.blended-roas {
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.blended-label {
  font-size: 13px;
  color: var(--text-muted);
}
.blended-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--success);
  transition: transform 0.2s ease;
}
.blended-value.roas-bump {
  animation: roasBump 0.35s ease;
}
@keyframes roasBump {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.creator-select h3 {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}
.creator-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius);
  font-size: 13px;
  cursor: pointer;
}
.chip input {
  margin: 0;
}
.chip:has(input:checked) {
  border-color: var(--accent);
  background: rgba(30, 42, 56, 0.06);
}
</style>
