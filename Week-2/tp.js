function promiseCallback(resolve){
    console.log("started");
    setTimeout(resolve, 3000);
}

promiseCallback(function(){
     console.log("hi");
});