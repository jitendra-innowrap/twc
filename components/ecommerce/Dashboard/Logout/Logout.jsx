import React, { useEffect } from 'react'
import { logOutApi } from '../../../../util/api';
import { useDispatch } from 'react-redux';
import storage from '../../../../util/localStorage';
import { Bounce, toast } from 'react-toastify';
import { emptyCart } from '../../../../redux/Slices/cartSlice';
import { useRouter } from 'next/router';

export default function Logout({close, closeMenu}) {
  useEffect(() => {
    if(closeMenu){
      closeMenu();
    }
  
  }, [])
  
  const dispatch = useDispatch();
  const router = useRouter();

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

  const handleLogout = async () =>{
    const res = await logOutApi();
    if(res.code==1){
        handleEmptyCart();
        router.push('/page-login-register');
        const randomString = Math.random().toString(36).substring(2);
        const token = btoa(randomString);
        storage.set("web_token", token);
        storage.set("auth_token", null);
        toast.success("logged Out Successfully!", {
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
    }else{
        console.log(res.msg)
        toast.error("Something went wrong!", {
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
    }
}
  return (
    <div className='logout_wrap'>
        <h2>Do you Really want to log out?</h2>
        <div className="actions_btns">
          <button className="btn flex-1" onClick={handleLogout}>Yes, Log out!</button>
          <button className="btn flex-1 border-btn" onClick={close}>Cancel</button>
        </div>
    </div>
  )
}
