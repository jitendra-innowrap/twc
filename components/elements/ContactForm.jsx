import React, { useState } from 'react';
import { addContactUs } from '../../util/api';
import { validateEmail } from '../../util/util';
import { Bounce, toast } from 'react-toastify';

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [formError, setFormError] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setFormError({
            ...formError,
            [e.target.name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Initialize an object to hold form errors
        let errors = {};
    
        // Validate email
        let isValidEmail = validateEmail(formData.email);
        if (!isValidEmail) {
            errors.email = "Please Enter A Valid Email.";
        }
    
        // Validate other fields
        if (!formData.name) {
            errors.name = "Please Enter Your Name.";
        }
    
        if (!formData.phone) {
            errors.phone = "Please Enter Your Phone Number.";
        }
    
        if (!formData.subject) {
            errors.subject = "Please Enter a Subject.";
        }
    
        if (!formData.message) {
            errors.message = "Please Enter a Message.";
        }
    
        // If there are any errors, update the form error state and return early
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }
    
        const { name, email, phone: mobile, subject, message } = formData;
    
        try {
            setIsLoading(true);
            const res = await addContactUs({ email, name, mobile, subject, message });
            if (res?.code === 1) {
                toast.success('Thank you for Contacting Us!', {
                    position: 'bottom-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                // Clear the form data after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });
            } else {
                toast.error('An error occurred. Please try again later.', {
                    position: 'bottom-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error('An error occurred while subscribing. Please try again later.', {
                position: 'bottom-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        }
        setIsLoading(false);
    };
    

    return (
        <form
            className="contact-form-style text-center"
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="input-style mb-20 form-group">
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            className='form-control'
                        />
                        <p className="errorContainer text-start">{formError.name}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="input-style mb-20 form-group">
                        <input
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="text"
                            className='form-control'
                        />
                        <p className="errorContainer text-start">{formError.email}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="input-style mb-20 form-group">
                        <input
                            name="phone"
                            maxLength={10}
                            placeholder="Your Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="text"
                            className='form-control'
                        />
                        <p className="errorContainer text-start">{formError.phone}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="input-style mb-20 form-group">
                        <input
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            type="text"
                            className='form-control'
                        />
                        <p className="errorContainer text-start">{formError.subject}</p>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12">
                    <div className="textarea-style mb-30 form-group">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className=''
                        ></textarea>
                        <p className="errorContainer text-start">{formError.message}</p>
                    </div>
                    <button
                        className="btn"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading?'Sending...':'Send message'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
