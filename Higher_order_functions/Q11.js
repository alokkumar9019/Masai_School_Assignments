let Input=[{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 20 }]

function processProducts(Input){
    let productNames=Input.map((ele)=>ele.name);
    Input.forEach(ele => {
        if(ele.price>=50){
            console.log(`${ele.name} is above $50`);
        } else{
            console.log(`${ele.name} is below $50`);
        }
    });
}
processProducts(Input);