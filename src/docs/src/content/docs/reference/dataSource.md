---
title: Data Source
description: Managing data flow for TradeX charts
---

# DataSource

The `DataSource` class manages data flow for TradeX charts in an agnostic manner, implementing a pull-based architecture where charts request data rather than having data pushed to them.

## Overview

DataSource handles:
- Symbol and timeframe management
- Real-time ticker streams
- Historical data fetching
- State management across different chart configurations
- Data source registry and lifecycle management

## Static Properties

### Time Constants

```javascript
export const SECOND_MS = 1000
export const MINUTE_MS = SECOND_MS * 60
export const HOUR_MS = MINUTE_MS * 60
export const DAY_MS = HOUR_MS * 24
export const WEEK_MS = DAY_MS * 7
export const MONTHR_MS = DAY_MS * 30
export const YEAR_MS = DAY_MS * 365
```

### Default Time Frames

```javascript
static get defaultTimeFrames()
```

Returns the default supported timeframes:
- Minutes: 1m, 2m, 3m, 5m, 10m, 15m, 30m
- Hours: 1h, 2h, 3h, 4h
- Days: 1d
- Weeks: 1w
- Months: 1M, 3M, 6M
- Years: 1y

## Static Methods

### create(cfg, state)

Creates a new DataSource instance and registers it.

**Parameters:**
- `cfg` (Object) - Configuration object
  - `symbol` (String) - Trading pair symbol (e.g., "BTC/USDT")
  - `timeFrames` (Array<Number>) - Supported timeframes in milliseconds
  - `timeFrameInit` (Number) - Initial timeframe
  - `ticker` (Object) - Ticker stream configuration
  - `history` (Object) - Historical data configuration
- `state` (State) - Chart state instance

**Returns:** `DataSource` instance or `undefined` if creation fails

### delete(key), has(key), get(key)

Registry management methods for DataSource instances.

### list(chart)

Lists all registered data sources for a given chart.

**Parameters:**
- `chart` (TradeXchart) - Target chart instance

**Returns:** `Array<DataSource>` or `undefined`

## Constructor

```javascript
constructor(cfg, state)
```

Creates a DataSource instance for a specific symbol and state.

**Parameters:**
- `cfg` (Object) - Configuration object
  - `source` (Object) - Exchange or data provider configuration
  - `symbol` (String) - Trading pair symbol
  - `symbols` (Object) - List of symbols and their data
  - `timeFrames` (Array<Number>) - Supported timeframes
  - `timeFrameInit` (Number) - Initial timeframe
  - `ticker` (Ticker) - Ticker stream handler
  - `history` (History) - Historical data handler
  - `initialRange` (Object) - Initial chart range configuration
- `state` (State) - Chart state instance

## Properties

### Getters

- `id` - Unique DataSource identifier
- `cfg` - Configuration object
- `state` - Associated chart state
- `source` - Data source configuration
- `stream` - Stream handler instance
- `symbol` - Current trading symbol
- `timeFrame` / `timeFrameMS` - Current timeframe in milliseconds
- `timeFrameStr` - Current timeframe as string (e.g., "1h")
- `timeFrames` - Available timeframes
- `range` - Chart range handler

### Setters

- `timeFrame` - Sets the current timeframe

## Core Methods

### Symbol Management

#### symbolSet(symbol)

Sets the trading symbol for the data source.

#### symbolsAdd(symbols)

Adds multiple symbols to the data source.

### Time Frame Management

#### timeFrameUse(tf)

Sets the chart timeframe and manages state transitions.

**Parameters:**
- `tf` (Number|String) - Timeframe in milliseconds or string format (e.g., "1h")

#### timeFrameValidate(tf)

Validates a timeframe value.

**Parameters:**
- `tf` (Number|String) - Timeframe to validate

**Returns:** `Number` - Validated timeframe in milliseconds, or `undefined` if invalid

#### timeFrameExists(tf)

Checks if a timeframe is supported.

**Parameters:**
- `tf` (Number|String) - Timeframe to check

**Returns:** `Number` - Timeframe in milliseconds if exists, `undefined` otherwise

### Ticker Stream Management

#### tickerAdd(ticker, begin)

Adds a ticker stream to the chart.

**Parameters:**
- `ticker` (Object) - Ticker stream definition
  - `start` (Function) - Function to start the stream
  - `stop` (Function) - Function to stop the stream
- `begin` (Object) - Optional auto-start configuration
  - `symbol` (String) - Ticker symbol
  - `tf` (Number) - Timeframe in milliseconds

#### tickerStart(symbol, tf)

Starts the ticker stream for a specific symbol and timeframe.

**Parameters:**
- `symbol` (String) - Trading symbol
- `tf` (Number|String) - Timeframe

**Returns:** `Boolean` - Success status

#### tickerStop()

Stops the current ticker stream.

### Historical Data Management

#### historyAdd(history)

Adds historical data fetching functions.

**Parameters:**
- `history` (Object) - History configuration
  - `rangeLimitPast` (Function) - Fetch function for past data
  - `rangeLimitFuture` (Function) - Fetch function for future data

Both functions must accept 4 parameters and return a Promise.

#### startTickerHistory(config)

Starts both ticker stream and loads initial historical data.

**Parameters:**
- `config` (Object) - Combined configuration
  - `rangeLimitPast` (Function) - Historical data fetch function
  - `rangeLimitFuture` (Function) - Future data fetch function (optional)
  - `start` (Function) - Ticker start function
  - `stop` (Function) - Ticker stop function
  - `symbol` (String) - Trading symbol
  - `tf` (Number) - Timeframe in milliseconds

**Returns:** `Boolean` - Success status

#### onRangeLimit(event, fn, timestamp)

Executes data fetching when chart range limits are reached.

**Parameters:**
- `event` - Range limit event
- `fn` (Function) - Fetch function to execute
- `timestamp` (Number) - Unix timestamp in milliseconds

## State Management

#### findMatchingState(source, symbol, timeFrame)

Finds existing states that match the given criteria.

**Parameters:**
- `source` (String) - Data source name (optional, defaults to current)
- `symbol` (String) - Trading symbol (optional, defaults to current)
- `timeFrame` (Number) - Timeframe (optional, defaults to current)

**Returns:** `State|Object|undefined` - Exact match, closest matches, or undefined

## Usage Example

```javascript
import DataSource from './dataSource.js';

// Create a data source
const config = {
  symbol: 'BTC/USDT',
  timeFrameInit: 3600000, // 1 hour
  source: {
    name: 'binance',
    rangeLimitPast: async (event, symbol, tf, timestamp) => {
      // Fetch historical data
      return await fetchHistoricalData(symbol, tf, timestamp);
    }
  }
};

const dataSource = DataSource.create(config, chartState);

// Start real-time data
dataSource.startTickerHistory({
  symbol: 'BTC/USDT',
  tf: 3600000,
  rangeLimitPast: fetchHistoricalData,
  start: startTickerStream,
  stop: stopTickerStream
});
```

## Error Handling

The DataSource class includes comprehensive error handling:
- Parameter validation for all public methods
- Promise rejection handling for async operations
- Graceful fallbacks for missing configurations
- Detailed error messages with context information

## Events

DataSource integrates with the chart's event system:
- `range_limitPast` - Triggered when more historical data is needed
- `range_limitFuture` - Triggered when future data is requested
- `stream_candleFirst` - Triggered when first real-time candle arrives

## Internal Architecture

### Private Properties

The DataSource class uses private fields to encapsulate internal state:

- `#cnt` - Instance counter
- `#id` - Unique identifier
- `#core` - Reference to TradeXchart core
- `#cfg` - Configuration object
- `#source` - Data source configuration
- `#symbol` - Current trading symbol
- `#state` - Associated chart state
- `#range` - Range management instance
- `#stream` - Stream handler
- `#timeFrames` - Available timeframes map
- `#timeFrameCurr` - Current active timeframe
- `#waiting` - Flag for pending data requests
- `#fetching` - Flag for active fetch operations

### Static Registry

DataSource maintains static registries for tracking instances:

```javascript
static #chartList = new xMap()    // Chart to DataSource mapping
static #sourceList = new xMap()   // DataSource to State mapping
static #sourceCnt = 0             // Global instance counter
```

## Advanced Features

### Multi-State Management

DataSource can manage multiple chart states for the same symbol with different timeframes:

```javascript
// Switch between timeframes
dataSource.timeFrame = '5m';  // Automatically manages state transitions
dataSource.timeFrame = '1h';  // Creates new state or switches to existing one
```

### Stream Integration

The DataSource integrates with the Stream class for real-time data:

```javascript
// Stream lifecycle management
this.#stream.start();           // Start processing real-time data
this.#stream.onTick(tickData);  // Process incoming tick data
this.#stream.stop();            // Stop stream processing
```

### Range-Based Data Loading

Automatic data loading based on chart viewport:

```javascript
// Past data loading
core.on('range_limitPast', (event) => {
  // Automatically triggered when user scrolls to chart beginning
  return fetchHistoricalData(symbol, timeframe, event.startTS);
});

// Future data loading  
core.on('range_limitFuture', (event) => {
  // Triggered when scrolling beyond available data
  return fetchFutureData(symbol, timeframe, event.endTS);
});
```

## Data Flow Architecture

### Pull-Based Design

Unlike traditional push-based systems, DataSource implements a pull architecture:

1. **Chart Request**: Chart requests data for specific range/timeframe
2. **DataSource Evaluation**: DataSource checks cache and determines data needs
3. **Data Fetching**: External data sources are queried as needed
4. **State Update**: Retrieved data is merged into appropriate chart state
5. **Chart Notification**: Chart is notified of data availability

### State Synchronization

```javascript
// Automatic state management
const matchingState = dataSource.findMatchingState('binance', 'BTC/USDT', '1h');

if (matchingState instanceof State) {
  // Switch to existing state
  this.#state.use(matchingState.key);
} else {
  // Create new state with current configuration
  const newStateDef = {
    dataSource: doStructuredClone(this.#state.dataSource)
  };
  this.#state.use(newStateDef);
}
```

## Configuration Options

### Source Configuration

```javascript
const sourceConfig = {
  name: 'binance',                    // Data provider identifier
  tickerStream: {
    start: startStreamFunction,       // WebSocket connection starter
    stop: stopStreamFunction          // WebSocket connection closer
  },
  rangeLimitPast: fetchPastData,      // Historical data fetcher
  rangeLimitFuture: fetchFutureData   // Future data fetcher (optional)
};
```

### Symbol Configuration

```javascript
const symbolConfig = {
  symbol: 'BTC/USDT',                 // Primary trading pair
  symbols: {                          // Additional symbol data
    'BTC/USDT': { precision: 8 },
    'ETH/USDT': { precision: 6 }
  }
};
```

### TimeFrame Configuration

```javascript
const timeFrameConfig = {
  timeFrames: [60000, 300000, 3600000], // Custom timeframes in ms
  timeFrameInit: 3600000                 // Initial timeframe
};
```

## Error Scenarios and Handling

### Common Error Cases

1. **Invalid Symbol**: 
   ```javascript
   // Throws error if symbol is invalid or empty
   throwError(this.#core.ID, this.#state.key, 'symbol invalid');
   ```

2. **Invalid TimeFrame**:
   ```javascript
   // Validates timeframe before use
   if (!isInteger(tf)) {
     throwError(this.#core.ID, this.#state.key, 'time frame invalid');
   }
   ```

3. **Function Parameter Mismatch**:
   ```javascript
   // Validates function signatures
   if (rangeLimitPast.length !== 4) {
     consoleError(this.#core, this.#state.key, 
       'rangeLimitPast function requires 4 parameters');
   }
   ```

4. **Promise Rejection Handling**:
   ```javascript
   promise.catch(error => {
     this.#waiting = false;
     this.#core.progress.stop();
     this.#core.error(error);
   });
   ```

### Recovery Mechanisms

- **Automatic Retry**: Failed data requests can be automatically retried
- **Fallback States**: System falls back to previous working state on errors
- **Progress Indicators**: Loading states are properly managed and cleaned up
- **Resource Cleanup**: Streams and event listeners are properly disposed

## Performance Considerations

### Memory Management

```javascript
// Proper cleanup on DataSource deletion
static delete(key) {
  if (key instanceof DataSource) {
    key.historyRemove();    // Remove event listeners
    key.tickerStop();       // Stop streams
    DataSource.#sourceList.delete(key);
  }
}
```

### Efficient State Switching

- States are reused when possible rather than recreated
- Data is shared between compatible states
- Minimal data copying through structured cloning only when necessary

### Stream Optimization

- Single stream per symbol/timeframe combination
- Automatic stream lifecycle management
- Efficient tick data processing through Stream class

## Integration Examples

### Basic Setup

```javascript
import DataSource from './dataSource.js';
import TradeXChart from './core.js';

const chart = new TradeXChart(container, config);
const state = chart.state;

const dataSource = DataSource.create({
  symbol: 'BTC/USDT',
  timeFrameInit: '1h',
  source: {
    name: 'myExchange'
  }
}, state);
```

### Advanced Setup with Custom Data Provider

```javascript
class CustomDataProvider {
  async fetchHistoricalData(symbol, timeframe, timestamp) {
    const response = await fetch(`/api/history/${symbol}/${timeframe}/${timestamp}`);
    return response.json();
  }
  
  startWebSocket(symbol, timeframe, onTick) {
    const ws = new WebSocket(`wss://api.example.com/stream/${symbol}/${timeframe}`);
    ws.onmessage = (event) => onTick(JSON.parse(event.data));
    return ws;
  }
}

const provider = new CustomDataProvider();
const dataSource = DataSource.create({
  symbol: 'BTC/USDT',
  source: {
    name: 'custom',
    rangeLimitPast: provider.fetchHistoricalData.bind(provider),
    tickerStream: {
      start: provider.startWebSocket.bind(provider),
      stop: (ws) => ws.close()
    }
  }
}, state);
```

### Multiple TimeFrame Management

```javascript
// Create data source with multiple timeframes
const dataSource = DataSource.create({
  symbol: 'BTC/USDT',
  timeFrames: ['1m', '5m', '15m', '1h', '4h', '1d'],
  timeFrameInit: '1h'
}, state);

// Switch between timeframes
dataSource.timeFrame = '5m';   // Switches to 5-minute chart
dataSource.timeFrame = '1d';   // Switches to daily chart

// Each timeframe maintains its own state and data
```

## Testing and Debugging

### Debug Information

```javascript
// Enable detailed logging
dataSource.identifyState(); // Logs current state information

// Access internal state for debugging
console.log({
  symbol: dataSource.symbol,
  timeFrame: dataSource.timeFrameStr,
  isWaiting: dataSource.#waiting,    // Note: Private fields not accessible
  stateKey: dataSource.state.key
});
```

### Mock Data Provider for Testing

```javascript
const mockProvider = {
  rangeLimitPast: async (event, symbol, tf, timestamp) => {
    // Return mock historical data
    return {
      chart: {
        data: generateMockCandles(symbol, tf, timestamp, 100)
      }
    };
  },
  
  tickerStream: {
    start: (symbol, tf, onTick) => {
      // Simulate real-time ticks
      const interval = setInterval(() => {
        onTick(generateMockTick(symbol));
      }, 1000);
      return interval;
    },
    stop: (interval) => clearInterval(interval)
  }
};
```

## Migration and Compatibility

### Upgrading from Previous Versions

When upgrading DataSource implementations:

1. **Function Signatures**: Ensure fetch functions accept exactly 4 parameters
2. **Promise Returns**: All async functions must return Promises
3. **Error Handling**: Implement proper error handling in custom providers
4. **State Management**: Update state access patterns for new API

### Backward Compatibility

DataSource maintains backward compatibility through:
- Default value fallbacks for missing configuration
- Automatic timeframe detection from existing data
- Graceful handling of legacy data formats

## Best Practices

### 1. Resource Management
```javascript
// Always clean up resources
dataSource.historyRemove();  // Remove event listeners
dataSource.tickerStop();     // Stop streams
```

### 2. Error Handling
```javascript
// Implement comprehensive error handling
const fetchData = async (event, symbol, tf, timestamp) => {
  try {
    const data = await apiCall(symbol, tf, timestamp);
    return data;
  } catch (error) {
    console.error('Data fetch failed:', error);
    return {}; // Return empty object on failure
  }
};
```

### 3. Performance Optimization
```javascript
// Use appropriate timeframes for data density
const appropriateTimeframes = {
  intraday: ['1m', '5m', '15m', '1h'],
  daily: ['4h', '1d', '1w'],
  longTerm: ['1w', '1M', '3M']
};
```

### 4. State Management
```javascript
// Check for existing states before creating new ones
const existing = dataSource.findMatchingState();
if (existing instanceof State) {
  // Use existing state
  state.use(existing.key);
} else {
  // Create new state only when necessary
  state.use(newStateDefinition);
}
```

## API Reference

### Utility Functions

#### consoleError(core, key, error)
Internal utility for consistent error logging.

**Parameters:**
- `core` - TradeXChart core instance
- `key` - State key for context
- `error` - Error message string

#### throwError(id, key, error)
Internal utility for throwing formatted errors.

**Parameters:**
- `id` - Chart ID
- `key` - State key
- `error` - Error message string

#### buildTimeFrames(timeframes)
Converts array of timeframe milliseconds to timeframe object.

**Parameters:**
- `timeframes` (Array<Number>) - Array of timeframes in milliseconds

**Returns:** `Object` - Timeframe mapping object

#### timeFrame2MS(timeframe)
Converts timeframe string or number to milliseconds.

**Parameters:**
- `timeframe` (String|Number) - Timeframe (e.g., "1h" or 3600000)

**Returns:** `Number` - Timeframe in milliseconds

## Event System Integration

### Core Events

DataSource integrates with the chart's event system to provide seamless data loading:

```javascript
// Range limit events
core.on('range_limitPast', handler);    // Triggered when scrolling to past
core.on('range_limitFuture', handler);  // Triggered when scrolling to future

// Stream events  
core.on('stream_candleFirst', handler); // First real-time candle received
core.on('stream_candleUpdate', handler);// Real-time candle updates
```

### Custom Event Handlers

```javascript
// Example: Custom range limit handler
const customRangeLimitHandler = async (event, symbol, timeframe, timestamp) => {
  // Log the request
  console.log(`Fetching ${symbol} data for ${timeframe}ms from ${timestamp}`);
  
  // Fetch data with retry logic
  let retries = 3;
  while (retries > 0) {
    try {
      const data = await fetchFromAPI(symbol, timeframe, timestamp);
      return {
        chart: { data: data.candles },
        volume: { data: data.volume },
        trades: { data: data.trades }
      };
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
    }
  }
};
```

## Data Formats

### Expected Data Structure

DataSource expects data in specific formats for different chart components:

#### Candle Data Format
```javascript
const candleData = {
  chart: {
    data: [
      [timestamp, open, high, low, close, volume], // OHLCV array format
      [1640995200000, 47000, 48000, 46500, 47500, 1234.56],
      // ... more candles
    ]
  }
};
```

#### Tick Data Format
```javascript
const tickData = {
  timestamp: 1640995200000,
  price: 47500.00,
  volume: 0.5,
  side: 'buy' // or 'sell'
};
```

#### Volume Data Format
```javascript
const volumeData = {
  volume: {
    data: [
      [timestamp, volume, buyVolume, sellVolume],
      [1640995200000, 1234.56, 800.00, 434.56],
      // ... more volume data
    ]
  }
};
```

### Data Validation

DataSource performs automatic validation on incoming data:

```javascript
// Validates candle data structure
const isValidCandle = (candle) => {
  return Array.isArray(candle) && 
         candle.length >= 6 &&
         candle.every(val => typeof val === 'number');
};

// Validates timestamp ordering
const isChronological = (data) => {
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] <= data[i-1][0]) return false;
  }
  return true;
};
```

## WebSocket Integration

### Real-time Data Streaming

DataSource provides a standardized interface for WebSocket connections:

```javascript
class WebSocketProvider {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.connections = new Map();
  }
  
  start(symbol, timeframe, onTick) {
    const key = `${symbol}_${timeframe}`;
    
    if (this.connections.has(key)) {
      this.connections.get(key).close();
    }
    
    const ws = new WebSocket(`${this.baseUrl}/stream/${symbol}/${timeframe}`);
    
    ws.onopen = () => {
      console.log(`WebSocket connected for ${symbol} ${timeframe}`);
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onTick(this.formatTick(data));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log(`WebSocket closed for ${symbol} ${timeframe}`);
      this.connections.delete(key);
    };
    
    this.connections.set(key, ws);
    return ws;
  }
  
  stop(ws) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  }
  
  formatTick(rawData) {
    return {
      timestamp: rawData.t,
      price: parseFloat(rawData.p),
      volume: parseFloat(rawData.v),
      side: rawData.s
    };
  }
}
```

### Connection Management

```javascript
// Automatic reconnection logic
class ReconnectingWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      maxReconnectAttempts: 5,
      reconnectInterval: 1000,
      ...options
    };
    this.reconnectAttempts = 0;
  }
  
  connect(onMessage) {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      console.log('WebSocket connected');
    };
    
    this.ws.onmessage = onMessage;
    
    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.options.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(onMessage);
        }, this.options.reconnectInterval);
      }
    };
  }
}
```

## Caching Strategies

### Memory-Based Caching

```javascript
class DataCache {
  constructor(maxSize = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  get(key) {
    if (this.cache.has(key)) {
      // Move to end (LRU)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }
  
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  generateKey(symbol, timeframe, timestamp) {
    return `${symbol}_${timeframe}_${Math.floor(timestamp / timeframe)}`;
  }
}
```

### Persistent Caching

```javascript
class PersistentCache {
  constructor(dbName = 'TradeXCache') {
    this.dbName = dbName;
    this.initDB();
  }
  
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore('candles', { keyPath: 'key' });
        store.createIndex('symbol', 'symbol', { unique: false });
        store.createIndex('timeframe', 'timeframe', { unique: false });
      };
    });
  }
  
  async store(symbol, timeframe, timestamp, data) {
    const transaction = this.db.transaction(['candles'], 'readwrite');
    const store = transaction.objectStore('candles');
    
    const key = `${symbol}_${timeframe}_${timestamp}`;
    await store.put({
      key,
      symbol,
      timeframe,
      timestamp,
      data,
      cached: Date.now()
    });
  }
  
  async retrieve(symbol, timeframe, startTime, endTime) {
    const transaction = this.db.transaction(['candles'], 'readonly');
    const store = transaction.objectStore('candles');
    
    const results = [];
    const range = IDBKeyRange.bound(
      `${symbol}_${timeframe}_${startTime}`,
      `${symbol}_${timeframe}_${endTime}`
    );
    
    return new Promise((resolve) => {
      store.openCursor(range).onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value.data);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }
}
```

## Advanced Configuration

### Multi-Exchange Setup

```javascript
class MultiExchangeDataSource {
  constructor() {
    this.exchanges = new Map();
    this.primaryExchange = null;
  }
  
  addExchange(name, config) {
    const dataSource = DataSource.create({
      ...config,
      source: { name, ...config.source }
    }, config.state);
    
    this.exchanges.set(name, dataSource);
    
    if (!this.primaryExchange) {
      this.primaryExchange = name;
    }
  }
  
  async fetchFromBestSource(symbol, timeframe, timestamp) {
    const promises = Array.from(this.exchanges.values()).map(ds => 
      ds.source.rangeLimitPast(null, symbol, timeframe, timestamp)
        .catch(error => ({ error, exchange: ds.source.name }))
    );
    
    const results = await Promise.allSettled(promises);
    
    // Return first successful result
    for (const result of results) {
      if (result.status === 'fulfilled' && !result.value.error) {
        return result.value;
      }
    }
    
    throw new Error('All exchanges failed to provide data');
  }
}
```

### Aggregated Data Sources

```javascript
class AggregatedDataSource extends DataSource {
  constructor(sources, aggregationMethod = 'average') {
    super(...arguments);
    this.sources = sources;
    this.aggregationMethod = aggregationMethod;
  }
  
  async fetchAggregatedData(symbol, timeframe, timestamp) {
    const promises = this.sources.map(source => 
      source.rangeLimitPast(null, symbol, timeframe, timestamp)
    );
    
    const results = await Promise.allSettled(promises);
    const validResults = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    if (validResults.length === 0) {
      throw new Error('No valid data sources available');
    }
    
    return this.aggregateData(validResults);
  }
  
  aggregateData(datasets) {
    switch (this.aggregationMethod) {
      case 'average':
        return this.averageData(datasets);
      case 'median':
        return this.medianData(datasets);
      case 'weighted':
        return this.weightedData(datasets);
      default:
        return datasets[0]; // Return first dataset as fallback
    }
  }
  
  averageData(datasets) {
    // Implementation for averaging OHLCV data across sources
    const aggregated = { chart: { data: [] } };
    const maxLength = Math.max(...datasets.map(d => d.chart.data.length));
    
    for (let i = 0; i < maxLength; i++) {
      const candles = datasets
        .map(d => d.chart.data[i])
        .filter(Boolean);
      
      if (candles.length > 0) {
        const avgCandle = [
          candles[0][0], // timestamp (same for all)
          this.average(candles.map(c => c[1])), // open
          Math.max(...candles.map(c => c[2])), // high
          Math.min(...candles.map(c => c[3])), // low
          this.average(candles.map(c => c[4])), // close
          this.sum(candles.map(c => c[5]))     // volume
        ];
        aggregated.chart.data.push(avgCandle);
      }
    }
    
    return aggregated;
  }
  
  average(values) {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  sum(values) {
    return values.reduce((sum, val) => sum + val, 0);
  }
}
```

## Performance Monitoring

### Metrics Collection

````javascript
class DataSourceMetrics {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.metrics = {
      fetchCount: 0,
      fetchTime: [],
      errorCount: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }
  
  wrapFetchFunction(originalFetch) {
    return async (...args) => {
      const startTime = performance.now();
      this.metrics.fetchCount++;
      
      try {
        const result = await originalFetch.apply(this.dataSource, args);
        const endTime = performance.now();
        this.metrics.fetchTime.push(endTime - startTime);
        return result;
      } catch (error) {
        this.metrics.errorCount++;
        throw error;
      }
    };
  }
  
  getAverageResponseTime() {
    if (this.metrics.fetchTime.length === 0) return 0;
    return this.metrics.fetchTime.reduce((sum, time) => sum + time, 0) / 
           this.metrics.fetchTime.length;
  }
  
  getErrorRate() {
    if (this.metrics.fetchCount === 0) return 0;
    return this.metrics.errorCount / this.metrics.fetchCount;
  }
  
  getCacheHitRate() {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    if (total === 0) return 0;
    return this.metrics.cacheHits / total;
  }
  
  generateReport() {
    return {
      totalFetches: this.metrics.fetchCount,
      averageResponseTime: this.getAverageResponseTime(),
      errorRate: this.getErrorRate(),
      cacheHitRate: this.getCacheHitRate(),
      totalErrors: this.metrics.errorCount
    };
  }
  
  reset() {
    this.metrics = {
      fetchCount: 0,
      fetchTime: [],
      errorCount: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }
}
```

### Performance Optimization Techniques

```javascript
class OptimizedDataSource extends DataSource {
  constructor(cfg, state) {
    super(cfg, state);
    this.requestQueue = [];
    this.processingQueue = false;
    this.batchSize = 10;
    this.batchTimeout = 100; // ms
  }
  
  // Batch multiple requests together
  async batchRequest(symbol, timeframe, timestamp) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ symbol, timeframe, timestamp, resolve, reject });
      
      if (!this.processingQueue) {
        this.processingQueue = true;
        setTimeout(() => this.processBatch(), this.batchTimeout);
      }
    });
  }
  
  async processBatch() {
    const batch = this.requestQueue.splice(0, this.batchSize);
    this.processingQueue = false;
    
    if (batch.length === 0) return;
    
    try {
      // Group requests by symbol and timeframe
      const grouped = batch.reduce((acc, req) => {
        const key = `${req.symbol}_${req.timeframe}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(req);
        return acc;
      }, {});
      
      // Process each group
      for (const [key, requests] of Object.entries(grouped)) {
        const [symbol, timeframe] = key.split('_');
        const timestamps = requests.map(r => r.timestamp);
        const minTime = Math.min(...timestamps);
        const maxTime = Math.max(...timestamps);
        
        // Fetch data for the entire range
        const data = await this.fetchRange(symbol, parseInt(timeframe), minTime, maxTime);
        
        // Distribute results to individual requests
        requests.forEach(req => {
          const relevantData = this.extractRelevantData(data, req.timestamp);
          req.resolve(relevantData);
        });
      }
    } catch (error) {
      // Reject all requests in the batch
      batch.forEach(req => req.reject(error));
    }
    
    // Process remaining queue if any
    if (this.requestQueue.length > 0) {
      this.processingQueue = true;
      setTimeout(() => this.processBatch(), this.batchTimeout);
    }
  }
  
  // Prefetch data based on user behavior
  async prefetchData(symbol, timeframe, currentTimestamp) {
    const prefetchAmount = 100; // Number of candles to prefetch
    const timeframeDuration = parseInt(timeframe);
    const futureTimestamp = currentTimestamp + (prefetchAmount * timeframeDuration);
    
    // Prefetch in background without blocking
    this.fetchRange(symbol, timeframe, currentTimestamp, futureTimestamp)
      .catch(error => console.warn('Prefetch failed:', error));
  }
}
```

## Security Considerations

### API Key Management

```javascript
class SecureDataSource extends DataSource {
  constructor(cfg, state) {
    super(cfg, state);
    this.apiKeys = new Map();
    this.rateLimiter = new RateLimiter();
  }
  
  setApiKey(exchange, apiKey, secret) {
    // Store encrypted credentials
    this.apiKeys.set(exchange, {
      key: this.encrypt(apiKey),
      secret: this.encrypt(secret),
      timestamp: Date.now()
    });
  }
  
  encrypt(data) {
    // Use Web Crypto API for encryption
    // Implementation depends on your security requirements
    return btoa(data); // Simple base64 for example
  }
  
  decrypt(encryptedData) {
    return atob(encryptedData);
  }
  
  async authenticatedRequest(exchange, endpoint, params) {
    const credentials = this.apiKeys.get(exchange);
    if (!credentials) {
      throw new Error(`No credentials found for exchange: ${exchange}`);
    }
    
    // Check rate limits
    if (!this.rateLimiter.canMakeRequest(exchange)) {
      throw new Error(`Rate limit exceeded for ${exchange}`);
    }
    
    const apiKey = this.decrypt(credentials.key);
    const secret = this.decrypt(credentials.secret);
    
    // Create authenticated request
    const signature = this.createSignature(params, secret);
    
    return fetch(endpoint, {
      headers: {
        'X-API-Key': apiKey,
        'X-Signature': signature,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  }
  
  createSignature(params, secret) {
    // Implementation depends on exchange requirements
    const queryString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    // Use HMAC-SHA256 or similar
    return this.hmacSha256(queryString, secret);
  }
}
```

### Rate Limiting

```javascript
class RateLimiter {
  constructor() {
    this.limits = new Map();
    this.requests = new Map();
  }
  
  setLimit(exchange, requestsPerSecond) {
    this.limits.set(exchange, {
      requests: requestsPerSecond,
      window: 1000 // 1 second
    });
  }
  
  canMakeRequest(exchange) {
    const limit = this.limits.get(exchange);
    if (!limit) return true;
    
    const now = Date.now();
    const requests = this.requests.get(exchange) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < limit.window);
    
    if (validRequests.length >= limit.requests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(exchange, validRequests);
    
    return true;
  }
  
  getWaitTime(exchange) {
    const limit = this.limits.get(exchange);
    const requests = this.requests.get(exchange) || [];
    
    if (requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...requests);
    const waitTime = limit.window - (Date.now() - oldestRequest);
    
    return Math.max(0, waitTime);
  }
}
```

## Testing Framework

### Unit Tests

```javascript
// Example test suite for DataSource
describe('DataSource', () => {
  let mockCore, mockState, dataSource;
  
  beforeEach(() => {
    mockCore = {
      id: 'test-chart',
      config: { symbol: 'BTC/USDT' },
      on: jest.fn(),
      off: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      progress: { start: jest.fn(), stop: jest.fn() }
    };
    
    mockState = {
      core: mockCore,
      key: 'test-state',
      isEmpty: false,
      isActive: true,
      mergeData: jest.fn(),
      use: jest.fn(),
      list: jest.fn(() => [])
    };
    
    dataSource = DataSource.create({
      symbol: 'BTC/USDT',
      timeFrameInit: 3600000
    }, mockState);
  });
  
  afterEach(() => {
    if (dataSource) {
      DataSource.delete(dataSource);
    }
  });
  
  describe('constructor', () => {
    it('should create a valid DataSource instance', () => {
      expect(dataSource).toBeInstanceOf(DataSource);
      expect(dataSource.symbol).toBe('BTC/USDT');
      expect(dataSource.timeFrameMS).toBe(3600000);
    });
    
    it('should generate unique ID', () => {
      const dataSource2 = DataSource.create({
        symbol: 'ETH/USDT',
        timeFrameInit: 3600000
      }, mockState);
      
      expect(dataSource.id).not.toBe(dataSource2.id);
      DataSource.delete(dataSource2);
    });
  });
  
  describe('timeFrame management', () => {
    it('should validate timeframes correctly', () => {
      expect(dataSource.timeFrameValidate(3600000)).toBe(3600000);
      expect(dataSource.timeFrameValidate('1h')).toBe(3600000);
      expect(() => dataSource.timeFrameValidate('invalid')).toThrow();
    });
    
    it('should switch timeframes', () => {
      dataSource.timeFrame = '5m';
      expect(dataSource.timeFrameMS).toBe(300000);
      expect(dataSource.timeFrameStr).toBe('5m');
    });
  });
  
  describe('ticker stream', () => {
    it('should start ticker stream successfully', () => {
      const mockStart = jest.fn();
      const mockStop = jest.fn();
      
      dataSource.tickerAdd({
        start: mockStart,
        stop: mockStop
      });
      
      const result = dataSource.tickerStart('BTC/USDT', 3600000);
      expect(result).toBe(true);
      expect(mockStart).toHaveBeenCalledWith('BTC/USDT', 3600000, expect.any(Function));
    });
    
    it('should reject mismatched symbols', () => {
      const result = dataSource.tickerStart('ETH/USDT', 3600000);
      expect(result).toBe(false);
    });
  });
  
  describe('history management', () => {
    it('should add history functions', () => {
      const mockRangeLimitPast = jest.fn(() => Promise.resolve({}));
      
      dataSource.historyAdd({
        rangeLimitPast: mockRangeLimitPast
      });
      
      expect(mockCore.on).toHaveBeenCalledWith(
        'range_limitPast',
        expect.any(Function),
        dataSource
      );
    });
    
    it('should validate function parameters', () => {
      const invalidFunction = () => {}; // 0 parameters instead of 4
      
      dataSource.historyAdd({
        rangeLimitPast: invalidFunction
      });
      
      expect(mockCore.error).toHaveBeenCalled();
    });
  });
});
```

### Integration Tests

```javascript
describe('DataSource Integration', () => {
  let chart, dataSource;
  
  beforeEach(async () => {
    // Create actual chart instance
    chart = new TradeXChart(document.createElement('div'), {
      symbol: 'BTC/USDT'
    });
    
    await chart.ready;
    
    dataSource = DataSource.create({
      symbol: 'BTC/USDT',
      timeFrameInit: '1h',
      source: {
        name: 'test-exchange',
        rangeLimitPast: mockFetchHistoricalData,
        tickerStream: {
          start: mockStartTicker,
          stop: mockStopTicker
        }
      }
    }, chart.state);
  });
  
  afterEach(() => {
    chart.destroy();
  });
  
  it('should load historical data on range limit', async () => {
    // Simulate scrolling to trigger range limit
    chart.emit('range_limitPast', {
      startTS: Date.now() - 86400000 // 1 day ago
    });
    
    // Wait for data to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(chart.state.data.chart.data.length).toBeGreaterThan(0);
  });
  
  it('should handle real-time updates', async () => {
    // Start ticker
    dataSource.tickerStart('BTC/USDT', '1h');
    
    // Simulate tick data
    const mockTick = {
      timestamp: Date.now(),
      price: 50000,
      volume: 1.5
    };
    
    dataSource.stream.onTick(mockTick);
    
    // Verify data was processed
    expect(chart.state.data.chart.data.length).toBeGreaterThan(0);
  });
});

// Mock functions for testing
async function mockFetchHistoricalData(event, symbol, timeframe, timestamp) {
  return {
    chart: {
      data: generateMockCandles(100, timestamp, timeframe)
    }
  };
}

function mockStartTicker(symbol, timeframe, onTick) {
  // Simulate periodic ticks
  const interval = setInterval(() => {
    onTick({
      timestamp: Date.now(),
      price: 50000 + Math.random() * 1000,
      volume: Math.random() * 10
    });
  }, 1000);
  
  return interval;
}

function mockStopTicker(interval) {
  clearInterval(interval);
}

function generateMockCandles(count, startTime, timeframe) {
  const candles = [];
  let time = startTime;
  let price = 50000;
  
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 1000;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    const volume = Math.random() * 100;
    
    candles.push([time, open, high, low, close, volume]);
    
    time += timeframe;
    price = close;
  }
  
  return candles;
}
```

## Troubleshooting Guide

### Common Issues

#### 1. Data Not Loading

**Symptoms:**
- Chart appears empty
- No error messages
- Network requests not being made

**Diagnosis:**
```javascript
// Check DataSource configuration
console.log('DataSource config:', dataSource.cfg);
console.log('Symbol:', dataSource.symbol);
console.log('TimeFrame:', dataSource.timeFrameStr);
console.log('State active:', dataSource.state.isActive);

// Check if history functions are registered
console.log('Range limit handlers:', {
  past: typeof dataSource.source.rangeLimitPast,
  future: typeof dataSource.source.rangeLimitFuture
});
```

**Solutions:**
- Verify symbol and timeframe are valid
- Ensure history fetch functions are properly registered
- Check network connectivity and API endpoints
- Verify state is active and not empty

#### 2. Real-time Updates Not Working

**Symptoms:**
- Historical data loads but no live updates
- WebSocket connection issues
- Ticker stream errors

**Diagnosis:**
```javascript
// Check stream status
console.log('Stream active:', dataSource.stream.isActive);
console.log('Ticker functions:', {
  start: typeof dataSource.source.tickerStream.start,
  stop: typeof dataSource.source.tickerStream.stop
});

// Monitor WebSocket connection
dataSource.source.tickerStream.start = (symbol, tf, onTick) => {
  console.log(`Starting ticker for ${symbol} ${tf}`);
  const ws = new WebSocket(`wss://api.example.com/stream/${symbol}/${tf}`);
  
  ws.onopen = () => console.log('WebSocket connected');
  ws.onclose = () => console.log('WebSocket disconnected');
  ws.onerror = (error) => console.error('WebSocket error:', error);
  ws.onmessage = (event) => {
    console.log('Received tick:', event.data);
    onTick(JSON.parse(event.data));
  };
  
  return ws;
};
```

**Solutions:**
- Verify WebSocket URL and connection parameters
- Check if ticker start/stop functions are properly implemented
- Ensure onTick callback is being called with correct data format
- Verify firewall/proxy settings allow WebSocket connections

#### 3. Memory Leaks

**Symptoms:**
- Browser memory usage increases over time
- Performance degradation
- Browser becomes unresponsive

**Diagnosis:**
```javascript
// Monitor DataSource instances
console.log('Active DataSources:', DataSource.list().length);
console.log('Memory usage:', performance.memory);

// Check for unclosed streams
const activeStreams = Array.from(DataSource.#sourceList.values())
  .filter(ds => ds.stream && ds.stream.isActive);
console.log('Active streams:', activeStreams.length);
```

**Solutions:**
- Always call `DataSource.delete()` when removing charts
- Ensure WebSocket connections are properly closed
- Remove event listeners when switching timeframes
- Implement proper cleanup in custom data providers

#### 4. Performance Issues

**Symptoms:**
- Slow chart rendering
- Delayed data updates
- High CPU usage

**Diagnosis:**
```javascript
// Monitor fetch performance
const metrics = new DataSourceMetrics(dataSource);
console.log('Performance metrics:', metrics.generateReport());

// Check data volume
console.log('Data points:', dataSource.state.data.chart.data.length);
console.log('Update frequency:', dataSource.stream.tickRate);
```

**Solutions:**
- Implement data pagination for large datasets
- Use appropriate timeframes for chart resolution
- Enable data compression for network requests
- Implement efficient caching strategies

### Debug Mode

Enable comprehensive debugging:

```javascript
class DebugDataSource extends DataSource {
  constructor(cfg, state) {
    super(cfg, state);
    this.debug = true;
    this.debugLog = [];
  }
  
  log(message, data = null) {
    if (this.debug) {
      const entry = {
        timestamp: Date.now(),
        message,
        data: data ? JSON.stringify(data) : null
      };
      this.debugLog.push(entry);
      console.log(`[DataSource ${this.id}] ${message}`, data);
    }
  }
  
  timeFrameUse(tf) {
    this.log('Switching timeframe', { from: this.timeFrameStr, to: tf });
    return super.timeFrameUse(tf);
  }
  
  tickerStart(symbol, tf) {
    this.log('Starting ticker', { symbol, tf });
    return super.tickerStart(symbol, tf);
  }
  
  onRangeLimit(event, fn, timestamp) {
    this.log('Range limit triggered', { event: event.type, timestamp });
    return super.onRangeLimit(event, fn, timestamp);
  }
  
  getDebugInfo() {
    return {
      id: this.id,
      symbol: this.symbol,
      timeFrame: this.timeFrameStr,
      state: this.state.key,
      streamActive: this.stream?.isActive || false,
      dataPoints: this.state.data?.chart?.data?.length || 0,
      debugLog: this.debugLog.slice(-50) // Last 50 entries
    };
  }
}
```

## Migration Guide

### From Version 1.x to 2.x

#### Breaking Changes

1. **Constructor Parameters**
   ```javascript
   // Old (v1.x)
   const dataSource = new DataSource(symbol, timeframe, config);
   
   // New (v2.x)
   const dataSource = DataSource.create({
     symbol: symbol,
     timeFrameInit: timeframe,
     source: config
   }, state);
   ```

2. **Event Handler Signatures**
   ```javascript
   // Old (v1.x)
   rangeLimitPast: (timestamp) => fetchData(timestamp)
   
   // New (v2.x)
   rangeLimitPast: (event, symbol, timeframe, timestamp) => fetchData(symbol, timeframe, timestamp)
   ```

3. **TimeFrame Format**
   ```javascript
   // Old (v1.x) - String only
   dataSource.setTimeFrame('1h');
   
   // New (v2.x) - String or milliseconds
   dataSource.timeFrame = '1h';
   dataSource.timeFrame = 3600000;
   ```

#### Migration Steps

1. **Update DataSource Creation**
   ```javascript
   // Before
   const dataSource = new DataSource('BTC/USDT', '1h', {
     fetchHistory: fetchFunction
   });
   
   // After
   const dataSource = DataSource.create({
     symbol: 'BTC/USDT',
     timeFrameInit: '1h',
     source: {
       name: 'myExchange',
       rangeLimitPast: fetchFunction
     }
   }, chartState);
   ```

2. **Update Event Handlers**
   ```javascript
   // Before
   const fetchHistory = async (timestamp) => {
     return await api.getCandles(timestamp);
   };
   
   // After
   const fetchHistory = async (event, symbol, timeframe, timestamp) => {
     return await api.getCandles(symbol, timeframe, timestamp);
   };
   ```

3. **Update Stream Handlers**
   ```javascript
   // Before
   dataSource.setStream(startFunction, stopFunction);
   
   // After
   dataSource.tickerAdd({
     start: startFunction,
     stop: stopFunction
   });
   ```

### Compatibility Layer

For gradual migration, use this compatibility wrapper:

```javascript
class LegacyDataSource {
  constructor(symbol, timeframe, config) {
    console.warn('LegacyDataSource is deprecated. Use DataSource.create() instead.');
    
    // Convert old format to new format
    const newConfig = {
      symbol,
      timeFrameInit: timeframe,
      source: {
        name: config.name || 'legacy',
        rangeLimitPast: this.wrapLegacyFunction(config.fetchHistory),
        tickerStream: config.stream ? {
          start: config.stream.start,
          stop: config.stream.stop
        } : undefined
      }
    };
    
    return DataSource.create(newConfig, config.state);
  }
  
  wrapLegacyFunction(legacyFn) {
    if (!legacyFn) return undefined;
    
    return (event, symbol, timeframe, timestamp) => {
      // Call legacy function with old signature
      return legacyFn(timestamp);
    };
  }
}
```

## Conclusion

The DataSource class provides a comprehensive solution for managing financial data in TradeX charts. Its pull-based architecture, flexible configuration options, and robust error handling make it suitable for a wide range of trading applications.

Key benefits:
- **Agnostic Design**: Works with any data provider or exchange
- **Efficient State Management**: Automatic state switching and data sharing
- **Real-time Capabilities**: Seamless integration of live data streams
- **Performance Optimized**: Built-in caching, batching, and prefetching
- **Developer Friendly**: Comprehensive error handling and debugging tools

For additional support or advanced use cases, refer to the TradeX documentation or community resources.

## Related Documentation

- [TradeXChart Core API](./TradeXChart.md)
- [State Management](./State.md)
- [Stream Processing](./Stream.md)
- [Range Management](./Range.md)
- [Event System](./Events.md)

## Version History

- **v2.1.0**: Added multi-exchange support and performance monitoring
- **v2.0.0**: Major refactor with pull-based architecture
- **v1.5.0**: Added WebSocket streaming support
- **v1.0.0**: Initial release with basic data management

---

*Last updated: 2024*
*Documentation version: 2.1.0*
```
