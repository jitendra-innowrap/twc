import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import { deleteAddress, editAddress, getAddressList } from '../../../../util/api';
import Lottie from "lottie-web";
import success from "../../../../public/assets/Lottie/no-orders.json"
import Link from 'next/link';
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
    const [addressList, setAddressList] = useState([]);
    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: success,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);
    useEffect(() => {
      fetchAddressList();
    }, [])
    
    const fetchAddressList = async () =>{
        try {
            const res = await getAddressList();
            setAddressList(res?.result)
        } catch (error) {
            
        }
    }
    const handleSetDefault = async (address) => {
        const updatedAddresses = address;
        updatedAddresses.is_default = 1;
        updatedAddresses.address_id = address.id
        try {
            const res = await editAddress(updatedAddresses);
            fetchAddressList();
        } catch (error) {
            console.log(error)
        }
    };
    const handleDelete = async (id) => {
        try {
            const res = await deleteAddress(id);
            fetchAddressList();
        } catch (error) {
            console.log(error)
            
        }
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
                            lockScroll 
                            position="right center"
                            >
                                {
                                    (close)=>(
                                        <AddAddress close={close} addressList={addressList} fetchAddressList={fetchAddressList} setAddressList={setAddressList} />
                                    )
                                }
                        </Popup>
                    </div>
                </div>
                {
                    !addressList?.length>0?
                    (
                        <div className="order-sucess-container mb-20" style={{boxShadow:'none'}}>
                            <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
                            <h1 className="mb-20">No Saved Address!</h1>
                            <p className="mb-20">Click On Add New Button to Add.</p>
                            
                        </div>
                    ):
                    <div className="address_list">
                        {addressList?.map((address, id)=>(
                            <div className={`card-body address ${expanded===id && 'expanded'}`} onClick={()=> {setExpanded(id); console.log(address)}} key={address?.id}>
                                <div className="card-head"><div className="name">{address.name} {address.is_default == 1&&<span className='default_address_tag'>Default</span>}</div><span>{address?.address_type==1?'Office':'Home'}</span></div>
                                <address>
                                    {address.address_line_1}<br />
                                    {address.address_line_2 && <>{address.address_line_2}<br /></> }
                                    {`${address.city}, ${address.state_name} - ${address.pincode}`}<br />
                                    {address.landmark && <>{address.landmark}<br /></> }
                                </address>
                                {
                                    expanded===id && (
                                        <div className="bottom">
                                            <div className="address-phone">+91 {address.mobile}</div>
                                                <div className="card-actions">
                                                    <div className="">
                                                        {address.is_default == 0 && 
                                                        <button href="#" onClick={() => {
                                                            handleSetDefault(address);
                                                            }} className="btn-small">Set as default Address</button>}</div>
                                                    {<div className="change">
                                                        <Popup
                                                            trigger={<button href="#" className="btn-small"><i className='fi-rs-pencil mr-5'></i>Update</button>} 
                                                            modal
                                                            lockScroll
                                                            position="right center"
                                                            >
                                                                {
                                                                    (close)=>(
                                                                        <EditAddress addressList={addressList} close={close} fetchAddressList={fetchAddressList} setAddressList={setAddressList} currentAddress={address} />
                                                                    )
                                                                }
                                                        </Popup>
                                                        
                                                        <button href="#" onClick={() => {
                                                            handleDelete(address.id);
                                                            }} className="btn-small ml-20"><i className='fi-rs-trash mr-5'></i>Delete</button>
                                                    </div>}
                                                </div>
                                        </div>
                                    )
                                }
                            </div>  
                        ))}

                    </div>
                }
            </div>
        </div>
    )
}
