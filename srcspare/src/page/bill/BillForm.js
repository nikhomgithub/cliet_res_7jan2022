import React from 'react';
import Table from '../../component/table/Table'
import tableUtil from '../../component/table/tableUtil';
import {FaBan} from 'react-icons/fa';

import uuid from 'react-uuid';
import EditBillForm from './EditBillForm';
import axiosUtil from '../../util/axiosUtil';
import axios from 'axios';
import Ticon from '../../component/ticon/Ticon';

const {numberWithCommas}=tableUtil
const {genId}=axiosUtil

function BillForm(props) {

const {blankData,dataIdx,closeBillForm,
       //data,
       billFormData,setBillFormData,

       selectOfSelectProduct,selectOfCustomer,
       setResetProductList,calDigit,pageData,basicData,tableTemplate,
       saveTableTemplateFunc,
       submitFunctionAddFunc,
       submitFunctionEditFunc,
       submitFunctionDeleteFunc,
       runIsGenId,
       isGenIdOfBillForm,
       updateData,
       myheader,
       setPrintDataFunc,
       bgColor,
       
       test,setTest

       }=props

const blankDetail={
    _id:uuid(),
    id:"",barcode:"",productName:"",
    groupId:"",groupName:"",
    unit:"",price:0,
    priceLevel:[{price:0,remark:""}],
    quantity:0,result:0,remark:"",isRawMat:false,
    point:0,
    partnerId:"",name:"",jobStatus:"open",
    detailTime:""
}

const {billForm}=pageData
/*
const billForm={
    formHead:"",
    id:"ID",
    date:"Date",
    time:"Time",
    table:"Table",
    partnerId:"Partner ID",
    phone:"Phone",
    address:"Address",
    total:"Total",
    totalTax:"Total Tax",
    totalReduction:"Total Reduction",
    grandTotal:"GrandTotal"
}
*/

React.useEffect(()=>{
    //console.log('selectOfSelectProduct')
    //console.log(selectOfSelectProduct)
    if(selectOfSelectProduct&&billFormData){
        if(selectOfSelectProduct.dataIdx==dataIdx){
            
            const tempArray=[...billFormData.detail,...selectOfSelectProduct.selectProduct]
            setBillFormData({...billFormData,
                reCal:true,
                detail:tempArray
            })    
        }
    }
},[selectOfSelectProduct])

React.useEffect(()=>{
    
    if(selectOfCustomer&&billFormData){
        if(selectOfCustomer.dataIdx==dataIdx){
            
            //const tempArray=[...billFormData.detail,...selectOfSelectProduct.selectProduct]
            setBillFormData({...billFormData,
                ...selectOfCustomer.selectCustomer
            })    
        }
    }
},[selectOfCustomer])

/*
const genBillFormData=(data)=>{
    console.log('genBillFormData')
    //console.log(data)
    if(!data){return null}
    //console.log(1)
    if(!data.detail){return data}
    //console.log(2)
    if(!Array.isArray(data.detail)){return data}
    //console.log(3)
    if(data.detail.length==0){return data}

    return data
}
*/

const [showEditBillForm,setShowEditBillForm]=React.useState(false)

//const [billFormData,setBillFormData]=React.useState(genBillFormData(data))//({...data,reCal:true})

const [editData,setEditData]=React.useState(null)

let [formTableTemplate,setFormTableTemplate]=React.useState(tableTemplate)

React.useEffect(()=>{
    console.log('editData')
    console.log(editData)
},[editData])


React.useEffect(()=>{
    
    if(billFormData){
        //console.log(`billFormData..${billFormData.name}.....`)
        //console.log(billFormData)

        if(billFormData.reCal){

            let tempTotal=0
            let tempTotalPoint=0
            let tempTotalTax=0
            let tempTotalReduction=0
            let tempGrandTotal=0
            let tempReductCustomerPoint=0

            const {tax,reduction,detail,reductCustomerPoint}=billFormData
            
            detail.map(i=>{
                if(i.quantity&&i.price){
                    const tempPrice=parseInt(i.price*calDigit)/calDigit
                    const tempQuantity=parseInt(i.quantity*calDigit)/calDigit

                    const temp=tempPrice*tempQuantity
                    let tempResult=parseInt(temp*calDigit)/calDigit
                    tempTotal=tempTotal+tempResult
                }

                if(i.point){
                    const tempPoint=parseInt(i.point*calDigit)/calDigit
                    const tempQuantity=parseInt(i.quantity*calDigit)/calDigit
                    let temp=tempPoint*tempQuantity
                    temp=parseInt(temp*calDigit)/calDigit
                    tempTotalPoint=tempTotalPoint+temp
                }

            })
        
            let tempTaxArray=[]

            tax.map(i=>{
                if(i.taxActive){
                    if(i.taxInPercentage){
                        let temp=tempTotal*i.taxRate/100
                        const tempTaxAmount=parseInt(temp*calDigit)/calDigit
                        tempTotalTax=tempTotalTax+tempTaxAmount

                        let tempObj={...i,taxAmount:tempTaxAmount}
                        tempTaxArray=[...tempTaxArray,tempObj]
                    }
                    else{
                        const tempTaxAmount=parseInt(i.taxAmount*calDigit)/calDigit
                        tempTotalTax=tempTotalTax+tempTaxAmount

                        let tempObj={...i,taxAmount:tempTaxAmount}
                        tempTaxArray=[...tempTaxArray,tempObj]
                    }
                }
            })

            let tempReductionArray=[]
            
            reduction.map(i=>{
                if(i.reductionActive){
                    if(i.reductionInPercentage){
                        let temp=tempTotal*i.reductionRate/100
                        const tempReductionAmount=parseInt(temp*calDigit)/calDigit
                        tempTotalReduction=tempTotalReduction+tempReductionAmount

                        let tempObj={...i,taxAmount:tempReductionAmount}
                        tempReductionArray=[...tempReductionArray,tempObj]
                    }
                    else{
                        const tempReductionAmount=parseInt(i.reductionAmount*calDigit)/calDigit
                        tempTotalReduction=tempTotalReduction+tempReductionAmount

                        let tempObj={...i,taxAmount:tempReductionAmount}
                        tempReductionArray=[...tempReductionArray,tempObj]
                    }
                }
            })
           
            tempGrandTotal=tempTotal-tempTotalReduction+tempTotalTax
            
            if(reductCustomerPoint){
                tempReductCustomerPoint=parseInt(reductCustomerPoint*calDigit)/calDigit
            }

            let temp={
                reCal:false,
                total:tempTotal,
                totalTax:tempTotalTax,
                totalReduction:tempTotalReduction,
                grandTotal:tempGrandTotal,
                totalPoint:tempTotalPoint,
                reductCustomerPoint:tempReductCustomerPoint,
                tax:tempTaxArray,
                reduction:tempReductionArray
            }
            
            //console.log('reCal')
            //console.log(temp)

            setBillFormData({...billFormData,...temp})
        }
    }
},[billFormData])

React.useEffect(()=>{
    //console.log('billFormData')
    //console.log('formTableTemplate')
   // console.log(formTableTemplate)
},[formTableTemplate])


const runGenId=()=>{
    setBillFormData({
        ...billFormData,
        isGenId:true
    })
}

const findDateTime=(date)=>{
    const date1=new Date(date).toISOString()

    const date3=new Date(date1).toLocaleString('en-GB')

   const tempDate= date3.substring(0,10)
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

const setTableTemplateFunc=(value)=>{
    //console.log('setTableTemplateFunc')
    setFormTableTemplate(value)
}
//id,date,branch,
//transactionType,transactionStatus,active
//table,tableStatus
//partnerId,title,name,phone,address,

const setFilterDataFunc=(value)=>{
    console.log('setFilterDataFunc')
    //console.log(value)
}

const setEditDataFunc=(value)=>{
    console.log('setEditDataFunc')

    billFormData.detail.map(i=>{
        if(i._id==value._id){
            setEditData(i)
        }
    })
}


const moveUp=()=>{
    if(editData){
        
        let tempArray=[]
        let targetIdx=null

        billFormData.detail.map((i,idx)=>{
            if(i._id==editData._id){
                targetIdx=idx
            }
        })

        if((targetIdx!=null)&&(targetIdx>0)){
            
            billFormData.detail.map((i,idx)=>{
               
                if(idx==targetIdx-1){
                    tempArray=[...tempArray,billFormData.detail[targetIdx]]
                }
                else if(idx==targetIdx){
                    tempArray=[...tempArray,billFormData.detail[targetIdx-1]]
                }
                else {
                    tempArray=[...tempArray,i]
                }

            })
            setBillFormData({...billFormData,detail:tempArray})
        }
    
    }
}

const moveDown=()=>{
    if(editData){
        
        let tempArray=[]
        let targetIdx=null
        const lastIndex=billFormData.detail.length-1

        billFormData.detail.map((i,idx)=>{
            if(i._id==editData._id){
                targetIdx=idx
            }
        })

        if((targetIdx!=null)&&(targetIdx<lastIndex)){
            
            billFormData.detail.map((i,idx)=>{
               
                if(idx==targetIdx){
                    tempArray=[...tempArray,billFormData.detail[targetIdx+1]]
                }
                else if(idx==targetIdx+1){
                    tempArray=[...tempArray,billFormData.detail[targetIdx]]
                }
                else {
                    tempArray=[...tempArray,i]
                }

            })
            setBillFormData({...billFormData,detail:tempArray})
        }
    
    }
}

const deleteLine=()=>{
    if(editData){

    let tempArray=[]

        billFormData.detail.map((i,idx)=>{
            if(i._id!=editData._id){
                tempArray=[...tempArray,i]
            }
        })

        setBillFormData({...billFormData,reCal:true,detail:tempArray})
    }
}

const insertLine=()=>{

    if(editData){

        let tempArray=[]

        billFormData.detail.map((i,idx)=>{
            if(i._id==editData._id){
                const tempObj=blankDetail
                tempArray=[...tempArray,
                    {...tempObj,_id:uuid(),detailTime:new Date().toISOString()},
                    i]
            }
            else{
                tempArray=[...tempArray,i]
            }
        })
        //console.log(tempArray)
        setBillFormData({...billFormData,reCal:true,detail:tempArray})
    }
    
}

const updateFilterData=(idx,value)=>{
    console.log('updateFilterData,,,,,,,,,,,,')
    //console.log(value)
    let tempDetail=billFormData.detail
    tempDetail[idx]=value

    setBillFormData({...billFormData,
        reCal:true,
        detail:tempDetail
    })
}

const mergeUp=()=>{

    let tempArray=[]

    billFormData.detail.map(i=>{
        tempArray=[...tempArray,i.id]
    })

    let uniqueArray = [...new Set(tempArray)];
    uniqueArray=uniqueArray.sort()

    let tempDetail=[]

    uniqueArray.map(i=>{
        let tempQuantity=0
        let tempResult=0
        let tempObj=null
        billFormData.detail.map(j=>{
            
            if(j.id==i){
                tempQuantity=tempQuantity+j.quantity
                tempResult=tempResult+j.result
                tempObj={...j,quantity:tempQuantity,result:tempResult}    
            }
        })
        if(tempObj){
            tempDetail=[...tempDetail,tempObj]
        }
    })

    setBillFormData({...billFormData,reCal:true,detail:tempDetail})

}
//------------------------------------
const rawUp=()=>{
    console.log('rawUp..........1.')

    if(editData){
        if(editData.hasDetailProduct){
            console.log('rawUp..........2.')
            axios.post(`/p35product/getlimit`,{id:editData.id},myheader)
            .then(result=>{
                //console.log('result')
                const foundProduct=result.data.data[0]
                //console.log(foundProduct)

                if(foundProduct){
                    if(foundProduct.detail){
                        if(Array.isArray(foundProduct.detail)){

                            let tempArray=[]

                            foundProduct.detail.map(i=>{
                                const tempQEditData=parseInt(editData.quantity*calDigit)/calDigit
                                const tempQi=parseInt(i.quantity*calDigit)/calDigit
                                const tempQ1=tempQEditData*tempQi
                                const tempQ2=parseInt(tempQ1*calDigit)/calDigit

                                const tempPrice=parseInt(i.price*calDigit)/calDigit
                                const tempResult1=tempPrice*tempQ2
                                const tempResult2=parseInt(tempResult1*calDigit)/calDigit

                                const tempObj={...i,_id:uuid(),
                                        selectedLine:false,
                                        priceLevel:[{price:0,remark:""}],
                                        jobStatus:"open",
                                        quantity:tempQ2,
                                        result:tempResult2
                                    }
                                tempArray=[...tempArray,tempObj]
                            })
            
                            let tempDetail=[]
                            billFormData.detail.map(i=>{
                                if(i._id==editData._id){
                                    tempDetail=[...tempDetail,...tempArray]
                                }
                                else{
                                    tempDetail=[...tempDetail,i]
                                }
                            })
            
                            setBillFormData({...billFormData,reCal:true,detail:tempDetail})
                            setEditData(null)

                        }
                    }
                }
              
            })
            .catch(error=>{
                console.log('error')
                console.log(error)
                /*
                const tempError={...filterData,
                    reloadData:false,
                    message:catchErrorToMessage(error),
                    showModalConfirm:false,
                    showModalError:true,
                }
                console.log(tempError.message)
                setFilterData(tempError)
                */
            })
            
        }
    }
}

//------------------------------------
const findProductIdByKeyDown=(e,j,inputStateJ,idx)=>{
    if(e.key=="Enter"){
        axios.post('/p35product/getlimit',{id:e.target.value},myheader)
        .then(result=>{
            if(result.data.count>=1){
                const {id,barcode,productName,
                    groupId,groupName,unit,price,priceLevel,
                    remark,isRawMat,
                } = result.data.data[0]

                const tempObj={
                    _id:uuid(),
                    id:id,barcode:barcode,productName:productName,
                    groupId:groupId,groupName:groupName,unit:unit,
                    price:price,priceLevel:priceLevel,
                    remark:remark,isRawMat:isRawMat,
                    quantity:0,result:0,
                    partnerId:billFormData.partnerId,
                    name:billFormData.name,
                    jobStatus:"open"
                }

                let tempArray=[]

                billFormData.detail.map((i,index)=>{
                    if(index==idx){
                        tempArray=[...tempArray,tempObj]
                    }
                    else {
                        tempArray=[...tempArray,i]
                    }
                })
                setBillFormData({...billFormData,
                    detail:tempArray
                })
            }
        })
        .catch(error=>{
            console.log('error')
        })
    }
}

const findBarcodeByKeyDown=(e,j,inputStateJ,idx)=>{
    if(e.key=="Enter"){
        axios.post('/p35product/getlimit',{barcode:e.target.value},myheader)
        .then(result=>{
            if(result.data.count>=1){
                const {id,barcode,productName,
                    groupId,groupName,unit,price,priceLevel,
                    remark,isRawMat,
                } = result.data.data[0]

                const tempObj={
                    _id:uuid(),
                    id:id,barcode:barcode,productName:productName,
                    groupId:groupId,groupName:groupName,unit:unit,
                    price:price,priceLevel:priceLevel,
                    remark:remark,isRawMat:isRawMat,
                    quantity:0,result:0,
                    partnerId:billFormData.partnerId,
                    name:billFormData.name,
                    jobStatus:"open"
                }

                let tempArray=[]

                billFormData.detail.map((i,index)=>{
                    if(index==idx){
                        tempArray=[...tempArray,tempObj]
                    }
                    else {
                        tempArray=[...tempArray,i]
                    }
                })
                setBillFormData({...billFormData,
                    detail:tempArray
                })
            }
        })
        .catch(error=>{
            console.log('error')
        })
    }
}

const addSelectOfSelectProduct=()=>{
    if(selectOfSelectProduct){
        if(selectOfSelectProduct.length>0){

            let tempSelectOfSelectProduct=[]
            selectOfSelectProduct.map(i=>{
                if(i.quantity>0){
                    const tempPrice=parseInt(i.price*calDigit)/calDigit
                    const tempQuantity=parseInt(i.quantity*calDigit)/calDigit

                    const tempObj={
                        ...i,
                        _id:uuid(),
                        price:tempPrice,
                        quantity:tempQuantity,
                        result:parseInt(tempPrice*tempQuantity*calDigit)/calDigit
                    }
                    tempSelectOfSelectProduct=[...tempSelectOfSelectProduct,tempObj]
                }
            })

            let tempArray=[]
            let targetIdx = null

            billFormData.detail.map((i,idx)=>{
                if(i._id==editData._id){
                
                    targetIdx=idx
                }
            })

            if(targetIdx>=0){
                billFormData.detail.map((i,idx)=>{
                    if(idx<targetIdx){
                        tempArray=[...tempArray,i]
                    }
                    else if(idx==targetIdx){
                        tempArray=[...tempArray,i,...tempSelectOfSelectProduct]
                    }
                    else {
                        tempArray=[...tempArray,i]
                    }
                })
            }

            setBillFormData({...billFormData,detail:tempArray})
            setResetProductList(true)

        }
    }

}

const editBillFormSubmitFunc=(data)=>{
    updateData(data)
    setBillFormData(data)
    setShowEditBillForm(false)
}
const editBillFormCancelFunc=()=>{
    setShowEditBillForm(false)
}

//==================================
const renderButton=()=>{
   
return(

    <div className="hide-on-print"
        style={{height:"100%",width:"100%",display:"flex",
                justifyContent:"flex-start",alignItems:"center",
                //backgroundColor:bgColor
                //background: "rgb(233,187,67)",
                //background: "linear-gradient(90deg, rgba(233,187,67,1) 0%, rgba(172,124,66,1) 100%)"
                background:"rgb(240,207,121)",
                background:"linear-gradient(90deg, rgba(240,207,121,1) 0%, rgba(153,106,48,1) 100%)"
             }}
    >


        <button  style={{marginRight:"1.2rem"}}
            onClick={e=>{
                closeBillForm(billFormData)
            }}
        >{dataIdx=="cancel"
         ?<FaBan/>
         :dataIdx
        }
        </button>


        <div className="iconbox"
            onClick={async(e)=>{
                //console.log('Add......................')
   
            try{
                console.log('plus....')
                const result=await axios.post('/p35transaction/getlimit',
                                    {limitRow:1,sort:{id:-1}},
                                    myheader) 
                
                //console.log('result........')
                //console.log(result)
                const result2=await axios.post('/p35partner/getlimit',
                                    {id:basicData.defaultCustomerId},
                                    myheader) 
                //console.log('customer...vvvvv...')
                //console.log(result2)

                let customer={
                    partnerType:"",
                    id:null,
                    title:"",
                    name:"",
                    phone:[],
                    address:""
                }  
                
                if(result2.data.data[0]){
                    customer=result2.data.data[0]
                    customer={...customer,address:customer.address[0]}
                }

                let nextQueue=1

                let lastBill=null

                if(result.data.data[0]){
                    console.log('result.data.data[0]')
                    lastBill=result.data.data[0]
                    let toDate=new Date().toISOString()
                    toDate=new Date(toDate).toLocaleString('en-GB').substring(0,10)
                    
                    let lastBillDate=new Date(lastBill.date).toISOString()
                    lastBillDate=new Date(lastBillDate).toLocaleString('en-GB').substring(0,10)
                         
                    if(lastBillDate==toDate){
                        nextQueue=lastBill.queue+1
                    }
                 
                }

                //=============================
   
                //console.log(result.data.data[0].queue)
                let tempTaxArray=[]
                basicData.tax.map(i=>{
                    if(i.taxActive){
                        const tempObj={...i,taxAmount:0}
                        tempTaxArray=[...tempTaxArray,tempObj]
                    }
                })

                let tempReductionArray=[]
                basicData.reduction.map(i=>{
                    if(i.reductionActive){
                        const tempObj={...i,reductionAmount:0}
                        tempReductionArray=[...tempReductionArray,tempObj]
                    }
                })

                //============================
                setBillFormData({...blankData,
                    id:genId(),
                    date:new Date().toISOString(),
                    queue:nextQueue,
                    queueStatus:"open",
                    //branchId:basicData.branchId,
                    //branchName:basicData.branchName,
                   
                    partnerId:customer.id,
                    partnerType:customer.partnerType,
                    title:customer.title,
                    name:customer.name,
                    phone:customer.phone,
                    address:customer.address,

                    transactionType:basicData.transaction[0].transactionType,
                    effectSpending:basicData.transaction[0].effectSpending,
                    effectCustomerPoint:basicData.transaction[0].effectCustomerPoint,
                    effectStock:basicData.transaction[0].effectStock,
                    tax:tempTaxArray,
                    reduction:tempReductionArray,
                    reCal:true
                })
                runIsGenId(true)

                
               
            }
            catch (error){
                console.log('error......')
                console.log(error)
            }         
            
            }}
        >
            <Ticon
                iconName="MdAddCircle" 
                className="md-icon" 
                textStyle={{color:"black"}}
            />
        </div>

        {billFormData&&
        <div className="iconbox"
            onClick={e=>{
                setShowEditBillForm(true)
            }}
        >
            <Ticon
                iconName="MdEdit" 
                className="md-icon" 
                textStyle={{color:"black"}}
            /> 
        </div>
        }
        {billFormData&&   
        <div className="iconbox"
            onClick={e=>{
                //console.log('isGenIdOfBillForm')
                //console.log(isGenIdOfBillForm)
                if(isGenIdOfBillForm){
                    submitFunctionAddFunc(billFormData)
                }
                else {
                    submitFunctionEditFunc(billFormData)
                }
            }}
        >
            <Ticon
                iconName="MdSave" 
                className="md-icon"
                textStyle={{color:"black"}}    
            />
        </div>
        }

        {billFormData&&
        <div className="iconbox"
            onClick={e=>{
                submitFunctionDeleteFunc(billFormData)
            }}
        >
            <Ticon
                iconName="MdDelete" 
                className="md-icon"
                textStyle={{color:"black"}}
            />
        </div>
        }
        {billFormData&&
        <div className="iconbox"
            onClick={e=>{
                setPrintDataFunc(billFormData)
            }}
        >
            <Ticon
                iconName="MdPrint" 
                className="md-icon" 
                textStyle={{color:"black"}}
            /> 
        </div>
        }
    </div>
)

}
//=================================


//-----------------------------------
const renderHeader=()=>{

    const {id,date,remindDate,branch,transactionType,transactionStatus,active,
           table,tableStatus,partnerId,title,name,phone,address,queue,queueStatus
    }=billFormData


    return(
        <div className="h-100 w-100" 
             style={{padding:"0 0.5rem",
                     backgroundColor:"#f5e7a1"}}>
            <div className="flex-center-center jc-space-between">
                <div style={{color:"red"}}>{`${transactionType} ${billForm.id}: ${id} (${transactionStatus})`}</div>
                <div style={{color:"blue"}}>{`${billForm.date}: ${findDateTime(date).date} ${billForm.time}: ${findDateTime(date).time}`}</div>
                <div style={{color:"green"}}>{`${billForm.table}: ${table}(${tableStatus})`}</div>
                <div style={{color:"brown"}}>{`${billForm.queue}: ${queue}(${queueStatus})`}</div>
            </div>
            <div className="flex-center-center jc-space-between">
                <div>{`${billForm.partnerId}:${partnerId}`}</div>
                <div>{`${title} ${name}`}</div>
                <div>{`${billForm.phone}: ${genArrayToString(phone)}`}</div>
                <div>{`${billForm.address}: ${address}`}</div>
            </div>

        </div>
    )
}

//------------------------------
//------------------------------
const renderTable=()=>{

    return(
    <div className='h-100 w-95'>
        <Table
            colorHead={"#ac7c42"}
            tableTemplate={formTableTemplate}
            setTableTemplate={setTableTemplateFunc}

            filterData={billFormData.detail}
            setFilterData={setFilterDataFunc}//{setFilterDataData0}
            
            editData={editData}
            setEditData={setEditDataFunc}//{updateEditData}
            saveTableTemplateFunc={saveTableTemplateFunc}
            isSubTable={false}
            useInput={true}
            updateFilterData={updateFilterData}//{updateEditData}

            basicData={basicData}

            findProductIdByKeyDown={findProductIdByKeyDown}
            findBarcodeByKeyDown={findBarcodeByKeyDown}
            calDigit={calDigit}
        />
    </div>
    )
    
}
const styleRight={
  position:"fixed",
  top:"3rem",right:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}
const styleLeft={position:"fixed",
  top:"3rem",Left:"0.5rem",zIndex:"100",
  width:"",backgroundColor:"white",
  borderRadius:"10px",margin:""
}

const mystyle={
    width:"5%",
    zIndex:"100",
    backgroundColor:"#dbac50"//"#f5e7a1"
    //background:"rgb(250,226,165)",
    //background: "linear-gradient(183deg, rgba(250,226,165,1) 0%, rgba(236,193,61,1) 100%)"
}

const [swapStyleRight,setSwapStyleRight]=React.useState(true)

const renderToolBox=()=>{
    return(
    <div //style={swapStyleRight?styleRight:styleLeft}
             style={mystyle}
    >   
        {editData&&
        <div className='w-100 h-100'>

            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    deleteLine()
                }}
            >
                <Ticon
                    iconName="MdDelete" 
                    className="md-icon"
                    textStyle={{color:"black"}} 
                />
            </div>
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    insertLine()
                }}
            >
                <Ticon
                    iconName="MdAddCircle" 
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    moveUp()
                }}
            >
                <Ticon
                    iconName="FaRegArrowAltCircleUp" 
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>

            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                onClick={e=>{
                    moveDown()
                }}
            >
                <Ticon
                    iconName="FaRegArrowAltCircleDown" 
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            {/*
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                onClick={e=>{
                    setSwapStyleRight(!swapStyleRight)
                }}
            >
                <Ticon
                    iconName="MdSwapHoriz" 
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>
            */}
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    mergeUp()
                    //setSwapStyleRight(!swapStyleRight)
                 }}
            >
                <Ticon 
                    iconName="MdMergeType" 
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>

            {editData.hasDetailProduct&&
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    rawUp()
                    //setSwapStyleRight(!swapStyleRight)
                 }}
            >
                <Ticon
                    iconName="MdRawOn" 
                    className="md-icon"
                    textStyle={{color:"black"}} 
                />
            </div>
            }
            
            <div className="iconbox2"
                 style={{height:"2.5rem"}}
                 onClick={e=>{
                    setEditData(null)
                    updateData(billFormData)
                 }}
            >    
                <Ticon
                    iconName="MdClose"
                    className="md-icon"
                    textStyle={{color:"black"}}
                />
            </div>
        
        </div>
        }
    </div>
    )
}

const renderFooter=()=>{

    const {total,totalReduction,reduction,totalTax,tax,grandTotal,
           paymentType
    }=billFormData
 return(
     <div className="h-100 w-100 flex-center-center" 
          style={{padding:"0 0.5rem",backgroundColor:"#f5e7a1"}}>
            <div className="xc6" style={{textAlign:"start"}}>  
                {
                    tax.map((i,idx)=>{
                        return (
                            <div>
                                {`${i.taxName} = ${numberWithCommas(i.taxAmount,calDigit,"taxAmount")}`}
                            </div>
                        )
                    })
                }
                {
                    reduction.map((i,idx)=>{
                        return (
                            <div>
                                {`${i.reductionName} = ${numberWithCommas(i.reductionAmount,calDigit,"reductionAmount")}`}
                            </div>
                        )
                    })
                }
            </div>
         
            <div  className="xc6" style={{textAlign:"end"}}>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{padding:"0 0.5rem",backgroundColor:"#8cc5bb"}}>
                    {`${billForm.total} = ${numberWithCommas(total,calDigit,"total")}`}
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{padding:"0 0.5rem",backgroundColor:""}}>
                    {`${billForm.totalTax} = ${numberWithCommas(totalTax,calDigit,"totalTax")}`}
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{padding:"0 0.5rem",backgroundColor:""}}>
                    {`${billForm.totalReduction} = ${numberWithCommas(totalReduction,calDigit,"totalReduction")}`}
                    </div>    
                </div>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{padding:"0 0.5rem",backgroundColor:"#a7c6eb",fontSize:"1.4rem"}}>
                        {`${billForm.grandTotal} = ${numberWithCommas(grandTotal,calDigit,"grandTotal")}`}
                    </div>
                </div>
            </div>

     </div>
 )

}

//------------------------------
const renderForm=()=>{
    return (
        <div className="w-100 h-100">
            <div className="w-100 h-5">
                {
                 renderButton()
                }

            </div>
            <div className="w-100 h-10"
                 //style={{position:"relative"}}
            >
                {billFormData&&
                renderHeader()
                }

            </div>
            <div className="w-100 h-65" 
                 style={{
                     display:"flex"
                     //position:"relative"
                 }}
            >
                {billFormData&&formTableTemplate&&
                 renderToolBox()   
                }
                {billFormData&&formTableTemplate&&
                 renderTable()
                }
                
            </div>
            <div className="w-100 h-20">
                {billFormData&&
                    renderFooter()
                }
            </div>
        </div>
    )
}


return(
<div className="bgc-lightGray app-container h-100 w-100" >

    {
     renderForm()
    }
    {
     showEditBillForm&&basicData
     ?<EditBillForm
         billFormData={billFormData}
         setBillFormData={setBillFormData}
         basicData={basicData}
         submitFunc={editBillFormSubmitFunc}
         cancelFunc={editBillFormCancelFunc}
         calDigit={calDigit}
         pageData={pageData}
         myheader={myheader}
         runIsGenId={runIsGenId}
      />
     :null
    }
   
</div>

)

}

BillForm.defaultProps={
    calDigit:100,
    bgColor:null
}
  

export default BillForm;

