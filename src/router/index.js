import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Landing', component: () => import('../views/LandingView.vue'), meta: { layout: 'empty' } },
  { path: '/signup', name: 'SignUp', component: () => import('../views/SignUpView.vue'), meta: { layout: 'empty' } },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/integrations', name: 'Integrations', component: () => import('../views/IntegrationsView.vue') },
  { path: '/creators', name: 'Creators', component: () => import('../views/CreatorsView.vue') },
  { path: '/creators/analyze/:id?', name: 'CreatorAnalysis', component: () => import('../views/CreatorAnalysisView.vue') },
  { path: '/simulator', name: 'Simulator', component: () => import('../views/SimulatorView.vue') },
  { path: '/reports', name: 'Reports', component: () => import('../views/ReportsView.vue') },
  { path: '/share/creator/:id', name: 'CreatorShare', component: () => import('../views/CreatorShareView.vue'), meta: { layout: 'empty' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
