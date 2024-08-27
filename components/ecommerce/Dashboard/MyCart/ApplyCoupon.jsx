import React, { useEffect, useState } from 'react'
import { applyCouponApi, removeCouponApi } from '../../../../util/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../../../redux/Slices/cartSlice';
import { Bounce, toast } from 'react-toastify';

export default function ApplyCoupons () {
    const code = useSelector((state) => state.cart.couponCode);
    const [Coupon, setCoupon] = useState("");
    const [isApply, setIsApply] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if(code!==""){
        setCoupon(code)
        setIsApply('valid')
        setMessage("Coupon Applied Successfully !");
        }else{
          setCoupon("") ;
          setIsApply(null)
        setMessage("");
        }
    }, [code])
    
    const handleApply = async (e) => {
        e.preventDefault();
       if(Coupon){
        try {
            setLoading(true)
          const res = await applyCouponApi(Coupon);
          if (res?.data?.code === 1) {
            setIsApply("valid");
            setMessage("Coupon Applied Successfully !");
          } else {
            setIsApply("invalid");
            setMessage(res?.data?.msg=='Coupon not found'?'Invalid Coupon !':res?.data?.msg);
          }
        } catch (error) {
          console.error("Error applying coupon:", error);
          setIsApply("invalid");
          setMessage("Error applying coupon. Please try again.");
        }
        dispatch(fetchCart())
        setLoading(false)
       }else{
        setMessage("Please Enter Coupon Code !")
       }

      };

      const handleRemoveCoupn = async (e) => {
        e.preventDefault();
        try {
        setLoading(true)
          const res = await removeCouponApi(Coupon);
          if (res?.data?.code === 1) {
            setIsApply(null);
            setMessage("");
            toast.success("Coupon Removed !", {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
          } else {
            console.error("Error removing coupon:", res?.data?.msg);
            setMessage("Error removing coupon. Please try again.");
          }
        } catch (error) {
          console.error("Error removing coupon:", error);
          setMessage("Error removing coupon. Please try again.");
        }
        dispatch(fetchCart())
        setLoading(false)
      };
    return (
        <div>
            <div className="coupons-base-header">Apply Coupons</div>
            {isApply =="valid" ?<div className="coupons-base-content valid">
                <ApplyCoupon />
                {message && <label htmlFor="">{message}</label>}
                <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} disabled />
                <button fontSize="body3" fontWeight="bold" role="button" className="css-15k6cs5"   onClick={handleRemoveCoupn}>
                <i className='fi-rs-trash'></i>
                </button>
            </div>
            : isApply =="invalid"?<div className="coupons-base-content invalid">
                <ApplyCoupon />
                { message && <label htmlFor="">{message}</label>}
                <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} disabled />
                <button fontSize="body3" fontWeight="bold" role="button" className="css-15k6cs5 " onClick={()=>setIsApply(null)}>
                    <i className='fi-rs-trash'></i>
                </button>
            </div>
            :<form onSubmit={handleApply} style={{position:'relative'}} className="coupons-base-content">
            <ApplyCoupon />
            { (message && !Coupon) && <label htmlFor="" style={{position:'absolute', color:'red', bottom:'-30px'}}>{message}</label>}
            <input type="text" placeholder='Apply Coupons' value={Coupon} onChange={(e)=> setCoupon(e.target.value)} />
            <button fontSize="body3" disabled={Coupon?false:true} style={{width:"90px"}} fontWeight="bold" role="button" className="css-15k6cs5 btn">
                {loading?
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                :<div className="css-xjhrni">APPLY</div>}
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
