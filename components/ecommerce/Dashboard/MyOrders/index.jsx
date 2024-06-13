import React from 'react';

export default function index() {
    return (
        <div className="card my-orders">
            <div className="card-header">
                <h5 className="mb-0">Your Orders</h5>
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
                                <td>#1357</td>
                                <td>March 45, 2020</td>
                                <td>2</td>
                                <td>$125.00</td>
                                <td>Processing</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#2468</td>
                                <td>June 29, 2020</td>
                                <td>5</td>
                                <td>$364.00</td>
                                <td>Completed</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#2366</td>
                                <td>August 02, 2020</td>
                                <td>3</td>
                                <td>$280.00</td>
                                <td>Completed</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                            <tr>
                                <td>#2366</td>
                                <td>August 02, 2020</td>
                                <td>3</td>
                                <td>$280.00</td>
                                <td>Completed</td>
                                <td><a href="/download/invoice" target='_blank' className="btn-small d-block">View</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}