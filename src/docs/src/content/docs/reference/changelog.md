---
title: Changelog
description: Version history and release notes for TradeX Chart
---

# Changelog

Track the evolution of TradeX Chart through our version history and release notes.

## Current Version

**v0.158.6** - Latest stable release

## Versioning

TradeX Chart follows [Semantic Versioning](https://semver.org/) with the format:

```
[breaking].[feature].[fix]
```

- **Breaking changes** - Major version increment (e.g., 1.0.0)
- **New features** - Minor version increment (e.g., 0.143.0)
- **Bug fixes** - Patch version increment (e.g., 0.158.6)

## Recent Releases

### [v0.158.6](https://github.com/tradex-app/TradeX-chart/releases) (Current)

Latest published version with documentation improvements and bug fixes.

### [v0.143.0](https://github.com/tradex-app/TradeX-chart/releases)

**Added**
- Indicator configuration dialogue

### [v0.139.0](https://github.com/tradex-app/TradeX-chart/releases)

**Added**
- Chart pane collapse/expand functionality

**Fixed**
- Export chart snapshot with main pane positioning
- Divider line color in exports
- Menu positioning on resize
- Divider styling improvements

### [v0.138.0](https://github.com/tradex-app/TradeX-chart/releases)

**Added**
- AROON indicator
- Enhanced documentation

**Updated**
- Indicator legend controls
- Chart pane legend controls with icon hover highlights

**Fixed**
- AROON indicator legends nicePrice() formatting
- Chart pane pairs resize (divider)

## Full Changelog

For a complete version history with all changes, see:

- **[GitHub Releases](https://github.com/tradex-app/TradeX-chart/releases)** - Detailed release notes
- **[CHANGELOG.md](https://github.com/tradex-app/TradeX-chart/blob/master/CHANGELOG.md)** - Complete version history

## Release Channels

### Stable
Production-ready releases available via:
- [NPM](https://www.npmjs.com/package/tradex-chart)
- [GitHub Releases](https://github.com/tradex-app/TradeX-chart/releases)
- [CDN (jsDelivr)](https://cdn.jsdelivr.net/npm/tradex-chart/dist/tradex-chart.umd.min.js)
- [CDN (unpkg)](https://unpkg.com/tradex-chart/dist/tradex-chart.umd.js)

### Development
Latest development builds:
- [GitHub master branch](https://github.com/tradex-app/TradeX-chart)

## Breaking Changes

When upgrading between major versions, review breaking changes:

### Future v1.0.0
API will be finalized and stabilized. Current v0.x releases may include breaking changes between minor versions during active development.

## Migration Guides

When significant changes occur, migration guides will be provided:

- Check release notes for migration instructions
- Review [API documentation](../api/core) for updated methods
- Test thoroughly in development before upgrading production

## Stay Updated

### Watch for Updates
- ⭐ [Star the repository](https://github.com/tradex-app/TradeX-chart) on GitHub
- 👀 [Watch releases](https://github.com/tradex-app/TradeX-chart/releases) for notifications
- 💬 Join the [Discord community](https://discord.gg/6XS9tDrcdq)

### Subscribe to Releases
```bash
# Using npm
npm info tradex-chart version

# Check for updates
npm outdated tradex-chart
```

## Contributing

Help improve TradeX Chart:

- 🐛 [Report bugs](https://github.com/tradex-app/TradeX-chart/issues)
- 💡 [Request features](https://github.com/tradex-app/TradeX-chart/issues)
- 🔧 [Submit pull requests](https://github.com/tradex-app/TradeX-chart/pulls)
- 📖 [Improve documentation](https://github.com/tradex-app/TradeX-chart/tree/master/docs)

## Release Notes Format

Each release includes:

**Added** - New features and capabilities

**Changed** - Changes to existing functionality

**Deprecated** - Features that will be removed in future versions

**Removed** - Features that have been removed

**Fixed** - Bug fixes and corrections

**Security** - Security-related updates

## Version Support

### Current Support
- **Latest version (0.158.x)** - Full support with active development
- **Previous minor (0.157.x)** - Critical bug fixes only
- **Older versions** - No active support, upgrade recommended

### Browser Support
TradeX Chart targets browsers supporting [ECMAScript 2022](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/):

- Chrome/Edge 94+
- Firefox 93+
- Safari 15.4+
- Opera 80+

## Related Documentation

- [Getting Started](01_getting_started) - Installation and setup
- [Configuration](02_configuration) - Chart configuration options
- [API Reference](../api/core) - Complete API documentation
- [Migration Guide](index#bugs-issues-and-feature-requests) - Upgrading between versions