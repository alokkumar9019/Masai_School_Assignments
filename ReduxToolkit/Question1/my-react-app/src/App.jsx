import { useState } from 'react'

import './App.css'
import ProductList from './component/ProductList'
import Cart from './component/Cart'

function App() {


  return (
    <>
      <h2>Shopping Cart App</h2>
      <ProductList/>
      <Cart/>
    </>
  )
}

export default App
