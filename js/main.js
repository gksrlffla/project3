$(function(){
	var winT;
	var timer=0
	var firstTop=true;
	var pageN=0;
	var winH;
	var activeFlag=false; 

	$(window).scroll(function(){
		winT=$(window).scrollTop();

		if(winT > 100){
			if($("#header").hasClass("scrolled") == false) $("#header").addClass("scrolled");
			firstTop=false;
		}
		else{
			if($("#header").hasClass("scrolled") == true) $("#header").removeClass("scrolled");
			firstTop=true;
		}

		clearTimeout(timer); 

		timer=setTimeout(function(){ 
			winT=$(window).scrollTop();
			
			if(winT < $(".sub1").offset().top - winH/2){
				pageN=0;
				$(".slider").addClass("active");
			}
			else if(winT < $(".sub2").offset().top - winH/2){
				pageN=1;
			}
			else if(winT < $(".sub3").offset().top - winH/2){
				pageN=2;
			}
			else if(winT < $(".sub4").offset().top - winH/2){
				pageN=3;
			}
			else if(winT < $(".sub5").offset().top - winH/2){
				pageN=4;
			}
			else{
				pageN=5;
			}

			$("#gnb li").removeClass("active");
			$("#mobile li").removeClass("active");
			$("#gnb li").eq(pageN).addClass("active");
			$("#mobile li").eq(pageN).addClass("active");

			if(activeFlag == true){
				return;
			}

			if(pageN == 0){ 
				if($(".slider").hasClass("active") == false){
					$(".slider").addClass("active");
				}
			}
			else{
				if($(".sub"+pageN).hasClass("active") == false){
					$(".sub"+pageN).addClass("active");

					var activeN=0;

					$(".sub").each(function(){
						if($(this).hasClass("active") == true){
							activeN++;
						}
					});

					if(activeN == $(".sub").size()){
						activeFlag=true;
					}
				}
			}
		}, 20);

		if(winT > 100){
			if($(".top_btn").hasClass("scrolled") == false)
			$(".top_btn").addClass("scrolled");
			firstTop=false;
		}
		else{
			$(".top_btn").removeClass("scrolled");
			firstTop=true;
		}
	});

	$(window).resize(function(){ 
		winH=$(window).height();
		winW=$(window).width();
	});
	$(window).trigger("resize");
	$(window).trigger("scroll");

	var targetY=0;

	$("#gnb li, #mobile li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{ 
			targetY=$(".sub"+pageN).offset().top;
		}
		$("html").delay(300).animate({scrollTop: targetY}, 800);

		if($(".dim").hasClass("active") == true){
			$(".dim").trigger("click");
		}
	});

	var winW;

	$(".tab").click(function(e){
		e.preventDefault();
		$(".tab").toggleClass("active");
		$("#mobile").toggleClass("active");
		$(".dim").toggleClass("active");
		$("body").toggleClass("fixed");
	})
	$(".dim").click(function(e){
		e.preventDefault();
		$(".tab").removeClass("active");
		$("#mobile").removeClass("active");
		$(".dim").removeClass("active");
		$("body").removeClass("fixed");
	})
	$(window).resize(function(){
		winW=$(window).width();

		if(winW > 720){
			if($("#mobile").hasClass("active")){
				$(".dim").trigger("click");
			}
		}
	});

	$(".top_btn").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop : 0}, 300);
	});
});