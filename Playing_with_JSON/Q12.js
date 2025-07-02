function filterEvenNumbers(arr){

    return arr.filter((ele)=>ele%2==0);
}

function sumOfArray(arr){
    return arr.reduce((acc,curr)=>acc+curr,0);
}

function sortAndConcat(arr1, arr2){
    let sorted1=arr1.sort((a,b)=> a-b);
    let sorted2=arr2.sort((a,b)=> a-b);

    let newArr=arr1.concat(arr2);

    return {
        sorted1,sorted2,newArr
    };
}
const input1 = [5, 2, 8, 1, 7];
const input2 = [10, 3, 6, 4, 9];

console.log(filterEvenNumbers(input1));
console.log(sumOfArray(input1));
console.log(sortAndConcat(input1,input2));
