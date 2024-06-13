import Link from 'next/link';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ProfileDetails from './ProfileDetails';
import EditProfileForm from './EditProfileForm';

export default function MyProfile() {
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({
        fullname: "Aman Gangwal",
        mobile: "9769294578",
        email: "aman@innowrap.com",
        gender: "1",
        dob: new Date("1994-01-01"),
        alternateMobile: "9090909090",
        isMobileVerified: true,
        isEmailVerified: false,
    });

    const handleSubmit = (tempUser) => {
        setUser(tempUser)
        setEdit(false)
        // api call here
    }
    

    return (
        <div className="card">
            <div className="card-header">
                <h5>Account Details</h5>
            </div>
            <div className="card-body">
                {!edit ? (
                    <ProfileDetails user={user} setEdit={setEdit} />
                ) : (
                    <EditProfileForm user={user} handleSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
}
