import { useRouter } from 'next/router';
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { MdClose } from 'react-icons/md';
import { editPhoneNumber, resendOTPForPhone, verifyOTPforPhone } from '../../../../util/api';
import { Bounce, toast } from 'react-toastify';

export default function EditPhoneForm({ close, setTempUser }) {
    const [Mobile, setMobile] = useState("");
    const [isSumbitting, setIsSumbitting] = useState(false);
    const [name, setName] = useState("");
    const [step, setStep] = useState(1);
    let tempOtp = "1234"
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState({ mobile: "", otp: "" })
    const inputRefs = useRef([]);
    const router = useRouter()
    let referrer = "/"
    const [otpTimer, setOtpTimer] = useState(false);
    const [timerValue, setTimerValue] = useState(60); // 1 minute in seconds
    let [interval, updateInterval] = useState(null);

    const handleResendOTP = async () => {
        try {
            const res = await resendOTPForPhone(Mobile)
            if (res.code === 1) {
                setOtpTimer(true);
                startOTPTimer();
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
            } else {
                setError(prev => ({ ...prev, mobile: res.msg }));
                toast.error(`Error! ${res?.msg}`, {
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
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
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
                console.log('updated', prevValue - 1)
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
        setTimerValue(60);
        setOtp(['', '', '', ''])
        setStep(prev => prev - 1);
        setError({ mobile: false, otp: false })
    }

    useEffect(() => {
        return () => {
            // Clean up the timer when the component unmounts
            clearInterval(interval);
        };
    }, []);



    const handleMobile = async () => {
        if (Mobile.length === 10) {
            setIsSumbitting(true)
            try {
                const res = await editPhoneNumber(Mobile)
                if (res.code === 1) {
                    setStep(2);
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
                } else {
                    if(res?.msg=="Mobile already verified"){
                        setError(prev => ({ ...prev, mobile: false }));
                        toast.success(`${res?.msg}`, {
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
                    setError(prev => ({ ...prev, mobile: res.msg }));
                    toast.error(`Error! ${res?.msg}`, {
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
            } catch (error) {
                console.error('Error resending OTP:', error);
            }
            setIsSumbitting(false)
        } else {
            setError(prev => ({ ...prev, mobile: "Please enter a valid mobile number (10 digits)" }));
        }
    }

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            // Auto-submit the OTP
            verifyOTPforPhone({
                otp: newOtp.join(''),
                mobile: Mobile,
            })
                .then((response) => {
                    // OTP is correct, redirect
                    if (response?.code == 1) {
                        // Add your redirect logic
                        setStep(3);
                        setTempUser((prevTempUser) => ({
                            ...prevTempUser,
                            mobile: Mobile,
                        }));
                        toast.success("Mobile Verified Successfully !", {
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
                        toast.error(`Error! ${response?.msg}`, {
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
                        setError({ ...error, otp: response?.msg });
                        console.error('Error verifying OTP:', response?.msg);
                    }
                })
                .catch((error) => {
                    console.error('Error verifying OTP:', error);
                });
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='popUpContainer'>
            <button onClick={close} type='button' className='close_popUp'><MdClose fontSize={22} /></button>
            {step === 1 ?
                <div className="login_wrap w-100">
                    <div className="padding_eight_all bg-white  p-30">
                        <div className="heading_s1">
                            <h3 className="welcome_header">
                                Update Mobile
                            </h3>
                            <button type='button' onClick={close} className="close_popUp">
                                <MdClose fontSize={22} />
                            </button>
                        </div>
                        <div className="mobileInputContainer">
                            <div className="form-group ">
                                <input autoComplete="new-password" onKeyDown={(event) => { if (event.key === 'Backspace') handleMobile }} id="" type="tel" className="form-control mobileNumberInput" onChange={(e) => { setMobile(e.target.value) }} placeholder="" maxLength="10" value={Mobile} />
                                <span className="placeholderAlternative mobileNumber">
                                    +91<span style={{ padding: '0px 10px', position: 'relative', bottom: 1 }}>|</span>

                                    {!Mobile && <span className="mobileNumberPlacholder">Mobile Number<span style={{ color: 'rgb(255, 87, 34)' }}>*</span></span>}
                                </span><i className="bar"></i>
                                {error.mobile && <div className="errorContainer">{error.mobile}</div>}
                            </div>
                            <div className="midLinks">
                                By continuing, I agree to the
                                <a href="/termsofuse">Terms of Use</a> &amp; <a href="/privacypolicy">Privacy Policy</a>
                            </div>
                            <button className="submitBottomOption btn w-100 rounded-0" disabled={isSumbitting} onClick={handleMobile}>{isSumbitting?'Please Wait...':'CONTINUE'}</button>
                        </div>
                        <div className="get-help">Have trouble logging in? <span>Get help</span></div>
                    </div>
                </div>
                :
                step === 2 ?
                    <div className="login_wrap">
                        <div className="verificationContainer">
                            <div className="otpTopImage">
                                <div className="image">
                                    <div className="LazyLoad  is-visible" style={{ height: 'auto', width: '100%', background: 'rgb(255, 237, 243)' }}>
                                        <picture className="img-responsive" style={{ width: '100%' }}>
                                            <source srcSet="//constant.myntassets.com/pwa/assets/img/3a438cb4-c9bf-4316-b60c-c63e40a1a96d1548071106233-mobile-verification.jpg" type="image/webp" />
                                            <img src className="img-responsive preLoad loaded" alt="otp screen vector image" title="otp screen" style={{ width: '100%' }} />
                                        </picture>
                                    </div>
                                </div>
                            </div>
                            <div className="mobContainer">
                                <h3>Verify with OTP</h3><h4>Sent to {Mobile}</h4> <span onClick={handleBack} tabIndex="0" className='change_mobile'>Change</span>
                                <div className="otpContainer">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
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
                                    <button className="resendContainer" style={{ color: `${otpTimer ? 'gray' : ''}`, cursor: `${otpTimer ? 'default' : ''}` }} disabled={otpTimer} onClick={handleResendOTP}>RESEND OTP</button>
                                    {otpTimer && <span style={{ float: 'right', color: '#046963', marginTop: '30px' }}>{Math.floor(timerValue / 60)}:{String(timerValue % 60).padStart(2, '0')}</span>}
                                </div>
                            </div>
                            <div className="bottomeLink"> Having trouble logging in? <span> Get help </span> </div>
                        </div>
                    </div>
                    :
                    <div className="login_wrap w-100 d-flex align-items-center">
                        <div className="backButton mt-20" onClick={handleBack}><i className='fi-rs-arrow-left'></i></div>
                        <div className="greenBox mt-20">
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
                            <div className="welcomeText">Successfull</div>
                            <div className="accountCreated">Your Mobile Number is updated Successfully.</div>
                        </div>
                        <div className="padding_eight_all bg-white w-100 p-30">
                            <div className="nameInputContainer w-100">
                                <div className="submitBottomOption" onClick={close}>CONTINUE</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
