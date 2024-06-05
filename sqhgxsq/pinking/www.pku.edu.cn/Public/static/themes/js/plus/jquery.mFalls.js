/*
===============
简单的瀑布流插件
===============
*/

(function($) {
	var fall,go_fill;
	$.fn.mFalls = function(options) {
		var opts = $.extend({},$.fn.mFalls.defaults,options);
		var frame,fw,
				child,cw,//子元素宽度，只支持固定宽度
				cols,//可容纳列数
				colh=[],//每列信息				
				fix=0,
				left,
				top,
				sto,
				margin;
		frame=$(this);
		fw=frame.width();	
		
		function getsize(){//计算列数
			fw=frame.width();	
			child=frame.children();
			if(frame.css("position")=="static"){frame.css("position","relative");}
			if(child.css("position")!="absolute"){child.css("position","absolute");}
			cw=child.width();
			cols=parseInt((fw - getMargin()*(parseInt(fw/cw)-1))/cw);
		}
		
		fall = function(){
			getsize();
			if(getMargin()==0){//间距为0变成手机版
				frame.css("height","auto");
				child.css({left:"auto",top:"auto",position:"static"});
				return false;
			}
			frame.attr("cols",cols);
			margin=getMargin();//记录间距
			if(opts.isCenter){
				fix=(fw-cols*cw-(cols-1)*getMargin())*0.5;
			}
			colh=[];
			for(var i=0;i<cols;i++){//初始化
				colh[i]={h:0,i:i};
			}			
			child.each(function(index, element) {
				if(colh[0]["i"]==0){//第一列
					left=colh[0]["i"]*getMargin() + fix;
				}
				else{
					left=colh[0]["i"]*(getMargin() + cw) + fix;
				}
				if(index<cols){//第一行
					top=colh[0]["h"];
					colh[0]["h"]=colh[0]["h"]+$(this).height();//记录行高					
				}
				else{
					top=colh[0]["h"]+getMargin();			
					colh[0]["h"]=colh[0]["h"]+$(this).height()+getMargin();					
				}
				
				if($(this).css("position")!="absolute"){$(this).css("position","absolute");}
				$(this).css({left:left,top:top});				
				
				colh.sort(function(a,b){return a["h"]-b["h"];});
			});
			colh.sort(function(a,b){return b["h"]-a["h"];});
			frame.height(colh[0]["h"]);
			if(typeof(opts.callback)=="function"){
				opts.callback();
			}
		}
		
		$(window).resize(function(){
			clearTimeout(sto);
			sto=setTimeout(function(){
				getsize();
				//if(frame.attr("cols")!=cols || margin!=getMargin() || fw!=frame.width()){
					fall();
				//}
			},500);
		});
		
		function getMargin(){				
			/*if(typeof(opts.margin)=="object"){
				var mg=0;
				for(var i=0;i<opts.margin.length;i++){
					var m=new Object(opts.margin[i]);
					if($(window).width()>m.width){
						mg=m.value;
					}
				}
				return mg;
			}
			else{
				return opts.margin;
			}*/
			var mg=parseInt(child.eq(0).css("margin-left"))+parseInt(child.eq(0).css("margin-right"));
			return mg;
		}
		
		go_fall=function(){
			if(opts.imgload && frame.find("img").size()>0){
				//获取所有图片地址
				var imgall = [];
				var $imgs = frame.find("img");
				$imgs.each(function() {
					var item = $(this);
					if (typeof(item.attr("src")) != "undefined" && item.attr("src")!="" && this.nodeName.toLowerCase() == "img") {
						imgall.push({
							src: item.attr('src')
						});
					}
					/*else if (item.css("background-image") != "none") {
						imgall.push({
							src: item.css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
						});
					}*/
				});
				imgc=imgall.length;
				
				$.imgpreload(imgall,{
					each: function(){					
					},
					all: function(){
						fall();
					}
				});
			}
			else{
				fall();
			}
		}
		
		go_fall();
	};	
	
	$.fn.mFalls.resize=function(){		
		go_fall();
	}
	
	$.fn.mFalls.defaults = {
		 //margin : "",
	 isCenter : false,//是否剧中
		imgload : true,
	 callback : function(idx){}
	}
})(jQuery);