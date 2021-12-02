"use strict"; 
(function(global, document, $) { 
	class MoveBubble{
		constructor(src){
			this.elm=src.elm
			this.type="MoveBubble"
			this.speed=src.speed
			this.boardsize=src.boardsize
			this.moveupdate= src.moveupdate
			this.position=[parseInt(this.elm.style.left),parseInt(this.elm.style.top)]
			this.size=[parseInt(this.elm.style.width),parseInt(this.elm.style.height)]
			this.notEnd=1
			this.interval=0
			// this.effect=src.effect
			// this.interval=-1
				// src: elm.src		
		}
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
		// startEffect(){
		// 	if(!this.effect){
		// 		return
		// 	}
		// 	if(this.effect==='twinkle'){
		// 		twinkleBubbleAnimation(this.elm)
		// 	}
		// }
		move(){
			this.bounceBack(this.speed)
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		startMove() {
			if(!this.interval){
				const self = this; 
				this.interval=setInterval(function(){
					self.move()
					// console.log(self)
				}, this.moveupdate)				
			}


		}
		stopMove(){
			if(this.interval){
				clearInterval(this.interval)
			}
			this.interval=0
		}
		changeSpeed(newSpeed) {
			if(newSpeed < -Math.abs(this.speed[0]) | newSpeed< -Math.abs(this.speed[1]) | newSpeed>this.boardsize[0] |newSpeed>this.boardsize[1]){
				return
			}
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=[this.speed[0]+newSpeed,this.speed[1]+newSpeed]
			// console.log(this,s)
		}
		changeSize(newSize){
			if(newSize> -this.size[0] | newSize > -this.size[1] ){
				this.size=[this.size[0]+newSize,this.size[1]+newSize]
				this.elm.style.width=this.size[0]+'px'
				this.elm.style.height=this.size[1]+'px'
			}

		}


	}
	class Bubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="Bubble"
			// this.speed=[2,2]
		}
		randomMove(){
			if(Math.random() * 10<1){
				const s=((Math.random() * 2) - 1)
				const a=Math.round((Math.abs(this.speed[0])+Math.abs(this.speed[1]))*s)
				const b=((Math.abs(this.speed[0])+Math.abs(this.speed[1]))-Math.abs(a))*(Math.floor(Math.random() * 2 )*2- 1)
				// console.log(a,b)
				this.bounceBack([a,b])
			}else{
				this.bounceBack(this.speed)
			}
		}
		move() {
			this.randomMove()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
	}
	class FloatDownBubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="FloatDownBubble"
			// this.speed=[2,-2]
			this.speed=[this.speed[0],Math.abs(this.speed[1])]
			this.endCount=checkPosInt(src.endCount) ? src.endCount : 10
			// console.log(this.endCount)
		}
		floatDown(){
			if(Math.random()*10<0.2){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.elm.style.width=this.size[0]+'px'
				this.elm.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([-this.speed[0],this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.elm.remove()
			}
			if(this.speed[1]<=0&&this.notEnd>0){
				// this.elm.src="bubble.gif"
				this.endCount--
				this.speed[1]=0
				return
			}
			// if(this.endCount>0){
			// 	this.endCount++
			// }
			// if(this.endCount>=5){
			// 	this.elm.remove()
			// }
		}
		move() {
			this.floatDown()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		changeSpeed(newSpeed) {
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=[this.speed[0]+newSpeed,this.speed[1]]
			// console.log(this,s)
		}
	}
	class FloatRightBubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="FloatLeftBubble"
			// this.speed=[2,-2]
			this.speed=[Math.abs(this.speed[0]),this.speed[1]]
			this.endCount=src.endCount?src.endCount:10
			// console.log(this.endCount)
		}
		floatRight(){
			if(Math.random()*10<0.2){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.elm.style.width=this.size[0]+'px'
				this.elm.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([this.speed[0],-this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.elm.remove()
			}
			if(this.speed[0]<=0&&this.notEnd>0){
				// this.elm.src="bubble.gif"
				this.endCount--
				this.speed[0]=0
				return
			}
			// if(this.endCount>0){
			// 	this.endCount++
			// }
			// if(this.endCount>=5){
			// 	this.elm.remove()
			// }
		}
		move() {
			this.floatRight()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		changeSpeed(newSpeed) {
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=[this.speed[0]+newSpeed,this.speed[1]]
			// console.log(this,s)
		}
	}
	class FloatLeftBubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="FloatLeftBubble"
			// this.speed=[2,-2]
			this.speed=[-Math.abs(this.speed[0]),this.speed[1]]
			this.endCount=src.endCount?src.endCount:10
			// console.log(this.endCount)
		}
		floatLeft(){
			if(Math.random()*10<0.2){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.elm.style.width=this.size[0]+'px'
				this.elm.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([this.speed[0],-this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.elm.remove()
			}
			if(this.speed[0]>=0&&this.notEnd>0){
				// this.elm.src="bubble.gif"
				this.endCount--
				this.speed[0]=0
				// return
			}
			// if(this.endCount>0){
			// 	this.endCount++
			// }
			// if(this.endCount>=5){
			// 	this.elm.remove()
			// }
		}
		move() {
			this.floatLeft()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		changeSpeed(newSpeed) {
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=[this.speed[0]+newSpeed,this.speed[1]]
			// console.log(this,s)
		}
	}
	class functionBubble extends MoveBubble {
		constructor(src) {
			super(src)
			this.moveFunction=src.moveFunction
			this.moveTime=src.moveTime
			// this.moveCount = Math.floor(src.moveTime/src.moveupdate)
			// this.totalCount=Math.floor(src.moveTime/src.moveupdate)
			this.initialpos=[this.position[0],this.position[1]]
			this.moveCount=0
		}
		move(){
			this.moveCount++
			const t = this.moveupdate*(this.moveCount)
			const pos = this.moveFunction(t)
			console.log(pos)
			if(!pos | !pos[0] | !pos[1]){
				throw new Error('The moveFunction is invalid!');
				return
			}
			this.position[0]=Math.round(this.initialpos[0]+pos[0])
			this.position[1]=Math.round(this.initialpos[1]-pos[1])
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}

		startTimedMove(){
			const self = this; 
			this.startMove()
			setTimeout(function() {
				
				// console.log('overdue book!', self.title)
				self.stopMove();
				self.notEnd=0

			}, self.moveTime)
		}
	}
	function checkSidePosSpeed(currentpos, boardsize, size, speed){
		if(currentpos[0]!==0 && currentpos[1]!==0 && (currentpos[0]+size[0])!==boardsize[0] && (currentpos[1]+size[1])!==boardsize[1]){
			if(!speed[0]===0){
				console.log({position: [currentpos[0],boardsize[1]-size[1]], speed: [speed[0],0]},270)
				return {position: [currentpos[0],boardsize[1]-size[1]], speed: [speed[0],0]}
			} else {
				console.log({position: [0,currentpos[1]], speed: [0,speed[1]]},274)
				return {position: [0,currentpos[1]], speed: [0,speed[1]]}
			}
		}else if (currentpos[0]===0){
			console.log(278)
			return {position: [0,currentpos[1]], speed: [0,speed[1]]}
		}else if (currentpos[1]===0){
			console.log(281)
			return {position: [currentpos[0],0], speed: [speed[0],0]}
		}else if ((currentpos[0]+size[0])===boardsize[0]){
			console.log(284)
			return {position: currentpos, speed: [0,speed[1]]}
		}else {
			console.log(287)
			return {position: currentpos,speed: [speed[0],0]}
		}
	}
	class SideRandomBubble extends MoveBubble {
		constructor(src) {
			super(src);
			const c = checkSidePosSpeed(this.position,this.boardsize,this.size,this.speed)
			this.position=c.position
			this.speed=c.speed
			console.log(c)

		}
		SideRandomMove(){
			if(Math.random()<0.3){
				return
			}
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
		move() {
			this.SideRandomMove()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
	}
	function updateSpeedByDest(currentpos,destination,moveTime,moveupdate){
		// const t = Math.floor(moveTime/moveupdate)
		const l=Math.floor(((destination[0]-currentpos[0])*moveupdate)/moveTime)
		const t=Math.floor(((destination[1]-currentpos[1])*moveupdate)/moveTime)
		return [l,t]
	}
	class DestinatedBubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="DestinatedBubble"
			this.moveTime=src.moveTime
			this.destination=src.destination
			this.speed=updateSpeedByDest(this.position,this.destination,this.moveTime,this.moveupdate)
			// this.speed=[this.speed[0],-Math.abs(this.speed[1])]
			// this.endCount=src.endCount?src.endCount:10
			// console.log(this.endCount)
		}
		move() {
			this.position[0] += this.speed[0];
			this.position[1] += this.speed[1];
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		startTimedMove(){
			const self = this; 
			this.startMove()
			setTimeout(function() {
				
				// console.log('overdue book!', self.title)
				self.stopMove();
				self.notEnd=0

			}, self.moveTime)
		}
	}
	class FloatUpBubble extends MoveBubble {
		constructor(src) {
			super(src);
			this.type="FloatUpBubble"
			// this.speed=[2,-2]
			this.speed=[this.speed[0],-Math.abs(this.speed[1])]
			this.endCount=src.endCount?src.endCount:10
			// console.log(this.endCount)
		}
		floatUp(){
			if(Math.random()*10<0.2){
				this.size[0]=Math.floor(this.size[0]*1.1)
				this.size[1]=Math.floor(this.size[1]*1.1)
				this.elm.style.width=this.size[0]+'px'
				this.elm.style.height=this.size[1]+'px'
			}
			// const pre=this.speed[1]
			if(Math.random() * 10<0.5){
				this.bounceBack([-this.speed[0],this.speed[1]])
			}else{
				this.bounceBack(this.speed)
			}
			if(this.endCount<0){
				this.notEnd=-1
				this.elm.remove()
			}
			if(this.speed[1]>=0&&this.notEnd>0){
				// this.elm.src="bubble.gif"
				this.endCount--
				this.speed[1]=0
				// return
			}
			// if(this.endCount>0){
			// 	this.endCount++
			// }
			// if(this.endCount>=5){
			// 	this.elm.remove()
			// }
		}
		move() {
			this.floatUp()
			this.elm.style.left=this.position[0]+'px'
			this.elm.style.top=this.position[1]+'px'
		}
		changeSpeed(newSpeed) {
			// console.log(newSpeed,this.speed[0])
			// const s=Math.floor(this.speed[0]/(this.speed[0]+this.speed[1]))
			this.speed=[this.speed[0]+newSpeed,this.speed[1]]
			// console.log(this,s)
		}
	}

	class SuperBubbleGenerator{
		constructor(){
			this.elms=[]
			// this.boardsize=[parseInt(board.style.width),parseInt(board.style.height)]
			// this.board=board		
		}
		makeElms(src){
			// let source={}
			if(!src.elm){
				console.log('The elm can not be empty!')
				return
			}
			if(!src.moveupdate | !checkPosInt(src.moveupdate) ){
				src.moveupdate=100
			}
			if(!src.boardsize| !src.boardsize[0]|!src.boardsize[1]| !checkPosInt(src.boardsize[0]) | !checkPosInt(src.boardsize[1])){
				console.log('The boardsize not correctly specified!')
				return
			}
			if(!src.speed){
				src.speed=[0,0]
			}

			const c= new RotationBubble(src)
			c.startEffect()
			// if()
			// const elm=document.createElement('img')
			// elm.style='left:'+Math.floor(this.boardsize[0]/2)+'px; top:'+Math.floor(this.boardsize[1]/2)+'px; width:30px; height:30px;position: absolute;'
			// // bubble.style='margin-left:0%; margin-top:0%;width:30px; height:30px;position: absolute;'
			// this.target=src.target
			// this.elm=src.target.elm
			// this.makeDOMupdate=src.makeDOMupdate
			// this.boardsize=src.target.boardsize
			// this.makeDOM= src.makDOM
			// this.DOMs=[]
			// this.thickness=src.thickness
			// this.numDOMs=src.numDOMs
			// elm.src=src
			// const board=$('#board')
			// this.board.append(src.elm)
			// const b=new TailBubble({
			// 	target: c,
			// 	makeDOMupdate: 100,
			// 	makeDOM: ()=>{
			// 		const elm=document.createElement('div')
			// 		elm.style='width:30px; height:30px;'
			// 		// elm.style='margin-left:'+300+'px; margin-top:'+300+'px; width:30px; height:30px;position: absolute; display: block;'
			// 		// bubble.style='margin-left:0%; margin-top:0%;width:30px; height:30px;position: absolute;'
			// 		const elm1=document.createElement('img')
			// 		elm1.style="width:100%;height:100%;"
			// 		elm1.src="01.png"
			// 		// elm1.src="TankBackground.jpg"
			// 		elm.appendChild(elm1)
			// 		const bo=$('#board')
			// 		bo.append(elm)
			// 		return elm
			// 	},
			// 	thickness: 0,
			// 	numDOMs:1
			// })
			// // // const q
			// // // if(!q){
			// // // 	console.log(q)
			// // // }
			
			// // c.startMove()
			// b.startMakeDOM()
			// const c=new FloatUpBubble(src)
			// c.startMove()
			// const b= new Bubble(src)
			// this.elms.push(b)
			// b.startEffect()
			// b.startEffect()
			// if(src.startmove){
			// 	b.setLoanTime()
			// }
			// return b
			
		}
		changeAllSpeed(newSpeed){
			this.elms.forEach(function(value, index, array){
				value.changeSpeed(newSpeed)
			})
		}
		changeAllSize(newSize){
			this.elms.forEach(function(value, index, array){
				value.changeSize(newSize)
			})
		}
		startAllMove(){
			this.elms.forEach(function(value,index,array){
				value.startMove()
			})
		}
		update(){
			const self=this
			// this.startAllLoan()
			setInterval(function(){
				self.elms.forEach(function(value, index, array){
					// if(value.speed[1]>=0){
					// 	self.board.removeChild(value.elm)
					// 	self.elms.splice(index,1)
					// }
					if(value.notEnd<0){
						clearInterval(value.interval)
						// self.board.removeChild(value.elm)
						self.elms.splice(index,1)
					}
				})
				
				// if(self.elms.length<1){
				// 	clearInterval(interval)
				// }
				console.log(self.elms)
				
			}, 10)
		}


	}
	function a(){
		console.log('a called!!!')			
	}
	class GrowFadeBubble{
		constructor(src){
			this.elm=src.elm
			this.type='GrowFadeBubble'
			this.growTime =src.growTime
			this.fadeTime =src.fadeTime
			this.delayTime=src.delayTime
			this.notEnd=1

		}
		startEffect(){
			growFadeBubbleAnimation(this.elm,this.growTime,this.fadeTime,this.delayTime)
		    setTimeout(function(e){
		      	this.elm.remove()
		      	this.notEnd=-1
		    } , growTime * 1000);
		}
	}
	function growFadeBubbleAnimation(elm,growTime=5,fadeTime=3,delayTime=2){
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
		elm.className += " " + 'growFadeBubbleAnimation';
	}
	class RotationBubble{
		constructor(src){
			this.elm=src.elm
			this.type="RotationBubble"
			this.period=src.period
			this.clockwise=src.clockwise
			this.notEnd=1
		}
		startEffect(){
			rotateBubbleAnimination(this.elm,this.period,this.clockwise)
		}
	}
	function rotateBubbleAnimination(elm,period,clockwise){	
		var degrees=-360
		if(clockwise){	
			degrees=360
		}
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '\
			.rotateBubbleAnimination {\
				-webkit-animation: spin-right '+period+'s linear infinite;\
				animation: spin-right '+period+'s linear infinite;\
			}\
			@-webkit-keyframes spin-right {\
				100% {\
				-webkit-transform: rotate('+degrees+'deg);\
				-moz-transform: rotate('+degrees+'deg);\
				-ms-transform: rotate('+degrees+'deg);\
				-o-transform: rotate('+degrees+'deg);\
				transform: rotate('+degrees+'deg);\
				}\
			}'
		document.getElementsByTagName('head')[0].appendChild(style);
		elm.className += " " + 'rotateBubbleAnimination';

	}
	class TwinkleBubble{
		constructor(src){
			this.elm=src.elm
			this.type="TwinkleBubble"
			this.scale=src.scale
			this.opacity=src.opacity
			this.notEnd=1
		}
		startEffect(){
			twinkleBubbleAnimation(this.elm,this.opacity,this.scale)
		}
	}
	function twinkleBubbleAnimation(elm,opacity=[0,100,0],scale=1.5){
		var style = document.createElement('style');
		style.type = 'text/css';
		var keyFrames = '\
			.twinkleBubbleAnimation {\
				animation: twinklBubble 2.1s infinite ease-in-out;\
				-webkit-animation-fill-mode: both;\
				animation-fill-mode: both;\
			}\
			@keyframes twinklBubble {\
				0% {\
					opacity:'+opacity[0]+';\
					// filter: alpha(opacity=20);\
					-webkit-transform: scale(1);\
				}\
				50% {\
					opacity:'+opacity[1]+';\
					// filter: alpha(opacity=50);\
					-webkit-transform: scale('+scale+');\
				}\
				100% {\
					opacity:'+opacity[2]+';\
					// filter: alpha(opacity=20);\
					-webkit-transform: scale(1);\
				}\
			}';

		style.innerHTML = keyFrames
		document.getElementsByTagName('head')[0].appendChild(style);
		elm.className += " " + 'twinkleBubbleAnimation';
	}
	function checkPosInt(int){
		return	Number.isInteger(int) && int>0
	}
	class TailBubble{
		constructor(src){
			// this.src=src;
			this.target=src.target
			this.elm=src.target.elm
			this.makeDOMupdate=src.makeDOMupdate
			this.boardsize=src.target.boardsize
			this.makeDOM= src.makeDOM
			// this.DOMs=[]
			this.thickness=src.thickness
			this.numDOMs=src.numDOMs
			// this.position=[parseInt(this.elm.style.left),parseInt(this.elm.style.top)]
			// this.size=[parseInt(this.elm.style.width),parseInt(this.elm.style.height)]
			this.notEnd=1
		}
		makeDOMsOnce(){
			const boardsize=this.boardsize;
			const position=[parseInt(this.elm.style.left),parseInt(this.elm.style.top)]
			const size=[parseInt(this.elm.style.width),parseInt(this.elm.style.height)]
			// console.log(position)
			let DOMsMade=[]
			for (let i = 0; i < this.numDOMs; i++) {
				const dom=this.makeDOM()
				const domsize=[parseInt(dom.style.width),parseInt(dom.style.height)]
				if(!dom | !isNode(dom) | !isElement(dom)){
					throw new Error('The makeDOM function is invalid!');
					return
				}
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
		startMakeDOM(){
			if(!this.interval){
				const self = this; 
				this.interval=setInterval(function(){
					self.makeDOMsOnce()
				}, this.makeDOMupdate)	
			}
		}
		stopMakeDOM(){
			if(this.interval){
				clearInterval(this.interval)
			}
		}
	}

	//Returns true if it is a DOM node. src:https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
	function isNode(o){
		return (
		typeof Node === "object" ? o instanceof Node : 
		o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
		);
	}

	//Returns true if it is a DOM element. src: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
	function isElement(o){
		return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : 
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	}
	global.FloatRightBubble=global.FloatRightBubble || FloatRightBubble
	global.SuperBubbleGenerator = global.SuperBubbleGenerator || SuperBubbleGenerator

})(window, window.document, $);
