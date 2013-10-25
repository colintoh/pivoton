(function( $ ) {
    $.fn.pivoton = function(options) {

    	var arr = [
  			{ele:'.pivoton-top', transitionName:'pivoton-top-transition'},
  			{ele:'.pivoton-right', transitionName:'pivoton-right-transition'},
  			{ele:'.pivoton-bottom', transitionName:'pivoton-bottom-transition'},
  			{ele:'.pivoton-left', transitionName:'pivoton-left-transition'},
  			{ele:'.pivoton-top-right', transitionName:'pivoton-top-right-transition'},
  			{ele:'.pivoton-bottom-right', transitionName:'pivoton-bottom-right-transition'},
  			{ele:'.pivoton-bottom-left', transitionName:'pivoton-bottom-left-transition'},
  			{ele:'.pivoton-top-left', transitionName:'pivoton-top-left-transition'},
  		]


  		var Pivoton = function($ele){

  			var obj = {
  				delayEffect: 150,
  				settings : $.extend({
		    					degree:30,
		    					easing: 'ease',
		    					speed: 0.3, //seconds
		    					perspective: 400,
		    					activeClass: 'active',
		    					debug: false
		    				},options),
  				addElements: function(){

  					$ele.addClass('pivoton-button')
			    		.wrap('<div id="'+$ele.data('id')+'" class="stage"></div>')
			    		.parent('.stage').prepend('<div class="pivoton-overlay pivoton-top"></div><div class="pivoton-overlay pivoton-right pivoton-side"></div><div class="pivoton-overlay pivoton-bottom"></div><div class="pivoton-overlay pivoton-left pivoton-side"></div><div class="pivoton-overlay pivoton-top-right pivoton-corner"></div><div class="pivoton-overlay pivoton-bottom-right pivoton-corner"></div><div class="pivoton-overlay pivoton-bottom-left pivoton-corner"></div><div class="pivoton-overlay pivoton-top-left pivoton-corner"></div>');
  				},
  				setStyle: function(){
  					this.width = $ele.outerWidth();
  					this.height = $ele.outerHeight();

  					var stage = $ele.parent('.stage');
  					stage.width(this.width).height(this.height);
  					this.cssPrefixer(stage,'perspective',this.settings.perspective);
  					this.cssPrefixer($ele,'transition','all '+this.settings.speed+'s '+this.settings.easing);



  					if(this.settings.debug){
  						$ele.siblings('.pivoton-overlay').css('opacity','0.5');
  					}
  				},
  				setHotSpot:function(){
  					$ele.siblings('.pivoton-top').height(this.height/2);
  					$ele.siblings('.pivoton-bottom').height(this.height/2);

  					$ele.siblings('.pivoton-side').width(this.width*0.3);

  					$ele.siblings('.pivoton-corner').height(this.height*0.3);
  					$ele.siblings('.pivoton-corner').width(this.width*0.3);

  				},
  				bindEvent: function(ele,transitionName){
  					var that = this;

  					$ele.siblings(ele).on('mousedown',function(){
  						$(this).siblings('.pivoton-button').addClass(transitionName).addClass(that.settings.activeClass);


  						switch(ele){
  							case ".pivoton-top":
  								that.cssPrefixer($ele,'transform','rotate3d(1,0,0,'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-right":
  								that.cssPrefixer($ele,'transform','rotate3d(0,1,0,'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-bottom":
	  							that.cssPrefixer($ele,'transform','rotate3d(1,0,0,-'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-left":
  								that.cssPrefixer($ele,'transform','rotate3d(0,1,0,-'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-top-right":
  								that.cssPrefixer($ele,'transform','rotate3d(1,0.5,0,'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-bottom-right":
  								that.cssPrefixer($ele,'transform','rotate3d(1,-0.5,0,-'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-bottom-left":
  								that.cssPrefixer($ele,'transform','rotate3d(1,0.5,0,-'+that.settings.degree+'deg)');
  								break;
  							case ".pivoton-top-left":
  								that.cssPrefixer($ele,'transform','rotate3d(1,-0.5,0,'+that.settings.degree+'deg)');
  								break;

  						}
  					}).on('click',function(){

  						var direction = ele.replace('.pivoton-','');
  						//Log the direction
  						if(that.settings.debug){
	  						console.log(direction);
	  					}

	  					if(that.settings.callback && typeof that.settings.callback === "function"){
	  						setTimeout(function(){
	  							that.settings.callback(direction);
	  						},that.delayEffect);

	  					}

  					});
  				},
  				bindAllEvents: function(){

  					var that = this;

  					that.transitionStr = "";

		  			for(var i = 0 ; i < arr.length; i++){
		  				that.transitionStr += arr[i].transitionName+" ";
		  			}

		  			that.transitionStr += that.settings.activeClass;

		  			$('body').on('mouseup',function(){
		  				setTimeout(function(){
		  					var $pivotonEle = $('.pivoton-button');
		  					$pivotonEle.removeClass(that.transitionStr);
		  					that.cssPrefixer($pivotonEle,'transform','rotate3d(1, 1, 0, 0deg)')
		  				},that.delayEffect);

		  			});



  					for(var i = 0; i < arr.length; i++){
			  			that.bindEvent(arr[i].ele,arr[i].transitionName);
			  		}
  				},
  				cssPrefixer: function(ele,key,value){

  					ele.css('-webkit-'+key,value);
  					ele.css('-moz-'+key,value);
  					ele.css('-ms-'+key,value);
  					ele.css('-o-'+key,value);
  					ele.css(key,value);
  				}
  			}

  			obj.addElements();
  			obj.setStyle();
  			obj.setHotSpot();
  			obj.bindAllEvents();


  			return obj;
  		}


    	return this.each(function(){
    		new Pivoton($(this));
    	});
    };
}( jQuery ));