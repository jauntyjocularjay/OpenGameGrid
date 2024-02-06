import {
    Enum,
    ExtEnum
} from './libs/EnumJS/ENUM.mjs'



export class Field {
    constructor(width, depth){
        /**
         * Field represents a grid of squares. Each square on the grid is a node 
         * with a path to each adjascent node. However, this implementation takes 
         * into account the length of the hypotnuse for diagonal movement.
         * @constructor 
         * @param { number } width is the size in the x-direction
         * @param { number } depth is the size in the y-direction
         */
        if( width < 1 || depth < 1){
            throw new RangeError('Width and Depth must be greater than 1.')
        }

        this.origin = new Node(0,0,'origin')
        this.linkEasterly(this.origin, width)
        this.linkNortherly(this.origin, width, depth)
        this.linkAll(this.origin)
    }

    linkEasterly(node, width, j=0){
        /**
         * @method linkEasterly links nodes from x=0 to x = width
         * @param { Node } node node is the node to start with
         * @param { number }  width width is the size parameter in the x-direction
         * @param { number }  j is the current y=value of the nodes in the y-direction
         *          inherited from the @method LinkNortherly method.
         */
        let currentNode = node
        let lastNode = null

        for( let i = 1; i < width ; i++ ){
            currentNode.ea = new Node(i,j)
            lastNode = currentNode
            currentNode = currentNode.ea
            currentNode.we = lastNode
        }
    }

    linkNortherly(node, width, depth){
        /**
         * @method linkNortherly
         * @param { Node } node is the node to start with
         * @param { number }  width is the size in x-direction; 
         *      this is needed to pass to @method linkEasterly
         * @param { number }  j is the size in the y-direction
         */
        let currentNode = node
        let lastNode = null
        for( let j = 1 ; j < depth ; j++ ){
            currentNode.no = new Node(0,j)
            lastNode = currentNode
            currentNode = currentNode.no
            currentNode.so = lastNode
            this.linkEasterly(currentNode, width, j)
        }
    }

    linkAll(start) {
        /**
         * @method linkAll
         *      connects the field of nodes together by every available path. 
         */
        this.linkXYPositive(start)
        this.linkYPositive(start)
        this.linkXYNegative(start)
        
        if( start.no !== null ){
            this.linkAll(start.no)
        }

        if( start.ea !== null ){
            this.linkAll(start.ea)
        }
    }

    linkXYPositive(start){
        if(start.no !== null && start.no.ea !== null){
            start.ne = start.no.ea
            start.no.ea.sw = start
        }
    }

    linkYPositive(start){
        if(start.no !== null && start.no.ea !== null && start.ea !== null){
            start.ea.no = start.no.ea
            start.no.ea.so = start.ea
        }
    }

    linkXYNegative(start){
        if(start.no !== null && start.ea !== null){
            start.no.se = start.ea
            start.ea.nw = start.no
        }
    }

    getNode(positionX, positionY) {
        let currentNode = this.origin

        if(currentNode.no !== null){
            for( let j = 0 ; j < positionY; j++ ){
                currentNode = currentNode.no
            }
        }

        if(currentNode.ea !== null){
            for( let i = 0 ; i < positionX ; i++ ){
                currentNode = currentNode.ea
            }
        }

        if(currentNode.position.x === positionX && currentNode.position.y === positionY){
            return currentNode
        } else {
            throw new RangeError('Out Of Bounds: the selected position is not on the field.')
        }

    }

    calculateDistance(node1, node2){
        let deltaX = Math.abs(node2.position.x - node1.position.x)
        let deltaY = Math.abs(node2.position.y - node1.position.y)
        let deltaXY

        deltaX = Math.pow(deltaX, 2)
        deltaY = Math.pow(deltaY, 2)

        deltaXY = deltaX + deltaY

        deltaXY = Math.sqrt(deltaXY) * 10

        deltaXY = Math.floor(deltaXY)

        return deltaXY
    }

}

class Path extends Enum {

}



const CARDINAL = new Enum(['CARDINAL', 'DIAGNAL'])
const DIAGNAL = new Enum(['DIAGNAL', 'CARDINAL'])

export class Node {

    static CARDINAL = CARDINAL
    static DIAGNAL = DIAGNAL

    constructor( posX=null, posY=null, cover='ZERO' ){
        /**
         * Node represents a node on a grid of squares. Each square on the grid 
         * has a path to each adjascent node. However, this implementation takes into
         * account the length of the hypotnuse for diagonal movement.
         * @constructor 
         * @param { number } posX represents the location of the node in the x-direction
         * @param { number } posY represents the location of the node in the y-direction
         */

        this.paths = { 
            ea: {
                node: null,
                pathType: CARDINAL
            },
            no: {
                node: null,
                pathType: CARDINAL
            },
            we: {
                node: null,
                pathType: CARDINAL
            },
            so: {
                node: null,
                pathType: CARDINAL
            },
            ne: {
                node: null,
                pathType: DIAGNAL
            },
            nw: {
                node: null,
                pathType: DIAGNAL
            },
            sw: {
                node: null,
                pathType: DIAGNAL
            },
            se: {
                node: null,
                pathType: DIAGNAL
            }
        }

        this.ea = this.paths.ea.node
        this.ne = this.paths.ne.node
        this.no = this.paths.no.node
        this.nw = this.paths.nw.node
        this.we = this.paths.we.node
        this.sw = this.paths.sw.node
        this.so = this.paths.so.node
        this.se = this.paths.se.node

        this.position = {
            x: posX,
            y: posY
        }

        /**
         * @param cover
         * @todo 
         * finish this implementation
         * Cover is a modifier on toHit chance
         * units get as a bonus
         *  */ 
        this.cover = new Enum(['ZERO','HALF','WHOLE'])
        this.setCover(cover)
    }

    setCover( cover ){
        if( typeof cover === 'string'){
            this.cover.select(cover)
        } else if( cover === 0 ){
            this.cover.select('ZERO')
        } else if( cover === 1 ){
            this.cover.select('ONE')
        } else if( cover === 2 ){
            this.cover.select('ONE')
        }
    }

    getCover(){
        if( this.cover.valueOf() === 'ZERO' ){
            return 0
        } else if ( this.cover.valueOf() === 'HALF' ){
            return 1
        } else if ( this.cover.valueOf() === 'WHOLE' ){
            return 2
        } else {
            throw new RangeError(`Cover's value is out of range`)
        }
    }

    getLocation(){
        if(this.position.x === null || this.position.y === null){
            return 'node'
        } else {
            return `node@(${this.position.x},${this.position.y})`
        }
    }
}
