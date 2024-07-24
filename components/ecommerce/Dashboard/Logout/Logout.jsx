import React from 'react'

export default function Logout({handleLogout, close}) {
  return (
    <div className='logout_wrap'>
        <h2>Do you Really want to log out?</h2>
        <div className="actions_btns">
          <button className="btn flex-1" onClick={handleLogout}>Yes, Log out!</button>
          <button className="btn flex-1 border-btn" onClick={close}>Cancel</button>
        </div>
    </div>
  )
}
