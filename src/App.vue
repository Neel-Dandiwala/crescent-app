<template>
  <div :class="layoutClass">
    <aside v-if="showSidebar" class="sidebar">
      <div class="sidebar-brand">Crescent</div>
      <nav>
        <ul class="sidebar-nav">
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/integrations">Integrations</router-link></li>
          <li><router-link to="/creators">Creators</router-link></li>
          <li><router-link to="/simulator">Simulator</router-link></li>
          <li><router-link to="/reports">Reports</router-link></li>
          <li><router-link to="/dashboard">Settings</router-link></li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showSidebar = computed(() => route.meta.layout !== 'empty')
const layoutClass = computed(() => showSidebar.value ? 'app-layout' : 'app-layout app-layout-full')
</script>

<style scoped>
.sidebar-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--accent);
  padding: 0 1.5rem 1rem;
  letter-spacing: -0.02em;
}
.app-layout-full .main-content {
  max-width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
