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


    })

    describe('Pathfinding', ()=>{
        describe('Available paths', () => {

            /**
             * pathfinding NOT get[direction]
             */
            const field = new Field(3,3)
            let subject = field.origin.getNE()
            let paths

            allPathsAreAvailable(subject)

            subject = new Node(0,0)

            allPathsAreAvailable(subject, false)

            subject = field.origin.getNO()
            paths = [
                Node.no,
                Node.ne,
                Node.ea,
                Node.se,
                Node.so
            ]

            thesePathsAreAvailable(subject, paths)

            paths = [
                Node.nw,
                Node.we,
                Node.sw
            ]

            thesePathsAreAvailable(subject, paths, false)

        })

        describe('Pathfinding', () => {
            /**
             * @todo finish pathfinding tests
             */
            const field = new Field(1,1)
            field.origin.setEA(new Node(1,0))
            let currentNode = field.origin.getEA()
            let start

            currentNode.setEA(new Node(2,0))
            currentNode = currentNode.getEA()
            currentNode.setNE(new Node(3,1))
            currentNode = currentNode.getNE()
            currentNode.setNO(new Node(3,2))
            currentNode = currentNode.getNO()
            currentNode.setNW(new Node(2,3))
            currentNode = currentNode.getNW()
            currentNode.setWE(new Node(1,3))
            currentNode = currentNode.getWE()
            currentNode.setSW(new Node(0,2))
            currentNode = currentNode.getSW()
            currentNode.setSO(new Node(0,1))
            currentNode = currentNode.getSO()
            currentNode.setSE(field.origin.getEA())
            currentNode.getSE()

            start = field.origin.getEA()
            nodeIs(start, currentNode)

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

function pathIsAvailable(start, pathEnum, available=true){
    it(`Test ${counter}: ${start.getLocation()} ${pathEnum.v()} is${!available ? ' not' : ''} available`, () => {
        const valid = Field.pathIsAvailable(start, pathEnum)
        available
            ?   expect(valid).to.be.true
            :   expect(valid).to.be.false
    })
    counter++
}

function thesePathsAreAvailable(start, paths, available=true){
    paths.forEach(path => {
        pathIsAvailable(start, path, available)
    })
}

function allPathsAreAvailable(start, available=true){
    const paths = [
        Node.ea,
        Node.ne,
        Node.no,
        Node.nw,
        Node.we,
        Node.sw,
        Node.so,
        Node.se
    ]

    thesePathsAreAvailable(start, paths, available)
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