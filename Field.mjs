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
    }

    linkEasterly(node, width){
        let currentNode = node
        let lastNode = null

        for( let i = 1; i < width ; i++ ){
            currentNode.ea = new HexNode(0,i)
            lastNode = currentNode
            currentNode = currentNode.ea
            currentNode.we = lastNode
        }
    }

    linkNortherly(node, width, depth){
        let currentNode = node
        let lastNode = null
        for( let j = 1 ; j < depth ; j++ ){
            currentNode.no = new HexNode(j,0)
            lastNode = currentNode
            currentNode = currentNode.no
            currentNode.so = lastNode
            this.linkEasterly(currentNode, width)
        }
    }

    linkAll(start) {
    }
    
    

    getNode(positionX, positionY) {
        let currentNode = this.origin
        for( let j = 0 ; j <= positionY; j++ ){
            for( let i = 0 ; i < positionX ; i++ ){
                currentNode = currentNode.no
            }
            currentNode = currentNode.ea
        }

        return currentNode
    }
    
}

export class HexNode {
    constructor( posX=null, posY=null, alias='node' ){
        this.alias = alias

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

        /**
         * Cover is a modifier on toHit chance
         * units get as a bonus
         *  */ 
        this.cover = new Enum(['zero','half','whole'])
        // this.setCover('zero')
    }

    setCover( str ){
        this.cover.select(str)
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


