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

The state definition ``config.state``, which provides data to the chart has two changes.

``state.onchart`` has been renamed to ``state.primary``
``state.offchart`` has been renamed to ``state.secondary``

The intention is to minimize occurrence of such changes, but every once in a while, since the chart is still in development, it makes sense to do so in light of future development paths.