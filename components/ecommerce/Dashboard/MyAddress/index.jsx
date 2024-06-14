import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
const dummyAddresses = [
    {
      id: "1",
      name: "John Doe",
      mobile: "1234567890",
      addressLine1: "3522 Interstate",
      addressLine2: "75 Business Spur",
      landmark: "Sault Ste. Marie",
      pincode: "49783",
      state: "MI",
      city: "Sault Ste. Marie",
      addressType: "home",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      mobile: "2345678901",
      addressLine1: "123 Main St",
      addressLine2: "Anytown, USA",
      landmark: "Corner of Main and Elm",
      pincode: "12345",
      state: "CA",
      city: "Anytown",
      addressType: "office",
      isDefault: false,
    },
    {
      id: "3",
      name: "Bob Johnson",
      mobile: "3456789012",
      addressLine1: "456 Elm St",
      addressLine2: "Othertown, USA",
      landmark: "Elm and Oak",
      pincode: "67890",
      state: "NY",
      city: "Othertown",
      addressType: "home",
      isDefault: false,
    },
    {
      id: "4",
      name: "Alice Brown",
      mobile: "4567890123",
      addressLine1: "789 Oak St",
      addressLine2: "Thistown, USA",
      landmark: "Oak and Maple",
      pincode: "34567",
      state: "TX",
      city: "Thistown",
      addressType: "office",
      isDefault: false,
    },
    {
      id: "5",
      name: "Charlie Davis",
      mobile: "5678901234",
      addressLine1: "901 Maple St",
      addressLine2: "Thattown, USA",
      landmark: "Maple and Pine",
      pincode: "90123",
      state: "FL",
      city: "Thattown",
      addressType: "home",
      isDefault: false,
    },
  ];
  
export default function index() {
    const [expanded, setExpanded] = useState(0);
    const [addressList, setAddressList] = useState(dummyAddresses);
    const handleSetDefault = (id) => {
        const updatedAddresses = dummyAddresses.map((address) => {
          if (address.id === id) {
            return { ...address, isDefault: true };
          } else {
            return { ...address, isDefault: false };
          }
        });
        setAddressList(updatedAddresses);
      };
      const handleDelete = (id) => {
        const updatedList = addressList.filter((item) => item.id !== id);
        setAddressList(updatedList);
      };
      
    return (
        <div className="row">
            <div className="">
                <div className="card mb-3 mb-lg-0">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            Saved
                            Address
                        </h5>
                        <Popup
                            trigger={
                                <button className="btn btn-sm d-flex align-items-center">
                                    Add New <i className="fi-rs-plus ml-10"></i>
                                </button>} 
                            modal 
                            position="right center"
                            >
                                {
                                    (close)=>(
                                        <AddAddress close={close} addressList={addressList} setAddressList={setAddressList} />
                                    )
                                }
                        </Popup>
                    </div>
                </div>

                    <div className="address_list">
                    {addressList.map((address, id)=>(
                    <div className={`card-body address ${expanded===id && 'expanded'}`} onClick={()=> setExpanded(id)} key={id}>
                        <div className="card-head"><div className="name">{address.name} {address.isDefault&&<span className='default_address_tag'>default</span>}</div><span>Home</span></div>
                        <address>
                            {address.addressLine1}<br />
                            {address.addressLine2 && <>{address.addressLine2}<br /></> }
                            {`${address.city}, ${address.state} - ${address.pincode}`}<br />
                            {address.landmark && <>{address.landmark}<br /></> }
                        </address>
                        {
                            expanded===id && (
                                <div className="bottom">
                                    <div className="address-phone">+91 9090909090</div>
                                        <div className="card-actions">
                                            <div className="">
                                                {!address.isDefault && 
                                                <button href="#" onClick={() => {
                                                    handleSetDefault(address.id);
                                                    }} className="btn-small">Set as default Address</button>}</div>
                                            {<div className="change">
                                                <Popup
                                                    trigger={<button href="#" className="btn-small"><i className='fi-rs-pencil mr-5'></i>Edit</button>} 
                                                    modal 
                                                    position="right center"
                                                    >
                                                        {
                                                            (close)=>(
                                                                <EditAddress addressList={addressList} close={close} setAddressList={setAddressList} currentAddress={address} />
                                                            )
                                                        }
                                                </Popup>
                                                
                                                <button href="#" onClick={() => {
                                                    handleDelete(address.id);
                                                    }} className="btn-small ml-20"><i className='fi-rs-trash mr-5'></i>delete</button>
                                            </div>}
                                        </div>
                                </div>
                            )
                        }
                    </div>  
                    ))}

                    </div>
            </div>
        </div>
    )
}
