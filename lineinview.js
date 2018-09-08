/*Line.js is a collection of easy to implement CSS effects. Simply add the aprropriate class to any div with the position: relative; property to trigger the required effect.*/

/*Defaults*/
/*var runWheneverVisible = false*/ //will run once, when element is first visible within viewport. A value of "true" will run animation everytime it enters the viewport.
var animationDuration = "0.8" //Time for the whole animation to take place. measured per s. Decimals or integers are both valid, ensure to add the 0 when using decimal values.
var borderWidth = " 4px " //width of the border. measured in any valid css unit - px, %, etc

var backgroundColor = "white" //CSS value

var borderContent = ".border-content {position: absolute;width: 100%;height: 100%;top: 0%;left: 0%;}" //CSS class for wrapping existing content

/*Functions*/

//Continuous border drawn around the dom element
$.fn.borderContinuous = function borderContinuous( animationDuration, borderWidth, activeWhen, backgroundColor ){
	//Set classnames to appropriate name
	var className = "border-continuous"

	//Wraps current content in content div to ensure it is displayed within effect
	$( this ).wrapInner( "<div class='border-content'></div>");

	/*Appends border elements to appropriate div*/
	$( this ).append( '<div class='+className+'><div></div><div></div><div></div><div></div></div>' );


  	//Overrides CSS for border width with user defined values
	//$( document.body ).prepend( "<style>."+className+" div:first-child,."+className+" div:nth-child(3) {height: "+borderWidth+";}."+className+" div:nth-child(2),."+className+" div:nth-child(4) {width: "+borderWidth+";}</style>" );

	//Adds padding of equal thickness to border to element that contains the content, so it is not drawn over
	$( this ).children(".border-content").css({
		"padding" : borderWidth
	});

	//Calculates time required for ewach side
	var timePerSide = animationDuration/4
	//alert("timePerSide is: "+timePerSide +", animationDuration is:"+animationDuration)

	/*Adds animation styles with user defined values*/
	//All of them
	$( this ).children("."+className).children().css({ 
		"background-color" : backgroundColor,
	});
	//Top border
	$( this ).children("."+className).find(':first-child').css({ 
		"height" : borderWidth,
		"width" : "0%",
		"-webkit-transition": "width"+timePerSide+"s linear "+timePerSide*0+"s",
		"transition" : "width "+timePerSide+"s linear "+timePerSide*0+"s", 
	});
	//Right border
	$( this ).children("."+className).find(':nth-child(2)').css({ 
		"width" : borderWidth,
		"height" : "0%",
		"-webkit-transition": "height"+timePerSide+"s linear "+timePerSide*1+"s",
		"transition" : "height "+timePerSide+"s linear "+timePerSide*1+"s", 
	});
	//Bottom border
	$( this ).children("."+className).find(':nth-child(3)').css({ 
		"height" : borderWidth,
		"width" : "0%",
		"-webkit-transition": "width"+timePerSide+"s linear "+timePerSide*2+"s",
		"transition" : "width "+timePerSide+"s linear "+timePerSide*2+"s",
	});
	//Left border
	$( this ).children("."+className).find(':nth-child(4)').css({ 
		"width" : borderWidth,
		"height" : "0%",
		"-webkit-transition": "height"+timePerSide+"s linear "+timePerSide*3+"s",
		"transition" : "height "+timePerSide+"s linear "+timePerSide*3+"s", 
	});
	

	//prepends appear class
	$( document.body ).prepend( "<style>."+className+".appear div:nth-child(4) {height: 100%;} ."+className+".appear div:nth-child(3) {width: 100%;} ."+className+".appear div:nth-child(2) {height: 100%;} ."+className+".appear div:first-child {width: 100%;} </style>" );


	//if parameter passed into function equals "inview", add and delete class "appear" on the element when hovered on
	if( activeWhen == "inview") {
	    $(this).bind('inview', function(event, visible) {
      if (visible) {
       		  $(this).children("."+className).find(':nth-child(odd)').css({ 
			"width" : "100%",
			}); // add class when mouseover happen

		  $(this).children("."+className).find(':nth-child(even)').css({ 
			"height" : "100%",
			}); // add class when mouseover happen
      } else {
        		  $(this).children("."+className).find(':nth-child(odd)' ).css({ 
			"width" : "0%",
			}); // remove class when mouseout happen

		  $(this).children("."+className).find(':nth-child(even)' ).css({ 
			"height" : "0%",
			}); // remove class when mouseout happen
      }
    });
	
	} 

	//run animation once when page is created
	else {
		setTimeout(function()
		{
		  $(this).find(':last-child').addClass("appear");   
		}, 300);
	}


};

//Simultaneous border drawn around the dom element
$.fn.borderSimultaneous = function borderSimultaneous( animationDuration, borderWidth, activeWhen, backgroundColor ){
	//Set classnames to appropriate name
	var className = "border-simultaneous"

	//Wraps current content in content div to ensure it is displayed within effect
	$( this ).wrapInner( "<div class='border-content'></div>");

	/*Appends border elements to appropriate div*/
	$( this ).append( '<div class='+className+'><div></div><div></div><div></div><div></div></div>' );


  	//Overrides CSS for border width with user defined values
	//$( document.body ).prepend( "<style>."+className+" div:first-child,."+className+" div:nth-child(3) {height: "+borderWidth+";}."+className+" div:nth-child(2),."+className+" div:nth-child(4) {width: "+borderWidth+";}</style>" );

	//Set padding within content div to the same thickness as the borders
	$( document.body ).prepend( "<!-- Sets padding for "+className+" on "+this+" --><style>.border-content { padding: "+borderWidth+";}" );


	//Calculates time required for ewach side
	var timePerSide = animationDuration/2
	//alert("timePerSide is: "+timePerSide +", animationDuration is:"+animationDuration)

	/*Adds animation styles with user defined values*/
	//All of them
	$( this ).children("."+className).children().css({ 
		"background-color" : backgroundColor,
	});
	//Top border
	$( this ).children("."+className).find(':first-child').css({ 
		"height" : borderWidth,
		"width" : "0%",
		"-webkit-transition": "width"+timePerSide+"s linear "+timePerSide*0+"s",
		"transition" : "width "+timePerSide+"s linear "+timePerSide*0+"s", 
	});
	//Right border
	$( this ).children("."+className).find(':nth-child(2)').css({ 
		"width" : borderWidth,
		"height" : "0%",
		"-webkit-transition": "height"+timePerSide+"s linear "+timePerSide*1+"s",
		"transition" : "height "+timePerSide+"s linear "+timePerSide*1+"s", 
	});
	//Bottom border
	$( this ).children("."+className).find(':nth-child(3)').css({ 
		"height" : borderWidth,
		"width" : "0%",
		"-webkit-transition": "width"+timePerSide+"s linear "+timePerSide*0+"s",
		"transition" : "width "+timePerSide+"s linear "+timePerSide*0+"s",
	});
	//Left border
	$( this ).children("."+className).find(':nth-child(4)').css({ 
		"width" : borderWidth,
		"height" : "0%",
		"-webkit-transition": "height"+timePerSide+"s linear "+timePerSide*1+"s",
		"transition" : "height "+timePerSide+"s linear "+timePerSide*1+"s", 
	});
	

	//Adds padding of equal thickness to border to element that contains the content, so it is not drawn over
	$( this ).children(".border-content").css({
		"padding" : borderWidth
	});

	//if parameter passed into function equals "inview", add and delete class "appear" on the element when hovered on
	if( activeWhen == "inview") {
	    $(this).bind('inview', function(event, visible) {
      if (visible) {
       		  $(this).children("."+className).find(':nth-child(odd)').css({ 
			"width" : "100%",
			}); // add class when mouseover happen

		  $(this).children("."+className).find(':nth-child(even)').css({ 
			"height" : "100%",
			}); // add class when mouseover happen
      } else {
       		  $(this).children("."+className).find(':nth-child(odd)' ).css({ 
			"width" : "0%",
			}); // remove class when mouseout happen

		  $(this).children("."+className).find(':nth-child(even)' ).css({ 
			"height" : "0%",
			}); // remove class when mouseout happen
      }
    });

	} 
	//run animation once when page is created

	else {
		setTimeout(function()
		{
		  $(this).find(':last-child').addClass("appear");   
		}, 300);
	}


};

//Line drawn on specified side of the dom element
$.fn.line = function line( animationDuration, borderWidth, side, activeWhen, backgroundColor ){
	
	//Set variable className to appropriate name
	var className = "line"

	//Calculates time required for each side, in this case, they are the same
	var timePerSide = animationDuration
	//alert("timePerSide is: "+timePerSide +", animationDuration is:"+animationDuration)

	//Wraps current content in content div to ensure it is displayed within effect
	$( this ).wrapInner( "<div class='border-content'></div>");

	/*Appends border elements to appropriate div*/
	$( this ).append( '<div class='+className+'> <div></div> </div>' );

	//Adds the transition CSS class to the element
	$( this ).children("."+className).css({
		"-webkit-transition" : "all "+timePerSide+"s linear "+timePerSide*0+"s", 
		"transition" : "all "+timePerSide+"s linear "+timePerSide*0+"s",
		"background-color" : backgroundColor,
	});

	//Adds padding of equal thickness to border to element that contains the content, so it is not drawn over
	$( this ).children(".border-content").css({
		"padding" : borderWidth
	});

	//Checks input value and adds styling to the div
	switch (true) {
      case side == "top":
        $( this ).children(".line").css({

        	"top" : "0",
        	"left" : "0",
        	"width" : "0%",
        	"height" : borderWidth, 

        });
        break;

      case side == "right":
      	$(this ).children(".line").css({
      		
      		"bottom" : "0", 
      		"right" : "0", 
      		"height" : "0%", 
      		"width" : borderWidth, 
      	});
        break;

      case side == "bottom":
      	$(this ).children(".line").css({
      		"bottom" : "0", 
      		"left" : "0", 
      		"width" : "0%", 
      		"height" : borderWidth, 
      	});
        break

      case side == "left":
      	$( this ).children(".line").css({
      		"bottom" : "0", 
      		"left" : "0", 
      		"height" : "0%", 
      		"width" : borderWidth, 
      	});
        break
    }

	
	//if parameter passed into function equals "inview", toggle height/width values appropriately
	if( activeWhen == "inview") {
		if(side == "left" || side == "right") {
		    $(this).bind('inview', function(event, visible) {
      if (visible) {
        $(this).children(".line").css({"height" : "100%",}); // add class when mouseover 
      } else {
        $(this).children(".line").css({"height" : "0%",}); // remove class when mouseout 
      }
    });
		
		}

		else if(side == "top" || side == "bottom") {
		$(this).bind('inview', function(event, visible) {
      if (visible) {
        $(this).children(".line").css({"width" : "100%",}); // add class when mouseover 
      } else {
        $(this).children(".line").css({"width" : "0%",}); // remove class when mouseout 
      }
    });
	
		}
		

		//If variable is invalid, remind dev to input correct value via alert
		else {
			alert("Make sure you have specified which side for the line function! In this case, the variable 'side' currently equals: "+side);
		}
	} 

	//if activeWhen is not equal to inview, run animation once when page is created
	else {
		setTimeout(function()
		{
		  $( '.'+className ).addClass( "appear");   
		}, 300);
	}

};



(function(d){var p={},e,a,h=document,i=window,f=h.documentElement,j=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[j]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[j]]}catch(d){}}};d(i).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var k=d(),j,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;k=k.add(c?d.find(c):d)});if(j=k.length){var b;
if(!(b=e)){var g={height:i.innerHeight,width:i.innerWidth};if(!g.height&&((b=h.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:h.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:i.pageYOffset||f.scrollTop||h.body.scrollTop,left:i.pageXOffset||f.scrollLeft||h.body.scrollLeft};n<j;n++)if(d.contains(f,k[n])){b=d(k[n]);var l=b.height(),m=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;c.top+l>a.top&&c.top<a.top+e.height&&c.left+m>a.left&&c.left<a.left+e.width?
(m=a.left>c.left?"right":a.left+e.width<c.left+m?"left":"both",l=a.top>c.top?"bottom":a.top+e.height<c.top+l?"top":"both",c=m+"-"+l,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,m,l])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);