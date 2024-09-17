import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { getProfileDetails } from '../../../../util/api';
import storage from '../../../../util/localStorage';
import { reverseDateOrder } from '../../../../util/util';

export default function ProfileDetails({ user, setEdit, setUser }) {
    const auth_token = storage.get("auth_token");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(auth_token){
            fetchProfileDetails();
        }
    }, [setEdit])
    

    const fetchProfileDetails = async()=>{
        try {
            setIsLoading(true)
            const response = await getProfileDetails(auth_token || "");
            if(response.code === 1){
                let tempUser = response.result?.[0];
                setUser({
                    fullname: tempUser?.f_name,
                mobile: tempUser?.mobile,
                email: tempUser?.email,
                gender: tempUser?.gender,
                dob: tempUser?.dob,
                alternateMobile: tempUser?.alternate_mobile,
                isMobileVerified: tempUser?.is_mobile_verified,
                isEmailVerified: tempUser?.is_email_verified,
                })
            }else{
                console.error(response?.msg)
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    return (
        <div className="profile-details">
            {isLoading ?
            <div className="loading-view" style={{height:'calc( 100vh - 423px)'}}>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            :<div className="mb-3">
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="mb-0 text-dark fw-bold">Full Name</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.fullname}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="mb-0 text-dark fw-bold">Email</label>
                        </div>
                        {user?.email && <div className="col-sm-9 text-secondary">
                            {user?.email}
                            {user?.isEmailVerified =='1' ? (
                                <FaCheckCircle className="text-success ms-2" />
                            ) : (
                                <FaTimesCircle className="text-danger ms-2" />
                            )}
                        </div>}
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="mb-0 text-dark fw-bold">Mobile</label>
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
                            <label className="mb-0 text-dark fw-bold">Alternate Mobile</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.alternateMobile}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="mb-0 text-dark fw-bold">Gender</label>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.gender == "1" ? "Male" :user?.gender =="2"? "Female":user?.gender =="3"? "Other":''}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="mb-0 text-dark fw-bold">Date of Birth</label>
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
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
