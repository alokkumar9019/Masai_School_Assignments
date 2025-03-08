function solve(n,m,arr){
    for(let i=0; i<n; i++){
        let str="";
        for(let j=0; j<m; j++){
            str+=i+j+" ";
        }
        console.log(str);
    }
}
    
    let n=3,m=2;
    let arr=[[1,2],[3,4],[5,6]];
    solve(n,m,arr);