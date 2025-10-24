---
title: GraphQL Integration
description: Fetching chart data using GraphQL APIs
---

# GraphQL Integration

Learn how to integrate TradeX Chart with GraphQL backends for flexible and efficient data fetching.

## Overview

GraphQL provides several advantages for chart data:
- **Precise data fetching** - Request only the fields you need
- **Single endpoint** - No need for multiple REST endpoints
- **Type safety** - Strong typing with schema validation
- **Real-time updates** - Built-in subscription support
- **Efficient batching** - Combine multiple queries

## Basic GraphQL Query

### 1. Simple Fetch with Fetch API

```javascript
const query = `
  query GetOHLCV($symbol: String!, $timeframe: String!, $limit: Int!) {
    ohlcv(symbol: $symbol, timeframe: $timeframe, limit: $limit) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`

async function fetchChartData(symbol, timeframe, limit = 500) {
  const response = await fetch('https://api.example.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      query,
      variables: { symbol, timeframe, limit }
    })
  })
  
  const { data, errors } = await response.json()
  
  if (errors) {
    throw new Error(errors[0].message)
  }
  
  // Transform to TradeX format [timestamp, open, high, low, close, volume]
  return data.ohlcv.map(candle => [
    candle.timestamp,
    candle.open,
    candle.high,
    candle.low,
    candle.close,
    candle.volume
  ])
}

// Usage
const ohlcv = await fetchChartData('BTCUSDT', '1h', 500)

const chart = document.createElement('tradex-chart')
document.getElementById('chart').appendChild(chart)

chart.start({
  title: 'BTC/USDT',
  state: { ohlcv }
})
```

### 2. With Error Handling

```javascript
class GraphQLClient {
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }
  
  async query(query, variables = {}) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query, variables })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.errors) {
        throw new Error(
          result.errors.map(e => e.message).join(', ')
        )
      }
      
      return result.data
    } catch (error) {
      console.error('GraphQL query failed:', error)
      throw error
    }
  }
}

// Usage
const client = new GraphQLClient('https://api.example.com/graphql', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})

const query = `
  query GetOHLCV($symbol: String!, $limit: Int!) {
    ohlcv(symbol: $symbol, limit: $limit) {
      timestamp open high low close volume
    }
  }
`

const data = await client.query(query, {
  symbol: 'BTCUSDT',
  limit: 500
})
```

## Apollo Client Integration

### 1. Setup Apollo Client

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Bearer YOUR_API_KEY'
  }
})
```

### 2. Query with Apollo

```javascript
const GET_OHLCV = gql`
  query GetOHLCV($symbol: String!, $timeframe: String!, $limit: Int!) {
    ohlcv(symbol: $symbol, timeframe: $timeframe, limit: $limit) {
      timestamp
      open
      high
      low
      close
      volume
    }
  }
`

async function loadChart(symbol, timeframe) {
  try {
    const { data, loading, error } = await client.query({
      query: GET_OHLCV,
      variables: {
        symbol,
        timeframe,
        limit: 500
      }
    })
    
    if (error) throw error
    
    const ohlcv = data.ohlcv.map(candle => [
      candle.timestamp,
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volume
    ])
    
    chart.start({
      title: symbol,
      state: { ohlcv }
    })
  } catch (error) {
    console.error('Failed to load chart:', error)
  }
}
```

### 3. Pagination with Apollo

```javascript
const GET_OHLCV_PAGINATED = gql`
  query GetOHLCVPaginated(
    $symbol: String!
    $timeframe: String!
    $limit: Int!
    $before: Int
  ) {
    ohlcv(
      symbol: $symbol
      timeframe: $timeframe
      limit: $limit
      before: $before
    ) {
      data {
        timestamp
        open
        high
        low
        close
        volume
      }
      pageInfo {
        hasMore
        oldestTimestamp
      }
    }
  }
`

class PaginatedChartLoader {
  constructor(client, chart) {
    this.client = client
    this.chart = chart
    this.hasMore = true
    this.isLoading = false
  }
  
  async loadInitial(symbol, timeframe) {
    const { data } = await this.client.query({
      query: GET_OHLCV_PAGINATED,
      variables: {
        symbol,
        timeframe,
        limit: 500
      }
    })
    
    this.hasMore = data.ohlcv.pageInfo.hasMore
    this.oldestTimestamp = data.ohlcv.pageInfo.oldestTimestamp
    
    const ohlcv = this.formatData(data.ohlcv.data)
    
    this.chart.start({
      title: symbol,
      state: { ohlcv }
    })
    
    this.setupScrollListener(symbol, timeframe)
  }
  
  async loadMore(symbol, timeframe) {
    if (!this.hasMore || this.isLoading) return
    
    this.isLoading = true
    
    try {
      const { data } = await this.client.query({
        query: GET_OHLCV_PAGINATED,
        variables: {
          symbol,
          timeframe,
          limit: 100,
          before: this.oldestTimestamp
        },
        fetchPolicy: 'network-only'
      })
      
      this.hasMore = data.ohlcv.pageInfo.hasMore
      this.oldestTimestamp = data.ohlcv.pageInfo.oldestTimestamp
      
      const ohlcv = this.formatData(data.ohlcv.data)
      this.chart.mergeData(ohlcv, 'prepend')
      
    } finally {
      this.isLoading = false
    }
  }
  
  formatData(data) {
    return data.map(candle => [
      candle.timestamp,
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volume
    ])
  }
  
  setupScrollListener(symbol, timeframe) {
    this.chart.on('chart_pan', (event) => {
      if (this.chart.scrollPos < 100) {
        this.loadMore(symbol, timeframe)
      }
    })
  }
}

// Usage
const loader = new PaginatedChartLoader(client, chart)
await loader.loadInitial('BTCUSDT', '1h')
```

## GraphQL Subscriptions

### 1. Real-time Updates with Subscriptions

```javascript
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: 'https://api.example.com/graphql'
})

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://api.example.com/graphql'
  })
)

// Split based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
```

### 2. Subscribe to Candle Updates

```javascript
const CANDLE_SUBSCRIPTION = gql`
  subscription OnCandleUpdate($symbol: String!, $timeframe: String!) {
    candleUpdated(symbol: $symbol, timeframe: $timeframe) {
      timestamp
      open
      high
      low
      close
      volume
      isClosed
    }
  }
`

class RealtimeChart {
  constructor(client, chart) {
    this.client = client
    this.chart = chart
    this.subscription = null
  }
  
  subscribe(symbol, timeframe) {
    this.subscription = this.client
      .subscribe({
        query: CANDLE_SUBSCRIPTION,
        variables: { symbol, timeframe }
      })
      .subscribe({
        next: ({ data }) => {
          this.handleCandleUpdate(data.candleUpdated)
        },
        error: (error) => {
          console.error('Subscription error:', error)
          // Attempt to reconnect
          setTimeout(() => this.subscribe(symbol, timeframe), 5000)
        }
      })
  }
  
  handleCandleUpdate(candle) {
    const formattedCandle = [
      candle.timestamp,
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volume
    ]
    
    if (candle.isClosed) {
      // Candle is complete, add to chart
      this.chart.addCandle(formattedCandle)
    } else {
      // Candle is still forming, update streaming
      this.chart.updateStreamingCandle(formattedCandle)
    }
  }
  
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
  }
}

// Usage
const realtimeChart = new RealtimeChart(client, chart)
realtimeChart.subscribe('BTCUSDT', '1h')

// Cleanup on unmount
// realtimeChart.unsubscribe()
```

## Advanced Patterns

### 1. Batch Multiple Queries

```javascript
const BATCH_QUERY = gql`
  query BatchData($symbols: [String!]!, $timeframe: String!) {
    charts(symbols: $symbols, timeframe: $timeframe) {
      symbol
      ohlcv {
        timestamp
        open
        high
        low
        close
        volume
      }
    }
  }
`

async function loadMultipleCharts(symbols, timeframe) {
  const { data } = await client.query({
    query: BATCH_QUERY,
    variables: { symbols, timeframe }
  })
  
  const charts = {}
  
  data.charts.forEach(chartData => {
    const ohlcv = chartData.ohlcv.map(c => [
      c.timestamp, c.open, c.high, c.low, c.close, c.volume
    ])
    
    const chart = document.createElement('tradex-chart')
    document.getElementById(`chart-${chartData.symbol}`).appendChild(chart)
    
    chart.start({
      title: chartData.symbol,
      state: { ohlcv }
    })
    
    charts[chartData.symbol] = chart
  })
  
  return charts
}

// Load multiple charts at once
const charts = await loadMultipleCharts(
  ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'],
  '1h'
)
```

### 2. Fragments for Reusability

```javascript
const CANDLE_FRAGMENT = gql`
  fragment CandleFields on Candle {
    timestamp
    open
    high
    low
    close
    volume
  }
`

const GET_CHART_DATA = gql`
  ${CANDLE_FRAGMENT}
  query GetChartData($symbol: String!, $timeframe: String!) {
    chart(symbol: $symbol, timeframe: $timeframe) {
      symbol
      timeframe
      candles {
        ...CandleFields
      }
      indicators {
        name
        values
      }
    }
  }
`

const GET_HISTORICAL = gql`
  ${CANDLE_FRAGMENT}
  query GetHistorical($symbol: String!, $start: Int!, $end: Int!) {
    historical(symbol: $symbol, start: $start, end: $end) {
      ...CandleFields
    }
  }
`
```

### 3. Optimistic Updates

```javascript
const ADD_DRAWING = gql`
  mutation AddDrawing($chartId: ID!, $drawing: DrawingInput!) {
    addDrawing(chartId: $chartId, drawing: $drawing) {
      id
      type
      coordinates
      style
    }
  }
`

async function addDrawing(chartId, drawing) {
  await client.mutate({
    mutation: ADD_DRAWING,
    variables: { chartId, drawing },
    optimisticResponse: {
      addDrawing: {
        __typename: 'Drawing',
        id: 'temp-' + Date.now(),
        ...drawing
      }
    },
    update: (cache, { data: { addDrawing } }) => {
      // Update cache immediately
      const existing = cache.readQuery({
        query: GET_DRAWINGS,
        variables: { chartId }
      })
      
      cache.writeQuery({
        query: GET_DRAWINGS,
        variables: { chartId },
        data: {
          drawings: [...existing.drawings, addDrawing]
        }
      })
    }
  })
}
```

## Error Handling

### 1. Comprehensive Error Handler

```javascript
class GraphQLErrorHandler {
  handleError(error) {
    if (error.networkError) {
      this.handleNetworkError(error.networkError)
    }
    
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach(err => {
        this.handleGraphQLError(err)
      })
    }
  }
  
  handleNetworkError(error) {
    console.error('Network error:', error)
    
    if (error.statusCode === 401) {
      // Handle authentication error
      this.refreshToken()
    } else if (error.statusCode === 429) {
      // Handle rate limiting
      this.handleRateLimit()
    } else {
      // Show generic error to user
      this.showError('Network connection failed')
    }
  }
  
  handleGraphQLError(error) {
    console.error('GraphQL error:', error)
    
    switch (error.extensions?.code) {
      case 'UNAUTHENTICATED':
        this.redirectToLogin()
        break
      case 'FORBIDDEN':
        this.showError('You do not have permission')
        break
      case 'BAD_USER_INPUT':
        this.showError('Invalid input: ' + error.message)
        break
      default:
        this.showError(error.message)
    }
  }
  
  showError(message) {
    // Display error to user
    console.error(message)
  }
  
  async refreshToken() {
    // Implement token refresh logic
  }
  
  handleRateLimit() {
    // Implement backoff strategy
  }
  
  redirectToLogin() {
    // Redirect to login page
  }
}

const errorHandler = new GraphQLErrorHandler()

// Use with queries
try {
  const { data } = await client.query({ query: GET_OHLCV })
} catch (error) {
  errorHandler.handleError(error)
}
```

## Complete Example

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Chart } from 'tradex-chart'

class GraphQLChartApp {
  constructor(endpoint) {
    this.client = new ApolloClient({
      uri: endpoint,
      cache: new InMemoryCache()
    })
    
    this.chart = null
    this.subscription = null
  }
  
  async initialize(symbol, timeframe) {
    // Load initial data
    const ohlcv = await this.fetchInitialData(symbol, timeframe)
    
    // Create chart
    this.chart = document.createElement('tradex-chart')
    document.getElementById('chart').appendChild(this.chart)
    
    this.chart.start({
      title: symbol,
      state: { ohlcv }
    })
    
    // Subscribe to real-time updates
    this.subscribeToUpdates(symbol, timeframe)
  }
  
  async fetchInitialData(symbol, timeframe) {
    const query = gql`
      query GetOHLCV($symbol: String!, $timeframe: String!, $limit: Int!) {
        ohlcv(symbol: $symbol, timeframe: $timeframe, limit: $limit) {
          timestamp open high low close volume
        }
      }
    `
    
    const { data } = await this.client.query({
      query,
      variables: { symbol, timeframe, limit: 500 }
    })
    
    return data.ohlcv.map(c => [
      c.timestamp, c.open, c.high, c.low, c.close, c.volume
    ])
  }
  
  subscribeToUpdates(symbol, timeframe) {
    const subscription = gql`
      subscription OnCandleUpdate($symbol: String!, $timeframe: String!) {
        candleUpdated(symbol: $symbol, timeframe: $timeframe) {
          timestamp open high low close volume isClosed
        }
      }
    `
    
    this.subscription = this.client
      .subscribe({
        query: subscription,
        variables: { symbol, timeframe }
      })
      .subscribe({
        next: ({ data }) => {
          const candle = data.candleUpdated
          const formatted = [
            candle.timestamp,
            candle.open,
            candle.high,
            candle.low,
            candle.close,
            candle.volume
          ]
          
          if (candle.isClosed) {
            this.chart.addCandle(formatted)
          } else {
            this.chart.updateStreamingCandle(formatted)
          }
        },
        error: (error) => console.error('Subscription error:', error)
      })
  }
  
  destroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

// Usage
const app = new GraphQLChartApp('https://api.example.com/graphql')
await app.initialize('BTCUSDT', '1h')
```

## Best Practices

### 1. Use Persisted Queries

```javascript
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
  link: createPersistedQueryLink().concat(httpLink)
})
```

### 2. Implement Query Batching

```javascript
import { BatchHttpLink } from '@apollo/client/link/batch-http'

const link = new BatchHttpLink({
  uri: 'https://api.example.com/graphql',
  batchMax: 5,
  batchInterval: 20
})
```

### 3. Cache Management

```javascript
// Cache first, then network
const { data } = await client.query({
  query: GET_OHLCV,
  fetchPolicy: 'cache-first'
})

// Network only for real-time data
const { data } = await client.query({
  query: GET_LATEST,
  fetchPolicy: 'network-only'
})
```

## Related Documentation

- [REST API Integration](rest-api-integration) - Alternative API approach
- [WebSocket Integration](websocket-integration) - Direct WebSocket connections
- [Data Caching](data-caching-strategies) - Optimize data fetching
- [State Management](../../reference/state) - Chart state handling