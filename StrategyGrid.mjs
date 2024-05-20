import {
    Grid
} from './Grid.mjs'



class StrategyGrid extends Grid {
/**
 * @todo write implementation of strategy grid with cover mechanics
 * @param {} width 
 * @param {*} depth 
 */

    constructor(width, depth){
        super(width, depth)
        this.populateGrid(() => {cover = new Enum('ZERO', 'HALF', 'WHOLE')})
        
    }

    setCover( cover ){
        /**
         * @method setCover sets the cover of the node
         * @param { string } cover is the value corresponding to 
         *      the enum value
         * @throws { TypeError } if the argument is not a string
         * @throws { RangeError } if the argument is not a valid 
         *      cover value
         * @returns { void }
         */
        if( typeof cover === 'string'){
            this.data.cover.select(cover)
        } else if( cover === 0 ){
            this.data.cover.select('ZERO')
        } else if( cover === 1 ){
            this.data.cover.select('ONE')
        } else if( cover === 2 ){
            this.data.cover.select('WHOLE')
        } else {
            throw new TypeError('Invalid setCover(arg) argument.')
        }
    }

    getCover(){
        /**
         * @method getCover returns the cover of the node
         * @returns { string } the cover of the node
         * @throws { RangeError } if the cover's value is out of range
         * @summary returns the cover of the node
         */
        if( this.data.cover.valueOf() === 'ZERO' ){
            return 0
        } else if( this.data.cover.valueOf() === 'HALF' ){
            return 1
        } else if( this.data.cover.valueOf() === 'WHOLE' ){
            return 2
        } else {
            throw new RangeError(`Cover's value is out of range`)
        }
    }

    coverBlocks(node1, node2, mod=0){
        /**
         * @method coverBlocks is a method that checks if the cover of the
         *     destination node blocks the path to the destination node
         * @param { Node } node1 is the node the path starts on
         * @param { Node } node2 is the node the unit wants to move to
         * @param { number } mod is the modifier to the cover value
         *      for use with abilities.
         * @returns { boolean } true if the cover blocks the path
         */
        return node2.getZ() - node1.getZ() < 2 + mod
    }
}

