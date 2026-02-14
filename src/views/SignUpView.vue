<template>
  <div class="signup-page">
    <header class="signup-header">
      <router-link to="/" class="signup-logo">Alloc8</router-link>
    </header>
    <div class="signup-container">
      <h1>Set up your brand</h1>
      <p class="signup-sub">These values feed the simulation engine.</p>
      <form class="signup-form" @submit.prevent="submit">
        <div class="form-group">
          <label>Brand name</label>
          <input v-model="form.brandName" type="text" required placeholder="Acme Co" />
        </div>
        <div class="form-group">
          <label>Website</label>
          <input v-model="form.website" type="url" required placeholder="https://acme.com" />
        </div>
        <div class="form-group">
          <label>Monthly marketing budget ($)</label>
          <input v-model.number="form.monthlyBudget" type="number" required min="1000" placeholder="20000" />
        </div>
        <div class="form-group">
          <label>AOV ($)</label>
          <input v-model.number="form.aov" type="number" required min="1" placeholder="85" />
        </div>
        <div class="form-group">
          <label>Current blended ROAS</label>
          <input v-model.number="form.currentRoas" type="number" step="0.1" required min="0.5" placeholder="2.3" />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Continue to Dashboard</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '../api/mock.js'

const router = useRouter()
const form = reactive({
  brandName: '',
  website: '',
  monthlyBudget: 20000,
  aov: 85,
  currentRoas: 2.3,
})

async function submit() {
  signup(form)
  router.push('/dashboard')
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: var(--bg-page);
}
.signup-header {
  padding: 1.25rem 2.5rem;
}
.signup-logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--accent);
}
.signup-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem;
}
.signup-container h1 {
  margin-bottom: 0.5rem;
}
.signup-sub {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  font-size: 13px;
}
.signup-form {
  background: var(--bg-panel);
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
}
.btn-block {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
}
</style>
