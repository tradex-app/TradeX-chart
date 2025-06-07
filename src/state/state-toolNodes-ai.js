const nodeManagementStateMachine = {
  id: 'nodeManagement',
  initial: 'idle',
  context: {
    nodes: new Map(),
    selectedNodes: new Set(),
    activeNode: null,
    draggedNode: null,
    nodeCounter: 0,
    clipboard: [],
    connectionMode: false,
    pendingConnection: null,
    selectionBox: null,
    nodeTypes: ['circle', 'rectangle', 'diamond', 'text'],
    currentNodeType: 'circle',
    snapToGrid: true,
    gridSize: 10
  },
  states: {
    idle: {
      on: {
        CANVAS_READY: {
          target: 'ready',
          actions: ['initializeNodeCanvas']
        }
      }
    },

    ready: {
      on: {
        NODE_CREATE: {
          target: 'creating',
          actions: ['startNodeCreation']
        },
        NODE_SELECT: {
          target: 'selected',
          actions: ['selectNode'],
          cond: 'nodeExists'
        },
        MULTI_SELECT_START: {
          target: 'multiSelecting',
          actions: ['startSelectionBox']
        },
        CONNECTION_MODE_TOGGLE: {
          target: 'ready',
          actions: ['toggleConnectionMode']
        },
        PASTE_NODES: {
          target: 'ready',
          actions: ['pasteNodes'],
          cond: 'hasClipboardContent'
        }
      }
    },

    creating: {
      on: {
        NODE_PLACE: {
          target: 'selected',
          actions: ['createAndSelectNode']
        },
        CREATION_CANCEL: {
          target: 'ready',
          actions: ['cancelNodeCreation']
        },
        MOUSE_MOVE: {
          target: 'creating',
          actions: ['updateNodePreview']
        }
      }
    },

    selected: {
      on: {
        NODE_DRAG_START: {
          target: 'dragging',
          actions: ['startNodeDrag'],
          cond: 'canDragNode'
        },
        NODE_EDIT: {
          target: 'editing',
          actions: ['startNodeEdit'],
          cond: 'nodeIsEditable'
        },
        NODE_DELETE: {
          target: 'ready',
          actions: ['deleteSelectedNodes']
        },
        NODE_COPY: {
          target: 'selected',
          actions: ['copySelectedNodes']
        },
        NODE_DUPLICATE: {
          target: 'selected',
          actions: ['duplicateSelectedNodes']
        },
        CONNECTION_START: {
          target: 'connecting',
          actions: ['startConnection'],
          cond: 'connectionModeActive'
        },
        DESELECT_ALL: {
          target: 'ready',
          actions: ['clearSelection']
        },
        MULTI_SELECT_ADD: {
          target: 'selected',
          actions: ['addToSelection'],
          cond: 'nodeExists'
        }
      }
    },

    dragging: {
      on: {
        NODE_DRAG: {
          target: 'dragging',
          actions: ['updateNodePosition']
        },
        NODE_DRAG_END: {
          target: 'selected',
          actions: ['finishNodeDrag']
        },
        DRAG_CANCEL: {
          target: 'selected',
          actions: ['cancelNodeDrag']
        }
      }
    },

    editing: {
      on: {
        NODE_UPDATE: {
          target: 'selected',
          actions: ['updateNodeProperties']
        },
        EDIT_CANCEL: {
          target: 'selected',
          actions: ['cancelNodeEdit']
        },
        EDIT_CONFIRM: {
          target: 'selected',
          actions: ['confirmNodeEdit']
        }
      }
    },

    connecting: {
      on: {
        CONNECTION_TARGET: {
          target: 'selected',
          actions: ['createConnection'],
          cond: 'isValidConnectionTarget'
        },
        CONNECTION_CANCEL: {
          target: 'selected',
          actions: ['cancelConnection']
        },
        MOUSE_MOVE: {
          target: 'connecting',
          actions: ['updateConnectionPreview']
        }
      }
    },

    multiSelecting: {
      on: {
        SELECTION_UPDATE: {
          target: 'multiSelecting',
          actions: ['updateSelectionBox']
        },
        SELECTION_COMPLETE: {
          target: 'selected',
          actions: ['completeMultiSelection'],
          cond: 'hasSelectedNodes'
        },
        SELECTION_CANCEL: {
          target: 'ready',
          actions: ['cancelMultiSelection']
        }
      }
    },

    grouping: {
      on: {
        GROUP_CREATE: {
          target: 'selected',
          actions: ['createNodeGroup']
        },
        GROUP_UNGROUP: {
          target: 'selected',
          actions: ['ungroupNodes']
        },
        GROUP_CANCEL: {
          target: 'selected',
          actions: ['cancelGrouping']
        }
      }
    }
  }
};

// Actions for the node management state machine
const nodeActions = {
  initializeNodeCanvas: (context, event) => {
    context.canvas = event.canvas;
    context.nodes.clear();
    context.selectedNodes.clear();
    context.nodeCounter = 0;
  },

  startNodeCreation: (context, event) => {
    context.currentNodeType = event.nodeType || context.currentNodeType;
    context.creationPosition = {
      x: event.x,
      y: event.y
    };
  },

  createAndSelectNode: (context, event) => {
    const nodeId = `node_${++context.nodeCounter}`;
    const position = context.snapToGrid 
      ? snapToGrid(event.position, context.gridSize)
      : event.position;
    
    const newNode = {
      id: nodeId,
      type: context.currentNodeType,
      position: position,
      size: event.size || getDefaultNodeSize(context.currentNodeType),
      properties: {
        label: event.label || `Node ${context.nodeCounter}`,
        color: event.color || '#ffffff',
        borderColor: event.borderColor || '#000000',
        borderWidth: event.borderWidth || 2
      },
      connections: {
        incoming: new Set(),
        outgoing: new Set()
      },
      metadata: {
        created: Date.now(),
        modified: Date.now()
      }
    };

    context.nodes.set(nodeId, newNode);
    context.selectedNodes.clear();
    context.selectedNodes.add(nodeId);
    context.activeNode = nodeId;
  },

  selectNode: (context, event) => {
    if (!event.multiSelect) {
      context.selectedNodes.clear();
    }
    context.selectedNodes.add(event.nodeId);
    context.activeNode = event.nodeId;
  },

  startNodeDrag: (context, event) => {
    context.draggedNode = event.nodeId;
    context.dragStartPosition = { ...event.position };
    context.dragOffset = {
      x: event.position.x - context.nodes.get(event.nodeId).position.x,
      y: event.position.y - context.nodes.get(event.nodeId).position.y
    };
  },

  updateNodePosition: (context, event) => {
    if (!context.draggedNode) return;

    const node = context.nodes.get(context.draggedNode);
    if (!node) return;

    let newPosition = {
      x: event.position.x - context.dragOffset.x,
      y: event.position.y - context.dragOffset.y
    };

    if (context.snapToGrid) {
      newPosition = snapToGrid(newPosition, context.gridSize);
    }

    // Update all selected nodes if dragging multiple
    if (context.selectedNodes.has(context.draggedNode) && context.selectedNodes.size > 1) {
      const deltaX = newPosition.x - node.position.x;
      const deltaY = newPosition.y - node.position.y;

      context.selectedNodes.forEach(nodeId => {
        const selectedNode = context.nodes.get(nodeId);
        if (selectedNode) {
          selectedNode.position.x += deltaX;
          selectedNode.position.y += deltaY;
          selectedNode.metadata.modified = Date.now();
        }
      });
    } else {
      node.position = newPosition;
      node.metadata.modified = Date.now();
    }
  },

  finishNodeDrag: (context, event) => {
    context.draggedNode = null;
    context.dragStartPosition = null;
    context.dragOffset = null;
    saveNodeState(context);
  },

  startNodeEdit: (context, event) => {
    context.editingNode = event.nodeId;
    context.originalNodeState = JSON.parse(JSON.stringify(context.nodes.get(event.nodeId)));
  },

  updateNodeProperties: (context, event) => {
    const node = context.nodes.get(context.editingNode);
    if (!node) return;

    Object.assign(node.properties, event.properties);
    if (event.size) node.size = event.size;
    node.metadata.modified = Date.now();
  },

  confirmNodeEdit: (context, event) => {
    context.editingNode = null;
    context.originalNodeState = null;
    saveNodeState(context);
  },

  cancelNodeEdit: (context, event) => {
    if (context.editingNode && context.originalNodeState) {
      context.nodes.set(context.editingNode, context.originalNodeState);
    }
    context.editingNode = null;
    context.originalNodeState = null;
  },

  deleteSelectedNodes: (context, event) => {
    context.selectedNodes.forEach(nodeId => {
      const node = context.nodes.get(nodeId);
      if (node) {
        // Remove all connections
        removeNodeConnections(context, nodeId);
        context.nodes.delete(nodeId);
      }
    });
    context.selectedNodes.clear();
    context.activeNode = null;
    saveNodeState(context);
  },

  copySelectedNodes: (context, event) => {
    context.clipboard = Array.from(context.selectedNodes).map(nodeId => {
      const node = context.nodes.get(nodeId);
      return node ? JSON.parse(JSON.stringify(node)) : null;
    }).filter(Boolean);
  },

  pasteNodes: (context, event) => {
    const offset = event.offset || { x: 20, y: 20 };
    context.selectedNodes.clear();

    context.clipboard.forEach(nodeData => {
      const nodeId = `node_${++context.nodeCounter}`;
      const newNode = {
        ...nodeData,
        id: nodeId,
        position: {
          x: nodeData.position.x + offset.x,
          y: nodeData.position.y + offset.y
        },
        connections: {
          incoming: new Set(),
          outgoing: new Set()
        },
        metadata: {
          created: Date.now(),
          modified: Date.now()
        }
      };

      context.nodes.set(nodeId, newNode);
      context.selectedNodes.add(nodeId);
    });
  },

  startConnection: (context, event) => {
    context.pendingConnection = {
      sourceNodeId: event.nodeId,
      sourcePort: event.port || 'default',
      startPosition: event.position
    };
  },

  createConnection: (context, event) => {
    if (!context.pendingConnection) return;

    const connectionId = `conn_${Date.now()}`;
    const connection = {
      id: connectionId,
      source: {
        nodeId: context.pendingConnection.sourceNodeId,
        port: context.pendingConnection.sourcePort
      },
      target: {
        nodeId: event.nodeId,
        port: event.port || 'default'
      },
      properties: {
        style: event.connectionStyle || 'solid',
        color: event.connectionColor || '#000000',
        width: event.connectionWidth || 2
      }
    };

    // Update node connections
    const sourceNode = context.nodes.get(connection.source.nodeId);
    const targetNode = context.nodes.get(connection.target.nodeId);
    
    if (sourceNode && targetNode) {
      sourceNode.connections.outgoing.add(connectionId);
      targetNode.connections.incoming.add(connectionId);
      
      if (!context.connections) context.connections = new Map();
      context.connections.set(connectionId, connection);
    }

    context.pendingConnection = null;
  },

  startSelectionBox: (context, event) => {
    context.selectionBox = {
      start: { x: event.x, y: event.y },
      current: { x: event.x, y: event.y }
    };
  },

  updateSelectionBox: (context, event) => {
    if (context.selectionBox) {
      context.selectionBox.current = { x: event.x, y: event.y };
    }
  },

  completeMultiSelection: (context, event) => {
    if (!context.selectionBox) return;

    const selectionRect = getSelectionRect(context.selectionBox);
    context.selectedNodes.clear();

    context.nodes.forEach((node, nodeId) => {
      if (isNodeInRect(node, selectionRect)) {
        context.selectedNodes.add(nodeId);
      }
    });

    context.selectionBox = null;
  },

  clearSelection: (context, event) => {
    context.selectedNodes.clear();
    context.activeNode = null;
  },

  toggleConnectionMode: (context, event) => {
    context.connectionMode = !context.connectionMode;
  }
};

// Guards for the node management state machine
const nodeGuards = {
  nodeExists: (context, event) => {
    return context.nodes.has(event.nodeId);
  },

  canDragNode: (context, event) => {
    return context.nodes.has(event.nodeId) && !context.nodes.get(event.nodeId).locked;
  },

  nodeIsEditable: (context, event) => {
    const node = context.nodes.get(event.nodeId);
    return node && !node.locked && node.type !== 'connector';
  },

  connectionModeActive: (context, event) => {
    return context.connectionMode;
  },

  isValidConnectionTarget: (context, event) => {
    if (!context.pendingConnection) return false;
    
    const sourceNodeId = context.pendingConnection.sourceNodeId;
    const targetNodeId = event.nodeId;
    
    // Can't connect to self
    if (sourceNodeId === targetNodeId) return false;
    
    // Check if connection already exists
    return !connectionExists(context, sourceNodeId, targetNodeId);
  },

  hasSelectedNodes: (context, event) => {
    return context.selectedNodes.size > 0;
  },

  hasClipboardContent: (context, event) => {
    return context.clipboard.length > 0;
  }
};

// Helper functions (continued)
function snapToGrid(position, gridSize) {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize
  };
}

function getDefaultNodeSize(nodeType) {
  const sizes = {
    circle: { width: 60, height: 60 },
    rectangle: { width: 80, height: 60 },
    diamond: { width: 80, height: 80 },
    text: { width: 100, height: 40 }
  };
  return sizes[nodeType] || sizes.rectangle;
}

function removeNodeConnections(context, nodeId) {
  if (!context.connections) return;
  
  const node = context.nodes.get(nodeId);
  if (!node) return;

  // Remove all incoming connections
  node.connections.incoming.forEach(connectionId => {
    const connection = context.connections.get(connectionId);
    if (connection) {
      const sourceNode = context.nodes.get(connection.source.nodeId);
      if (sourceNode) {
        sourceNode.connections.outgoing.delete(connectionId);
      }
      context.connections.delete(connectionId);
    }
  });

  // Remove all outgoing connections
  node.connections.outgoing.forEach(connectionId => {
    const connection = context.connections.get(connectionId);
    if (connection) {
      const targetNode = context.nodes.get(connection.target.nodeId);
      if (targetNode) {
        targetNode.connections.incoming.delete(connectionId);
      }
      context.connections.delete(connectionId);
    }
  });
}

function connectionExists(context, sourceNodeId, targetNodeId) {
  if (!context.connections) return false;
  
  for (const [connectionId, connection] of context.connections) {
    if (connection.source.nodeId === sourceNodeId && 
        connection.target.nodeId === targetNodeId) {
      return true;
    }
  }
  return false;
}

function getSelectionRect(selectionBox) {
  const { start, current } = selectionBox;
  return {
    x: Math.min(start.x, current.x),
    y: Math.min(start.y, current.y),
    width: Math.abs(current.x - start.x),
    height: Math.abs(current.y - start.y)
  };
}

function isNodeInRect(node, rect) {
  const nodeRect = {
    x: node.position.x,
    y: node.position.y,
    width: node.size.width,
    height: node.size.height
  };

  return !(nodeRect.x > rect.x + rect.width ||
           nodeRect.x + nodeRect.width < rect.x ||
           nodeRect.y > rect.y + rect.height ||
           nodeRect.y + nodeRect.height < rect.y);
}

function saveNodeState(context) {
  // Implementation for saving node state to history
  const state = {
    nodes: Array.from(context.nodes.entries()),
    connections: context.connections ? Array.from(context.connections.entries()) : [],
    timestamp: Date.now()
  };
  
  if (!context.history) context.history = [];
  context.history.push(state);
  
  // Limit history size
  if (context.history.length > 50) {
    context.history.shift();
  }
  
  console.log('Node state saved:', state);
}

function restoreNodeState(context, historyIndex) {
  if (!context.history || historyIndex < 0 || historyIndex >= context.history.length) {
    return false;
  }

  const state = context.history[historyIndex];
  context.nodes = new Map(state.nodes);
  context.connections = new Map(state.connections);
  context.selectedNodes.clear();
  context.activeNode = null;
  
  return true;
}

// Extended actions for advanced node operations
const advancedNodeActions = {
  duplicateSelectedNodes: (context, event) => {
    const offset = event.offset || { x: 30, y: 30 };
    const duplicatedNodes = new Map();
    const newSelectedNodes = new Set();

    // First pass: duplicate nodes
    context.selectedNodes.forEach(nodeId => {
      const originalNode = context.nodes.get(nodeId);
      if (!originalNode) return;

      const newNodeId = `node_${++context.nodeCounter}`;
      const duplicatedNode = {
        ...JSON.parse(JSON.stringify(originalNode)),
        id: newNodeId,
        position: {
          x: originalNode.position.x + offset.x,
          y: originalNode.position.y + offset.y
        },
        connections: {
          incoming: new Set(),
          outgoing: new Set()
        },
        metadata: {
          created: Date.now(),
          modified: Date.now()
        }
      };

      context.nodes.set(newNodeId, duplicatedNode);
      duplicatedNodes.set(nodeId, newNodeId);
      newSelectedNodes.add(newNodeId);
    });

    // Second pass: duplicate internal connections
    if (context.connections) {
      context.connections.forEach((connection, connectionId) => {
        const sourceMapping = duplicatedNodes.get(connection.source.nodeId);
        const targetMapping = duplicatedNodes.get(connection.target.nodeId);

        // Only duplicate connections between duplicated nodes
        if (sourceMapping && targetMapping) {
          const newConnectionId = `conn_${Date.now()}_${Math.random()}`;
          const newConnection = {
            ...connection,
            id: newConnectionId,
            source: {
              ...connection.source,
              nodeId: sourceMapping
            },
            target: {
              ...connection.target,
              nodeId: targetMapping
            }
          };

          context.connections.set(newConnectionId, newConnection);
          
          // Update node connection references
          const sourceNode = context.nodes.get(sourceMapping);
          const targetNode = context.nodes.get(targetMapping);
          if (sourceNode && targetNode) {
            sourceNode.connections.outgoing.add(newConnectionId);
            targetNode.connections.incoming.add(newConnectionId);
          }
        }
      });
    }

    // Update selection to duplicated nodes
    context.selectedNodes = newSelectedNodes;
    saveNodeState(context);
  },

  createNodeGroup: (context, event) => {
    if (context.selectedNodes.size < 2) return;

    const groupId = `group_${++context.nodeCounter}`;
    const selectedNodeIds = Array.from(context.selectedNodes);
    
    // Calculate group bounds
    const bounds = calculateNodeGroupBounds(context, selectedNodeIds);
    
    const group = {
      id: groupId,
      type: 'group',
      position: bounds.position,
      size: bounds.size,
      properties: {
        label: event.label || `Group ${context.nodeCounter}`,
        color: event.color || 'rgba(200, 200, 200, 0.3)',
        borderColor: event.borderColor || '#888888',
        borderWidth: 2,
        collapsed: false
      },
      members: new Set(selectedNodeIds),
      connections: {
        incoming: new Set(),
        outgoing: new Set()
      },
      metadata: {
        created: Date.now(),
        modified: Date.now()
      }
    };

    // Update member nodes to reference the group
    selectedNodeIds.forEach(nodeId => {
      const node = context.nodes.get(nodeId);
      if (node) {
        node.parentGroup = groupId;
      }
    });

    context.nodes.set(groupId, group);
    context.selectedNodes.clear();
    context.selectedNodes.add(groupId);
    context.activeNode = groupId;
    
    saveNodeState(context);
  },

  ungroupNodes: (context, event) => {
    const groupId = event.groupId || context.activeNode;
    const group = context.nodes.get(groupId);
    
    if (!group || group.type !== 'group') return;

    // Remove group reference from member nodes
    group.members.forEach(nodeId => {
      const node = context.nodes.get(nodeId);
      if (node) {
        delete node.parentGroup;
      }
    });

    // Select the ungrouped nodes
    context.selectedNodes = new Set(group.members);
    
    // Remove the group
    context.nodes.delete(groupId);
    
    saveNodeState(context);
  },

  alignNodes: (context, event) => {
    if (context.selectedNodes.size < 2) return;

    const alignment = event.alignment; // 'left', 'right', 'top', 'bottom', 'center-horizontal', 'center-vertical'
    const selectedNodeIds = Array.from(context.selectedNodes);
    const nodes = selectedNodeIds.map(id => context.nodes.get(id)).filter(Boolean);

    switch (alignment) {
      case 'left':
        const leftX = Math.min(...nodes.map(n => n.position.x));
        nodes.forEach(node => { node.position.x = leftX; });
        break;
      
      case 'right':
        const rightX = Math.max(...nodes.map(n => n.position.x + n.size.width));
        nodes.forEach(node => { node.position.x = rightX - node.size.width; });
        break;
      
      case 'top':
        const topY = Math.min(...nodes.map(n => n.position.y));
        nodes.forEach(node => { node.position.y = topY; });
        break;
      
      case 'bottom':
        const bottomY = Math.max(...nodes.map(n => n.position.y + n.size.height));
        nodes.forEach(node => { node.position.y = bottomY - node.size.height; });
        break;
      
      case 'center-horizontal':
        const centerX = nodes.reduce((sum, n) => sum + n.position.x + n.size.width / 2, 0) / nodes.length;
        nodes.forEach(node => { node.position.x = centerX - node.size.width / 2; });
        break;
      
      case 'center-vertical':
        const centerY = nodes.reduce((sum, n) => sum + n.position.y + n.size.height / 2, 0) / nodes.length;
        nodes.forEach(node => { node.position.y = centerY - node.size.height / 2; });
        break;
    }

    nodes.forEach(node => { node.metadata.modified = Date.now(); });
    saveNodeState(context);
  },

  distributeNodes: (context, event) => {
    if (context.selectedNodes.size < 3) return;

    const distribution = event.distribution; // 'horizontal', 'vertical'
    const selectedNodeIds = Array.from(context.selectedNodes);
    const nodes = selectedNodeIds.map(id => context.nodes.get(id)).filter(Boolean);

    if (distribution === 'horizontal') {
      nodes.sort((a, b) => a.position.x - b.position.x);
      const totalWidth = nodes[nodes.length - 1].position.x - nodes[0].position.x;
      const spacing = totalWidth / (nodes.length - 1);
      
      nodes.forEach((node, index) => {
        if (index > 0 && index < nodes.length - 1) {
          node.position.x = nodes[0].position.x + spacing * index;
        }
      });
    } else if (distribution === 'vertical') {
      nodes.sort((a, b) => a.position.y - b.position.y);
      const totalHeight = nodes[nodes.length - 1].position.y - nodes[0].position.y;
      const spacing = totalHeight / (nodes.length - 1);
      
      nodes.forEach((node, index) => {
        if (index > 0 && index < nodes.length - 1) {
          node.position.y = nodes[0].position.y + spacing * index;
        }
      });
    }

    nodes.forEach(node => { node.metadata.modified = Date.now(); });
    saveNodeState(context);
  },

  lockNodes: (context, event) => {
    context.selectedNodes.forEach(nodeId => {
      const node = context.nodes.get(nodeId);
      if (node) {
        node.locked = event.locked !== undefined ? event.locked : true;
        node.metadata.modified = Date.now();
      }
    });
  },

  setNodeLayer: (context, event) => {
    const layerAction = event.action; // 'bring-to-front', 'send-to-back', 'bring-forward', 'send-backward'
    
    context.selectedNodes.forEach(nodeId => {
      const node = context.nodes.get(nodeId);
      if (!node) return;

      switch (layerAction) {
        case 'bring-to-front':
          node.zIndex = getMaxZIndex(context) + 1;
          break;
        case 'send-to-back':
          node.zIndex = getMinZIndex(context) - 1;
          break;
        case 'bring-forward':
          node.zIndex = (node.zIndex || 0) + 1;
          break;
        case 'send-backward':
          node.zIndex = (node.zIndex || 0) - 1;
          break;
      }
      
      node.metadata.modified = Date.now();
    });
  }
};

function calculateNodeGroupBounds(context, nodeIds) {
  const nodes = nodeIds.map(id => context.nodes.get(id)).filter(Boolean);
  if (nodes.length === 0) return { position: { x: 0, y: 0 }, size: { width: 0, height: 0 } };

  const minX = Math.min(...nodes.map(n => n.position.x));
  const minY = Math.min(...nodes.map(n => n.position.y));
  const maxX = Math.max(...nodes.map(n => n.position.x + n.size.width));
  const maxY = Math.max(...nodes.map(n => n.position.y + n.size.height));

  const padding = 20;
  
  return {
    position: { x: minX - padding, y: minY - padding },
    size: { width: maxX - minX + 2 * padding, height: maxY - minY + 2 * padding }
  };
}

function getMaxZIndex(context) {
  let maxZ = 0;
  context.nodes.forEach(node => {
    if (node.zIndex && node.zIndex > maxZ) {
      maxZ = node.zIndex;
    }
  });
  return maxZ;
}

function getMinZIndex(context) {
  let minZ = 0;
  context.nodes.forEach(node => {
    if (node.zIndex && node.zIndex < minZ) {
      minZ = node.zIndex;
    }
  });
  return minZ;
}

// Merge all actions
const allNodeActions = {
  ...nodeActions,
  ...advancedNodeActions
};

export { 
  nodeManagementStateMachine, 
  allNodeActions as nodeActions, 
  nodeGuards,
  saveNodeState,
  restoreNodeState
};
