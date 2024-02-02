import {
    Enum
} from './libs/EnumJS/ENUM.mjs'

export class Field {
    constructor(width, depth){
        this.origin = new HexNode(0,0)
        this.currentNode = this.origin
        this.lastNode = this.origin

        this.linkEasterly(this.origin, width)
        this.linkNortherly(this.origin, width, depth)
        this.linkAll(this.origin)

        this.currentNode = null
        this.lastNode = null
    }

    linkEasterly(startingNode, width){
        this.currentNode = startingNode
        this.lastNode = startingNode
        for ( let i = 0 ; i < width-1 ; i++ ){
            // Traverse the X axis to get to the correct column
            if( this.currentNode.ea === null ){
                this.currentNode.ea = new HexNode(
                    this.currentNode.position.x + 1,
                    this.currentNode.position.y)
                this.currentNode.ea.we = this.currentNode
            }

            this.currentNode = this.currentNode.ea
        }
    }

    linkNortherly(startingNode, width, depth){
        this.currentNode = startingNode
        this.lastNode = startingNode
        for( let j = 0 ; j < depth-1 ; j++ ){
            // Traverse the Y axis to get to the correct row 
            if( this.currentNode.no === null ){
                this.currentNode.no = new HexNode(
                    this.currentNode.position.x,
                    this.currentNode.position.y+1)
                this.currentNode.no.so = this.currentNode    
            }

            this.currentNode = this.currentNode.no

            this.linkEasterly(this.currentNode, width)
            
        }
    }

    linkAll(startingNode){
        /**
         * @todo fix this
         * faaaaaaaaaaaaaaaaaaaail
         * 
         */

        if(     startingNode.no != null &&
                startingNode.no.ea != null){
            startingNode.ne = startingNode.no.ea
            startingNode.no.ea.sw = startingNode
            startingNode.no.se = startingNode.ea.nw
            startingNode.ea.no = startingNode.no.ea
            startingNode.ea.no.so = startingNode.ea
            this.linkAll(startingNode.ea)
            this.linkAll(startingNode.no)
        }
    }

    getNode(positionX,positionY){
        this.currentNode = this.origin;

        for( let i = 0 ; i < positionX ; i++ ){
            this.currentNode = this.currentNode.ea
        }

        for( let i = 0 ; i < positionY ; i++ ){
            this.currentNode = this.currentNode.no
        }

        return this.currentNode
    }
}

export class HexNode {
    constructor( posX=null, posY=null ){
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
        this.cover = Object.create(new Enum(['zero','half','whole']))
        console.log('cover is:', this.cover)
        // this.setCover('zero')
    }

    setCover( str ){
        this.cover.select(str)
    }

    getCover(){
        if( this.cover === 'ZERO' ){
            return 0
        } else if ( this.cover === 'HALF' ){
            return 1
        } else if ( this.cover === 'WHOLE' ){
            return 2
        } else {
            throw new RangeError(`Cover's value is out of range`)
        }
    }
}


