
import React from 'react';
import Table from '../../component/table/Table'
import uuid from 'react-uuid'

import {FaPlusCircle,FaRegArrowAltCircleDown,FaRegArrowAltCircleUp,
        FaBan,FaCheck
       } from 'react-icons/fa';
import {MdDelete,MdClose,MdSwapHoriz,MdSave,MdPrint,
       } from 'react-icons/md'

//import PrintOut from './PrintOut'

function PrintPageForm(props) {

const {printPageEditData,tableTemplate,pageData,
       setShow,confirmFunc2,saveTableTemplateFunc
}=props

console.log('PrintPageForm')
const calDigit=100

const convertToDigit=(calDigit,mynumber)=>{
      const temp =calDigit.toString()
      const n=Array.from(temp).length-1
      return mynumber.toFixed(n)
}

//const mynum=99
//const digit=mynum.toFixed(2)

//console.log(digit)

const tempTransaction={

id:1,  date:new Date().toISOString(),    dateOut:new Date().toISOString(),    branch:"main",
transactionType:"บิลขาย",   transactionStatus:"open",    active:true,
table:"A1", tableStatus:"open", paymentType:"เงินสด",
effectStock:"unChange", effectSpending:"unChange", effectCustomerPoint:"unChange",
partnerId:1, partnerType:"ผู้ซื้อ", title:"นาย", name:"จิตติ", phone:["0924424349 ","0459213311"], address: "12 ต.ท่าข้าม อ.นครคีรี จ.มหาสารคาม 70183",
remark:"ของแท้", total:100, totalReduction:10,
reduction:[
   { reductionName:"vat", reductionActive:true, reductionRate:7, reductionInPercentage:true, reductionAmount:100 },
   { reductionName:"vat",reductionActive:true, reductionRate:70, reductionInPercentage:false, reductionAmount:70},
],
grandTotal:280, totalTax:300,
tax:[{ taxName:"vat", taxActive:true, taxRate:7, taxInPercentage:true, taxAmount:100 },
     { taxName:"viso", taxActive:true, taxRate:10, taxInPercentage:true, taxAmount:200},
],
totalPoint:2, customerPointReduction:2,
shopId:"shopa",userId:"1",
detail:[
{ id:1, barcode:"1", productName:"สายพาน", groupId:1, groupName: "main", unit:"เส้น", 
  price:100, priceLevel:[{price:100,remark:"ทุน"}],
  quantity:1, result:100, remark:"ok", isRawMat:false, point:1, jobStatus:"open"
},
{ id:2, barcode:"2", productName:"น้ำพริก", groupId:1, groupName: "main", unit:"ถุง",
  price:50, priceLevel:[{price:50,remark:"ทุน"}],
  quantity:1, result:50, remark:"ok", isRawMat:false, point:1,jobStatus:"open",
},
]
}
//---------------------------------------
/*
const printTableTemplate={
selectedLine     :{lb:'_',type:"radio",width:40,showCol:true,showColHead:true}, 
printLb          :{lb:'หัวข้อ',type:"string",width: 120,showCol:true,showColHead:true}, 
printValue       :{lb:'ค่า',type:"string",width:120,showCol:true,showColHead:true}, 
printFieldName   :{lb:'ค่า',type:"string",width:120,showCol:true,showColHead:true},
printFontSize    :{lb:'ขนาดฟอนท์',type:"string",width:80,showCol:true,showColHead:true},
printWidth       :{lb:'ความกว้าง',type:"string",width:80,showCol:true,showColHead:true},
printPosition    :{lb:'ตำแหน่ง',type:"string",width:80,showCol:true,showColHead:true},
}  
*/

const [editData,setEditData]=React.useState(null)
const [showPrint,setShowPrint]=React.useState(false)


const setEditDataFunc=(value,e)=>{
      console.log('setEditDataFunc')
      setEditData(value)
}

const setPageSetupFunc=(value)=>{
      console.log('setPageSetupFunc')
      console.log(value)
}

const updatePageSetupFunc=(index,i)=>{
      const tableArray=["header1","header2","table1","footer1","footer2"]

      let tempObj={...pageSetup}

      tableArray.map(j=>{
            let tempArray=[]
            pageSetup[j].map((k,idx)=>{
                  if(k._id==i._id){   
                        if(i.printFieldName&&i.printValue){
                              tempArray=[...tempArray,k]    
                        }
                        else {
                              tempArray=[...tempArray,i]    
                        }
                  }
                  else{
                        tempArray=[...tempArray,k]      
                  }
            })

            tempObj={...tempObj,[j]:tempArray}
      })
      setPageSetup(tempObj)
}

const basicData={
      widthUnit:["cm","%","mm"],
      fontUnit:["em","rem","px"]
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
            //console.log('tempObj')
            //console.log(tempObj)
      return tempObj
}

const [pageSetup,setPageSetup]=React.useState(
      genDataForTable(printPageEditData))

React.useEffect(()=>{
      console.log('pageSetup')
      console.log(pageSetup)
},[pageSetup])
/*
const [pageSetup,setPageSetup]=React.useState(genDataForTable({
      widthUnit:"%",
      fontUnit:"rem",
      totalWidth:83,
      showTableHead:true,
      header1:[
            {printLb:"",printValue:"Sister Steak",                      printFontSize:"1",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"126 รามคำแหง24,บางกะปิ,",             printFontSize:"0.8",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"กรุงเทพมหานคร 10240",                printFontSize:"0.8",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"โทรศัพท์:0882224577",                 printFontSize:"0.8",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"TAX ID:1101499065873",              printFontSize:"0.8",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"-----------------------------",     printFontSize:"1.2",printWidth:"100",printPosition:"center"},

      ],
      header2:[
            {printLb:"",printFieldName:"date",printFontSize:"1",        printWidth:"100",printPosition:"left"},
            {printLb:"",printFieldName:"transactionType",               printFontSize:"1",printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"id",printFontSize:"1",          printWidth:"33",printPosition:"right"},
            {printLb:"",printFieldName:"partnerId",printFontSize:"1",   printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"name",printFontSize:"1",        printWidth:"33",printPosition:"right"},
            {printLb:"",printValue:"-----------------------------",     printFontSize:"1.2",printWidth:"100",printPosition:"center"},

      ],
      table:[
            {printLb:"Product",printFieldName:"productName",            printWidth:"33",printFontSize:"1",printPosition:"left"},
            {printLb:"Qty",printFieldName:"quantity",printFontSize:"1", printWidth:"33",printPosition:"left"},
            {printLb:"Total",printFieldName:"result",printFontSize:"1", printWidth:"33",printPosition:"left"},
      ],
      footer1:[
            {printLb:"",printValue:"-----------------------------",printFontSize:"1.2",printWidth:"100",printPosition:"center"},

            {printLb:"",printValue:"total",printFontSize:"1",printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"total",printFontSize:"1",printWidth:"33",printPosition:"left"},

            {printLb:"-",printFieldName:"tax",printFontSize:"1",printWidth:"68",printPosition:"right"},
            
            {printLb:"",printValue:"totalTax",printFontSize:"1",printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"totalTax",printFontSize:"1",printWidth:"33",printPosition:"left"},

            {printLb:"-",printFieldName:"reduction",printFontSize:"1",printWidth:"68",printPosition:"right"},

            {printLb:"",printValue:"totalReduction",printFontSize:"1",printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"totalReduction",printFontSize:"1",printWidth:"33",printPosition:"left"},

            {printLb:"",printValue:"grandTotal",printFontSize:"1",printWidth:"66",printPosition:"left"},
            {printLb:"",printFieldName:"grandTotal",printFontSize:"1",printWidth:"33",printPosition:"left"},

      ],
      footer2:[
            {printLb:"",printValue:"----------------------------",printFontSize:"1.2",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"รหัส Wifi:zzzzzzz",printFontSize:"0.8",printWidth:"100",printPosition:"center"},
            {printLb:"",printValue:"Thank you",printFontSize:"0.8",printWidth:"100",printPosition:"center"},
      ]
}))
*/
/*
const printForm={
      formHead:"ตั้งค่ากระดาษ",
      widthUnit:"Width Unit..",
      fontUnit:"Font Unit..",
      totalWidth:"Total Width..",
      showTableHead:"Show Table Head..",
      header1:"Header 1..",
      header2:"Header 2..",
      table:"Table..",
      footer1:"Footer 1..",
      footer2:"Footer 2..",
      
      printLb:"Label..",
      printValue:"Value..",
      printFieldName:"Key Name..",
      printFontSize:"Font Size..",
      printWidth:"Width..",
      printPosition:"Position.."
}
*/


const moveUp=()=>{
      if(editData){
          
            const tempRender=["header1","header2","table1","footer1","footer2"]

            let tempObj={...pageSetup}
      
            tempRender.map(i=>{
                  let tempArray=[]
                  let targetIdx=null

                  pageSetup[i].map((j,idx)=>{
                        if(j._id==editData._id){
                              targetIdx=idx
                        }
                  })
                 
                  if(targetIdx||targetIdx>0){
                        pageSetup[i].map((j,idx)=>{
                              if(idx==targetIdx-1){
                              tempArray=[...tempArray,pageSetup[i][targetIdx]]
                              }
                              else if(idx==targetIdx){
                              tempArray=[...tempArray,pageSetup[i][targetIdx-1]]
                              }
                              else {
                              tempArray=[...tempArray,j]
                              }
                        })                 
                        tempObj={...tempObj,[i]:tempArray}
                  }
            })

            //console.log('tempObj')
            //console.log(tempObj)
            setPageSetup(tempObj)
      }
  }
  
  const moveDown=()=>{
      if(editData){
            const tempRender=["header1","header2","table1","footer1","footer2"]

            let tempObj={...pageSetup}
      
            tempRender.map(i=>{
                  let tempArray=[]
                  let targetIdx=null
                  const lastIndex=pageSetup[i].length-1

                  pageSetup[i].map((j,idx)=>{
                        if(j._id==editData._id){
                              targetIdx=idx
                        }
                  })
                 
                  if((targetIdx!=null)&&(targetIdx<lastIndex)){
                        pageSetup[i].map((j,idx)=>{
                              if(idx==targetIdx){
                              tempArray=[...tempArray,pageSetup[i][targetIdx+1]]
                              }
                              else if(idx==targetIdx+1){
                              tempArray=[...tempArray,pageSetup[i][targetIdx]]
                              }
                              else {
                              tempArray=[...tempArray,j]
                              }
                        })                 
                        tempObj={...tempObj,[i]:tempArray}
                  }
            })
            setPageSetup(tempObj)
      }
  }

const deleteLine=()=>{
  if(editData){

      const tempRender=["header1","header2","table1","footer1","footer2"]

      let tempObj={...pageSetup}

      tempRender.map(i=>{
            let tempArray=[]
            pageSetup[i].map(j=>{
                  if(j._id!=editData._id){
                       tempArray=[...tempArray,j] 
                  }
            })
            tempObj={...tempObj,[i]:tempArray}
      })

      setPageSetup(tempObj)
  }
}
  
const insertLine=()=>{
  
      if(editData){
            const blankData= { printLb:"",printValue:"",printFieldName:null,
                             printFontSize:"1",printWidth:"50",
                             printPosition:"center",_id:uuid(),selectedLine:false}

            const tempRender=["header1","header2","table1","footer1","footer2"]

            let tempObj={...pageSetup}
      
            tempRender.map(i=>{
                  let tempArray=[]
                  pageSetup[i].map(j=>{
                        if(j._id==editData._id){
                              tempArray=[...tempArray,blankData,j] 
                        }
                        else {
                              tempArray=[...tempArray,j] 
                        }
                  })
                  tempObj={...tempObj,[i]:tempArray}
            })
      
            setPageSetup(tempObj)
      }
}

const {widthUnit,fontUnit,totalWidth,showTableHead,header1,header2,table1,footer1,footer2}=pageSetup

const [swapStyleRight,setSwapStyleRight]=React.useState(true)
const [printTableTemplate,setPrintTableTemplate]=React.useState(tableTemplate.printTableTemplate)

const styleRight={position:"fixed",
    top:`3rem`,right:"0.5rem",zIndex:"100",
    width:"3rem",backgroundColor:"white",
    borderRadius:"10px",margin:"1rem"
}
const styleLeft={position:"fixed",
    top:`3rem`,Left:"0.5rem",zIndex:"100",
    width:"3rem",backgroundColor:"white",
    borderRadius:"10px",margin:"1rem"
}

const renderToolBox=()=>{
      return(
          <div className="" style={swapStyleRight?styleRight:styleLeft}>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <MdDelete className="lg-icon"
                      onClick={e=>{
                        deleteLine()
                      }}
                  />
              </div>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <FaPlusCircle className="lg-icon"
                      onClick={e=>{
                          insertLine()
                      }}
                  />
              </div>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <FaRegArrowAltCircleUp className="lg-icon"
                      onClick={e=>{
                          moveUp()
                      }}
                  />
              </div>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <FaRegArrowAltCircleDown className="lg-icon"
                      onClick={e=>{
                          moveDown()
                      }}
                  />
              </div>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <MdSwapHoriz className="xl-icon"
                      onClick={e=>{
                          setSwapStyleRight(!swapStyleRight)
                      }}
                  />
              </div>
              
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <MdPrint className="xl-icon"
                      onClick={e=>{
                        //printFunc()
                        //setReloadPrint(true)
                        window.print()

                  }}
                  />
              </div>
              <div className="flex-center-center" style={{margin:"0.5rem 0"}}>
                  <MdClose className="lg-icon"
                      onClick={e=>{
                          setEditData(null)
                      }}
                  />
              </div>
          </div>
      )
  }
  
const renderArray=(array)=>(
      array.map((i,idx)=>i.show
      ? <div key={idx} style={{width:`${i.printWidth}${widthUnit}`}}>
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
            if( i.printFieldName=="tax"||i.printFieldName=="reduction"){
                  console.log(i.printFieldName)
                  return(inputState[i.printFieldName].map((k,idx2)=>(
                  <div key={`${idx}-${idx2}`} style={{width:`${i.printWidth}${widthUnit}`}}>
                        <div 
                             style={{fontSize:`${i.printFontSize}${fontUnit}`,
                                     textAlign:i.printPosition}}>
                              {i.printLb==""
                              ?convertToDigit(calDigit,k[`${i.printFieldName}Amount`])
                              :<div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div
                                          style={{fontSize:`${i.printFontSize}${fontUnit}`}}
                                    >
                                          { `${i.printLb}  ${k[`${i.printFieldName}Name`]}`}
                                    </div>
                                    <div
                                            style={{fontSize:`${i.printFontSize}${fontUnit}`}}
                                    >
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


const renderForm=()=>{
  const temp=Object.keys(pageSetup)
  
  return temp.map((i,idx)=>{

      if(i=="widthUnit"||i=="fontUnit") {
            return (    
            <div key={idx} className="flex-center-center jc-start w-50" 
                  style={{padding:"0.3rem",display:"flex",justifyContent:"flex-start",alignItems:"center"}} >
                  <div className="xc4">
                        {pageData.printForm[i]}
                  </div>
                  <select className="xc8">
                    {
                        basicData[i].map((j,idx2)=>(
                              <option key={idx2}
                                      selected={j==pageSetup[i]?"selected":""}
                              >{j}</option>
                        ))     
                    }
                  </select>
            </div>
            )
      }
      else if(i=="totalWidth"){
            return (    
                  <div key={idx} className="flex-center-center jc-start w-50" 
                        style={{padding:"0.3rem",display:"flex",justifyContent:"flex-start",alignItems:"center"}} >
                        <div className="xc4">
                              {pageData.printForm[i]}
                        </div>
                        <input className="xc8"
                              value={pageSetup[i]}
                              type="number"
                              onChange={e=>setPageSetup({...pageSetup,
                                    [i]:e.target.value
                              })}
                        />
                  </div>
            )
      }
      else if(i=="showTableHead"){
            return (    
            <div key={idx} className="flex-center-center jc-start w-50" 
                  style={{padding:"0.3rem",display:"flex",justifyContent:"flex-start",alignItems:"center"}} >
                  <div className="xc4">
                        {pageData.printForm[i]}
                  </div>
                  <div className="xc8">
                        <input 
                              type="checkbox"
                              style={{height:"1.4rem",padding:"0",margin:"0"}}
                              checked={pageSetup[i]}
                              
                              onChange={e=>setPageSetup({...pageSetup,
                                    [i]:e.target.checked
                              })}
                        />
                  </div>
                 
            </div>
            )
      }
      else if(i=="header1"||i=="header2"||i=="table1"||i=="footer1"||i=="footer2"){
            const fieldArray=["lb","value","fieldName","fontSize","width","position"]
            return(
            <div key={idx} className="w-100">
                  <div className="w-100" 
                       style={{padding:"0.3rem",display:"flex",justifyContent:"flex-start",alignItems:"center"}} >
                         {pageData.printForm[i]}
                  </div>

                  {printTableTemplate&&
                    <Table
                        tableTemplate={printTableTemplate}
                        setTableTemplate={setPrintTableTemplate}
      
                        filterData={pageSetup[i]}//{filterData.data0}
                        setFilterData={setPageSetupFunc}//{setFilterDataData0}
                        
                        editData={editData}//{filterData.editData}
                        setEditData={setEditDataFunc}//{setEditData}
                        saveTableTemplateFunc={saveTableTemplateFunc}
                        isSubTable={false}
                        updateFilterData={updatePageSetupFunc}
                        useInput={true}
                        pageData={pageData.tableSettingModal}
                  />
                  }

            </div>
            )
      }
   })
}
//======================
const renderFooter=()=>{
      return(
      <div  className=""
            style={{display:"flex",
                   position:"fixed",
                   bottom:"1rem",right:"2rem",zIndex:"100"}}
      >
          <div>
              <button
                  onClick={e=>{
                        if(confirmFunc2){
                          confirmFunc2(pageSetup)
                        }
                  }}
              >
                  <FaCheck/>
              </button>
          </div>
          
          <div>
              <button
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
//======================

//======================
return(
<div style={{width:"100%"}}>
      <div className="bd-green" 
                  style={{//position:"fixed---",top:"0",left:"0",
                              margin:"0",
                              width:`${totalWidth}${widthUnit}`,
                              display:"flex",    
                              flexWrap:"wrap",
                              }}>
                  {
                        renderArray(header1)
                  }
                  {
                        renderArray2(header2,tempTransaction)
                  }
                  { showTableHead&&
                        renderTableHead(table1)   
                  }
                  {
                        renderTableBody(table1,tempTransaction.detail)   
                  }
                  {
                        renderArray2(footer1,tempTransaction)
                  }
                  {
                        renderArray(footer2)
                  }

      </div>

      <div className="w-100 hide-on-print">
            {
            renderForm()
            }
      </div>
     
      <div className="w-100 hide-on-print">
            {editData&&
            renderToolBox()   
            }
      </div>
    
       <div className="w-100 hide-on-print">
            {
            renderFooter()
            }
       </div>

      {/*
       ?<div className="hide-on-screen">
            <PrintOut
                  printPage={[pageSetup]}
                  printPageSetting={pageSetup.printPageName}
                  calDigit={100}
                  trasaction={tempTransaction}
            />
       </div>
       :null
      */}
     
</div>
)

}



export default PrintPageForm;
