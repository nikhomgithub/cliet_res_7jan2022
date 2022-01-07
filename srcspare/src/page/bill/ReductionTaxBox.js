import React from 'react';
import {MdRadioButtonChecked,MdRadioButtonUnchecked} from 'react-icons/md'
import {FaCheck,FaBan} from 'react-icons/fa'

function ReductionTaxBox(props){

   const {
      submitFunc,
      cancelFunc,
      setShowReductionBox,
      billFormDataState,
      setBillFormDtaState,
      basicData,
      fieldName,
      subFieldName,
      inputType,
      calDigit,
      form,
      secondForm
   } = props

   const {customerPointReduction,remainingPoint,totalPoint}=billFormDataState
   
   console.log('renderReductionBox.................')
   
   const genBoxState=(obj)=>{
      let tempArray=[]

         obj.map((k,idx)=>{
            let tempAmount=0
            if(k[`${fieldName}InPercentage`]){
               tempAmount=k[`${fieldName}Rate`]*billFormDataState.total/100
               tempAmount=parseInt(tempAmount*calDigit)/calDigit
            }
            else {
               tempAmount=k[`${fieldName}Rate`]
            }

            const tempObj={...k,
               ["selection"]:false,
               [`${fieldName}Amount`]:tempAmount
            }

            tempArray=[...tempArray,tempObj]
         })

      console.log('tempArray genBoxState')
      console.log(tempArray)
      return tempArray
   }


   const [boxState,setBoxState]=React.useState(genBoxState(basicData[fieldName]))

   let [point,setPoint]=React.useState({customerPointReduction,remainingPoint,totalPoint})

   React.useEffect(()=>{
      console.log('point')
      console.log(point)
   },[point])

   const handleChangeRate=(e,j,index1)=>{

      const tempValue=parseInt(e.target.value*calDigit)/calDigit
      let tempArray=[]
      boxState.map((k,idx)=>{
         if(idx==index1){
            let tempAmount=0
            if(k[`${fieldName}InPercentage`]){
               tempAmount=tempValue*billFormDataState.total/100
               tempAmount=parseInt(tempAmount*calDigit)/calDigit
            }
            else {
               tempAmount=tempValue
            }

            const tempObj={...k,
               [j]:tempValue,
               [`${fieldName}Amount`]:tempAmount
            }
            tempArray=[...tempArray,tempObj]
         }
         else {
            tempArray=[...tempArray,k]
         }
      })
            
      setBoxState(tempArray)

   }

   const handleChange=(e,j,index1)=>{
      let tempArray=[]
      boxState.map((k,idx)=>{
         if(idx==index1){
            const tempObj={...k,[j]:e.target.value}
            tempArray=[...tempArray,tempObj]
         }
         else {
            tempArray=[...tempArray,k]
         }
      })
      setBoxState(tempArray)
   }

   const handleChangeCheckbox=(e,j,index1)=>{
      let tempArray=[]
      boxState.map((k,idx)=>{
         if(idx==index1){

            let tempAmount=0
            if(e.target.checked){
               tempAmount=k[`${fieldName}Rate`]*billFormDataState.total/100
               tempAmount=parseInt(tempAmount*calDigit)/calDigit
            }
            else {
               tempAmount=k[`${fieldName}Rate`]
            }

            const tempObj={...k,
               [j]:e.target.check,
               [`${fieldName}Amount`]:tempAmount
            }
            tempArray=[...tempArray,tempObj]
         }
         else {
            tempArray=[...tempArray,k]
         }
      })

      setBoxState(tempArray)
   }

   const handleRadio=(value,index1)=>{
      let tempArray=[]

      boxState.map((k,idx)=>{
         if(value){
            if(idx==index1){
               const tempObj={...k,selection:value}
               tempArray=[...tempArray,tempObj]
            }
            else {
               const tempObj={...k,selection:false}
               tempArray=[...tempArray,tempObj]
            }
         }
         else{
            if(idx==index1){
               const tempObj={...k,selection:value}
               tempArray=[...tempArray,tempObj]
            }
            else {
               tempArray=[...tempArray,k]
            }
         }
      })
      setBoxState(tempArray)
   }

   const handleReductionPoint=(value)=>{
      const tempReductionPoint=parseInt(value*calDigit)/calDigit
      const tempRemainingPoint=point.totalPoint-tempReductionPoint

      setPoint({...point,
         customerPointReduction:tempReductionPoint,
         remainingPoint:tempRemainingPoint
      })
      
   }

   const renderTableHead=()=>{
      return(
         <div className="TableGrid-head" 
               style={{display:"grid",
                 gridTemplateColumns:"5% 35% 20% 20% 20%",
                 gridAutoRows:"minmax(1rem,auto)",
                 backgroundColor:"green",
                 zIndex:"10"
              }}
         >
            {
               Object.keys(form).map((i,idx)=>{
                  if(i!="formHead")
                  return(
                     <div className="flex-center-center">
                        {form[i]}
                     </div>
                  )
               })   
            }
         </div>
      )
   }

   /*
   const renderSecondForm=()=>{
      
      return ["totalPoint","customerPointReduction","remainingPoint"].map((i,idx)=>{
         return(
            <div key={idx} className="flex-center-center jc-start w-50"
            style={{padding:"0.3rem"}} >
               <div className="xc6">
                  {
                     secondForm[i]
                  }
               </div>
               <div className="xc6">
                  {i=="customerPointReduction"
                  ?<input
                     type={"number"}
                     value={point[i]}
                     onChange={e=>{
                        handleReductionPoint(e.target.value)
                     }}
                  />
                  :<input
                  type={"number"}
                  value={point[i]}
                  disabled={"disabled"}
                  />
                  }
               </div>
         </div>
         )
      })
   }
   */

   const renderTableBody=()=>{
      return(
         <div className="TableGrid-head" 
               style={{display:"grid",
               gridTemplateColumns:"5% 35% 20% 20% 20%",
               gridAutoRows:"minmax(1rem,auto)",
               backgroundColor:"white",
               zIndex:"10",
               marginBottom:"1rem"
            }}
         >
            {
               boxState.map((i,index1)=>(
                  subFieldName.map((j,index2)=>{
                  return inputType[j]=="radio"
                     ? i[j]
                        ?<div className="flex-center-center"
                           onClick={e=>{handleRadio(false,index1)}}
                        >
                           <MdRadioButtonChecked/>
                        </div>
                        :<div className="flex-center-center"
                           onClick={e=>{handleRadio(true,index1)}}
                        >
                           <MdRadioButtonUnchecked/>
                        </div>
                     :<input
                        key={`${index1}-${index2}`}
                        type={inputType[j]}
                        checked={i[j]}
                        value={i[j]}
                        onChange={e=>{
                           if(inputType[j]=="number"){
                              handleChangeRate(e,j,index1)
                           }
                           else if(inputType[j]=="checkbox"){
                              handleChangeCheckbox(e,j,index1)
                           }
                           else {
                              handleChange(e,j,index1)
                           }
                        }}
                        disabled={j==`${fieldName}Amount`?"disabled":""}
                     />
                  
                  })
               ))   
            }
         </div>
      )
   }


   return(
      <div className="Modal-background">
          <div className="Modal-box" 
               style={{position:"relative"}}>
              <div className="">
                  <h5>{form.formHead}</h5>
                  {renderTableHead()}
                  {renderTableBody()}
                  {
                  /*
                  secondForm&&point&&
                     renderSecondForm()
                  */
                  }
              </div>

              <div className="Modal-footer">
               <div>
                   <button
                       onClick={e=>{
                           let isSelection=false
                           let tempObj=null
                           
                           boxState.map(i=>{
                              if(i.selection){
                                 isSelection=true
                                 tempObj=i
                              }
                           })

                           
                           if(isSelection){
                              submitFunc(tempObj,point)
                           }
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


export default ReductionTaxBox