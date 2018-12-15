
		function funNav(a){
			var ind = a; //初始位置
			var nav= jQuery(".nav");
			var init = jQuery(".nav a").eq(ind);
			var block = jQuery(".nav .block"); //滑块
			block.css({"left":init.position().left+20}); //初始化滑块位置
			nav.hover(function(){},function(){ block.animate({"left":init.position().left+20},100); }); //移出导航滑块返回

			jQuery(".nav").slide({ 
					type:"menu", //效果类型
					titCell:"a", // 鼠标触发对象
					delayTime:500, // 效果时间
					triggerTime:0, //鼠标延迟触发时间
					defaultIndex:ind,//初始位置
					startFun:function(i,c,s,tit){ //控制当前滑块位置
						block.animate({"left":tit.eq(i).position().left+20},150);
					}
				});
		}