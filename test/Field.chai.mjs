'use debugger'

import { 
    Field,
    Node
} from '../Field.mjs'
import {
    expect
} from 'chai'

let counter = 1

describe(`Field.mjs`, () => {
    describe(`HexNodes`, () => {
        describe(`HexNodes constructor without arguments.`, () => {
            const node = new Node()

            nodeIs(node.getEA())
            allPathsAre(node)
            positionIs(node)
            coverIs(node)
        })

        describe(`HexNode constructor at origin`, () => {
            const node = new Node(0,0)

            allPathsAre(node)
            positionIs(node, 0, 0)
        })

        describe(`HexNode constructor at a nonzero point`, () => {
            const node = new Node(1,2)

            allPathsAre(node)
            positionIs(node, 1, 2)
        })
    })

    describe(`Field`, () => {
        describe(`A field of one node's links are all nulled`, () => {
            const field = new Field(1,1)
            const origin = field.origin

            allPathsAre(origin)
            positionIs(origin, 0, 0)
        })

        describe(`A field made up of more than 1 node can use the Field.getNode() method`, () => {
            const field = new Field(2, 2);
        
            const node01 = field.getNode(0, 1)
            const node10 = field.getNode(1, 0)
            const node11 = field.getNode(1, 1)
        
            positionIs(node01, 0, 1)
            positionIs(node10, 1, 0)
            positionIs(node11, 1, 1)
        })

        describe(`A field made up more than 1 node`, () => {
            const field = new Field(2,2)
            let node = field.origin

            let paths

            paths = [
                node.getEA(),
                node.getNE(),
                node.getNO()
            ]
            thesePathsAreNot(paths)

            paths = [
                node.getNW(),
                node.getWE(),
                node.getSW(),
                node.getSO(),
                node.getSE()
            ]
            thesePathsAre(paths)

            node = node.getNE()
            paths = [
                node.getEA(),
                node.getNE(),
                node.getNO(),
                node.getNW(),
                node.getSE()
            ]
            
            thesePathsAre(paths)

            paths = [
                node.getWE(),
                node.getSW(),
                node.getSO()
            ]

            thesePathsAreNot(paths)

        })

        describe(`The center node in a 3x3 field will have all of its links occupied`, () => {
            const field = new Field(3,3)
            const center = field.origin.getNE()

            allPathsAreNot(center)
        })

        describe('Calculate the distance between two nodes', () => {
            const field = new Field(3,3)
            const node11 = field.getNode(1,1)
            const node21 = field.getNode(2,1)
            const node22 = field.getNode(2,2)

            it(`Test ${counter}: Horizontal distance minimum value is 10`, () => {
                expect(field.calculateDistance(node11, node21)).to.equal(10)
            })
            counter++

            it(`Test ${counter}:   Vertical distance minimum value is 10`, () => {
                expect(field.calculateDistance(node22, node21)).to.equal(10)
            })
            counter++

            it(`Test ${counter}:   Diagonal distance minimum value is 14`, () => {
                expect(field.calculateDistance(node11, node22)).to.equal(14)
            })
            counter++

        })
    })
})

function nodeIs(node, value=null, append=''){
    try {
        nullCheck(node)
        
        it(`Test ${counter}:${append} node is ${value}`, () => {
            expect(node).to.equal(value)
        })
    } catch(error) {

        it(`Test ${counter}: node is ${value} threw an error`, () => {
            expect(node).to.equal(value)
        })

        console.log(error)
    } finally {
        counter++
    }
}

function thesePathsAre(paths, value=null){
    paths.forEach(path => {
        let pathTo
        path === null
            ? pathTo = ` Path to ${path}`
            : pathTo = ` Path to ${path.getLocation()}`
        nodeIs(path, value, pathTo)
    })
}

function allPathsAre(node, value=null){
    const allPaths = [
        node.getEA(),
        node.getNO(),
        node.getWE(),
        node.getSO(),
        node.getNE(),
        node.getNW(),
        node.getSW(),
        node.getSE()
    ]

    thesePathsAre(allPaths, value)
}

function nodeIsNot(node, value=null, append=''){
    try {
        nullCheck(node)
        
        it(`Test ${counter}:${append} node is not ${value}`, () => {
            expect(node).to.not.equal(value)
        })
    } catch(error) {

        it(`Test ${counter}: node is not ${value} threw an error`, () => {
            expect(node).to.not.equal(value)
        })

        console.log(error)
    } finally {
        counter++
    }
}

function thesePathsAreNot(paths, value=null){

    paths.forEach(path => {
        let pathTo
        path === null
            ? pathTo = ` Path to ${path}`
            : pathTo = ` Path to ${path.getLocation()}`
        nodeIsNot(path, value, pathTo)
    })
}

function allPathsAreNot(node, value=null){
    const allPaths = [
        node.getEA(),
        node.getNO(),
        node.getWE(),
        node.getSO(),
        node.getNE(),
        node.getNW(),
        node.getSW(),
        node.getSE()
    ]

    thesePathsAreNot(allPaths, value)
}

function positionIs(node, intX=null, intY=null){
    try {
        nullCheck(node)
        it(`Test ${counter}: ${node.getLocation()}.position.x is ${intX}`, () => {
            expect(node.position.x).to.eql(intX)
        })
        counter++

        it(`Test ${counter}: ${node.getLocation()}.position.y is ${intY}`, () => {
            expect(node.position.y).to.eql(intY)
        })
        counter++
    } catch(error) {
        // console.error(error)
        it(`Test ${counter}: node.position.x is ${intX} threw an error`, () => {
            expect(false).to.eql(true)
        })
        counter++

        it(`Test ${counter}: node.position.y is ${intY} threw an error`, () => {
            expect(false).to.eql(true)
        })
        counter++
    }
}

function coverIs(node, int=0){
    try {
        it(`Test ${counter}: Cover is ${int}`, () => {
            expect(node.getCover()).to.equal(int)
        })
        counter++
    } catch(error) {
        // console.log(error)
        it(`Test ${counter}: Cover is ${int} threw an error`, () => {
            expect(true).to.equal(false)
        })
        counter++
    }



}

function nullCheck(node){
    if(node === null){
        return new TypeError('NullNodeError: the node is null');
    }
}

/**

describe(``, () => {
    describe(``, () => {
        it(`Test ${counter}: `, () => {
    
        })
        counter++

    })    
})

 */