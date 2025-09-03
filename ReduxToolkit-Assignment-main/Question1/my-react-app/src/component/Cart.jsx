import React from "react";
import { useSelector,useDispatch } from "react-redux";

import { removeItem } from "../feature/cartSlice";

function Cart(){
    const items=useSelector(state=>state.cart.items);
    const total=useSelector(state=>state.cart.total);
    const dispatch=useDispatch();

    return(
        <div>
            <h3>Cart Items:</h3>
            {items.length===0?(
                <p>Cart is Empty</p>
            ):(
                <ul>
                    {items.map(item=>(
                        <li key={item.id}>
                            <p>{item.name}-${item.price}</p>
                            <button onClick={()=>dispatch(removeItem(item.id))}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total:${total}</h3>
        </div>
    )
}

export default Cart;