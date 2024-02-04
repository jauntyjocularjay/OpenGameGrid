'use debugger'

import { 
    Field,
    HexNode
} from '../Field.mjs'
import {
    expect
} from 'chai'

let counter = 1

describe(`Field.mjs`, () => {
    describe(`HexNodes`, () => {
        describe(`HexNodes constructor without arguments.`, () => {
            const node = new HexNode()

            allDirectionsAre(node)
            positionIs(node)
            coverIs(node)
        })

        describe(`HexNode constructor at origin`, () => {
            const node = new HexNode(0,0)

            allDirectionsAre(node)
            positionIs(node, 0, 0)
        })

        describe(`HexNode constructor at a nonzero point`, () => {
            const node = new HexNode(1,2)

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
        
            /**
             * @todo
             * Fix the Field.getNode() method
             */
            let node11;
            let node22;
            // const node11 = field.getNode(1, 1)
            // const node22 = field.getNode(2, 2)
        
            positionIs(node11,1,1)
            positionIs(node22,2,2)
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
                'nw',
                'we',
                'sw',
                'so',
                'se'
            ]
            
            directionIsNot(ne, 'ne')
            theseDirectionsAre(ne, directions)

        })

        describe(`The center node in a 3x3 field will have all of its links occupied`, () => {
            const field = new Field(3,3)
            const center = field.origin.ne

            allDirectionsAreNot(center)
        })
    })
})

function directionIs(node, direction, value=null){
    try {
        nullCheck(node)
        const directionString = expandDirection(direction)

        it(`Test ${counter}: ${node.alias}.${directionString} is ${value}`, () => {
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

        it(`Test ${counter}: ${node.alias}.${directionString} is NOT ${value}`, () => {
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
        it(`Test ${counter}: ${node.alias}.position.x is ${intX}`, () => {
            expect(node.position.x).to.eql(intX)
        })
        counter++

        it(`Test ${counter}: ${node.alias}.position.y is ${intY}`, () => {
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