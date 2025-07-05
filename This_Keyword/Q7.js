function multiplyNumbers(a,b){
    return a*b;
}

let result=multiplyNumbers.apply("", [2,3]);
console.log(result);