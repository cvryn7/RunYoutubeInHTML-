var prev_url = "null";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if( request.message === "store_url"){
            prev_url = request.prev_url;
        }else if( request.message === "get_prev_url"){
            //alert("recvdRequest");
            chrome.runtime.sendMessage({"message":"take_prev_url","prev_url":prev_url});
            //alert("sent response");
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {"message": "take_prev_url","prev_url":prev_url});
            });
        }
    }
);