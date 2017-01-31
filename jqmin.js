(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function raw(s){return s;}
function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}
function converted(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
try{return config.json?JSON.parse(s):s;}catch(er){}}
var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=config.json?JSON.stringify(value):String(value);return(document.cookie=[config.raw?key:encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var decode=config.raw?raw:decoded;var cookies=document.cookie.split('; ');var result=key?undefined:{};for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=decode(parts.join('='));if(key&&key===name){result=converted(cookie);break;}
if(!key){result[name]=converted(cookie);}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==undefined){$.cookie(key,'',$.extend({},options,{expires:-1}));return true;}
return false;};}))
function showgridimg(json){document.write('<ul class="grid_posts_with_thumbs">');for(var i=0;i<trnumpostsimg;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){var commenttext=entry.link[k].title;var commenturl=entry.link[k].href;}
if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break;}}var thumburl;try{thumburl=entry.media$thumbnail.url;}catch(error)
{s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){thumburl=d;}else thumburl='http://www.webaholic.co.in/other/no-image.jpg';}
var postdate=entry.published.$t;var cdyear=postdate.substring(0,4);var cdmonth=postdate.substring(5,7);var cdday=postdate.substring(8,10);var monthnames=new Array();monthnames[1]="Jan";monthnames[2]="Feb";monthnames[3]="Mar";monthnames[4]="Apr";monthnames[5]="May";monthnames[6]="Jun";monthnames[7]="Jul";monthnames[8]="Aug";monthnames[9]="Sep";monthnames[10]="Oct";monthnames[11]="Nov";monthnames[12]="Dec";document.write('<li class="litrgrid">');if(trshowpostthumbnails==true)
document.write('<img class="recent_thumb" src="'+thumburl+'"/>');var postcontent=entry.content.$t;var re=/(<img.*?>)/gi;var rescript=/<script.*?\/script>/gi;var strip=/<.*?>/gi;var imgtag=/<img/gi;var imgre=postcontent.match(re);try{var imageshow=imgre[0].replace(imgtag,'<img class="imggrid" ');}catch(error){var imageshow=''}
var postcontentstrip=postcontent.replace(rescript,"").replace(strip,"");var postfinaloutput='<a href="'+posturl+'" target ="_top"><div class="imgdivgrid">'+textedit(imageshow)+'</div><br style="clear:both;">'+'<b>'+posttitle+'</b><br>'+postcontentstrip.substring(0,trnumchars)+'...</a>';document.write(postfinaloutput);var towrite='';var flag=0;document.write('<br><strong>');if(trshowpostdate==true){towrite=towrite+monthnames[parseInt(cdmonth,10)]+'-'+cdday+' - '+cdyear;flag=1;}
if(trshowcommentnum==true)
{if(flag==1){towrite=towrite+' | ';}
if(commenttext=='1 Comments')commenttext='1 Comment';if(commenttext=='0 Comments')commenttext='No Comments';commenttext='<a href="'+commenturl+'" target ="_top">'+commenttext+'</a>';towrite=towrite+commenttext;flag=1;;}
if(trdisplaymore==true)
{if(flag==1)towrite=towrite+' | ';flag=1;;}
document.write(towrite);document.write('</strong></li>');if(trdisplayseparator==true)
if(i!=(trnumpostsimg-1))
document.write('<hr size=0.5>');};document.write('</ul>');}
function textedit(textedit){var re=/(style|height|width)\=((\".*?\")|([0-9]{1,}))/gi;var textedit=textedit.replace(re,"");return(textedit);}
$(document).ready(function(){$('.litrgrid').css({height:$('.litrgrid').width(),});$('.imgdivgrid').css({height:$('.imgdivgrid').width()*0.5,});})
var trnumpostsimg=15;var trshowpostthumbnails=false;var trdisplaymore=true;var trdisplayseparator=false;var trshowcommentnum=false;var trshowpostdate=false;var trnumchars=150;