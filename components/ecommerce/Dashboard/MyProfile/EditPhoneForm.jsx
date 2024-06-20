import { useRouter } from 'next/router';
import React from 'react'
import { useEffect, useRef, useState } from "react";
import { MdClose } from 'react-icons/md';
export default function EditPhoneForm({close, setTempUser}) {
    const [Mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [step, setStep] = useState(1);
    let tempOtp = "1234"
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState({mobile:false, otp:false})
    const inputRefs = useRef([]);
    const router = useRouter()
    let referrer = "/"
    useEffect(() => {

    }, [])

    const handleMobile = () => {
        if (Mobile.length === 10) {
            setStep(2);
        } else {
            setError(prev => ({...prev, mobile: true}));
        }
    }
    const handleSubmit = () =>{
        router.push(referrer)
    }
    const handleBack = () => {
        setStep(prev => prev - 1);
        setError({mobile:false, otp:false})
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
            if (newOtp.join('') === tempOtp) {
                // OTP is correct, redirect
                console.log('OTP submitted:', newOtp.join(''));
                // Add your redirect logic 
                setStep(3);
                setTempUser(prev => ({ ...prev, mobile: Mobile }));


              } else {
                // OTP is incorrect, set error
                setError({ ...error, otp: true });
              }
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
                                Update Mobile
                            </h3>
                            <button onClick={handleBack} className="close_popUp">
                                <MdClose fontSize={22} />
                            </button>
                        </div>
                        <div class="mobileInputContainer">
                            <div class="form-group ">
                                <input autocomplete="new-password" onKeyDown={(event) => { if (event.key === 'Backspace') handleMobile }} id="" type="tel" class="form-control mobileNumberInput" onChange={(e) => { setMobile(e.target.value) }} placeholder="" maxlength="10" value={Mobile} />
                                <span class="placeholderAlternative mobileNumber">
                                    +91<span style={{ padding: '0px 10px', position: 'relative', bottom: 1 }}>|</span>

                                    {!Mobile &&<span class="mobileNumberPlacholder">Mobile Number<span style={{ color: 'rgb(255, 87, 34)' }}>*</span></span>}
                                </span><i class="bar"></i>
                                {error.mobile && <div className="errorContainer">Please enter a valid mobile number (10 digits)</div>}
                            </div>
                            <div class="midLinks">
                                By continuing, I agree to the
                                <a href="/termsofuse">Terms of Use</a> &amp; <a href="/privacypolicy">Privacy Policy</a>
                            </div>
                            <div class="submitBottomOption" onClick={handleMobile}>CONTINUE</div>
                        </div>
                        <div class="get-help">Have trouble logging in? <span>Get help</span></div>
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
                                        <img src className="img-responsive preLoad loaded" alt title style={{ width: '100%' }} />
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
                                <button className="resendContainer">RESEND OTP</button>
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
                            <div class="nameInputContainer w-100">
                                <div class="submitBottomOption" onClick={close}>CONTINUE</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
