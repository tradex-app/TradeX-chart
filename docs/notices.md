# Notices

## Potentially Breaking Changes

Changes to the config format will impact your current config files. Please update to the new format.
```javascript
const config = {
  range: {
    startTS: rangeStartTS,  // formerly rangeStartTS
    initialCnt: 30,    // formerly rangeLimit
  }
}
```
``rangeStartTS`` has been renamed and moved into ``range.startTS``
``rangeLimit`` has been renamed and moved into ``initialCnt``

The intention is to minimize occurrence of such changes, but every once in a while, since the chart is still in development, it makes sense in light of future development paths to do so.