import { SettingsSharp } from '@material-ui/icons';
import React from 'react';
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 
import uuid from 'react-uuid'
import '../Modal.css'

function BasicValueSetting2({
    pageData,
    basicValueSetting,
    setShow,
    submitFunction,
    //submitCancel
}) {

    console.log('basicValueSetting2...............')

    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ตกลง


    const genFormInputState=(array)=>{
        let tempArray=[]
        array.map((i,idx)=>{
            let nextBranchId=i.branchId+1
            if(idx==array.length-1){
                tempArray=[...tempArray,{...i,nextBranchId:nextBranchId}]
            }
            else{
                if(nextBranchId<array[idx+1].branchId){
                    tempArray=[...tempArray,{...i,nextBranchId:nextBranchId}]
                }
                else{
                    tempArray=[...tempArray,{...i,nextBranchId:null}]
                }
            }
        })
        return tempArray
    }

    //==========================
    let [formInputState,setFormInputState]=React.useState(genFormInputState(basicValueSetting.array))

    
    const [editData,setEditData]=React.useState({
       _id:null,
       branchId:null,
       branchName:"",
       status:null
    })

    
    React.useEffect(()=>{
       //console.log('editData')
       //console.log(editData)
    },[editData])

    React.useEffect(()=>{
        console.log('formInputState')
        console.log(formInputState)
    },[formInputState])

    //----------------------------------
    const updateFormInputState=(i,editData)=>{
        
        if(editData._id){
            let tempArray=[]
            formInputState.map(j=>{
                if(j._id==editData._id){
                    tempArray=[...tempArray,editData]
                }
                else{
                    tempArray=[...tempArray,j]
                }
            })
            setFormInputState(tempArray)
            setEditData({
                _id:null,
                branchId:null,
                branchName:"",
                status:null
            })
        }
        else{
            setEditData(i)
        }

    }

    const addRow=(i)=>{

        let tempArray=[]

        formInputState.map((j,idx2)=>{
            if(j._id==i._id){
                
                let tempObj={_id:uuid(),
                             branchId:i.nextBranchId,
                             branchName:"",
                             nextBranchId:null}
                
                tempArray=[...tempArray,j,tempObj]
            }
            else {
                tempArray=[...tempArray,j]
            }

        })

        const tempArray2=genFormInputState(tempArray)

        setFormInputState(tempArray2)
 
    }
    //---------------------------------
    
    const deleteRow=(idx)=>{
        let tempArray=[]

        formInputState.map((i,idx2)=>{
            if(idx2!=idx){
                tempArray=[...tempArray,i]
            }
        })

        const tempArray2=genFormInputState(tempArray)
        setFormInputState(tempArray2)
    }

//================================
//================================

const renderBody=()=>{

   return (
    <div 
        className="w-100 flex-center-start jc-start" 
        style={{marginBottom:"0.2rem"}}>
        <div className="w-100">
            {
                formInputState.map((i,idx)=>{
                    return(
                        <div className="flex-center-center" 
                             key={idx}
                             style={{marginBottom:"0.2rem"}}
                        >
                            <div className="w-10">
                                 {!editData._id&&i.nextBranchId
                                 ?<FaPlusSquare className="sm-icon"
                                    onClick={e=>{        
                                       addRow(i)
                                    }}
                                 />
                                 :null
                                 }   
                            </div>
                            <div className="w-10">
                                {idx>0&&!editData._id
                                ?<FaMinusSquare className="sm-icon"
                                    onClick={e=>{
                                       deleteRow(idx)
                                    }}
                                   />
                                :null
                                }
                            </div>
                            <div className="w-80" style={{display:"flex"}}>
                                    <div>{`${i.branchId}.`}</div>
                                    {i._id==editData._id
                                    ?<input
                                        type="text"
                                        value={editData.branchName}
                                        onChange={e=>{
                                            setEditData({...editData,
                                                branchName:e.target.value
                                            })

                                        }}
                                        
                                    />
                                    :<div className="w-100"
                                        onClick={e=>{
                                            updateFormInputState(i,editData)
                                        }}
                                     >
                                    {i.branchName}
                                    </div>
                                    }
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </div>
)}


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
                        submitFunction(formInputState,editData)
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

//=========================

return (
    <div className="Modal-background">

        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"60%",
                    minHeight:"100px",maxWidth:"70%"}}>
            <div className="Modal-header">
                <div>
                    <h5>{basicValueSetting.lb}</h5>
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


BasicValueSetting2.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default BasicValueSetting2;

