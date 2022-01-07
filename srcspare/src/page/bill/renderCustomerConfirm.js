import React from 'react';
import {FaCheck,FaBan} from 'react-icons/fa';

const renderCustomerConfirm=({
   filterData,
   setFilterData,
   basicData,
   customerConfirmForm,
   submitFunc,
   cancelFunc
})=>{
   /*
   const customerConfirmForm={
       formHead:"ยืนยันข้อมูลลูกค้า",
       partnerId:"Partner ID",
       title:"Title",
       name:"Name",
       partnerType:"Customer Type",
       phone:"Phone",
       address:"Address"
   }
   */


   //console.log('filterData')
   //console.log(filterData)

   const handleChange=(e,i)=>{
       const tempObj={
           ...filterData.customerConfirm,
           [i]:e.target.value
       }
       setFilterData({...filterData,customerConfirm:tempObj})
   }

   const handleChangePhone=(e,i,idx2)=>{
       let tempArray=[]
       filterData.customerConfirm[i].map((k,idx3)=>{
           if(idx2==idx3){
               tempArray=[...tempArray,e.target.value]
           }
           else {
               tempArray=[...tempArray,k]
           }
       })
       const tempObj={
           ...filterData.customerConfirm,
           [i]:tempArray
       }
       setFilterData({...filterData,customerConfirm:tempObj})

   }

   const handleChangeAddress=(e,i)=>{
      const tempObj={...filterData.customerConfirm,["selectedAddress"]:e.target.value}
       setFilterData({...filterData,customerConfirm:tempObj})
   }

   const renderBody=(i,idx)=>{
       if(i.formHead){
           return null
       }
       else if((i=="partnerId")||(i=="name")){
           return (
               <div className="flex-center-center jc-start w-100" 
                  key={idx}>
                   <div className="xc4">
                       {customerConfirmForm[i]}
                   </div>
                   <div className="xc8">
                       <input
                           value={filterData.customerConfirm[i]}
                           onChange={e=> handleChange(e,i)}
                       />
                   </div>
               </div>
           )
       }
       else if( (i=="title")||(i=="partnerType") ){
           return(
               <div className="flex-center-center jc-start w-100" 
                    key={idx}>
                   <div className="xc4">
                       {customerConfirmForm[i]}
                   </div>
                   <div className="xc8">
                       <select
                           onChange={e=>{
                               handleChange(e,i)
                           }}
                       >
                           {
                           basicData[i].map((j,idx2)=>(
                               <option key={idx2} 
                                    selected={filterData.customerConfirm[i]==j?"selected":""}>
                                        {j}
                               </option>
                           ))
                           }
                       </select>

                   </div>
               </div>
           )
       }
       else if(i=="phone"){
           return( filterData.customerConfirm[i].map((j,idx2)=>(
           <div className="flex-center-center jc-start w-100" 
                style={{margin:"0.2rem 0"}}
                key={idx2}>
               <div className="xc4">
                   {idx2==0?customerConfirmForm[i]:null}
               </div>
               <div className="xc8">
                   <input
                       value={j}
                       onChange={e=>{
                           handleChangePhone(e,i,idx2)
                       }}
                   />
               </div>
           </div>
           ))
          
           )
       }
       else if(i=="address"){
           return(
                   <div className="flex-center-center jc-start w-100" 
                        key={idx}>
                       <div className="xc4">
                           {customerConfirmForm[i]}
                       </div>
                       <div className="xc8">
                           <select
                               onChange={e=>{
                                   handleChangeAddress(e,i)
                               }}
                           >
                               {
                               filterData.customerConfirm[i].map((j,idx2)=>(
                                   <option key={idx2} 
                                       selected={idx2==0?"selected":""}>
                                           {j}
                                   </option>
                               ))
                               }
                           </select>

                       </div>
                   </div>
           )
       }
   }
  
   return(
   <div className="Modal-background">
       <div className="Modal-box">
           <div className="Modal-header">
               <h4>{customerConfirmForm.formHead}</h4>
           </div>

           <div className="w-100"
                style={{marginBottom:"1rem"}}
           >
               {Object.keys(customerConfirmForm).map((i,idx)=>{
                   return(
                       <div key={idx} style={{
                           margin:"0.2rem 0"
                       }}>
                        {renderBody(i,idx)}
                        </div>
                   )
               }
               )
               }

           </div>
           <div className="Modal-footer">
               <div>
                   <button
                       onClick={e=>{
                           submitFunc()
                           //submitFunction()
                       }}
                    
                   >
                       <FaCheck/>
                   </button>
               </div>
               <div>
                   <button
                       onClick={e=>{
                          cancelFunc()
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

export default renderCustomerConfirm