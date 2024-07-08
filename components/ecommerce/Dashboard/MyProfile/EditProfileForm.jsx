import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import Popup from 'reactjs-popup';
import EditEmailForm from './EditEmailForm';
import EditPhoneForm from './EditPhoneForm';
import { clipDateOnly, reverseDateOrder } from '../../../../util/util';
import Select from 'react-select';

export default function EditProfileForm({ user, handleSubmit }) {
    const genderOptions = [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
        { value: 3, label: "Other" },
    ];
    const initialGender = user?.gender
            ? genderOptions.find((option) => option.value === user.gender)
            : null;
    const [selectedGender, setSelectedGender] = useState(initialGender);
    const [tempUser, setTempUser] = useState(user);


    useEffect(() => {
        const initialGender = user?.gender
            ? genderOptions.find((option) => option.value == user.gender)
            : null;
        console.log('open edit', initialGender)
        setSelectedGender(initialGender);
    }, []);

    const handleGenderChange = (option) => {
        setSelectedGender(option);
        setTempUser({ 
            ...tempUser,
            gender: option?.value || ""
         });
    };

    const handleGenderClear = () => {
        setSelectedGender(null);
        setTempUser({
            ...tempUser,
            gender: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser({
            ...tempUser,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        let dateDobDate
        if (date) {
            dateDobDate = clipDateOnly(date);
        }
        setTempUser({
            ...tempUser,
            dob: dateDobDate,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        handleSubmit(tempUser)
    }

    const handleMobile = (e) => {
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
                                (close) => (
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
                                (close) => (
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
                    <label>Gender</label>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused ? 'grey' : 'red',
                            })
                        }}
                        defaultValue={selectedGender}
                        value={selectedGender}
                        isClearable={true}
                        name="gender"
                        options={genderOptions}
                        onChange={handleGenderChange}
                        onClear={handleGenderClear}
                    />
                </div>
                {/* <select
                        className="form-control square dropdown-toggle"
                        name="gender"
                        value={tempUser.gender}
                        defaultValue={""}
                        onChange={handleInputChange}
                    >   
                        <option value="" className="dropdown-item" selected={tempUser.gender === ""}>
                        </option>
                        <option value="1" className="dropdown-item">
                        Male
                        </option>
                        <option value="2" className="dropdown-item">
                        Female
                        </option>
                        <option value="3" className="dropdown-item">
                        Other
                        </option>
                    </select> */}
                <div className="form-group col-md-12">
                    <label>
                        Date of Birth
                    </label>
                    <ReactDatePicker
                        selected={tempUser.dob}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        minDate={new Date(1900, 0, 1)}
                        yearDropdownItemNumber={100}
                        className="form-control square ml-15"
                        showYearDropdown
                        scrollableYearDropdown
                        onYearChange={""}
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
