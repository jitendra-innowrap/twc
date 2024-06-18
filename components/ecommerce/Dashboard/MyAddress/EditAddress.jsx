import React, { useState } from 'react';
import { MdClose, MdCheck, MdClear } from 'react-icons/md';

export default function EditAddress({ close , setAddressList, currentAddress, addressList}) {
    const [isSumbitting, setIsSumbitting] = useState(false)
  const [address, setAddress] = useState({
    name: currentAddress.name,
    mobile: currentAddress.mobile,
    addressLine1: currentAddress.addressLine1,
    addressLine2: currentAddress.addressLine2,
    landmark: currentAddress.landmark,
    pincode: currentAddress.pincode,
    state: currentAddress.state,
    city: currentAddress.city,
    addressType: currentAddress.addressType,
    isDefault: currentAddress.isDefault,
  });
  const [error, setError] = useState({
    name: false,
    mobile: false,
    addressLine1: false,
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
    setAddress((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!address.name) {
      setError((prev) => ({ ...prev, name: true }));
      hasError = true;
    }

    if (!address.mobile || address.mobile.length !== 10) {
      setError((prev) => ({ ...prev, mobile: true }));
      hasError = true;
    }

    if (!address.addressLine1) {
      setError((prev) => ({ ...prev, addressLine1: true }));
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
      // Edit the address of id check if the edited addess is set to default 
      // make all other address isDefault false edited address index will not change
      if(address.isDefault==true){
        const updatedAddresses = addressList.map((item) => {
          if (item.id === currentAddress.id) {
            return address
          }else{
            return { ...item, isDefault: false };
          }
          });
          setAddressList(updatedAddresses);
      }else{
        const updatedAddresses = addressList.map((item) => {
          if (item.id === currentAddress.id) {
            return address
          }else{
            return item;
          }
          });
          setAddressList(updatedAddresses);
      }
      close();
    }
    
  };

  const handleBack = () => {
    close();
  };

  return (
    <div className="popUpContainer">
      <div className="login_wrap w-100 add_address">
        <div className="padding_eight_all bg-white p-30">
          <div className="heading_s1">
            <h3 className="welcome_header">
              Edit Address 
            </h3>
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
                value={address.name}
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
                value={address.mobile}
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
                name="addressLine1"
                type="text"
                value={address.addressLine1}
                onChange={handleInputChange}
                />
                {error.addressLine1 && <div className="errorContainer">Address is required</div>}
            </div>
            <div className="form-group col-md-12">
              <label>Address Line 2 (optional)</label>
              <input
                className="form-control square"
                name="addressLine2"
                type="text"
                value={address.addressLine2}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group col-md-12">
              <label>Landmark (optional)</label>
              <input
                className="form-control square"
                name="landmark"
                type="text"
                value={address.landmark}
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
                type="text"
                value={address.pincode}
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
                value={address.state}
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
                value={address.city}
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
                  className={`${address.addressType === 'home' ? 'selected' : ''}`}
                  onClick={() => handleAddressTypeChange('home')}
                  >
                  Home
                </button>
                <button
                  className={`${address.addressType === 'office' ? 'selected' : ''}`}
                  onClick={() => handleAddressTypeChange('office')}
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
                checked={address?.isDefault}
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
      </div>
    </div>
  );
}
