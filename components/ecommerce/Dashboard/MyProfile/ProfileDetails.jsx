import React, { useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { getProfileDetails } from '../../../../util/api';
import storage from '../../../../util/localStorage';
import { reverseDateOrder } from '../../../../util/util';

export default function ProfileDetails({ user, setEdit, setUser }) {
    const auth_token = storage.get("auth_token");

    useEffect(() => {
        if(auth_token){
            fetchProfileDetails();
        }
    }, [setEdit])
    

    const fetchProfileDetails = async()=>{
        const response = await getProfileDetails(auth_token || "");
        let tempUser = response.result?.[0];
        console.log('tempuser',tempUser)
        setUser({
            fullname: tempUser.f_name,
        mobile: tempUser.mobile,
        email: tempUser.email,
        gender: tempUser.gender || 1,
        dob: tempUser.dob,
        alternateMobile: tempUser.alternate_mobile,
        isMobileVerified: true,
        isEmailVerified: false,
        })
    }
    return (
        <div className="profile-details">
            <div className="mb-3">
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.fullname}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        {user?.email && <div className="col-sm-9 text-secondary">
                            {user?.email}
                            {user?.isEmailVerified ? (
                                <FaCheckCircle className="text-success ms-2" />
                            ) : (
                                <FaTimesCircle className="text-danger ms-2" />
                            )}
                        </div>}
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Mobile</h6>
                        </div>
                        {user?.mobile && <div className="col-sm-9 text-secondary">
                            {user?.mobile}
                            {user?.isMobileVerified ? (
                                <FaCheckCircle className="text-success ms-2" />
                            ) : (
                                <FaTimesCircle className="text-danger ms-2" />
                            )}
                        </div>}
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Alternate Mobile</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.alternateMobile}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Gender</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.gender === "1" ? "Male" :user?.gener ==="2"? "Female":''}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Date of Birth</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.dob ? reverseDateOrder(user?.dob): ""}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12">
                            <button
                                className="btn btn-info"
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
