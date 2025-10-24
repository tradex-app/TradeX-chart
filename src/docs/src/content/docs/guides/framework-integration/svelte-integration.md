---
title: Svelte Integration
description: Integrate TradeX Chart with Svelte applications
---

Learn how to integrate TradeX Chart into your Svelte applications.

## Installation

```bash
npm install tradex-chart
# or
yarn add tradex-chart
```

## Basic Integration

### Svelte Component

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'

  export let symbol = 'BTC/USDT'
  export let data = []

  let chartContainer
  let chart = null

  onMount(() => {
    // Create chart element
    chart = document.createElement('tradex-chart')
    chartContainer.appendChild(chart)

    // Initialize chart
    chart.start({
      title: symbol,
      state: {
        ohlcv: data
      }
    })
  })

  onDestroy(() => {
    if (chart) {
      chart.destroy()
      chart = null
    }
  })

  // Reactive statement to update data
  $: if (chart && data) {
    chart.mergeData(data)
  }
</script>

<div bind:this={chartContainer} class="chart-container"></div>

<style>
  .chart-container {
    width: 100%;
    height: 600px;
  }
</style>
```

### Usage

```svelte
<script>
  import { onMount } from 'svelte'
  import TradingChart from './TradingChart.svelte'

  let symbol = 'BTC/USDT'
  let chartData = []

  onMount(async () => {
    const response = await fetch('https://api.example.com/ohlcv')
    chartData = await response.json()
  })
</script>

<main>
  <h1>Trading Chart</h1>
  <TradingChart {symbol} data={chartData} />
</main>
```

## Advanced Component

### Reusable Chart Component

```svelte
<!-- TradeXChart.svelte -->
<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import * as talib from 'talib-web'

  export let symbol = ''
  export let data = []
  export let config = {}

  const dispatch = createEventDispatcher()

  let chartContainer
  let chart = null
  let loading = true
  let error = null

  onMount(async () => {
    try {
      // Create chart element
      chart = document.createElement('tradex-chart')
      chartContainer.appendChild(chart)

      // Configure chart
      const chartConfig = {
        title: symbol,
        talib: talib,
        width: chartContainer.offsetWidth,
        height: chartContainer.offsetHeight,
        ...config,
        state: {
          ohlcv: data,
          ...config.state
        }
      }

      // Start chart
      await chart.start(chartConfig)
      loading = false
      dispatch('ready', { chart })
    } catch (err) {
      error = err.message
      dispatch('error', { error: err })
    }
  })

  onDestroy(() => {
    if (chart) {
      chart.destroy()
      chart = null
    }
  })

  // Reactive updates
  $: if (chart && data) {
    chart.mergeData(data)
  }

  $: if (chart && symbol) {
    chart.setTitle(symbol)
  }

  // Exported methods
  export function addIndicator(name, params) {
    return chart?.addIndicator(name, params)
  }

  export function removeIndicator(id) {
    chart?.removeIndicator(id)
  }

  export function exportImage() {
    return chart?.exportImage()
  }

  export function getChart() {
    return chart
  }
</script>

<div class="chart-wrapper">
  {#if loading}
    <div class="loading">Loading chart...</div>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <div bind:this={chartContainer} class="chart-container"></div>
</div>

<style>
  .chart-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .chart-container {
    width: 100%;
    height: 100%;
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

```svelte
<script>
  import TradeXChart from './TradeXChart.svelte'

  let chartComponent
  let symbol = 'BTC/USDT'
  let chartData = []

  const chartConfig = {
    theme: {
      candle: {
        UpBodyColour: '#26a69a',
        DnBodyColour: '#ef5350'
      }
    }
  }

  function handleAddRSI() {
    chartComponent.addIndicator('RSI', { period: 14 })
  }

  function handleExport() {
    const image = chartComponent.exportImage()
    // Download or display image
  }

  function onChartReady(event) {
    console.log('Chart ready:', event.detail.chart)
  }

  function onChartError(event) {
    console.error('Chart error:', event.detail.error)
  }
</script>

<div class="trading-app">
  <div class="controls">
    <button on:click={handleAddRSI}>Add RSI</button>
    <button on:click={handleExport}>Export Image</button>
  </div>

  <TradeXChart
    bind:this={chartComponent}
    {symbol}
    data={chartData}
    config={chartConfig}
    on:ready={onChartReady}
    on:error={onChartError}
  />
</div>
```

## Real-time Updates

### WebSocket Integration

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'
  import TradeXChart from './TradeXChart.svelte'

  export let symbol = 'BTC/USDT'

  let chartComponent
  let chartData = []
  let ws = null

  onMount(() => {
    // Connect WebSocket
    ws = new WebSocket('wss://api.example.com/ws')

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        symbol: symbol
      }))
    }

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data)
      const chart = chartComponent?.getChart()

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

  onDestroy(() => {
    if (ws) {
      ws.close()
    }
  })
</script>

<TradeXChart bind:this={chartComponent} {symbol} data={chartData} />
```

## Svelte Stores

### Chart Store

```javascript
// stores/chart.js
import { writable, derived } from 'svelte/store'

function createChartStore() {
  const { subscribe, set, update } = writable({
    symbol: 'BTC/USDT',
    data: [],
    indicators: [],
    timeframe: '1h',
    loading: false,
    error: null
  })

  return {
    subscribe,
    setSymbol: (symbol) => update(state => ({ ...state, symbol })),
    setData: (data) => update(state => ({ ...state, data })),
    addIndicator: (name, params) => update(state => ({
      ...state,
      indicators: [...state.indicators, { name, params }]
    })),
    removeIndicator: (index) => update(state => ({
      ...state,
      indicators: state.indicators.filter((_, i) => i !== index)
    })),
    setTimeframe: (timeframe) => update(state => ({ ...state, timeframe })),
    setLoading: (loading) => update(state => ({ ...state, loading })),
    setError: (error) => update(state => ({ ...state, error })),
    reset: () => set({
      symbol: 'BTC/USDT',
      data: [],
      indicators: [],
      timeframe: '1h',
      loading: false,
      error: null
    })
  }
}

export const chartStore = createChartStore()
```

### Using the Store

```svelte
<script>
  import { chartStore } from './stores/chart'
  import TradeXChart from './TradeXChart.svelte'

  $: symbol = $chartStore.symbol
  $: data = $chartStore.data
</script>

<TradeXChart {symbol} {data} />
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

```svelte
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import type { ChartConfig } from './types/chart'

  export let symbol: string = ''
  export let data: number[][] = []
  export let config: ChartConfig = {}

  const dispatch = createEventDispatcher<{
    ready: { chart: any }
    error: { error: Error }
  }>()

  let chartContainer: HTMLDivElement
  let chart: any = null
  let loading: boolean = true
  let error: string | null = null

  onMount(async () => {
    try {
      chart = document.createElement('tradex-chart')
      chartContainer.appendChild(chart)

      await chart.start({
        title: symbol,
        state: { ohlcv: data },
        ...config
      })

      loading = false
      dispatch('ready', { chart })
    } catch (err) {
      error = (err as Error).message
      dispatch('error', { error: err as Error })
    }
  })

  onDestroy(() => {
    if (chart) {
      chart.destroy()
    }
  })

  export function addIndicator(name: string, params?: any): string {
    return chart?.addIndicator(name, params)
  }

  export function removeIndicator(id: string): void {
    chart?.removeIndicator(id)
  }

  export function exportImage(): string {
    return chart?.exportImage()
  }

  export function getChart(): any {
    return chart
  }
</script>

<div class="chart-wrapper">
  {#if loading}
    <div class="loading">Loading...</div>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <div bind:this={chartContainer} class="chart-container"></div>
</div>
```

## SvelteKit Integration

### Client-Side Only Component

```svelte
<!-- +page.svelte -->
<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  let TradeXChart
  let chartData = []

  onMount(async () => {
    if (browser) {
      // Dynamically import component
      const module = await import('./TradeXChart.svelte')
      TradeXChart = module.default

      // Fetch data
      const response = await fetch('https://api.example.com/ohlcv')
      chartData = await response.json()
    }
  })
</script>

{#if browser && TradeXChart}
  <svelte:component this={TradeXChart} symbol="BTC/USDT" data={chartData} />
{:else}
  <div>Loading...</div>
{/if}
```

### Server-Side Data Loading

```typescript
// +page.server.ts
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('https://api.example.com/ohlcv')
  const data = await response.json()

  return {
    chartData: data
  }
}
```

```svelte
<!-- +page.svelte -->
<script>
  import { browser } from '$app/environment'
  import type { PageData } from './$types'

  export let data: PageData

  let TradeXChart

  $: if (browser) {
    import('./TradeXChart.svelte').then(module => {
      TradeXChart = module.default
    })
  }
</script>

{#if TradeXChart}
  <svelte:component this={TradeXChart} symbol="BTC/USDT" data={data.chartData} />
{/if}
```

## Common Patterns

### Multi-Chart Layout

```svelte
<script>
  import TradeXChart from './TradeXChart.svelte'

  const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT']
  let chartData = {}
</script>

<div class="grid">
  {#each symbols as symbol}
    <TradeXChart
      {symbol}
      data={chartData[symbol] || []}
      config={{ height: 400 }}
    />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
</style>
```

### Chart with Controls

```svelte
<script>
  import TradeXChart from './TradeXChart.svelte'

  let chartComponent
  let timeframe = '1h'
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d']

  let symbol = 'BTC/USDT'
  let chartData = []
</script>

<div class="chart-view">
  <div class="controls">
    {#each timeframes as tf}
      <button
        class:active={timeframe === tf}
        on:click={() => timeframe = tf}
      >
        {tf}
      </button>
    {/each}
  </div>

  <TradeXChart
    bind:this={chartComponent}
    {symbol}
    data={chartData}
  />
</div>

<style>
  .controls button.active {
    background: #2196F3;
    color: white;
  }
</style>
```

## Troubleshooting

### Chart Not Rendering

```svelte
<script>
  import { onMount } from 'svelte'

  let chartContainer

  onMount(() => {
    // Check container size
    console.log('Container:', chartContainer)
    console.log('Size:', {
      width: chartContainer.offsetWidth,
      height: chartContainer.offsetHeight
    })
  })
</script>

<div 
  bind:this={chartContainer} 
  class="chart-container"
  style="width: 100%; height: 600px; min-height: 400px;"
></div>
```

### Memory Leaks

```svelte
<script>
  import { onDestroy } from 'svelte'

  let chart = null

  // Always cleanup
  onDestroy(() => {
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
- [Vue Integration](vue-integration) - Vue guide