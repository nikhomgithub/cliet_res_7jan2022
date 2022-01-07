import { SettingsSharp } from '@material-ui/icons';
import React from 'react';
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 

import '../Modal.css'

function BasicValueSetting({
    pageData,
    basicValueSetting,
    setShow,
    submitFunction,
    //submitCancel
}) {

    console.log('basicValueSetting')

    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ตกลง

    const checkArrayEmpty=(array)=>{
        if(array.length==0){
            return [""]
        }
        else {
            return array
        }
    }


    const getRefArray=(array)=>{
        let tempRefArray=[]

        array.map(k=>{
            tempRefArray=[...tempRefArray,React.createRef()]
        })

        return tempRefArray
    }

    let [formInputState,setFormInputState]=React.useState(checkArrayEmpty(basicValueSetting.array))

    let [refOfInputState,setRefOfInputState]=React.useState(getRefArray(formInputState))

    React.useEffect(()=>{
        //console.log('formInputState')
        //console.log(formInputState)
    },[formInputState])

    const changeInputState=(e,idx)=>{

        let tempArray=[]

        formInputState.map((i,idx2)=>{
            if(idx2==idx){
                tempArray=[...tempArray,e.target.value]
            }
            else {
                tempArray=[...tempArray,i]
            }
        })
        setFormInputState(tempArray)
    }
    
    const addRow=(idx)=>{

        let tempArray=[]

        formInputState.map((i,idx2)=>{
            if(idx2==idx){
                tempArray=[...tempArray,i,""]
            }
            else {
                tempArray=[...tempArray,i]
            }
        })

        setRefOfInputState(getRefArray(tempArray))
        setFormInputState(tempArray)
    }

    const deleteRow=(idx)=>{
        let tempArray=[]

        formInputState.map((i,idx2)=>{
            if(idx2==idx){
              
            }
            else {
                tempArray=[...tempArray,i]
            }
        })
        setRefOfInputState(getRefArray(tempArray))
        setFormInputState(tempArray)
    }

    React.useEffect(()=>{

        //console.log('formInputState')
        //console.log(formInputState)

    },[formInputState])

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
                                <FaPlusSquare className="sm-icon"
                                    onClick={e=>{
                                        addRow(idx)
                                    }}
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
                                <input
                                    type="text"
                                    ref={refOfInputState[idx]}
                                    value={i}
                                 
                                    onKeyDown={e=>{
                                        if(e.key=="Enter"){
                                            if(idx==formInputState.length-1){
                                                refSubmitForm.current.focus()
                                            }
                                            else{
                                                refOfInputState[idx+1].current.focus()
                                            }
                                        }
                                    }}


                                    onChange={e=>{changeInputState(e,idx)}}
                                    disabled={(idx==0&&i=="admin")?"disabled":""}
                                />
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
                        console.log(basicValueSetting)
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

return (
    <div className="Modal-background">

        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"60%",
                    minHeight:"100px",maxWidth:"70%"}}>
            <div className="Modal-header">
                <div>
                    <h5>{basicValueSetting.lb}</h5>
                </div>
                {renderFooter()}
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


BasicValueSetting.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default BasicValueSetting;

