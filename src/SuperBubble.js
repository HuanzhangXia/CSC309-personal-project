"use strict"; 
/**
 * @file SuperBubble.js 
 * @see <a href="https://safe-sierra-87736.herokuapp.com/index.html"> for examples</a>
 */
(function(global, document, $) {

	function checkDOMelement(element) {
		var elm
		if (element instanceof HTMLElement) {
			elm = element;
		} else if (typeof element === 'string') {
			elm = document.querySelector(element);
		} else {
			throw new Error('The element you input is invalid');
		}
		if (!elm) {
			throw new Error('`' + element + '` could not be found in the DOM');
		}
		return elm;
	};
	/**
	 * The global options that will be passed to the constructor of the SuperBubble.
	 * @typedef {Object} options-SuperBubble
	 * @property {string | HTMLElement} element - A CSS selector for the HTML element or the HTMLElement itself (e.g. '#bubble' or document.querySelector('#bubble')) that will be manipulated. 
	 */

	/**
	 * The SuperBubble class is a super class in the library. All other SuperBubbles will extend this class.
	 */
	class SuperBubble {
		/**
		 * @param {options-SuperBubble} options - The global options that will be passed to the constructor 
		 */
		constructor (options) {
		    /**
		     *
		     * @type {boolean} 
		     */
			this.notEnd=true

			/**
			 * The HTMLElement that will be manipulated by the bubble.
			 * @type {HTMLElement} 
			 */
			this.element = checkDOMelement(options.element);
		}
	}

	/**
	 * The global options that will be passed to the constructor of the MoveBubble.
	 * @typedef {Object} options-MoveBubble
	 * @property {Array<number>} speed - An array of numbers that specifies the speed of the movement. The array should contain two numbers.
	 * @property {Array<number>} boardsize - An array of numbers that specifies the width and height of the moving area. 
	 * @property {number} [moveupdate] - The update interval between the movements (in ms). 
	 * @property {number} [moveTime] - The total time of the timed movement.
	 */

	/**
	* Move the element along with the direction specified by the speed.
	* @extends SuperBubble
	*/
	class MoveBubble extends SuperBubble{
		/**
		 * @param {options-MoveBubble} options - The global options that will be passed to the constructor 
		 */		
		constructor(options){
			super(options);
			var list
			if(!options.speed){
				list = [0,0]
			}else if(!isNaN(options.speed[0]) && !isNaN(options.speed[1])){
				list = [options.speed[0],options.speed[1]]
			}else{
				throw new Error('The speed must be an array of numbers!');
			}
			var list2
			if(!isNaN(options.boardsize[0]) && !isNaN(options.boardsize[1]) && options.boardsize[0]>0 && options.boardsize[1]>0){
				list2=[options.boardsize[0],options.boardsize[1]]
			} else{
				throw new Error('The boardsize must be an array of positive numbers!');
			}
			/**
			* An array of numbers that specifies the speed of the movement. The number on index 0 specifies the speed pointing right,
			* the number on index 1 specifies the speed pointing down.
			* @type {Array<number>}
			*/
			this.speed= list
			/**
			* An array of positive numbers that specifies the area of the movement. The number on index 0 specifies the width, the number on index 1 specifies the height.
			* @type {Array<number>}
			*/
			this.boardsize=list2
			/**
			* The update interval between the movements (in ms). 
			* @type {number}
			* @default 100
			*/
			this.moveupdate= checkPosInt(options.moveupdate) ? options.moveupdate : 100

			/**
			* The total time of movement (in ms). 
			* @type {number}
			* @default 3000
			*/
			this.moveTime=checkPosInt(options.moveTime) ? options.moveTime : 3000
			/**
			* An array of numbers that specifies the position of the element.
			* @type {Array<number>}
			*/
			this.position=[parseInt(this.element.style.left),parseInt(this.element.style.top)]

			/**
			* An array of numbers that specifies the width and height of the element.
			* @type {Array<number>}
			*/
			this.size=[parseInt(this.element.style.width),parseInt(this.element.style.height)]

			/**
			* The interval ID that specifies the movement update interval.
			* @type {number}
			* @default 0
			*/ 
			this.interval=0	
		}
		/**
		* First move with the direction and distance specified by the movement. Then chcek if the element hit the edge of the board. If so, change its direction.
		* @param {Array<number>} movement An array of numbers that specifies the speed.
		*/		
		bounceBack(movement){
			if(this.position[0]+movement[0]<0){
				this.speed[0]= Math.abs(movement[0])
			}else if(this.boardsize[0]<movement[0]+this.size[0]+this.position[0]){
				this.speed[0]= -Math.abs(movement[0])
			}else{
				this.speed[0]= movement[0]
			}
			if(this.position[1]+movement[1]<0){
				this.speed[1]= Math.abs(movement[1])
			}else if(this.boardsize[1]<movement[1]+this.size[1]+this.position[1]){
				this.speed[1]= -Math.abs(movement[1])
			}else{
				this.speed[1]= movement[1]
			}			
			// if(this.position[1]<Math.abs(movement[1]) && movement[1]<0){
			// 	this.speed[1]= -movement[1]
			// }else if(this.boardsize[1]-this.position[1]<Math.abs(movement[1])+this.size[1] && movement[1]>0){
			// 	this.speed[1]= -movement[1]
			// }else{
			// 	this.speed[1]=movement[1]
			// }
			this.position=[this.position[0]+this.speed[0],this.position[1]+this.speed[1]]
		}
		/**
		* Move with the diection and distance specified by the speed. Change the speed if the element hit the edge of the board.
		*/
		move(){
			if(!this.element.parentNode){
				this.notEnd=false
				return
			}			
			this.bounceBack(this.speed)
			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
		}

		/**
		* Set the moving interval. (If the element is not moving.)
		*/
		startMove() {
			if(!this.interval){
				const self = this; 
				this.interval=setInterval(function(){
					self.move()
					// console.log(self)
				}, this.moveupdate)				
			}


		}

		/**
		* Clear the moving interval. (If the element is moving.)
		*/
		stopMove(){
			if(this.interval){
				clearInterval(this.interval)
			}
			this.interval=0
		}
		/**
		* Start the movement by setting the moving interval. The element stop its movement after {@link moveTime} ms.
		*/		
		startTimedMove(){
			if(this.interval){
				return
			}
			const self = this; 
			this.startMove()
			setTimeout(function() {
				
				// console.log('overdue book!', self.title)
				self.stopMove();
				self.notEnd=0

			}, self.moveTime)
		}
		/**
		* Change the speed of the element. 
		* @param {Array<number>} newSpeed The new speed that will replace the original speed.
		*/ 
		changeSpeed(newSpeed) {
			// if(newSpeed < -Math.abs(this.speed[0]) | newSpeed< -Math.abs(this.speed[1]) | newSpeed>this.boardsize[0] |newSpeed>this.boardsize[1]){
			// 	return
			// }
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=newSpeed
			// console.log(this,s)
		}

		/**
		* Scale up/down the size of the element by adding constants to the width and height of the element.
		* @param {Array<number>} scale The number array where index 0 will be added to the width of the element and 
		* index 1 will be added to the height of the element.
		*/
		changeSize(scale){
			if(scale[0]> -this.size[0] && scale[1] > -this.size[1] ){
				this.size=[this.size[0]+scale[0],this.size[1]+scale[1]]
				this.element.style.width=this.size[0]+'px'
				this.element.style.height=this.size[1]+'px'
			}

		}


	}


	/**
	 * The global options that will be passed to the constructor of the RandomBubble.
	 * @typedef {Object} options-RandomBubble
	 * @property {Array<number>} speed - An array of numbers that specifies the speed of the movement. The array should contain two numbers.
	 * @property {Array<number>} boardsize - An array of numbers that specifies the width and height of the moving area. The array should contain two numbers.
	 * @property {number} [moveupdate] - The update interval between the movements (in ms). 
	 * @property {number} [probs] - A number that specifies the probability.
	 * @property {number} [moveTime] - The total time of the timed movement.	 
	 */	

	/**
	* Move the element semi-randomly among the board.
	* @extends MoveBubble
	*/
	class RandomBubble extends MoveBubble {
		/**
		 * @param {options-MoveBubble} options - The global options that will be passed to the constructor 
		 */			
		constructor(options) {
			super(options);
			/**
			* The probability for the element to change its moving direction and speed when moving.
			* @type {number}
			* @default 0.1
			*/ 			
			this.prob = !isNaN(options.probs) ? 0.1 : options.probs
		}

		/**
		* Randomly update the position and the speed, bounce back if the element hit the edge of the board.
		*/		
		randomMove(){
			if(Math.random() * 10<this.prob){
				const s=((Math.random() * 2) - 1)
				const a=Math.round((Math.abs(this.speed[0])+Math.abs(this.speed[1]))*s)
				const b=((Math.abs(this.speed[0])+Math.abs(this.speed[1]))-Math.abs(a))*(Math.floor(Math.random() * 2 )*2- 1)
				// console.log(a,b)
				this.bounceBack([a,b])
			}else{
				this.bounceBack(this.speed)
			}
		}

		/**
		* First update the position and the speed, then move the element to the updated position.
		*/
		move() {
			if(!this.element.parentNode){
				this.notEnd=false
				return
			}	
			this.randomMove()
			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
		}
	}
	function switchFloat(bubble){
		if (! typeof bubble.moveType === 'string'){
			throw new Error ("The type you input is not supported.")			
		}
		if((bubble.moveType).toUpperCase()=== ("floatRightbubble").toUpperCase()){
			bubble.speed=[Math.abs(bubble.speed[0]),bubble.speed[1]]
			return bubble.floatRight
		} else if ((bubble.moveType).toUpperCase() === ("floatLeftbubble").toUpperCase()){
			bubble.speed=[-Math.abs(bubble.speed[0]),bubble.speed[1]]
			return bubble.floatLeft
		} else if ((bubble.moveType).toUpperCase() === ("floatUpbubble").toUpperCase()){
			bubble.speed=[bubble.speed[0],-Math.abs(bubble.speed[1])]
			return bubble.floatUp
		} else if ((bubble.moveType).toUpperCase() === ("floatDownbubble").toUpperCase()){
			bubble.speed=[bubble.speed[0],Math.abs(bubble.speed[1])]
			return bubble.floatDown
		} else {
			throw new Error ("The type you input is not supported.")
		}
	}
	/**
	 * The global options that will be passed to the constructor of the FloatDownBubble.
	 * @typedef {Object} options-FloatBubble
	 * @property {Array<number>} speed - An array of numbers that specifies the speed of the movement. The array should contain two numbers.
	 * @property {Array<number>} boardsize - An array of numbers that specifies the width and height of the moving area. The array should contain two numbers.
	 * @property {number} [moveupdate] - The update interval between the movements (in ms). 
	 * @property {number} [moveTime] - The total time of the timed movement.	 
	 * @property {number} [probs] - A number that specifies the probability.
	 */	

	/**
	* Move the element semi-randomly among the board. If the type is 'flatUpbubble', the element will be moved randomly up to the board. In each movement,
	* the element will have equal chance to move up-left or up-right. In each move, the element will have chance to become bigger (with a certain probability).
	* The bubble will start to count the number of movement after the element hit the top edge of the board. If the count reaches
	* the endCount, the element will be removed. Similar manipulation will be conducted when the type is 'floatDownbubble', 'floatRightbubble' and 'floatLeftbubble'.
	* The bubble is case insensitive with the type. ('FLOATupbubble' and 'floatUpBubble' means the same type).
	* @extends MoveBubble
	*/
	class FloatBubble extends MoveBubble {
		/**
		 * @param {options-FloatBubble} options - The global options that will be passed to the constructor 
		 */			
		constructor(options) {
			super(options);
			/**
			* The type of the movement.
			* @type {string}
			* @default "floatUp"
			*/ 				
			this.moveType= options.moveType ? options.moveType : "floatUp"

			/**
			* The method that updates the size, speed and position of the element when the bubble is moving.
			* @type {Function}
			* @default floatUp()
			*/ 	
			this.float=switchFloat(this)
			/**
			* The method that counts the number of movement after the bubble hit the edge.
			* @type {Function}
			* @default floatUp()
			*/
			this.endCount=checkPosInt(options.endCount) ? options.endCount : 0
			/**
			* The probability for the element to change its moving direction and speed when moving.
			* @type {number}
			* @default 0.1
			*/ 	
			this.prob = !isNaN(options.probs) ? 0.1 : options.probs
		}
		/**
		* Randomly update the position and the speed to make the element "float right", bounce back if the element hit the edge of the board.
		*/		
		floatRight(){
			if(Math.random()*10<this.prob){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.element.style.width=this.size[0]+'px'
				this.element.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([this.speed[0],-this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}
			if(this.speed[0]<=0&&this.notEnd>0){
				// this.element.options="bubble.gif"
				this.endCount--
				this.speed=[0,0]
				this.position[0]=this.boardsize[0]-this.size[0]
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.element.remove()
			}

		}
		/**
		* Randomly update the position and the speed to make the element "float left", bounce back if the element hit the edge of the board.
		*/		
		floatLeft(){
			if(Math.random()*10<this.prob){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.element.style.width=this.size[0]+'px'
				this.element.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([this.speed[0],-this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}

			if(this.speed[0]>=0&&this.notEnd>0){
				// this.element.options="bubble.gif"
				this.endCount--
				this.speed=[0,0]
				this.position[0] =0
			}	
			if(this.endCount<0){
				this.notEnd=-1
				this.element.remove()
			}			
		}	
		/**
		* Randomly update the position and the speed to make the element "float up", bounce back if the element hit the edge of the board.
		*/	
		floatUp(){
			if(Math.random()*10<this.prob){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.element.style.width=this.size[0]+'px'
				this.element.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([-this.speed[0],this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}

			if(this.speed[1]>=0&&this.notEnd>0){
				// this.element.options="bubble.gif"
				this.endCount--
				this.speed=[0,0]
				this.position[1] =0
				// return
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.element.remove()
			}
		}		
		/**
		* Randomly update the position and the speed to make the element "float down", bounce back if the element hit the edge of the board.
		*/				
		floatDown(){
			if(Math.random()*10<this.prob){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.element.style.width=this.size[0]+'px'
				this.element.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([-this.speed[0],this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}

			if(this.speed[1]<=0&&this.notEnd>0){
				// this.element.options="bubble.gif"
				this.endCount--
				this.speed=[0,0]
				this.position[1]=this.boardsize[1]-this.size[1]
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.element.remove()
			}			
		}
		move() {
			if(!this.element.parentNode){
				this.notEnd=false
				return
			}			
			this.float()
			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
		}
	}

	/**
	 * The global options that will be passed to the constructor of the FunctionBubble.
	 * @typedef {Object} options-FunctionBubble
	 * @property {Array<number>} speed - An array of numbers that specifies the speed of the movement. The array should contain two numbers.
	 * @property {Array<number>} boardsize - An array of numbers that specifies the width and height of the moving area. The array should contain two numbers.
	 * @property {number} [moveupdate] - The update interval between the movements (in ms). 
	 * @property {number} [moveTime] - The total time of the timed movement.	 
	 * @property {Function} moveFunction - A function whose input is the time in ms and outputs a coordinate value (x,y).
	 */	

	/**
	* Let the initial position of the element to be the origin of the function. The FunctionBubble movements the element along the path of the moveFunction. In each movement, 
	* the moveFunction returns an (x,y) coordinate. Then, bubble will move the element to the corresponiding coordinate.
	* @extends MoveBubble
	*/
	class FunctionBubble extends MoveBubble {
		/**
		 * @param {options-FunctionBubble} options - The global options that will be passed to the constructor 
		 */			
		constructor(options) {
			super(options)
			/**
			* A function whose input is the time in ms and outputs a coordinate value (x,y). The element will be moved along the path of this function.
			* @type {Function}
			* @return {Array<number>} - A (x,y) coordinate array
			*/ 
			this.moveFunction=options.moveFunction
			/**
			* The initial position of the element. This property will be used as the origin.
			* @type {Array<number>}
			*/ 
			this.initialpos=[this.position[0],this.position[1]]
			/**
			* Counts the total number of movement update. 
			* @type {number}
			*/
			this.moveCount=0
		}

		/**
		* First count the moveCount, then find the next position of the element by calling the (@link moveFunction). Finally update the position.
		*/			
		move(){
			if(!this.element.parentNode){
				this.notEnd=false
				return
			}			
			this.moveCount++
			const t = this.moveupdate*(this.moveCount)
			const pos = this.moveFunction(t)
			if(!pos | !pos[0] | !pos[1]){
				throw new Error('The moveFunction is invalid!');
				return
			}
			this.position[0]=Math.round(this.initialpos[0]+pos[0])
			this.position[1]=Math.round(this.initialpos[1]-pos[1])
			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
		}
	}
	function checkSidePosSpeed(currentpos, boardsize, size, speed){
		if(currentpos[0]!==0 && currentpos[1]!==0 && (currentpos[0]+size[0])!==boardsize[0] && (currentpos[1]+size[1])!==boardsize[1]){
			if(!speed[0]===0){
				// console.log({position: [currentpos[0],boardsize[1]-size[1]], speed: [speed[0],0]},270)
				return {position: [currentpos[0],boardsize[1]-size[1]], speed: [speed[0],0]}
			} else {
				// console.log({position: [0,currentpos[1]], speed: [0,speed[1]]},274)
				return {position: [0,currentpos[1]], speed: [0,speed[1]]}
			}
		}else if (currentpos[0]===0){
			// console.log(278)
			return {position: [0,currentpos[1]], speed: [0,speed[1]]}
		}else if (currentpos[1]===0){
			// console.log(281)
			return {position: [currentpos[0],0], speed: [speed[0],0]}
		}else if ((currentpos[0]+size[0])===boardsize[0]){
			// console.log(284)
			return {position: currentpos, speed: [0,speed[1]]}
		}else {
			// console.log(287)
			return {position: currentpos,speed: [speed[0],0]}
		}
	}



	/**
	* Move the element along the four sides of the board. When the element hit the four corners of the board,
	* the element will have equal chance to move to either side besides the corner.
	* @extends MoveBubble
	*/	
	class SideRandomBubble extends MoveBubble {
		/**
		 * @param {options-MoveBubble} options - The global options that will be passed to the constructor 
		 */				
		constructor(options) {
			super(options);
			const c = checkSidePosSpeed(this.position,this.boardsize,this.size,this.speed)
			/**
			* If the position of the element is not near the four sides of the board, it will be projected on to one of the four sides of the board.
			* @type {Array<number>}
			*/
			this.position=c.position

			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
			/**
			* If the speed of the element is not along the four sides of the board, it will be projected on to one of the four sides of the board. After the projection, the element will be able to move 
			* along the sides of the board.
			* @type {Array<number>}
			*/			
			this.speed=c.speed
		}

		/**
		* In each call, the element will update its position and speed.
		* If the element updates its position and meets the corner, it will have equal chance to move along either side near the corner.
		*/	
		SideRandomMove(){
			this.position[0]+=this.speed[0]
			this.position[1]+=this.speed[1]
			const totalspeed = Math.abs(this.speed[0])+Math.abs(this.speed[1])
			//left top corner
			if(Math.abs(this.position[0])+Math.abs(this.position[1]) < totalspeed){
				if(Math.random()<0.5){
					this.position[0]=totalspeed
					this.position[1]=0
					this.speed=[totalspeed,0]
				}else{
					this.position[1]=totalspeed
					this.position[0]=0
					this.speed=[0,totalspeed]					
				}
			}else if(Math.abs(this.position[0]+this.size[0]-this.boardsize[0])+Math.abs(this.position[1]) < totalspeed){
				if(Math.random()<0.5){
					this.position[0]=this.boardsize[0]-totalspeed-this.size[0]
					this.position[1]=0
					this.speed=[-totalspeed,0]
				}else{
					this.position[1]=totalspeed
					this.position[0]=this.boardsize[0]-this.size[0]
					this.speed=[0,totalspeed]					
				}
			}else if(Math.abs(this.position[1]+this.size[1]-this.boardsize[1])+Math.abs(this.position[0]) < totalspeed){
				if(Math.random()<0.5){
					this.position[1]=this.boardsize[1]-totalspeed-this.size[1]
					this.position[0]=0
					this.speed=[0,-totalspeed]
				}else{
					this.position[1]=this.boardsize[1]-this.size[1]
					this.position[0]=totalspeed
					this.speed=[totalspeed,0]					
				}
			}else if(Math.abs(this.position[0]+this.size[0]-this.boardsize[0])+Math.abs(this.position[1]+this.size[1]-this.boardsize[1])< totalspeed){
				if(Math.random()<0.5){
					this.position[1]=this.boardsize[1]-totalspeed-this.size[1]
					this.position[0]=this.boardsize[0]-this.size[0]
					this.speed=[0,-totalspeed]
				}else{
					this.position[1]=this.boardsize[1]-this.size[1]
					this.position[0]=this.boardsize[0]-totalspeed-this.size[0]
					this.speed=[-totalspeed,0]					
				}				
			}
		}
		/**
		* First update the position and speed of the elemet. Then move the element to the current position.
		*/			
		move() {
			if(!this.element.parentNode){
				this.notEnd=false
				return
			}	
			this.SideRandomMove()
			this.element.style.left=this.position[0]+'px'
			this.element.style.top=this.position[1]+'px'
		}
	}
	function updateSpeedByDest(currentpos,destination,moveTime,moveupdate){
		// const t = Math.floor(moveTime/moveupdate)
		const l=((destination[0]-currentpos[0])*Math.round(moveupdate)/moveTime)
		const t=((destination[1]-currentpos[1])*Math.round(moveupdate)/moveTime)
		return [l,t]
	}
	/**
	 * The global options that will be passed to the constructor of the DestinatedBubble.
	 * @typedef {Object} options-DestinatedBubble
	 * @property {Array<number>} speed - An array of numbers that specifies the speed of the movement. The array should contain two numbers.
	 * @property {Array<number>} boardsize - An array of numbers that specifies the width and height of the moving area. The array should contain two numbers.
	 * @property {number} [moveupdate] - The update interval between the movements (in ms). 
 	 * @property {number} [moveTime] - The total time of the timed movement.
 	 * @property {Array<number>} [destination] - The destination of the element.
	 */		


	/**
	* Move element straightly to the {@link destination}. The time it takes to move the element will be {@link moveTime}ms.
	* If the {@link destination} is out of the board, the element will be banced back if it hit the edge of the board.
	* @extends MoveBubble
	*/		 
	class DestinatedBubble extends MoveBubble {
		/**
		 * @param {options-DestinatedBubble} options - The global options that will be passed to the constructor. 
		 */			
		constructor(options) {
			super(options);
			/**
			* The ending position of the element (when the timed movement is finished).
			* @type {Array<number>}
			*/	
			this.destination=options.destination
			/**
			* The speed of the element that points towards to the destination. 
			* @type {Array<number>}
			*/
			this.speed=updateSpeedByDest(this.position,this.destination,this.moveTime,this.moveupdate)
		}
		// move() {
		// 	this.position[0] += this.speed[0];
		// 	this.position[1] += this.speed[1];
		// 	this.element.style.left=this.position[0]+'px'
		// 	this.element.style.top=this.position[1]+'px'
		// }
	}
		

	/**
	 * The global options that will be passed to the constructor of the GrowFadeBubble.
	 * @typedef {Object} options-GrowFadeBubble
	 * @property {string | HTMLElement} element - A CSS selector for the HTML element or the HTMLElement itself (e.g. '#bubble' or document.querySelector('#bubble')) that will be manipulated. 
	 * @property {number} [growTime] - The time takes for the element to be scaled up (in seconds).
	 * @property {number} [fadeTime] - The time takes for the element to fade (in seconds).
	 * @property {number} [delayTime] - The delay time of the fade starts (in seconds). 
	 */	


	/**
	* Scale the element from 0% to 100% of the current size (takes {@link growTime} seconds). Synchronously, the element fades
	* from 100% to 0%. The fade will delay for {@link delayTime} seconds since the starts of the animation and will take {@link fadeTime} seconds.
	* Since the animination is timed, once the animination completes, the element will be removed.
	* @extends SuperBubble
	*/		 
	class GrowFadeBubble extends SuperBubble{
		/**
		 * @param {options-GrowFadeBubble} options - The global options that will be passed to the constructor. 
		 */		
		constructor(options){
			super(options)
			/**
			* The time takes for the element to be scaled from 0% to 100% (in seconds).
			* @type {number}
			* @default 5
			*/
			this.growTime = !isNaN(options.growTime) ? options.growTime : 5
			/**
			* The time takes for the element to fade from 100% to 0% (in seconds).
			* @type {number}
			* @default 3
			*/
			this.fadeTime =!isNaN(options.fadeTime) ?options.fadeTime : 3
			/**
			* The delay time for the element to fade (in seconds).
			* @type {number}
			* @default 2
			*/
			this.delayTime=!isNaN(options.delayTime) ? options.delayTime : 2
			// this.notEnd=1

		}
		/**
		* Start the animation.
		*/
		startEffect(){
			growFadeBubbleAnimation(this.element,this.growTime,this.fadeTime,this.delayTime)
		}
		/**
		* End the animation.
		*/ 
		endEffect(){
			this.element.classList.remove("growFadeBubbleAnimation");
		}
		/**
		* Start the timed grow-fade animation.
		*/
		startEffect(){
			growFadeBubbleAnimation(this.element,this.growTime,this.fadeTime,this.delayTime)
		    setTimeout(function(e){
				if(this.elemet && !this.element.parentNode){
					this.notEnd=false
					this.element.remove()
					return
				}	
		      	
		    } , this.growTime * 1000);
		}
	}
	function growFadeBubbleAnimation(element,growTime=5,fadeTime=3,delayTime=2){
		const style = document.createElement('style')
		style.type='text/css'
		style.innerHTML='\
			.growFadeBubbleAnimation {\
		  		-webkit-animation: growBubble '+growTime+'s forwards, fadeBubble '+fadeTime+'s '+delayTime+'s forwards;\
          		animation: growBubble '+growTime+'s forwards, fadeBubble '+fadeTime+'s '+delayTime+'s forwards;\
          	}\
			@-webkit-keyframes growBubble {\
			  0% {\
			    -webkit-transform: scale(0);\
			            transform: scale(0);\
			  }\
			  100% {\
			    -webkit-transform: scale(1);\
			            transform: scale(1);\
			  }\
			}\
			@keyframes growBubble {\
			  0% {\
			    -webkit-transform: scale(0);\
			            transform: scale(0);\
			  }\
			  100% {\
			    -webkit-transform: scale(1);\
			            transform: scale(1);\
			  }\
			}\
			@-webkit-keyframes fadeBubble {\
			  0% {\
			    opacity: 1;\
			  }\
			  100% {\
			    opacity: 0;\
			  }\
			}\
			@keyframes fadeBubble {\
			  0% {\
			    opacity: 1;\
			  }\
			  100% {\
			    opacity: 0;\
			  }\
			}'
		document.getElementsByTagName('head')[0].appendChild(style);
		element.className += " " + 'growFadeBubbleAnimation';
	}

	/**
	 * The global options that will be passed to the constructor of the RotationBubble.
	 * @typedef {Object} options-RotationBubble
	 * @property {string | HTMLElement} element - A CSS selector for the HTML element or the HTMLElement itself (e.g. '#bubble' or document.querySelector('#bubble')) that will be manipulated. 
	 * @property {number} [period] - The time takes for the element to be rotated (in seconds).
	 * @property {boolean} [clockwise] - Whether the rotation is clockwise or counterclockwise.
	 */	


	/**
	* Rotate the element clockwisely(or counterclockwisely) with {@link period} (in seconds).
	* @extends SuperBubble
	*/		
	class RotationBubble extends SuperBubble{
		/**
		 * @param {options-RotationBubble} options - The global options that will be passed to the constructor. 
		 */		
		constructor(options){
			super(options);
			/**
			* The time takes for the element to be scaled up (in seconds).
			* @type {number}
			* @default 5
			*/
			this.period= !isNaN(options.period)? options.period : 5
			/**
			* Indicates if the rotation is clockwise. If it is false, the rotation is counterclockwise.
			* @type {boolean}
			* @default false
			*/			
			this.clockwise=options.clockwise || false
		}
		/**
		* Start the animation.
		*/
		startEffect(){
			rotateBubbleAnimination(this.element,this.period,this.clockwise)
		}
		/**
		* End the animation.
		*/ 
		endEffect(){
			this.element.style.animation = ''
		}
	}
	function rotateBubbleAnimination(element,period,clockwise){	
		var degrees=-360
		if(clockwise){	
			degrees=360
		}
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '\
			.rotateBubbleAnimination {\
				-webkit-animation: rotateBubbleAnimination '+period+'s linear infinite;\
				animation: rotationBubbleAniminarion '+period+'s linear infinite;\
			}\
			@-webkit-keyframes rotateBubbleAnimination {\
				100% {\
				-webkit-transform: rotate('+degrees+'deg);\
				-moz-transform: rotate('+degrees+'deg);\
				-ms-transform: rotate('+degrees+'deg);\
				-o-transform: rotate('+degrees+'deg);\
				transform: rotate('+degrees+'deg);\
				}\
			}'
		document.getElementsByTagName('head')[0].appendChild(style);
		// element.className += " " + 'rotateBubbleAnimination';
		element.style.animation = "rotateBubbleAnimination "+period+"s linear infinite"

	}

	/**
	 * The global options that will be passed to the constructor of the TwinkleBubble.
	 * @typedef {Object} options-TwinkleBubble
	 * @property {string | HTMLElement} element - A CSS selector for the HTML element or the HTMLElement itself (e.g. '#bubble' or document.querySelector('#bubble')) that will be manipulated. 
	 * @property {number} [period] - The time takes for the element to twinkle once.	 
	 * @property {number} [scale] - The maximum scale of the element during twinkle.
	 * @property {Array<number>} [opacity] - An array indicates the opacity (in percentage) of the element before scaling up, before scaling back and after scaling back.
	 */		

	/**
	* In the first half of the animation, transform the opacity of the element from opacity[0] to opacity[1] and scale the element up by the {@link scale}.
	* In the second half of the animation, transform the opacity of the element from opacity[1] to opacity[2] and scale the element back to the original scale.
	* The total time of the period of the animation is indicated by the {@link period}
	* @extends SuperBubble
	*/		 
	class TwinkleBubble extends SuperBubble{
		/**
		 * @param {options-TwinkleBubble} options - The global options that will be passed to the constructor. 
		 */		
		constructor(options){
			super(options);
			/**
			* The time takes for the element to twinkle.
			* @type {number}
			* @default 2
			*/
			this.period=options.period || 2			
			/**
			* The maximum scale of the element during twinkle.
			* @type {number}
			* @default 1.2
			*/
			this.scale=options.scale || 1.2
			/**
			* An array indicates the opacity (in percentage) of the element before scaling up, before scaling back and after scaling back.
			* @type {number}
			* @default [20,50,20]
			*/			
			this.opacity=options.opacity || [20,50,20]
		}
		/**
		* Start the animation.
		*/
		startEffect(){
			twinkleBubbleAnimation(this.element,this.opacity,this.scale,this.period);
		}
		/**
		* End the animation.
		*/ 
		endEffect(){
			this.element.classList.remove("twinkleBubbleAnimation");
		}	
	}
	function twinkleBubbleAnimation(element,opacity=[20,50,20],scale=1.2,period=2){
		var style = document.createElement('style');
		style.type = 'text/css';
		var keyFrames = '\
			.twinkleBubbleAnimation {\
				animation: twinklBubble '+period+'s infinite ease-in-out;\
				-webkit-animation-fill-mode: both;\
				animation-fill-mode: both;\
			}\
			@keyframes twinklBubble {\
				0% {\
					opacity:'+opacity[0]+';\
					-webkit-transform: scale(1);\
				}\
				50% {\
					opacity:'+opacity[1]+';\
					-webkit-transform: scale('+scale+');\
				}\
				100% {\
					opacity:'+opacity[2]+';\
					-webkit-transform: scale(1);\
				}\
			}';

		style.innerHTML = keyFrames
		document.getElementsByTagName('head')[0].appendChild(style);
		element.className += " " + 'twinkleBubbleAnimation';
	}
	function checkPosInt(int){
		return	Number.isInteger(int) && int>0
	}
	/**
	 * The global options that will be passed to the constructor of the TailBubble.
	 * @typedef {Object} options-TailBubble
	 * @property {number} [makeDOMupdate] - The interval between the actions of making new HTMLElements (in milliseconds).
	 * @property {Function} makeDOM - A function that returns the HTMLElements.
	 * @property {number} thickness - The number that indicates how wide the newly made HTMLElements are allowed to spread around the target element. 
	 * @property {number} numDOMs - The number of HTMLElements that will be made per update.
	 * @property {number} [makeTime] - The total time of the timed creation of the HTMLElements.	 
	 */		

	/**
	* Make and position HTMLElements around the target element. If the target element is moving (for example: is manipulated by a MoveBubble), the new HTMLElements 
	* will be tailing after the target element. The positions of new HTMLElements will be bounded by the size of the board.
	* The total time of the period of the animation is indicated by the {@link period}
	* @extends SuperBubble
	*/		 
	class TailBubble extends SuperBubble{
		/**
		 * @param {options-TailBubble} options - The global options that will be passed to the constructor. 
		 */		
		constructor(options){
			super(options);
			/**
			* The target element will be tailed after by the newly made HTMLElements.
			* @type {string | HTMLElements}
			*/
			// this.element=checkDOMelement(options.element)
			/**
			* The interval between the actions of making new HTMLElements.
			* @type {number}
			* @default 100
			*/			
			this.makeDOMupdate= checkPosInt(options.makeDOMupdate) ? options.makeDOMupdate : 100
			/**
			* The boardsize that limit the position of the new HTMLElements.
			* @type {Array<number>}
			*/			
			this.boardsize=options.boardsize
			/**
			* The function that returns new HTMLElements.
			* @type {Function}
			* @return {string | HTMLElements}
			*/				
			this.makeDOM= options.makeDOM
			/**
			* The number that indicates how wide the newly made HTMLElements are allowed to spread around the target element. 
			* If this number is 0, then the new HTMLElements will be exactly following the target element.
			* @type {number}
			* @default 0
			*/					
			this.thickness=!isNaN(options.thickness) ? options.thickness : 0
			/**
			* The number of HTMLElements that will be made per update.
			* @type {number}
			* @default 1
			*/			
			this.numDOMs= checkPosInt(options.numDOMs) ? options.numDOMs : 1
			/**
			* The total time of making the HTMLElements (in ms). 
			* @type {number}
			* @default 3000
			*/
			this.makeTime=checkPosInt(options.makeTime) ? options.makeTime : 3000			
			/**
			* The interval ID that specifies the HTMLElements making interval.
			* @type {number}
			* @default 0
			*/ 
			this.interval=0				
		}
		/**
		* Make {@link numDOMs} new HTMLElements with {@link thickness} around the current position of the target element.
		* @return {Array<HTMLElement>} The list of HTMLElements created.
		*/
		makeDOMsOnce(){
			if(!this.element.parentNode){
				clearInterval(this.interval)
				this.notEnd=false
				return
			}	
			const boardsize=this.boardsize;
			const position=[parseInt(this.element.style.left),parseInt(this.element.style.top)]
			const size=[parseInt(this.element.style.width),parseInt(this.element.style.height)]
			let DOMsMade=[]
			for (let i = 0; i < this.numDOMs; i++) {
				const dom=this.makeDOM()
				const domsize=[parseInt(dom.style.width),parseInt(dom.style.height)]
				checkDOMelement(dom)
				var l=(Math.random()-0.5) * 2*this.thickness+position[0]+size[0]/2
				var t=(Math.random()-0.5) * 2*this.thickness+position[1]+size[1]/2
				if(l+domsize[0]/2>boardsize[0]){
					l=boardsize[0]-(domsize[0]/2)
				}
				if(l-domsize[0]/2<0){
					l=domsize[0]/2
				}
				if(t+domsize[1]/2>boardsize[1]){
					t=boardsize[1]-(domsize[1]/2)
				}
				if(t-domsize[1]/2<0){
					t=domsize[1]/2
				}				
				// if(t+position[1]<0){
				// 	t=0
				// }
				// if(t+position[1]+domsize[1]>boardsize[1]){
				// 	t=boardsize[1]-(position[1]+(size[1]/2)+domsize[1])
				// }
				let left=l-domsize[0]/2
				let top=t-domsize[1]/2
				dom.style.left=left+'px'
				dom.style.top=top+'px'
				dom.style.position = 'absolute';
				DOMsMade.push(dom)
			}
			return DOMsMade
		}
		/**
		* Start the timed making process of the HTMLElements.
		*/		
		startTimedMake(){
			const self = this; 
			this.startMakeDOM()
			setTimeout(function() {
				
				// console.log('overdue book!', self.title)
				self.stopMakeDOM();
				self.notEnd=0

			}, self.makeTime)
		}
		/**
		* Start making HTMLElements every (@link makeDOMupdate} ms.
		*/
		startMakeDOM(){
			if(!this.interval){
				const self = this; 
				this.interval=setInterval(function(){
					self.makeDOMsOnce()
				}, this.makeDOMupdate)	
			}
		}
		/**
		* Clear the time interval of the HTMLElement making process.
		*/
		stopMakeDOM(){
			if(this.interval){
				clearInterval(this.interval)
			}
		}
	}

	/**
	 * The global options that will be passed to the constructor of the SuperBubbleGenerator.
	 * This type of options contains all properties specified in other type of options, with two additional
	 * properties specified bellow.
	 * @typedef {Object} options-SuperBubbleGenerator
	 * @property {string} [moveType] - The type of the {@link MoveBubble}.
	 * @property {string} [effectType] - The type of the non-move SuperBubble (i.e. all other SuperBubbles that are not extending the {@link MoveBubble})	 
	 */		

	function SuperBubbleGenerator() {
		/**
		* An array that stores all SuperBubbles created by this generator.
		* @type {Array<SuperBubble>}
		*/
		this.elements=[]

		/**
		* The interval ID that specifies the update of the elements array.
		* @type {number}
		*/
		this.updateInterval=0;
	
	}
	SuperBubbleGenerator.prototype = {
		/**
		* Based on the argument create the corresponding SuperBubble object. This function can create multiple
		* SuperBubbles at the same time with out conflicts. It can at most create two SuperBubbles, one will manipulate the 
		* movement of the element, another will manipulate the effect (non-movement animation).
		* To create any SuperBubbles, you should call this function instead of call the constructor of SuperBubbles directly. Doing so
		* will help you avoid conflicts.
		* It returns an object: one property move stores the MoveBubble created, another property effect stores a non-move Superbubble created.
		* @param {Options-SuperBubbleGenerator}
		* @return {object} 
		*/
		makeElms:function(options){
			let bubbles = []
			var m
			var n
			var type
			if(typeof options.moveType === 'string'){
				type = (options.moveType).toUpperCase()

				if(type === "MOVEBUBBLE"){
					m = new MoveBubble(options)
					bubbles.push(m)
				} else if (type === ("FloatupBubble").toUpperCase() | type === ("FloatdownBubble").toUpperCase() | type === ("FloatleftBubble").toUpperCase() | type === ("FloatrightBubble").toUpperCase()){
					m = new FloatBubble(options)
					bubbles.push(m)
				} else if (type === ("FunctionBubble").toUpperCase()){
					m = new FunctionBubble(options)
					bubbles.push(m)
				} else if (type === ("DestinatedBubble").toUpperCase()){
					m = new DestinatedBubble(options)
					bubbles.push(m)
				} else if (type === ("RandomBubble").toUpperCase()){
					m = new RandomBubble(options)
					bubbles.push(m)
				} else if (type === ("SideRandomBubble").toUpperCase()){
					m = new SideRandomBubble(options)
					bubbles.push(m)
				} else {
					throw new Error("Move type not defined!")
					return
				}
				this.elements.push(m)
			}
			if(typeof options.effectType === 'string'){
				type = (options.effectType).toUpperCase()
				if(type === ("GrowFadeBubble").toUpperCase()){
					n = new GrowFadeBubble(options)
					bubbles.push(n)
				} else if (type === ("RotationBubble").toUpperCase()){
					n = new RotationBubble(options)
					bubbles.push(n)
				} else if (type === ("TailBubble").toUpperCase()){
					n = new TailBubble(options)
					bubbles.push(n)
				} else if (type === ("TwinkleBubble").toUpperCase()){
					n = new TwinkleBubble(options)
					bubbles.push(n)
				} else {
					throw new Error("Effect type not defined!")
					return
				}
				this.elements.push(n)				
			}
			return {move: m, effect: n}
		},
		/**
		* Update once to see if there are any SupperBubble needs to be deleted. If so, delete them.
		*/
		update: function(){
			const self = this
			this.elements.forEach(function(value, index, array){
				if(!value.notEnd){
					clearInterval(value.interval)
					self.elements.splice(index,1)
				}
			})			
		},
		/**
		* Start calling the {@link update} every milliseconds
		*/
		startUpdate: function(){
			const self=this
			if(!this.updateInterval){
				this.updateInterval=setInterval(function(){
					self.update()
				}, 1)				
			}
		},
		/**
		* Ends calling the {@link startUpdate}
		*/ 
		endUpdate: function(){
			clearInterval(this.updateInterval)
		}
	}
	global.SuperBubbleGenerator = global.SuperBubbleGenerator || SuperBubbleGenerator

})(window, window.document, $);
