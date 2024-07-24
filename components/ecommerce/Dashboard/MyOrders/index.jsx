import React, { useEffect, useState } from 'react';
import { getOrderDetails, getOrderList } from '../../../../util/api';
import Link from 'next/link';
import Lottie from "lottie-web";
import success from "../../../../public/assets/Lottie/no-orders.json"
import { getDateFromString } from '../../../../util/util';
export default function index() {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: success,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);
    useEffect(() => {
      fetchOrderList();
    }, [])
    
    const fetchOrderList = async () =>{
        try {
            // const res = await getOrderDetails(4);
            const res = await getOrderList();
            if(res?.code==1){
                setOrderList(res?.order_data)
            }
            console.log(res)
        } catch (error) {
            
        }

    }
    return (
        <div className="card my-orders">
            <div className="card-header">
                <h5 className="mb-0">My Orders{orderList?.msg}</h5>
            </div>
            <div className="card-body">
                {
                    !orderList?.length>0?
                    (
                        <div className="order-sucess-container mb-20" style={{boxShadow:'none'}}>
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            <h1 className="mb-20">No Orders Yet!</h1>
                            <p className="mb-20">Your Orders Will Appear here.</p>
                            <div className="actions">
                                <button className="btn">
                                    <Link href={"/"}>Continue Shopping</Link>
                                </button>
                            </div>
                        </div>
                    ):(
                        <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Date</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                orderList.map((order, i)=>{
                                    return<tr>
                                            <td>{order.id}</td>
                                            <td>{getDateFromString(order.order_date)}</td>
                                            <td>{order.order_items_count}</td>
                                            <td>{order.order_amount}</td>
                                            <td><Link href={`/my-orders/order-detail?orderId=${order.id}`} className="btn-small d-block">View</Link></td>
                                        </tr>
                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>
                    )
                }
            </div>
        </div>
    );
}