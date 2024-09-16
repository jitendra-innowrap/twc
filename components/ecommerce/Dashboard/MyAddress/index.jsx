import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import { deleteAddress, editAddress, getAddressList } from '../../../../util/api';
import EmptyBookAnimation from '../EmptyBookAnimation';

  
export default function index() {
    const [expanded, setExpanded] = useState(0);
    const [addressList, setAddressList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    
    useEffect(() => {
      fetchAddressList();
    }, [])
    
    const fetchAddressList = async () =>{
        try {
            try {
                const res = await getAddressList();
                if(res?.code==1){
                    setAddressList(res?.result)
                }else{
                    setAddressList([])
                    console.error('Error:', res?.msg)
                }
                setisLoading(false);
            } catch (error) {
                setisLoading(false);
                console.error(error)
            }
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
            console.error(error)
        }
    };
    const handleDelete = async (id) => {
        try {
            const res = await deleteAddress(id);
            fetchAddressList();
        } catch (error) {
            console.error(error)
            
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
                    isLoading?
                    <div className="loading-view" style={{height:'calc( 100vh - 423px)'}}>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    <>
                    {
                    !addressList?.length>0?
                    (
                        <div className="order-sucess-container mb-20" style={{boxShadow:'none'}}>
                            <EmptyBookAnimation />
                            <h1 className="mb-20">No Saved Address!</h1>
                            <p className="mb-20">Click On Add New Button to Add.</p>
                        </div>
                    ):
                    <div className="address_list">
                        {addressList?.map((address, id)=>(
                            <div className={`card-body address ${expanded===id && 'expanded'}`} onClick={()=> {setExpanded(id)}} key={address?.id}>
                                <div className="card-head"><div className="name">{address.name} {address.is_default == 1&&<span className='default_address_tag'>Default</span>}</div><span>{address?.address_type==1?'Home':'Office'}</span></div>
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
                    </>
                }
            </div>
        </div>
    )
}
