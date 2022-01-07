import React from 'react';
import {MdVisibility,MdVisibilityOff} from 'react-icons/md';
import {FaBan,FaCheck} from 'react-icons/fa'
import '../Modal.css'
import ja from 'date-fns/locale/ja';

function EditUserModal({
    pageData,
    basicData,
    setShow,
    submitFunction,
    loadData
    //submitCancel
}) {
    console.log('EditUser')
    console.log(pageData)

    
    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    
    const refId=React.createRef() //ตกลง
    const refUsername=React.createRef() //ตกลง
    const refUserLevel=React.createRef() //ตกลง
    const refName=React.createRef() //ตกลง
    const refSurname=React.createRef() //ตกลง
    const refBranch=React.createRef()


    let [formInputState,setFormInputState]=React.useState(loadData)
  
    React.useEffect(()=>{

        console.log('formInputState')
        console.log(formInputState)

    },[formInputState])

  //==============================
  //==============================
  //==============================
  //==============================


  const genInputRef=(i)=>{
    if(i=="id"){return refId}
    else if(i=="username"){return refUsername}
    else if(i=="userLevel"){return refUserLevel}
    else if(i=="name"){return refName}
    else if(i=="surname"){return refSurname}
    else return null
  }


  const goToNextRef=(e,i)=>{
    if(e.key=="Enter"){
        if(i=="id"){refUsername.current.focus()}
        if(i=="username"){refUserLevel.current.focus()}
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
   if (i=="id") {
        return "number"
    } 
    else {
        return "text"
    }
}



const renderBody=()=>{
    const objKeys=["id","username","userLevel","name","surname",
                    //"branch"
                    ]

    return (objKeys.map((i,idx)=>{
        return (
            <div key={idx}
                 className="w-100 flex-center-center jc-start" 
                 style={{marginBottom:"0.2rem"}}>
                
                <div className="w-30">{pageData.editUser[i]}</div>
                
                
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
                                    "branchId":parseInt(temp[0]),
                                    "branchName":temp[1]
                                })
                            }}
                            onKeyDown={e=>{
                                goToNextRef(e,i)
                            }}
                        >
                        <option value="" hidden>...</option>
                        {
                            basicData["branch"].map((j,idx)=>{
                              
                              const temp=`${j.branchId}.${j.branchName}`
                              return(
                                 <option key={idx}
                                    selected={
                                       (formInputState["branchId"]+"."+formInputState["branchName"])==temp
                                       ?"selected"
                                       :""
                                    }
                                 >
                                  {temp}
                                </option>
                              )
                            }
                            )
                        }
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
                            basicData[i].map((j,idx)=>
                            <option key={idx}
                              selected={formInputState[i]==j?"selected":""}
                            >{j}</option>
                            )
                        }
                        </select>
                </div>
                :<div className="w-70" style={{position:"relative"}}>
                    <input
                        ref={genInputRef(i)}
                        type={genInputType(i)}
                        value={formInputState[i]}
                        onChange={e=>{
                            changeInputState(e,i)
                        }}
                        onKeyDown={e=>{goToNextRef(e,i)}}
                        autoFocus={i=="id"?"autoFocus":null}
                    />
                    
                 
                </div>

                }
              
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
                    <h5>{pageData.editUser.formHead}</h5>
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


EditUserModal.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default EditUserModal;
