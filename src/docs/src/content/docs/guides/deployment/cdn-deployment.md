---
title: CDN Deployment
description: Deploy TradeX Chart via CDN for optimal performance
---

# CDN Deployment

Learn how to deploy and use TradeX Chart via Content Delivery Networks (CDN) for optimal performance and global availability.

## Quick Start

### Using jsDelivr

```html
<!DOCTYPE html>
<html>
<head>
  <title>TradeX Chart</title>
</head>
<body>
  <tradex-chart id="myChart"></tradex-chart>

  <!-- Load from jsDelivr -->
  <script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
  
  <script>
    const chart = document.getElementById('myChart')
    
    chart.start({
      title: 'BTC/USDT',
      state: {
        ohlcv: [] // Your data
      }
    })
  </script>
</body>
</html>
```

### Using unpkg

```html
<!-- Latest version -->
<script src="https://unpkg.com/tradex-chart"></script>

<!-- Specific version -->
<script src="https://unpkg.com/tradex-chart@1.0.0/dist/tradex-chart.umd.min.js"></script>
```

## CDN Providers

### jsDelivr

**Advantages:**
- Fast global CDN
- Automatic minification
- Version management
- GitHub integration

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"></script>

<!-- With SRI hash -->
<script 
  src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

### unpkg

**Advantages:**
- Simple URLs
- npm package mirror
- Automatic latest version

```html
<!-- Latest -->
<script src="https://unpkg.com/tradex-chart"></script>

<!-- Specific version -->
<script src="https://unpkg.com/tradex-chart@1.2.3"></script>

<!-- Specific file -->
<script src="https://unpkg.com/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"></script>
```

### cdnjs

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tradex-chart/1.2.3/tradex-chart.umd.min.js"></script>
```

## Version Management

### Pin to Specific Version

**Recommended for production:**

```html
<!-- Good: Specific version -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"></script>

<!-- Bad: Latest version (may break) -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
```

### Semantic Versioning

```html
<!-- Exact version -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3"></script>

<!-- Minor updates only (1.x.x) -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1"></script>

<!-- Patch updates only (1.2.x) -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2"></script>
```

## Security

### Subresource Integrity (SRI)

Verify file integrity with SRI hashes:

```html
<script 
  src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
></script>
```

### Generate SRI Hash

```bash
# Using openssl
curl https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js | \
  openssl dgst -sha384 -binary | \
  openssl base64 -A

# Using Node.js
const crypto = require('crypto')
const https = require('https')

https.get('https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js', (res) => {
  const hash = crypto.createHash('sha384')
  res.on('data', (chunk) => hash.update(chunk))
  res.on('end', () => {
    console.log('sha384-' + hash.digest('base64'))
  })
})
```

### Content Security Policy (CSP)

```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://cdn.jsdelivr.net https://unpkg.com">
```

## Fallback Strategy

### CDN with Local Fallback

```html
<!-- Try CDN first -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>

<!-- Fallback to local copy -->
<script>
  if (!window.TradeXChart) {
    document.write('<script src="/js/tradex-chart.umd.min.js"><\/script>')
  }
</script>
```

### Multiple CDN Fallback

```html
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
<script>
  if (!window.TradeXChart) {
    // Try unpkg
    document.write('<script src="https://unpkg.com/tradex-chart"><\/script>')
  }
</script>
<script>
  if (!window.TradeXChart) {
    // Try local
    document.write('<script src="/js/tradex-chart.umd.min.js"><\/script>')
  }
</script>
```

### Dynamic Loading

```javascript
function loadChart() {
  return new Promise((resolve, reject) => {
    const cdns = [
      'https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js',
      'https://unpkg.com/tradex-chart',
      '/js/tradex-chart.umd.min.js'
    ]

    function tryLoad(index) {
      if (index >= cdns.length) {
        reject(new Error('Failed to load chart from all sources'))
        return
      }

      const script = document.createElement('script')
      script.src = cdns[index]
      
      script.onload = () => resolve()
      script.onerror = () => tryLoad(index + 1)
      
      document.head.appendChild(script)
    }

    tryLoad(0)
  })
}

// Usage
loadChart()
  .then(() => {
    console.log('Chart loaded successfully')
    initializeChart()
  })
  .catch(error => {
    console.error('Failed to load chart:', error)
  })
```

## Performance Optimization

### Preload Resources

```html
<head>
  <!-- Preload chart library -->
  <link rel="preload" 
        href="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js" 
        as="script">
</head>
```

### DNS Prefetch

```html
<head>
  <!-- Prefetch CDN domain -->
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://unpkg.com">
</head>
```

### Async/Defer Loading

```html
<!-- Defer: Load after HTML parsing -->
<script defer src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>

<!-- Async: Load asynchronously -->
<script async src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
```

### Module Loading

```html
<!-- ES Module -->
<script type="module">
  import TradeXChart from 'https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.esm.js'
  
  const chart = new TradeXChart()
</script>
```

## Custom CDN Setup

### Using AWS CloudFront

```bash
# 1. Upload to S3
aws s3 cp dist/ s3://your-bucket/tradex-chart/ --recursive

# 2. Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name your-bucket.s3.amazonaws.com \
  --default-root-object index.html

# 3. Use your CDN URL
# https://d1234567890.cloudfront.net/tradex-chart/tradex-chart.umd.min.js
```

### Cache Configuration

```javascript
// CloudFront cache behavior
{
  "PathPattern": "*.js",
  "TargetOriginId": "S3-your-bucket",
  "ViewerProtocolPolicy": "redirect-to-https",
  "MinTTL": 31536000, // 1 year
  "DefaultTTL": 31536000,
  "MaxTTL": 31536000,
  "Compress": true
}
```

### Using Cloudflare

```bash
# 1. Upload files
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/files" \
  -H "Authorization: Bearer {api_token}" \
  -F "file=@dist/tradex-chart.umd.min.js"

# 2. Configure cache rules
# Cache everything for 1 year
```

## Monitoring

### Check CDN Availability

```javascript
async function checkCDNAvailability(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    return false
  }
}

// Check multiple CDNs
const cdns = [
  'https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js',
  'https://unpkg.com/tradex-chart'
]

Promise.all(cdns.map(checkCDNAvailability))
  .then(results => {
    results.forEach((available, i) => {
      console.log(`${cdns[i]}: ${available ? 'UP' : 'DOWN'}`)
    })
  })
```

### Performance Monitoring

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('tradex-chart')) {
      console.log('CDN Load Time:', entry.duration, 'ms')
      console.log('Transfer Size:', entry.transferSize, 'bytes')
    }
  }
})

observer.observe({ entryTypes: ['resource'] })
```

## Best Practices

### 1. Always Pin Versions in Production

```html
<!-- Good -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"></script>

<!-- Bad -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
```

### 2. Use SRI for Security

```html
<script 
  src="https://cdn.jsdelivr.net/npm/tradex-chart@1.2.3/dist/tradex-chart.umd.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

### 3. Implement Fallback

```javascript
// Always have a backup plan
if (!window.TradeXChart) {
  loadFromBackupCDN()
}
```

### 4. Monitor CDN Performance

```javascript
// Track load times
performance.mark('cdn-start')
// ... load script
performance.mark('cdn-end')
performance.measure('cdn-load', 'cdn-start', 'cdn-end')
```

### 5. Use Compression

```html
<!-- Prefer .min.js files -->
<script src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"></script>
```

## Troubleshooting

### CDN Not Loading

```javascript
// Check if script loaded
if (typeof TradeXChart === 'undefined') {
  console.error('TradeX Chart failed to load from CDN')
  // Load from backup
}
```

### CORS Issues

```html
<!-- Add crossorigin attribute -->
<script 
  src="https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js"
  crossorigin="anonymous"
></script>
```

### Version Mismatch

```javascript
// Check loaded version
if (TradeXChart.version !== '1.2.3') {
  console.warn('Version mismatch detected')
}
```

## Related Documentation

- [Production Checklist](production-checklist) - Deployment checklist
- [Webpack Configuration](webpack-config) - Build configuration
- [Security Considerations](security-considerations) - Security best practices
- [Getting Started](../../reference/01_getting_started) - Basic setup