'use debugger'

import {
    Grid,
    Node
} from '../Grid.mjs'
import {
    expect
} from 'chai'
import {
    valueMatch,
    throwsError,
    count,
    matches,
    nullCheck,
    threwError,
    have,
    is,
    did
} from './ChaiFunctions/ChaiFunctions.mjs'



describe('Grid.chai.mjs functions', () => {
    describe('Testing methods deal with errors', () => {
        const node = null
        const nodes = [null, null, null]
        const path = node
        const paths = [null, null, null]

        throwsError('matches()', nodesMatch, null, true, TypeError)
        throwsError('nodeEvaluatesTo()', nodeEvaluatesTo, node, false, TypeError)
        throwsError('theseNodesEvaluateTo()', theseNodesEvaluateTo, nodes, false, TypeError)
        throwsError('pathIs()', pathIs, path, false, TypeError)
        throwsError('thesePathsAre()', thesePathsAre, paths, false, TypeError)
        throwsError('allPathsAre()', allPathsAre, node, true, TypeError)
        throwsError('indicesAre()', indicesAre, null, TypeError)
        throwsError('CoverIs()', coverIs, null, TypeError)
        throwsError('nodeAlias()', nodeAlias, null, false, TypeError)
    })
})

describe('Grid.mjs', () => {
    describe('Node', () => {
        describe('Node methods deal with errors', () => {
            const node = null
            const origin = new Node(0,0)
            throwsError('Node.matches()', nodesMatch)
            throwsError('Node.setCover()', origin.setCover)
            throwsError('Node.matches()', origin.matches, null, true, TypeError)
        })

        describe('Nodes constructor without arguments.', () => {
            const node = new Node()

            allPathsAre(node)
            indicesAre(node)
            coverIs(node)
        })

        describe('Node constructor at origin', () => {
            const node = new Node(0,0)

            // allPathsAre(node)
            indicesAre(node, 0, 0)
        })

        describe('Node constructor at a nonzero point', () => {
            const node = new Node(1,2)

            allPathsAre(node)
            indicesAre(node, 1, 2)
        })

        describe('Node matching works', () => {
            const origin = new Node(0,0,0)
            const notOrigin = new Node(1,1,0)
            const anotherOrigin = new Node(0,0,0)

            nodesMatch(origin, notOrigin, false)
            nodesMatch(origin, anotherOrigin)
        })
    })

    describe('Grid', () => {
        describe("A grid of one node's links are all nulled", () => {
            const grid = new Grid(1,1)
            const origin = grid.origin

            allPathsAre(origin)
            indicesAre(origin, 0, 0)
        })

        describe('A grid made up of more than 1 node can use the grid.getNode() method', () => {
            const grid = new Grid(2, 2);
        
            const node01 = grid.getNode(0, 1)
            const node10 = grid.getNode(1, 0)
            const node11 = grid.getNode(1, 1)
        
            indicesAre(node01, 0, 1)
            indicesAre(node10, 1, 0)
            indicesAre(node11, 1, 1)
        })

        describe('A grid made up more than 1 node', () => {
            const grid = new Grid(2,2)
            let node = grid.origin
            let paths

            paths = [
                node.getPathEA(),
                node.getPathNE(),
                node.getPathNO()
            ]
            thesePathsAre(paths,false)

            paths = [
                node.getPathNW(),
                node.getPathWE(),
                node.getPathSW(),
                node.getPathSO(),
                node.getPathSE()
            ]
            thesePathsAre(paths)

            node = node.getNE()
            paths = [
                node.getPathEA(),
                node.getPathNE(),
                node.getPathNO(),
                node.getPathNW(),
                node.getPathSE()
            ]
            
            thesePathsAre(paths)

            paths = [
                node.getPathWE(),
                node.getPathSW(),
                node.getPathSO()
            ]

            thesePathsAre(paths, false)

        })

        describe('The center node in a 3x3 grid will have all of its links occupied', () => {
            const grid = new Grid(3,3)
            const center = grid.origin.getNE()

            allPathsAre(center, null, false)
        })


    })

    describe('Pathfinding', ()=>{
        describe('Available paths', () => {

            const grid = new Grid(3,3)
            let subject = grid.getNode(1,1)
            let paths = []

            allPathsAre(subject, null, false)

            subject = new Node(0,0)

            allPathsAre(subject)

            subject = grid.origin.getNO()
            paths = [
                subject.getPathNO(),
                subject.getPathNE(),
                subject.getPathEA(),
                subject.getPathSE(),
                subject.getPathSO()
            ]

            thesePathsAre(paths, null, false)

            paths = [
                subject.getPathNW(),
                subject.getPathWE(),
                subject.getPathSW()
            ]

            thesePathsAre(paths)

        })

        describe('Pathfinding fundamentals', () => {
            const grid = new Grid(4,4)
            let currentNode = grid.origin.getEA()
            let start = grid.origin.getEA()
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
        })

        describe('Pathfinding', () => {
            const grid = new Grid(4,4)
            let start = grid.origin.getEA()
            let destination
            let result

            grid.getNode(2,0).setEA(null)
            grid.getNode(1,2).setEA(null)
            grid.getNode(0,2).setEA(null)
            grid.getNode(3,2).setNO(null)
            grid.getNode(1,1).setEA(null)
            grid.getNode(0,1).setEA(null)
            grid.origin.getNO().getNO().setNO(null)

            start = grid.getNode(3,2)
            destination = grid.getNode(0,1)
            result = grid.findPath(100,start,destination)

            nodesMatch(start, result)

            destination = start
            start = result
            result = grid.findPath(100,start,destination)

            nodesMatch(start, result)

            destination = grid.getNode(0,2)
            start = grid.getNode(3,1)
            result = grid.findPath(100,start,destination)

            nodesMatch(start,result)
        })
    })
})

function nodesMatch(node1, node2, bool=true){
    try {
        nullCheck(node1)
        nullCheck(node2)

        const description = 
            count() + nodeAlias(node1) + matches(bool) + nodeAlias(node2)

        it(description, () => {
            bool
                ? expect(node1.matches(node2)).to.be.true
                : expect(node1.matches(node2)).to.be.false
        })
    } catch(error) {
        const description = 
            count() + nodeAlias(node1) + matches(bool) + nodeAlias(node2)

        it(description + threwError, () => {
            expect(true).to.eql(false)
        })
    }
}

function nodeEvaluatesTo(node, bool=true, value=null){
    try{
        const evaluatesTo = bool 
            ? 'evaluates to '
            : 'does not evaluate to '

        const description = 
            count() + nodeAlias(node) + evaluatesTo + value

        it(description,() => {
            bool
                ? expect(node).to.eql(value)
                : expect(node).to.not.eql(value)
        })
    } catch(error){
        it(description + `nodeEvaluatesTo()` + threwError,() => {
            expect(true).to.eql(false)
        })

        console.log(error)
    }

}

function theseNodesEvaluateTo(nodes, bool=true, value=null){
    nodes.forEach(node => {        
        nodeEvaluatesTo(node, bool, value)
    })
}

function pathIs(path, bool=true, value=null){
    try {
        nullCheck(path)

        const description = count() + path.alias + is(bool) + value

        it(description, () => {
            bool
                ? expect(path.node).to.eql(value)
                : expect(path.node).to.not.eql(value)
        })
    } catch(error) {
        const description = count() + 'path check' + is(bool) + value
        it(description + threwError, () => {
            expect(true).to.eql(false)
        })
    }
}

function thesePathsAre(paths, bool=true, value=null){
    paths.forEach(path => {
        pathIs(path, bool, value)
    })
}

function allPathsAre(node, bool=true, value=null){
        nullCheck(node)

        const paths = node.getPaths()
        thesePathsAre(paths, bool, value)
}

function indicesAre(node, intX=null, intY=null, intZ=null){
    try {
        nullCheck(node)

        // valueMatch(node.getX(), intX)
        // valueMatch(node.getY(), intY)
        // if(intZ){
        //     valueMatch(node.getZ(), intZ)
        // }

        let description 
        
        description = count() + node.locationToString() + ' getX() is ' + intX

        it(description, () => {
            expect(node.getX()).to.eql(intX)
        })

        description = count() + node.locationToString() + ' getY() is ' + intY
        it(description, () => {
            expect(node.getY()).to.eql(intY)
        })

        if(intZ !== null) {

            description = count() + node.locationToString() + ' getZ() ' + intZ
            it(description, () => {
                expect(node.getZ()).to.eql(intZ)
            })

        }

    } catch(error) {
        // console.error(error)
        // valueMatch(false, true)


        let description = count() + node.locationToString() + ' indices check threw an error'
        it(description, () => {
            expect(false).to.eql(true)
        })

    }
}

function coverIs(node, int=0){
    try {
        nullCheck(node)

        const description = count() + node.locationToString() + ' cover is ' + int
        it(description, () => {
            expect(node.getCover()).to.equal(int)
        })
        count()
    } catch(error) {

        // console.log(error)
        const description = count() + node.locationToString() + ' cover is ' + int

        it(description + threwError, () => {
            expect(true).to.equal(false)
        })
        count()
    }
}

function nodeAlias(node){
    if(node === null){
        return 'null node'
    } else {
        return node.locationToString()
    }
}