import React from 'react';
import {MdVisibility,MdVisibilityOff} from 'react-icons/md';
import {FaBan,FaCheck} from 'react-icons/fa'
import '../Modal.css'

function AddUserModal({
    pageData,
    basicData,
    setShow,
    submitFunction,
    loadData
    //submitCancel
}) {
    console.log('AddUser')
    console.log(pageData)

    
    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    
    const refId=React.createRef() //ตกลง
    const refUsername=React.createRef() //ตกลง
    const refPassword=React.createRef() //ตกลง
    const refUserLevel=React.createRef() //ตกลง
    const refName=React.createRef() //ตกลง
    const refSurname=React.createRef() //ตกลง

    const [hidePassword,setHidePassword]=React.useState(true)

    let [formInputState,setFormInputState]=React.useState(loadData)
  
    React.useEffect(()=>{

        //console.log('formInputState')
        //console.log(formInputState)

    },[formInputState])

  //==============================
  //==============================
  //==============================
  //==============================


  const genInputRef=(i)=>{
    if(i=="id"){return refId}
    else if(i=="username"){return refUsername}
    else if(i=="password"){return refPassword}
    else if(i=="userLevel"){return refUserLevel}
    else if(i=="name"){return refName}
    else if(i=="surname"){return refSurname}
    else return null
  }


  const goToNextRef=(e,i)=>{
    if(e.key=="Enter"){
        if(i=="id"){refUsername.current.focus()}
        if(i=="username"){refPassword.current.focus()}
        if(i=="password"){refUserLevel.current.focus()}
        if(i=="userLevel"){refName.current.focus()}
        if(i=="name"){refSurname.current.focus()}
        if(i=="surname"){refSubmitForm.current.focus()}
    }
   }

   const changeInputState = (e,i)=>{
        setFormInputState({...formInputState,[i]:e.target.value})
   }

//==============================  
const clearForm=()=>{
    //setFormInputState(blankData)
}

//==============================

const genInputType=(i)=>{
    if(i=="password"){
        if(hidePassword){
            return "password"
        }else {
            return "text"
        }
    }
    else if (i=="id") {
        return "number"
    } 
    else {
        return "text"
    }
}



const renderBody=()=>{
    const objKeys=["id","username","password","userLevel","name","surname",
                    //"branch"
                  ]

    return (objKeys.map((i,idx)=>{
        return (
            <div key={idx}
                 className="w-100 flex-center-center jc-start" 
                 style={{marginBottom:"0.2rem"}}>
                
                <div className="w-30">{pageData.addUser[i]}</div>
                
                
                {i=="userLevel"||i=="branch"
                 ?i=="branch"
                    ?<div className="w-70">
                            {
                            <select
                                ref={genInputRef(i)}
                                onChange={e=>{
                                    const temp=e.target.value.split(".")
                                    //console.log('temp')
                                    //console.log(temp)

                                    //changeInputState(e,i)
                                    setFormInputState({...formInputState,
                                        //"branchId":parseInt(temp[0]),
                                        //"branchName":temp[1]
                                    })
                                }}
                                onKeyDown={e=>{
                                    goToNextRef(e,i)
                                }}
                            >
                            <option value="" hidden>...</option>
                            {/*
                                basicData["branch"].map((i,idx)=>
                                <option key={idx}>{`${i.branchId}.${i.branchName}`}</option>
                                )
                            */}
                            </select>
                            }
                    </div> 
                    :<div className="w-70">
                            <select
                                ref={genInputRef(i)}
                                onChange={e=>{
                                    changeInputState(e,i)
                                }}
                                onKeyDown={e=>{goToNextRef(e,i)}}
                            >
                            <option value="" hidden>...</option>
                            {
                                basicData[i].map((i,idx)=>
                                <option key={idx}>{i}</option>
                                )
                            }
                            </select>
                    </div>
                :<div className="w-70" style={{position:"relative"}}>
                    <input
                        ref={genInputRef(i)}
                        type={genInputType(i)}
                        onChange={e=>{
                            changeInputState(e,i)
                        }}
                        onKeyDown={e=>{goToNextRef(e,i)}}
                        autoComplete={i=='password'?'one-time-code':null}
                        autoFocus={i=="id"?"autoFocus":null}
                    />
                    
                    {
                        i=="password"
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

                }
              
            </div>
        )
    }))
}

//====================
//console.log('ShopChangePassword')
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
                    //    refCancelForm.current.focus()
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
                    <h5>{pageData.addUser.formHead}</h5>
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


AddUserModal.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default AddUserModal;
