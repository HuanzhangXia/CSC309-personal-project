class SuperBubble{
	constructor(elm,boardsize){
		this.elm=elm
		this.interval=null
		this.state={
			type:"SupperBubble",
			speed:[0,0],
			boardsize,
			position:[parseInt(this.elm.style.marginLeft),parseInt(this.elm.style.marginTop)],
			size:[parseInt(this.elm.style.width),parseInt(this.elm.style.height)],
			src: elm.src		
		}
	}
	bounceBack(movement){
		if(this.state.position[0]<Math.abs(movement[0])&movement[0]<0){
			this.state.speed[0]= -movement[0]
		}else if(this.state.boardsize[0]-this.state.position[0]<Math.abs(movement[0])+this.state.size[0] & movement[0]>0){
			this.state.speed[0]= -movement[0]
		}else{
			this.state.speed[0]= movement[0]
		}
		if(this.state.position[1]<Math.abs(movement[1])&movement[1]<0){
			this.state.speed[1]= -movement[1]
		}else if(this.state.boardsize[1]-this.state.position[1]<Math.abs(movement[1])+this.state.size[1]&movement[1]>0){
			this.state.speed[1]= -movement[1]
		}else{
			this.state.speed[1]=movement[1]
		}
		this.state.position=[this.state.position[0]+this.state.speed[0],this.state.position[1]+this.state.speed[1]]

	}
	move(){
		this.bounceBack(this.state.speed)
		this.elm.style.marginLeft=this.state.position[0]+'px'
		this.elm.style.marginTop=this.state.position[1]+'px'
	}
	setLoanTime() {
		const self = this; 
		this.interval=setInterval(function(){
			self.move()
			// console.log(self)
		}, 100)

	}
	changeSpeed(newSpeed) {
		if(newSpeed < -Math.abs(this.state.speed[0]) | newSpeed< -Math.abs(this.state.speed[1]) | newSpeed>this.state.boardsize[0] |newSpeed>this.state.boardsize[1]){
			return
		}
		// console.log(newSpeed,this.state.speed[0])
		// const s=Math.floor(this.state.speed[0]/(this.state.speed[0]+this.state.speed[1]))
		this.state.speed=[this.state.speed[0]+newSpeed,this.state.speed[1]+newSpeed]
		// console.log(this,s)
	}
	changeSize(newSize){
		if(newSize> -this.state.size[0] | newSize > -this.state.size[1] ){
			this.state.size=[this.state.size[0]+newSize,this.state.size[1]+newSize]
			this.elm.style.width=this.state.size[0]+'px'
			this.elm.style.height=this.state.size[1]+'px'
		}

	}


}
class Bubble extends SuperBubble {
	constructor(elm,boardsize) {
		super(elm,boardsize);
		this.state.type="Bubble"
		this.state.speed=[2,2]
	}
	randomMove(){
		if(Math.random() * 10<1){
			const sin=(Math.floor(Math.random() * 11) - 5)/5
			const a=Math.floor((Math.abs(this.state.speed[0])+Math.abs(this.state.speed[1]))*sin/2)
			const b=((Math.abs(this.state.speed[0])+Math.abs(this.state.speed[1]))-Math.abs(a))*(Math.round(Math.random()) * 2 - 1)
			// console.log(a,b)
			this.bounceBack([a,b])
		}else{
			this.bounceBack(this.state.speed)
		}
	}
	move() {
		this.randomMove()
		this.elm.style.marginLeft=this.state.position[0]+'px'
		this.elm.style.marginTop=this.state.position[1]+'px'
	}
}
class FloatBubble extends SuperBubble {
	constructor(elm,boardsize) {
		super(elm,boardsize);
		this.state.type="FloatBubble"
		this.state.speed=[2,-2]
		// this.state.speed=[this.state.speed[0],-Math.abs(this.state.speed[1])]
		this.endCount=0
	}
	floatUp(){
		if(Math.random()*10<0.2){
			this.state.size[0]=Math.floor(this.state.size[0]*1.1)
			this.state.size[1]=Math.floor(this.state.size[1]*1.1)
			this.elm.style.width=this.state.size[0]+'px'
			this.elm.style.height=this.state.size[1]+'px'
		}
		// const pre=this.speed[1]
		if(Math.random() * 10<0.5){
			this.bounceBack([-this.state.speed[0],this.state.speed[1]])
		}else{
			this.bounceBack(this.state.speed)
		}
		if(this.state.speed[1]>=0&&this.endCount===0){
			this.elm.src="bubble.gif"
			this.endCount=1
			this.state.speed[1]=0
			return
		}
		if(this.endCount>0){
			this.endCount++
		}
		if(this.endCount>=5){
			this.elm.remove()
		}
	}
	move() {
		this.floatUp()
		this.elm.style.marginLeft=this.state.position[0]+'px'
		this.elm.style.marginTop=this.state.position[1]+'px'
	}
	changeSpeed(newSpeed) {
		// console.log(newSpeed,this.state.speed[0])
		// const s=Math.floor(this.state.speed[0]/(this.state.speed[0]+this.state.speed[1]))
		this.state.speed=[this.state.speed[0]+newSpeed,this.state.speed[1]]
		// console.log(this,s)
	}
}

class SuperBubbleGenerator{
	constructor(board){
		this.elms=[]
		this.boardsize=[parseInt(board.style.width),parseInt(board.style.height)]
		this.board=board		
	}
	makeElms(src){
		const elm=document.createElement('img')
		elm.style='margin-left:'+Math.floor(this.boardsize[0]/2)+'px; margin-top:'+Math.floor(this.boardsize[1]/2)+'px; width:30px; height:30px;position: absolute;'
		// bubble.style='margin-left:0%; margin-top:0%;width:30px; height:30px;position: absolute;'

		elm.src=src
		// const board=$('#board')
		this.board.append(elm)
		const b=new Bubble(elm,[this.boardsize[0],this.boardsize[1]])
		this.elms.push(b)

		b.setLoanTime()
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
	startAllLoan(){
		this.elms.forEach(function(value,index,array){
			value.setLoanTime()
		})
	}
	loadAllBubbles(file){
		let status = [];

		try {
			i=this.elms.length
			status = fs.readFileSync(file);
			status.forEach(function(value,index,array){
				this.makeElms(value.src)
				this.elms[i+index].state=value
			})
		} catch(e) {
			status = []

			fs.writeFileSync(file, JSON.stringify(status))
		}

	}
	storeAllBubbles(file){
		let status=[]
		status = fs.readFileSync(file);
		this.elms.forEach(function(value,index,array){
				status.push(value.status)
		})
		fs.writeFileSync(file,JSON.stringify(status))
	}

}

class BubbleGenerator extends SuperBubbleGenerator{
	// constructor(board){
	// 	console.log('a')
	// 	super(board)
	// 	this.a=1
	// }

	makeElms(src,position){
		const elm=document.createElement('img')
		elm.style='margin-left:'+position[0]+'px; margin-top:'+position[1]+'px; width:30px; height:30px;position: absolute;'
		elm.src=src
		// const board=$('#board')
		this.board.append(elm)
		const b=new Bubble(elm,[this.boardsize[0],this.boardsize[1]])
		this.elms.push(b)

		b.setLoanTime()
	}
}
class FloatBubbleGenerator extends SuperBubbleGenerator{
	// constructor(board){
	// 	console.log('a')
	// 	super(board)
	// 	this.a=1
	// }

	makeElms(src,position){
		const elm=document.createElement('img')
		elm.style='margin-left:'+position[0]+'px; margin-top:'+position[1]+'px; width:30px; height:30px;position: absolute;'
		elm.src=src
		this.board.append(elm)
		const b=new FloatBubble(elm,[this.boardsize[0],this.boardsize[1]])
		console.log(b)
		b.elm.addEventListener("click",function(){
			b.elm.src="bubble.gif"
			b.endCount=1
			b.state.speed[1]=0
		})
		this.elms.push(b)
		b.setLoanTime()

	}
	update(){
		const self=this
		// this.startAllLoan()
		setInterval(function(){
			self.elms.forEach(function(value, index, array){
				// if(value.state.speed[1]>=0){
				// 	self.board.removeChild(value.elm)
				// 	self.elms.splice(index,1)
				// }
				if(value.endCount>=10){
					clearInterval(value.interval)
					// self.board.removeChild(value.elm)
					self.elms.splice(index,1)
				}
			})
			
			// if(self.elms.length<1){
			// 	clearInterval(interval)
			// }
			console.log(self.elms)
			
		}, 100)
	}
}
