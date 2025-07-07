/* You are tasked with simulating a data fetching function that occasionally fails. The goal is to:

Write a function fetchData that simulates data fetching using a Promise with a 50% chance of success or failure.
So we know that above logic seems to be a bit tricky but think about a way in JS where you can randomly generate a number between 1 and 0 and based on that you assign truthy and falsy values . (Now it should be easier , if not then you should go and learn about truthy and falsy values along with how to generate random numbers in JS)
Write an async function fetchDataHandler to:
Use async/await to handle the result of the fetchData function.
Log "Fetched data successfully!" if the fetch is successful.
Log "Error fetching data" along with the error message if the fetch fails.
*/

function fetchData(){
    let promise= new Promise((res,rej)=>{
        setTimeout(()=>{
            let x=Math.floor((Math.random()*10))/10;
            if(x>=0.5){
                res("Fetched data successfully!");
            } else{
                rej("Error");
            }
        },1000)
    })
    return promise;
}

async function fetchDataHandler(){
    try{
        let res= await fetchData();
        console.log(res);
    }catch(err){
        console.log("Error fetching data",err);
    }
}
fetchDataHandler();