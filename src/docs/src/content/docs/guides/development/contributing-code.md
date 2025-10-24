---
title: Contributing Code
description: Guidelines for contributing code to TradeX Chart
---

# Contributing Code

Thank you for considering contributing to TradeX Chart! This guide will help you make effective contributions.

## Getting Started

### Before You Begin

1. **Check existing issues** - Someone might already be working on it
2. **Read the docs** - Understand the project architecture
3. **Set up your environment** - Follow the [local setup guide](local-setup)
4. **Join Discord** - Discuss your ideas with the community

### Ways to Contribute

- 🐛 **Fix bugs** - Help squash issues
- ✨ **Add features** - Implement new functionality
- 📝 **Improve docs** - Enhance documentation
- ✅ **Write tests** - Increase test coverage
- 🎨 **Improve UI/UX** - Enhance user experience
- 🚀 **Optimize performance** - Make it faster

## Contribution Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/TradeX-chart.git
cd TradeX-chart

# Add upstream remote
git remote add upstream https://github.com/tradex-app/TradeX-chart.git
```

### 2. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

**Branch naming conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `perf/` - Performance improvements

### 3. Make Your Changes

Follow the [coding standards](#coding-standards) below.

### 4. Test Your Changes

```bash
# Run tests
npm test

# Run specific test
npm test -- tests/your-test.test.js

# Check in browser
npm run dev
```

### 5. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add new indicator"
```

**Commit message format**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test additions/changes
- `chore` - Build process or auxiliary tool changes

**Examples**:
```bash
feat(indicators): add Ichimoku Cloud indicator
fix(chart): resolve memory leak in canvas rendering
docs(api): update Chart class documentation
refactor(state): simplify state management logic
test(overlays): add tests for overlay rendering
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit the PR

## Pull Request Guidelines

### PR Title

Follow the same format as commit messages:
```
feat(indicators): add VWAP indicator
```

### PR Description

Include:

**What**:
- What changes were made
- What problem it solves

**Why**:
- Why this change is needed
- Context and motivation

**How**:
- How it was implemented
- Technical details

**Testing**:
- How it was tested
- Test cases covered

**Screenshots** (if applicable):
- Before/after images
- Demo GIFs

**Example**:
```markdown
## Description
Adds VWAP (Volume Weighted Average Price) indicator.

## Motivation
VWAP is a commonly requested indicator for intraday trading analysis.

## Implementation
- Created new VWAP class extending Indicator
- Implemented volume-weighted calculation
- Added configuration options for period
- Included visual styling options

## Testing
- Added unit tests for VWAP calculation
- Tested with various timeframes
- Verified visual rendering
- Tested configuration options

## Screenshots
![VWAP Indicator](./screenshots/vwap.png)
```

### PR Checklist

Before submitting:

- [ ] Code follows project style guidelines
- [ ] Tests pass (`npm test`)
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No console.log statements left
- [ ] Code is properly commented
- [ ] Branch is up to date with main

## Coding Standards

### JavaScript Style

**Use ES6+ features**:
```javascript
// Good
const data = [...array]
const { x, y } = point

// Avoid
var data = array.slice()
var x = point.x, y = point.y
```

**Use arrow functions**:
```javascript
// Good
const double = (x) => x * 2
array.map(item => item.value)

// Avoid
var double = function(x) { return x * 2 }
array.map(function(item) { return item.value })
```

**Use template literals**:
```javascript
// Good
const message = `Hello ${name}!`

// Avoid
var message = 'Hello ' + name + '!'
```

### Code Organization

**File structure**:
```javascript
// 1. Imports
import { Indicator } from './indicator.js'
import { calculateSMA } from '../utils/math.js'

// 2. Constants
const DEFAULT_PERIOD = 14
const DEFAULT_COLOR = '#2196F3'

// 3. Class definition
export class RSI extends Indicator {
  constructor(target, xAxis, yAxis, theme, parent, params) {
    super(target, xAxis, yAxis, theme, parent, params)
    this.init()
  }
  
  // Methods...
}

// 4. Helper functions
function calculateRSI(data, period) {
  // Implementation
}
```

**Class structure**:
```javascript
export class MyClass {
  // 1. Constructor
  constructor(params) {
    this.params = params
  }
  
  // 2. Public methods
  publicMethod() {
    // Implementation
  }
  
  // 3. Private methods (prefix with _)
  _privateMethod() {
    // Implementation
  }
  
  // 4. Getters/Setters
  get value() {
    return this._value
  }
  
  set value(val) {
    this._value = val
  }
}
```

### Naming Conventions

**Variables and functions**: camelCase
```javascript
const chartData = []
function calculateAverage() {}
```

**Classes**: PascalCase
```javascript
class ChartIndicator {}
```

**Constants**: UPPER_SNAKE_CASE
```javascript
const MAX_CANDLES = 10000
const DEFAULT_TIMEFRAME = '1h'
```

**Private members**: prefix with underscore
```javascript
class Chart {
  constructor() {
    this._privateData = []
  }
  
  _privateMethod() {}
}
```

**Boolean variables**: use is/has/should prefix
```javascript
const isVisible = true
const hasData = false
const shouldUpdate = true
```

### Comments and Documentation

**JSDoc for public APIs**:
```javascript
/**
 * Calculate Simple Moving Average
 * @param {number[]} data - Array of values
 * @param {number} period - Period length
 * @returns {number[]} SMA values
 * @example
 * const sma = calculateSMA([1, 2, 3, 4, 5], 3)
 * // Returns [2, 3, 4]
 */
export function calculateSMA(data, period) {
  // Implementation
}
```

**Inline comments for complex logic**:
```javascript
// Calculate the exponential moving average using the smoothing factor
const smoothing = 2 / (period + 1)
const ema = prevEMA + smoothing * (price - prevEMA)
```

**TODO comments**:
```javascript
// TODO: Optimize this loop for large datasets
// FIXME: Handle edge case when data is empty
// NOTE: This assumes data is sorted by timestamp
```

### Error Handling

**Validate inputs**:
```javascript
function addIndicator(name, params) {
  if (!name || typeof name !== 'string') {
    throw new Error('Indicator name must be a string')
  }
  
  if (params && typeof params !== 'object') {
    throw new Error('Params must be an object')
  }
  
  // Implementation
}
```

**Use try-catch for risky operations**:
```javascript
try {
  const data = JSON.parse(jsonString)
  processData(data)
} catch (error) {
  console.error('Failed to parse data:', error)
  return null
}
```

**Provide meaningful error messages**:
```javascript
// Good
throw new Error(`Invalid timeframe: ${timeframe}. Expected: 1m, 5m, 15m, 1h, 4h, 1d`)

// Bad
throw new Error('Invalid input')
```

### Performance Best Practices

**Avoid unnecessary loops**:
```javascript
// Good - single pass
const { sum, count } = data.reduce((acc, val) => ({
  sum: acc.sum + val,
  count: acc.count + 1
}), { sum: 0, count: 0 })

// Avoid - multiple passes
const sum = data.reduce((a, b) => a + b, 0)
const count = data.length
```

**Cache expensive calculations**:
```javascript
class Chart {
  constructor() {
    this._cachedRange = null
  }
  
  getVisibleRange() {
    if (!this._cachedRange) {
      this._cachedRange = this._calculateRange()
    }
    return this._cachedRange
  }
  
  invalidateCache() {
    this._cachedRange = null
  }
}
```

**Use requestAnimationFrame for animations**:
```javascript
function animate() {
  // Update logic
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
```

## Testing Guidelines

### Writing Tests

**Test file naming**: `*.test.js`
```
src/indicators/rsi.js
tests/indicators/rsi.test.js
```

**Test structure**:
```javascript
import { describe, it, expect } from 'vitest'
import { RSI } from '../src/indicators/rsi.js'

describe('RSI Indicator', () => {
  it('should calculate RSI correctly', () => {
    const data = [44, 44.34, 44.09, 43.61, 44.33]
    const rsi = new RSI()
    const result = rsi.calculate(data, 14)
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
  
  it('should handle empty data', () => {
    const rsi = new RSI()
    const result = rsi.calculate([], 14)
    
    expect(result).toEqual([])
  })
  
  it('should throw error for invalid period', () => {
    const rsi = new RSI()
    
    expect(() => {
      rsi.calculate([1, 2, 3], -1)
    }).toThrow('Period must be positive')
  })
})
```

### Test Coverage

Aim for:
- **80%+ code coverage** for new features
- **100% coverage** for critical paths
- **Edge cases** covered
- **Error conditions** tested

## Documentation Guidelines

### Code Documentation

**Document public APIs**:
```javascript
/**
 * Add a new indicator to the chart
 * @param {string} name - Indicator name (e.g., 'RSI', 'MACD')
 * @param {Object} [params] - Indicator parameters
 * @param {number} [params.period=14] - Calculation period
 * @param {string} [params.color='#2196F3'] - Line color
 * @returns {string} Indicator ID
 * @throws {Error} If indicator name is invalid
 */
addIndicator(name, params = {}) {
  // Implementation
}
```

### README Updates

Update README.md if you:
- Add new features
- Change API
- Add dependencies
- Change build process

### Changelog

Add entry to CHANGELOG.md:
```markdown
## [Unreleased]

### Added
- VWAP indicator with customizable period

### Fixed
- Memory leak in canvas rendering

### Changed
- Improved performance of SMA calculation
```

## Code Review Process

### What Reviewers Look For

1. **Correctness** - Does it work as intended?
2. **Tests** - Are there adequate tests?
3. **Performance** - Any performance concerns?
4. **Style** - Follows coding standards?
5. **Documentation** - Properly documented?
6. **Breaking changes** - Any API changes?

### Responding to Feedback

- Be open to suggestions
- Ask questions if unclear
- Make requested changes promptly
- Push updates to the same branch
- Mark conversations as resolved

### After Approval

- Maintainer will merge your PR
- Your contribution will be in the next release
- You'll be added to contributors list

## Common Pitfalls

### Avoid

**❌ Large PRs**:
- Keep PRs focused and small
- Split large changes into multiple PRs

**❌ Mixing concerns**:
- Don't mix refactoring with features
- One PR = one logical change

**❌ Breaking changes without discussion**:
- Discuss breaking changes first
- Provide migration path

**❌ Incomplete tests**:
- Don't skip tests
- Cover edge cases

**❌ Poor commit messages**:
- Be descriptive
- Follow conventions

## Getting Help

### Stuck?

- **Discord** - Ask in [#development](https://discord.gg/6XS9tDrcdq)
- **GitHub Discussions** - Start a discussion
- **Issues** - Comment on related issues
- **Docs** - Review documentation

### Need Guidance?

- Ask maintainers for direction
- Request code review early
- Pair program in Discord

## Recognition

Contributors are recognized:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- GitHub contributor badge
- Community appreciation

## License

By contributing, you agree that your contributions will be licensed under the GNU GPL3 License.

## Related Documentation

- [Local Setup](local-setup) - Development environment
- [Build Process](build-process) - Build system
- [Debugging Tips](debugging-tips) - Debug techniques
- [Architecture](../../reference/architecture) - Code architecture
- [FAQ](../faq) - Common questions