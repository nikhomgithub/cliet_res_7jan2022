import React from 'react';
import {FaCheck,FaBan} from 'react-icons/fa';

const renderTransactionConfirm=({
   editTransaction,
   submitFunc,
   cancelFunc,
   pageData,
   changeIncludeTransactionHead,
   includeTransactionHead
})=>{
   
   const {transactionType,id,transactionStatus,
          //branchId,branchName,
          date,table,
         tableStatus,partnerId,title,name,phone,address
   }=editTransaction

   const {transactionConfirmForm}=pageData
   /*
   const transactionConfirmForm={
       formHead:"ยืนยันข้อมูลลูกค้า",
       id:"ID",
       date:"Date",  
       table:"Table",
       partnerId:"Customer ID",
       phone:"Phone",
       address:"Address"
   }*/

   const findDateTime=(date)=>{
    const date1=new Date(date).toISOString()
    const date2=new Date(date1).toLocaleString('fr-ca')
    const date3=new Date(date1).toLocaleString('en-GB')

      const tempDate= date2.substring(0,10)
      const tempTime=date3.substring(12,17)
      return {date:tempDate,time:tempTime}
   }

   const genArrayToString=(array)=>{
      const genSeparator=(str)=>{
         const tempArray=Array.from(str)
         let tempString=''
         tempArray.map((i,idx)=>{
               if((idx==3)||(idx==6)){
                  tempString=`${tempString} ${i}`
               }
               else {
                  tempString=`${tempString}${i}`
               }
         })
         return tempString
      }

      let temp=''
      array.map((i,idx)=>{

         if(idx==array.length-1){
               temp=`${temp}${genSeparator(i)}`
         }
         else{
               temp=`${temp}${genSeparator(i)},`
         }
      })
      return temp
   }
   //<div>{`${transactionConfirmForm.branch}:${branchId}.${branchName}`}</div>

   const renderBody=()=>{
      return(
      <div className="h-100 w-100">
            <div>{`${transactionType} ${transactionConfirmForm.id}: ${id} (${transactionStatus})`}</div>
                <div>{`${transactionConfirmForm.date}: ${findDateTime(date).date} ,${findDateTime(date).time}`}</div>
            <div>{`${transactionConfirmForm.table}: ${table}(${tableStatus})`}</div>

            <div>{`${transactionConfirmForm.partnerId}:${partnerId}, ${title} ${name}`}</div>
                <div>{`${transactionConfirmForm.phone}: ${genArrayToString(phone)}`}</div>
            <div>{`${transactionConfirmForm.address}: ${address}`}</div>

            <div className="flex-center-center jc-start">
                <div className="xc1">
                    <input type="checkbox" 
                        checked={includeTransactionHead}
                        onChange={e=>changeIncludeTransactionHead(e.target.checked)}
                    />
                </div>
                
                <div>{transactionConfirmForm.includeTransactionHead}</div>
            </div>
      </div>


      )
   }

  
   return(
   <div className="Modal-background">
       <div className="Modal-box" style={{width:"70%"}}>
           <div className="Modal-header">
               <h4>{transactionConfirmForm.formHead}</h4>
           </div>

           <div className="w-100">
               {renderBody()}
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

export default renderTransactionConfirm