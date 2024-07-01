import React, { useEffect, useState } from 'react';
import { getOrderList } from '../../../../util/api';

export default function index() {
    const [orderList, setOrderList] = useState([]);
    
    useEffect(() => {
      fetchOrderList();
    }, [])
    
    const fetchOrderList = async () =>{
        try {
            const res = await getOrderList();
            setOrderList(res?.result)
            console.log(res)
        } catch (error) {
            
        }

    }
    return (
        <div className="card my-orders">
            <div className="card-header">
                <h5 className="mb-0">My Orders</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#4135</td>
                                <td>18 Jun, 2024</td>
                                <td>2</td>
                                <td>₹1250.00</td>
                                <td>Processing</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#4296</td>
                                <td>08 Jun, 2024</td>
                                <td>5</td>
                                <td>₹3640.00</td>
                                <td>Pending</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#4239</td>
                                <td>06 Jun, 2024</td>
                                <td>3</td>
                                <td>₹2800.00</td>
                                <td>Placed</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#4236</td>
                                <td>20 May, 2024</td>
                                <td>3</td>
                                <td>₹2800.00</td>
                                <td>Delivered</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}