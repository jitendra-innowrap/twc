import React, { useState } from 'react';
import { addNewsletter } from '../../util/api';
import { Bounce, toast } from 'react-toastify';
import { validateEmail } from '../../util/util';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmail = (e) => {
    const value = e.target.value;
    setIsEmailValid(true)
    setEmail(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    let isValidEmail = validateEmail(email);
    setIsEmailValid(isValidEmail);
    if (!isValidEmail) {
      return;
    }

    try {
      const res = await addNewsletter(email);
      if (res.code === 1) {
        toast.success('Thank you for subscribing to our newsletter!', {
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
        setEmail('');
      } else {
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
  };

  return (
    <form className="form-subcriber d-flex wow fadeIn animated position-relative" onSubmit={handleSubscribe}>
      <input
        type="text"
        value={email}
        onChange={handleEmail}
        className={`form-control bg-white font-small ${!isEmailValid ? 'is-invalid' : ''}`}
        placeholder="Enter your email"
      />
      <button className="btn text-white" type="submit">
        Subscribe
      </button>
      {!isEmailValid && (<label className="invalid-feedback position-absolute " style={{bottom:"-30px"}}>Please enter a valid email address.</label>)}
    </form>
  );
}