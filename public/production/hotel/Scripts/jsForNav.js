
		function funNav(a){
			var ind = a; //��ʼλ��
			var nav= jQuery(".nav");
			var init = jQuery(".nav a").eq(ind);
			var block = jQuery(".nav .block"); //����
			block.css({"left":init.position().left+20}); //��ʼ������λ��
			nav.hover(function(){},function(){ block.animate({"left":init.position().left+20},100); }); //�Ƴ��������鷵��

			jQuery(".nav").slide({ 
					type:"menu", //Ч������
					titCell:"a", // ��괥������
					delayTime:500, // Ч��ʱ��
					triggerTime:0, //����ӳٴ���ʱ��
					defaultIndex:ind,//��ʼλ��
					startFun:function(i,c,s,tit){ //���Ƶ�ǰ����λ��
						block.animate({"left":tit.eq(i).position().left+20},150);
					}
				});
		}