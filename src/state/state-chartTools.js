import { STATE_MACHINE_ID } from "../definitions/core"

/**
 * State machine configuration for ChartTool management
 * Handles tool lifecycle, interactions, and state transitions
 */
export default {
  id: STATE_MACHINE_ID.chartTool,
  initial: "idle",
  context: {},
  
  states: {
    /**
     * Initial state - no tool selected
     */
    idle: {
      onEnter(data) {
        this.context.clearActiveTools()
        this.context.setCursor("default")
        this.context.emit("tool_idle")
      },
      
      on: {
        tool_select: {
          target: "tool_selected",
          condition: "isValidTool",
          action: "setActiveTool"
        },
        
        tool_activate: {
          target: "tool_active", 
          condition: "canActivateTool",
          action: "activateTool"
        },
        
        chart_click: "idle", // Stay idle if no tool selected
        
        escape: "idle" // Already idle
      }
    },

    /**
     * Tool selected but not yet active
     */
    tool_selected: {
      onEnter(data) {
        this.context.setSelectedTool(data.tool)
        this.context.setCursor(data.tool.cursor || "crosshair")
        this.context.showToolHint(data.tool)
        this.context.emit("tool_selected", data)
      },
      
      on: {
        tool_activate: {
          target: "tool_active",
          condition: "canActivateTool", 
          action: "activateTool"
        },
        
        chart_click: {
          target: "tool_drawing",
          condition: "isDrawingTool",
          action: "startDrawing"
        },
        
        chart_click: {
          target: "tool_active",
          condition: "isAnalysisTool",
          action: "executeAnalysis"
        },
        
        tool_deselect: {
          target: "idle",
          action: "clearSelection"
        },
        
        tool_select: {
          target: "tool_selected",
          condition: "isValidTool",
          action: "changeSelectedTool"
        },
        
        escape: {
          target: "idle",
          action: "cancelToolSelection"
        }
      }
    },

    /**
     * Tool is active and ready for interaction
     */
    tool_active: {
      onEnter(data) {
        this.context.activateSelectedTool()
        this.context.enableToolInteractions()
        this.context.emit("tool_activated", data)
      },
      
      on: {
        chart_click: [
          {
            target: "tool_drawing",
            condition: "isDrawingTool",
            action: "startDrawing"
          },
          {
            target: "tool_measuring",
            condition: "isMeasurementTool", 
            action: "startMeasurement"
          },
          {
            target: "tool_analyzing",
            condition: "isAnalysisTool",
            action: "performAnalysis"
          }
        ],
        
        chart_drag_start: {
          target: "tool_dragging",
          condition: "supportsDragging",
          action: "initiateDrag"
        },
        
        tool_complete: {
          target: "tool_completed",
          action: "completeTool"
        },
        
        tool_cancel: {
          target: "tool_selected",
          action: "cancelToolAction"
        },
        
        tool_deselect: {
          target: "idle",
          action: "deactivateAndClear"
        },
        
        escape: {
          target: "tool_selected",
          action: "cancelCurrentAction"
        }
      }
    },

    /**
     * Drawing tool in progress
     */
    tool_drawing: {
      onEnter(data) {
        this.context.startDrawingMode(data)
        this.context.createDrawingPreview()
        this.context.setCursor("crosshair")
        this.context.emit("drawing_started", data)
      },
      
      on: {
        chart_move: {
          action: "updateDrawingPreview"
        },
        
        chart_click: [
          {
            target: "tool_drawing",
            condition: "needsMorePoints",
            action: "addDrawingPoint"
          },
          {
            target: "tool_completed", 
            condition: "drawingComplete",
            action: "finalizeDrawing"
          }
        ],
        
        chart_double_click: {
          target: "tool_completed",
          condition: "canCompleteOnDoubleClick",
          action: "completeDrawingEarly"
        },
        
        drawing_point_add: {
          action: "addPointToDrawing"
        },
        
        drawing_point_remove: {
          action: "removeLastPoint"
        },
        
        tool_cancel: {
          target: "tool_active",
          action: "cancelDrawing"
        },
        
        escape: {
          target: "tool_active", 
          action: "cancelDrawing"
        },
        
        enter: {
          target: "tool_completed",
          condition: "hasMinimumPoints",
          action: "completeDrawing"
        }
      }
    },

    /**
     * Tool is being dragged/moved
     */
    tool_dragging: {
      onEnter(data) {
        this.context.enterDragMode(data)
        this.context.setCursor("move")
        this.context.emit("tool_drag_start", data)
      },
      
      on: {
        chart_drag: {
          action: "updateDragPosition"
        },
        
        chart_drag_end: {
          target: "tool_active",
          action: "completeDrag"
        },
        
        escape: {
          target: "tool_active",
          action: "cancelDrag"
        }
      }
    },

    /**
     * Measurement tool active
     */
    tool_measuring: {
      onEnter(data) {
        this.context.startMeasurement(data)
        this.context.showMeasurementOverlay()
        this.context.emit("measurement_started", data)
      },
      
      on: {
        chart_move: {
          action: "updateMeasurement"
        },
        
        chart_click: {
          target: "tool_completed",
          action: "completeMeasurement"
        },
        
        measurement_update: {
          action: "updateMeasurementDisplay"
        },
        
        tool_cancel: {
          target: "tool_active",
          action: "cancelMeasurement"
        },
        
        escape: {
          target: "tool_active",
          action: "cancelMeasurement"
        }
      }
    },

    /**
     * Analysis tool executing
     */
    tool_analyzing: {
      onEnter(data) {
        this.context.startAnalysis(data)
        this.context.showAnalysisProgress()
        this.context.emit("analysis_started", data)
      },
      
      on: {
        analysis_complete: {
          target: "tool_completed",
          action: "showAnalysisResults"
        },
        
        analysis_error: {
          target: "tool_active",
          action: "handleAnalysisError"
        },
        
        analysis_progress: {
          action: "updateAnalysisProgress"
        },
        
        tool_cancel: {
          target: "tool_active", 
          action: "cancelAnalysis"
        }
      }
    },

    /**
     * Tool action completed
     */
    tool_completed: {
      onEnter(data) {
        this.context.completeToolAction(data)
        this.context.saveToolResult(data)
        this.context.emit("tool_completed", data)
      },
      
      on: {
        tool_continue: {
          target: "tool_active",
          action: "prepareForNextAction"
        },
        
        tool_new: {
          target: "tool_active",
          action: "startNewToolAction"
        },
        
        tool_edit: {
          target: "tool_editing",
          condition: "isEditable",
          action: "enterEditMode"
        },
        
        tool_deselect: {
          target: "idle",
          action: "deactivateAndClear"
        },
        
        auto_continue: {
          target: "tool_active",
          condition: "shouldAutoContinue",
          action: "prepareForNextAction"
        }
      }
    },

    /**
     * Editing existing tool/drawing
     */
    tool_editing: {
      onEnter(data) {
        this.context.enterEditMode(data)
        this.context.showEditHandles()
        this.context.setCursor("pointer")
        this.context.emit("tool_edit_start", data)
      },
      
      on: {
        edit_handle_drag: {
          target: "tool_dragging",
          action: "startHandleDrag"
        },
        
        edit_complete: {
          target: "tool_completed",
          action: "saveEditChanges"
        },
        
        edit_cancel: {
          target: "tool_completed",
          action: "revertEditChanges"
        },
        
        delete_tool: {
          target: "tool_active",
          action: "deleteSelectedTool"
        },
        
        escape: {
          target: "tool_completed",
          action: "exitEditMode"
        }
      }
    },

    /**
     * Error state
     */
    error: {
      onEnter(data) {
        this.context.handleToolError(data)
        this.context.showErrorMessage(data.error)
        this.context.emit("tool_error", data)
      },
      
      on: {
        error_dismiss: {
          target: "tool_active",
          action: "clearError"
        },
        
        error_retry: {
          target: "tool_active", 
          action: "retryLastAction"
        },
        
        tool_reset: {
          target: "idle",
          action: "resetToIdle"
        }
      }
    }
  },

  // Guard conditions
  guards: {
    isValidTool(data) {
      return data.tool && this.context.isToolValid(data.tool)
    },
    
    canActivateTool(data) {
      return this.context.canActivateTool(data.tool)
    },
    
    isDrawingTool(data) {
      return this.context.isDrawingTool(data.tool || this.context.selectedTool)
    },
    
    isAnalysisTool(data) {
      return this.context.isAnalysisTool(data.tool || this.context.selectedTool)
    },
    
    isMeasurementTool(data) {
      return this.context.isMeasurementTool(data.tool || this.context.selectedTool)
    },
    
    supportsDragging(data) {
      return this.context.toolSupportsDragging(this.context.selectedTool)
    },
    
    needsMorePoints(data) {
      return this.context.drawingNeedsMorePoints()
    },
    
    drawingComplete(data) {
      return this.context.isDrawingComplete()
    },
    
    canCompleteOnDoubleClick(data) {
      return this.context.canCompleteDrawingOnDoubleClick()
    },
    
    hasMinimumPoints(data) {
      return this.context.hasMinimumDrawingPoints()
    },
    
    isEditable(data) {
      return this.context.isToolEditable(data.tool)
    },
    
    shouldAutoContinue(data) {
      return this.context.shouldAutoContinueAfterCompletion()
    }
  },

  // Actions
  actions: {
    setActiveTool(data) {
      this.context.setActiveTool(data.tool)
    },
    
    activateTool(data) {
      this.context.activateTool(data.tool || this.context.selectedTool)
    },
    
    clearSelection(data) {
      this.context.clearToolSelection()
    },
    
    changeSelectedTool(data) {
      this.context.changeSelectedTool(data.tool)
    },
    
    cancelToolSelection(data) {
      this.context.cancelToolSelection()
    },
    
    startDrawing(data) {
      this.context.startDrawing(data.position)
    },
    
    updateDrawingPreview(data) {
      this.context.updateDrawingPreview(data.position)
    },
    
    addDrawingPoint(data) {
      this.context.addDrawingPoint(data.position)
    },
    
    finalizeDrawing(data) {
      this.context.finalizeDrawing()
    },
    
    completeDrawingEarly(data) {
      this.context.completeDrawing(true)
    },
    
    addPointToDrawing(data) {
      this.context.addPointToCurrentDrawing(data.point)
    },
    
    removeLastPoint(data) {
      this.context.removeLastDrawingPoint()
    },
    
    cancelDrawing(data) {
      this.context.cancelCurrentDrawing()
    },
    
    completeDrawing(data) {
      this.context.completeCurrentDrawing()
    },
    
    initiateDrag(data) {
      this.context.initiateDrag(data.target, data.position)
    },
    
    updateDragPosition(data) {
      this.context.updateDragPosition(data.position)
    },
    
    completeDrag(data) {
      this.context.completeDrag(data.position)
    },
    
    cancelDrag(data) {
      this.context.cancelDrag()
    },
    
    startMeasurement(data) {
      this.context.startMeasurement(data.position)
    },
    
    updateMeasurement(data) {
      this.context.updateMeasurement(data.position)
    },
    
    completeMeasurement(data) {
      this.context.completeMeasurement(data.position)
    },
    
    cancelMeasurement(data) {
      this.context.cancelMeasurement()
    },
    
    updateMeasurementDisplay(data) {
      this.context.updateMeasurementDisplay(data.measurement)
    },
    
    performAnalysis(data) {
      this.context.performAnalysis(data.position)
    },
    
    startAnalysis(data) {
      this.context.startAnalysis(data.analysisType)
    },
    
    updateAnalysisProgress(data) {
      this.context.updateAnalysisProgress(data.progress)
    },
    
    showAnalysisResults(data) {
      this.context.showAnalysisResults(data.results)
    },
    
    handleAnalysisError(data) {
      this.context.handleAnalysisError(data.error)
    },
    
    cancelAnalysis(data) {
      this.context.cancelAnalysis()
    },
    
    completeTool(data) {
      this.context.completeCurrentTool()
    },
    
    cancelToolAction(data) {
      this.context.cancelCurrentToolAction()
    },
    
    deactivateAndClear(data) {
      this.context.deactivateTool()
      this.context.clearToolSelection()
    },
    
    cancelCurrentAction(data) {
      this.context.cancelCurrentAction()
    },
    
    completeToolAction(data) {
      this.context.completeToolAction(data.result)
    },
    
    saveToolResult(data) {
      this.context.saveToolResult(data.result)
    },
    
    prepareForNextAction(data) {
      this.context.prepareForNextAction()
    },
    
    startNewToolAction(data) {
      this.context.startNewToolAction()
    },
    
    enterEditMode(data) {
      this.context.enterEditMode(data.tool)
    },
    
    startHandleDrag(data) {
      this.context.startHandleDrag(data.handle, data.position)
    },
    
    saveEditChanges(data) {
      this.context.saveEditChanges()
    },
    
    revertEditChanges(data) {
      this.context.revertEditChanges()
    },
    
    deleteSelectedTool(data) {
      this.context.deleteSelectedTool()
    },
    
    exitEditMode(data) {
      this.context.exitEditMode()
    },
    
    handleToolError(data) {
      this.context.handleToolError(data.error)
    },
    
    clearError(data) {
      this.context.clearError()
    },
    
    retryLastAction(data) {
      this.context.retryLastAction()
    },
    
    resetToIdle(data) {
      this.context.resetToIdle()
    },
    
    executeAnalysis(data) {
      this.context.executeAnalysis(data.position)
    }
  }
}

/**
 * Context class for ChartTool state machine
 * Manages tool state, interactions, and business logic
 */
export class ChartToolContext {
  constructor(chart, toolManager) {
    this.chart = chart
    this.toolManager = toolManager
    this.selectedTool = null
    this.activeTool = null
    this.currentDrawing = null
    this.currentMeasurement = null
    this.currentAnalysis = null
    this.dragState = null
    this.editState = null
    this.errorState = null
    this.toolHistory = []
    this.undoStack = []
    this.redoStack = []
  }

  // Tool validation and type checking
  isToolValid(tool) {
    return tool && 
           typeof tool.id === 'string' && 
           typeof tool.type === 'string' &&
           this.toolManager.isRegistered(tool.id)
  }

  canActivateTool(tool) {
    return this.isToolValid(tool) && 
           !tool.disabled && 
           this.chart.isInteractive()
  }

  isDrawingTool(tool) {
    const drawingTypes = ['line', 'rectangle', 'circle', 'polygon', 'trendline', 'fibonacci']
    return tool && drawingTypes.includes(tool.type)
  }

  isAnalysisTool(tool) {
    const analysisTypes = ['support_resistance', 'pattern_recognition', 'volume_analysis']
    return tool && analysisTypes.includes(tool.type)
  }

  isMeasurementTool(tool) {
    const measurementTypes = ['ruler', 'price_range', 'time_range', 'angle']
    return tool && measurementTypes.includes(tool.type)
  }

  toolSupportsDragging(tool) {
    return tool && tool.capabilities && tool.capabilities.draggable !== false
  }

  isToolEditable(tool) {
    return tool && tool.capabilities && tool.capabilities.editable !== false
  }

  // Tool selection and activation
  setActiveTool(tool) {
    this.selectedTool = tool
    this.emit('tool_selection_changed', { tool })
  }

  activateTool(tool) {
    if (this.activeTool) {
      this.deactivateTool()
    }
    
    this.activeTool = tool || this.selectedTool
    this.activeTool.activate(this.chart)
    this.enableToolInteractions()
    this.emit('tool_activated', { tool: this.activeTool })
  }

  deactivateTool() {
    if (this.activeTool) {
      this.activeTool.deactivate()
      this.disableToolInteractions()
      this.activeTool = null
      this.emit('tool_deactivated')
    }
  }

  clearToolSelection() {
    this.selectedTool = null
    this.clearActiveTools()
    this.setCursor('default')
    this.emit('tool_selection_cleared')
  }

  changeSelectedTool(tool) {
    const previousTool = this.selectedTool
    this.selectedTool = tool
    this.emit('tool_selection_changed', { 
      tool, 
      previousTool 
    })
  }

  cancelToolSelection() {
    this.clearToolSelection()
    this.emit('tool_selection_cancelled')
  }

  // Drawing operations
  startDrawing(position) {
    if (!this.isDrawingTool(this.selectedTool)) return

    this.currentDrawing = {
      tool: this.selectedTool,
      points: [position],
      startTime: Date.now(),
      preview: true
    }

    this.createDrawingPreview()
    this.emit('drawing_started', { 
      drawing: this.currentDrawing,
      position 
    })
  }

  updateDrawingPreview(position) {
    if (!this.currentDrawing) return

    this.currentDrawing.currentPosition = position
    this.renderDrawingPreview(this.currentDrawing)
    this.emit('drawing_preview_updated', { 
      drawing: this.currentDrawing,
      position 
    })
  }

  addDrawingPoint(position) {
    if (!this.currentDrawing) return

    this.currentDrawing.points.push(position)
    this.updateDrawingPreview(position)
    this.emit('drawing_point_added', { 
      drawing: this.currentDrawing,
      position,
      pointIndex: this.currentDrawing.points.length - 1
    })
  }

  drawingNeedsMorePoints() {
    if (!this.currentDrawing) return false
    
    const minPoints = this.currentDrawing.tool.minPoints || 2
    return this.currentDrawing.points.length < minPoints
  }

  isDrawingComplete() {
    if (!this.currentDrawing) return false
    
    const maxPoints = this.currentDrawing.tool.maxPoints || Infinity
    const minPoints = this.currentDrawing.tool.minPoints || 2
    
    return this.currentDrawing.points.length >= minPoints &&
           this.currentDrawing.points.length >= maxPoints
  }

  canCompleteDrawingOnDoubleClick() {
    return this.currentDrawing && 
           this.currentDrawing.tool.completeOnDoubleClick !== false
  }

  hasMinimumDrawingPoints() {
    if (!this.currentDrawing) return false
    
    const minPoints = this.currentDrawing.tool.minPoints || 2
    return this.currentDrawing.points.length >= minPoints
  }

  finalizeDrawing() {
    if (!this.currentDrawing) return

    this.currentDrawing.preview = false
    this.currentDrawing.completed = true
    this.currentDrawing.endTime = Date.now()
    
    const drawing = this.saveDrawing(this.currentDrawing)
    this.addToHistory('drawing_created', drawing)
    
    this.emit('drawing_finalized', { drawing })
    this.currentDrawing = null
  }

  completeDrawing(early = false) {
    if (!this.currentDrawing) return

    if (early && !this.canCompleteDrawingOnDoubleClick()) return
    if (!early && !this.isDrawingComplete()) return

    this.finalizeDrawing()
  }

  cancelCurrentDrawing() {
    if (!this.currentDrawing) return

    this.clearDrawingPreview()
    const cancelledDrawing = this.currentDrawing
    this.currentDrawing = null
    
    this.emit('drawing_cancelled', { drawing: cancelledDrawing })
  }

  addPointToCurrentDrawing(point) {
    this.addDrawingPoint(point)
  }

  removeLastDrawingPoint() {
    if (!this.currentDrawing || this.currentDrawing.points.length <= 1) return

    const removedPoint = this.currentDrawing.points.pop()
    this.updateDrawingPreview(this.currentDrawing.currentPosition)
    
    this.emit('drawing_point_removed', { 
      drawing: this.currentDrawing,
      removedPoint,
      pointIndex: this.currentDrawing.points.length
    })
  }

  // Drag operations
  initiateDrag(target, position) {
    this.dragState = {
      target,
      startPosition: position,
      currentPosition: position,
      startTime: Date.now()
    }

    this.emit('drag_initiated', { 
      target, 
      position,
      dragState: this.dragState 
    })
  }

  updateDragPosition(position) {
    if (!this.dragState) return

    this.dragState.currentPosition = position
    this.dragState.delta = {
      x: position.x - this.dragState.startPosition.x,
      y: position.y - this.dragState.startPosition.y
    }

    this.renderDragPreview(this.dragState)
    this.emit('drag_updated', { 
      position,
      dragState: this.dragState 
    })
  }

  completeDrag(position) {
    if (!this.dragState) return

    this.updateDragPosition(position)
    this.applyDragChanges(this.dragState)
    
    const completedDrag = this.dragState
    this.dragState = null
    
    this.addToHistory('drag_completed', completedDrag)
    this.emit('drag_completed', { dragState: completedDrag })
  }

  cancelDrag() {
    if (!this.dragState) return

    this.revertDragChanges(this.dragState)
    const cancelledDrag = this.dragState
    this.dragState = null
    
    this.emit('drag_cancelled', { dragState: cancelledDrag })
  }

  // Measurement operations
  startMeasurement(position) {
    if (!this.isMeasurementTool(this.selectedTool)) return

    this.currentMeasurement = {
      tool: this.selectedTool,
      startPosition: position,
      currentPosition: position,
      startTime: Date.now()
    }

    this.showMeasurementOverlay()
    this.emit('measurement_started', { 
      measurement: this.currentMeasurement,
      position 
    })
  }

  updateMeasurement(position) {
    if (!this.currentMeasurement) return

    this.currentMeasurement.currentPosition = position
    this.calculateMeasurement(this.currentMeasurement)
    this.updateMeasurementDisplay(this.currentMeasurement)
    
    this.emit('measurement_updated', { 
      measurement: this.currentMeasurement,
      position 
    })
  }

  completeMeasurement(position) {
    if (!this.currentMeasurement) return

    this.updateMeasurement(position)
    this.currentMeasurement.completed = true
    this.currentMeasurement.endTime = Date.now()
    
    const measurement = this.saveMeasurement(this.currentMeasurement)
    this.addToHistory('measurement_created', measurement)
    
    this.emit('measurement_completed', { measurement })
    this.currentMeasurement = null
  }

  cancelMeasurement() {
    if (!this.currentMeasurement) return

    this.hideMeasurementOverlay()
    const cancelledMeasurement = this.currentMeasurement
    this.currentMeasurement = null
    
    this.emit('measurement_cancelled', { measurement: cancelledMeasurement })
  }

  // Analysis operations
  performAnalysis(position) {
    if (!this.isAnalysisTool(this.selectedTool)) return

    this.executeAnalysis(position)
  }

  startAnalysis(analysisType) {
    this.currentAnalysis = {
      type: analysisType,
      tool: this.selectedTool,
      startTime: Date.now(),
      progress: 0
    }

    this.showAnalysisProgress()
    this.emit('analysis_started', { analysis: this.currentAnalysis })
  }

  updateAnalysisProgress(progress) {
    if (!this.currentAnalysis) return

    this.currentAnalysis.progress = progress
    this.renderAnalysisProgress(progress)
    
    this.emit('analysis_progress_updated', { 
      analysis: this.currentAnalysis,
      progress 
    })
  }

  showAnalysisResults(results) {
    if (!this.currentAnalysis) return

    this.currentAnalysis.results = results
    this.currentAnalysis.completed = true
    this.currentAnalysis.endTime = Date.now()
    
    this.renderAnalysisResults(results)
    this.addToHistory('analysis_completed', this.currentAnalysis)
    
    this.emit('analysis_completed', { 
      analysis: this.currentAnalysis,
      results 
    })
    
    this.currentAnalysis = null
  }

  handleAnalysisError(error) {
    if (!this.currentAnalysis) return

    this.currentAnalysis.error = error
    this.currentAnalysis.failed = true
    this.currentAnalysis.endTime = Date.now()
    
    this.hideAnalysisProgress()
    this.showErrorMessage(`Analysis failed: ${error.message}`)
    
    this.emit('analysis_failed', { 
      analysis: this.currentAnalysis,
      error 
    })
    
    this.currentAnalysis = null
  }

  cancelAnalysis() {
    if (!this.currentAnalysis) return

    this.currentAnalysis.cancelled = true
    this.currentAnalysis.endTime = Date.now()
    
    this.hideAnalysisProgress()
    const cancelledAnalysis = this.currentAnalysis
    this.currentAnalysis = null
    
    this.emit('analysis_cancelled', { analysis: cancelledAnalysis })
  }

  executeAnalysis(position) {
    const analysisConfig = {
      tool: this.selectedTool,
      position,
      chartData: this.chart.getData(),
      timeframe: this.chart.getTimeframe()
    }

    this.selectedTool.executeAnalysis(analysisConfig)
      .then(results => {
        this.emit('analysis_complete', { results })
      })
      .catch(error => {
        this.emit('analysis_error', { error })
      })
  }

  // Edit operations
  enterEditMode(tool) {
    this.editState = {
      tool,
      originalState: this.cloneToolState(tool),
      startTime: Date.now()
    }

    this.showEditHandles()
    this.emit('edit_mode_entered', { 
      tool,
      editState: this.editState 
    })
  }

  startHandleDrag(handle, position) {
    if (!this.editState) return

    this.editState.dragHandle = {
      handle,
      startPosition: position,
      currentPosition: position
    }

    this.emit('edit_handle_drag_started', { 
      handle,
      position,
      editState: this.editState 
    })
  }

  saveEditChanges() {
    if (!this.editState) return

    const tool = this.editState.tool
    const changes = this.calculateEditChanges(this.editState)
    
    this.applyEditChanges(tool, changes)
    this.addToHistory('tool_edited', {
      tool,
      changes,
      originalState: this.editState.originalState
    })

    this.hideEditHandles()
    this.emit('edit_changes_saved', { 
      tool,
      changes,
      editState: this.editState 
    })
    
    this.editState = null
  }

  revertEditChanges() {
    if (!this.editState) return

    const tool = this.editState.tool
    this.restoreToolState(tool, this.editState.originalState)
    
    this.hideEditHandles()
    this.emit('edit_changes_reverted', { 
      tool,
      editState: this.editState 
    })
    
    this.editState = null
  }

  deleteSelectedTool() {
    if (!this.editState) return

    const tool = this.editState.tool
    this.removeTool(tool)
    this.addToHistory('tool_deleted', { tool })
    
    this.hideEditHandles()
    this.emit('tool_deleted', { tool })
    
    this.editState = null
  }

  exitEditMode() {
    if (!this.editState) return

    this.hideEditHandles()
    const editState = this.editState
    this.editState = null
    
    this.emit('edit_mode_exited', { editState })
  }

  // Tool completion and continuation
  completeCurrentTool() {
    const result = {
      tool: this.activeTool,
      timestamp: Date.now(),
      success: true
    }

    this.emit('tool_complete', { result })
  }

  cancelCurrentToolAction() {
    if (this.currentDrawing) {
      this.cancelCurrentDrawing()
    } else if (this.currentMeasurement) {
      this.cancelMeasurement()
    } else if (this.currentAnalysis) {
      this.cancelAnalysis()
    } else if (this.dragState) {
      this.cancelDrag()
    }

    this.emit('tool_action_cancelled')
  }

  completeToolAction(result) {
    this.saveToolResult(result)
    this.emit('tool_action_completed', { result })
  }

  saveToolResult(result) {
    if (!result) return

    this.toolHistory.push({
      ...result,
      timestamp: Date.now(),
      tool: this.activeTool
    })

    this.emit('tool_result_saved', { result })
  }

  prepareForNextAction() {
    this.clearTemporaryStates()
    this.resetToolToActiveState()
    this.emit('tool_prepared_for_next_action')
  }

  startNewToolAction() {
    this.prepareForNextAction()
    this.emit('tool_new_action_started')
  }

  shouldAutoContinueAfterCompletion() {
    return this.activeTool && 
           this.activeTool.settings && 
           this.activeTool.settings.autoContinue === true
  }

  // Error handling
  handleToolError(error) {
    this.errorState = {
      error,
      tool: this.activeTool,
      timestamp: Date.now(),
      context: this.getCurrentContext()
    }

    console.error('ChartTool Error:', error)
    this.emit('tool_error_handled', { 
      error,
      errorState: this.errorState 
    })
  }

  showErrorMessage(message) {
    this.chart.showNotification({
      type: 'error',
      message,
      duration: 5000
    })
  }

  clearError() {
    this.errorState = null
    this.chart.hideNotification()
    this.emit('tool_error_cleared')
  }

  retryLastAction() {
    if (!this.errorState) return

    const context = this.errorState.context
    this.clearError()
    
    // Attempt to retry the last action based on context
    this.restoreContext(context)
    this.emit('tool_action_retried', { context })
  }

  resetToIdle() {
    this.clearAllStates()
    this.deactivateTool()
    this.clearToolSelection()
    this.emit('tool_reset_to_idle')
  }

  // UI and interaction management
  setCursor(cursor) {
    this.chart.setCursor(cursor)
  }

  showToolHint(tool) {
    if (!tool.hint) return

    this.chart.showTooltip({
      content: tool.hint,
      position: 'top-right',
      duration: 3000
    })
  }

  enableToolInteractions() {
    this.chart.enableToolMode()
    this.bindToolEvents()
  }

  disableToolInteractions() {
    this.chart.disableToolMode()
    this.unbindToolEvents()
  }

  clearActiveTools() {
    this.currentDrawing = null
    this.currentMeasurement = null
    this.currentAnalysis = null
    this.dragState = null
    this.editState = null
  }

  // Drawing rendering
  createDrawingPreview() {
    if (!this.currentDrawing) return

    this.chart.createPreviewLayer()
    this.renderDrawingPreview(this.currentDrawing)
  }

  renderDrawingPreview(drawing) {
    if (!drawing) return

    const renderer = this.getToolRenderer(drawing.tool)
    renderer.renderPreview(drawing, this.chart.getPreviewLayer())
  }

  clearDrawingPreview() {
    this.chart.clearPreviewLayer()
  }

  saveDrawing(drawing) {
    const savedDrawing = {
      ...drawing,
      id: this.generateId(),
      layer: this.chart.addDrawingToLayer(drawing)
    }

    this.chart.addTool(savedDrawing)
    return savedDrawing
  }

  // Measurement operations
  showMeasurementOverlay() {
    this.chart.showMeasurementOverlay()
  }

  hideMeasurementOverlay() {
    this.chart.hideMeasurementOverlay()
  }

  calculateMeasurement(measurement) {
    const calculator = this.getMeasurementCalculator(measurement.tool)
    measurement.values = calculator.calculate(
      measurement.startPosition,
      measurement.currentPosition,
      this.chart
    )
  }

  updateMeasurementDisplay(measurement) {
    this.chart.updateMeasurementOverlay(measurement.values)
  }

  saveMeasurement(measurement) {
    const savedMeasurement = {
      ...measurement,
      id: this.generateId()
    }

    this.chart.addMeasurement(savedMeasurement)
    return savedMeasurement
  }

  // Analysis operations
  showAnalysisProgress() {
    this.chart.showProgressIndicator({
      message: 'Analyzing...',
      progress: 0
    })
  }

  hideAnalysisProgress() {
    this.chart.hideProgressIndicator()
  }

  renderAnalysisProgress(progress) {
    this.chart.updateProgressIndicator({ progress })
  }

  renderAnalysisResults(results) {
    this.chart.showAnalysisResults(results)
  }

  // Drag operations
  enterDragMode(data) {
    this.chart.enterDragMode()
    this.setCursor('move')
  }

  renderDragPreview(dragState) {
    const renderer = this.getDragRenderer(dragState.target)
    renderer.renderDragPreview(dragState, this.chart.getPreviewLayer())
  }

  applyDragChanges(dragState) {
    const target = dragState.target
    const delta = dragState.delta

    if (target.move) {
      target.move(delta)
    }

    this.chart.updateTool(target)
  }

  revertDragChanges(dragState) {
    // Revert any preview changes
    this.chart.clearPreviewLayer()
    this.chart.redraw()
  }

  // Edit operations
  showEditHandles() {
    if (!this.editState) return

    const tool = this.editState.tool
    const handles = this.generateEditHandles(tool)
    
    this.chart.showEditHandles(handles)
  }

  hideEditHandles() {
    this.chart.hideEditHandles()
  }

  cloneToolState(tool) {
    return JSON.parse(JSON.stringify(tool.getState()))
  }

  restoreToolState(tool, state) {
    tool.setState(state)
    this.chart.updateTool(tool)
  }

  calculateEditChanges(editState) {
    const currentState = editState.tool.getState()
    const originalState = editState.originalState
    
    return this.diffStates(originalState, currentState)
  }

  applyEditChanges(tool, changes) {
    tool.applyChanges(changes)
    this.chart.updateTool(tool)
  }

  removeTool(tool) {
    this.chart.removeTool(tool)
  }

  // History and undo/redo
  addToHistory(action, data) {
    const historyEntry = {
      action,
      data,
      timestamp: Date.now(),
      tool: this.activeTool?.id
    }

    this.undoStack.push(historyEntry)
    this.redoStack = [] // Clear redo stack on new action
    
    // Limit undo stack size
    if (this.undoStack.length > 50) {
      this.undoStack.shift()
    }

    this.emit('history_added', { entry: historyEntry })
  }

  undo() {
    if (this.undoStack.length === 0) return false

    const entry = this.undoStack.pop()
    this.redoStack.push(entry)
    
    this.revertHistoryEntry(entry)
    this.emit('action_undone', { entry })
    
    return true
  }

  redo() {
    if (this.redoStack.length === 0) return false

    const entry = this.redoStack.pop()
    this.undoStack.push(entry)
    
    this.applyHistoryEntry(entry)
    this.emit('action_redone', { entry })
    
    return true
  }

  // Utility methods
  clearAllStates() {
    this.currentDrawing = null
    this.currentMeasurement = null
    this.currentAnalysis = null
    this.dragState = null
    this.editState = null
    this.errorState = null
  }

  clearTemporaryStates() {
    this.clearDrawingPreview()
    this.hideMeasurementOverlay()
    this.hideAnalysisProgress()
    this.chart.clearPreviewLayer()
  }

  resetToolToActiveState() {
    if (this.activeTool) {
      this.activeTool.reset()
    }
  }

  getCurrentContext() {
    return {
      selectedTool: this.selectedTool,
      activeTool: this.activeTool,
      currentDrawing: this.currentDrawing,
      currentMeasurement: this.currentMeasurement,
      currentAnalysis: this.currentAnalysis,
      dragState: this.dragState,
      editState: this.editState
    }
  }

  restoreContext(context) {
    this.selectedTool = context.selectedTool
    this.activeTool = context.activeTool
    this.currentDrawing = context.currentDrawing
    this.currentMeasurement = context.currentMeasurement
    this.currentAnalysis = context.currentAnalysis
    this.dragState = context.dragState
    this.editState = context.editState
  }

  generateId() {
    return `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  getToolRenderer(tool) {
    return this.toolManager.getRenderer(tool.type)
  }

  getMeasurementCalculator(tool) {
    return this.toolManager.getMeasurementCalculator(tool.type)
  }

  getDragRenderer(target) {
    return this.toolManager.getDragRenderer(target.type)
  }

  generateEditHandles(tool) {
    return this.toolManager.generateEditHandles(tool)
  }

  diffStates(oldState, newState) {
    // Implementation for calculating differences between states
    const changes = {}
    
    for (const key in newState) {
      if (oldState[key] !== newState[key]) {
        changes[key] = {
          old: oldState[key],
          new: newState[key]
        }
      }
    }
    
    return changes
  }

  revertHistoryEntry(entry) {
    // Implementation for reverting a history entry
    switch (entry.action) {
      case 'drawing_created':
        this.chart.removeTool(entry.data)
        break
      case 'tool_edited':
        this.restoreToolState(entry.data.tool, entry.data.originalState)
        break
      case 'tool_deleted':
        this.chart.addTool(entry.data.tool)
        break
      // Add more cases as needed
    }
  }

  applyHistoryEntry(entry) {
    // Implementation for applying a history entry
    switch (entry.action) {
      case 'drawing_created':
        this.chart.addTool(entry.data)
        break
      case 'tool_edited':
        this.applyEditChanges(entry.data.tool, entry.data.changes)
        break
      case 'tool_deleted':
        this.chart.removeTool(entry.data.tool)
        break
      // Add more cases as needed
    }
  }

  bindToolEvents() {
    // Bind chart events for tool interactions
    this.chart.on('click', this.handleChartClick.bind(this))
    this.chart.on('mousemove', this.handleChartMove.bind(this))
    this.chart.on('mousedown', this.handleChartMouseDown.bind(this))
    this.chart.on('mouseup', this.handleChartMouseUp.bind(this))
    this.chart.on('dblclick', this.handleChartDoubleClick.bind(this))
    this.chart.on('keydown', this.handleKeyDown.bind(this))
  }

  unbindToolEvents() {
    // Unbind chart events
    this.chart.off('click', this.handleChartClick)
    this.chart.off('mousemove', this.handleChartMove)
    this.chart.off('mousedown', this.handleChartMouseDown)
    this.chart.off('mouseup', this.handleChartMouseUp)
    this.chart.off('dblclick', this.handleChartDoubleClick)
    this.chart.off('keydown', this.handleKeyDown)
  }

  handleChartClick(event) {
    this.emit('chart_click', { 
      position: event.position,
      target: event.target,
      originalEvent: event
    })
  }

  handleChartMove(event) {
    this.emit('chart_move', { 
      position: event.position,
      target: event.target,
      originalEvent: event
    })
  }

  handleChartMouseDown(event) {
    this.emit('chart_drag_start', { 
      position: event.position,
      target: event.target,
      originalEvent: event
    })
  }

  handleChartMouseUp(event) {
    this.emit('chart_drag_end', { 
      position: event.position,
      target: event.target,
      originalEvent: event
    })
  }

  handleChartDoubleClick(event) {
    this.emit('chart_double_click', { 
      position: event.position,
      target: event.target,
      originalEvent: event
    })
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.emit('escape')
        break
      case 'Enter':
        this.emit('enter')
        break
      case 'Delete':
      case 'Backspace':
        this.emit('delete_tool')
        break
      case 'z':
        if (event.ctrlKey || event.metaKey) {
          if (event.shiftKey) {
            this.emit('redo')
          } else {
            this.emit('undo')
          }
        }
        break
    }
  }

  emit(event, data = {}) {
    this.chart.emit(`chartTool:${event}`, data)
  }
}

import StateMachine from './StateMachine'
import chartToolConfig from './state-chartTool'
import { ChartToolContext } from './chartToolContext'

/**
 * ChartTool State Machine implementation
 * Manages the complete lifecycle of chart tools
 */
export class ChartToolStateMachine extends StateMachine {
  constructor(chart, toolManager) {
    const context = new ChartToolContext(chart, toolManager)
    super(chartToolConfig, context)
    
    this.chart = chart
    this.toolManager = toolManager
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Listen to context events and translate to state machine events
    this.chart.on('chartTool:chart_click', (data) => {
      this.send('chart_click', data)
    })

    this.chart.on('chartTool:chart_move', (data) => {
      this.send('chart_move', data)
    })

    this.chart.on('chartTool:chart_drag_start', (data) => {
      this.send('chart_drag_start', data)
    })

    this.chart.on('chartTool:chart_drag_end', (data) => {
      this.send('chart_drag_end', data)
    })

    this.chart.on('chartTool:chart_double_click', (data) => {
      this.send('chart_double_click', data)
    })

    this.chart.on('chartTool:escape', () => {
      this.send('escape')
    })

    this.chart.on('chartTool:enter', () => {
      this.send('enter')
    })

    this.chart.on('chartTool:delete_tool', () => {
      this.send('delete_tool')
    })

    this.chart.on('chartTool:analysis_complete', (data) => {
      this.send('analysis_complete', data)
    })

    this.chart.on('chartTool:analysis_error', (data) => {
      this.send('analysis_error', data)
    })

    // Tool manager events
    this.toolManager.on('tool_selected', (tool) => {
      this.send('tool_select', { tool })
    })

    this.toolManager.on('tool_activated', (tool) => {
      this.send('tool_activate', { tool })
    })

    this.toolManager.on('tool_deselected', () => {
      this.send('tool_deselect')
    })
  }

  // Public API methods
  selectTool(tool) {
    return this.send('tool_select', { tool })
  }

  activateTool(tool) {
    return this.send('tool_activate', { tool })
  }

  deactivateTool() {
    return this.send('tool_deselect')
  }

  cancelCurrentAction() {
    return this.send('tool_cancel')
  }

  completeCurrentAction() {
    return this.send('tool_complete')
  }

  enterEditMode(tool) {
    return this.send('tool_edit', { tool })
  }

  undo() {
    if (this.context.undo()) {
      this.send('action_undone')
      return true
    }
    return false
  }

  redo() {
    if (this.context.redo()) {
      this.send('action_redone')
      return true
    }
    return false
  }

  // State queries
  isIdle() {
    return this.currentState === 'idle'
  }

  isToolSelected() {
    return this.currentState === 'tool_selected'
  }

  isToolActive() {
    return this.currentState === 'tool_active'
  }

  isDrawing() {
    return this.currentState === 'tool_drawing'
  }

  isDragging() {
    return this.currentState === 'tool_dragging'
  }

  isMeasuring() {
    return this.currentState === 'tool_measuring'
  }

  isAnalyzing() {
    return this.currentState === 'tool_analyzing'
  }

  isEditing() {
    return this.currentState === 'tool_editing'
  }

  isCompleted() {
    return this.currentState === 'tool_completed'
  }

  hasError() {
    return this.currentState === 'error'
  }

  getSelectedTool() {
    return this.context.selectedTool
  }

  getActiveTool() {
    return this.context.activeTool
  }

  getCurrentDrawing() {
    return this.context.currentDrawing
  }

  getCurrentMeasurement() {
    return this.context.currentMeasurement
  }

  getCurrentAnalysis() {
    return this.context.currentAnalysis
  }

  getToolHistory() {
    return this.context.toolHistory
  }

  canUndo() {
    return this.context.undoStack.length > 0
  }

  canRedo() {
    return this.context.redoStack.length > 0
  }

  destroy() {
    this.chart.off('chartTool:chart_click')
    this.chart.off('chartTool:chart_move')
    this.chart.off('chartTool:chart_drag_start')
    this.chart.off('chartTool:chart_drag_end')
    this.chart.off('chartTool:chart_double_click')
    this.chart.off('chartTool:escape')
    this.chart.off('chartTool:enter')
    this.chart.off('chartTool:delete_tool')
    this.chart.off('chartTool:analysis_complete')
    this.chart.off('chartTool:analysis_error')
    
    this.toolManager.off('tool_selected')
    this.toolManager.off('tool_activated')
    this.toolManager.off('tool_deselected')
    
    super.destroy()
  }
}

