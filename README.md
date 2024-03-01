# OpenHex

Welcome to OpenHex. This is a grid library for use with strategy games in the vein of Final Fantasy Tactics. 

## Node

Each Node contains:

### Path

path object with 8 directions (abbr to 'ea', 'no', etc) connecting to the nodes in the 8 cardinal and diagonal directions. Each direction has a getter and a setter which refers to the node and getPathXX() which returns the node, direction type, and an alias string.

```js
$ const o = new Node(0,0)
$ console.log('se path:', o.getPathSE())

/*
se path: {
    alias: 'path south east',
    node: Node {},
    pathType: DIAGONAL
}
*/
```

### Index

an index object indicating the node's position on the grid. 

### Cover

an enum that records the cover value of the node

### locationToString()

returns a string containing the indices and z-position (yet to come)

```js
$ const o = new Node(0,0)
$ console.log('o.toString():', o.toString())

/*
node@(1,2)
*/
```

### matches()

compares nodes to each other and returns the result of that comparison as a boolean

### value(), v()

returns an object containing the indices, z-position (planned), and cover value for easy use

### toString()

returns the value() as a string.

