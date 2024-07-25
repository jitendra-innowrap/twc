import React, { useEffect, useState } from 'react';
import { getOrderDetails, getOrderList } from '../../../../util/api';
import Link from 'next/link';
import Lottie from "lottie-web";
import success from "../../../../public/assets/Lottie/no-orders.json"
import Pagination1 from "../../../../components/ecommerce/Pagination";

import { getDateFromString } from '../../../../util/util';
export default function index() {
    const [orderList, setOrderList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [totalOrders, setTotalOrders] = useState();
    let [pages, setPages] = useState();
    let [pagination, setPagination] = useState([]);

    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: success,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);

    let showLimit = 10,
        showPagination = 4;
    let start = Math.floor((pageNo - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination?.slice(start, end);

    const cratePagination = () => {
        // set pagination
        let arr = Array.from({ length: Math.ceil(totalOrders / showLimit) }, (_, idx) => idx + 1);
        
        setPagination(arr);
        setPages(Math.ceil(totalOrders / showLimit));
    };

    useEffect(() => {
      fetchOrderList(pageNo);
    }, [pageNo])

    useEffect(() => {
        cratePagination();
    }, [totalOrders])
    
    const handleActive = (item) => {
        setPageNo(item);
    };
    const fetchOrderList = async (pageNo) =>{
        try {
            // const res = await getOrderDetails(4);
            const res = await getOrderList(pageNo);
            if(res?.code==1){
                setOrderList(res?.order_data);
                setTotalOrders(res.total_orders);
                console.log(res)
            }
        } catch (error) {
            console.log(error);
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
                {<div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                    <nav aria-label="Page navigation example">
                        <Pagination1
                            getPaginationGroup={
                                getPaginationGroup
                            }
                            currentPage={pageNo}
                            pages={pages}
                            handleActive={handleActive}
                        />
                    </nav>
                </div>}
            </div>
        </div>
    );
}