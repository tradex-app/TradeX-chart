---
title: Next.js Integration
description: Integrate TradeX Chart with Next.js applications
---

Learn how to integrate TradeX Chart into your Next.js applications (App Router and Pages Router).

## Installation

```bash
npm install tradex-chart
# or
yarn add tradex-chart
```

## App Router (Next.js 13+)

### Client Component

```tsx
// components/TradingChart.tsx
'use client'

import { useEffect, useRef } from 'react'

interface TradingChartProps {
  symbol: string
  data: number[][]
}

export default function TradingChart({ symbol, data }: TradingChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<any>(null)

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
```

### Using in App Router

```tsx
// app/trading/page.tsx
import { Suspense } from 'react'
import TradingChart from '@/components/TradingChart'

async function getChartData() {
  const res = await fetch('https://api.example.com/ohlcv', {
    cache: 'no-store' // or 'force-cache' for static
  })
  return res.json()
}

export default async function TradingPage() {
  const data = await getChartData()

  return (
    <main>
      <h1>Trading Chart</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <TradingChart symbol="BTC/USDT" data={data} />
      </Suspense>
    </main>
  )
}
```

## Pages Router (Next.js 12 and earlier)

### Dynamic Import

```tsx
// pages/trading.tsx
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import to avoid SSR issues
const TradingChart = dynamic(
  () => import('../components/TradingChart'),
  { 
    ssr: false,
    loading: () => <div>Loading chart...</div>
  }
)

export default function TradingPage() {
  const [data, setData] = useState<number[][]>([])

  useEffect(() => {
    fetch('https://api.example.com/ohlcv')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div>
      <h1>Trading Chart</h1>
      <TradingChart symbol="BTC/USDT" data={data} />
    </div>
  )
}
```

### Server-Side Props

```tsx
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

const TradingChart = dynamic(
  () => import('../components/TradingChart'),
  { ssr: false }
)

interface Props {
  data: number[][]
}

export default function TradingPage({ data }: Props) {
  return (
    <div>
      <h1>Trading Chart</h1>
      <TradingChart symbol="BTC/USDT" data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/ohlcv')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
```

## Advanced Component

### Full-Featured Client Component

```tsx
// components/TradeXChart.tsx
'use client'

import { 
  useEffect, 
  useRef, 
  useImperativeHandle, 
  forwardRef,
  useState 
} from 'react'
import * as talib from 'talib-web'

interface ChartConfig {
  title?: string
  width?: number
  height?: number
  theme?: any
  state?: any
  [key: string]: any
}

interface TradeXChartProps {
  symbol: string
  data: number[][]
  config?: ChartConfig
  onReady?: (chart: any) => void
  onError?: (error: Error) => void
}

export interface ChartRef {
  addIndicator: (name: string, params?: any) => string
  removeIndicator: (id: string) => void
  exportImage: () => string
  getChart: () => any
}

const TradeXChart = forwardRef<ChartRef, TradeXChartProps>((
  { symbol, data, config = {}, onReady, onError },
  ref
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    addIndicator: (name: string, params?: any) => {
      return chartRef.current?.addIndicator(name, params)
    },
    removeIndicator: (id: string) => {
      chartRef.current?.removeIndicator(id)
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

        const chart = document.createElement('tradex-chart')
        containerRef.current.appendChild(chart)
        chartRef.current = chart

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

        await chart.start(chartConfig)
        setLoading(false)
        onReady?.(chart)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        onError?.(err as Error)
      }
    }

    initChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (chartRef.current && data) {
      chartRef.current.mergeData(data)
    }
  }, [data])

  useEffect(() => {
    if (chartRef.current && symbol) {
      chartRef.current.setTitle(symbol)
    }
  }, [symbol])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          Loading chart...
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'red'
        }}>
          {error}
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
})

TradeXChart.displayName = 'TradeXChart'

export default TradeXChart
```

## Real-time Updates with WebSocket

### Client Component with WebSocket

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const TradeXChart = dynamic(
  () => import('./TradeXChart'),
  { ssr: false }
)

interface RealtimeChartProps {
  symbol: string
  initialData: number[][]
}

export default function RealtimeChart({ symbol, initialData }: RealtimeChartProps) {
  const chartRef = useRef<any>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    wsRef.current = new WebSocket('wss://api.example.com/ws')

    wsRef.current.onopen = () => {
      wsRef.current?.send(JSON.stringify({
        type: 'subscribe',
        symbol: symbol
      }))
    }

    wsRef.current.onmessage = (event) => {
      const update = JSON.parse(event.data)
      const chart = chartRef.current?.getChart()

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

    return () => {
      wsRef.current?.close()
    }
  }, [symbol])

  return <TradeXChart ref={chartRef} symbol={symbol} data={data} />
}
```

## API Routes

### App Router API Route

```typescript
// app/api/ohlcv/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const symbol = searchParams.get('symbol') || 'BTCUSDT'
  const timeframe = searchParams.get('timeframe') || '1h'

  try {
    // Fetch from external API
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=500`
    )
    const data = await response.json()

    // Transform to OHLCV format
    const ohlcv = data.map((candle: any[]) => [
      candle[0], // timestamp
      parseFloat(candle[1]), // open
      parseFloat(candle[2]), // high
      parseFloat(candle[3]), // low
      parseFloat(candle[4]), // close
      parseFloat(candle[5])  // volume
    ])

    return NextResponse.json(ohlcv)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

### Pages Router API Route

```typescript
// pages/api/ohlcv.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol = 'BTCUSDT', timeframe = '1h' } = req.query

  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=500`
    )
    const data = await response.json()

    const ohlcv = data.map((candle: any[]) => [
      candle[0],
      parseFloat(candle[1]),
      parseFloat(candle[2]),
      parseFloat(candle[3]),
      parseFloat(candle[4]),
      parseFloat(candle[5])
    ])

    res.status(200).json(ohlcv)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
```

## State Management

### Using Context API

```tsx
// context/ChartContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ChartContextType {
  symbol: string
  setSymbol: (symbol: string) => void
  data: number[][]
  setData: (data: number[][]) => void
  timeframe: string
  setTimeframe: (timeframe: string) => void
}

const ChartContext = createContext<ChartContextType | undefined>(undefined)

export function ChartProvider({ children }: { children: ReactNode }) {
  const [symbol, setSymbol] = useState('BTC/USDT')
  const [data, setData] = useState<number[][]>([])
  const [timeframe, setTimeframe] = useState('1h')

  return (
    <ChartContext.Provider value={{
      symbol,
      setSymbol,
      data,
      setData,
      timeframe,
      setTimeframe
    }}>
      {children}
    </ChartContext.Provider>
  )
}

export function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within ChartProvider')
  }
  return context
}
```

### Using in Layout

```tsx
// app/layout.tsx
import { ChartProvider } from '@/context/ChartContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChartProvider>
          {children}
        </ChartProvider>
      </body>
    </html>
  )
}
```

## Middleware for Authentication

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication for trading pages
  if (request.nextUrl.pathname.startsWith('/trading')) {
    const token = request.cookies.get('auth-token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/trading/:path*',
}
```

## Static Generation

### App Router Static Page

```tsx
// app/chart/[symbol]/page.tsx
import TradingChart from '@/components/TradingChart'

interface Props {
  params: { symbol: string }
}

export async function generateStaticParams() {
  return [
    { symbol: 'BTCUSDT' },
    { symbol: 'ETHUSDT' },
    { symbol: 'BNBUSDT' }
  ]
}

export default async function ChartPage({ params }: Props) {
  const res = await fetch(
    `https://api.example.com/ohlcv?symbol=${params.symbol}`,
    { next: { revalidate: 60 } } // Revalidate every 60 seconds
  )
  const data = await res.json()

  return (
    <main>
      <h1>{params.symbol}</h1>
      <TradingChart symbol={params.symbol} data={data} />
    </main>
  )
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://api.example.com/ws
API_KEY=your-secret-key
```

```typescript
// Using environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const wsUrl = process.env.NEXT_PUBLIC_WS_URL
```

## Common Patterns

### Loading States

```tsx
'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const TradeXChart = dynamic(
  () => import('./TradeXChart'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }
)

export default function ChartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TradeXChart symbol="BTC/USDT" data={[]} />
    </Suspense>
  )
}
```

### Error Boundaries

```tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ChartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-bold">Chart Error</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

## Troubleshooting

### SSR Issues

Always use dynamic import with `ssr: false`:

```tsx
const TradingChart = dynamic(
  () => import('./TradingChart'),
  { ssr: false }
)
```

### Window is not defined

Ensure client-side only code:

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Chart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <div>Chart content</div>
}
```

## Related Documentation

- [Getting Started](../../reference/01_getting_started) - Basic setup
- [Configuration](../../reference/02_configuration) - Chart configuration
- [WebSocket Integration](../backend/websocket-integration) - Real-time data
- [API Reference](../../api/core) - Complete API
- [React Integration](react-integration) - React guide