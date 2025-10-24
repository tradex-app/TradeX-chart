---
title: React Integration
description: Integrate TradeX Chart with React applications
---

# React Integration

Learn how to integrate TradeX Chart into your React applications.

## Installation

```bash
npm install tradex-chart
# or
yarn add tradex-chart
```

## Basic Integration

### Functional Component with Hooks

```jsx
import React, { useEffect, useRef } from 'react'

function TradingChart({ symbol, data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // Initialize chart
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = document.createElement('tradex-chart')
      chartRef.current.appendChild(chartInstance.current)

      chartInstance.current.start({
        title: symbol,
        state: {
          ohlcv: data
        }
      })
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
      }
    }
  }, [])

  // Update data when it changes
  useEffect(() => {
    if (chartInstance.current && data) {
      chartInstance.current.mergeData(data)
    }
  }, [data])

  return (
    <div 
      ref={chartRef} 
      style={{ width: '100%', height: '600px' }}
    />
  )
}

export default TradingChart
```

### Usage

```jsx
import TradingChart from './components/TradingChart'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch data
    fetch('https://api.example.com/ohlcv')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div className="App">
      <h1>Trading Chart</h1>
      <TradingChart symbol="BTC/USDT" data={data} />
    </div>
  )
}
```

## Advanced Component

### Reusable Chart Component

```jsx
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as talib from 'talib-web'

const TradeXChart = forwardRef(({ 
  symbol,
  data,
  config = {},
  onReady,
  onError 
}, ref) => {
  const containerRef = useRef(null)
  const chartRef = useRef(null)

  // Expose chart methods to parent
  useImperativeHandle(ref, () => ({
    addIndicator: (name, params) => {
      return chartRef.current?.addIndicator(name, params)
    },
    removeIndicator: (id) => {
      chartRef.current?.removeIndicator(id)
    },
    setTimeframe: (timeframe) => {
      // Custom timeframe logic
    },
    exportImage: () => {
      return chartRef.current?.exportImage()
    },
    getChart: () => chartRef.current
  }))

  useEffect(() => {
    const initChart = async () => {
      try {
        if (!containerRef.current) return

        // Create chart element
        const chart = document.createElement('tradex-chart')
        containerRef.current.appendChild(chart)
        chartRef.current = chart

        // Configure chart
        const chartConfig = {
          title: symbol,
          talib: talib,
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
          ...config,
          state: {
            ohlcv: data,
            ...config.state
          }
        }

        // Start chart
        await chart.start(chartConfig)

        if (onReady) {
          onReady(chart)
        }
      } catch (error) {
        console.error('Failed to initialize chart:', error)
        if (onError) {
          onError(error)
        }
      }
    }

    initChart()

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  // Update data
  useEffect(() => {
    if (chartRef.current && data) {
      chartRef.current.mergeData(data)
    }
  }, [data])

  // Update symbol
  useEffect(() => {
    if (chartRef.current && symbol) {
      chartRef.current.setTitle(symbol)
    }
  }, [symbol])

  return (
    <div 
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
})

TradeXChart.displayName = 'TradeXChart'

export default TradeXChart
```

### Using the Advanced Component

```jsx
import { useRef, useState } from 'react'
import TradeXChart from './components/TradeXChart'

function TradingApp() {
  const chartRef = useRef(null)
  const [symbol, setSymbol] = useState('BTC/USDT')
  const [data, setData] = useState([])

  const handleAddRSI = () => {
    chartRef.current?.addIndicator('RSI', { period: 14 })
  }

  const handleExport = () => {
    const image = chartRef.current?.exportImage()
    // Download or display image
  }

  return (
    <div>
      <div className="controls">
        <button onClick={handleAddRSI}>Add RSI</button>
        <button onClick={handleExport}>Export Image</button>
      </div>
      
      <TradeXChart
        ref={chartRef}
        symbol={symbol}
        data={data}
        config={{
          theme: {
            candle: {
              UpBodyColour: '#26a69a',
              DnBodyColour: '#ef5350'
            }
          }
        }}
        onReady={(chart) => console.log('Chart ready:', chart)}
        onError={(error) => console.error('Chart error:', error)}
      />
    </div>
  )
}
```

## Real-time Updates

### WebSocket Integration

```jsx
import { useEffect, useRef, useState } from 'react'

function RealtimeChart({ symbol }) {
  const chartRef = useRef(null)
  const wsRef = useRef(null)
  const [data, setData] = useState([])

  useEffect(() => {
    // Connect WebSocket
    wsRef.current = new WebSocket('wss://api.example.com/ws')

    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({
        type: 'subscribe',
        symbol: symbol
      }))
    }

    wsRef.current.onmessage = (event) => {
      const update = JSON.parse(event.data)
      
      if (chartRef.current) {
        const candle = [
          update.timestamp,
          update.open,
          update.high,
          update.low,
          update.close,
          update.volume
        ]

        if (update.isClosed) {
          chartRef.current.addCandle(candle)
        } else {
          chartRef.current.updateStreamingCandle(candle)
        }
      }
    }

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [symbol])

  return <TradeXChart ref={chartRef} symbol={symbol} data={data} />
}
```

## Custom Hooks

### useTradeXChart Hook

```jsx
import { useEffect, useRef, useState } from 'react'

function useTradeXChart(config = {}) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initChart = async () => {
      try {
        if (!containerRef.current) return

        const chart = document.createElement('tradex-chart')
        containerRef.current.appendChild(chart)
        chartRef.current = chart

        await chart.start(config)
        setIsReady(true)
      } catch (err) {
        setError(err)
      }
    }

    initChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  const addIndicator = (name, params) => {
    return chartRef.current?.addIndicator(name, params)
  }

  const updateData = (data) => {
    chartRef.current?.mergeData(data)
  }

  return {
    containerRef,
    chart: chartRef.current,
    isReady,
    error,
    addIndicator,
    updateData
  }
}

// Usage
function ChartComponent({ data }) {
  const { containerRef, isReady, addIndicator } = useTradeXChart({
    title: 'BTC/USDT',
    state: { ohlcv: data }
  })

  return (
    <div>
      {!isReady && <div>Loading chart...</div>}
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
      {isReady && (
        <button onClick={() => addIndicator('RSI')}>Add RSI</button>
      )}
    </div>
  )
}
```

## TypeScript Support

### Type Definitions

```typescript
import { RefObject } from 'react'

interface ChartConfig {
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

interface TradeXChartProps {
  symbol: string
  data: number[][]
  config?: ChartConfig
  onReady?: (chart: any) => void
  onError?: (error: Error) => void
}

interface ChartRef {
  addIndicator: (name: string, params?: any) => string
  removeIndicator: (id: string) => void
  setTimeframe: (timeframe: string) => void
  exportImage: () => string
  getChart: () => any
}
```

### TypeScript Component

```tsx
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

const TradeXChart = forwardRef<ChartRef, TradeXChartProps>((
  { symbol, data, config = {}, onReady, onError },
  ref
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    addIndicator: (name: string, params?: any) => {
      return chartRef.current?.addIndicator(name, params)
    },
    removeIndicator: (id: string) => {
      chartRef.current?.removeIndicator(id)
    },
    setTimeframe: (timeframe: string) => {
      // Implementation
    },
    exportImage: () => {
      return chartRef.current?.exportImage()
    },
    getChart: () => chartRef.current
  }))

  // ... rest of implementation

  return (
    <div 
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  )
})

TradeXChart.displayName = 'TradeXChart'

export default TradeXChart
```

## State Management

### With Redux

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

function ChartContainer() {
  const dispatch = useDispatch()
  const { symbol, data, indicators } = useSelector(state => state.chart)
  const chartRef = useRef(null)

  useEffect(() => {
    // Sync indicators with chart
    if (chartRef.current) {
      indicators.forEach(indicator => {
        chartRef.current.addIndicator(indicator.name, indicator.params)
      })
    }
  }, [indicators])

  return (
    <TradeXChart
      ref={chartRef}
      symbol={symbol}
      data={data}
    />
  )
}
```

### With Context API

```jsx
import { createContext, useContext, useState } from 'react'

const ChartContext = createContext()

export function ChartProvider({ children }) {
  const [symbol, setSymbol] = useState('BTC/USDT')
  const [data, setData] = useState([])
  const [indicators, setIndicators] = useState([])

  const addIndicator = (name, params) => {
    setIndicators([...indicators, { name, params }])
  }

  return (
    <ChartContext.Provider value={{
      symbol,
      setSymbol,
      data,
      setData,
      indicators,
      addIndicator
    }}>
      {children}
    </ChartContext.Provider>
  )
}

export function useChart() {
  return useContext(ChartContext)
}

// Usage
function ChartComponent() {
  const { symbol, data, indicators } = useChart()
  
  return <TradeXChart symbol={symbol} data={data} />
}
```

## Performance Optimization

### Memoization

```jsx
import { memo, useMemo } from 'react'

const TradeXChart = memo(({ symbol, data, config }) => {
  // Memoize config to prevent unnecessary re-renders
  const chartConfig = useMemo(() => ({
    title: symbol,
    ...config,
    state: { ohlcv: data }
  }), [symbol, config, data])

  // ... chart implementation
}, (prevProps, nextProps) => {
  // Custom comparison
  return (
    prevProps.symbol === nextProps.symbol &&
    prevProps.data === nextProps.data
  )
})
```

### Lazy Loading

```jsx
import { lazy, Suspense } from 'react'

const TradeXChart = lazy(() => import('./components/TradeXChart'))

function App() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <TradeXChart symbol="BTC/USDT" data={data} />
    </Suspense>
  )
}
```

## Testing

### Jest + React Testing Library

```jsx
import { render, waitFor } from '@testing-library/react'
import TradeXChart from './TradeXChart'

describe('TradeXChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TradeXChart symbol="BTC/USDT" data={[]} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('initializes chart with data', async () => {
    const data = [
      [1609459200000, 29000, 29500, 28800, 29200, 1234.56]
    ]
    
    const { container } = render(
      <TradeXChart symbol="BTC/USDT" data={data} />
    )

    await waitFor(() => {
      const chart = container.querySelector('tradex-chart')
      expect(chart).toBeInTheDocument()
    })
  })

  it('calls onReady when chart is initialized', async () => {
    const onReady = jest.fn()
    
    render(
      <TradeXChart 
        symbol="BTC/USDT" 
        data={[]} 
        onReady={onReady}
      />
    )

    await waitFor(() => {
      expect(onReady).toHaveBeenCalled()
    })
  })
})
```

## Common Patterns

### Multi-Chart Layout

```jsx
function MultiChartView() {
  const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT']

  return (
    <div className="grid grid-cols-2 gap-4">
      {symbols.map(symbol => (
        <TradeXChart
          key={symbol}
          symbol={symbol}
          data={data[symbol]}
          config={{ height: 400 }}
        />
      ))}
    </div>
  )
}
```

### Chart with Controls

```jsx
function ChartWithControls() {
  const chartRef = useRef(null)
  const [timeframe, setTimeframe] = useState('1h')

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d']

  return (
    <div>
      <div className="controls">
        {timeframes.map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={timeframe === tf ? 'active' : ''}
          >
            {tf}
          </button>
        ))}
      </div>
      
      <TradeXChart
        ref={chartRef}
        symbol="BTC/USDT"
        data={data}
      />
    </div>
  )
}
```

## Troubleshooting

### Chart Not Rendering

```jsx
// Ensure container has size
const containerStyle = {
  width: '100%',
  height: '600px',
  minHeight: '400px'
}

// Check if chart element is created
useEffect(() => {
  console.log('Chart element:', chartRef.current)
}, [chartRef.current])
```

### Memory Leaks

```jsx
// Always cleanup in useEffect
useEffect(() => {
  // ... initialization

  return () => {
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }
  }
}, [])
```

## Related Documentation

- [Getting Started](../../reference/01_getting_started) - Basic setup
- [Configuration](../../reference/02_configuration) - Chart configuration
- [WebSocket Integration](../backend/websocket-integration) - Real-time data
- [API Reference](../../api/core) - Complete API
- [Vue Integration](vue-integration) - Vue.js guide
- [Angular Integration](angular-integration) - Angular guide