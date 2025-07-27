import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

    const { products, seacrhQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=> {
        if (seacrhQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(seacrhQuery.toLowerCase())
            ))
        } else {
            setFilteredProducts(products);
        }

    },[ products, seacrhQuery])

  return (
    <div className='mt-6 felx flex-col'>

        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6'>
            {filteredProducts.filter((product)=> product.inStock).map((product, index)=>(
                <ProductCard key={index} product={product}/>
            ))}
        </div>

    </div>
  )
}

export default AllProducts