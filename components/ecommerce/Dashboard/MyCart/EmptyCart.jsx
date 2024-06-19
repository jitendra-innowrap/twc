import React from 'react'
import ShoppingBag from '../../../Svg/ShoppingBag'
import { useRouter } from 'next/router'

export default function EmptyCart() {
    const router = useRouter()
    return (
        <div className="empty-cart">
            <h1>Your Cart is empty</h1>
            <ShoppingBag />
            <div className="cart-action text-center">
                <div className="btn" onClick={() => router.push('/products')}>
                    <span>
                        <i className="fi-rs-shopping-bag mr-10"></i>
                        Continue Shopping
                    </span>
                </div>
            </div>
        </div>
    )
}
