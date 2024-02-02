import {
    Enum
} from './libs/EnumJS/ENUM.mjs'

export class Field {
    constructor(width, depth){
        this.origin = new HexNode(0,0)
        this.currentNode = this.origin
        this.lastNode = this.origin

        for( let total = 0 ; total < width*depth ; total++ ){
            for( let j = 0 ; j < depth-1 ; j++ ){
                // Traverse the Y axis to get to the correct row 
                if( this.currentNode.no === null ){
                    this.currentNode.no = new HexNode(0,j)
                    this.currentNode.no.so = this.currentNode    
                }

                this.currentNode = this.currentNode.no
                
            }

            for ( let i = 0 ; i < width-1 ; i++ ){
                // Traverse the X axis to get to the correct column
                if( this.currentNode.ea === null ){
                    this.currentNode.ea = new HexNode(
                        this.currentNode.position.y, 
                        this.currentNode.position.x + 1)
                    this.currentNode.ea.we = this.currentNode
                }

                this.currentNode = this.currentNode.ea
            }
        }

        this.currentNode = null
        this.lastNode = null
    }

    getNode(positionX,positionY){
        let posX = positionX - 1
        let posY = positionY - 1
        this.currentNode = this.origin;

        for( let i = 0 ; i < posX ; i++ ){
            this.currentNode = this.currentNode.ea
        }
        for( let i = 0 ; i < posY ; i++ ){
            this.currentNode = this.currentNode.no
        }

        this.currentNode = null
        this.lastNode = null

        return this.currentNode
    }

}

export class HexNode {
    constructor( posX=null, posY=null ){
            this.ea = null,
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
         * Cover is a cosine in the positive quandrant 
         * that determines the aim modifier on a hit 
         * roll. As a player approaches 0/12*pi radians
         * a player comes into flanking range. If a 
         * player goes beyond 0*pi radians, the player
         * is in flanking position and gets a bonus.
         *  */ 
        const cover = new Enum([0,1,2])
    }
}

