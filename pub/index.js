//This file uses jQuery
const board1=document.getElementById("board1")
board1.style="margin:auto;width: 800px; height: 400px; background-image:url(./images/underwater.jpg); background-size: 100%;background-fish: cover;background-repeat: no-repeat; border:noborder-radius: 10px 10px 10px 10px;position:relative;"
$('#board1').offset();
const board2=document.getElementById("board2")
board2.style="margin:auto;width: 800px; height: 400px; background-image:url(./images/sky.jpg); background-size: 100%;background-fish: cover;background-repeat: no-repeat; border:noborder-radius: 10px 10px 10px 10px;position:relative;"
$('#board2').offset();
const board3=document.getElementById("board3")
board3.style="margin:auto;width: 800px; height: 400px; background-image:url(./images/space.jpeg); background-size: 100%;background-fish: cover;background-repeat: no-repeat; border:noborder-radius: 10px 10px 10px 10px;position:relative;"
$('#board3').offset();
const board4=document.getElementById("board4")
board4.style="margin:auto;width: 800px; height: 400px; background-image:url(./images/pinkbackground.jpg); background-size: 100%;background-fish: cover;background-repeat: no-repeat; border:noborder-radius: 10px 10px 10px 10px;position:relative;z-index: -110;"
$('#board4').offset();
const board5=document.getElementById("board5")
board5.style="margin:auto;width: 800px; height: 400px; background-image:url(./images/greenbackground.jpg); background-size: 100%;background-fish: cover;background-repeat: no-repeat; border:noborder-radius: 10px 10px 10px 10px;position:relative;z-index: -110;"
$('#board5').offset();
// const btn=document.getElementById("btns")
// btn.style="margin:auto; width:800px;"
const logo=document.getElementById('logo')
logo.style="margin:auto; width:380px;"
const pic=document.getElementById('logopic')
pic.style="width:100%;margin:auto;"
pic.src="title.png"
const bg =  new SuperBubbleGenerator()
bg.startUpdate()
const randombubble=document.getElementById("randombubble")
const floatup=document.getElementById("floatup")
const fish=document.getElementById("fish")
const star=document.getElementById("star")
const line = document.getElementById("line")
const sin = document.getElementById("sin")
randombubble.style="font-family:Calibri;width:24.5%;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"
floatup.style="font-family:Calibri;width:24.5%;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"
fish.style="font-family:Calibri;width:24.5%;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"
star.style="font-family:Calibri;width:24.5%;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"
line.style="font-family:Calibri;width:800px;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"
sin.style="font-family:Calibri;width:800px;height:30px; margin-bottom:35px; margin-top:8px; border: 1px solid #8875FF; background:white; border-radius: 10px 10px 10px 10px;  font-fish: 20px;  text-align: center; color:#8875FF;"

star.addEventListener("click",function(){
	const elm=document.createElement('img')
	elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:30px; height:30px;position: absolute;'
	elm.src="./images/star.png"
	const b=document.querySelector('#board1')
	b.append(elm)

	const newelm = bg.makeElms({
		moveType: "floatdownbubble",
		element: elm,
		boardsize: [800,400],
		speed: [2,2],
		endCount: 100
	})
	newelm.move.startMove()
	// abc.setLoanTime()
	// console.log(bg.elms[0])
	// bfGenerator.makeElms("01.png",[Math.floor(Math.random()*750),Math.floor(Math.random()*350)])
	// bfGenerator.update()
})
fish.addEventListener("click",function(){
	if(Math.random()>0.5){
		const elm=document.createElement('img')
		elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; transform: scaleX(-1); width:30px; height:30px;position: absolute;'
		elm.src="./images/fish.png"
		const b=document.querySelector('#board1')
		b.append(elm)

		const newelm = bg.makeElms({
			moveType: "floatrightbubble",
			element: elm,
			boardsize: [800,400],
			speed: [2,2]
		})
		newelm.move.startMove()		
	}else {
		const elm=document.createElement('img')
		elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:30px; height:30px;position: absolute;'
		elm.src="./images/fish.png"
		const b=document.querySelector('#board1')
		b.append(elm)

		const newelm = bg.makeElms({
			moveType: "floatleftbubble",
			element: elm,
			boardsize: [800,400],
			speed: [2,2]
		})
		newelm.move.startMove()		
	}

})
randombubble.addEventListener("click",function(){
	const elm=document.createElement('img')
	elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:30px; height:30px;position: absolute;'
	elm.src="./images/bub.png"
	const b=document.querySelector('#board1')
	b.append(elm)

	const newelm = bg.makeElms({
		moveType: "randombubble",
		element: elm,
		boardsize: [800,400],
		speed: [2,2]
	})
	newelm.move.startMove()

})

floatup.addEventListener("click",function(){
	const elm=document.createElement('img')
	elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:20px; height:20px;position: absolute;'
	elm.src="./images/bub.png"
	const b=document.querySelector('#board1')
	b.append(elm)

	const newelm = bg.makeElms({
		moveType: "floatupbubble",
		element: elm,
		boardsize: [800,400],
		speed: [2,2],
		moveTime: 3000,
		destination: [300,100],
		moveupdate:100,
		period: 10,
		clockwise: true,
		moveFunction: (t)=>{
			return[30*t/1000,30*Math.sin(t/1000)]
		}
	})
	newelm.move.startMove()

})
function loadboard2(){
	const elm1 = document.createElement("div")
	elm1.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:60px; height:60px;position: absolute;'
	const elm=document.createElement('img')
	elm.style='width:80%;height:80%;margin-left:10%;margin-top:10%'
	// elm.style='left:'+Math.floor(Math.random()*700)+'px; top:'+Math.floor(Math.random()*300)+'px; width:40px; height:40px;position: absolute;'
	elm.src="./images/pet.png"
	elm1.appendChild(elm)
	const b=document.querySelector('#board2')
	b.append(elm1)

	const newelm = bg.makeElms({
		moveType: "siderandombubble",
		element: elm1,
		boardsize: [800,400],
		speed: [2,2],
		moveTime: 10000,
		effectType: "twinklebubble"
	})
	setInterval(function(){
		if(Math.random()>0.5){
			newelm.move.startTimedMove()
		}
		
		// console.log(self)
	}, 1000)	
	
	newelm.effect.startEffect()	
}
loadboard2()
function loadboard3(){
	const board = document.querySelector('#board3')
	const elm1=document.createElement('img')
	elm1.style='left:'+380+'px; top:'+180+'px; width:40px; height:40px;position: absolute;'
	elm1.src="./images/sun1.png"
	const elm2=document.createElement('img')
	elm2.style='left:'+360+'px; top:'+160+'px; width:80px; height:80px;position: absolute;'
	elm2.src="./images/sun2.png"
	const elm3=document.createElement('img')
	elm3.style='left:'+340+'px; top:'+140+'px; width:120px; height:120px;position: absolute;'
	elm3.src="./images/sun3.png"
	const elm4=document.createElement('img')
	elm4.style='left:'+320+'px; top:'+120+'px; width:160px; height:160px;position: absolute;'
	elm4.src="./images/sun4.png"
	const elm5=document.createElement('img')
	elm5.style='left:'+300+'px; top:'+100+'px; width:200px; height:200px;position: absolute;'
	elm5.src="./images/sun5.png"
	const elm6=document.createElement('img')
	elm6.style='left:'+280+'px; top:'+80+'px; width:240px; height:240px;position: absolute;'
	elm6.src="./images/sun6.png"
	const elm7=document.createElement('img')
	elm7.style='left:'+260+'px; top:'+60+'px; width:280px; height:280px;position: absolute;'
	elm7.src="./images/sun7.png"
	const elm8=document.createElement('img')
	elm8.style='left:'+240+'px; top:'+40+'px; width:320px; height:320px;position: absolute;'
	elm8.src="./images/sun8.png"
	const elm9=document.createElement('img')
	elm9.style='left:'+220+'px; top:'+20+'px; width:360px; height:360px;position: absolute;'
	elm9.src="./images/sun9.png"
	board.append(elm1)
	board.append(elm2)
	board.append(elm3)
	board.append(elm4)
	board.append(elm5)
	board.append(elm6)
	board.append(elm7)
	board.append(elm8)
	board.append(elm9)

	
	const newelm2= bg.makeElms({
		effectType: "rotationbubble",
		element: elm2,
		period: 1.2,
		clockwise: true
	})
	newelm2.effect.startEffect()
	const newelm3 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm3,
		period: 3,
		clockwise: true
	})
	newelm3.effect.startEffect()	
	const newelm4 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm4,
		period: 5,
		clockwise: true
	})
	newelm4.effect.startEffect()	
	const newelm5 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm5,
		period: 9,
		clockwise: true
	})
	newelm5.effect.startEffect()	
	const newelm6 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm6,
		period: 60,
		clockwise: true
	})
	newelm6.effect.startEffect()	
	const newelm7 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm7,
		period: 145,
		clockwise: true
	})
	newelm7.effect.startEffect()
	const newelm8 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm8,
		period: 420,
		clockwise: true
	})
	newelm8.effect.startEffect()	
	const newelm9 = bg.makeElms({
		effectType: "rotationbubble",
		element: elm9,
		period: 825,
		clockwise: true
	})
	newelm9.effect.startEffect()	
}
loadboard3()
function loadboard4sin() {
	$("#board4").empty()
	const elm=document.createElement('img')
	elm.style='left:'+0+'px; top:'+150+'px; width:150px; height:150px;position: absolute;z-index: 300;'
	elm.src="./images/pen.png"
	const b=document.querySelector('#board4')
	b.append(elm)
	const fun=bg.makeElms({
		moveType: "functionbubble",
		element: elm,
		boardsize: [800,400],
		moveTime: 20000,
		// destination: [300,100],
		// moveupdate:100,
		// period: 10,
		clockwise: true,
		moveFunction: (t)=>{
			// console.log(Math.sin(t/100),t/100)
			return[30*t/1000,30*Math.sin(t/1000)]
		}
	})
	const tail=bg.makeElms({
		effectType: "tailbubble",
		element:elm,
		makeDOMupdate: 100,
		boardsize: [800,400],
		makeDOM: ()=>{
			const element=document.createElement('div')
			element.style='width:15px; height:15px; border-radius: 50%; background-color: #124B8C;z-index: 100;'
			const bo=document.querySelector('#board4')
			bo.append(element)
			return element
		},
		thickness: 0,
		numDOMs:1
	})
	fun.move.startTimedMove()
	tail.effect.startMakeDOM()

}
function loadboard5line(){
	$("#board5").empty()
	const elm=document.createElement('img')
	elm.style='left:'+0+'px; top:'+250+'px; width:150px; height:150px;position: absolute;z-index: 300;'
	elm.src="./images/pen.png"
	const b=document.querySelector('#board5')
	b.append(elm)
	const fun=bg.makeElms({
		moveType: "destinatedbubble",
		element: elm,
		boardsize: [800,150],
		moveTime: 20000,
		moveupdate:100,
		destination: [600,100],
	})
	const tail=bg.makeElms({
		effectType: "tailbubble",
		element:elm,
		makeDOMupdate: 100,
		boardsize: [800,400],
		makeTime: 20000,
		makeDOM: ()=>{
			const color=['#7EC91A','#124B8C','#FCAF49','#FC90F2','#B6FCC4','#B53710']
			const element=document.createElement('div')
			const ran=Math.floor(Math.random()*6)
			element.style='width:15px; height:15px; border-radius: 50%; background-color: '+color[ran]+';z-index: 100;'
			const bo=document.querySelector('#board5')
			bo.append(element)
			const newbub = bg.makeElms({element:element,effectType: "growfadebubble"})
			newbub.effect.startEffect()
			return element
		},
		thickness: 12,
		numDOMs:1
	})
	fun.move.startTimedMove()
	tail.effect.startTimedMake()	
}
line.addEventListener('click', loadboard5line)
sin.addEventListener('click',loadboard4sin)

