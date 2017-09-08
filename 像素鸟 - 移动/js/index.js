window.onload=function(){
	//查找元素函数
	function $(a,b){
		if(arguments.length==2){
			return document.querySelector(a).querySelectorAll(b);
		}
		if(arguments.length==1){
			return document.querySelector(a);
		}
	}
	//创建元素函数
	function cj(name){
		return document.createElement(name);
	}
	//背景音乐开关
	var music=true;
	$("#oi").onclick=function(){
		if(music==true){
			this.innerHTML='&#xe603;';
			$("audio").src='';
			music=false;
		}
		else{
			this.innerHTML='&#xe624;';
			$("audio").src='audio/hawayi.mp3';
			music=true;
		}
	}
	// 移动端自动播放
	var flag=1;
	$('html').ontouchstart=function(){
		if(flag==1){
			  $("audio").play();
			  flag=0;
		}
	}
	//开始界面
	var HistoryNumber=0;
	var number=0; //计算分数
	var time3=0;
	var Arr=["img/bird0.png","img/bird1.png","img/down_bird0.png","img/down_bird1.png","img/up_bird0.png","img/up_bird1.png"];
	var index=0;
	var time1=setInterval(move,30);
	var i=1;	
	//背景滚动
	function move(){
		$('#banner').style.left=$('#banner').offsetLeft-1+'px';
		if($('#banner').offsetLeft<=-343){
			$('#banner').style.left='0px';
		}
	//小鸟
	$(".bird").style.background=" url("+Arr[index++]+")"+" no-repeat";
	if(index==Arr.length){
		index=0;
	}
	//Logo上下移动
	$("#log").style.top=$("#log").offsetTop+i+'px';
	if($("#log").offsetTop<=80||$("#log").offsetTop>=120){
		i*=-1;
		}
	}
	//创建小鸟
	function Abird(){
		Bird=cj("div");
		Bird.setAttribute("class","Bird");
		$("#BG").appendChild(Bird);
		return Bird;
	}
	//小鸟运动
	var speedY=0.1;
	var imgindex=0;
	function Abirdmove(Bird){
		time2=setInterval(fly,30);
		function fly(){
			//自动下落
			speedY+=0.5;
			Bird.style.top=Bird.offsetTop+speedY+'px';
			//震动翅膀
			Bird.style.background="url("+Arr[imgindex++]+") no-repeat";
			if(imgindex==2){
				imgindex=0;
			}
			//判断碰撞
			if(Bird.offsetTop+Bird.offsetHeight>=422||Bird.offsetTop<=0){
				Gameover();
			}
		}
	//点击鼠标向上飞
	document.onclick=function(){speedY=-8;}
	//点击空格向上飞
	document.onkeydown=function(e){
		e=e||event;
		if(e.keyCode==32)
			speedY=-8;
		}
	}
	//创建水管
	function WaterPipe(conduit,Height1,Height2,top,bottom,img1,img2){
		conduit.setAttribute("class","conduit");
		conduit.style.top=top;
		conduit.style.bottom=bottom;
		var top=cj("div");
		top.style.height=Height1;
		top.style.backgroundImage='url('+img1+')';
		var down=cj("div");
		down.style.height=Height2;
		down.style.background='url('+img2+')';
		conduit.appendChild(top);
		conduit.appendChild(down);
		$("#BG").appendChild(conduit);
		//水管运动
		this.MoveWater=function(){
			//水管滚动
			time3=setInterval(function(){
				conduit.style.left=conduit.offsetLeft-1+'px';
				if(conduit.offsetLeft+conduit.offsetWidth<=0){
					//水管移除消失
					conduit.remove();
				}
				//分数累加
				if($(".Bird").offsetLeft==conduit.offsetLeft){
					number++;
				}
				//判断碰撞
				if($(".Bird").offsetTop+$(".Bird").offsetHeight>=conduit.offsetTop &&
					$(".Bird").offsetTop<=conduit.offsetTop+conduit.offsetHeight &&
					$(".Bird").offsetLeft+$(".Bird").offsetWidth>=conduit.offsetLeft &&
					$(".Bird").offsetLeft<=conduit.offsetLeft+conduit.offsetWidth){
					Gameover();
				}
			},15);
		}
	}
	//游戏开始 水管移动
	function StartGame(){
		//banner运动
		number=0;
		$("#span").innerHTML=0;
		$('#bigScore').style.display='block';
		clearInterval(time1);
		time1=setInterval(move,30);
		time4=setInterval(CreatWater,2400);
		function CreatWater(){
			var a=parseInt(Math.random()*180);
			//创建上水管
			var Top=cj("div");
			//创建下水管
			var Down=cj("div");
			var Watertop=new WaterPipe(Top,a+'px','60px','0px','none',"img/up_mod.png","img/up_pipe.png");
			var Waterdown=new WaterPipe(Down,'60px',(180-a)+'px','none','57px',"img/down_pipe.png","img/down_mod.png");
			//调用水管的运动方法
			Watertop.MoveWater();
			Waterdown.MoveWater();
			$("#span").innerHTML=number/2;
		}
	}
	//点击开始
	$(".btnstart").onclick=function(){
		$('#start').style.display='none';
		Abirdmove(Abird());
		StartGame();
	}

	//游戏结束
	
	function Gameover(){
		$('#bigScore').style.display='none';
		$(".number").innerHTML=Math.floor(number/2);
		//利用H5新属性，可以在内存储存一个数据，来作为历史成绩记录
		if(window.localStorage.getItem("history")<Math.floor(number/2)){
			window.localStorage.setItem("history",Math.floor(number/2));
		}
		$(".HistoryNumber").innerHTML=window.localStorage.getItem("history");
		for(var i=0;i<1000;i++){
			clearInterval(i);
		}
		$("#BG").innerHTML='';
		$("#gameover").style.display='block';
	}
	//继续游戏
	$(".ok").onclick=function(){
		$("#gameover").style.display='none';
		Abirdmove(Abird());
		StartGame();
	}
}