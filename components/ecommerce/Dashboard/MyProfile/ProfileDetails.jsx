import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function ProfileDetails({ user, setEdit }) {
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
                        <div className="col-sm-9 text-secondary">
                            {user?.email}
                            {user?.isEmailVerified ? (
                                <FaCheckCircle className="text-success ms-2" />
                            ) : (
                                <FaTimesCircle className="text-danger ms-2" />
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Mobile</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.mobile}
                            {user?.isMobileVerified ? (
                                <FaCheckCircle className="text-success ms-2" />
                            ) : (
                                <FaTimesCircle className="text-danger ms-2" />
                            )}
                        </div>
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
                            {user?.gender === "1" ? "Male" : "Female"}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Date of Birth</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {user?.dob?.toLocaleDateString()}
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
