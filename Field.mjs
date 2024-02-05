import {
    Enum
} from './libs/EnumJS/ENUM.mjs'

export class Field {
    constructor(width, depth){
        if( width < 1 || depth < 1){
            throw new RangeError('Width and Depth must be greater than 1.')
        }

        this.origin = new HexNode(0,0,'origin')
        this.linkEasterly(this.origin, width)
        this.linkNortherly(this.origin, width, depth)
        this.linkAll(this.origin)
    }

    linkEasterly(node, width, j=0){
        let currentNode = node
        let lastNode = null

        for( let i = 1; i < width ; i++ ){
            currentNode.ea = new HexNode(i,j)
            lastNode = currentNode
            currentNode = currentNode.ea
            currentNode.we = lastNode
        }
    }

    linkNortherly(node, width, depth){
        let currentNode = node
        let lastNode = null
        for( let j = 1 ; j < depth ; j++ ){
            currentNode.no = new HexNode(0,j)
            lastNode = currentNode
            currentNode = currentNode.no
            currentNode.so = lastNode
            this.linkEasterly(currentNode, width, j)
        }
    }

    linkAll(start) {
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

export class HexNode {
    constructor( posX=null, posY=null){
        this.ea = null
        this.ne = null
        this.no = null
        this.nw = null
        this.we = null
        this.sw = null
        this.so = null
        this.se = null

        this.position = {
            x: posX,
            y: posY
        }

        this.alias = null

        this.position.x === null && this.position.y === null
            ? this.alias = 'node'
            : this.alias = `(${this.position.x}, ${this.position.y})`

        /**
         * Cover is a modifier on toHit chance
         * units get as a bonus
         *  */ 
        this.cover = new Enum(['zero','half','whole'])
        // this.setCover('zero')
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
}


