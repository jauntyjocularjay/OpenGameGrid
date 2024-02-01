import { 
    // Field,
    HexNode
} from '../Field.mjs'
import {
    expect
} from 'chai'

let counter = 1;

describe(`Field tests`, () => {
    describe(`HexNode: the Unit of a Field`, () => {
        it(`Test ${counter}: HexNode constructor`, () => {
            const node = new HexNode()
            expect(node.ea).to.be(null)
            expect(node.ne).to.be(null)
            expect(node.no).to.be(null)
            expect(node.nw).to.be(null)
            expect(node.we).to.be(null)
            expect(node.sw).to.be(null)
            expect(node.so).to.be(null)
            expect(node.se).to.be(null)
            expect(node.positionX).to.be.null
            expect(node.positionY).to.be.null

            const originNode = new HexNode(0,0)
            expect(node.ea).to.be(null)
            expect(node.ne).to.be(null)
            expect(node.no).to.be(null)
            expect(node.nw).to.be(null)
            expect(node.we).to.be(null)
            expect(node.sw).to.be(null)
            expect(node.so).to.be(null)
            expect(node.se).to.be(null)
            expect(originNode.positionX).to.be(0)
            expect(originNode.positionY).to.be(0)

            
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