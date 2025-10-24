---
title: Contributing to TradeX Chart
description: How to contribute to the TradeX Chart project
---

# Contributing to TradeX Chart

We welcome contributions from the community! This guide will help you get started.

## Ways to Contribute

There are many ways to contribute to TradeX Chart:

### 🐛 Report Bugs

Found a bug? Help us fix it:
- Check if it's already reported in [GitHub Issues](https://github.com/tradex-app/TradeX-chart/issues)
- Create a detailed bug report with reproduction steps
- Include browser version, OS, and TradeX Chart version

### ✨ Suggest Features

Have an idea for improvement?
- Check existing [feature requests](https://github.com/tradex-app/TradeX-chart/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
- Open a new issue with the "enhancement" label
- Describe the use case and expected behavior

### 💻 Contribute Code

Submit code contributions:
- Fix bugs
- Implement new features
- Improve performance
- Add tests
- Refactor code

See [Contributing Code](development/contributing-code) for detailed guidelines.

### 📝 Improve Documentation

Help make the docs better:
- Fix typos and errors
- Add examples and tutorials
- Clarify confusing sections
- Translate documentation

### 🎨 Design Contributions

Improve the user experience:
- UI/UX improvements
- Icon and graphic design
- Theme and color schemes
- Demo and example applications

### 💬 Community Support

Help other users:
- Answer questions on [Discord](https://discord.gg/6XS9tDrcdq)
- Help troubleshoot issues
- Share your experience and tips
- Write blog posts or tutorials

## Getting Started

### 1. Set Up Your Environment

Follow the [Local Setup Guide](development/local-setup) to:
- Install prerequisites (Node.js, Git)
- Clone the repository
- Install dependencies
- Run the development server

### 2. Find Something to Work On

**Good first issues**:
- Look for issues labeled [`good first issue`](https://github.com/tradex-app/TradeX-chart/labels/good%20first%20issue)
- These are beginner-friendly tasks
- Great for first-time contributors

**Help wanted**:
- Issues labeled [`help wanted`](https://github.com/tradex-app/TradeX-chart/labels/help%20wanted)
- Community contributions are especially welcome
- May require more experience

**Browse the roadmap**:
- Check the [project roadmap](https://github.com/tradex-app/TradeX-chart/projects)
- See what features are planned
- Pick something that interests you

### 3. Discuss Before Building

For significant changes:
- Comment on the issue to claim it
- Discuss your approach with maintainers
- Get feedback before investing time
- Avoid duplicate work

## Contribution Process

### Step 1: Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/TradeX-chart.git
cd TradeX-chart

# Add upstream remote
git remote add upstream https://github.com/tradex-app/TradeX-chart.git
```

### Step 2: Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

**Branch naming**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests
- `perf/` - Performance improvements

### Step 3: Make Changes

Follow our [coding standards](development/contributing-code#coding-standards):
- Write clean, readable code
- Add comments for complex logic
- Follow existing code style
- Keep changes focused and atomic

### Step 4: Test Your Changes

```bash
# Run tests
npm test

# Test in browser
npm run dev

# Build to verify
npm run build
```

### Step 5: Commit Your Changes

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add new indicator"
```

**Commit types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `perf` - Performance
- `test` - Tests
- `chore` - Maintenance

**Examples**:
```bash
feat(indicators): add Bollinger Bands indicator
fix(chart): resolve canvas memory leak
docs(api): update Chart class documentation
test(overlays): add unit tests for overlay rendering
```

### Step 6: Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then:
1. Go to GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Submit the pull request

## Pull Request Guidelines

### PR Title

Follow commit message format:
```
feat(indicators): add VWAP indicator
```

### PR Description

Include:

**Description**:
- What changes were made
- Why the changes are needed
- How it was implemented

**Testing**:
- How you tested the changes
- Test cases covered
- Screenshots/GIFs (if applicable)

**Checklist**:
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No breaking changes (or documented)

### PR Review Process

1. **Automated checks** - CI/CD runs tests
2. **Code review** - Maintainers review your code
3. **Feedback** - Address any requested changes
4. **Approval** - PR is approved by maintainers
5. **Merge** - Your contribution is merged!

## Code Standards

### JavaScript Style

**Use modern JavaScript**:
```javascript
// Good
const data = [...array]
const { x, y } = point
const result = array.map(item => item.value)

// Avoid
var data = array.slice()
var x = point.x
var result = array.map(function(item) { return item.value })
```

**Naming conventions**:
```javascript
// Variables and functions: camelCase
const chartData = []
function calculateAverage() {}

// Classes: PascalCase
class ChartIndicator {}

// Constants: UPPER_SNAKE_CASE
const MAX_CANDLES = 10000

// Private members: prefix with _
class Chart {
  constructor() {
    this._privateData = []
  }
}
```

### Documentation

**JSDoc for public APIs**:
```javascript
/**
 * Calculate Simple Moving Average
 * @param {number[]} data - Array of values
 * @param {number} period - Period length
 * @returns {number[]} SMA values
 * @example
 * const sma = calculateSMA([1, 2, 3, 4, 5], 3)
 */
export function calculateSMA(data, period) {
  // Implementation
}
```

### Testing

**Write tests for new features**:
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
})
```

## Documentation Contributions

### Documentation Structure

```
docs/
├── guides/          # User guides and tutorials
├── reference/       # API reference and technical docs
├── examples/        # Code examples
└── api/            # Auto-generated API docs
```

### Writing Documentation

**Be clear and concise**:
- Use simple language
- Provide examples
- Include code snippets
- Add screenshots when helpful

**Follow the style**:
- Use Markdown formatting
- Include frontmatter (title, description)
- Cross-reference related docs
- Keep consistent structure

**Example documentation**:
```markdown
---
title: Adding Indicators
description: Learn how to add technical indicators to your chart
---

# Adding Indicators

Technical indicators help analyze price movements.

## Basic Usage

```javascript
// Add an indicator
chart.addIndicator('RSI', { period: 14 })
```

## Available Indicators

- **RSI** - Relative Strength Index
- **MACD** - Moving Average Convergence Divergence
- **EMA** - Exponential Moving Average

See [Indicators Reference](../reference/indicators) for the complete list.
```

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful** - Treat everyone with respect
- **Be constructive** - Provide helpful feedback
- **Be patient** - Help newcomers learn
- **Be collaborative** - Work together toward common goals

### Communication Channels

**GitHub Issues**:
- Bug reports
- Feature requests
- Technical discussions

**Discord**:
- General questions
- Community support
- Real-time discussions
- [Join our Discord](https://discord.gg/6XS9tDrcdq)

**GitHub Discussions**:
- Long-form discussions
- Ideas and proposals
- Q&A

## Recognition

We value all contributions:

### Contributors List
- All contributors are listed in [CONTRIBUTORS.md](https://github.com/tradex-app/TradeX-chart/blob/main/CONTRIBUTORS.md)
- Your GitHub profile will be linked

### Release Notes
- Significant contributions are mentioned in release notes
- Credit is given for features and fixes

### Community Spotlight
- Outstanding contributors may be featured
- Share your work on social media

## Legal

### License

By contributing, you agree that your contributions will be licensed under the [GNU GPL3 License](https://github.com/tradex-app/TradeX-chart/blob/main/LICENSE).

### Copyright

- You retain copyright of your contributions
- You grant TradeX Chart the right to use your contributions
- Your contributions must be your original work

### Contributor License Agreement

For significant contributions, we may ask you to sign a Contributor License Agreement (CLA).

## Resources

### Documentation

- [Local Setup](development/local-setup) - Set up development environment
- [Build Process](development/build-process) - Understand the build system
- [Contributing Code](development/contributing-code) - Detailed code guidelines
- [Debugging Tips](development/debugging-tips) - Debug techniques

### Learning Resources

- [Architecture](../reference/architecture) - Understand the codebase
- [API Reference](../api/core) - Complete API documentation
- [Examples](../examples/01_static_chart) - Code examples
- [FAQ](faq) - Common questions

### External Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Git Best Practices](https://git-scm.com/book/en/v2)

## Getting Help

### Stuck?

**Ask for help**:
- Comment on the issue you're working on
- Ask in [Discord #development](https://discord.gg/6XS9tDrcdq)
- Tag maintainers for guidance

**Common questions**:
- "How do I set up my environment?" - See [Local Setup](development/local-setup)
- "How do I run tests?" - Run `npm test`
- "Where should I add my code?" - Check the [architecture docs](../reference/architecture)
- "How do I debug?" - See [Debugging Tips](development/debugging-tips)

### Need Maintainer Input?

**When to ask**:
- Before starting major changes
- When unsure about approach
- If blocked on technical decisions
- For architectural questions

**How to ask**:
- Be specific about your question
- Provide context and background
- Show what you've tried
- Suggest possible solutions

## Thank You!

Thank you for contributing to TradeX Chart! Your contributions help make this project better for everyone.

### First Time Contributors

Welcome! We're excited to have you:
- Don't be afraid to ask questions
- Start with small contributions
- Learn from code reviews
- Join our community on Discord

### Experienced Contributors

Thank you for your continued support:
- Help mentor new contributors
- Review pull requests
- Share your expertise
- Lead by example

## Next Steps

1. **Set up your environment** - Follow the [Local Setup Guide](development/local-setup)
2. **Find an issue** - Browse [good first issues](https://github.com/tradex-app/TradeX-chart/labels/good%20first%20issue)
3. **Join Discord** - Connect with the community
4. **Make your first contribution** - Start small and learn
5. **Keep contributing** - Become a regular contributor

Happy coding! 🚀