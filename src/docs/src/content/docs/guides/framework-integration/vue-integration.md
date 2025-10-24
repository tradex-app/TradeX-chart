---
title: Vue Integration
description: Integrate TradeX Chart with Vue.js applications
---

# Vue Integration

Learn how to integrate TradeX Chart into your Vue.js applications (Vue 3).

## Installation

```bash
npm install tradex-chart
# or
yarn add tradex-chart
```

## Basic Integration

### Single File Component

```vue
<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  }
})

const chartContainer = ref(null)
let chart = null

onMounted(() => {
  // Create chart element
  chart = document.createElement('tradex-chart')
  chartContainer.value.appendChild(chart)

  // Initialize chart
  chart.start({
    title: props.symbol,
    state: {
      ohlcv: props.data
    }
  })
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
    chart = null
  }
})

// Watch for data changes
watch(() => props.data, (newData) => {
  if (chart && newData) {
    chart.mergeData(newData)
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
```

### Usage

```vue
<template>
  <div class="app">
    <h1>Trading Chart</h1>
    <TradingChart :symbol="symbol" :data="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TradingChart from './components/TradingChart.vue'

const symbol = ref('BTC/USDT')
const chartData = ref([])

onMounted(async () => {
  const response = await fetch('https://api.example.com/ohlcv')
  chartData.value = await response.json()
})
</script>
```

## Advanced Component

### Reusable Chart Component

```vue
<template>
  <div ref="containerRef" class="tradex-chart-wrapper">
    <div v-if="loading" class="loading">Loading chart...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineExpose } from 'vue'
import * as talib from 'talib-web'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['ready', 'error'])

const containerRef = ref(null)
const chartRef = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    // Create chart element
    const chart = document.createElement('tradex-chart')
    containerRef.value.appendChild(chart)
    chartRef.value = chart

    // Configure chart
    const chartConfig = {
      title: props.symbol,
      talib: talib,
      width: containerRef.value.offsetWidth,
      height: containerRef.value.offsetHeight,
      ...props.config,
      state: {
        ohlcv: props.data,
        ...props.config.state
      }
    }

    // Start chart
    await chart.start(chartConfig)
    loading.value = false
    emit('ready', chart)
  } catch (err) {
    error.value = err.message
    emit('error', err)
  }
})

onUnmounted(() => {
  if (chartRef.value) {
    chartRef.value.destroy()
    chartRef.value = null
  }
})

// Watch for data updates
watch(() => props.data, (newData) => {
  if (chartRef.value && newData) {
    chartRef.value.mergeData(newData)
  }
}, { deep: true })

// Watch for symbol changes
watch(() => props.symbol, (newSymbol) => {
  if (chartRef.value && newSymbol) {
    chartRef.value.setTitle(newSymbol)
  }
})

// Expose methods to parent
defineExpose({
  addIndicator: (name, params) => {
    return chartRef.value?.addIndicator(name, params)
  },
  removeIndicator: (id) => {
    chartRef.value?.removeIndicator(id)
  },
  exportImage: () => {
    return chartRef.value?.exportImage()
  },
  getChart: () => chartRef.value
})
</script>

<style scoped>
.tradex-chart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading,
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error {
  color: red;
}
</style>
```

### Using the Advanced Component

```vue
<template>
  <div class="trading-app">
    <div class="controls">
      <button @click="handleAddRSI">Add RSI</button>
      <button @click="handleExport">Export Image</button>
    </div>

    <TradeXChart
      ref="chartRef"
      :symbol="symbol"
      :data="chartData"
      :config="chartConfig"
      @ready="onChartReady"
      @error="onChartError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TradeXChart from './components/TradeXChart.vue'

const chartRef = ref(null)
const symbol = ref('BTC/USDT')
const chartData = ref([])

const chartConfig = {
  theme: {
    candle: {
      UpBodyColour: '#26a69a',
      DnBodyColour: '#ef5350'
    }
  }
}

const handleAddRSI = () => {
  chartRef.value?.addIndicator('RSI', { period: 14 })
}

const handleExport = () => {
  const image = chartRef.value?.exportImage()
  // Download or display image
}

const onChartReady = (chart) => {
  console.log('Chart ready:', chart)
}

const onChartError = (error) => {
  console.error('Chart error:', error)
}
</script>
```

## Real-time Updates

### WebSocket Integration

```vue
<template>
  <TradeXChart ref="chartRef" :symbol="symbol" :data="chartData" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TradeXChart from './components/TradeXChart.vue'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  }
})

const chartRef = ref(null)
const chartData = ref([])
let ws = null

onMounted(() => {
  // Connect WebSocket
  ws = new WebSocket('wss://api.example.com/ws')

  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: 'subscribe',
      symbol: props.symbol
    }))
  }

  ws.onmessage = (event) => {
    const update = JSON.parse(event.data)
    const chart = chartRef.value?.getChart()

    if (chart) {
      const candle = [
        update.timestamp,
        update.open,
        update.high,
        update.low,
        update.close,
        update.volume
      ]

      if (update.isClosed) {
        chart.addCandle(candle)
      } else {
        chart.updateStreamingCandle(candle)
      }
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
})
</script>
```

## Composables

### useTradeXChart Composable

```javascript
// composables/useTradeXChart.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useTradeXChart(config = {}) {
  const containerRef = ref(null)
  const chartRef = ref(null)
  const isReady = ref(false)
  const error = ref(null)

  onMounted(async () => {
    try {
      if (!containerRef.value) return

      const chart = document.createElement('tradex-chart')
      containerRef.value.appendChild(chart)
      chartRef.value = chart

      await chart.start(config)
      isReady.value = true
    } catch (err) {
      error.value = err
    }
  })

  onUnmounted(() => {
    if (chartRef.value) {
      chartRef.value.destroy()
    }
  })

  const addIndicator = (name, params) => {
    return chartRef.value?.addIndicator(name, params)
  }

  const updateData = (data) => {
    chartRef.value?.mergeData(data)
  }

  return {
    containerRef,
    chart: chartRef,
    isReady,
    error,
    addIndicator,
    updateData
  }
}
```

### Usage

```vue
<template>
  <div>
    <div v-if="!isReady">Loading chart...</div>
    <div ref="containerRef" class="chart-container"></div>
    <button v-if="isReady" @click="addIndicator('RSI')">Add RSI</button>
  </div>
</template>

<script setup>
import { useTradeXChart } from './composables/useTradeXChart'

const props = defineProps({
  data: Array
})

const { containerRef, isReady, addIndicator } = useTradeXChart({
  title: 'BTC/USDT',
  state: { ohlcv: props.data }
})
</script>
```

## TypeScript Support

### Type Definitions

```typescript
// types/chart.ts
export interface ChartConfig {
  title?: string
  width?: number
  height?: number
  theme?: any
  state?: {
    ohlcv?: number[][]
    [key: string]: any
  }
  [key: string]: any
}

export interface ChartMethods {
  addIndicator: (name: string, params?: any) => string
  removeIndicator: (id: string) => void
  exportImage: () => string
  getChart: () => any
}
```

### TypeScript Component

```vue
<template>
  <div ref="containerRef" class="chart-wrapper"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineExpose } from 'vue'
import type { ChartConfig, ChartMethods } from '../types/chart'

interface Props {
  symbol: string
  data: number[][]
  config?: ChartConfig
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({})
})

const emit = defineEmits<{
  ready: [chart: any]
  error: [error: Error]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const chartRef = ref<any>(null)

onMounted(async () => {
  try {
    if (!containerRef.value) return

    const chart = document.createElement('tradex-chart')
    containerRef.value.appendChild(chart)
    chartRef.value = chart

    await chart.start({
      title: props.symbol,
      state: { ohlcv: props.data },
      ...props.config
    })

    emit('ready', chart)
  } catch (error) {
    emit('error', error as Error)
  }
})

onUnmounted(() => {
  if (chartRef.value) {
    chartRef.value.destroy()
  }
})

defineExpose<ChartMethods>({
  addIndicator: (name: string, params?: any) => {
    return chartRef.value?.addIndicator(name, params)
  },
  removeIndicator: (id: string) => {
    chartRef.value?.removeIndicator(id)
  },
  exportImage: () => {
    return chartRef.value?.exportImage()
  },
  getChart: () => chartRef.value
})
</script>
```

## State Management

### With Pinia

```javascript
// stores/chart.js
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', {
  state: () => ({
    symbol: 'BTC/USDT',
    data: [],
    indicators: [],
    timeframe: '1h'
  }),

  actions: {
    setSymbol(symbol) {
      this.symbol = symbol
    },

    setData(data) {
      this.data = data
    },

    addIndicator(name, params) {
      this.indicators.push({ name, params })
    },

    removeIndicator(index) {
      this.indicators.splice(index, 1)
    },

    setTimeframe(timeframe) {
      this.timeframe = timeframe
    }
  }
})
```

### Usage with Pinia

```vue
<template>
  <TradeXChart
    :symbol="chartStore.symbol"
    :data="chartStore.data"
  />
</template>

<script setup>
import { useChartStore } from './stores/chart'
import TradeXChart from './components/TradeXChart.vue'

const chartStore = useChartStore()
</script>
```

## Options API (Vue 2 Style)

```vue
<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
export default {
  name: 'TradingChart',

  props: {
    symbol: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.initChart()
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },

  watch: {
    data(newData) {
      if (this.chart && newData) {
        this.chart.mergeData(newData)
      }
    }
  },

  methods: {
    initChart() {
      this.chart = document.createElement('tradex-chart')
      this.$refs.chartContainer.appendChild(this.chart)

      this.chart.start({
        title: this.symbol,
        state: {
          ohlcv: this.data
        }
      })
    },

    addIndicator(name, params) {
      return this.chart?.addIndicator(name, params)
    },

    removeIndicator(id) {
      this.chart?.removeIndicator(id)
    }
  }
}
</script>
```

## Common Patterns

### Multi-Chart Layout

```vue
<template>
  <div class="grid grid-cols-2 gap-4">
    <TradeXChart
      v-for="symbol in symbols"
      :key="symbol"
      :symbol="symbol"
      :data="chartData[symbol]"
      :config="{ height: 400 }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TradeXChart from './components/TradeXChart.vue'

const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT']
const chartData = ref({})
</script>
```

### Chart with Controls

```vue
<template>
  <div class="chart-view">
    <div class="controls">
      <button
        v-for="tf in timeframes"
        :key="tf"
        :class="{ active: timeframe === tf }"
        @click="timeframe = tf"
      >
        {{ tf }}
      </button>
    </div>

    <TradeXChart
      ref="chartRef"
      :symbol="symbol"
      :data="chartData"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TradeXChart from './components/TradeXChart.vue'

const chartRef = ref(null)
const timeframe = ref('1h')
const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d']
const symbol = ref('BTC/USDT')
const chartData = ref([])
</script>
```

## Troubleshooting

### Chart Not Rendering

```vue
<template>
  <!-- Ensure container has size -->
  <div 
    ref="chartContainer" 
    class="chart-container"
    style="width: 100%; height: 600px; min-height: 400px;"
  ></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartContainer = ref(null)

onMounted(() => {
  // Check if container exists
  console.log('Container:', chartContainer.value)
  console.log('Size:', {
    width: chartContainer.value?.offsetWidth,
    height: chartContainer.value?.offsetHeight
  })
})
</script>
```

### Memory Leaks

```vue
<script setup>
import { onUnmounted } from 'vue'

let chart = null

// Always cleanup
onUnmounted(() => {
  if (chart) {
    chart.destroy()
    chart = null
  }
})
</script>
```

## Related Documentation

- [Getting Started](../../reference/01_getting_started) - Basic setup
- [Configuration](../../reference/02_configuration) - Chart configuration
- [WebSocket Integration](../backend/websocket-integration) - Real-time data
- [API Reference](../../api/core) - Complete API
- [React Integration](react-integration) - React guide
- [Angular Integration](angular-integration) - Angular guide