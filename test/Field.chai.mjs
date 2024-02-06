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

            allDirectionsAre(node)
            positionIs(node)
            coverIs(node)
        })

        describe(`HexNode constructor at origin`, () => {
            const node = new Node(0,0)

            allDirectionsAre(node)
            positionIs(node, 0, 0)
        })

        describe(`HexNode constructor at a nonzero point`, () => {
            const node = new Node(1,2)

            allDirectionsAre(node)
            positionIs(node, 1, 2)
        })
    })

    describe(`Field`, () => {
        describe(`A field of one node's links are all nulled`, () => {
            const field = new Field(1,1)
            const origin = field.origin
            allDirectionsAre(origin)
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

        describe(`A field made up up more than 1 node`, () => {
            const field = new Field(2,2)
            const origin = field.origin
            const ne = field.origin.ne

            let directions = [
                'we',
                'nw',
                'we',
                'sw',
                'so',
                'se'
            ]

            theseDirectionsAre(origin, directions)
            directionIsNot(origin, 'ea')
            directionIsNot(origin, 'no')

            directions = [
                'ea',
                'ne',
                'no',
                'nw',
                'se'
            ]
            
            theseDirectionsAre(ne, directions)

            directions = [
                'we',
                'sw',
                'so'
            ]

            theseDirectionsAreNot(ne, directions)

        })

        describe(`The center node in a 3x3 field will have all of its links occupied`, () => {
            const field = new Field(3,3)
            const center = field.origin.ne

            allDirectionsAreNot(center)
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

function directionIs(node, direction, value=null){
    try {
        nullCheck(node)
        const directionString = expandDirection(direction)

        it(`Test ${counter}: ${node.getLocation()}.${directionString} is ${value}`, () => {
            expect(node[direction]).to.eql(value)
        })
    
        counter++
    } catch(error) {
        // console.error(error)
        const directionString = expandDirection(direction)

        it(`Test ${counter}: node.${directionString} is ${value} threw an error`, () => {
            expect(false).to.eql(true)
        })

        counter++
    } 
}

function allDirectionsAre(node, value=null){
    const directionArray = [
            'ea',
            'ne',
            'no',
            'nw',
            'we',
            'sw',
            'so',
            'se'
        ]

    theseDirectionsAre(node, directionArray, value=null)
}

function theseDirectionsAre(node, directionArray, value=null){
    directionArray.forEach(direction => {
        directionIs(node,direction,value)
    })
}

function directionIsNot(node, direction, value=null){
    try {
        nullCheck(node)
        const directionString = expandDirection(direction)

        it(`Test ${counter}: ${node.getLocation()}.${directionString} is NOT ${value}`, () => {
            expect(node[direction]).to.not.eql(value)
        })
    
        counter++
    } catch(error) {
        // console.error(error)
        const directionString = expandDirection(direction)

        it(`Test ${counter}: node.${directionString} is NOT ${value} threw an error`, () => {
            expect(true).to.eql(false)
        })
    
        counter++
    }
}

function allDirectionsAreNot(node, value=null){
    const directionArray = [
        'ea',
        'ne',
        'no',
        'nw',
        'we',
        'sw',
        'so',
        'se'
    ]
    
    theseDirectionsAreNot(node, directionArray, value)
}

function theseDirectionsAreNot(node, directionArray, value=null){
    directionArray.forEach(direction => {
        directionIsNot(node, direction, value)
    })
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

function expandDirection(str){

    if( str === 'ea' ){
        return 'east'
    } else if( str === 'ne' ){
        return 'north east'
    } else if( str === 'no' ){
        return 'north'
    } else if( str === 'nw' ){
        return 'north west'
    } else if( str === 'we' ){
        return 'west'
    } else if( str === 'sw' ){
        return 'south west'
    } else if( str === 'so' ){
        return 'south'
    } else if( str === 'se' ){
        return 'south east'
    } else {
        throw new SyntaxError(`Invalid Direction value. Enter a direction in two character. ex. 'ea'`)
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