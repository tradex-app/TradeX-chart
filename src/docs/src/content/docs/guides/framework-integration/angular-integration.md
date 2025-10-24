---
title: Angular Integration
description: Integrate TradeX Chart with Angular applications
---

Learn how to integrate TradeX Chart into your Angular applications.

## Installation

```bash
npm install tradex-chart
# or
yarn add tradex-chart
```

## Basic Integration

### Component Setup

```typescript
// trading-chart.component.ts
import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core'

@Component({
  selector: 'app-trading-chart',
  template: `
    <div #chartContainer class="chart-container"></div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 600px;
    }
  `]
})
export class TradingChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef
  @Input() symbol: string = 'BTC/USDT'
  @Input() data: number[][] = []

  private chart: any = null

  ngOnInit(): void {
    this.initChart()
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }

  private initChart(): void {
    this.chart = document.createElement('tradex-chart')
    this.chartContainer.nativeElement.appendChild(this.chart)

    this.chart.start({
      title: this.symbol,
      state: {
        ohlcv: this.data
      }
    })
  }

  public updateData(data: number[][]): void {
    if (this.chart) {
      this.chart.mergeData(data)
    }
  }
}
```

### Module Declaration

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { TradingChartComponent } from './trading-chart/trading-chart.component'

@NgModule({
  declarations: [
    TradingChartComponent
  ],
  imports: [
    BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required for web components
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Usage

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Trading Chart</h1>
      <app-trading-chart 
        [symbol]="symbol" 
        [data]="chartData"
      ></app-trading-chart>
    </div>
  `
})
export class AppComponent implements OnInit {
  symbol = 'BTC/USDT'
  chartData: number[][] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<number[][]>('https://api.example.com/ohlcv')
      .subscribe(data => {
        this.chartData = data
      })
  }
}
```

## Advanced Component

### Full-Featured Component

```typescript
import { 
  Component, 
  ElementRef, 
  Input, 
  Output,
  EventEmitter,
  OnInit, 
  OnDestroy, 
  OnChanges,
  SimpleChanges,
  ViewChild 
} from '@angular/core'
import * as talib from 'talib-web'

interface ChartConfig {
  title?: string
  width?: number
  height?: number
  theme?: any
  state?: any
  [key: string]: any
}

@Component({
  selector: 'app-tradex-chart',
  template: `
    <div class="chart-wrapper">
      <div *ngIf="loading" class="loading">Loading chart...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div #chartContainer class="chart-container"></div>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    .loading, .error {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .error {
      color: red;
    }
  `]
})
export class TradeXChartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef
  
  @Input() symbol: string = ''
  @Input() data: number[][] = []
  @Input() config: ChartConfig = {}
  
  @Output() ready = new EventEmitter<any>()
  @Output() error = new EventEmitter<Error>()

  private chart: any = null
  loading = true
  errorMessage: string | null = null

  ngOnInit(): void {
    this.initChart()
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateData(changes['data'].currentValue)
    }

    if (changes['symbol'] && !changes['symbol'].firstChange) {
      this.updateSymbol(changes['symbol'].currentValue)
    }
  }

  private async initChart(): Promise<void> {
    try {
      this.chart = document.createElement('tradex-chart')
      this.chartContainer.nativeElement.appendChild(this.chart)

      const chartConfig: ChartConfig = {
        title: this.symbol,
        talib: talib,
        width: this.chartContainer.nativeElement.offsetWidth,
        height: this.chartContainer.nativeElement.offsetHeight,
        ...this.config,
        state: {
          ohlcv: this.data,
          ...this.config.state
        }
      }

      await this.chart.start(chartConfig)
      this.loading = false
      this.ready.emit(this.chart)
    } catch (err: any) {
      this.errorMessage = err.message
      this.error.emit(err)
    }
  }

  private updateData(data: number[][]): void {
    if (this.chart && data) {
      this.chart.mergeData(data)
    }
  }

  private updateSymbol(symbol: string): void {
    if (this.chart && symbol) {
      this.chart.setTitle(symbol)
    }
  }

  // Public methods
  public addIndicator(name: string, params?: any): string {
    return this.chart?.addIndicator(name, params)
  }

  public removeIndicator(id: string): void {
    this.chart?.removeIndicator(id)
  }

  public exportImage(): string {
    return this.chart?.exportImage()
  }

  public getChart(): any {
    return this.chart
  }
}
```

### Using the Advanced Component

```typescript
import { Component, ViewChild } from '@angular/core'
import { TradeXChartComponent } from './tradex-chart/tradex-chart.component'

@Component({
  selector: 'app-trading-view',
  template: `
    <div class="trading-view">
      <div class="controls">
        <button (click)="handleAddRSI()">Add RSI</button>
        <button (click)="handleExport()">Export Image</button>
      </div>

      <app-tradex-chart
        #chart
        [symbol]="symbol"
        [data]="chartData"
        [config]="chartConfig"
        (ready)="onChartReady($event)"
        (error)="onChartError($event)"
      ></app-tradex-chart>
    </div>
  `
})
export class TradingViewComponent {
  @ViewChild('chart') chartComponent!: TradeXChartComponent

  symbol = 'BTC/USDT'
  chartData: number[][] = []
  chartConfig = {
    theme: {
      candle: {
        UpBodyColour: '#26a69a',
        DnBodyColour: '#ef5350'
      }
    }
  }

  handleAddRSI(): void {
    this.chartComponent.addIndicator('RSI', { period: 14 })
  }

  handleExport(): void {
    const image = this.chartComponent.exportImage()
    // Download or display image
  }

  onChartReady(chart: any): void {
    console.log('Chart ready:', chart)
  }

  onChartError(error: Error): void {
    console.error('Chart error:', error)
  }
}
```

## Real-time Updates

### WebSocket Service

```typescript
// websocket.service.ts
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface CandleUpdate {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  isClosed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws: WebSocket | null = null
  private subject = new Subject<CandleUpdate>()

  connect(url: string): Observable<CandleUpdate> {
    this.ws = new WebSocket(url)

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.subject.next(data)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return this.subject.asObservable()
  }

  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}
```

### Real-time Chart Component

```typescript
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { WebSocketService, CandleUpdate } from './websocket.service'
import { TradeXChartComponent } from './tradex-chart/tradex-chart.component'

@Component({
  selector: 'app-realtime-chart',
  template: `
    <app-tradex-chart
      #chart
      [symbol]="symbol"
      [data]="chartData"
    ></app-tradex-chart>
  `
})
export class RealtimeChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chartComponent!: TradeXChartComponent

  symbol = 'BTC/USDT'
  chartData: number[][] = []
  private subscription?: Subscription

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.subscription = this.wsService
      .connect('wss://api.example.com/ws')
      .subscribe((update: CandleUpdate) => {
        this.handleUpdate(update)
      })

    // Subscribe to symbol
    this.wsService.send({
      type: 'subscribe',
      symbol: this.symbol
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    this.wsService.disconnect()
  }

  private handleUpdate(update: CandleUpdate): void {
    const chart = this.chartComponent.getChart()
    if (!chart) return

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
```

## State Management with NgRx

### Chart State

```typescript
// chart.state.ts
export interface ChartState {
  symbol: string
  data: number[][]
  indicators: Array<{ name: string; params: any }>
  timeframe: string
  loading: boolean
  error: string | null
}

export const initialState: ChartState = {
  symbol: 'BTC/USDT',
  data: [],
  indicators: [],
  timeframe: '1h',
  loading: false,
  error: null
}
```

### Chart Actions

```typescript
// chart.actions.ts
import { createAction, props } from '@ngrx/store'

export const loadChartData = createAction(
  '[Chart] Load Data',
  props<{ symbol: string; timeframe: string }>()
)

export const loadChartDataSuccess = createAction(
  '[Chart] Load Data Success',
  props<{ data: number[][] }>()
)

export const loadChartDataFailure = createAction(
  '[Chart] Load Data Failure',
  props<{ error: string }>()
)

export const addIndicator = createAction(
  '[Chart] Add Indicator',
  props<{ name: string; params: any }>()
)

export const removeIndicator = createAction(
  '[Chart] Remove Indicator',
  props<{ index: number }>()
)
```

### Chart Reducer

```typescript
// chart.reducer.ts
import { createReducer, on } from '@ngrx/store'
import * as ChartActions from './chart.actions'
import { initialState } from './chart.state'

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.loadChartData, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ChartActions.loadChartDataSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false
  })),
  on(ChartActions.loadChartDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ChartActions.addIndicator, (state, { name, params }) => ({
    ...state,
    indicators: [...state.indicators, { name, params }]
  })),
  on(ChartActions.removeIndicator, (state, { index }) => ({
    ...state,
    indicators: state.indicators.filter((_, i) => i !== index)
  }))
)
```

### Using with NgRx

```typescript
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as ChartActions from './store/chart.actions'
import { ChartState } from './store/chart.state'

@Component({
  selector: 'app-chart-container',
  template: `
    <app-tradex-chart
      [symbol]="(chartState$ | async)?.symbol || ''"
      [data]="(chartState$ | async)?.data || []"
    ></app-tradex-chart>
  `
})
export class ChartContainerComponent implements OnInit {
  chartState$: Observable<ChartState>

  constructor(private store: Store<{ chart: ChartState }>) {
    this.chartState$ = store.select('chart')
  }

  ngOnInit(): void {
    this.store.dispatch(ChartActions.loadChartData({
      symbol: 'BTC/USDT',
      timeframe: '1h'
    }))
  }
}
```

## Standalone Components (Angular 14+)

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-trading-chart',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div #chartContainer class="chart-container"></div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 600px;
    }
  `]
})
export class TradingChartComponent {
  // Component implementation
}
```

## Testing

### Component Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TradingChartComponent } from './trading-chart.component'

describe('TradingChartComponent', () => {
  let component: TradingChartComponent
  let fixture: ComponentFixture<TradingChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradingChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(TradingChartComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize chart on init', () => {
    component.symbol = 'BTC/USDT'
    component.data = [[1609459200000, 29000, 29500, 28800, 29200, 1234.56]]
    
    fixture.detectChanges()
    
    expect(component['chart']).toBeTruthy()
  })

  it('should cleanup on destroy', () => {
    component.ngOnInit()
    const destroySpy = jasmine.createSpy('destroy')
    component['chart'] = { destroy: destroySpy }
    
    component.ngOnDestroy()
    
    expect(destroySpy).toHaveBeenCalled()
  })
})
```

## Common Patterns

### Multi-Chart Layout

```typescript
@Component({
  selector: 'app-multi-chart',
  template: `
    <div class="grid">
      <app-tradex-chart
        *ngFor="let symbol of symbols"
        [symbol]="symbol"
        [data]="chartData[symbol]"
        [config]="{ height: 400 }"
      ></app-tradex-chart>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  `]
})
export class MultiChartComponent {
  symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT']
  chartData: { [key: string]: number[][] } = {}
}
```

## Troubleshooting

### CUSTOM_ELEMENTS_SCHEMA

Always include `CUSTOM_ELEMENTS_SCHEMA` in your module:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

### Change Detection

For better performance with large datasets:

```typescript
import { ChangeDetectionStrategy } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

## Related Documentation

- [Getting Started](../../reference/01_getting_started) - Basic setup
- [Configuration](../../reference/02_configuration) - Chart configuration
- [WebSocket Integration](../backend/websocket-integration) - Real-time data
- [API Reference](../../api/core) - Complete API
- [React Integration](react-integration) - React guide
- [Vue Integration](vue-integration) - Vue guide