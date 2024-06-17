import React, { useState } from 'react'

export default function ApplyCoupons () {
    const [Coupon, setCoupon] = useState("FREEDEL");
    const [isApply, setIsApply] = useState(null);
    const handleApply =()=>{
        if(Coupon=="FREEDEL"){
            setIsApply("valid");
        }else{
            setIsApply("invalid")
        }
    }
    return (
        <div>
            <div className="coupons-base-header">Apply Coupons</div>
            {isApply =="valid" ?<div className="coupons-base-content valid">
                <ApplyCoupon />
                <label htmlFor="">Coupon Applied Successfully!</label>
                <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} disabled />
                <button fontSize="body3" fontWeight="bold" role="button" className="css-15k6cs5"   onClick={()=>setIsApply(null)}>
                <i className='fi-rs-trash'></i>
                </button>
            </div>
            : isApply =="invalid"?<div className="coupons-base-content invalid">
                <ApplyCoupon />
                <label htmlFor="">Invalid Coupon</label>
                <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} disabled />
                <button fontSize="body3" fontWeight="bold" role="button" className="css-15k6cs5 " onClick={()=>setIsApply(null)}>
                    <i className='fi-rs-trash'></i>
                </button>
            </div>
            :<form onSubmit={handleApply} className="coupons-base-content">
            <ApplyCoupon />
            <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} />
            <button fontSize="body3" fontWeight="bold" role="button" className="css-15k6cs5 ">
                <div className="css-xjhrni">APPLY</div>
            </button>
        </form>
        }
        </div>
    )
}



export function ApplyCoupon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" className="coupons-base-couponIcon">
                    <g fill="none" fillRule="evenodd" transform="rotate(45 6.086 5.293)">
                        <path stroke="#000" d="M17.5 10V1a1 1 0 0 0-1-1H5.495a1 1 0 0 0-.737.323l-4.136 4.5a1 1 0 0 0 0 1.354l4.136 4.5a1 1 0 0 0 .737.323H16.5a1 1 0 0 0 1-1z" />
                        <circle cx="5.35" cy="5.35" r="1.35" fill="#000" fillRule="nonzero" />
                    </g>
                </svg>
  )
}
