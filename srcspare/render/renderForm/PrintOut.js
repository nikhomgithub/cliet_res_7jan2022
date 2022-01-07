import React from 'react';
import uuid from 'react-uuid'


function PrintOut(props) {

const {
   printPage,
   printPageSetting,
   calDigit,
   transaction
}=props

//console.log('printPage')
//console.log(printPage)

//console.log('printPageSetting')
//console.log(printPageSetting)

const convertToDigit=(calDigit,mynumber)=>{
      const temp =calDigit.toString()
      const n=Array.from(temp).length-1
      return mynumber.toFixed(n)
}

const genDataForTable=(obj)=>{
   const {header1,header2,table1,footer1,footer2}=obj
   const tableArray=["header1","header2","table1","footer1","footer2"]
   let tempObj={...obj}
   tableArray.map(i=>{    
         let tempArray=[]
         obj[i].map(i=>{
               const tempObj={...i,selectedLine:false,_id:uuid()}
               tempArray=[...tempArray,tempObj]
         })
         tempObj={...tempObj,[i]:tempArray}
   })
   return tempObj
}

const findPrintPage=(printPage,printPageSetting)=>{
   let result=null
   printPage.map(i=>{
      if(i.printPageName==printPageSetting){
         result=genDataForTable(i)
      }
   })
   return result
}

const [pageSetup,setPageSetup]=React.useState(
   findPrintPage(printPage,printPageSetting)
)

const {widthUnit,fontUnit,totalWidth,showTableHead,
       header1,header2,table1,footer1,footer2}=pageSetup

React.useEffect(()=>{
   //console.log('pageSetup')
   //console.log(pageSetup)
},[pageSetup])



const renderArray=(array)=>(
   array.map((i,idx)=>i.show
         ?<div key={idx} style={{width:`${i.printWidth}${widthUnit}`}}>
               <div style={{fontSize:`${i.printFontSize}${fontUnit}`,
                              textAlign:i.printPosition}}>
                     {
                     `${i.printLb}${i.printValue}`
                     }
               </div>
         </div>
         :null
   )
)

const renderArray2=(array,inputState)=>(
   array.map((i,idx)=>{
      if(i.show){
         if(i.printFieldName=="tax"||i.printFieldName=="reduction"){
               console.log(i.printFieldName)
               return(inputState[i.printFieldName].map((k,idx2)=>(
               <div key={`${idx}-${idx2}`} style={{width:`${i.printWidth}${widthUnit}`}}>
                     <div 
                           style={{fontSize:`${i.printFontSize}${fontUnit}`,
                                    textAlign:i.printPosition}}>
                           {i.printLb==""
                           ?convertToDigit(calDigit,k[`${i.printFieldName}Amount`])
                           :<div style={{display:"flex",justifyContent:"space-between"}}>
                                 <div style={{fontSize:`${i.printFontSize}${fontUnit}`}}>
                                       { `${i.printLb}  ${k[`${i.printFieldName}Name`]}`}
                                 </div>
                                 <div style={{fontSize:`${i.printFontSize}${fontUnit}`}}>
                                       {
                                       convertToDigit(calDigit,k[`${i.printFieldName}Amount`])
                                       }
                                 </div>
                                 
                              </div>
                           }
                     </div>
               </div>
                     )) 
               )      
         }
         else {
               return(
               <div key={idx} style={{width:`${i.printWidth}${widthUnit}`}}>
                     <div style={{fontSize:`${i.printFontSize}${fontUnit}`,textAlign:i.printPosition}}>
                           {i.printFieldName
                           ?i.printFieldName=="totalTax"||i.printFieldName=="totalReduction"||i.printFieldName=="total"||i.printFieldName=="grandTotal"
                                 ?`${i.printLb}${convertToDigit(calDigit,inputState[i.printFieldName])}`
                                 :`${i.printLb}${inputState[i.printFieldName]}`
                           :`${i.printLb}${i.printValue}`
                           }
                     </div>
               </div>
               )
         }
      }
   })
)

const renderTableHead=(array)=>(
   array.map((i,idx)=>(
   <div key={idx} style={{width:`${i.printWidth}${widthUnit}`}}>
         <div style={{fontSize:`${i.printFontSize}${fontUnit}`,textAlign:i.printPosition}}>
               {`${i.printLb}`}
         </div>
   </div>
   ))
)

const renderTableBody=(array,detail)=>(
   
   detail.map((i,idx1)=>(
         array.map((j,idx2)=>(
               <div key={`${idx1}-${idx2}`} 
                    style={{width:`${j.printWidth}${widthUnit}`}}>
                     <div style={{fontSize:`${j.printFontSize}${fontUnit}`,textAlign:j.printPosition}}>
                           {j.printFieldName=="result"
                           ?convertToDigit(calDigit,i[j.printFieldName])
                           :`${i[j.printFieldName]}`
                           }
                     </div>
               </div>
         ))
   ))
)


return(
   
   <div className="bd-greens" 
        style={{position:"fixed",top:"0",left:"0",zIndex:"500",
               width:`${totalWidth}${widthUnit}`,
               display:"flex",    
               flexWrap:"wrap",
               backgroundColor:"white"
            }}
   >
      {
         renderArray(pageSetup.header1)
      }

      {
         renderArray2(pageSetup.header2,transaction)
      }
      { 
         pageSetup.showTableHead&&
         renderTableHead(table1)   
      }
      {
         renderTableBody(pageSetup.table1,
                        transaction.detail)   
      }
      {
         renderArray2(pageSetup.footer1,transaction)
      }
      {
         renderArray(pageSetup.footer2)
      }

   </div>


)

}
export default PrintOut;

/*
{
   renderArray(pageSetup.header1)
}
{
   renderArray2(pageSetup.header2,transaction)
}
{  pageSetup.showTableHead&&
           renderTableHead(table1)   
}
{
   renderTableBody(pageSetup.table1,
                   transaction.detail)   
}
{
   renderArray2(pageSetup.footer1,transaction)
}
{
   renderArray(pageSetup.footer2)
}
*/