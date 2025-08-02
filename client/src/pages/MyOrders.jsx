import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);

    const { currency } = useAppContext();

    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders);
    }

    useEffect(()=> {
        fetchMyOrders();
    },[])

  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        {myOrders.map((order, index)=>(
                <div 
                key={index}
                className='border border-gray-300 rounded-lg p-4 py-5 mb-10 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-wd:flex-col'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>TotalAmount : {currency}{order.amount}</span>
                    </p>
                    
                    {order.items.map((item, index)=> (
                            <div key={index} 
                            className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b"} border-gray-300 p-4 py-5 flex flex-col md:flex-row items-center justify-between w-full max-w-4xl`}>

                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-primary/10 p-4 rounded-lg'>
                                        <img className='w-16 h-16 object-cover rounded' src={item.product.image[0]} alt={order.name} />
                                    </div>

                                    <div className='ml-4'>
                                        <h2 className='text-gray-700 font-medium'>{item.product.name}</h2>
                                        <p className='text-gray-500 text-sm'>Category: {item.product.category}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                    <p className=''>Quantity: {item.quantity || "1" }</p>
                                    <p className=''>Status: {order.status}</p>
                                    <p className=''>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            
                            <p className='text-primary text-lg font-medium'>
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                                
                            </div>
                    ))}
                </div>
            ))}
    </div>
  )
}

export default MyOrders