<template>
  <div class="creators-page fade-in">
    <div class="creators-header">
      <div>
        <h1>Creators</h1>
        <p class="page-tagline">Evaluate and compare creators.</p>
      </div>
      <button class="btn btn-primary" @click="openModal">Evaluate New Creator</button>
    </div>

    <div class="creators-list">
      <div v-for="c in creators" :key="c.id" class="panel creator-row">
        <div class="creator-info">
          <span class="creator-name">{{ c.name }}</span>
          <span class="creator-meta">{{ c.platform }} · {{ formatNum(c.followers) }} followers</span>
        </div>
        <div class="creator-metrics">
          <span>Predicted ROAS: <strong>{{ c.predictedRoas }}x</strong></span>
          <span>Cost: ${{ formatNum(c.costPerCampaign) }}</span>
        </div>
        <div class="creator-actions">
          <router-link :to="`/creators/analyze/${c.id}`" class="btn btn-secondary btn-sm">View Analysis</router-link>
          <router-link :to="`/share/creator/${c.id}`" class="btn btn-secondary btn-sm">Share</router-link>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content evaluate-modal slide-in">
          <div class="modal-header">
            <h2>Evaluate New Creator</h2>
            <button class="modal-close" aria-label="Close" @click="closeModal">×</button>
          </div>
          <form @submit.prevent="runAnalysis">
            <div class="form-row">
              <div class="form-group">
                <label>Creator Name</label>
                <input v-model="form.name" type="text" required placeholder="Creator name" />
              </div>
              <div class="form-group">
                <label>Platform</label>
                <select v-model="form.platform">
                  <option value="IG">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Followers</label>
                <input v-model.number="form.followers" type="number" required min="0" placeholder="200000" />
              </div>
              <div class="form-group">
                <label>Avg Views</label>
                <input v-model.number="form.avgViews" type="number" min="0" placeholder="50000" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Engagement Rate (%)</label>
                <input v-model.number="form.engagementRate" type="number" step="0.1" required min="0" placeholder="4.2" />
              </div>
              <div class="form-group">
                <label>Cost Per Campaign ($)</label>
                <input v-model.number="form.costPerCampaign" type="number" required min="0" placeholder="7000" />
              </div>
            </div>

            <div class="form-group">
              <label>Sample video (mock)</label>
              <div
                class="dropzone"
                :class="{ active: dragOver }"
                @dragover.prevent="dragOver = true"
                @dragleave="dragOver = false"
                @drop.prevent="onDrop"
              >
                <span v-if="!uploadedFile">Drop video here or click to upload</span>
                <span v-else>{{ uploadedFile }}</span>
              </div>
            </div>
            <div class="form-group">
              <label>Screenshot (mock)</label>
              <div
                class="dropzone"
                :class="{ active: dragOver2 }"
                @dragover.prevent="dragOver2 = true"
                @dragleave="dragOver2 = false"
                @drop.prevent="onDrop2"
              >
                <span v-if="!uploadedFile2">Drop image here or click to upload</span>
                <span v-else>{{ uploadedFile2 }}</span>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="analyzing">
                {{ analyzing ? 'Analyzing…' : 'Run Analysis' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Analysis progress modal -->
    <Teleport to="body">
      <div v-if="showAnalysisProgress" class="modal-overlay">
        <div class="analysis-progress slide-in">
          <h3>Analyzing creator…</h3>
          <ul class="progress-steps">
            <li v-for="(step, i) in progressSteps" :key="i" :class="{ done: step.done, current: step.current }">
              {{ step.text }}
            </li>
          </ul>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCreators, analyzeCreator, createCreator } from '../api/mock.js'

const router = useRouter()
const creators = ref([])
const showModal = ref(false)
const showAnalysisProgress = ref(false)
const analyzing = ref(false)
const dragOver = ref(false)
const dragOver2 = ref(false)
const uploadedFile = ref('')
const uploadedFile2 = ref('')

const form = reactive({
  name: '',
  platform: 'TikTok',
  followers: 200000,
  avgViews: 50000,
  engagementRate: 4.2,
  costPerCampaign: 7000,
})

const progressSteps = ref([
  { text: 'Analyzing video hook strength…', done: false, current: false },
  { text: 'Evaluating audience overlap…', done: false, current: false },
  { text: 'Simulating traffic velocity…', done: false, current: false },
  { text: 'Predicting conversion probability…', done: false, current: false },
])

function formatNum(n) {
  return n != null ? n.toLocaleString() : '—'
}

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function onDrop(e) {
  dragOver.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) uploadedFile.value = f.name
}

function onDrop2(e) {
  dragOver2.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) uploadedFile2.value = f.name
}

async function runAnalysis() {
  analyzing.value = true
  showModal.value = false
  showAnalysisProgress.value = true
  progressSteps.value = progressSteps.value.map((s, i) => ({ ...s, done: false, current: i === 0 }))

  for (let i = 0; i < progressSteps.value.length; i++) {
    progressSteps.value[i].current = true
    await new Promise(r => setTimeout(r, 800))
    progressSteps.value[i].done = true
    progressSteps.value[i].current = false
  }

  analyzeCreator(form)

  const newCreator = createCreator({
    ...form,
    platform: form.platform === 'IG' ? 'Instagram' : form.platform,
  })

  showAnalysisProgress.value = false
  analyzing.value = false
  creators.value = [...creators.value, newCreator]
  router.push(`/creators/analyze/${newCreator.id}`)
}

onMounted(async () => {
  creators.value = getCreators()
})
</script>

<style scoped>
.creators-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}
.creators-header h1 {
  margin-bottom: 0.25rem;
}
.page-tagline {
  color: var(--text-muted);
  font-size: 13px;
  margin: 0;
}
.creators-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.creator-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.creator-info {
  flex: 1;
  min-width: 180px;
}
.creator-name {
  font-weight: 600;
  display: block;
}
.creator-meta {
  font-size: 12px;
  color: var(--text-muted);
}
.creator-metrics {
  display: flex;
  gap: 1rem;
  font-size: 13px;
}
.creator-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.modal-content {
  background: var(--bg-page);
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.modal-header h2 {
  margin: 0;
  font-size: 1.15rem;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-muted);
  line-height: 1;
}
.evaluate-modal form {
  padding: 1.5rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.06);
}

.dropzone {
  border: 2px dashed rgba(0,0,0,0.15);
  border-radius: var(--radius);
  padding: 1.25rem;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.dropzone:hover,
.dropzone.active {
  border-color: var(--accent);
  background: rgba(30, 42, 56, 0.03);
}

.analysis-progress {
  background: var(--bg-panel);
  padding: 2rem;
  border-radius: var(--radius);
  min-width: 320px;
}
.analysis-progress h3 {
  margin-bottom: 1.25rem;
  font-size: 1rem;
}
.progress-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}
.progress-steps li {
  padding: 0.5rem 0;
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s;
}
.progress-steps li.current {
  color: var(--accent);
  font-weight: 500;
}
.progress-steps li.done {
  color: var(--success);
}
</style>
