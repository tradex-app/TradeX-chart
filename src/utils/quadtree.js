class Quadtree {
  constructor(bounds) {
    this.bounds = bounds;
    this.data = {};
    this.nodes = [];
  }

  insert(item, x, y) {
    if (!this.data[x]) {
      this.data[x] = {
        left: null,
        right: null,
        top: null,
        bottom: null
      };
    }

    let node = this.data[x];

    if (y < node.bottom) {
      if (!node.left) {
        node.left = [];
      }
      node.left.push(item);
    } else if (y > node.top) {
      if (!node.right) {
        node.right = [];
      }
      node.right.push(item);
    } else {
      node.top = y;
      node.bottom = y;
    }

    return node;
  }

  remove(item) {
    const node = this.findNode(item);
    if (node) {
      if (node.left) {
        this.remove(node.left[0]);
      }
      if (node.right) {
        this.remove(node.right[0]);
      }
      delete this.data[node.x];
      return node;
    }
  }

  findNode(item) {
    const x = item.x;
    const y = item.y;

    const quadrant = this.getQuadrant(x, y);
      let node = this.data[quadrant];

    if (node) {
      if (y < node.bottom) {
        if (y > node.top) {
          return node;
        }
        node = node.left;
      } else if (y > node.top) {
        if (y < node.bottom) {
          return node;
        }
        node = node.right;
      }
    }

    return null;
  }

  getQuadrant(x, y) {
    const quadrant = Math.floor(x / this.bounds.width) + Math.floor(y / this.bounds.height) * this.bounds.width;
    return quadrant;
  }

  contains(item) {
    const node = this.findNode(item);
    return node !== null;
  }

  traverse(callback) {
    const queue = [this.data];

    while (queue.length > 0) {
      const current = queue.shift();

      if (current) {
        callback(current);

        if (current.left) {
          queue.push(current.left);
        }
        if (current.right) {
          queue.push(current.right);
        }
      }
    }
  }
}

/*
insert(item, x, y): Inserts an item into the quadtree at the specified position.
remove(item): Removes an item from the quadtree.
findNode(item): Finds the node in the quadtree that contains the specified item.
getQuadrant(x, y): Calculates the quadrant of the specified position.
contains(item): Checks if the quadtree contains the specified item.
traverse(callback): Traverses the quadtree, calling the provided callback function for each node. The callback function is called with the current node as its argument, and can be used to perform any action on the node, such as checking if it contains a certain item or updating its contents.

Here's an example usage of the traverse method:

const quadtree = new Quadtree(bounds);

// Insert some items into the quadtree
const item1 = { x: 10, y: 10, size: 10 };
quadtree.insert(item1, 10, 10);

const item2 = { x: 20, y: 20, size: 10 };
quadtree.insert(item2, 20, 20);

// Traverse the quadtree and print the contents of each node
quadtree.traverse((node) => {
  console.log(node.item);

  if (node.left) {
    quadtree.traverse(node.left);
  }

  if (node.right) {
    quadtree.traverse(node.right);
  }
});



*/
        
        class Node {
          constructor(value) {
            this.value = value;
            this.children = [];
          }
        }
        
        function getChildIndex(node, item) {
          if (node.value > item) {
            return 0; // less than current node
          }
          if (node.value < item) {
            return 1; // greater than current node
          }
          return -1; // equal to current node
        }


        class QuadTree {
          constructor(bounds) {
            this.bounds = bounds;
            this.root = null;
          }
          
          find(item) {
            return this.findRecursive(this.root, item);
          }
          
          findRecursive(node, item) {
            if (node.value === item) {
              return true; // found it!
            }
            
            for (const child of node.children) {
              if (child.findRecursive(item)) {
                return true; // found it!
              }
            }
            
            return false; // not found
          }
          
          insert(item) {
            return this.insertRecursive(this.root, item);
          }
          
          insertRecursive(node, item) {
            if (!node) {
              return null; // not found
            }
            
            if (node.value === item) {
              return node; // already exists
            }
            
            const childIndex = getChildIndex(node, item);
            if (childIndex !== -1) {
              return node.children[childIndex]; // existing child
            }
            
            const newChild = new Node(item);
            if (node.children.length < 4) {
              node.children.push(newChild);
              return newChild; // inserted at root
            }
            
            const splitX = Math.floor(node.bounds.width / 2),
                  splitY = Math.floor(node.bounds.height / 2),
                  midX = node.bounds.x + splitX,
                  midY = node.bounds.y + splitY;
            
            const leftNode = new Node(item);
            leftNode.bounds = { x: node.bounds.x, y: midY, width: splitX, height: node.bounds.height };
            const rightNode = new Node(item);
            rightNode.bounds = { x: midX, y: node.bounds.y, width: node.bounds.width, height: splitY };
            return this.insertRecursive(leftNode, item) || this.insertRecursive(rightNode, item);
          }
          
          delete(item) {
            return this.deleteRecursive(this.root, item);
          }
          
          deleteRecursive(node, item) {
            if (!node) {
              return; // not found
            }
            
            if (node.value === item) {
              if (node.children.length === 0) {
                return; // nothing left to delete
              }
              
              node = node.children[0];
              delete node;
              return;
            }
            
            for (const child of node.children) {
              if (child.deleteRecursive(item)) {
                return; // deleted successfully
              }
            }
            
            return; // not found
          }
          
          insertRecursive(node, item) {
            if (!node) {
              return null; // not found
            }
            
            if (node.value === item) {
              return node; // already exists
            }
            
            const childIndex = getChildIndex(node, item);
            if (childIndex !== -1) {
              return node.children[childIndex]; // existing child
            }
            
            const newChild = new Node(item);
            if (node.children.length < 4) {
              node.children.push(newChild);
              return newChild; // inserted at root
            }
            
            const splitX = Math.floor(node.bounds.width / 2),
                  splitY = Math.floor(node.bounds.height / 2),
                  midX = node.bounds.x + splitX,
                  midY = node.bounds.y + splitY;
            
            const leftNode = new Node(item);
            leftNode.bounds = { x: node.bounds.x, y: midY, width: splitX, height: node.bounds.height };
            const rightNode = new Node(item);
            rightNode.bounds = { x: midX, y: node.bounds.y, width: node.bounds.width, height: splitY };
            return this.insertRecursive(leftNode, item) || this.insertRecursive(rightNode, item);
          }
          findRecursive(node, item) {
            if (!node) {
              return false; // not found
            }
            
            if (node.value === item) {
              return true; // found it!
            }
            
            for (const child of node.children) {
              if (child.findRecursive(item)) {
                return true; // found it!
              }
            }
            
            return false; // not found
          }
        }
