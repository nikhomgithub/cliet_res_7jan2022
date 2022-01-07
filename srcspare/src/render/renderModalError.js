import React from 'react';
import stateUtil from '../util/stateUtil'
import {MdErrorOutline} from 'react-icons/md'
import {FaBan} from 'react-icons/fa'

import './Modal.css'

const renderModalError=({show,setShow,message,setMessage})=>{
    console.log('renderModalError')
   // console.log(message)
return(
    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <MdErrorOutline style={{fontSize:"2.5rem",color:"red"}}/>
                </div>
            </div>
            <div className="Modal-body">
                <div className ="flex-center-center">
                    {/*<p>Unsuccessfull Request</p>*/}
                    {
                    message?<div>{message}</div>:null
                    }
                </div>
            </div>
            <div className="Modal-footer">
                <div>
                    <button
                        onClick={e=>{
                            setShow(false)
                            //if(setMessage){setMessage(null)}
                        }}
                    >
                        <FaBan/>
                    </button>
                </div>
            </div>

        </div>
    </div>
    
)}



export default renderModalError
               