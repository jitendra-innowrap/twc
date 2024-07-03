import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ProfileDetails from './ProfileDetails';
import EditProfileForm from './EditProfileForm';
import { editProfileDetails, getProfileDetails } from '../../../../util/api';
import storage from '../../../../util/localStorage';

export default function MyProfile() {
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({
        fullname: "",
        mobile: "",
        email: "",
        gender: "",
        dob: "",
        alternateMobile: "",
        isMobileVerified: true,
        isEmailVerified: false,
    });

    useEffect(() => {
        setEdit(false)
    }, [])

    const handleSubmit = async (tempUser) => {
        const res = await editProfileDetails(tempUser);
        console.log('submit', res);
        setEdit(false)
    }


    

    return (
        <div className="card">
            <div className="card-header">
                <h5>Account Details</h5>
            </div>
            <div className="card-body">
                {!edit ? (
                    <ProfileDetails user={user} setEdit={setEdit} setUser={setUser} />
                ) : (
                    <EditProfileForm user={user} handleSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
}
