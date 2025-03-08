function solve(n){
    for(let i=0; i<n; i++){
        let str="";
        for(let j=0; j<n; j++){
            str+='*'+" ";
            if(i!=0 && i!=n-1){
                break;
            } 
        }
        console.log(str);
    }
}

let n=5;
solve(n);