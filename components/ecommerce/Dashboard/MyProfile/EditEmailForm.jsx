import { useRouter } from 'next/router';
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { MdClose } from 'react-icons/md';
import { editEmail, editPhoneNumber, resendOTPForEmail, resendOTPForPhone, verifyOTPforEmail, verifyOTPforPhone } from '../../../../util/api';
export default function EditEmailForm({close, setTempUser}) {
    const [Email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [step, setStep] = useState(1);
    let tempOtp = "1234"
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState({email:false, otp:false})
    const inputRefs = useRef([]);
    const router = useRouter()
    let referrer = "/";
    const [otpTimer, setOtpTimer] = useState(false);
    const [timerValue, setTimerValue] = useState(60); // 1 minute in seconds
    let [interval, updateInterval] = useState(null);

    const handleResendOTP = () => {
        resendOTPForEmail(Email)
            .then(() => {
                setOtpTimer(true);
                startOTPTimer();
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
        setStep(prev => prev - 1);
        setError({ mobile: false, otp: false })
    }

    useEffect(() => {
        return () => {
            // Clean up the timer when the component unmounts
            clearInterval(interval);
        };
    }, []);

    const handleEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(Email)) {
            try {
                const res = await editEmail(Email)
                if (res.code === 0) {
                    setError(prev => ({ ...prev, email: res.msg }));
                } else {
                    setStep(2);
                }
            } catch (error) {

            }
        } else {
          setError((prev) => ({ ...prev, email: true }));
        }
      };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            // Auto-submit the OTP
              verifyOTPforEmail({
                otp: newOtp.join(''),
                email: Email,
            })
                .then((response) => {
                    // OTP is correct, redirect
                    if (response.code == 1) {
                        // Add your redirect logic
                        if (response?.result?.is_profile_completed == 0) {
                            setStep(3);
                        } else {
                            storage.set("dokani_user", { auth_token: response?.token, user: response?.result, isLoggedIn: true });
                            console.log('login', response)
                            // router.push(referrer)
                        }
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

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='popUpContainer'>
          <button onClick={close} className='close_popUp'><MdClose fontSize={22}/></button>
            {step === 1 ?
                <div className="login_wrap w-100">
                    <div className="padding_eight_all bg-white  p-30">
                        <div className="heading_s1">
                            <h3 className="welcome_header">
                                Update Email
                            </h3>
                            <button onClick={close} className="close_popUp">
                                <MdClose fontSize={22} />
                            </button>
                        </div>
                        <div className="mobileInputContainer">
                            <div className="form-group ">
                                <input autoComplete="new-password" onKeyDown={(event) => { if (event.key === 'Backspace') handleEmail }} id="" type="text" className="form-control mobileNumberInput email" onChange={(e) => { setEmail(e.target.value) }} placeholder="" value={Email} />
                                <span className="placeholderAlternative mobileNumber">

                                    {!Email &&<span className="mobileNumberPlacholder">Email<span style={{ color: 'rgb(255, 87, 34)' }}>*</span></span>}
                                </span><i className="bar"></i>
                                {error.email && <div className="errorContainer">Please enter a valid email.</div>}
                            </div>
                            <div className="midLinks">
                                By continuing, I agree to the
                                <a href="/termsofuse">Terms of Use</a> &amp; <a href="/privacypolicy">Privacy Policy</a>
                            </div>
                            <div className="submitBottomOption" onClick={handleEmail}>CONTINUE</div>
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
                            <h3>Verify with OTP</h3><h4>Sent to {Email}</h4> <span onClick={handleBack} tabIndex="0" className='change_mobile'>Change</span>
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
                            <div className="accountCreated">Your Email Number is updated Successfully.</div>
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
