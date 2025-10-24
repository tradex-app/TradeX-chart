---
title: Production Checklist
description: Essential checklist for deploying TradeX Chart to production
---

# Production Checklist

Essential checklist to ensure your TradeX Chart deployment is production-ready.

## Pre-Deployment

### Code Quality

- [ ] **Remove console.log statements**
  ```javascript
  // Remove all debug logging
  // console.log('Debug info')
  ```

- [ ] **Remove development-only code**
  ```javascript
  if (process.env.NODE_ENV === 'production') {
    // Production code only
  }
  ```

- [ ] **Minify and bundle code**
  ```bash
  npm run build
  # Verify output in dist/ folder
  ```

- [ ] **Enable source maps for debugging**
  ```javascript
  // webpack.config.js
  module.exports = {
    devtool: 'source-map'
  }
  ```

### Performance

- [ ] **Optimize bundle size**
  ```bash
  # Analyze bundle
  npm run build -- --analyze
  ```

- [ ] **Enable code splitting**
  ```javascript
  // Lazy load chart component
  const TradeXChart = lazy(() => import('./TradeXChart'))
  ```

- [ ] **Compress assets**
  ```javascript
  // Enable gzip/brotli compression
  app.use(compression())
  ```

- [ ] **Implement caching strategy**
  ```javascript
  // Cache static assets
  app.use(express.static('public', {
    maxAge: '1y',
    immutable: true
  }))
  ```

- [ ] **Limit data points (5000-10000 max)**
  ```javascript
  const MAX_CANDLES = 5000
  if (data.length > MAX_CANDLES) {
    data = data.slice(-MAX_CANDLES)
  }
  ```

### Security

- [ ] **Validate all user inputs**
  ```javascript
  function validateSymbol(symbol) {
    if (!/^[A-Z]{2,10}$/.test(symbol)) {
      throw new Error('Invalid symbol')
    }
  }
  ```

- [ ] **Sanitize data from external sources**
  ```javascript
  function sanitizeOHLCV(data) {
    return data.map(candle => [
      parseInt(candle[0]),
      parseFloat(candle[1]),
      parseFloat(candle[2]),
      parseFloat(candle[3]),
      parseFloat(candle[4]),
      parseFloat(candle[5] || 0)
    ])
  }
  ```

- [ ] **Use HTTPS for all API calls**
  ```javascript
  const API_URL = 'https://api.example.com'
  ```

- [ ] **Implement rate limiting**
  ```javascript
  const rateLimit = require('express-rate-limit')
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
  
  app.use('/api/', limiter)
  ```

- [ ] **Secure API keys**
  ```javascript
  // Use environment variables
  const API_KEY = process.env.API_KEY
  
  // Never commit .env files
  // Add to .gitignore
  ```

- [ ] **Enable CORS properly**
  ```javascript
  app.use(cors({
    origin: 'https://yourdomain.com',
    credentials: true
  }))
  ```

### Error Handling

- [ ] **Implement global error handler**
  ```javascript
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // Send to error tracking service
    trackError(event.error)
  })
  ```

- [ ] **Handle chart initialization errors**
  ```javascript
  try {
    await chart.start(config)
  } catch (error) {
    console.error('Chart initialization failed:', error)
    showErrorMessage('Failed to load chart')
  }
  ```

- [ ] **Implement fallback for failed data loads**
  ```javascript
  async function loadChartData() {
    try {
      const data = await fetchData()
      return data
    } catch (error) {
      // Try backup source
      return await fetchDataFromBackup()
    }
  }
  ```

- [ ] **Add error boundaries (React)**
  ```jsx
  class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
      logError(error, errorInfo)
    }
    render() {
      if (this.state.hasError) {
        return <ErrorFallback />
      }
      return this.props.children
    }
  }
  ```

### Monitoring

- [ ] **Set up error tracking**
  ```javascript
  // Sentry, Rollbar, or similar
  Sentry.init({
    dsn: 'YOUR_DSN',
    environment: 'production'
  })
  ```

- [ ] **Implement performance monitoring**
  ```javascript
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Performance:', entry)
    }
  })
  observer.observe({ entryTypes: ['measure'] })
  ```

- [ ] **Add analytics tracking**
  ```javascript
  // Track chart interactions
  chart.on('zoom', () => {
    analytics.track('Chart Zoom')
  })
  
  chart.on('indicatorAdded', (name) => {
    analytics.track('Indicator Added', { name })
  })
  ```

- [ ] **Monitor API response times**
  ```javascript
  async function fetchWithTiming(url) {
    const start = performance.now()
    const response = await fetch(url)
    const duration = performance.now() - start
    
    logMetric('api_response_time', duration)
    return response
  }
  ```

### Browser Compatibility

- [ ] **Test on target browsers**
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

- [ ] **Add polyfills if needed**
  ```javascript
  // core-js for older browsers
  import 'core-js/stable'
  import 'regenerator-runtime/runtime'
  ```

- [ ] **Test on mobile devices**
  - iOS Safari
  - Chrome Mobile
  - Samsung Internet

- [ ] **Verify touch interactions**
  ```javascript
  // Test pinch zoom, pan, tap
  chart.start({
    touch: {
      enabled: true,
      sensitivity: 1.0
    }
  })
  ```

### Accessibility

- [ ] **Add ARIA labels**
  ```html
  <tradex-chart 
    role="img" 
    aria-label="Trading chart for BTC/USDT"
  ></tradex-chart>
  ```

- [ ] **Ensure keyboard navigation**
  ```javascript
  chart.start({
    keyboard: {
      enabled: true
    }
  })
  ```

- [ ] **Test with screen readers**

- [ ] **Provide text alternatives**
  ```html
  <tradex-chart>
    <div class="chart-fallback">
      Current price: $45,000
      24h change: +2.5%
    </div>
  </tradex-chart>
  ```

## Deployment

### Build Process

- [ ] **Run production build**
  ```bash
  npm run build
  ```

- [ ] **Verify build output**
  ```bash
  ls -lh dist/
  # Check file sizes
  ```

- [ ] **Test production build locally**
  ```bash
  npm run serve
  # Test at http://localhost:5000
  ```

### CDN Configuration

- [ ] **Upload assets to CDN**
  ```bash
  aws s3 sync dist/ s3://your-bucket/
  ```

- [ ] **Set cache headers**
  ```javascript
  // CloudFront or similar
  Cache-Control: public, max-age=31536000, immutable
  ```

- [ ] **Enable CDN compression**
  ```javascript
  // Gzip/Brotli at CDN level
  ```

- [ ] **Configure CDN fallback**
  ```html
  <script src="https://cdn.example.com/chart.js"></script>
  <script>
    if (!window.TradeXChart) {
      // Load from backup CDN
      document.write('<script src="https://backup-cdn.example.com/chart.js"><\/script>')
    }
  </script>
  ```

### Environment Variables

- [ ] **Set production environment variables**
  ```bash
  NODE_ENV=production
  API_URL=https://api.production.com
  WS_URL=wss://ws.production.com
  ```

- [ ] **Verify all secrets are set**
  ```bash
  # Check .env.production
  cat .env.production
  ```

### SSL/TLS

- [ ] **Enable HTTPS**
- [ ] **Configure SSL certificate**
- [ ] **Redirect HTTP to HTTPS**
  ```javascript
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url)
    }
    next()
  })
  ```

- [ ] **Use secure WebSocket (wss://)**
  ```javascript
  const ws = new WebSocket('wss://api.example.com/ws')
  ```

## Post-Deployment

### Testing

- [ ] **Smoke test all features**
  - Chart loads correctly
  - Data updates in real-time
  - Indicators work
  - Drawing tools function
  - Export features work

- [ ] **Load testing**
  ```bash
  # Use tools like Apache Bench, k6, or Artillery
  ab -n 1000 -c 10 https://yoursite.com/
  ```

- [ ] **Test on slow connections**
  ```javascript
  // Chrome DevTools > Network > Throttling
  // Test on 3G, Slow 3G
  ```

- [ ] **Verify WebSocket connections**
  ```javascript
  ws.onopen = () => console.log('WebSocket connected')
  ws.onerror = (error) => console.error('WebSocket error:', error)
  ```

### Monitoring

- [ ] **Set up uptime monitoring**
  - Pingdom
  - UptimeRobot
  - StatusCake

- [ ] **Configure alerts**
  ```javascript
  // Alert on errors > threshold
  if (errorRate > 0.05) {
    sendAlert('High error rate detected')
  }
  ```

- [ ] **Monitor resource usage**
  - CPU usage
  - Memory usage
  - Network bandwidth

- [ ] **Track key metrics**
  - Page load time
  - Time to interactive
  - Chart render time
  - API response time

### Documentation

- [ ] **Update API documentation**
- [ ] **Document deployment process**
- [ ] **Create runbook for common issues**
- [ ] **Document rollback procedure**

### Backup

- [ ] **Backup configuration files**
- [ ] **Backup database (if applicable)**
- [ ] **Test restore procedure**

## Maintenance

### Regular Tasks

- [ ] **Monitor error logs daily**
- [ ] **Review performance metrics weekly**
- [ ] **Update dependencies monthly**
  ```bash
  npm outdated
  npm update
  ```

- [ ] **Security audit quarterly**
  ```bash
  npm audit
  npm audit fix
  ```

### Updates

- [ ] **Test updates in staging first**
- [ ] **Have rollback plan ready**
- [ ] **Schedule updates during low-traffic periods**
- [ ] **Notify users of maintenance windows**

## Quick Reference

### Critical Checks

```bash
# 1. Build
npm run build

# 2. Test locally
npm run serve

# 3. Run tests
npm test

# 4. Security audit
npm audit

# 5. Deploy
npm run deploy

# 6. Verify
curl https://yoursite.com/health
```

### Emergency Rollback

```bash
# Rollback to previous version
git revert HEAD
npm run build
npm run deploy

# Or use deployment platform rollback
vercel rollback
# or
netlify rollback
```

## Related Documentation

- [CDN Deployment](cdn-deployment) - CDN setup guide
- [Webpack Configuration](webpack-config) - Build optimization
- [Vite Configuration](vite-config) - Vite setup
- [Security Considerations](security-considerations) - Security best practices
- [Performance Optimization](../performance) - Performance tips