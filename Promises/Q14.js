function checkEvenNumber(num){
    return new Promise((res,rej)=>{
        if(num%2==0){
            res(`${num} is even`);
        } else{
            rej(`${num} is odd or invalid`);
        }
    })
}

checkEvenNumber(4).then((data)=>console.log(data)).catch((err)=>console.log(err));   
checkEvenNumber(5).then((data)=>console.log(data)).catch((err)=>console.log(err));
