import { useRouter } from 'next/router';
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { loginApi, registerApi, resendOTPApi, updateTokenApi, verifyOTPApi } from '../../util/api';
import storage from '../../util/localStorage';
import { Bounce, toast } from 'react-toastify';
import { refreshToken } from '../../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/Slices/cartSlice';
import { fetchWishlist } from '../../redux/Slices/wishlistSlice';

function LoginRegister({noRefferer, close}) {
    const [isSumbitting, setIsSumbitting] = useState(false);
    const [Mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [step, setStep] = useState(1);
    const [auth_token, setAuth_token] = useState("")
    let tempOtp = "1234"
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState({ mobile: false, otp: false, name: false })
    const inputRefs = useRef([]);
    const phoneRef = useRef(null);

    const router = useRouter()
    let referrer = "/"
    const {referrerUrl} = router.query;
    if(referrerUrl){
        referrer = referrerUrl;
    }
    const [otpTimer, setOtpTimer] = useState(false);
    const [timerValue, setTimerValue] = useState(60); // 1 minute in seconds
    let [interval, updateInterval] = useState(null);
    const dispatch = useDispatch();
    
    const handleResendOTP = () => {
            resendOTPApi(auth_token)
                .then(() => {
                    setOtpTimer(true);
                    startOTPTimer();
                    setOtp(['', '', '', '']);
                })
                .catch((error) => {
                    console.error('Error resending OTP:', error);
                });
    };

    const startOTPTimer = () => {
        const newInterval = setInterval(() => {
            console.log('updating', timerValue)
            setTimerValue((prevValue) => {
                if (prevValue === 0) {
                    clearInterval(interval);
                    setOtpTimer(false);
                    return 60;
                }
                console.log('updated',prevValue -1)
                return prevValue - 1;
            });
        }, 1000);
        updateInterval(newInterval);
    };

    const handleBack = () => {
        if (interval) {
          clearInterval(interval);
        }        
        setOtpTimer(false);
        setOtp(['', '', '', ''])
        setTimerValue(60);
        setStep(prev => prev - 1);
        setError({ mobile: false, otp: false })
    }
    
    useEffect(() => {
        // Focus the first OTP input field when the step is set to 2
        if (step === 1) {
            phoneRef.current?.focus()
         }
         // Focus the first OTP input field when the step is set to 2
        if (step === 2) {
            inputRefs.current[0].focus();
          }
        return () => {
            // Clean up the timer when the component unmounts
            clearInterval(interval);
        };
    }, [step]);

    const handleMobile = async () => {
        if (Mobile.length === 10) {
                setIsSumbitting(true)
                loginApi(Mobile)
                .then((res) => {
                    if(res?.code==1){
                        setStep(2);
                        setAuth_token(res?.token)
                        toast.success("OTP Sent Successfully !", {
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
                        toast.error("Something Went Wrong !", {
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
                        console.error(res)
                    }
                })
                .catch((error) => {
                    console.error('Error during login:', error);
                    toast.error("Something Went Wrong !", {
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
                });
                setIsSumbitting(false)
        } else {
            setError((prev) => ({ ...prev, mobile: true }));
        }
    };

    const handleSubmit = () => {
        if (!name) {
            setError(prev => ({ ...prev, name: true }));
        } else {
            registerApi({auth_token,name})
            .then((res) => {
                if(res?.code==1){
                    storage.set("auth_token", auth_token);
                    storage.set("web_token", null);
                    toast.success("Account Created Successfully !", {
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
                    if(!noRefferer){
                        router.push(referrer);
                    }
                    if(close){
                        close();
                        router.reload();
                    }
                }else{
                    toast.error("Something Went Wrong !", {
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
                    console.error(res)
                }
            })
            .catch((error) => {
                console.error('Register:', error);
                toast.error("Something Went Wrong !", {
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
            });

        }
    }
    

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every((digit) => digit !== '')) {
            verifyOTPApi({
                otp: newOtp.join(''),
                auth_token: auth_token, // Assuming you have the auth_token available
            })
                .then((response) => {
                    // OTP is correct, redirect
                    if (response.code == 1) {
                        storage.set("auth_token", auth_token);
                        storage.set("web_token", null);
                        dispatch(fetchCart())
                        dispatch(fetchWishlist())
                        // Add your redirect logic
                        if (response?.result?.is_profile_completed == 0) {
                            setStep(3);
                            toast.success("OTP Verified Successfully !", {
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
                            toast.success("Logged In Successfully !", {
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
                            
                            if(!noRefferer){
                                router.push(referrer);
                            }
                            if(close){
                                close();
                                router.reload();
                            }
                        }
                        handleUpdateToken(
                            auth_token // Assuming you have the auth_token available
                        );
                    } else {
                        console.error('Error verifying OTP:', error);
                        setError({ ...error, otp: true });
                    }
                })
                .catch((error) => {
                    console.error('Error verifying OTP:', error);
                    setError({ ...error, otp: true });
                });
        }
    };

    const handleUpdateToken = async (auth_token)=>{
        try {
            const res = await updateTokenApi(auth_token);
            console.log(res);
        } catch (error) {
            console.error(error)
        }
    }

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleInput = (e) => {
        const { value } = e.target;
          // Filter out non-numeric characters and limit to maxLength
          const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
          setMobile(numericValue)
      };
    return (
        <>
            {step === 1 ?
                <div className="login_wrap w-100">
                    <img src="/assets/imgs/banner/login_banner.png" className='login-banner-image' alt="Login Banner" />
                    <div className="padding_eight_all bg-white p-30">
                        <div className="heading_s1">
                            <h3 className="mb-30 welcome_header">
                                Login <span className="welcome_header_small">or</span> Signup
                            </h3>
                        </div>
                        <div className="mobileInputContainer mt-0">
                            <div className="form-group ">
                                <input ref={phoneRef} 
                                autocomplete="new-password" 
                                onKeyDown={(event) => { if (event.key === 'Enter') handleMobile }} 
                                id="" type="text" pattern="[0-9]*" className="form-control mobileNumberInput"  name="mobile"
                                onChange={handleInput} 
                                placeholder="" 
                                maxLength="10" 
                                inputmode="numeric" 
                                value={Mobile} />
                                <span className="placeholderAlternative mobileNumber">
                                    +91<span style={{ padding: '0px 10px', position: 'relative', bottom: 1 }}>|</span>

                                    {!Mobile && <span className="mobileNumberPlacholder">Mobile Number<span style={{ color: 'rgb(255, 87, 34)' }}>*</span></span>}
                                </span><i className="bar"></i>
                                {error.mobile && <div className="errorContainer">Please enter a valid mobile number (10 digits)</div>}
                            </div>
                            <div className="midLinks">
                                By continuing, I agree to the
                                <a href="/terms-and-conditions"> Terms of Use</a> &amp; <a href="/privacy-policy">Privacy Policy</a>
                            </div>
                            <button className="submitBottomOption btn w-100 rounded-0" disabled={isSumbitting} onClick={handleMobile}>{isSumbitting?'Please Wait...':'CONTINUE'}</button>
                        </div>
                    </div>
                </div>
                :
                step === 2 ?
                    <div className="login_wrap w-100">
                        <div className="verificationContainer">
                            <div className="mobContainer">
                                <div className="otpTopImage">
                                    <div className="image">
                                        <div className="LazyLoad  is-visible" style={{ height: 'auto', width: '100%'}}>
                                                <img src="/assets/imgs/theme/otp-screen.png"  
                                                className="img-responsive preLoad loaded" 
                                                alt="otp screen" 
                                                title="otp screen" 
                                                style={{ width: '100%' }} 
                                                />
                                        </div>
                                    </div>
                                </div>
                                <h3>Verify with OTP</h3><h4>Sent to {Mobile}</h4> <span onClick={handleBack} tabIndex="0" className='change_mobile'>Change</span>
                                <div className="otpContainer form-group">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            className='form-control'
                                            name={`otp${index}`}
                                            type="tel"
                                            maxLength={1}
                                            autoComplete="off"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                        />
                                    ))}
                                </div>
                                {error.otp && <div className="errorContainer">Incorrect OTP !</div>}

                                <div>
                                    <button className="resendContainer" style={{color:`${otpTimer?'gray':''}`, cursor:`${otpTimer?'default':''}`}} disabled={otpTimer} onClick={handleResendOTP}>RESEND OTP</button> 
                                    {otpTimer && <span style={{float:'right', color:'#046963', marginTop:'30px'}}>{Math.floor(timerValue / 60)}:{String(timerValue % 60).padStart(2, '0')}</span>}
                                </div>
                            </div>
                            {/* <div className="bottomeLink"> Having trouble logging in? <span> Get help </span> </div> */}
                        </div>
                    </div>
                    :
                    <div className="login_wrap w-100">
                        {/* <div className="backButton" onClick={handleBack}><i className='fi-rs-arrow-left'></i></div> */}
                        <div className="greenBox">
                            <svg
                                width="24"
                                height="24"
                                fill="#E5F6F2"
                                className="svgIcon"
                                style={{ height: '24px', width: '24px' }}
                            >
                                <g fill="none" fillRule="evenodd">
                                    <path d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="#E5F6F2"
                                        fillRule="nonzero"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7a.996.996 0 111.41-1.41L10 14.17l6.88-6.88a.996.996 0 111.41 1.41l-7.59 7.59a.996.996 0 01-1.41 0z"
                                    ></path>
                                </g>
                            </svg>
                            <div className="welcomeText">Welcome</div>
                            <div className="accountCreated">Your account has been created</div>
                        </div>
                        <div className="padding_eight_all bg-white  p-30">
                            <div className="nameText">What should we call you?</div>
                            <div className="nameInputContainer">
                                <div className="form-group ">
                                    <input autocomplete="new-password" onKeyDown={(event) => { if (event.key === 'Backspace') handleSubmit }} id="" type="tel" className="form-control mobileNumberInput" onChange={(e) => { setName(e.target.value) }} placeholder=""  value={name} />
                                    <span className={`placeholderAlternative mobileNumber ${name ? 'focus' : ''}`}>
                                        <span className="mobileNumberPlacholder">Type your name</span>
                                    </span><i className="bar"></i>
                                    {error.name && <div className="errorContainer ">Name is required</div>}
                                </div>
                                <div className="submitBottomOption" onClick={handleSubmit}>CONTINUE</div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default LoginRegister
