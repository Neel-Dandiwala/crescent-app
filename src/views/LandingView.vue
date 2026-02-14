<template>
  <div class="landing">
    <header class="landing-header">
      <div class="landing-logo">Crescent</div>
      <nav class="landing-nav">
        <router-link to="/signup" class="btn btn-primary">Get started</router-link>
      </nav>
    </header>

    <section class="hero">
      <h1 class="hero-headline">Predict creator ROI before you spend.</h1>
      <p class="hero-subtext">Model revenue and ROAS across creators and budgets. Built for marketing and growth teams.</p>
      <router-link to="/signup" class="btn btn-primary btn-hero">Get started</router-link>
      <div class="hero-visual">
        <div class="dashboard-preview">
          <div class="preview-card">
            <span class="preview-label">Blended ROAS</span>
            <span class="preview-roas">{{ animatedRoas }}x</span>
          </div>
          <div class="preview-chart">
            <div v-for="(v, i) in chartHeights" :key="i" class="preview-bar" :style="{ height: v + '%' }" />
          </div>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>How it works</h2>
      <div class="steps">
        <div class="step"><span class="step-num">1</span> Connect your brand</div>
        <div class="step"><span class="step-num">2</span> Add creators</div>
        <div class="step"><span class="step-num">3</span> Simulate outcomes</div>
        <div class="step"><span class="step-num">4</span> Allocate capital confidently</div>
      </div>
      <div class="demo-reel">
        <div class="demo-reel-inner">
          <div class="demo-placeholder">Crescent — Simulate ROAS and allocation before you spend.</div>
        </div>
      </div>
    </section>

    <section class="tagline-bar">
      <p>Allocate marketing capital with precision.</p>
      <p>Data-driven creator and budget planning.</p>
      <p>Trusted by growth and performance teams.</p>
    </section>

    <footer class="landing-footer">
      <router-link to="/signup" class="btn btn-primary">Get started</router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const animatedRoas = ref(2.1)
const chartHeights = ref([40, 55, 48, 70, 65, 85])

onMounted(() => {
  const target = 3.4
  let current = 2.1
  const step = (target - current) / 60
  const id = setInterval(() => {
    current += step
    if (current >= target) {
      animatedRoas.value = target
      clearInterval(id)
    } else {
      animatedRoas.value = Math.round(current * 10) / 10
    }
  }, 80)
})
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: var(--bg-page);
}
.landing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid var(--bg-panel-border);
}
.landing-logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--accent);
}
.hero {
  padding: 4rem 2.5rem 5rem;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}
.hero-headline {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.hero-subtext {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}
.btn-hero {
  padding: 0.85rem 1.75rem;
  font-size: 14px;
}
.hero-visual {
  margin-top: 3rem;
  perspective: 800px;
}
.dashboard-preview {
  background: var(--bg-panel);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-panel);
  display: inline-flex;
  gap: 2rem;
  align-items: flex-end;
  transform: rotateX(4deg);
}
.preview-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.preview-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.preview-roas {
  font-weight: 700;
  font-size: 2rem;
  color: var(--accent);
}
.preview-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 60px;
}
.preview-bar {
  width: 12px;
  background: var(--accent);
  border-radius: 2px;
  opacity: 0.8;
  transition: height 0.3s ease;
}
.how-it-works {
  padding: 4rem 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}
.how-it-works h2 {
  text-align: center;
  margin-bottom: 2rem;
}
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
.step {
  background: var(--bg-panel);
  padding: 1.25rem;
  border-radius: var(--radius);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.step-num {
  width: 28px;
  height: 28px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.demo-reel {
  background: var(--bg-panel);
  border-radius: var(--radius);
  padding: 3rem;
  text-align: center;
}
.demo-reel-inner {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-placeholder {
  color: var(--text-muted);
  font-size: 13px;
}
.tagline-bar {
  padding: 2rem 2.5rem;
  background: var(--accent);
  color: #fff;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.tagline-bar p {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
}
.landing-footer {
  padding: 2rem;
  text-align: center;
}
</style>
