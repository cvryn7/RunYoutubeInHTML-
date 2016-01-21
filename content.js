var current_url = window.location.href;
var prev_url = "";

document.body.addEventListener('click',function(){

    setTimeout(function(){
        getCurrentUrl();
       //alert( "current_url :"+current_url+"\n"+"prev_url :"+prev_url);
        if( current_url.localeCompare(prev_url) != 0){
            alert( "current_url :"+current_url+"\n"+"prev_url :"+prev_url);
            modifyURL(current_url);
            prev_url = current_url;
            chrome.runtime.sendMessage({"message":"store_url", "prev_url":prev_url});
        }
    },500);
},true);
//alert(prev_url);
var cLen = current_url.length;

chrome.runtime.sendMessage({"message":"get_prev_url"});

//alert(prev_url);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        //alert("recvd response");
        if( request.message === "take_prev_url" ) {
            prev_url = request.prev_url;
        }
    }
);

setTimeout( function(){
    alert(prev_url);
    if( current_url.substring(cLen-8, cLen) != "?html5=0" && current_url != prev_url) {

        modifyURL(current_url);
    }
},500, true);

prev_url = current_url;

function getCurrentUrl(){
    current_url = window.location.href;
}

function modifyURL(url){
    var newURL = url.concat("?html5=0");
    //alert(newURL);
    window.open(newURL, '_self',false);

}