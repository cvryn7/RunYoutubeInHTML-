var current_url = window.location.href;
document.body.addEventListener('click',function(){
    current_url = window.location.href;
    alert(current_url);
},true);
alert(current_url);