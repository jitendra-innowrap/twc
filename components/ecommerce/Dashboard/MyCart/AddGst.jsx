import React, { useRef, useState } from 'react';
import { MdClose, MdCheck, MdClear } from 'react-icons/md';
import { generateRandomId } from '../../../../util/util';
import { useEffect } from 'react';
import { addAddress } from '../../../../util/api';

export default function AddGst({ close , handleAddGst, gstNumber, companyName}) {
    const [isSumbitting, setIsSumbitting] = useState(false)   
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const [tempGst, setTempGst] = useState(gstNumber)
    const [tempCompanyName, setCompanyName] = useState(companyName);
    const [error, setError] = useState({
        companyName:"",
        gstNumber:"",
    })

    useEffect(() => {
        // Focus the first OTP input field when the step is set to 2
            inputRef.current?.focus()
    }, []);
    const handleInputChangeCompany = (e) => {
        setCompanyName(e.target.value);
        setError(prev =>({
            ...prev,
            companyName:''
        }));
    };
    const handleInputChange =(e)=>{
        // Get the input value and convert it to uppercase
        const upperCaseValue = e.target.value.toUpperCase();
        setTempGst(upperCaseValue);
        setError(prev =>({
            ...prev,
            gstNumber:''
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = false;
        console.log('intiallize:',isError)
        // GST validation regex
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/;
    
        if (!tempGst) {
            setError(prev => ({
                ...prev,
                gstNumber: 'Please Enter Your GST Number'
            }));
            isError=true;
        } 
        
        if (!gstRegex.test(tempGst)) {
            setError(prev => ({
                ...prev,
                gstNumber: 'Please Enter a Valid GST Number'
            }));
            isError=true;
        }
        
        if (!tempCompanyName) {  // Moved this check outside the GST validation
            setError(prev => ({
                ...prev,
                companyName: 'Please Enter Your Company Name'
            }));
            isError=true;
        } 
        
        console.log(isError)
        if(!isError){
            setError({
                companyName: "",
                gstNumber: ''
            }); // Clear any previous error messages
            handleAddGst(tempGst, tempCompanyName); // Pass both values
            close();
        }
    };
    
    

  const handleBack = () => {
    close();
  };

  return (
    <div className="popUpContainer">
      <div className="login_wrap w-100 add_address">
            <form onSubmit={handleSubmit}  className="padding_eight_all bg-white p-30">
                <div className="heading_s1">
                        <h3 className="welcome_header">{gstNumber?'Update GST Number':'Add GST Number'}</h3>
                    <button onClick={handleBack} type='button' className="close_popUp">
                        <MdClose fontSize={22} />
                    </button>
                </div>
                <div className="mobileInputContainer">
                    <div className="form-group col-md-12">
                        <label htmlFor='gstNumber' onClick={()=> {inputRef.current.focus();}}>
                            GST Number
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            className={`form-control square`}
                            name="gstNumber"
                            id='gstNumber'
                            type="text"
                            value={tempGst}
                            onChange={handleInputChange}
                            ref={inputRef}
                        />
                        {(error.gstNumber || !tempGst) && <div className="errorContainer">{error.gstNumber}</div>}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor='gstNumber' onClick={()=> {inputRef2.current.focus();}}>
                            Company Name
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            className={`form-control square`}
                            name="companyName"
                            id='companyName'
                            type="text"
                            value={tempCompanyName}
                            onChange={handleInputChangeCompany}
                            ref={inputRef2}
                        />
                        {(error.companyName && !tempCompanyName) && <div className="errorContainer">{error.companyName}</div>}
                    </div>
                    <div className="form-group col-md-12 text-right mb-0">
                        <button className="btn square w-100 rounded-0" disabled={isSumbitting} type='submit'>
                            Save 
                        </button>
                    </div>
                </div>
            </form>
      </div>
    </div>
  );
}
