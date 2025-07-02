let arr=[15, 30, 45, 60, 75, 90];

function extractAndReverse(arr){
    let extract=arr.slice(3,5);
    return extract.reverse();
}

console.log(extractAndReverse(arr));