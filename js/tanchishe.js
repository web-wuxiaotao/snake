$(function(){
	var over=$("#over")
	var over_over=$(".over",over)[0]
	var start=$(".start")[0]
	var pause=$(".pause")[0]
	var star=$("#start")
	var a=$("a",star)[0]
	var box=$('#box')
	for(var i=0;i<25;i++){
		for(j=0;j<25;j++){
			var div=document.createElement('div')
			div.id=i+'-'+j
			box.appendChild(div)
		}
	}
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
	for(var i=0;i<she.length;i++){
		var obj=$("#"+she[i].x+"-"+she[i].y)
		obj.className="she"
	}
	function game(){
		function getFood(){
			do{
				var x=Math.floor(Math.random()*25)
				var y=Math.floor(Math.random()*25)
			}
			while(panduan(x,y)){
				var obj=$("#"+x+"-"+y)
				obj.className="food"
				return {x:x,y:y}
			}
			
		}
		function panduan(a,b){
			for(var i=0;i<she.length;i++){
				if(she[i].x==a&&she[i].y==b){
					return true
				}
			}
			return false
		}
		var food=getFood()
		var fangxiang="you"
		var a;
		var b;
		function run(){
			var oldtou=she[she.length-1]
			if(fangxiang=="you"){
				var newtou=$("#"+oldtou.x+"-"+(oldtou.y+1))
				if(newtou==null||panduan(oldtou.x,oldtou.y+1)){
					over.style.display="block"
					clearInyerval(t)
					return
				}
			a=oldtou.x;
			b=oldtou.y+1;
			newtou.className="she";
			she.push({x:oldtou.x,y:oldtou.y+1})
			}else if(fangxiang=="zuo"){
				var newtou=$("#"+oldtou.x+"-"+(oldtou.y-1))
				if(newtou==null||panduan(oldtou.x,oldtou.y-1)){
					over.style.display="block"
					clearInyerval(t)
					return
				}
			a=oldtou.x;
			b=oldtou.y-1;
			newtou.className="she";
			she.push({x:oldtou.x,y:oldtou.y-1})	
			}else if(fangxiang=="shang"){
				var newtou=$("#"+(oldtou.x-1)+"-"+oldtou.y)
				if(newtou==null||panduan((oldtou.x-1),oldtou.y)){
					over.style.display="block"
					clearInyerval(t)
					return
				}
			a=oldtou.x-1;
			b=oldtou.y;
			newtou.className="she";
			she.push({x:oldtou.x-1,y:oldtou.y})	
			}else if(fangxiang=="xia"){
				var newtou=$("#"+(oldtou.x+1)+"-"+oldtou.y)
				if(newtou==null||panduan(oldtou.x+1,oldtou.y)){
					over.style.display="block"
					clearInyerval(t)
					return
				}
			a=oldtou.x+1;
			b=oldtou.y;
			newtou.className="she";
			she.push({x:oldtou.x+1,y:oldtou.y})	
			}
			if(food.x==a&&food.y==b){
				food=getFood();
			}else{
				var shewei=$("#"+she[0].x+"-"+she[0].y);
				shewei.className="";
				she.shift();
			}
		}
		var	t=setInterval(run,300)
		start.onclick=function(){
			t=setInterval(run,300)
		}
		pause.onclick=function(){
			clearInterval(t)
		}
		
		document.onkeydown=function(e){
			var e=e||window.event;
			var nub=e.keyCode;
			if(nub==37){
				if(fangxiang=='you'){
					return;
				}
				fangxiang='zuo'	
			}
			if(nub==38){
				if(fangxiang=='xia'){
					return;
				}
				fangxiang='shang'	
			}
			if(nub==39){
				if(fangxiang=='zuo'){
					return;
				}
				fangxiang='you'	
			}
			if(nub==40){
				if(fangxiang=='shang'){
					return;
				}
				fangxiang='xia'	
			}
		}
	}
	a.onclick=function(){
		star.style.display="none"
		game()
	}
})