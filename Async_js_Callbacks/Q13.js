let count=0;
let id=setInterval(()=>{
    count++;
    console.log("Loading...");
    if(count==5){
        clearInterval(id);
    }
},1000);