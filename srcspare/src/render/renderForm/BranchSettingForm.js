import React from 'react';
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 
import {MdCheckBox,MdCheckBoxOutlineBlank} from 'react-icons/md';
import uuid from 'react-uuid'

function BranchSettingForm(props) {

const {confirmFunc,setShow,pageData,basicData}=props

console.log('BranchSettingForm')
//console.log(basicData)

const refSubmitForm=React.createRef() //ตกลง
const refCancelForm=React.createRef() //ยกเลิก    

const [inputData,setInputDataData]=React.useState({
   languageSetting:basicData.languageSetting,
   printPageSetting:basicData.printPageSetting,
   widthLeft:basicData.widthLeft,
   thisBranch:basicData.thisBranch
})

const gendTable=(array)=>{
   let tempArray=[]
   array.map(i=>{
      tempArray=[...tempArray,{...i,_idx:uuid()}]
   })
   return tempArray
}

const [table,setTable]=React.useState(
   gendTable(basicData.table)
)

const [editData,setEditData]=React.useState({
   _idx:null,
   tableName:null,
   tableActive:false
})

const deleteTable=(i)=>{
   let tempArray=[]
   table.map(j=>{
      if(j._idx!=i._idx){
         tempArray=[...tempArray,j]
      }
   })
   setTable(tempArray)
}

const addTable=(i)=>{

   //console.log(i)
   //console.log(table)
   
   let tempArray=[]
   table.map(j=>{
      if(j._idx==i._idx){
         const tempObj={_idx:uuid(),
                        tableName:"",
                        tableActive:true
                     }
         tempArray=[...tempArray,j,tempObj]
      }
      else{
         tempArray=[...tempArray,j]
      }
   })
   //console.log(tempArray)

   setTable(tempArray)
   
}

const handleChange=(e,i)=>{
   setInputDataData({...inputData,[i]:e.target.value})
}
//================================
const renderFooter=()=>{
   return(
   <div style={{display:"flex",
                  position:"fixed",
                  bottom:"1rem",right:"2rem",zIndex:"100"}}
   >
         <div>
            <button
                ref={refSubmitForm}
                onClick={e=>{
                     if(confirmFunc){
                        confirmFunc({...inputData,table:table})
                     }
               }}
            >
               <FaCheck/>
            </button>
         </div>
         
         <div>
            <button
                  ref={refCancelForm}
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
//=====================================
const renderInput=(i)=>{
   
   const tempObj={
      languageSetting:"listOfLanguage",
      printPageSetting:"listOfPrintPage",
      thisBranch:"branch"
   }

   if(i=="languageSetting"||i=="printPageSetting"){
        return(
         <select
            onChange={e=>handleChange(e,i)}
         >
            {basicData[tempObj[i]].map((j,idx2)=>(
               <option key={idx2}
                  selected={inputData[i]==j?"selected":""}
               >{j}</option>
            ))}
         </select>
        )
   }
   else if(i=="thisBranch"){
      return(
      <div>
         {inputData[i]}
      </div>
      )
   }
   else {
      return(
         <input
            type={"number"}
            value={inputData[i]}
            onChange={e=>handleChange(e,i)}
         />
      )
   }
}

//---------------------------
const renderTable=()=>{
return table.map((i,idx)=>{
      return (//editData._idx==i._idx
         <div className="flex-center-center jc-start" key={idx}
            style={{margin:"0.5rem 0"}}
         >
               <FaPlusSquare className="sm-icon"
                                 onClick={e=>{
                                    addTable(i)
                                 }}
               />
               
               <FaMinusSquare className="sm-icon"
                  style={{opacity:idx>0?"1":"0"}}
                  onClick={e=>{
                     deleteTable(i)
                  }}
               />
                
               {
                  i.tableActive
                  ?<MdCheckBox className="md-icon"
                     onClick={e=>{
                        let tempArray=[]

                        table.map(j=>{
                           if(j._idx==i._idx){
                              tempArray=[...tempArray,{...j,tableActive:false}]
                              setEditData({...j,tableActive:false})
                           }
                           else{
                              tempArray=[...tempArray,j]
                           }
                        })
                        setTable(tempArray)
                     }}
                  />
                  :<MdCheckBoxOutlineBlank className="md-icon"
                     onClick={e=>{
                        let tempArray=[]
                        table.map(j=>{
                           if(j._idx==i._idx){
                              tempArray=[...tempArray,{...j,tableActive:true}]
                              setEditData({...j,tableActive:true})
                           }
                           else{
                              tempArray=[...tempArray,j]
                           }
                        })
                        setTable(tempArray)
                     }}
                  />
               }
               {
               editData._idx==i._idx
               ?<input className="h-100 w-50"
                     value={editData.tableName}

                     onKeyDown={e=>{
                        if(e.key=="Enter"){
                           refSubmitForm.current.focus()
                           //refPassword.current.focus()
                       }

                     }}
                     onChange={e=>{
                        setEditData({
                           ...editData,tableName:e.target.value
                        })
                     }}
                     onBlur={e=>{
                        let tempArray=[]
                        table.map(i=>{
                           
                           if(editData._idx==i._idx){
                              tempArray=[...tempArray,editData]
                           }
                           else{
                              tempArray=[...tempArray,i]
                           }
                        })
                        setTable(tempArray)
                     }}
                  />
               :<div className=""
                  onClick={e=>{
                     setEditData(i)
                  }}   
               >
               
                  {i.tableName}
               </div>
               }
         </div>
      
      )
   })    
}

//=====================================
const renderBody=()=>{
   const temp=["thisBranch","languageSetting","printPageSetting","widthLeft","table"]

   return (temp.map((i,idx)=>{
       return i!="table"
           ?<div key={idx} 
               className="w-100 flex-center-center jc-start" 
               style={{marginBottom:"0.2rem"}}>
             
               <div className="w-50"
                 
               >{pageData.branchSettingPage[i]}</div>
               
               
               <div className="w-50">
                  {
                    renderInput(i)
                  }
               </div>

           </div>
         :null
   }))
}


//=====================================
return(
<div className="Modal-background">
        <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"100px"}}>
            <div className="Modal-header">
                <div>
                    <h5>{pageData.branchSettingPage.formHead}</h5>
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
                <div>
                  {pageData.branchSettingPage["table"]}
                </div>
                {
                    renderTable() 
                }
                </div>
            </div>
           

           
         
        </div>
</div>

)

}
export default BranchSettingForm;



/*


const renderTable=()=>{
return(
<div 
   className="w-100 flex-center-start jc-start" 
   style={{marginBottom:"0.2rem"}}>
   <div className="w-100">
       {
            table.map((i,idx)=>{
               return(
                   <div className="flex-center-center" key={idx}
                        style={{margin:"0.5rem 0"}}
                   >
                     
                     
                  
                     
                       <div className="w-10">
                          
                       </div>
            
                       <div className="w-10">
                           {idx>0
                           ?<FaMinusSquare className="sm-icon"
                                 onClick={e=>{
                                    deleteTable(i)
                                 }}
                           />
                           :null
                           }
                       </div>
                        

                        {editData._idx==i._idx
                        ?<div className="w-80" style={{display:"flex"}}>
                           <input className="w-20"
                                 type="checkbox"
                                 checked={editData.tableActive}
                                 onChange={e=>{
                                    setEditData({
                                       ...editData,tableActive:e.target.checked
                                    })
                                 }}
                                 
                                 onBlur={e=>{
                                    let tempArray=[]
                                    table.map(i=>{
                                       if(editData._idx==i._idx){
                                          tempArray=[...tempArray,editData]
                                       }
                                       else{
                                          tempArray=[...tempArray,i]
                                       }
                                    })
                                    setTable(tempArray)
                                 }}
                           />
                           <input className="h-100 w-80"
                              value={editData.tableName}
                              onChange={e=>{
                                 setEditData({
                                    ...editData,tableName:e.target.value
                                 })
                              }}
                              onBlur={e=>{
                                 let tempArray=[]
                                 table.map(i=>{
                                    if(editData._idx==i._idx){
                                       tempArray=[...tempArray,editData]
                                    }
                                    else{
                                       tempArray=[...tempArray,i]
                                    }
                                 })
                                 setTable(tempArray)
                              }}
                           />
                        </div>
                        :<div className="w-80" style={{display:"flex"}}
                           onClick={e=>{   
                                 setEditData(i)
                           }}
                        >
                              <div className="w-20" 
                                   style={{display:"flex",
                                           justifyContent:"center",
                                           alignItems:"center"
                                           }}>
                                 {
                                    i.tableActive
                                    ?<MdCheckBox 
                                       className="md-icon"
                                     />
                                    :<MdCheckBoxOutlineBlank 
                                       className="md-icon"
                                    />
                                 }
                              </div>
                              <div className="w-80" style={{margin:"auto 0"}}>
                                 {i.tableName}
                              </div>
                        </div>
                        }
                   </div>
               )
           })
       }
   </div>

</div>
)
}

*/