import {
    Enum,
    ExtEnum
} from './libs/EnumJS/ENUM.mjs'



const CARDINAL = new ExtEnum([{'CARDINAL':10}, {'DIAGONAL':14}])
const DIAGONAL = new ExtEnum([{'DIAGONAL':14}, {'CARDINAL':10}])
const pathEA = new Enum(['ea','ne','no','nw','we','sw','so','se'])
const pathNE = new Enum(['ne','no','nw','we','sw','so','se','ea'])
const pathNO = new Enum(['no','nw','we','sw','so','se','ea','ne'])
const pathNW = new Enum(['nw','we','sw','so','se','ea','ne','no'])
const pathWE = new Enum(['we','sw','so','se','ea','ne','no','nw'])
const pathSW = new Enum(['sw','so','se','ea','ne','no','nw','we'])
const pathSO = new Enum(['so','se','ea','ne','no','nw','we','sw'])
const pathSE = new Enum(['se','ea','ne','no','nw','we','sw','so'])

export class Field {

    static CARDINAL = CARDINAL
    static DIAGONAL = DIAGONAL
    static pathEA = pathEA
    static pathNE = pathNE
    static pathNO = pathNO
    static pathNW = pathNW
    static pathWE = pathWE
    static pathSW = pathSW
    static pathSO = pathSO
    static pathSE = pathSE

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

    findPath(pts, currentNode, destination){

    }

    goDiagonal(pts, currentNode, destination){
        const posX2 = destination.position.x
        const posY2 = destination.position.y
        const posx1 = currentNode.position.x
        const posY1 = currentNode.position.y

        if(this.goNE()){
            pts = pts - DIAGONAL.v()
            this.goDiagonal(pts, currentNode.getNE(), destination)
        } else if (posX2 - posx1 < 0 && posY2 - posY1 < 0){
            pts = pts - DIAGONAL.v()
            this.goDiagonal(pts, currentNode.getSW(), destination)            
        } else if(posX2 - posx1 > 0 && posY2 - posY1 < 0){
            pts = pts - DIAGONAL.v()
            this.goDiagonal(pts, currentNode.getNW(), destination)
        } else if (posX2 - posx1 < 0 && posY2 - posY1 > 0){
            pts = pts - DIAGONAL.v()
            this.goDiagonal(pts, currentNode.getSE(), destination)
        } else if ( (posY2 - posY1 === 0) ||
                    (posX2 - posx1 === 0 )){
            this.goCardinal(pts, currentNode, destination)
        } else {
            // both are zero, arrived at destination
            return
        }
    }

    goCardinal(pts, currentNode, destination){

    }

    pathIsAvailable(node, pathEnum){
        const target = node.path[pathEnum.v()]
        if(     target !== null &&
                target.cover === 0){
            return true
        } else {
            return false
        }
    }

    goNO(pts, currentNode, destination){
        const posX2 = destination.position.x
        const posY2 = destination.position.y
        const posX1 = currentNode.position.x
        const posY1 = currentNode.position.y
        const valid = 
            posX2 - posX1 === 0 &&
            posY2 - posY1 > 0 &&
            currentNode.getNO() !== null &&
            this.coverBlocks(currentNode, currentNode.getSO()) &&
            pts - CARDINAL.valueOf() >= 0

        return valid
    }

    goSO(pts, currentNode, destination){
        const valid = 
            destination.getX() - currentNode.getX() === 0 &&
            destination.getY() - currentNode.getY() < 0 &&
            currentNode.getSO() !== null &&
            this.coverBlocks(currentNode, currentNode.getSO()) &&
            pts - CARDINAL.valueOf() >= 0 
        
        return valid
    }

    goEA(pts, currentNode, destination){
        const valid = 
            destination.getX() - currentNode.getX() > 0 &&
            destination.getY() - currentNode.getY() === 0 &&
            currentNode.getEA() !== null &&
            this.coverBlocks(currentNode, currentNode.getEA()) &&
            pts - CARDINAL.valueOf() >= 0 
        
        return valid
    }

    goWE(pts, currentNode, destination){
        const valid = 
            destination.getX() - currentNode.getX() > 0 &&
            destination.getY() - currentNode.getY() === 0 &&
            currentNode.getWE() !== null &&
            this.coverBlocks(currentNode, currentNode.getWE()) &&
            pts - CARDINAL.valueOf() >= 0 
        
        return valid
    }

    goNE(pts, currentNode, destination){
        const posX2 = destination.position.x
        const posY2 = destination.position.y
        const posx1 = currentNode.position.x
        const posY1 = currentNode.position.y
        const valid = 
            posX2 - posx1 > 0 && posY2 - posY1 > 0 &&
            currentNode.getNE() !== null &&
            this.coverBlocks(currentNode, currentNode.getNE()) &&
            pts - DIAGONAL.v() >= 0 
        
        return valid
    }

    coverBlocks(node1, node2, mod=0){
        return node2.getZ() - node1.getZ() < 2 + mod
    }

}

export class Node {

    static CARDINAL = CARDINAL
    static DIAGONAL = DIAGONAL
    static pathEA = pathEA
    static pathNE = pathNE
    static pathNO = pathNO
    static pathNW = pathNW
    static pathWE = pathWE
    static pathSW = pathSW
    static pathSO = pathSO
    static pathSE = pathSE

    constructor( posX=null, posY=null, posZ=null, cover='ZERO' ){
        /**
         * Node represents a node on a grid of squares. Each square on the grid 
         * has a path to each adjascent node. However, this implementation takes into
         * account the length of the hypotnuse for diagonal movement.
         * @constructor 
         * @param { number } posX represents the location of the node in the x-direction
         * @param { number } posY represents the location of the node in the y-direction
         * @param { number } posZ represents the height of the square
         */

        this.path = { 
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
                pathType: DIAGONAL
            },
            nw: {
                node: null,
                pathType: DIAGONAL
            },
            sw: {
                node: null,
                pathType: DIAGONAL
            },
            se: {
                node: null,
                pathType: DIAGONAL
            }
        }

        this.position = {
            x: posX,
            y: posY,
            z: posZ
        }

        /**
         * @property { number } cover
         * @todo finish this implementation
         *          Cover is a modifier on toHit chance units get as a bonus
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
        return this.path.ea.node
    }

    setEA(node){
        this.path.ea.node = node
    }

    getNE(){
        return this.path.ne.node
    }

    setNE(node){
        this.path.ne.node = node
    }

    getNO(){
        return this.path.no.node
    }

    setNO(node){
        this.path.no.node = node
    }

    getNW(){
        return this.path.nw.node
    }

    setNW(node){
        this.path.nw.node = node
    }

    getWE(){
        return this.path.we.node
    }

    setWE(node){
        this.path.we.node = node
    }

    getSW(){
        return this.path.sw.node
    }

    setSW(node){
        this.path.sw.node = node
    }

    getSO(){
        return this.path.so.node
    }

    setSO(node){
        this.path.so.node = node
    }

    getSE(){
        return this.path.se.node
    }

    setSE(node){
        this.path.se.node = node
    }

    getX(){
        return this.position.x
    }

    setX(posX){
        this.position.x = posX
    }

    getY(){
        return this.position.y
    }

    setY(posY){
        this.position.x = posY
    }

    getZ(){
        return this.position.z
    }

    setZ(posZ){
        this.position.x = posZ
    }
}
