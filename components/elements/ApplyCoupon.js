import React, { useState, useEffect } from 'react';

export default function ApplyCoupon() {
  const [couponStatus, setCouponStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const coupon = event.target.Coupon.value;
    // Call your API or perform your logic here
    // For example, let's assume the coupon is valid
    setCouponStatus('success');
  };

  useEffect(() => {
    if (couponStatus === 'success') {
      return (
        <div className="success-message">
          <h4>Coupon Applied Successfully!</h4>
        </div>
      );
    } else if (couponStatus === 'failure') {
      return (
        <div className="failure-message">
          <h4>Coupon Invalid or Already Applied!</h4>
        </div>
      );
    }
  }, [couponStatus]);

    return(
    <div className="border p-md-4 p-30 border-radius">
      <div className="heading_s1 mb-3">
        <h4>Apply Coupon</h4>
      </div>
      <form className="d-flex" action="#" target="_blank" onSubmit={handleSubmit}>
        <input className="font-medium" name="Coupon" placeholder="Enter Your Coupon" />
        <button className="btn btn-sm ms-2">
          <i className="fi-rs-label mr-10"></i>
          Apply
        </button>
      </form>
      {/* <button className="btn btn-sm">
        <i className="fi-rs-label mr-10"></i>
        Apply
        </button> */}
    </div>
    )

    
}
