import React from 'react';
import axios from 'axios';
import ctUtil from '../../util/ctUtil'
import uuid from 'react-uuid'
import {MdEdit} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 

import '../Modal.css'
import tableTemplate from '../../component/table/tableTemplate';


const {createTableTemplateForPage,convertTableTemplateObjToArray,
    convertFormTemplateArrayToObj,genLanguageObjFromFormTemplate,
    changeLanguageTableTemplate
  }=ctUtil

function Language({
    pageData,
    pageDataStandard,
    basicData,
    lb,
    setShow,
    submitFunction,
    submitFunction2,
    myheader,
    languageObj,
    addLanguage,
    deleteLanguage
    //submitCancel
}) {


    const genFilterData=(obj)=>{
        const objectKey=Object.keys(obj)
        
        let tempArray=[]
        let tempIdArray=[]
    
        objectKey.map(i=>{
            tempIdArray=[...tempIdArray,parseInt(obj[i]["thisId"])]
            
            let tempTemplateArray=[]
            Object.keys(obj[i]).map(k=>{
                if(k!="thisId"){
                    const tempTemplateObj={key:k,lb:obj[i][k]}
                    tempTemplateArray=[...tempTemplateArray,tempTemplateObj]
                }
            })

            const tempObj={
                id:parseInt(obj[i]["thisId"]),
                formLanguage:i,
                template:obj[i]//tempTemplateArray
            }
            tempArray=[...tempArray,tempObj]

        })
        const tempIdArray2=tempIdArray.sort()
        let tempFilterData=[]

        tempIdArray2.map(i=>{
            tempArray.map(j=>{
                if(i==j.id){
                    tempFilterData=[...tempFilterData,j]
                }
            })
        })


       return tempFilterData
    }


    const getRefArray=(array)=>{
        let tempRefArray=[]

        array.map(k=>{
            tempRefArray=[...tempRefArray,React.createRef()]
        })

        return tempRefArray
    }


    const refSubmitForm=React.createRef() //ตกลง
    const refCancelForm=React.createRef() //ยกเลิก    
    
    let [filterData,setFilterData]=React.useState(genFilterData(languageObj))
    
    let [refOfInputState,setRefOfInputState]=React.useState(getRefArray(filterData))

    const [editData,setEditData]=React.useState(null)
    const [arrayOfChange,setArrayOfChange]=React.useState([])

    const [editField,setEditField]=React.useState({
        key:null,
        lb:""
    })

    React.useEffect(()=>{
        //console.log('filterData')
        //console.log(filterData)
    },[filterData])

    React.useEffect(()=>{
        //console.log('editField')
       //console.log(editField)
    },[editField])

    
const changeInputState=(e,idx)=>{
    let changeId=null

    let tempArray=[]
    filterData.map((j,idx2)=>{
        if(idx==idx2){
            const tempObj={...j,formLanguage:e.target.value}
            tempArray=[...tempArray,tempObj]
            changeId=j.id
        }
        else{
            tempArray=[...tempArray,j]
        }
    })

    const tempArrayOfChange=[...arrayOfChange,changeId]
    setArrayOfChange([...new Set(tempArrayOfChange)])
    setFilterData(tempArray)
}
//=======================
const renderFooter=()=>{
    return(
    <div style={{display:"flex",
                 position:"fixed",
                 bottom:"1rem",right:"2rem",zIndex:"100"}}
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
                       //submitFunction(filterData,arrayOfChange)
                       submitFunction2(editData)
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
                        //refCancelForm.current.focus()
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
//=======================

const renderEditLanguage=()=>{

const tempKey=Object.keys(filterData[0].template)

return tempKey.map((i,idx)=>{
    if(i!="thisId"){
    return (
    <div key={idx}
        className="w-80" 
        style={{marginBottom:"0.2rem"}}>
            
            <div key={idx}
                className="w-100 flex-center-center jc-start" 
                style={{marginBottom:"0.2rem"}}>
                <div className="w-30">
                    {
                    filterData[0].template[i]
                    }
                
                </div>
           
                {editField.key==i
                
                ?<div className="w-70" 
                      style={{position:"relative",display:"flex"}}>
                    <input
                        type="text"
                        value={editField.lb}
                        
                        onKeyDown={e=>{
                            if(e.key=="Enter"){
                                refSubmitForm.current.focus()
                            }
                        }}

                        onChange={e=>{
                            setEditField({
                                key:editField.key,
                                lb:e.target.value
                            })
                        }}
                        onBlur={e=>{

                            setEditData({
                                ...editData,
                                template:{...editData.template,
                                    [editField.key]:editField.lb
                                }
                            })
                        }}
                    />
                </div>
                :<div   className="w-70" 
                        style={{position:"relative",display:"flex"}}
                        onClick={e=>{
                            setEditField({key:i,lb:editData.template[i]})
                        }}
                    >
                    <div>
                        {
                            editData.template[i]
                        }  
                    </div>
                
                </div>
                }
            
            </div>
           
    </div>
    )    
    }
    
})

}

//=====================
const renderBody=()=>{    

    return (
    <div 
         className="w-100 flex-center-start jc-start" 
         style={{marginBottom:"0.2rem"}}>
        
         <div className="w-100">
             {
                 filterData.map((i,idx)=>{
                     return(
                         <div className="flex-center-center" 
                              style={{marginBottom:"0.2rem"}}
                               key={idx}>
                             {idx>0
                             ?<div className="w-10">   
                                <FaMinusSquare className="sm-icon"
                                    onClick={e=>{
                                       deleteLanguage(i.id)
                                    }}
                                />
                            </div> 
                            :<div className="w-10">
                                 <FaPlusSquare className="sm-icon"
                                     onClick={e=>{
                                        addLanguage(filterData)
                                     }}
                                 />
                             </div>
                            
                             }
                             <div className="w-70">
                                 <input
                                     type="text"
                                     value={i.formLanguage}
                                     ref={refOfInputState[idx]}
                                     onKeyDown={e=>{
                                        if(e.key=="Enter"){
                                            if(idx==filterData.length-1){
                                                refSubmitForm.current.focus()
                                            }
                                            else{
                                                refOfInputState[idx+1].current.focus()
                                            }
                                            //refCancelForm.current.focus()
                                        }
                                    }}

                                     onChange={e=>{
                                        changeInputState(e,idx)
                                     }}
                                 />
                             </div>
                             <div className="w-10">
                                 <MdEdit className="sm-icon"
                                    onClick={e=>{                                       
                                        setEditData(i)
                                    }}
                                 />
                             </div>
                         </div>
                     )
                 })
             }
         </div>
         
        <div style={{display:"flex",width:"100%",marginTop:"2rem"}}
        >
        <div className="xc9"/>
        <div className="xc3" style={{display:"flex"}}>
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
                        submitFunction(filterData,arrayOfChange)
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
                            //refCancelForm.current.focus()
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

    </div>   


      </div>
    )
 }
 

//======================
//=======================
return (
    <div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
            <div className="Modal-header">
                <div className="flex-center-center">
                    <h5>{pageData.setting.language}</h5>
                    
                </div>
              
            </div>
            <div className="Modal-body" >
                <div className="ModalInsideBody">
                    {editData
                     ?null
                     :renderBody()
                    }
                </div>
            </div>
            {
             editData&&
             renderEditLanguage()   
            }
            {
             editData&&
             renderFooter()
            }
        </div>        
    </div>
  );
}


Language.defaultProps={
    lb:"Form",
    setShow:()=>{},
    submitFunction:null,
    //submitCancel:null
}


export default Language;

/*

  {renderBody(pageDataStandard.shopInfo,"shopInfo")}
                {renderBody(pageDataStandard.setting,"setting")}
                {renderBody(pageDataStandard.basicValue,"basicValue")}

*/