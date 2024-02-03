import {
    Enum
} from './libs/EnumJS/ENUM.mjs'

export class Field {
    constructor(width, depth){
        this.origin = new HexNode(0,0)
        this.currentNode = this.origin
        this.lastNode = this.origin
    }

    linkEasterly(startingNode, width){
    }

    linkNortherly(startingNode, width, depth){
    }

    linkAll(start) {
    }
    
    

    getNode(positionX, positionY) {
    }
    
}

export class HexNode {
    constructor( posX=null, posY=null ){
        // console.log(`Creating HexNode at position ${posX},${posY}`);

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


