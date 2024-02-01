import {
    Enum
} from './ext_libs/EnumJS/ENUM.mjs'

export class Field {
    constructor(width, depth){
        const origin = new HexNode(0, 0)
        const currentNode = origin
        const lastNode = origin

        for( let i = 0 ; i < width ; i++ ){
            // Traverse the Y axis to start the loop again
            for( let k = 0 ; k < width ; k++ ){
                lastNode = currentNode
                currentNode = origin.c
            }

            for( let j = 0 ; j < depth-1 ; j++ ){
                currentNode.a = new HexNode(j,i)
                lastNode = currentNode
                currentNode = currentNode.a
            }

            currentNode = origin

            currentNode.c = new HexNode(j+1,i)
            lastNode = currentNode
            currentNode = currentNode.c
        }
    }

    getNode(x,y){
        let x = x-1;
        let y = y-1;
        let currentNode = this.origin;

        for( let i = 0 ; i < x ; i++ ){
            currentNode = currentNode.a
        }
        for( let i = 0 ; i < y ; i++ ){
            currentNode = currentNode.c
        }

        return currentNode
    }

}

export class HexNode {
    constructor( posX=null, posY=null ){
        const ea = null
        const ne = null
        const no = null
        const nw = null
        const we = null
        const sw = null
        const so = null
        const se = null

        const positionX = posX
        const positionY = posY

        /**
         * Cover is a cosine in the positive quandrant 
         * that determines the aim modifier on a hit 
         * roll. As a player approaches 0/12*pi radians
         * a player comes into flanking range. If a 
         * player goes beyond 0*pi radians, the player
         * is in flanking position and gets a bonus.
         *  */ 
        const cover = new Enum(2,4,6,8,10,12)
    }
}

