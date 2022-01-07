import React from 'react';
import Table from '../../component/table/Table'
import uuid from 'react-uuid'
import {FaPlusCircle,FaRegArrowAltCircleDown,FaRegArrowAltCircleUp,FaCheck,FaBan,
   FaRegArrowAltCircleRight,FaRegArrowAltCircleLeft} from 'react-icons/fa';
import {MdRefresh,MdAddCircle,MdEdit,MdDelete,MdClose,
   MdPrint,MdSave,MdSwapHoriz,MdRawOn,MdMergeType,
} from 'react-icons/md'
import Ticon from '../../component/ticon/Ticon'

function ModalTable(props) {

const {modalTableState,submitFunc,basicData,cancelFunc,
    saveTableTemplateFunc,pageData}=props

console.log('modalTableState')

const gendData=(data)=>{
   let tempArray=[]
   data.map(i=>{
      const tempObj={...i,selectedLine:false,_id:uuid()}
      tempArray=[...tempArray,tempObj]
   })
   return tempArray
}

const {pageForm,tableTemplate,data,blankData}=modalTableState

const [data1,setData1]=React.useState(gendData(data))
const [editData,setEditData]=React.useState(null)
const [tableTemplate1,setTableTemplate1]=React.useState(tableTemplate)
const [showToolBox,setShowToolBox]=React.useState(true)

const moveUp=()=>{
   if(editData){
       
       let tempArray=[]
       let targetIdx=null

       data1.map((i,idx)=>{
           if(i._id==editData._id){
               targetIdx=idx
           }
       })

       if((targetIdx!=null)&&(targetIdx>0)){
           
           data1.map((i,idx)=>{
              
               if(idx==targetIdx-1){
                   tempArray=[...tempArray,data1[targetIdx]]
               }
               else if(idx==targetIdx){
                   tempArray=[...tempArray,data1[targetIdx-1]]
               }
               else {
                   tempArray=[...tempArray,i]
               }

           })
           setData1(tempArray)
       }
   
   }
}

const moveDown=()=>{
   if(editData){
       
       let tempArray=[]
       let targetIdx=null
       const lastIndex=data1.length-1

       data1.map((i,idx)=>{
           if(i._id==editData._id){
               targetIdx=idx
           }
       })

       if((targetIdx!=null)&&(targetIdx<lastIndex)){
           
           data1.map((i,idx)=>{
              
               if(idx==targetIdx){
                   tempArray=[...tempArray,data1[targetIdx+1]]
               }
               else if(idx==targetIdx+1){
                   tempArray=[...tempArray,data1[targetIdx]]
               }
               else {
                   tempArray=[...tempArray,i]
               }

           })
           setData1(tempArray)
       }
   
   }
}

const deleteLine=()=>{
    if(editData){
        if(data1){
            if(data1.length>1){
            let tempArray=[]
         
                data1.map((i,idx)=>{
                    if(i._id!=editData._id){
                        tempArray=[...tempArray,i]
                    }
                })
         
                setData1(tempArray)
            }
       }
   }

  
}

const insertLine=()=>{

   if(editData){

       let tempArray=[]

       data1.map((i,idx)=>{
           if(i._id==editData._id){
               const tempObj={...blankData,selectedLine:false,_id:uuid()}
               tempArray=[...tempArray,tempObj,i]
           }
           else{
               tempArray=[...tempArray,i]
           }
       })
       setData1(tempArray)
   }
   else{
   
      const tempObj={...blankData,selectedLine:false,_id:uuid()}
      let tempArray=[tempObj]
      setData1(tempArray)
   }
}

const updateFilterDataFunc=(idx,value)=>{
   //console.log('updateFilterDataFunc.............')
   //console.log(idx)
   //console.log(value)

   let tempArray=[]

   data1.map(i=>{
      if(i._id==editData._id){
         tempArray=[...tempArray,value]
      }
      else{
         tempArray=[...tempArray,i]
      }
   })
   setData1(tempArray)
}

const styleRight={position:"fixed",
  top:"3rem",right:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}
const styleLeft={position:"fixed",
  top:"3rem",Left:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}

const [swapStyleRight,setSwapStyleRight]=React.useState(true)

const renderToolBox=()=>{
    return(
        <div style={swapStyleRight?styleRight:styleLeft}>
            
            
            <div className="iconbox"
                 style={{height:"3.5rem"}}
                 onClick={e=>{
                    deleteLine()
                 }}
            >
                   <Ticon 
                   iconName="MdDelete"
                   className="lg-icon"
                   textStyle={{color:"black"}}
                />
            </div>

            <div className="iconbox"
                 style={{height:"3.5rem"}}     
                 onClick={e=>{
                    insertLine()
                 }}
            >
                <Ticon
                    iconName="MdAddCircle" 
                    className="lg-icon"
                    textStyle={{color:"black"}}
                    
                />
            </div>

            <div className="iconbox"
                 style={{height:"3.5rem"}} 
                 onClick={e=>{
                    moveUp()
                 }}
            >
                <Ticon
                    iconName="FaRegArrowAltCircleUp" 
                    className="lg-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            
            <div className="iconbox"
                 style={{height:"3.5rem"}} 
                 onClick={e=>{
                    moveDown()
                 }}
            >
                <Ticon
                    iconName="FaRegArrowAltCircleDown" 
                    className="lg-icon"
                    textStyle={{color:"black"}}
                />
            </div>

            <div className="iconbox"
                 style={{height:"3.5rem"}} 
                 onClick={e=>{
                    setSwapStyleRight(!swapStyleRight)
                }}
            >
                <Ticon
                    iconName="MdSwapHoriz" 
                    className="xl-icon"
                    textStyle={{color:"black"}}
                />
            </div>
           
            <div className="iconbox"
                 style={{height:"3.5rem"}} 
                 onClick={e=>{
                    setEditData(null)
                    setShowToolBox(false)
                    //updateData(billFormData)
                }}
            >
                <Ticon 
                    iconName="MdClose" 
                    className="lg-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            
        </div>
    )
}


return(

<div className="Modal-background">
       
       <div className="Modal-box" style={{minWidth:"70%",minHeight:"40%"}}>
         
           <div className="Modal-header">
               <h5>{pageForm.formHead}</h5>
           </div>

           <div className="flex-center-center w-80"
                style={{width:"100%"}}
           >
             
              {
               <Table
                        tableTemplate={tableTemplate1}
                        setTableTemplate={setTableTemplate1}//{setTableTemplate}
        
                        filterData={data1}
                        setFilterData={()=>{}}//{setFilterDataData0}
                        
                        editData={editData}
                        setEditData={setEditData}
                        saveTableTemplateFunc={saveTableTemplateFunc}
                        isSubTable={false}
                        updateFilterData={updateFilterDataFunc}
                        useInput={true}
                        basicData={basicData}
                        pageData={pageData.tableSettingModal}
               />
              }
           </div>

            {showToolBox
               ?editData
                ?renderToolBox()   
                :null
               :null
            }    


           <div className="Modal-footer">
               <div>
                   <button
                       onClick={e=>{
                           submitFunc(data1)
                       }}
                    
                   >
                       <FaCheck/>
                   </button>
               </div>
               <div>
                   <button
                       onClick={e=>{
                          cancelFunc()
                          setShowToolBox(false)
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
export default ModalTable;

