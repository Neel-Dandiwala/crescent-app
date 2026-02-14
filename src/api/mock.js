/**
 * In-app mock API — same data and logic as the previous backend, no server needed.
 */

let brand = null
let creators = [
  { id: '1', name: 'Creator A', platform: 'TikTok', followers: 420000, avgViews: 85000, engagementRate: 4.2, costPerCampaign: 6000, predictedRoas: 3.0, predictedRevenue: 18000 },
  { id: '2', name: 'Creator B', platform: 'Instagram', followers: 280000, avgViews: 45000, engagementRate: 3.8, costPerCampaign: 8000, predictedRoas: 2.5, predictedRevenue: 20000 },
  { id: '3', name: 'Creator C', platform: 'TikTok', followers: 650000, avgViews: 220000, engagementRate: 5.1, costPerCampaign: 6000, predictedRoas: 4.6, predictedRevenue: 27600 },
]

export function signup(body) {
  const { brandName, website, monthlyBudget, aov, currentRoas } = body
  brand = {
    brandName,
    website,
    monthlyBudget: Number(monthlyBudget) || 20000,
    aov: Number(aov) || 85,
    currentRoas: Number(currentRoas) || 2.3,
  }
  return { success: true, brand }
}

export function getBrand() {
  return brand || { brandName: 'Demo Brand', website: 'demo.com', monthlyBudget: 20000, aov: 85, currentRoas: 2.3 }
}

export function getDashboard() {
  const b = brand || { monthlyBudget: 20000, aov: 85, currentRoas: 2.3 }
  const monthlyRevenue = Math.round(180000 + Math.random() * 40000)
  return {
    monthlyRevenue,
    blendedRoas: b.currentRoas,
    aov: b.aov,
    conversionRate: 2.4,
    revenueHistory: [142000, 158000, 165000, 172000, 178000, monthlyRevenue],
    channelRoas: [
      { channel: 'Meta', roas: 2.4 },
      { channel: 'TikTok', roas: 1.9 },
      { channel: 'Google', roas: 3.1 },
    ],
    opportunityInsight: 'Your TikTok performance is under-optimized. Creator-led video may increase ROAS by 35%.',
  }
}

export function getIntegrations() {
  return {
    integrations: [
      { id: 'shopify', name: 'Shopify', status: 'synced', lastSync: '3 mins ago', dataPoints: 18450 },
      { id: 'meta', name: 'Meta Ads', status: 'synced', lastSync: '3 mins ago', dataPoints: 12420 },
      { id: 'tiktok', name: 'TikTok Ads', status: 'synced', lastSync: '5 mins ago', dataPoints: 8920 },
    ],
  }
}

export function getCreators() {
  return creators
}

export function createCreator(body) {
  const { name, platform, followers, avgViews, engagementRate, costPerCampaign } = body
  const id = String(creators.length + 1)
  const virality = 0.8 + Math.random() * 0.4
  const ctr = 0.015 + Math.random() * 0.01
  const cvr = 0.02 + Math.random() * 0.01
  const b = brand || { aov: 85 }
  const predictedViews = Math.round((Number(followers) || 100000) * ((Number(engagementRate) || 4) / 100) * virality)
  const predictedConversions = Math.round(predictedViews * ctr * cvr)
  const predictedRevenue = predictedConversions * b.aov
  const cost = Number(costPerCampaign) || 5000
  const predictedRoas = Number((predictedRevenue / cost).toFixed(1))
  const creator = {
    id,
    name: name || 'New Creator',
    platform: platform || 'TikTok',
    followers: Number(followers) || 100000,
    avgViews: Number(avgViews) || 50000,
    engagementRate: Number(engagementRate) || 4,
    costPerCampaign: cost,
    predictedRoas,
    predictedRevenue: Math.round(predictedRevenue),
    confidence: 70 + Math.floor(Math.random() * 25),
    riskLevel: predictedRoas >= 3 ? 'Low' : predictedRoas >= 2 ? 'Medium' : 'High',
  }
  creators.push(creator)
  return creator
}

export function analyzeCreator(body) {
  const { name, platform, followers, avgViews, engagementRate, costPerCampaign } = body
  const b = brand || { aov: 85 }
  const f = Number(followers) || 200000
  const eng = Number(engagementRate) || 4
  const cost = Number(costPerCampaign) || 7000
  const virality = 0.85 + Math.random() * 0.3
  const ctr = 0.015 + Math.random() * 0.008
  const cvr = 0.02 + Math.random() * 0.015
  const predictedViews = Math.round(f * (eng / 100) * virality)
  const predictedClicks = Math.round(predictedViews * ctr)
  const predictedConversions = Math.round(predictedClicks * cvr)
  const predictedRevenue = predictedConversions * b.aov
  const predictedRoas = Number((predictedRevenue / cost).toFixed(1))
  const confidence = 75 + Math.floor(Math.random() * 20)
  return {
    predictedRoas,
    predictedViews,
    estimatedCtr: (ctr * 100).toFixed(1),
    estimatedConversions: predictedConversions,
    estimatedRevenue: predictedRevenue,
    campaignCost: cost,
    confidence,
    riskLevel: predictedRoas >= 3.5 ? 'Low' : predictedRoas >= 2.5 ? 'Medium' : 'High',
    funnel: { views: predictedViews, clicks: predictedClicks, conversions: predictedConversions, revenue: predictedRevenue },
    aiInsight: 'This creator performs best with problem-solution hooks. Audience overlaps 62% with your top converting demographic. Suggest UGC-style storytelling for optimal performance.',
  }
}

export function allocateSimulator(body) {
  const { totalBudget, creatorIds } = body
  const budget = Number(totalBudget) || 20000
  const selected = (creatorIds && creatorIds.length)
    ? creators.filter(c => creatorIds.includes(c.id))
    : creators.slice(0, 3)
  const totalCost = selected.reduce((s, c) => s + c.costPerCampaign, 0)
  const scale = budget / totalCost
  const allocations = selected.map(c => ({
    ...c,
    allocation: Math.round(c.costPerCampaign * scale),
    predictedRevenue: Math.round((c.predictedRevenue || 0) * scale),
  }))
  allocations.forEach(a => {
    a.roas = a.allocation ? Number((a.predictedRevenue / a.allocation).toFixed(1)) : 0
  })
  const totalRevenue = allocations.reduce((s, a) => s + a.predictedRevenue, 0)
  const blendedRoas = budget ? Number((totalRevenue / budget).toFixed(1)) : 0
  const diminishingMessage = budget > 22000 ? 'Diminishing returns detected above $9,000 allocation.' : null
  return { allocations, totalBudget: budget, totalRevenue, blendedRoas, diminishingMessage }
}

export function getReports() {
  return {
    accuracy: 87,
    predicted: [2.1, 2.4, 2.8, 3.0, 3.2, 3.4],
    actual: [2.0, 2.5, 2.7, 3.1, 3.3, 3.2],
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  }
}

export function getCreatorShare(id) {
  const c = creators.find(x => x.id === id)
  if (!c) return null
  return {
    ...c,
    brandFitScore: 78,
    suggestedHookStyle: 'Problem-solution',
    messagingDirection: 'Focus on before/after transformation. Lead with pain point.',
  }
}
