import React from 'react';
import Table from '../../component/table/Table'
import {MdEdit,MdClose,MdCheck} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 

import '../Modal.css'
import BasicData from '../../page/basicdata/BasicData';

function RouteAuth({
    pageData,
    basicData,
    basicDataTableTemplate,
    lb,
    setShow,
    submitFunction,
    //submitCancel
}) {


    const [isSecond,setIsSecond]=React.useState(false)

    React.useEffect(()=>{
        //console.log(`isSecond : ${isSecond}`)
        if(!isSecond){
            setIsSecond(true)
        }
    },[isSecond])
    
    
    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    let [formInputState,setFormInputState]=React.useState(basicData.routeAuth)
    const [tableTemplate,setTableTemplate]=React.useState(basicDataTableTemplate)

    const [editData,setEditData]=React.useState(null)

    const [showEditForm,setShowEditForm]=React.useState(false)

    React.useEffect(()=>{
        //console.log('formInputState')
        //console.log(formInputState)
    },[formInputState])


    //===================================

    const saveRouteAuthTableTemplateAxios =()=>{

    }

    const setTableTemplateFunc=(value)=>{
        //console.log('setTableTemplateFunc')
        //console.log(value)
        setTableTemplate(value)
    }

    const setFormInputStateFunc=(value)=>{
        //console.log('setFormInputStateFunc')
        //console.log(value)
    }

    const setEditDataFunc=(value)=>{
        //console.log(value)
    }

    const addRow=(idx)=>{

        let tempArray=[]

        editData.userLevel.map((i,idx2)=>{
            if(idx2==idx){
                tempArray=[...tempArray,i,""]
            }
            else {
                tempArray=[...tempArray,i]
            }
        })

        setEditData({...editData,userLevel:tempArray})

    }

    const deleteRow=(idx)=>{
        let tempArray=[]

        editData.userLevel.map((i,idx2)=>{
            if(idx2==idx){
              
            }
            else {
                tempArray=[...tempArray,i]
            }
        })
        setEditData({...editData,userLevel:tempArray})
    }

    const changeEditDataState=(e,idx)=>{
        let tempArray=[]

        editData.userLevel.map((i,idx2)=>{
            if(idx2==idx){
                tempArray=[...tempArray,e.target.value]
            }
            else {
                tempArray=[...tempArray,i]
            }
        })
        setEditData({...editData,userLevel:tempArray})

    }

    const updateFormInputState=()=>{

        let tempArray=[]

        formInputState.map((i)=>{
            if(editData._id==i._id){
                console.log('_id')
                tempArray=[...tempArray,editData]
            }
            else {
                tempArray=[...tempArray,i]
            }
        })

        setFormInputState(tempArray)
        setShowEditForm(false)
    }

const renderBody=()=>{
    return (
    <div className="w-100 h-100">
        <div className="h-100" style={{paddingBottom:"2rem"}}>
            {true
                ?<Table
                
                    tableTemplate={tableTemplate}
                    
                    setTableTemplate={setTableTemplateFunc}
                    setFilterData={setFormInputState}
                    filterData={formInputState}
                    editData={editData}
                    setEditData={setEditData}
                    saveTableTemplateFunc={saveRouteAuthTableTemplateAxios}
                    pageData={pageData.tableSettingModal}
                    //isSubTable={true}
                    editIconField={"userLevel"}
                    editIconFieldFunc={()=>setShowEditForm(true)}
                />
                :null
            }
        </div>
    </div>
    )
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
                    if(e.key=="ArrowRight"){
                        refCancelForm.current.focus()
                    }
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
                    if(e.key=="ArrowLeft"){
                        refCancelForm.current.focus()
                    }
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
//================================
const renderEditFormBody=(editData)=>{
    const {id,routeAddress,routeName,userLevel}=editData

    const renderOption=(i,array)=>{

        if(array){
            return array.map((j,idx2)=>
            <option key={idx2} selected={i==j?"selected":""}>{j}</option>
            )
        }
        else {
            return null
        }
    }

    return(
    <div 
        className="w-100 flex-center-start jc-start" 
        style={{margin:"0.2rem 0",
                }}>
        
       
        <div className="w-10">{`${id}.`}</div>
        <div className="w-90">
            {
                userLevel.map((i,idx)=>{
                    return(
                        <div key={idx}
                             className="flex-center-center" 
                             style={{marginBottom:"0.2rem"}}
                        >
                            <div className="w-10">
                                <FaPlusSquare className="sm-icon"
                                    onClick={e=>{addRow(idx)}}
                                />
                            </div>
                            <div className="w-10">
                                {idx>0
                                ?<FaMinusSquare className="sm-icon"
                                    onClick={e=>{deleteRow(idx)}}
                                />
                                :null
                                }
                            </div>
                            <div className="w-80">
                                {idx==0
                                ?<input
                                    value={i}
                                    onChange={e=>{}}
                                    disabled="disabled"
                                />
                                :<select
                                    style={{height:"100%"}}
                                    onChange={e=>{
                                        changeEditDataState(e,idx)
                                        //handleInput(e.target.value,key)
                                    }}
                                >
                                    <option>....</option>
                                    {   
                                        renderOption(i,basicData.userLevel)
                                    }
                                </select>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="w-100" 
             style={{display:"flex",justifyContent:"flex-end"}}>
            <button
                onClick={e=>updateFormInputState(false)}
            >
                <FaCheck/>
            </button>

            <button
                onClick={e=>setShowEditForm(false)}
            >
                <MdClose/>
            </button>
        </div>
    </div>
    )
}


const renderEditForm=()=>{
    if(editData){
        return(
            <div className="" 
                   style={{position:"fixed",top:"0",left:"0",
                           height:"100vh",width:"100vw",opacity:"1",
                           display:"flex",justifyContent:"center",alignItems:"center"
                           
                           }}>
                 <div className="w-50 bgc-darkGray" 
                      style={{padding:"0.3rem",borderRadius:"5px",
                              backgroundColor:"#5b7d72"
                             }}>
                    {renderEditFormBody(editData)}    
                 </div>
            </div>
        )
    }
    else {
        return null
    }

}


return (
    <div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",
                     minHeight:"100px"}}>
            
        
            <div className="Modal-header">
                <div className="flex-center-center">
                    <h5>{pageData.setting.routeAuth}</h5>
                </div>
                {!showEditForm&&
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
        
        {showEditForm
         ?renderEditForm()
         :null
        }
    </div>
  );
}


RouteAuth.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default RouteAuth;
