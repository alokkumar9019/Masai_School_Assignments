const str = " Hello World! ";
const result = getCharacterFrequency(str);
console.log(result); 
// { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1, '!': 1 }

function getCharacterFrequency(str){
    str=str.trim().toLowerCase();
    return str.split('').reduce(((acc,curr)=>{
        if(curr!=' ') acc[curr]=(acc[curr] || 0)+1;
        return acc;
    }),{})
}