# State Machine

TradeX-chart takes a good deal of inspiration from the excellent [XState project](https://xstate.js.org/) for it's internal finite state machine.

Why reinvent the wheel? While XState does offer a cut down version of it's library, the aim of TradeX-chart is to have as few external dependencies as possible. Writing a custome state machine also allows for the selective implementation of required features, thus keeping the overhead down.

[https://www.itemis.com/en/yakindu/state-machine/documentation/user-guide/quick_ref](https://www.itemis.com/en/yakindu/state-machine/documentation/user-guide/quick_ref)

# API

## constructor(config, mediator)

```javascript
let stateMachine = new StateMachne(config, mediator)
```

@param {object} config - state machine

@param {instance} mediator - instance of TradeX-chart internal module
