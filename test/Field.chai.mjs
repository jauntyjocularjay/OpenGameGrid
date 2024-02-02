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
        it(`Test ${counter}: HexNodes constructor without arguments.`, () => {
            const node = new HexNode()
            expect(node.ea).to.equal(null)
            expect(node.ne).to.equal(null)
            expect(node.no).to.equal(null)
            expect(node.nw).to.equal(null)
            expect(node.we).to.equal(null)
            expect(node.sw).to.equal(null)
            expect(node.so).to.equal(null)
            expect(node.se).to.equal(null)
            expect(node.position.x).to.equal(null)
            expect(node.position.y).to.equal(null)
        })
        counter++

        it(`Test ${counter}: HexNode constructor at origin`, () => {
            const node = new HexNode(0,0)
            expect(node.ea).to.equal(null)
            expect(node.ne).to.equal(null)
            expect(node.no).to.equal(null)
            expect(node.nw).to.equal(null)
            expect(node.we).to.equal(null)
            expect(node.sw).to.equal(null)
            expect(node.so).to.equal(null)
            expect(node.se).to.equal(null)
            expect(node.position.x).to.equal(0)
            expect(node.position.y).to.equal(0)
        })
        counter++

        it(`Test ${counter}: HexNode constructor at a nonzero point`, () => {
            const node = new HexNode(1,2)
            expect(node.ea).to.equal(null)
            expect(node.ne).to.equal(null)
            expect(node.no).to.equal(null)
            expect(node.nw).to.equal(null)
            expect(node.we).to.equal(null)
            expect(node.sw).to.equal(null)
            expect(node.so).to.equal(null)
            expect(node.se).to.equal(null)
            expect(node.position.x).to.equal(1)
            expect(node.position.y).to.equal(2)
        })
        counter++
    })

    describe(`Field`, () => {
        it(`Test ${counter}: A field is made up of at least one node.`, () => {
            const field = new Field(1,1)
            
            expect(field.origin.ea).to.equal(null)
            expect(field.origin.ne).to.equal(null)
            expect(field.origin.no).to.equal(null)
            expect(field.origin.nw).to.equal(null)
            expect(field.origin.we).to.equal(null)
            expect(field.origin.sw).to.equal(null)
            expect(field.origin.so).to.equal(null)
            expect(field.origin.se).to.equal(null)

            expect(field.origin.position.x).to.equal(0)
            expect(field.origin.position.y).to.equal(0)

            expect(field.lastNode).to.equal(null)
            expect(field.currentNode).to.equal(null)

        })
        counter++

        it(`Test ${counter}: A field made up up more than 1 node`, () => {
            const field = new Field(2,2)

            expect(field.lastNode).to.equal(null)
            expect(field.currentNode).to.equal(null)
            console.log('field:', field)

            const origin = field.getNode(0,0)
            expect(origin.ea).to.not.equal(null)
            expect(origin.no).to.not.equal(null)
        })
        counter++

    })
})





/**

describe(``, () => {
    describe(``, () => {
        it(`Test ${counter}: `, () => {
    
        })
        counter++

    })    
})

 */