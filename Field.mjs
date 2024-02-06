import {
    Enum
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

        this.origin = new Node(0,0)
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
            currentNode.setEA(new Node(i,j))
            lastNode = currentNode
            currentNode = currentNode.getEA()
            currentNode.setWE(lastNode)
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
            currentNode.setNO(new Node(0,j))
            lastNode = currentNode
            currentNode = currentNode.getNO()
            currentNode.setSO(lastNode)
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
        
        if( start.getNO() !== null ){
            this.linkAll(start.getNO())
        }

        if( start.getEA() !== null ){
            this.linkAll(start.getEA())
        }
    }

    linkXYPositive(start){
        if(start.getNO() !== null && start.getNO().getEA() !== null){
            start.setNE(start.getNO().getEA())
            start.getNO().getEA().setSW(start)
        }
    }

    linkYPositive(start){
        if(     start.getNO() !== null && 
                start.getNO().getEA() !== null && 
                start.getEA() !== null){
            start.getEA().setNO(start.getNO().getEA())
            start.getNO().getEA().setSO(start.getEA())
        }
    }

    linkXYNegative(start){
        if(start.getNO() !== null && start.getEA() !== null){
            start.getNO().setSE(start.getEA())
            start.getEA().setNW(start.getNO())
        }
    }

    getNode(positionX, positionY) {
        let currentNode = this.origin

        if((positionX > this.getWidth()-1 || positionX < 0) && (positionY > this.getDepth()-1 || positionY < 0)){
            throw new RangeError('Out Of Bounds: the selected position is not on the field.')
        }

        if(currentNode.getNO() !== null){
            for( let j = 0 ; j < positionY; j++ ){
                currentNode = currentNode.getNO()
            }
        }

        if(currentNode.getEA() !== null){
            for( let i = 0 ; i < positionX ; i++ ){
                currentNode = currentNode.getEA()
            }
        }

        return currentNode

    }

    getWidth(){
        let currentNode = this.origin
        let i = 1

        while( currentNode.getEA() !== null ){
            currentNode = currentNode.getEA()
            i++
        }
        
        return i
    }

    getDepth(){
        let currentNode = this.origin
        let j = 1

        while( currentNode.getNO() !== null ){
            currentNode = currentNode.getNO()
            j++
        }

        return j
        
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
            this.cover.select('WHOLE')
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

    getEA(){
        return this.paths.ea.node
    }

    setEA(node){
        this.paths.ea.node = node
    }

    getNE(){
        return this.paths.ne.node
    }

    setNE(node){
        this.paths.ne.node = node
    }

    getNO(){
        return this.paths.no.node
    }

    setNO(node){
        this.paths.no.node = node
    }

    getNW(){
        return this.paths.nw.node
    }

    setNW(node){
        this.paths.nw.node = node
    }

    getWE(){
        return this.paths.we.node
    }

    setWE(node){
        this.paths.we.node = node
    }

    getSW(){
        return this.paths.sw.node
    }

    setSW(node){
        this.paths.sw.node = node
    }

    getSO(){
        return this.paths.so.node
    }

    setSO(node){
        this.paths.so.node = node
    }

    getSE(){
        return this.paths.se.node
    }

    setSE(node){
        this.paths.se.node = node
    }


}
