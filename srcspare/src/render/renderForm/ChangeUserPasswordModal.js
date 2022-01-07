import React from 'react';
import {MdVisibility,MdVisibilityOff} from 'react-icons/md';
import {FaBan,FaCheck} from 'react-icons/fa'
import '../Modal.css'

function ChangeUserPasswordModal({
    pageData,
    basicData,
    setShow,
    submitFunction,
    loadData
    //submitCancel
}) {
    console.log('ChangeUserPasswordModal')
    
    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    const refId=React.createRef() //ตกลง
    const refPassword=React.createRef() //ตกลง

    let [formInputState,setFormInputState]=React.useState(loadData)
    const [hidePassword,setHidePassword]=React.useState(true)


    React.useEffect(()=>{

        //console.log('formInputState')
        //console.log(formInputState)

    },[formInputState])

  //==============================
  //==============================
  //==============================
  //==============================


   const changeInputState = (e,i)=>{
        setFormInputState({...formInputState,[i]:e.target.value})
   }

//==============================  

const renderBody=()=>{
    const objKeys=["id","newPassword1"]

    return (objKeys.map((i,idx)=>{
        return (
            <div key={idx}
                 className="w-100 flex-center-center jc-start" 
                 style={{marginBottom:"0.2rem"}}>
                
                <div className="w-30">{pageData.changeUserPassword[i]}</div>
                
                
                <div className="w-70" style={{position:"relative"}}>
                     {i=="id"
                     ?<input
                        ref={refId}
                        type={"number"}
                        value={formInputState[i]}
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                refPassword.current.focus()
                            }
                        }}
                        disabled={"disabled"}
                     />
                     : <input
                           
                           ref={refPassword}
                           type={hidePassword?"password":"text"}
                           value={formInputState["password"]}
                           onKeyDown={e=>{
                                if(e.key=="Enter"){
                                    refSubmitForm.current.focus()
                                }
                            }}
                           onChange={e=>{
                              changeInputState(e,"password")
                           }}
                           autoComplete='one-time-code'
                           autoFocus={"autoFocus"}
                        />
                     }
                 

                     {
                        i=="newPassword1"
                        ? hidePassword
                            ?<MdVisibilityOff 
                                className="sm-icon" 
                                style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                                onClick={e=>{
                                    setHidePassword(!hidePassword)
                                }}
                            />
                            :<MdVisibility 
                                className="sm-icon" 
                                style={{position:'absolute',top:"0.2rem",right:'0.3rem'}}
                                onClick={e=>{
                                    setHidePassword(!hidePassword)
                                }}
                            />
                        :null
                    }

                </div>
           
            </div>
        )
    }))
}

//====================
//====================

const renderFooter=()=>{
    return(
    <div style={{display:"flex",position:"fixed",bottom:"1rem",right:"2rem",zIndex:"100"}}
    >
        <div>
            <button
                ref={refSubmitForm}
                onKeyDown={e=>{
                    //if(e.key=="ArrowRight"){
                        //refCancelForm.current.focus()
                    //}
                }}
                onClick={e=>{
                    if(submitFunction){
                        submitFunction(formInputState)
                    }
                }}
            >
                <FaCheck/>
            </button>
        </div>
        
        <div>
            <button
                ref={refCancelForm}
                onKeyDown={e=>{
                    //if(e.key=="ArrowLeft"){
                    //    refCancelForm.current.focus()
                    //}
                }}
                onClick={e=>{
                    setShow(false)
                }}
            >
                <FaBan/>
            </button>
        </div>

    </div>
    )
}


//=========================
return (
    <div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
            <div className="Modal-header">
                <div>
                    <h5>{pageData.changeUserPassword.formHead}</h5>
                </div>
                {
                  renderFooter()
                }
            </div>
            <div className="Modal-body" >
                <div className="ModalInsideBody">
                {
                  renderBody()
                }
                </div>
            </div>
        
        </div>
    </div>
  );
}


ChangeUserPasswordModal.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default ChangeUserPasswordModal;
