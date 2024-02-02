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
            it(`Test ${counter}: East is unoccupied`, () => 
                {expect(node.ea).to.equal(null)})
            counter++

            it(`Test ${counter}: NorthEast is unoccupied`, () => 
                {expect(node.ne).to.equal(null)})
            counter++

            it(`Test ${counter}: North is unoccupied`, () => 
                {expect(node.no).to.equal(null)})
            counter++

            it(`Test ${counter}: NorthWest is unoccupied`, () => 
                {expect(node.nw).to.equal(null)})
            counter++

            it(`Test ${counter}: West is unoccupied`, () => 
                {expect(node.we).to.equal(null)})
            counter++

            it(`Test ${counter}: SouthWest is unoccupied`, () => 
                {expect(node.sw).to.equal(null)})
            counter++

            it(`Test ${counter}: South is unoccupied`, () => 
                {expect(node.so).to.equal(null)})
            counter++

            it(`Test ${counter}: SouthEast is unoccupied`, () => 
                {expect(node.se).to.equal(null)})
            counter++

            it(`Test ${counter}: position.x is nulled`, () => 
                {expect(node.position.x).to.equal(null)})
            counter++

            it(`Test ${counter}: Position Y is nulled`, () => 
                {expect(node.position.y).to.equal(null)})
            counter++

            console.log('cover is:', node.getCover())
            it(`Test ${counter}: Cover is zero by default`, () => 
                {expect(node.getCover()).to.equal(0)})
            counter++
        })

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

        describe(`A field made up up more than 1 node`, () => {
            const field = new Field(2,2)

            it(`Test ${counter}: lastNode is nulled`, () => {
                expect(field.lastNode).to.equal(null)
            })
            counter++

            it(`Test ${counter}: currentNode is nulled`, () => {
                expect(field.currentNode).to.equal(null)
            })
            counter++

            it(`Test ${counter}: origin.east is occupied`, () => {
                expect(field.origin.ea).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.north is occupied`, () => {
                expect(field.origin.no).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.NorthEast is occupied`, () => {
                expect(field.origin.ne).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.NorthWest is not occupied`, () => {
                expect(field.origin.nw).to.equal(null)
            })
            counter++
           
            it(`Test ${counter}: origin.West is not occupied`, () => {
                expect(field.origin.we).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.SouthWest is not occupied`, () => {
                expect(field.origin.sw).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.South is not occupied`, () => {
                expect(field.origin.so).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin.SouthEast is not occupied`, () => {
                expect(field.origin.se).to.equal(null)
            })
            counter++
            

            it(`Test ${counter}: origin north east node, west connects`, () => {
                expect(field.origin.ea.no.we).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin north east node, south connects`, () => {
                expect(field.origin.ea.no.so).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, southwest connects`, () => {
                expect(field.origin.ea.no.sw).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, east is unoccupied`, () => {
                expect(field.origin.ea.no.ea).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, south-east is unoccupied`, () => {
                expect(field.origin.ea.no.se).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, north east is unoccupied`, () => {
                expect(field.origin.ea.no.ne).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, north is unoccupied`, () => {
                expect(field.origin.ea.no.no).to.equal(null)
            })
            counter++
            
            it(`Test ${counter}: origin northeast node, northwest is unoccupied`, () => {
                expect(field.origin.ea.no.nw).to.equal(null)
            })
            counter++
            


        })

        it(`Test ${counter}: A field made up up more than 1 node can use the getNode() method`, () => {
            const field = new Field(2,2)

            const node = field.getNode(1,1)

            expect(node.position.x).to.eql(1)
            expect(node.position.y).to.eql(1)

        })
        counter++


        describe(`The center node in a 3x3 field will have all of its links occupied`, () => {
            const field = new Field(3,3)
            const center = field.origin.ne

            it(`Test ${counter}: center.east is not null`, () => {
                expect(center.ea).to.not.equal(null)    
            })
            counter++

            it(`Test ${counter}: center.NorthEast is not null`, () => {
                expect(center.ne).to.not.equal(null)
            })
            counter++

            it(`Test ${counter}: center.North is not null`, () => {
                expect(center.no).to.not.equal(null)    
            })
            counter++

            it(`Test ${counter}: center.NorthWest is not null`, () => {
                expect(center.nw).to.not.equal(null)
            })
            counter++

            it(`Test ${counter}: center.West is not null`, () => {
                expect(center.we).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: center.SouthWest is not null`, () => {
                expect(center.sw).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: center.South is not null`, () => {
                expect(center.so).to.not.equal(null)
            })
            counter++
            
            it(`Test ${counter}: center.SouthEast is not null`, () => {
                expect(center.se).to.not.equal(null)
            })
            counter++
        })
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