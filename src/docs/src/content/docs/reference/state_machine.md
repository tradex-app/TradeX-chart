---
title: State Machine
---

TradeX-chart implements a [State Machine](https://www.itemis.com/en/products/itemis-create/documentation/user-guide/overview_what_are_state_machines?hsLang=de) for management of some of it's internal states.

A good deal of inspiration from the excellent [XState project](https://xstate.js.org/) for it's internal finite state machine.

Why reinvent the wheel? While XState does offer a cut down version of it's library, the aim of TradeX-chart is to have as few external dependencies as possible. Writing a custom state machine also allows for the selective implementation of required features, thus keeping the overhead down.

## Accessing the State Machine

You too can leverage the power of a State Machine via the ``class StateMachine`` exported by the chart.

```javascript
import {StateMachine} from "tradex-chart"
```

## Using the State Machine

```javascript
let stateMachine = new StateMachine(config, context)
```

@param {Object} config - state machine definition  
@param {Object} context - reference to instance that the state machine operates on

The definition context **must** provide a reference, ``context.core`` to the chart instance, as the chart provides the emitter and listener functionality for the events that trigger state transition.

```javascript
context.core = chart
```

## State Machine Definition (config)

The state machine definition is an object that requires the minimum properties:

* id {string} - identifier
* initial {string} - initial state
* context {Object} - reference to instance that the state machine operates on
* states {Object} - states (functions), that will only execute and progress to the next when condition is met.

### Optional State Machine Definition Properties

* guards {Object} - logical test functions
* actions {Object} - functions

## Example Definition

```javascript
const definiton = {
  id: "main",
  initial: "idle",
  context: {},
  states: {

  }
}
```
:::note
[The States used by the chart](https://github.com/tradex-app/TradeX-chart/tree/master/src/state) can be for practical reference.
:::

## Further Reading on State Machines

[https://www.itemis.com/en/yakindu/state-machine/documentation/user-guide/quick_ref](https://www.itemis.com/en/yakindu/state-machine/documentation/user-guide/quick_ref)