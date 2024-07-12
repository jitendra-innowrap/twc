import React, { useRef, useState } from 'react';
import { MdClose, MdCheck, MdClear } from 'react-icons/md';
import { generateRandomId } from '../../../../util/util';
import { useEffect } from 'react';
import { addAddress } from '../../../../util/api';

export default function AddGst({ close , handleAddGst, gstNumber}) {
    const [isSumbitting, setIsSumbitting] = useState(false)   
    const inputRef = useRef(null);
    const [tempGst, setTempGst] = useState(gstNumber)
    const [error, setError] = useState('')

    useEffect(() => {
        // Focus the first OTP input field when the step is set to 2
            inputRef.current?.focus()
    }, []);
    const handleInputChange =(e)=>{
        setTempGst(e.target.value)
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tempGst) {
        setError("Please Enter Your GST Number");
    }else{
        handleAddGst(tempGst);
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
                    <button onClick={handleBack} className="close_popUp">
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
                        {(error && !tempGst) && <div className="errorContainer">{error}</div>}

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
