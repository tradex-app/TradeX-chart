// chart-drawingTools.js
// display drawings and tools on the chart for your confirmtion bias over the price

import Overlay from "./overlay"
import Graph from "../views/classes/graph";
import { HIT_DEBOUNCE } from "../../definitions/core";
import { isArray, isArrayOfType, isClass, isObject, isString } from "../../utils/typeChecks";
import { doStructuredClone, debounce, idSanitize, uid, xMap } from "../../utils/utilities"
import ToolNode, { NodeState } from "../primitives/node";
import StateMachine from "../../scaleX/stateMachine";
import RenderLoop from "../views/classes/renderLoop";
import { limit } from "../../utils/number";


const toolsDialogue = {
  bounded: true,
  dragBar: false,
  closeIcon: false,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
}

const nodeList = {
  definitions: [],
  instances: [],
  idle: [],
  active: [],
  selected: [],
  done: [],
  tracking: new xMap()
}

// Provides host overlay for ChartPane tools

export default class ChartToolsHost extends Overlay {

  static #cnt = 0
  static get inCnt() { return ChartToolsHost.#cnt++ }

  #id
  #inCnt
  #name = "Chart Tool Host"
  #shortName = "TX_ChartToolsHost"
  #type = "tool"
  #chartPane
  #graph
  #renderLoop
  #pointer = {
    click: [0, 0],
    pos: [0, 0],
  }
  #activeTool = {
    instance: undefined,
    state: undefined,
    nodeList: doStructuredClone(nodeList)
  }
  #toolSelections = []


  /**
   * Creates an instance of ChartToolsHost.
   * @param {object} target - CEl Layer instance
   * @param {boolean} [xAxis=false]
   * @param {boolean} [yAxis=false]
   * @param {object} theme - 
   * @param {object} parent - overlay host / parent
   * @param {object} params - data to configure overlaysHost
   */
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#inCnt = ChartToolsHost.inCnt
    this.settings = params?.settings || {}
    this.#chartPane = params.chart
    this.#graph = new Graph(this, parent.parent.elViewport, [], true)

    const renderLoopConfig = {
      graphs: this.#graph,
      range: this.range,
      core: this.core
    }
    this.#renderLoop = new RenderLoop(renderLoopConfig)

    toolsDialogue.parent = this

    this.eventsListen()
  }

  destroy() {
    this.clearToolSelections()

    const tools = Object.values(this.tools)
    tools.forEach((tool) => {
      this.remove(tool)
      tool.destroy() 
    })

    this.#activeTool = null

    super.destroy()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.#shortName)}_${this.#inCnt}` }
  get type() { return this.#type }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get chartPane() { return this.#chartPane }
  get graph() { return this.#graph }
  get elCanvas() { return this.graph.viewport.scene.canvas }
  get tools() { return this.overlays}
  get renderLoop() { return this.#renderLoop }
  get overlays() { return Object.fromEntries([...this.graph.overlays.list]) }
  get activeTool() { return this.#activeTool }
  get pointer() { return this.#pointer }

  /**
   * Emit a global and Chart Pane specific message
   * @param {string} msg 
   * @param {*} data 
   */
  emitMsg(msg, data) {
    if (!isString(msg)) return

    this.emit(msg, data)
    this.emit(`chart${this.#chartPane.id}_${msg}`, data)
  }

  eventsListen() {
    // const core = this.core
    // const chart = this.chartPane
    // core.on(`${chart.id}_pointerMove`, this.onPointerMove, this)
    // core.on(`${chart.id}_pointerDown`, this.onPointerDown, this)
    // core.on(`${chart.id}_pointerUp`, this.onPointerUp, this)
  }

  // onPointerMove(e) {
  //   this.#pointer.pos = e
  // }

  // onPointerDown(e) {
  //   // this.#pointer.click = e
  //   // this.draw()
  // }

  /**
   * add Tool to Chart Pane
   * Validates the tool class, creates an instance, and sets it as active
   * 
   * @param {object} tool - Tool configuration object
   * @param {Function} tool.class - Tool class constructor
   * @param {object} [tool.params] - Tool parameters
   * @param {object} [cfg={}] - Additional configuration options
   * @param {string} [cfg.id] - Custom tool ID
   * @returns {Overlay|null} The created tool instance or null if failed
   */
  add(tool, cfg={}) {

    if (!isClass(tool.class) || !tool.class.isTool ) {
      this.core.error(`Cannot add tool: not a valid tool.`)
      return null
    }

    try {
      let cnt = ++ChartToolsHost.#cnt
      tool.parent = this
      tool.params = (isObject(tool.params)) ?
        {...tool.params, ...cfg} :
        cfg
      tool.params.chartPane = this.#chartPane
      let key = cfg?.id || tool?.params.id || `Tool-${tool.class.prototype.constructor.name}-${cnt}`
  
      let instance = this.#graph.addOverlay(key, tool)
      let active = this.#activeTool
      active.instance = instance
      active.nodeList = instance.nodeList
      active.state = instance.stateMachine

      this.emitMsg('toolAdded', tool)
  
      return instance
    } 
    catch (error) {
      this.core.error('Failed to add tool:')
      this.core.error(error)
      return null
    }

  }

  /**
   * Removes a tool from the chart pane
   * Handles cleanup of editing, active, and selected states before removal
   * 
   * @param {ChartTool} tool - The tool instance to remove
   * @returns {boolean} True if successfully removed, false otherwise
   */
  remove(tool) {
    if (!tool || !tool?.isTool || !tool?.destroy) return false

    if (tool.isEditing) this.toolEditDone(tool)
    if (tool.isActive) this.deactivateTool(tool)
    if (tool.isSelected) this.deselectTool(tool)

    tool.destroy()
    delete this.tools[tool.id]
    this.emitMsg('toolRemoved', tool)
    
    return true
  }

  /**
   * Activates a tool, making it the current active tool
   * Deactivates any previously active tool and manages selection state
   * 
   * @param {ChartTool} tool - The tool to activate
   * @returns {boolean} True if successfully activated, false otherwise
   */
  activateTool(tool) {
    if (!tool || !tool?.isTool) return false
    if (tool.isActive) return true

    // Clean up selections
    let selections = this.#toolSelections
    if (this.#toolSelections.length == 1) {
      this.deselectTool(selections[0])
      selections.length = 0
    }

    if (!!this.#activeTool.instance) {
      this.deselectTool(this.#activeTool.instance)
      this.deactivateTool(this.#activeTool.instance)
    }
    
    // Set new active tool
    this.#activeTool = {
      instance: tool,
      state: tool.stateMachine,
      nodeList: { ...tool.nodeList }  // Shallow copy to avoid reference issues
    }
    
    tool.isActive = true
    tool.isSelected = true
    this.emitMsg('toolActivated', tool)

    return true
  }
  
  /**
   * Deactivates a tool, removing it from active state
   * 
   * @param {ChartTool} tool - The tool to deactivate
   * @returns {boolean} True if successfully deactivated, false otherwise
   */
  deactivateTool(tool) {
    if (!tool || !tool?.isTool) return false
    if (!tool.isActive) return true

    tool.isActive = false
    this.emitMsg('toolDeactivated', tool)

    return true
  }

  /**
   * Selects a tool for interaction
   * 
   * @param {ChartTool} tool - The tool to select
   * @returns {boolean} True if successfully selected, false otherwise
   */
  selectTool(tool) {
    if (!tool || !tool?.isTool) return false
    if (tool.isSelected) return true
    
    // Clear previous selections
    // this.clearToolSelections()
    
    // Mark as selected
    tool.isSelected = true
    this.emitMsg('toolSelected', tool)

    return true
  }

  /**
   * Deselects a tool and deactivates it
   * 
   * @param {ChartTool} tool - The tool to deselect
   * @returns {boolean} True if successfully deselected, false otherwise
   */
  deselectTool(tool) {
    if (!tool || !tool?.isTool) return false
    if (!tool.isSelected) return true

    tool.isSelected = false
    this.deactivateTool(tool)
    this.emitMsg('toolDeselected', tool)

    return true
  }

  /**
   * Adds a tool to the multi-selection array
   * Allows multiple tools to be selected simultaneously
   * 
   * @param {ChartTool} tool - The tool to add to multi-selection
   * @returns {boolean} True if added to selection, false if already selectedsHost
   */
  multiSelectTools(tool) {
    if (!tool || !tool?.isTool) return false

    const selection = this.#toolSelections.find((selected) => selected === tool)
    if (!!selection) return true

    this.selectTool(tool)
    this.#toolSelections.push(tool)
    return true
  }

  /**
   * Clears all tool selections
   * Deselects all tools in the selection array and empties the array
   */
  clearToolSelections() {
    this.#toolSelections.forEach((tool) => {
      this.deselectTool(tool)
    })
    this.#toolSelections.length = 0
  }
  
  /**
   * Puts a tool into edit mode
   * Allows the tool to be modified or configured
   * 
   * @param {ChartTool} tool - The tool to edit
   * @returns {boolean} True if successfully entered edit mode, false otherwise
   */
  editTool(tool) {
    if (!tool || !tool?.isTool) return false
    if (tool.isEditing) return true
    
    tool.isEditing = true
    this.emitMsg('toolEditStarted', tool)

    return true
  }

  /**
   * Exits edit mode for a tool
   * Completes the editing session and returns tool to normal state
   * 
   * @param {ChartTool} tool - The tool to finish editing
   * @returns {boolean} True if successfully exited edit mode, false otherwise
   */
  toolEditDone(tool) {
    if (!tool || !tool?.isTool) return false
    if (!tool.isEditing) return true
    
    tool.isEditing = false
    this.emitMsg('toolEditDone', tool)

    return true
  }

  /**
   * Gets all tools managed by this host
   * 
   * @returns {Array<ChartTool>} Array of all tool instances
   */
  getAll () { 
    return Object.values(this.tools) 
  }

  /**
   * Gets a tool by its unique identifier
   * 
   * @param {string} ID - The tool's unique identifier
   * @returns {ChartTool|null} The tool instance or null if not found
   */
  getByID (ID) {
    if (!ID || typeof ID !== 'string') return null
    return this.getAll().find((tool) => tool.id === ID)
  }

  /**
   * Gets all tools of a specific type
   * 
   * @param {string} type - The tool type to filter by (shortName)
   * @returns {Array<ChartTool>} Array of tools matching the type, or all tools if type is invalid
   */
  getByType (type) {
    if (!type || !isString(type)) return this.getAll()
    else return this.getAll().filter((tool) => tool.shortName === type)
  }

  /**
   * Renders the tool host and all its tools
   * Draws the graph, clears the scene, and composites the tool overlays
   */
  render() {
    this.draw()
    this.graph.render();

    const scene = this.scene
    scene.clear()
    const ctx = this.scene.context

    ctx.save();

    ctx.scale(1,1)
    ctx.drawImage(
      this.graph.viewport.scene.canvas,
      0,
      0,
      this.graph.viewport.width,
      this.graph.viewport.height
    );
    // let node = new ToolNode(undefined, this.#pointer.click[0], this.#pointer.click[1], {}, this.scene.layer, this.chart)
    // node.draw()

    ctx.restore()

    this.target.viewport.render()
  }

  /**
   * Draws all tools within the specified range
   * Delegates drawing to the graph instance
   * 
   * @param {Range} [range=this.range] - The time/price range to draw
   * @param {boolean} [update=false] - Whether to force an update
   */
  draw(range=this.range, update=false) {
      this.graph.draw(range, update)
  }
}



/**
 * Base class for all chart drawing tools, handling node management, state tracking,
 * event handling, and rendering. Tools inherit from this class to implement
 * specific drawing functionality for drawing nodes
 * 
 * @class ChartTool
 * @extends {Overlay}
 * @abstract
 */
export class ChartTool extends Overlay {

  /** @type {number} - Static counter for instance tracking across all tools */
  static #cnt = 0
  static get inCnt() { return ChartTool.#cnt++ }
  static #instances = {}
  static isOverlay = true
  static isTool = true
  

  #id
  /** @type {number} - Instance counter for specific tool type */
  #inCnt
  #name = "Chart Tool"
  #shortName = "TX_Tool"
  #stateMachine
  #configDialogue
  #chartPane
  #cursorPos = [0, 0]
  #boundingBox = {TL: [0,0], BR: [0,0]}
  #nodeList = doStructuredClone(nodeList)
  #active = false
  #selected = false
  #editing = false

  /**
   * Creates an instance of ChartTool
   * Initializes the tool with node management, event listeners, and configuration dialogue
   * 
   * @param {object} target - CEL Layer instance for rendering
   * @param {boolean} [xAxis=false] - Whether to include x-axis in calculations
   * @param {boolean} [yAxis=false] - Whether to include y-axis in calculations
   * @param {object} theme - Theme configuration object
   * @param {ChartToolsHost} parent - Tool host that manages this tool
   * @param {object} params - Configuration parameters
   * @param {string} [params.id] - Custom tool identifier
   * @param {object} params.chartPane - Chart pane instance
   * @param {object} [params.settings] - Tool-specific settings
   */
  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    super(target, xAxis, yAxis, theme, parent, params)

    this.#inCnt = ChartTool.inCnt
    this.id = params?.id || `${this.core.ID}-${uid(this.shortName)}_${this.inCnt}`
    this.#configDialogue = this.core.WidgetsG.insert("ConfigDialogue", toolsDialogue)
    this.#configDialogue.start()
    this.#chartPane = params.chartPane
    this.#cursorPos = this.parent.pointer || [0, 0]

    this.instantiateNodes()
    this.eventsListen()
  }

  /**
   * Destroys the tool and cleans up all resources
   * Removes event listeners, destroys nodes, and cleans up the configuration dialogue
   */
  destroy() {
    // Clean up event listeners
    const chart = this.chartPane
    this.core.off(`${chart.id}_pointerMove`, this.onPointerMove, this)
    this.core.off(`${chart.id}_pointerDown`, this.onPointerDown, this)
    this.core.off(`${chart.id}_pointerUp`, this.onPointerUp, this)
    this.core.off(`${chart.id}_pointerDrag`, this.onPointerDrag, this)
    
    // Clean up nodes and references
    this.cleanupNodes()
    
    // Clean up dialogue
    if (this.#configDialogue) {
      this.#configDialogue.destroy()
    }

    super.destroy()
  }

  set id(id) { this.#id = idSanitize(id) }
  get id() { return this.#id || `${this.core.ID}-${uid(this.shortName)}_${this.inCnt}` }
  get inCnt() { return this.#inCnt }
  get name() {return this.#name}
  get shortName() { return this.#shortName }
  get settings() { return this.params.settings }
  set settings(s) { this.validateSettings(s) }
  set position(p) { this.target.setPosition(p[0], p[1]) }
  get data() { return this.overlay.data }
  set stateMachine(config) { this.#stateMachine = new StateMachine(config, this) }
  get stateMachine() { return this.#stateMachine }
  get isTool() { return true }
  get isInRange() { return this.isToolInRange() }
  set isActive(a) { this.setToolActive(a) }
  get isActive() { return this.#active }
  set isSelected(s) { this.setToolSelected(s) }
  get isSelected() { return this.#selected }
  set isEditing(e) { this.setToolEditing(e) }
  get isEditing() { return this.#editing }
  get chartPane() { return this.#chartPane }
  get nodeList() { return this.#nodeList }

  /**
   * Instantiates tool nodes based on node definitions
   * Creates ToolNode instances for each definition and sets up tracking
   * 
   * @throws {Error} Throws error if node instantiation fails, causing tool creation to fail
   */
  instantiateNodes() {
    try {
      this.#nodeList.definitions = (isArrayOfType(this.nodeDefinitions, "object") )? this.nodeDefinitions : []
      if (!this.#nodeList.definitions.length) return
  
      for (let node of this.#nodeList.definitions) {
        let instance = new ToolNode(
          node?.id, 
          0, 
          0, 
          node?.constraint, 
          node?.tracking,
          this.scene.layer, 
          this.chart
        )
        this.#nodeList.instances.push(instance)
      }
      this.nodeTracking()
    } catch (error) {
      let msg = 'Failed to instantiate ChartTool nodes'
      this.core.error(msg, error)
      throw new Error(msg, { cause: error })
      // cause ChartTool instantiateion to fail
    }
  }

  /**
   * Sets up node tracking relationships
   * Maps node instances to their tracking dependencies based on definitions
   */
  nodeTracking() {
    const nodes = this.#nodeList
    const definitions = this.nodeDefinitions

    for (let instance of nodes.instances) {
      let id = instance.id
      let tracking = []

      for (let node of definitions) {
        if (node.id !== id) continue

        tracking.push(this.getNodeByID(id))
      }
      nodes.tracking.set(instance, tracking)
    }
  }
  
  /**
   * Cleans up all node instances and references
   * Destroys each node and nullifies the node list
   * 
   */
  cleanupNodes() {
    Object.values(this.#nodeList.instances).forEach(node => {
      node.destroy()
    })
    this.#nodeList = null
  }

  /**
   * Sets up event listeners for chart pointer events
   * Listens for move, down, up, and drag events with debouncing on pointer down
   * 
   */
  eventsListen() {
    const chart = this.chartPane
    this.core.on(`${chart.id}_pointerMove`, this.onPointerMove, this)
    this.core.on(`${chart.id}_pointerDown`, debounce(this.onPointerDown, HIT_DEBOUNCE * 10, this, true), this)
    this.core.on(`${chart.id}_pointerUp`, this.onPointerUp, this)
    this.core.on(`${chart.id}_pointerDrag`, this.onPointerDrag, this)
  }

  /**
   * Handles pointer move events
   * Override in subclasses to implement tool-specific move behavior
   * 
   * @param {Array} pos - Pointer position [x, y, event]
   */
  onPointerMove(pos) {
    if (this.chartPane.stateMachine.state === "chart_pan") return
  }

  /**
   * Handles pointer down events
   * Manages tool activation, node placement, and state changes
   * Includes filtering for repeat events and chart panning states
   * 
   * @param {Array} pos - Pointer position [x, y, event]
   */
  onPointerDown(pos) {
    if (
      // hack to filter out repeat pointer events... source as of yet unknown
      (this.oldPos === pos[2]) ||
      (this.core.MainPane.stateMachine.state === "chart_pan") ||
      (!this.isToolInRange()) ||
      (!this.isToolPointerSelected(pos) && !this.isToolIncomplete())
    ) {
      this.#active = false
      return
    }

    this.oldPos = this.#cursorPos
    this.#cursorPos = pos
    
    if (!this.isToolNodeSelected(pos) && this.isToolIncomplete()) {
      this.addToolNode()
    }

    this.setToolActive(true)
  }

  /**
   * Handles pointer up events
   * Override in subclasses to implement tool-specific release behavior
   * 
   * @param {Array} pos - Pointer position [x, y, event]
   */
  onPointerUp(pos) {
    // Reset any temporary states
  }

  /**
   * Handles pointer drag events
   * Override in subclasses to implement tool-specific drag behavior
   * 
   * @param {Array} pos - Pointer position [x, y, event]
   */
  onPointerDrag(pos) {

  }

  /**
   * Determine if tool is in (visible) time and price range
   * Tests if the tool's bounding box intersects with the current viewport
   * 
   * @param {Range} [range=this.range]
   * @returns {boolean} True if tool is visible in the given range
   */
  isToolInRange(range=this.range) {

    // test if tool is in time range boundaries
    // test if tool is in price range boundaries Range price max min
    return true
  }

  /**
   * Determine if tool is selected by pointer event
   * Checks if the pointer coordinates intersect with any part of the tool
   * 
   * @param {array} e - pointer event [x, y]
      * @returns {boolean} True if pointer intersects with tool
   */
  isToolPointerSelected(e) {
    const [x, y, k] = this.getHitIntersection(e)
    return k !== -1
  }

  /**
   * Check if browser pointer coordinates intersect with tool nodes
   * Tests each node instance for intersection with the pointer position
   * 
   * Check if browser pointer coordinates intersect with tool nodes
   * @param {array} e - original pointer event array [x, y, event]
   * @returns {ToolNode | boolean} - Tool Node instancte or false
   */
  isToolNodeSelected(e) {
    const n = this.#nodeList
    const [x, y, k] = this.getHitIntersection(e)

    if (k == -1) return false

    n.selected = []

    for (let o of n.instances) {
      if (o.hitV === k) {
        n.selected.push(o)
        return o
      }
    }
    return false
  }

  /**
   * Have all of the tool's nodes been placed?
   * Compares the number of completed nodes to the total required
   * 
   * @returns {boolean} True if tool still needs more nodes to be complete
   */
  isToolIncomplete() {
     return this.#nodeList.done.length < this.#nodeList.definitions.length
  }

  /**
   * Check if the tool is visible within the specified range
   * Alias for isToolInRange for consistency with overlay interface
   * 
   * @param {Range} range - time Range instance
   * @returns {boolean}
   */
  isVisible(range=this.range) {
    return this.isToolInRange(range)
  }

  /**
   * Convert browser pointer coordinates to canvas coordinates
   * @param {array} e - original pointer event array [x, y, event]
   * @returns {Array} - [x, y]
   */
  convertPointerToCanvasXY(e) {
    let evt = e[2].domEvent.srcEvent
    let DOM = (evt.target || evt.srcElement).getBoundingClientRect()
    let x = evt.clientX - (DOM.right - DOM.width)
    let y = evt.clientY - DOM.top
    return [x, y]
  }

  /**
   * Check if pointer event coordinates intersects with the Hit Layer
   * Uses the hit detection layer to determine intersection values
   * @param {array} e - original pointer event array [x, y, event]
   * @returns {Array} - [x, y, intersectionValue] - where any value other than -1 is a hit
   */
  getHitIntersection(e) {
    let [x, y] = this.convertPointerToCanvasXY(e)
    let k = this.hit.getIntersection(x, y)
    return [x, y, k]
  }

  /**
   * Get a node instance by its unique identifier
   * Searches through the node instances to find a matching ID
   * 
   * @param {string} id - The node identifier to search for
   * @returns {ToolNode|undefined} The node instance or undefined if not found
   */
  getNodeByID(id) {
    return this.#nodeList.instances.find((node) => {return node.id === id})
  }

  // /**
  //  * Validates and applies tool settings
  //  * Merges provided settings with theme defaults
  //  * 
  //  * @param {object} s - Settings object to validate
  //  * @returns {boolean} True if settings are valid and applied
  //  * @memberof ChartTool
  //  */
  // validateSettings(s) {
  //   if (!isObject(s)) return false

  //   let t = this.theme.trades
  //   for (let e in s) {
  //     if (s[e] === undefined) continue
  //     t[e] = s[e]
  //   }
  // }

  /**
   * Sets the tool's active state and updates rendering
   * Manages state machine transitions and triggers redraw
   * 
   * @param {boolean} state - The active state to set
   */
  setToolActive(state) {
    this.#active = !!state

    // update state machine
    // if (!state)
    //   this.stateMachine.

    this.setRefresh()
    this.draw()
  }

  /**
   * Sets the tool's selected state and updates rendering
   * Manages selection state and triggers redraw
   * 
   * @param {boolean} state - The selected state to set
   */
  setToolSelected(state) {
    this.#selected = !!state

    // update state machine
    // if (!state)
    //   this.stateMachine.

    this.setRefresh()
    this.draw()
  }

  /**
   * Sets the tool's editing state
   * Manages editing mode state transitions
   * 
   * @param {boolean} state - The editing state to set
   */
  setToolEditing(state) {
    this.#editing = !!state

    // update state machine
    // if (!state)
    //   this.stateMachine.
  }

  /**
   * Add a Tool Node added to Chart Pane
   * Places a node at the current cursor position if the tool is incomplete
   * Node will rendered by this.draw()
   * 
   * @returns {boolean} - was a tool node added to Chart Pane
   */
  addToolNode() {
    let n = this.#nodeList
    let done = n.done.length
    let def = n.definitions.length
    let pos = this.#cursorPos

    if (done >= def) return false

    let idx = limit(done, 0, def - 1)
    n.instances[idx].x = pos[0]
    n.instances[idx].y = pos[1]
    n.done.push(n.instances[idx])

    return true
  }

  /**
   * Main drawing method for the tool
   * Handles visibility checks, clears canvases, and delegates to render method
   * Manages the complete draw cycle including hit detection and node rendering
   * 
   * @param {Range} [range=this.core.range] - The time/price range to draw within
   */
  draw(range=this.core.range) {

    if (this.core.config?.tools?.display === false ||
        !this.isVisible(range) ||
        !super.mustUpdate()
    ) return

    this.hit.clear()
    this.scene.clear()

    const ctx = this.scene.context
    this.render(ctx, this.scene)
    ctx.save();

    let t = this.theme.tools
    let o = this.core.rangeScrollOffset;
    let c = range.indexStart - o
    let i = range.Length + (o * 2)

    this.drawNodes()

    ctx.restore()
    
    super.updated()
  }

  /**
   * Batch node drawing operations
   * Renders all nodes that need to be drawn (done, selected, active)
   * Combines arrays to avoid duplicate drawing and improve performance
   */
  drawNodes() {
    let nodes = this.#nodeList

    const nodesToDraw = new Set([
      ...nodes.done,
      ...nodes.selected,
      ...nodes.active
    ])
    
    nodesToDraw.forEach(node => node.draw())
  }
}