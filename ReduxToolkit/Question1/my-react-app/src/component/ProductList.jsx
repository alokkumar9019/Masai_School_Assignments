import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../feature/cartSlice";

function ProductList(){
    const dispatch=useDispatch();


const products=[
    {id:1,name:"Laptop",price:80000},
    {id:2,name:"HP",price:450000},
    {id:3,name:"Mechanical key-board",price:2500},
    {id:4,name:"Mouse",price:1500},
    {id:5,name:"Monitor",price:12000},  
    {id:6,name:"Pendrive",price:500},
    {id:7,name:"External Hard-disk",price:6000},
    {id:8,name:"Web-cam",price:3000},
    {id:9,name:"Head-phone",price:2000},
    {id:10,name:"Speakers",price:4000},
];

return(
    <div>
        <h3>Products:</h3>
        {products.map(product =>(
            <div key={product.id}>
                {product.name}-${product.price}
                <button onClick={()=>dispatch(addItem(product))}>Add to Cart</button>
            </div>
        ))}
    </div>
)

}

export default ProductList;
