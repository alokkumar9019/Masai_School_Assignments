function solve(n,m,arr){
    let i=0,j=m-1;
    let str="";
    let flag=true;
    while(i<n){ 
        if(j<0){
            i++;
            j=0;
            flag=false;
        }
        if(j>=m){
            i++;
            j=m-1;
            flag=true;
        }
        if(i>=0 && j>=0 && i<n && j<m){
            str+=arr[i][j]+" ";
        }
        if(flag){
            j--;
        } else{
            j++;
        }
    }
    console.log(str);
}
    
    let n=4,m=5;
    let arr=[[1,2,3,4,5],[6,7,8,9,1],[3,2,4,5,6],[7,8,9,1,2]];
    solve(n,m,arr);