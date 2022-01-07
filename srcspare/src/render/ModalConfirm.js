import React from 'react';
import axiosUtil from '../util/axiosUtil'
import renderModalError from './RenderModalError.bak'
import {FaCheck,FaBan,FaQuestion,FaDatabase,FaLongArrowAltRight} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

const {submitFunc}=axiosUtil  

function ModalConfirm({
    setShow,
    submitFunction
    }){


    const refModalConfirm1 = React.createRef()
    const refModalConfirm2 = React.createRef() 

    const [showModalError,setShowModalError]=React.useState(false)
    //const {id,parentId,allDeleteId,routeAuth,detail}=editData
//===============================
//===============================
    return(

    <div className="Modal-background">
        <div className="Modal-box">
            <div className="Modal-header">
                <div>
                    <FaDatabase style={{fontSize:"1.5rem",marginRight:"0.3rem"}}/>
                    <FaLongArrowAltRight style={{fontSize:"1.2rem"}}/>
                    <FaLongArrowAltRight style={{fontSize:"1.2rem"}}/>

                    <MdDelete style={{fontSize:"2rem"}}/>
                </div>
            </div>
          
            <div className="Modal-footer">
                <div>
                    <button
                        ref={refModalConfirm1}
                        onClick={e=>{
                            submitFunction()
                        }}
                        onKeyDown={e=>{
                            if(e.key=="ArrowRight"){
                                refModalConfirm2.current.focus()
                            }
                        }}
                    >
                        <FaCheck/>
                    </button>
                </div>
                <div>
                    <button
                        ref={refModalConfirm2}
                        onKeyDown={e=>{
                            if(e.key=="ArrowLeft"){
                                refModalConfirm1.current.focus()
                            }
                        }}
                        onClick={e=>{
                            if(setShow){setShow(false)}
                        }}
                    >
                        <FaBan/>
                    </button>
                </div>

            </div>
            {
              showModalError
              ?renderModalError({show:showModalError,setShow:setShowModalError})
              :null
            }
        </div>
    </div>
    )
}

ModalConfirm.defaultProps={
    setShow:()=>{},
    submitFunction:()=>{}
}


export default ModalConfirm
