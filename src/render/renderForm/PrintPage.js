import React from 'react';
import {MdEdit} from 'react-icons/md';
import {FaPlusSquare,FaMinusSquare,FaBan,FaCheck} from 'react-icons/fa'; 
import PrintPageForm from './PrintPageForm';
import PrintOut from './PrintOut'

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




function PrintPage(props) {

const {pageData,setShow,submitFunction,submitFunction2,
       printPage,basicData,tableTemplate,
       addPrintPage,deletePrintPage,saveTableTemplateFunc
}=props

const refSubmitForm=React.createRef() //ตกลง
const refCancelForm=React.createRef() //ยกเลิก    

console.log('printPage')
console.log(printPage)

const getRefArray=(array)=>{
    let tempRefArray=[]

    if(Array){
        if(Array.isArray(array)){
            array.map(k=>{
                tempRefArray=[...tempRefArray,React.createRef()]
            })
        }
    }
    
    return tempRefArray
}


let [filterData,setFilterData]=React.useState(printPage)
React.useEffect(()=>{
    console.log('filterData')
    console.log(filterData)
},[filterData])

const [editData,setEditData]=React.useState(null)

const [refOfInputState,setRefOfInputState]=React.useState(getRefArray(printPage))


//===========================
const changeInputState=(e,idx)=>{

    let tempArray=[]
    filterData.map((j,idx2)=>{
        if(idx==idx2){
            const tempObj={...j,printPageName:e.target.value}
            tempArray=[...tempArray,tempObj]
        }
        else{
            tempArray=[...tempArray,j]
        }
    })

    setFilterData(tempArray)
}
//============================
const confirmFunc2=(pageSetup)=>{

    submitFunction2(pageSetup,filterData)
}
//=======================
//===========================
const renderBody=(obj)=>{
   
return (
<div 
    className="hide-on-print w-100 flex-center-start jc-start" 
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
                                 deletePrintPage(i.printId)
                               }}
                           />
                       </div> 
                       :<div className="w-10">
                            <FaPlusSquare className="sm-icon"
                                onClick={e=>{
                                   addPrintPage(filterData)
                                }}
                            />
                        </div>
                       
                        }
                        <div className="w-70">
                            <input
                                type="text"
                                ref={refOfInputState[idx]}

                                onKeyDown={e=>{
                                  
                                    
                                    if(e.key=="Enter"){
                                        if(idx==filterData.length-1){
                                            refSubmitForm.current.focus()
                                        }
                                        else{
                                            refOfInputState[idx+1].current.focus()
                                        }
                                    }
                                    
                                }}


                                value={i.printPageName}
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
                            submitFunction(filterData)
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
//===========================
return(
<div>
    {
    editData&&
    <div className="hide-on-screen">
        <PrintOut 
                printPage={[editData]}
                printPageSetting={editData.printPageName}
                transaction={tempTransaction}
                calDigit={100}
        />  
    </div>
    }
    <div className="Modal-background hide-on-print">
        {editData
        ?null
        :<div className="Modal-box" 
            style={{paddingBottom:"1rem",minWidth:"70%",minHeight:"30%"}}>
        
            <div className="w-100 hide-on-print">
                <div className="flex-center-center">
                    <h5>{`${pageData.setting.printPage}`}</h5>   
                </div>     
            </div>

            <div className="Modal-body hide-on-print" >
                    <div className="ModalInsideBody">
                        {
                            renderBody()
                        }
                    </div>
            </div>     
        </div>
        
        }

        {editData&&
        <div className="Modal-box hide-on-print"
            style={{width:"100%",height:"100%",padding:"0"}}
        >
            <PrintPageForm
                    printPageEditData={editData}
                    tableTemplate={tableTemplate}
                    pageData={pageData}
                    setShow={setShow}
                    confirmFunc2={confirmFunc2}
                    saveTableTemplateFunc={saveTableTemplateFunc}
            />    
        </div>
        }
   
    </div>

   


</div>

)

}
export default PrintPage;
