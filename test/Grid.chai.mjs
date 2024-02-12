'use debugger'

import { 
    Grid,
    Node
} from '../Grid.mjs'
import {
    expect
} from 'chai'

let counter = 1
const ntab = '\n            '

describe(`Grid.mjs`, () => {
    describe(`Node`, () => {
        describe(`Nodes constructor without arguments.`, () => {
            const node = new Node()

            nodeEvaluatesTo(node.getEA())
            allPathsAre(node)
            indicesAre(node)
            coverIs(node)
        })

        describe(`Node constructor at origin`, () => {
            const node = new Node(0,0)

            allPathsAre(node)
            indicesAre(node, 0, 0)
        })

        describe(`Node constructor at a nonzero point`, () => {
            const node = new Node(1,2)

            allPathsAre(node)
            indicesAre(node, 1, 2)
        })

        describe(`Node matching works`, () => {
            const origin = new Node(0,0,0)
            const notOrigin = new Node(1,1,0)
            const anotherOrigin = new Node(0,0,0)

            nodesMatch(origin, notOrigin, false)
            nodesMatch(origin, anotherOrigin)
        })
    })

    describe(`Grid`, () => {
        describe(`A field of one node's links are all nulled`, () => {
            const field = new Grid(1,1)
            const origin = field.origin

            allPathsAre(origin)
            indicesAre(origin, 0, 0)
        })

        describe(`A field made up of more than 1 node can use the Field.getNode() method`, () => {
            const field = new Grid(2, 2);
        
            const node01 = field.getNode(0, 1)
            const node10 = field.getNode(1, 0)
            const node11 = field.getNode(1, 1)
        
            indicesAre(node01, 0, 1)
            indicesAre(node10, 1, 0)
            indicesAre(node11, 1, 1)
        })

        describe(`A field made up more than 1 node`, () => {
            const field = new Grid(2,2)
            let node = field.origin

            let paths

            paths = [
                node.getEA(),
                node.getNE(),
                node.getNO()
            ]
            theseNodesEvaluateTo(paths, false)

            paths = [
                node.getNW(),
                node.getWE(),
                node.getSW(),
                node.getSO(),
                node.getSE()
            ]
            theseNodesEvaluateTo(paths)
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
            const field = new Grid(3,3)
            const center = field.origin.getNE()

            allPathsAreNot(center)
        })


    })

    describe('Pathfinding', ()=>{
        describe('Available paths', () => {

            const field = new Grid(3,3)
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
            const field = new Grid(4,4)
            let currentNode = field.origin.getEA()
            let start = field.origin.getEA()
            let destination

            currentNode = currentNode.getEA()
            currentNode = currentNode.getNE()
            currentNode = currentNode.getNO()
            currentNode = currentNode.getNW()
            currentNode = currentNode.getWE()
            currentNode = currentNode.getSW()
            currentNode = currentNode.getSO()
            currentNode = currentNode.getSE()

            nodesMatch(start, currentNode)

            field.getNode(2,0).setEA(null)
            field.getNode(1,2).setEA(null)
            field.getNode(0,2).setEA(null)
            field.getNode(3,2).setNO(null)
            field.getNode(1,1).setEA(null)
            field.getNode(0,1).setEA(null)
            field.origin.getNO().getNO().setNO(null)
            start = field.getNode(3,2)
            destination = field.getNode(0,1)

            nodesMatch(start, field.findPath(100,start,destination))

            start = field.getNode(3,1)
            destination = field.getNode(0,2)

            nodesMatch(start,field.findPath(100,start,destination))
        })
    })
})

function nodesMatch(node1, node2, bool=true){
    nullCheck(node1)
    nullCheck(node2)

    const matches = bool 
        ? 'matches' 
        : 'does not match'

    const description = 
        `Test ${counter}:`+ ntab +
        `${node1.toString()}` + ntab + 
        matches + ntab +
        `${node2.toString()}`

    it(description, () => {
        bool
            ? expect(node1.matches(node2)).to.be.true
            : expect(node1.matches(node2)).to.be.false
    })
    
    counter++
}

function nodeEvaluatesTo(node, bool=true, value=null){
    try{
        const evaluatesTo = bool 
            ? 'evaluates to '
            : 'does not evaluate to '

        const description = 
            testCount() + nodeAlias(node) + evaluatesTo + value

        it(description,() => {
            bool
                ? expect(node).to.eql(value)
                : expect(node).to.not.eql(value)
        })
    } catch(error){
        it(`nodeEvaluatesTo()` + ' threw an error',() => {
            expect(true).to.eql(false)
        })

        console.log(error)
    } finally {
        counter++
    }

}

function theseNodesEvaluateTo(paths, bool=true, value=null){
    paths.forEach(path => {        
        nodeEvaluatesTo(path, bool, value)
    })
}

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
            : pathTo = ` Path to ${path.locationToString()}`
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
            : pathTo = ` Path to ${path.locationToString()}`
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
    it(`Test ${counter}: ${start.locationToString()} ${pathEnum.v()} is${!available ? ' not' : ''} available`, () => {
        const valid = Grid.pathIsAvailable(start, pathEnum)
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

function indicesAre(node, intX=null, intY=null, intZ=null){
    try {
        nullCheck(node)
        it(`Test ${counter}: ${node.locationToString()}.index.x is ${intX}`, () => {
            expect(node.getX()).to.eql(intX)
        })
        counter++

        it(`Test ${counter}: ${node.locationToString()}.index.y is ${intY}`, () => {
            expect(node.getY()).to.eql(intY)
        })
        counter++

        if(intZ !== null) {

            it(`Test ${counter}: ${node.locationToString()}.index.z is ${intZ}`, () => {
                expect(node.getZ()).to.eql(intZ)
            })
            counter++

        }

    } catch(error) {
        // console.error(error)
        it(`Test ${counter}: node.index.x is ${intX} threw an error`, () => {
            expect(false).to.eql(true)
        })
        counter++

        it(`Test ${counter}: node.index.y is ${intY} threw an error`, () => {
            expect(false).to.eql(true)
        })
        counter++

        if(intZ !== null) {

            it(`Test ${counter}: ${node.locationToString()}.index.z is ${intZ} threw an error`, () => {
                expect(false).to.be.true
            })
            counter++

        }
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

function testCount(){
    return `Test ${counter} - `
}

function nullCheck(node){
    if(!node){
        return new TypeError('Null Node Error: the node is null');
    }
}

function nodeAlias(node){
    if(node){
        return node.locationToString() + ' '
    } else {
        return 'null node '
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