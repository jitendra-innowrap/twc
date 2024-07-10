import React, { useState } from 'react';
import { MdClose, MdCheck, MdClear } from 'react-icons/md';
import { generateRandomId } from '../../../../util/util';
import { useEffect } from 'react';
import { addAddress } from '../../../../util/api';

export default function ChangeAddress({ close , handleSelectAddress, fetchAddressList, deliveredTo, addressList}) {
    const [addNew, setAddNew] = useState(false)
    const [isSumbitting, setIsSumbitting] = useState(false)
    let id = generateRandomId(6);
    const [address, setAddress] = useState({
        id: id,
        name: '',
        mobile: '',
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        pincode: '',
        state: '',
        city: '',
        addressType: 'none',
        isDefault: false
    });

  useEffect(() => {
    setAddress({
        id: id,
        name: '',
        mobile: '',
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        pincode: '',
        state: '',
        city: '',
        addressType: 'none',
        isDefault: false
    })
  }, [addNew])
  
  const [error, setError] = useState({
    name: false,
    mobile: false,
    address_line_1: false,
    pincode: false,
    state: false,
    city: false,
    addressType: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const handleAddressTypeChange = (type) => {
    setAddress((prev) => ({ ...prev, addressType: type }));
    setError((prev) => ({ ...prev, addressType: false }));
  };

  const handleDefaultChange = (e) => {
    setAddress((prev) => ({ ...prev, isDefault: e.target.checked?1:0 }));
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!address.name) {
      setError((prev) => ({ ...prev, name: true }));
      hasError = true;
    }

    if (!address.mobile || address.mobile.length !== 10) {
      setError((prev) => ({ ...prev, mobile: true }));
      hasError = true;
    }

    if (!address.address_line_1) {
      setError((prev) => ({ ...prev, address_line_1: true }));
      hasError = true;
    }

    if (!address.pincode) {
      setError((prev) => ({ ...prev, pincode: true }));
      hasError = true;
    }

    if (!address.state) {
      setError((prev) => ({ ...prev, state: true }));
      hasError = true;
    }

    if (!address.city) {
      setError((prev) => ({ ...prev, city: true }));
      hasError = true;
    }

    if (address.addressType === 'none') {
      setError((prev) => ({ ...prev, addressType: true }));
      hasError = true;
    }

    if (!hasError) {

    try {
        let body = {
          name:address.name,
          city:address.city,
          state_name:address.state,
          mobile:address.mobile,
          address_line_1:address.address_line_1,
          address_line_2:address.address_line_2,
          landmark:address.landmark,
          is_default:address.isDefault,
          address_type:address.addressType,
          other_address_type_name:"",
          pincode:address.pincode
        }
        const res = await addAddress(body);
        fetchAddressList();
        console.log(res)
      } catch (error) {
        
      }
      setAddNew(false)
      
      }
  };

  const handleBack = () => {
    close();
  };

  return (
    <div className="popUpContainer">
      <div className="login_wrap w-100 add_address">
        {
            !addNew?
            <div className="padding_eight_all bg-white p-30">
                <div className="heading_s1">
                    <h3 className="welcome_header">Change Address</h3>
                    <button onClick={handleBack} className="close_popUp">
                        <MdClose fontSize={22} />
                    </button>
                </div>
                <div className="change_address_list">
                    <div className="heading_s2">
                        <h4>Saved Address</h4>
                        <div className="add_new_btn" role='button' onClick={()=>{setAddNew(true)}}>
                            <i className='fi-rs-plus'></i> <span>Add New</span>
                        </div>
                    </div>
                    {
                        addressList?.map((address)=>{
                            return (
                                <div className={`addressStripV2-base-desktopContainer ${deliveredTo == address?.id? 'selected':''}`}>
                                    <div className="addressStripV2-base-title">
                                        <div className="addressStripV2-base-addressName">
                                            Deliver to:<span className="addressStripV2-base-highlight">{address?.name}</span>,
                                            <div className="addressStripV2-base-highlight">{address?.pincode}</div>
                                        </div>
                                        <div className="addressStripV2-base-subText">
                                            {`${address?.address_line_1 || address?.address_line_1}, ${address?.address_line_2 || address?.address_line_2}`}
                                        </div>
                                    </div>
                                    <div onClick={()=>{handleSelectAddress(address?.id)}} className="addressStripV2-base-changeBtn addressStripV2-base-changeBtnDesktop">
                                        {deliveredTo == address?.id?"Selected":"Choose"}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            :
            <div className="padding_eight_all bg-white p-30">
                <div className="heading_s1">
                    <h3 className="welcome_header"><i role='button'  onClick={()=>{setAddNew(false)}} className='fi-rs-arrow-left mr-15'></i>Change Address</h3>
                    <button onClick={handleBack} className="close_popUp">
                        <MdClose fontSize={22} />
                    </button>
                </div>
                <div className="mobileInputContainer">
                    <div className="form-group col-md-12">
                        <label>
                            Full Name
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="name"
                            type="text"
                            value={address?.name}
                            onChange={handleInputChange}
                        />
                        {error.name && <div className="errorContainer">Name is required</div>}

                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            Mobile
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="mobile"
                            maxLength={10}
                            type="tel"
                            value={address?.mobile}
                            onChange={handleInputChange}
                        />
                        {error.mobile && <div className="errorContainer">Please enter a valid mobile number (10 digits)</div>}
                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            Address Line 1
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="address_line_1"
                            type="text"
                            value={address?.address_line_1}
                            onChange={handleInputChange}
                        />
                        {error.address_line_1 && <div className="errorContainer">Address is required</div>}
                    </div>
                    <div className="form-group col-md-12">
                        <label>Address Line 2 (optional)</label>
                        <input
                            className="form-control square"
                            name="address_line_2"
                            type="text"
                            value={address?.address_line_2}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <label>Landmark (optional)</label>
                        <input
                            className="form-control square"
                            name="landmark"
                            type="text"
                            value={address?.landmark}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            Pincode
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="pincode"
                            type="tel"
                            maxLength={6}
                            value={address?.pincode}
                            onChange={handleInputChange}
                        />
                        {error.pincode && <div className="errorContainer">Pincode is required</div>}
                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            State
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="state"
                            type="text"
                            value={address?.state}
                            onChange={handleInputChange}
                        />
                        {error.state && <div className="errorContainer">State is required</div>}
                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            City
                            <span className={`text-danger`}>*</span>
                        </label>
                        <input
                            required
                            className={`form-control square`}
                            name="city"
                            type="text"
                            value={address?.city}
                            onChange={handleInputChange}
                        />
                        {error.city && <div className="errorContainer">City is required</div>}

                    </div>
                    <div className="form-group col-md-12">
                        <label>
                            Save address as
                            <span className={`text-danger`}>*</span>
                        </label>
                        <div className="address-type-buttons">
                            <button
                                className={`${address?.addressType === '0' ? 'selected' : ''}`}
                                onClick={() => handleAddressTypeChange('0')}
                            >
                                Home
                            </button>
                            <button
                                className={`${address?.addressType === '1' ? 'selected' : ''}`}
                                onClick={() => handleAddressTypeChange('1')}
                            >
                                Office
                            </button>
                        </div>
                        {error.addressType && <div className="errorContainer">Select address type</div>}
                    </div>
                    <div className="form-group col-md-12 d-flex align-items-center">
                        <input
                            type="checkbox"
                            name='setDefault'
                            id='setDefault'
                            checked={address?.isDefault==1?true:false}
                            onChange={handleDefaultChange}
                            className='checkbox'
                        />
                        <label htmlFor='setDefault' className='ml-10'>
                            Make this default address
                        </label>
                    </div>
                    <div className="form-group col-md-12 text-right mb-0">
                        <button className="btn square w-100 rounded-0" disabled={isSumbitting} onClick={handleSubmit}>
                            Save Address
                        </button>
                    </div>
                </div>
            </div>
        }
      </div>
    </div>
  );
}
