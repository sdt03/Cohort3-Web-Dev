function delayedCall(fn: () => void){
    setTimeout(fn, 1000);
}

delayedCall(function(){
    console.log("Hello World");
})