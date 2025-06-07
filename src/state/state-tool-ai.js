// generate the configuration object for a finite state machine that provides the logic for managing a drawing tool.

const drawingToolStateMachine = {
  id: 'drawingTool',
  initial: 'idle',
  context: {
    currentTool: 'pen',
    strokeWidth: 2,
    color: '#000000',
    isDrawing: false,
    currentPath: null,
    canvas: null,
    lastPosition: { x: 0, y: 0 }
  },
  states: {
    idle: {
      on: {
        TOOL_SELECT: {
          target: 'toolSelected',
          actions: ['setTool']
        },
        CANVAS_READY: {
          target: 'ready',
          actions: ['initializeCanvas']
        }
      }
    },
    
    ready: {
      on: {
        TOOL_SELECT: {
          target: 'ready',
          actions: ['setTool']
        },
        MOUSE_DOWN: {
          target: 'drawing',
          actions: ['startDrawing'],
          cond: 'hasValidTool'
        },
        TOUCH_START: {
          target: 'drawing',
          actions: ['startDrawing'],
          cond: 'hasValidTool'
        },
        CLEAR_CANVAS: {
          target: 'ready',
          actions: ['clearCanvas']
        },
        UNDO: {
          target: 'ready',
          actions: ['undoLastAction']
        },
        REDO: {
          target: 'ready',
          actions: ['redoLastAction']
        }
      }
    },
    
    toolSelected: {
      on: {
        CANVAS_READY: {
          target: 'ready',
          actions: ['initializeCanvas']
        },
        TOOL_SELECT: {
          target: 'toolSelected',
          actions: ['setTool']
        }
      }
    },
    
    drawing: {
      on: {
        MOUSE_MOVE: {
          target: 'drawing',
          actions: ['continuDrawing'],
          cond: 'isActivelyDrawing'
        },
        TOUCH_MOVE: {
          target: 'drawing',
          actions: ['continuDrawing'],
          cond: 'isActivelyDrawing'
        },
        MOUSE_UP: {
          target: 'ready',
          actions: ['finishDrawing']
        },
        TOUCH_END: {
          target: 'ready',
          actions: ['finishDrawing']
        },
        ESCAPE: {
          target: 'ready',
          actions: ['cancelDrawing']
        }
      }
    },
    
    erasing: {
      on: {
        MOUSE_MOVE: {
          target: 'erasing',
          actions: ['continueErasing'],
          cond: 'isActivelyErasing'
        },
        TOUCH_MOVE: {
          target: 'erasing',
          actions: ['continueErasing'],
          cond: 'isActivelyErasing'
        },
        MOUSE_UP: {
          target: 'ready',
          actions: ['finishErasing']
        },
        TOUCH_END: {
          target: 'ready',
          actions: ['finishErasing']
        },
        ESCAPE: {
          target: 'ready',
          actions: ['cancelErasing']
        }
      }
    }
  }
};

// Actions for the state machine
const drawingActions = {
  setTool: (context, event) => {
    context.currentTool = event.tool;
    if (event.strokeWidth) context.strokeWidth = event.strokeWidth;
    if (event.color) context.color = event.color;
  },
  
  initializeCanvas: (context, event) => {
    context.canvas = event.canvas;
    context.canvas.style.cursor = getCursorForTool(context.currentTool);
  },
  
  startDrawing: (context, event) => {
    context.isDrawing = true;
    context.lastPosition = {
      x: event.clientX || event.touches[0].clientX,
      y: event.clientY || event.touches[0].clientY
    };
    
    if (context.currentTool === 'pen' || context.currentTool === 'brush') {
      context.currentPath = createNewPath(context.lastPosition, context);
    }
  },
  
  continuDrawing: (context, event) => {
    if (!context.isDrawing) return;
    
    const currentPosition = {
      x: event.clientX || event.touches[0].clientX,
      y: event.clientY || event.touches[0].clientY
    };
    
    drawLine(context.lastPosition, currentPosition, context);
    context.lastPosition = currentPosition;
  },
  
  finishDrawing: (context, event) => {
    context.isDrawing = false;
    if (context.currentPath) {
      savePathToHistory(context.currentPath);
      context.currentPath = null;
    }
  },
  
  cancelDrawing: (context, event) => {
    context.isDrawing = false;
    if (context.currentPath) {
      clearCurrentPath(context.currentPath);
      context.currentPath = null;
    }
  },
  
  clearCanvas: (context, event) => {
    if (context.canvas) {
      const ctx = context.canvas.getContext('2d');
      ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
      clearDrawingHistory();
    }
  },
  
  undoLastAction: (context, event) => {
    undoDrawingAction(context.canvas);
  },
  
  redoLastAction: (context, event) => {
    redoDrawingAction(context.canvas);
  },
  
  continueErasing: (context, event) => {
    const currentPosition = {
      x: event.clientX || event.touches[0].clientX,
      y: event.clientY || event.touches[0].clientY
    };
    
    eraseAtPosition(currentPosition, context);
  },
  
  finishErasing: (context, event) => {
    context.isDrawing = false;
    saveCanvasState(context.canvas);
  },
  
  cancelErasing: (context, event) => {
    context.isDrawing = false;
    restoreCanvasState(context.canvas);
  }
};

// Guards for the state machine
const drawingGuards = {
  hasValidTool: (context, event) => {
    return context.currentTool && context.canvas;
  },
  
  isActivelyDrawing: (context, event) => {
    return context.isDrawing && context.currentTool !== 'eraser';
  },
  
  isActivelyErasing: (context, event) => {
    return context.isDrawing && context.currentTool === 'eraser';
  }
};

// Helper functions
function getCursorForTool(tool) {
  const cursors = {
    pen: 'crosshair',
    brush: 'crosshair',
    eraser: 'grab',
    select: 'default'
  };
  return cursors[tool] || 'default';
}

function createNewPath(startPosition, context) {
  return {
    tool: context.currentTool,
    strokeWidth: context.strokeWidth,
    color: context.color,
    points: [startPosition]
  };
}

function drawLine(from, to, context) {
  if (!context.canvas) return;
  
  const ctx = context.canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = context.color;
  ctx.lineWidth = context.strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  
  if (context.currentPath) {
    context.currentPath.points.push(to);
  }
}

function savePathToHistory(path) {
  // Implementation for saving drawing history
  console.log('Saving path to history:', path);
}

function clearCurrentPath(path) {
  // Implementation for clearing current path
  console.log('Clearing current path:', path);
}

function clearDrawingHistory() {
  // Implementation for clearing drawing history
  console.log('Clearing drawing history');
}

function undoDrawingAction(canvas) {
  // Implementation for undo functionality
  console.log('Undoing last drawing action');
}

function redoDrawingAction(canvas) {
  // Implementation for redo functionality
  console.log('Redoing last drawing action');
}

function eraseAtPosition(position, context) {
  if (!context.canvas) return;
  
  const ctx = context.canvas.getContext('2d');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(position.x, position.y, context.strokeWidth * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function saveCanvasState(canvas) {
  // Implementation for saving canvas state
  console.log('Saving canvas state');
}

function restoreCanvasState(canvas) {
  // Implementation for restoring canvas state
  console.log('Restoring canvas state');
}

export { drawingToolStateMachine, drawingActions, drawingGuards };
