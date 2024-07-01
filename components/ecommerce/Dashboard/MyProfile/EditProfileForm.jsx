import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import Popup from 'reactjs-popup';
import EditEmailForm from './EditEmailForm';
import EditPhoneForm from './EditPhoneForm';
import { clipDateOnly, reverseDateOrder } from '../../../../util/util';

export default function EditProfileForm({user, handleSubmit}) {
    const [tempUser, setTempUser] = useState(user);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser({
            ...tempUser,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        const dateDobDate = clipDateOnly(date);
        setTempUser({
            ...tempUser,
            dob: dateDobDate,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        handleSubmit(tempUser)
    }

    const handleMobile  = (e) => {
        e.preventDefault();
        handleSubmit(tempUser)
    }

    const handleEmail = (e) => {
        e.preventDefault();
        handleSubmit(tempUser)
    }

    return (
        <form
            onSubmit={handleSave}
        >
            <div className="row">
                <div className="form-group col-md-12">
                    <label>
                        Full Name
                        <span className="required">*</span>
                    </label>
                    <input
                        required
                        className="form-control square"
                        name="fullname"
                        type="text"
                        value={tempUser.fullname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-md-12 d-relative">
                    <label>
                        Email Address
                        <span className="required">*</span>
                    </label>
                    <div className="input-group">
                        <input
                            required
                            className="form-control square"
                            name="email"
                            disabled
                            type="email"
                            value={tempUser.email}
                            onChange={handleInputChange}
                        />
                        <Popup
                            trigger={
                                <button 
                                    className="btn btn-secondary btn-sm float-right" 
                                    type='button' 
                                    onClick={handleEmail}
                                    >Change
                                </button>} 
                            modal 
                            position="right center"
                            >
                                {
                                    (close)=>(
                                        <EditEmailForm close={close} setTempUser={setTempUser} />
                                    )
                                }
                        </Popup>
                        
                    </div>
                </div>
                <div className="form-group col-md-12 d-relative">
                    <label>
                        Mobile
                        <span className="required">*</span>
                    </label>
                    <div className="input-group">
                        <input
                            required
                            className="form-control square"
                            name="mobile"
                            disabled
                            type="text"
                            value={tempUser.mobile}
                            onChange={handleInputChange}
                        />
                        <Popup
                            trigger={
                                <button 
                                    className="btn btn-secondary btn-sm float-right" 
                                    type='button' 
                                    onClick={handleMobile}
                                    >Change
                                </button>} 
                            modal 
                            position="right center"
                            >
                                {
                                    (close)=>(
                                        <EditPhoneForm close={close} setTempUser={setTempUser} />
                                    )
                                }
                        </Popup>
                    </div>
                </div>
                <div className="form-group col-md-12">
                    <label>
                        Alternate Mobile
                    </label>
                    <input
                        className="form-control square"
                        name="alternateMobile"
                        type="text"
                        maxLength={10}
                        value={tempUser.alternateMobile}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-md-12">
                    <label>
                        Gender
                    </label>
                    <select
                        className="form-control square dropdown-toggle"
                        name="gender"
                        value={tempUser.gender}
                        onChange={handleInputChange}
                    >
                        <option value="1" className="dropdown-item">
                        Male
                        </option>
                        <option value="2" className="dropdown-item">
                        Female
                        </option>
                    </select>
                </div>
                <div className="form-group col-md-12">
                    <label>
                        Date of Birth
                    </label>
                    <ReactDatePicker
                        
                        // selected={reverseDateOrder(tempUser.dob)}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control square ml-15"
                    />
                </div>
                <div className="col-md-12">
                    <button
                        type="submit"
                        className="btn btn-fill-out submit"
                        name="submit"
                        value="Submit"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
