$( function() {
$self = "#content";
active_show = "#about_slideshow";
cv_link="";
workOut=false;
slideShowIntervalId = "";
dynamicPortfolio = new Array();
dynamicPortfolio[0]=new Array();
dynamicPortfolio[1]= new Array();
dynamicPortfolio[2]= new Array();


$(document.body).on('click', 'a', function() {
		//Get the button
		var $button = this;
		console.log($button.id);
		//Handle the dynamic portfolio control buttons
		for(var i=0;i<dynamicPortfolio[0].length;i++){
			if($button.id == dynamicPortfolio[0][i]){
				console.log(dynamicPortfolio[1][i])
				toggleInPortfolio(dynamicPortfolio[1][i])
			}
			else if(dynamicPortfolio[2][i]+"_left"==$button.id){
				slideSwitchBack();
			}
			else if(dynamicPortfolio[2][i]+"_right"==$button.id){
				slideSwitch();
			}
		}
		
		//Handle the menu control buttons
		if( $button.id == "back" ){
			toggleOutPortfolio();

			return;
		}
		if( $button.id == "about" ){
			toggleSlide("#content");
			resetSlideInterval("about",true);

			return;
		}
		if( $button.id == "work" ){
			toggleSlide("#work_content");
			return;
		}
		if( $button.id == "pub" ){
			toggleSlide("#pub_content");

			return;
		}
		if( $button.id == "exhib" ){
			toggleSlide("#exhib_content");

			return;
		}
		if( $button.id == "cv" ){
			//toggleSlide("#cv_content");
			window.open(cv_link); 
			return;
		}
		if( $button.id == "links" ){
			toggleSlide("#links_content");

			return;
		}
		if( $button.id == "projects" ){
			toggleSlide("#projects_content");

			return;
		}
		
	});
});



$(document).ready(function(){
	$.getJSON( "json/about.json", 
		function( data ) {
			console.log( data['links'][1]['name'] )
			cv_link=data['cv']['link'];
			$("#about-content").html( '<p>'+data['about']['content'] );
			$("#about_slideshow").html( generateSlideshow(data['about']['images'],true));
			$("#work_internal_content").html( generatePortfolioMenu(data['portfolio']['projects']));
			$("#pub_internal_content").html( generatePublications(data['pub']));
			$("#exhib_internal_content").html(generateExhibitions(data['exhib']));
			$("#links_internal_content").html(generateLinks(data['links']));
			$("#projects_internal_content").html(generateLinks(data['projects']));

			/* for(i=0;i<data['portfolio']['projects'].length;i++){
    			blurbName = "#"+data['portfolio']['projects'][i]['id']+"_blurb";
    			$(blurbName).slimScroll({
      			position: 'left',railVisible: true,
    			alwaysVisible: true, height:210 });
    
    		}*/

		}
	);

	hide();
	
 /* $('#work_internal_content').slimScroll({
      position: 'left',railVisible: true,
    alwaysVisible: true, height:600 });
      
 //  $('#pub_internal_content').slimScroll({
      position: 'left',railVisible: true,
    alwaysVisible: true  });
    
  //  $('#exhib_internal_content').slimScroll({
      position: 'left',railVisible: true,
    alwaysVisible: true  });
    
   //  $('#links_internal_content').slimScroll({
      position: 'left',railVisible: true,
    alwaysVisible: true  });
    
    
  $('#projects_internal_content').slimScroll({
      position: 'left',railVisible: true,
    alwaysVisible: true  });
 */   
    
    
   

  
  $(function() {
    slideShowIntervalId = setInterval( "slideSwitch()", 5000 );
});
	
});

function generateVideo(data,first,id){
var videocontent =""
for (var i = 0; i< data.length; i++){
if(i==0 && first){
	videocontent+='" <div class = "active">'
	}
else{
		videocontent+='<div>'

}
videocontent+='<iframe id="'
videocontent+=id+'_'+i+'" '
videocontent+='src="//player.vimeo.com/video/'
videocontent+=data[i]
videocontent+='?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="390" height="291" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'
}
return videocontent;



}
function generateSlideshow(data,first){
var slideshowcontent =""
for (var i = 0; i< data.length; i++){
if(i==0 && first){
	slideshowcontent+='" <div class = "active">'
	}
else{
		slideshowcontent+='<div>'

}
slideshowcontent+='<img width = 390 height = 291 src="images/'
slideshowcontent+=data[i]+'"/>'
slideshowcontent+='</div>'
}
return slideshowcontent;
}



function generateLinks(data){
var htmlcontent= "<ul>";
for (var i = 0; i< data.length; i++){
	htmlcontent+='<li><a href='+data[i]['link']+'>'+data[i]['name']+'</a>';
	htmlcontent+='<p>'+data[i]['blurb']
}
return htmlcontent;

}

function generateExhibitions(data){
var htmlcontent= "<ul>";
solo = data['solo'];
group = data['group'];
htmlcontent+='<li>Selected Group Exhibitions<div class="pub_li">'
for (var i = 0; i< group.length; i++){
	htmlcontent+='<p>'
	htmlcontent+=group[i];
}
htmlcontent+='<li>Selected Solo Exhibtions<div class="pub_li">'
for (var i = 0; i< solo.length; i++){
	htmlcontent+='<p>'
	htmlcontent+=solo[i];
}

return htmlcontent;

}


function generatePublications(data){
var htmlcontent= "<ul>";
papers = data['papers'];
workshops = data['workshops'];
invited_talks = data['invited talks'];
htmlcontent+='<li>Papers<div class="pub_li">'
for (var i = 0; i< papers.length; i++){
	htmlcontent+='<p>'
	htmlcontent+=papers[i];
	//htmlcontent+='<\p>'
}
//htmlcontent+='<\div><\li>'

htmlcontent+='<li>Posters, Workshops and Demonstrations<div class="pub_li">'
for (var i = 0; i< workshops.length; i++){
	htmlcontent+='<p>'
	htmlcontent+=workshops[i];
	//htmlcontent+='<\p>'

}
//htmlcontent+='<\div><\li>'

htmlcontent+='<li>Invited Talks<div class="pub_li">'
for (var i = 0; i< invited_talks.length; i++){
	htmlcontent+='<p>'
	htmlcontent+=invited_talks[i];
	//htmlcontent+='<\p>'

}
//htmlcontent+='<\div><\li>'

return htmlcontent;

}


function generatePortfolioMenu(data){
var htmlcontent= "";

for (var i = 0; i< data.length; i++){
	var singlecontent="";
	singlecontent+='<div class="singlecontent" id="'
	singlecontent+=data[i]['c_id']+'"';
	singlecontent+='><div class="left">'
	singlecontent+='<div class="title" id ="'+data[i]['id']+'_title"><h1>'+data[i]['name']+'</h1></div>';
	singlecontent+='<div class="slideshow" id="'
	singlecontent+=data[i]['id']
	singlecontent+='_page_slideshow">'
	if(data[i]['videos'].length!=0){
		singlecontent+=generateVideo(data[i]['videos'],true,data[i]['id']);
		singlecontent+=generateSlideshow(data[i]['images'],false);

		}
	else{
		singlecontent+=generateSlideshow(data[i]['images'],true);

	}
	singlecontent+='</div>'
	singlecontent+='<a id="'+data[i]['id']+'_left"> < </a> <a id="'+data[i]['id']+'_right"> ></a>'
	singlecontent+='<div class="back_div"><a id="back">Back</a></div>'
	singlecontent+='</div>'
	singlecontent+='<div id="about-content", class="right">'
	singlecontent+='<div class="blurb" id ="'+data[i]['id']+'_blurb">';
	singlecontent+=data[i]['blurb'];
	singlecontent+='</div>'
   	singlecontent+='</div><div class="clear-both"></div></div>'
	htmlcontent+='<div class="menu_item" id="';
	htmlcontent+=data[i]['id']+'"';
	htmlcontent+='><div class="menu_item_left"><img width=150, height = 100, src="'
	htmlcontent+=data[i]['thumb'];
	htmlcontent+='"></div><div class="right"><a id="';
	htmlcontent+=data[i]['id']+'_link';
	htmlcontent+='">';
	htmlcontent+=data[i]['name']+'</a>';
	htmlcontent+='<p>'+data[i]['short'];
	htmlcontent+='</div></div>';
	htmlcontent+='<div class="clear-both"></div>';
	$("#work_content").append(singlecontent);
	dynamicPortfolio[0].push(data[i]['id']+"_link");
	dynamicPortfolio[1].push(data[i]['c_id']);
	dynamicPortfolio[2].push(data[i]['id']);
	$( "#"+data[i]['c_id'] ).hide();
	//$( "#"+ data[i]['id']+"_link").click(function(){toggleInPortfolio(data[i]['c_id'])});


	}
return htmlcontent;

}


function toggleInPortfolio(name){
var target = '#'+name;

resetSlideInterval(name,false);
console.log(active_show);
//alert(target);
toggleOut("#work_menu");
workOut=true;
$(target).show()
.css('z-index', 1)
.css('opacity', 0)
.animate(
    { opacity: 1 },
    { queue: false, duration: 'slow' }
  );

}

function toggleOutPortfolio(){
if(workOut){
toggleIn("#work_menu");
workOut=false
pausePlayer();

for(var i=0;i<dynamicPortfolio[0].length;i++){
	toggleOut("#"+dynamicPortfolio[1][i]);

	}
}
}

function resetSlideInterval(name, reset_auto){
clearInterval(slideShowIntervalId);
active_show= '#'+name+'_slideshow';
if(reset_auto){
	slideShowIntervalId = setInterval( "slideSwitch()", 5000 );	
	}
}


function toggleSlide(toOpen) {
//console.log("toOpen="+toOpen)
if($self!=toOpen){
	pausePlayer();
	toggleOutPortfolio();
 	toggleOut("#content");
	toggleOut("#work_content");
	toggleOut("#pub_content");
	toggleOut("#exhib_content");
	toggleOut("#links_content");
	toggleOut("#projects_content");
 	toggleIn(toOpen);
 	$self=toOpen
 }
 else if($self=="#work_content"){
 	toggleOutPortfolio();
 }
 }

function toggleIn(target){
$(target).show()
.css('z-index', 1)
.css('opacity', 0)
.animate(
    { opacity: 1 },
    { queue: false, duration: 'slow' }
  );
/*$(target)
  .css('opacity', 0)
  
  //.slideDown('fast')
  .animate(
    { opacity: 1 },
    { queue: false, duration: 'slow' }
  );*/
  
  }
  
function toggleOut(target){
$(target)
.css('z-index', -100)
.animate(
    { opacity: 0 },
    {queue: false, duration: 'slow'}, function() {$(target).hide()}
  );

/*$(target)
  .css('opacity', 1)

  //.slideUp('fast')
  .animate(
    { opacity: 0 },
    { queue: false, duration: 'slow' }
  );*/
  
  }

function hide(){
 $( "#work_content" ).hide();
 $( "#pub_content" ).hide();
 $("#exhib_content").hide();
 $("#cv_content").hide();
 $("#links_content").hide();
 $("#projects_content").hide();
}

function pausePlayer(){
 currentVideo = document.getElementsByTagName("iframe");

for(i=0; i<currentVideo.length;i++){

var iframe = $('#'+currentVideo[i].id)[0],
    player = $f(iframe),
    status = $('.status');

	player.api('pause');
}
}

function slideSwitch() {
 var $active = $(active_show+' div.active');
	pausePlayer();
    if ( $active.length == 0 ) $active = $(active_show+' div:last');

    var $next =  $active.next().length ? $active.next()
        : $(active_show+' div:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 500, function() {
            $active.removeClass('active last-active');
        });}
        
function slideSwitchBack() {
 var $active = $(active_show+' div.active');
	pausePlayer();
    if ( $active.length == 0 ) $active = $(active_show+' div:first');

    var $next =  $active.prev().length ? $active.prev()
        : $(active_show+' div:last');

    $active.addClass('last-active');
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 500, function() {
            $active.removeClass('active last-active');
        });}