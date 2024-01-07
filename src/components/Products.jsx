import React from 'react'
import ProductCard from './ProductCard'

const Products = () => { 
 
  return (
    <div id='products' className='py-10'>
        <div className='flex flex-col items-center gap-4 mb-6'>
            <h1 className='text-2xl bg-black text-white py-2 w-80 text-center'>luxury shopping</h1>
            <span className='w-20 h-[3px] bg-black'></span>
            <p className='max-w-[700px] text-gray-600 text-center'>At TimeHub, we believe that a watch is more than just a timekeeping device — it's a statement of elegance and a symbol of timeless style. Our handpicked selection features renowned brands that embody the epitome of craftsmanship, blending tradition with innovation.</p>
        </div>
        <div className='mx-auto flex items-center justify-center flex-wrap gap-8'>
            <ProductCard />
        </div>
    </div>
  )
}

export default Products