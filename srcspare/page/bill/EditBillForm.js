import React from 'react';
import {MdEdit,MdRefresh} from 'react-icons/md'
import {FaPlusSquare,FaMinusSquare,FaCheck,FaBan} from 'react-icons/fa'; 
import ReductionTaxBox from './ReductionTaxBox';
import Calendar from '../../component/calendar/Calendar';
import axiosUtil from '../../util/axiosUtil';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';

const {genId}=axiosUtil

const EditBillForm=({
   //pageData
   billFormData,
   setBillFormData,
   basicData,
   submitFunc,
   cancelFunc,
   calDigit,
   pageData,
   myheader,
   runIsGenId,
})=>{
   console.log('EditBillForm')
   //const {transactionConfirmForm}=pageData
   const {editBillForm,reductionForm,taxForm,customerPointForm}=pageData
   //console.log(pageData)
   /*
   const editBillForm={
       formHead:"แก้ไขหัวและท้ายบิล",
       id:"ID",
       date:"Date",  
       branch:"Branch",
       transactionType:"Transaction Type",
       transactionStatus:"Transaction Status",
       active:"Active",

       table:"Table",
       tableStatus:"Table Status",

       partnerId:"Customer ID",
       title:"Title",
       name:"Name",
       phone:"Phone",
       address:"Address",
       partnerType:"Partner Type",

       remark:"Remark",
       paymentType:"Payment Type",
       total:"Total",

       tax:"ภาษี",
       totalTax:"Total Tax",
       reduction:"ส่วนลด",
       totalReduction:"Total Reduction",
       
       grandTotal:"Grand Total"
   }

   const reductionForm={
      formHead:"ตารางส่วนลด",
      selection:"",
      reductionName:"ชื่อส่วนลด",
      reductionRate:"อัตราลด",
      reductionInPercentage:"in %",
      reductionAmount:"รวม"
   }
  
   const taxForm={
      formHead:"ตารางภาษี",
      selection:"",
      reductionName:"ชื่อภาษี",
      reductionRate:"อัตราภาษี",
      reductionInPercentage:"in %",
      reductionAmount:"รวม"
   }
*/





   const [billFormDataState,setBillFormDataState]=React.useState(
                                                   {...billFormData,
                                                      remainingCustomerPoint:0
                                                   }
                                                   )

   const [reloadPartner,setReloadPartner]=React.useState(true)

   React.useEffect(()=>{
      console.log('billFormDataState............')
      console.log(billFormDataState)
   },[billFormDataState])

   const [showTaxBox,setShowTaxBox]=React.useState(false)
   const [showReductionBox,setShowReductionBox]=React.useState(false)

   React.useEffect(()=>{
      if(reloadPartner){
         axios.post('/p35partner/getlimit',{id:billFormDataState.partnerId},myheader)
         .then(result=>{
            //console.log('/p35basicdata/getcustom')
            //console.log(result.data.data[0])
            if(result.data.data[0]){
               const tempObj= {remainingCustomerPoint:result.data.data[0].remainingCustomerPoint}
               setBillFormDataState({...billFormDataState,...tempObj})
            }
            setReloadPartner(false)
            //setPoint({...point,totalPoint})
         })
      }
   },[reloadPartner])


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

const handleChange=(e,i)=>{
   setBillFormDataState({...billFormDataState,[i]:e.target.value})
}

const deleteLine=(i,idx3)=>{
   const {total,totalTax,totalReduction,grandTotal}=billFormDataState

   console.log('deleteLine')

   let tempArray=[]

   billFormDataState[i].map((k,index)=>{
      if(idx3!=index){
         tempArray=[...tempArray,k]
      }
   })

   let tempTotalTax=totalTax 
   let tempTotalReduction=totalReduction 

   if(i=="tax"){
      let temp=0
      tempArray.map(i=>{
         temp=temp+i.taxAmount
      })
      tempTotalTax=temp
   }
   if(i=="reduction"){
      let temp=0
      tempArray.map(i=>{
         temp=temp+i.reductionAmount
      })
      tempTotalReduction=temp
   }

   const tempGrandTotal=total-tempTotalReduction-tempTotalTax

   setBillFormDataState({...billFormDataState,
      [i]:tempArray,
      totalTax:tempTotalTax,
      totalReduction:tempTotalReduction,
      grandTotal:tempGrandTotal
   })

}

//
const appendReduction=(obj,point)=>{

   console.log('appendReduction')
   console.log(obj)
   console.log(point)
   console.log('==============')

   const {customerPointReduction,remainingPoint,totalPoint}=point

   const {total,totalReduction,totalTax,grandTotal}=billFormDataState

   const tempArray=[...billFormDataState.reduction,obj]
   const tempTotalReduction=totalReduction+obj.reductionAmount

   const tempGrandTotal=total-totalTax-tempTotalReduction

   const temp={
      customerPointReduction:customerPointReduction,
      totalPoint:totalPoint,
      reduction:tempArray,
      totalReduction:tempTotalReduction,
      grandTotal:tempGrandTotal
   }

   console.log(temp)
   setBillFormDataState({...billFormDataState,
     ...temp
   })
   setShowReductionBox(false)
}

const appendTax=(obj)=>{
   console.log('appendTax')

   const {total,totalReduction,totalTax,grandTotal}=billFormDataState

   const tempArray=[...billFormDataState.tax,obj]

   const tempTotalTax=totalTax+obj.taxAmount

   const tempGrandTotal=total-tempTotalTax-totalReduction

   const temp={
      tax:tempArray,
       totalTax:tempTotalTax,
       grandTotal:tempGrandTotal
   }

   console.log(temp)

   setBillFormDataState({...billFormDataState,
       ...temp
   })
   setShowTaxBox(false)
}

const findCustomerById=(e)=>{
   if(e.key=="Enter"){
      console.log('findCustomerById')
      axios.post('/p35partner/getlimit',{id:e.target.value},myheader)
      .then(result=>{
         if(result.data.count>=1){
            const tempCustomer=result.data.data[0]

            const {id,name,title,phone,address,partnerType}=tempCustomer

            const tempObj={
               partnerId:id,title:title,name:name,phone:phone,
               address:address[0],partnerType:partnerType
            }
            setBillFormDataState({...billFormDataState,
               ...tempObj
            })

         }
      })
      .catch(error=>{
         console.log('error')
      })
   }
}

//=====================================

const renderBody=()=>{
   //console.log(Object.keys(editBillForm))

   return(Object.keys(editBillForm).map((i,idx)=>{
      if(i=="formHead"){
         return null
      }
      else if(i=="id"){
         return(
         <div className={"flex-center-center jc-start w-50"}
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4" >
               <div className="flex-center-center jc-start" style={{color:"#bb3016"}}>
                  {editBillForm[i]}
                  <MdRefresh className="md-icon"
                     onClick={e=>{
                        runIsGenId(true)
                        const tempId=genId()
                        setBillFormDataState({
                           ...billFormDataState,
                           id:tempId
                        })
                     }}
                  />
               </div>
            </div>
         
            <div className="xc8">
               <input
                  type={"number"}
                  value={billFormDataState[i]}
                  disabled="disabled"
                  onChange={e=>{
                     setBillFormDataState({
                        ...billFormDataState,
                        [i]:e.target.value
                     })
                  }}
               />
            </div>
         </div>
         )
      }
      else if(i=="date"){ 
      //findDateTime
      return(
         <div className="flex-center-center jc-start w-50" 
               key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4" style={{color:"blue"}}>
               {editBillForm[i]}
            </div>
            <div className="xc8">
            <Calendar
                     style={{height:"1.6rem",fontSize:"0.8rem"}}
                     onMyClick={
                        (e)=>{
                        console.log(e)
                        setBillFormDataState({
                           ...billFormDataState,
                           date:e
                        })
                        }
                     }
                     value={billFormDataState[i]}
            />
            </div>
         </div>
      )
      }
      else if( 
               //(i=="transactionType")||
               (i=="transactionStatus")||
               //(i=="table")||
               (i=="tableStatus")||
               (i=="partnerType")||
               (i=="paymentType")||
               (i=="queueStatus")||
               (i=="title")
              ){
         return(
         <div className={i=="paymentType"
            ?"flex-center-center jc-start w-100"
            :"flex-center-center jc-start w-50"} 
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4">
               {editBillForm[i]}
            </div>
            <select className="xc8"
               onChange={e=>handleChange(e,i)}
            >
               <option>....</option>
               {basicData[i].map((j,idx2)=>(
                  <option key={idx2}
                          selected={billFormDataState[i]==j?"selected":""}
                  >{j}</option>
               ))}
            </select>
         </div>
        )
      }
      else if(i=="table"){
         return(
         <div className="flex-center-center jc-start w-50" 
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4" style={{display:"flex",justifyContent:"flex-start"}}>
               <div  className="xc12" style={{color:"green"}}>
                  {editBillForm[i]}
               </div>
            </div>
            <select className="xc8"
                onChange={e=>{
                  let tempObj=billFormDataState
                  basicData["table"].map(k=>{
                     if(k.tableName==e.target.value){
                           tempObj={...tempObj,
                              table:k.tableName,
                            
                           }
                     }
                  })
                 setBillFormDataState(tempObj)
               }}
            >
               <option>....</option>
               {
                  basicData[i].map((j,idx2)=>(
                  <option key={idx2}
                     selected={billFormDataState[i]==j.tableName?"selected":""}
                  >{j.tableName}</option>
                  ))
               }
            </select>
         </div>
         )
      }
      else if(i=="active"){
         return(
         <div className={"flex-center-center jc-start w-100"}
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc2">
               {editBillForm[i]}
            </div>
            <div className="xc10">
               <div style={{display:"flex",justifyContent:"flex-start"}}> 
                  
                  <input className="xc1"
                        style={{textAlign:"left"}}
                        type={"checkbox"}
                        checked={billFormDataState[i]}
                        onChange={e=>{
                           setBillFormDataState({
                              ...billFormDataState,
                              [i]:e.target.checked
                           })
                        }}
                     />     
                  <div className="xc11"/>

               </div>
            </div>
         </div>
         )
      }
      else if(i=="transactionType"){
         
         return(
            <div className={"flex-center-center jc-start w-50"}
               key={idx} style={{padding:"0.3rem"}} >
                  <div className="xc4">
                     {editBillForm[i]}
                  </div>
                  <select className="xc8"
                     onChange={e=>{
                        let tempObj=billFormDataState
                        basicData["transaction"].map(k=>{
                           if(k.transactionType==e.target.value){
                                 tempObj={...tempObj,
                                    transactionType:k.transactionType,
                                    effectStock:k.effectStock,
                                    effectCustomerPoint:k.effectCustomerPoint,
                                    effectSpending:k.effectSpending
                                 }
                           }
                        })
                       setBillFormDataState(tempObj)
                     }}
                  >
                     <option>...</option>
                     {
                     basicData["transaction"].map((j,idx2)=>(
                     <option key={idx2}
                        selected={billFormDataState[i]==j.transactionType?"selected":""}
                     >{j.transactionType}</option>
                     ))
                     }
                  </select>
            </div>
         )
      }
      else if( (i=="total")||
               (i=="totalReduction")||
               (i=="totalTax")||
               (i=="grandTotal")||
               (i=="reductCustomerPoint")||
               (i=="totalPoint")||
               (i=="remainingCustomerPoint")
      ){
         const findBgColorLb=()=>{
            if(i=="totalPoint"){
               return "#bbc9a5"
            }
            if(i=="reductCustomerPoint"){
               return "#bcd890"
            }
            if(i=="remainingCustomerPoint"){
               return "#96bf65"
            }
            if(i=="grandTotal"){
               return "#a7c6eb"
            }
            if(i=="total"){
               return "#8cc5bb"
            }
            if(i=="totalTax"){
               return "#fced96"
            }
            if(i=="totalReduction"){
               return "#fdf07a"
            }
         }

         return(
            <div className="flex-center-center jc-start w-100" 
               key={idx} style={{padding:"0.3rem"}} >
               <div className="xc4"
                    style={{fontSize:i=="grandTotal"?"1.4rem":"1.2rem",
                            backgroundColor:findBgColorLb(),
                            borderRadius:"5px"
                    }}
               >
                  {editBillForm[i]}
               </div>
               <div className="xc8">
                  <input
                     style={{fontSize:i=="grandTotal"?"1.4rem":"1.2rem",
                            color:i=="reductCustomerPoint"||i=="totalReduction"?"red":"black"
                     }}
                     type={"number"}
                     value={billFormDataState[i]}
                     onChange={e=>{
                        setBillFormDataState({
                           ...billFormDataState,
                           [i]:e.target.value
                        })
                     }}
                        //handleChangeNumber(e,i)
                     
                     disabled={i=="reductCustomerPoint"?null:"disabled"}
                  />
               </div>
            </div>
         )
      }
      else if(i=="phone"){
         return(
         <div className="flex-center-center jc-start w-50"
            
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4">
               {editBillForm[i]}
            </div>
            <div className="xc8">
               <input
                  type={"text"}
                  value={genArrayToString(billFormDataState[i])}
                  disabled="disabled"
               />
            </div>
         </div>
         )
      }
      else if((i=="reduction")||(i=="tax")){
         const genText=(j)=>{
            
            if(j.reductionInPercentage){
               return `${j[`${i}Name`]} ${j[`${i}Rate`]}% =`
            }
            else{
               return `${j[`${i}Name`]} ${j[`${i}Rate`]} = `
            }
         }

         if(billFormDataState[i].length==0){
            return(
               <div className="flex-center-center jc-start w-฿จ0"
                    style={{padding:"0.3rem"}} >
                     {editBillForm[i]}
                     <FaPlusSquare className="md-icon"
                        onClick={e=>{
                           if(i=="reduction"){
                              setShowReductionBox(true)
                           }
                           else{
                              setShowTaxBox(true)
                           }
                        }}
                     />
            
               </div>
            )
         }
         else {

            return billFormDataState[i].map((j,idx3)=>(
            <div className="flex-center-center jc-start w-฿จ0"
               key={idx3} style={{padding:"0.3rem"}} >
               <div className="xc4">
                  {idx3==0?editBillForm[i]:null}
                  {idx3==0
                  ?<FaPlusSquare className="md-icon"
                     onClick={e=>{
                        if(i=="reduction"){
                           setShowReductionBox(true)
                        }
                        else{
                           setShowTaxBox(true)
                        }
                     }}
                   />
                  :null
                  }
               </div>

               <div className="xc8" style={{display:"flex"}}>
                    
                     <FaMinusSquare className="md-icon"
                        onClick={e=>{
                           deleteLine(i,idx3)
                        }}
                     />
                     <div className="xc6">
                           {genText(j)}
                     </div>
                     <div className="xc6">
                           <input
                              style={{color:"red"}}
                              disabled="disabled"
                              value={j[`${i}Amount`]}
                           />
                     </div>
               </div>
            </div>
            ))
         }
      }
     
      else {
         //console.log(`i == ${i}`)
         return(
         <div className={((i=="remark"))
            ?"flex-center-center jc-start w-100"
            :"flex-center-center jc-start w-50"
            }
            key={idx} style={{padding:"0.3rem"}} >
            <div className="xc4"
                 style={{color:i=="queue"?"brown":"black"}}
            >
               {editBillForm[i]}
            </div>
            <div className="xc8">
               <input
                  type={i=="queue"?"number":"text"}
                  value={billFormDataState[i]}
                  onChange={e=>handleChange(e,i)}
                  onKeyDown={e=>{
                     if(i=="partnerId"){
                        findCustomerById(e)
                     }
                  }}
                  //disabled={(i=="branchId"||i=="branchName")?"disabled":null}
               />
            </div>
         </div>
         )
      }
   }))
}

  
   return(
   <div className="Modal-background">
       <div className="Modal-box" style={{width:"90%",backgroundColor:"white"}}>
            <div className="Modal-header">
                  <h3>{editBillForm.formHead}</h3>
            </div>

            <div className="flex-center-center w-100">
                  {renderBody()}
            </div>
            <div className="Modal-footer">
                  <div>
                     <button
                        onClick={e=>{
                              submitFunc(billFormDataState)
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
        
        {showReductionBox
         ?<ReductionTaxBox
            billFormDataState={billFormDataState}
            basicData={basicData}
            setBillFormDataState={setBillFormDataState}
            fieldName={"reduction"}
            subFieldName={["selection","reductionName","reductionRate","reductionInPercentage","reductionAmount"]}
            inputType={{selection:"radio",reductionName:"text",reductionRate:"number",reductionInPercentage:"checkbox",reductionAmount:"number"}}
            submitFunc={appendReduction}
            cancelFunc={()=>setShowReductionBox(false)}
            calDigit={calDigit}
            form={reductionForm}
            secondForm={customerPointForm}
         />
         :null
         }
         {showTaxBox
         ?<ReductionTaxBox
            billFormDataState={billFormDataState}
            basicData={basicData}
            setBillFormDataState={setBillFormDataState}
            fieldName={"tax"}
            subFieldName={["selection","taxName","taxRate","taxInPercentage","taxAmount"]}
            inputType={{selection:"radio",taxName:"text",taxRate:"number",taxInPercentage:"checkbox",taxAmount:"number"}}
            submitFunc={appendTax}
            cancelFunc={()=>setShowTaxBox(false)}
            calDigit={calDigit}
            form={taxForm}
         />
         :null
         }




   </div>
   )
}

export default EditBillForm