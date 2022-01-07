import React from 'react';
import axios from 'axios'
import uuid from 'react-uuid'
import axiosUtil from '../../util/axiosUtil'
import pageUtil from '../../component/pageComponent/pageUtil'
import {MainContext} from '../../context/MainContext'
import NewGroupComponent from '../../render/renderTree/NewGroupComponent'
import renderCustomerConfirm from './renderCustomerConfirm';
import renderTransactionConfirm from './renderTransactionConfirm';
import {RiLoginCircleLine,RiLoginBoxLine} from 'react-icons/ri'
import {FaHome} from 'react-icons/fa';
import {MdRefresh} from 'react-icons/md';
import LogOutTool from '../login/LogOutTool';
import {Link} from 'react-router-dom';

import ModalConfirm from '../../render/ModalConfirm';

import inputState from '../../component/table/inputState'


import filterDataTemplate from './filterDataTemplate'
import PageComponent from '../../component/pageComponent/SparePageComponent'
import ctUtil from '../../util/ctUtil'

import renderWidthRangeBar from '../../component/table/renderWidthRangeBar'

import data from './data'
import BillGroupComponent from './BillGroupComponent';
import BillProductGridComponent from './BillProductGridComponent';
import BillTableComponent from './BillTableComponent';
import BillForm from './BillForm'
import PartnerForBill from './PartnerForBill'
import TransactionForBill from './TransactionForBill';
import BillMenuComponent from './BillMenuComponent';
import BillBarcode from './BillBarcode'
import BillQueue from './BillQueue'
import BillKitchen from './BillKitchen'

import PrintOut from '../../render/renderForm/PrintOut'
import renderModalError from '../../render/renderModalError';
import {FaChair,FaRegFolderOpen,FaRegMoneyBillAlt,
        FaRegArrowAltCircleRight,FaMoneyBill} from 'react-icons/fa'
import {MdFastfood,MdPeople,MdPerson,MdClose} from 'react-icons/md'
import {GiCook}  from 'react-icons/gi'
import Ticon from '../../component/ticon/Ticon'

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

const {sleep,catchErrorToMessage}=axiosUtil




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











function Bill() {

console.log('Bill')










const {basicDataSt,
        setReloadBasicData,
        myheader,
        setBasicData,
        tokenSt,
        setReloadCheckToken
        //widthLeft,setWidthLeft
}=React.useContext(MainContext)


const getIconStyle=()=>{
     
    const toDate=new Date()
    
    let temp1=localStorage.getItem("expirationDate")
    const expirationDate=new Date(temp1)
    
    if(!temp1){
       return null
    }

    const temp3=new Date(expirationDate.toISOString())
    temp3.setDate(temp3.getDate()-3)
    const threeDayBeforeExpirationDate=new Date(temp3)
    //const temp2=expirationDate.getDate()-3
    //const temp3=expirationDate.toISOString()
   
     const a=toDate.getTime()-expirationDate.getTime()
     //console.log('a....')
     //console.log(a)

     //console.log('toDate')
     //console.log(toDate)

     //console.log('exp')
     //console.log(expirationDate)

     //console.log('3 d before')
     //console.log(threeDayBeforeExpirationDate)

     if(toDate>expirationDate){
        return {color:"red"}
     }
     else if(toDate>threeDayBeforeExpirationDate){
        return {color:"yellow"}
     }
     else{
        return {color:"green"}
     }

 }



const refHome=React.createRef()

const calDigit=100

const {basicData,pageData,tableTemplate,pageFilter,pageFilterForm,user}=basicDataSt

const genFilterData=()=>{
    //console.log('00000000000000000')
    //console.log(basicDataSt)
    let temp={
        ...filterDataTemplate.bill,
        /*
        data1:{...filterDataTemplate.blankData,
                branchId:basicData.branchId,
                branchName:basicData.branchName
            },
        data2:{...filterDataTemplate.blankData,
                branchId:basicData.branchId,
                branchName:basicData.branchName
        }
        */
    }

    if(basicData){
        temp={...temp,
              widthLeft:basicData.widthLeft,
              limitRow:basicData.limitRow,
              billMenuLimitRow:basicData.limitRow
            }
    }

    return temp
}

let [filterData,setFilterData]=React.useState(genFilterData())

const [selectProductToBillForm,setSelectProductToBillForm]=React.useState(null) 

const [selectCustomerToBillForm,setSelectCustomerToBillForm]=React.useState(null) 

const [resetProductList,setResetProductList]=React.useState(false)

const [billTableTemplate,setBillTableTemplate]=React.useState(null)

const [partnerInputState,setPartnerInputState]=React.useState(inputState.partnerInputState)
const [transactionInputState,setTransactionInputState]=React.useState(inputState.transactionInputState)

const [printData,setPrintData]=React.useState(false)//(null)

//----------------
//----test
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


const [billFormData1,setBillFormData1]=React.useState(filterData.data1)//data2)
const [billFormData2,setBillFormData2]=React.useState(filterData.data2)

const setData1=(data)=>{
    //console.log('data1')
    //console.log(data)
    if(billFormData1){
        setBillFormData1({...billFormData1,...data})
    }
}

const setData2=(data)=>{
    //console.log('data2')
    //console.log(data)
    if(billFormData2){
        setBillFormData2({...billFormData2,...data})
    }
}

const setDetail1=(detailData)=>{
    if(billFormData1){
        const tempDetail=[...billFormData1.detail,detailData]
        setBillFormData1({...billFormData1,detail:tempDetail,reCal:true})
    }
}

const setDetail2=(detailData)=>{
    if(billFormData2){
        const tempDetail=[...billFormData2.detail,detailData]
        setBillFormData2({...billFormData2,detail:tempDetail,reCal:true})
    }
}


//----------------

React.useEffect(()=>{

    console.log('printData')
    console.log(printData)
    if(printData==true){
    //    if(basicData.printPageSetting)
    //   setPrintDataPrint(!printDataPrint)
    //    setPrintData(null)
        window.print()
    }
},[printData])



React.useEffect(()=>{
    //console.log('basicDataSt....Effect')
    //console.log(basicDataSt)
    if(basicDataSt.tableTemplate){    
        setBillTableTemplate(tableTemplate.productDetailTableTemplateForForm)
    }
  
    if(basicDataSt.basicData){
        //console.log('have basicData===========')
        //console.log(basicDataSt.basicData)
        setFilterData({
            ...filterData,
            widthLeft:basicDataSt.basicData.widthLeft,
            limitRow:basicDataSt.basicData.limitRow,
            billMenuLimitRow:basicDataSt.basicData.limitRow
        })
    }

},[basicDataSt])

const setShowRange=(data)=>{setFilterData({...filterData,showRange:data})}
const setWidthLeft=(data)=>{setFilterData({...filterData,widthLeft:data})}
const setHeightTop=(data)=>{setFilterData({...filterData,heightTop:data})}

React.useEffect(()=>{

    //console.log('filterData.........Bill')
    //console.log(filterData)

    if(filterData.reloadData){
            let tempArray=[]
           
            /*
            basicData.table.map(i=>{
                if(i.tableActive){
                    tempArray=[...tempArray,{table:i.tableName,tableStatus:"open"}]
                }
            })
            */
            tempArray=[{tableStatus:"open"},{queueStatus:"open"}]
            //console.log('tempArray')
            //console.log(tempArray)
            //const promise1=axios.post('/p35product/getlimit',{},myheader)
            axios.post('/p35transaction/getlimit',{limitRow:100,$or:tempArray},myheader)   
            .then(result=>{
                console.log('result.....reloadData')
                //console.log(result.data)

                const temp=genFilterDataWithIndex(result.data.data)
                //console.log(temp)

                const tempTransaction=temp.tableOpen
                //console.log('result tempTransation')
                //console.log(tempTransaction)

                setFilterData({...filterData,
                    reloadData:false,
                    count:result.data.count,
                    lastRecordId:result.data.lastRecordId,
                    transactionArray:tempTransaction,
                    queueArray:temp.queueOpen
                })
            })
            .catch(error=>{
                console.log('error')
                
                //console.log(error)
                const tempError={...filterData,
                    reloadData:false,
                    message:catchErrorToMessage(error),
                    showModalConfirm:false,
                    showModalError:true,
                }
                setFilterData(tempError)
            })
    }

    if(filterData.reloadSelectProduct){
        //console.log('filterData.qryProduct')
        //console.log(filterData.qryProduct)
    
        axios.post('/p35product/getlimit',
                {limitRow:100,sort:{id:1},...filterData.qryProduct},myheader)   
        .then(result=>{

            setFilterData({...filterData,
                selectProduct:result.data.data,
                reloadSelectProduct:false
            })
        })
        .catch(error=>{
            //console.log('error')
            //console.log(error)
            const tempError={...filterData,
                reloadSelectProduct:false,
                message:catchErrorToMessage(error),
                showModalConfirm:false,
                showModalError:true,
            }
            setFilterData(tempError)
        })

    }

},[filterData])

React.useEffect(()=>{
    console.log('filterData.data1')
    if(filterData.data1){
        setBillFormData1(filterData.data1)
    }
   
},[filterData.data1])

React.useEffect(()=>{
    console.log('filterData.data2')
    if(filterData.data2){
        setBillFormData2(filterData.data2)
    }
},[filterData.data2])


const genFilterDataWithIndex=(filterData)=>{

    let tempArray=[]
    let tempTableArray=[]
    let tempQueueArray=[]


    basicData.table.map(i=>{
        if(i.tableActive){
            tempArray=[...tempArray,i.tableName]
        }
    })

    filterData.map((i,idx)=>{         
        const temp={...i,_id:uuid()}

        tempArray.map(j=>{
            if(j==i.table&&i.tableStatus=="open"){
                tempTableArray=[...tempTableArray,temp]
            }
        })

        if(i.queueStatus=="open"){
            tempQueueArray=[...tempQueueArray,temp]
        }
        //const temp={...i,tempIndex:idx,selectedLine:false}
    })

    return {tableOpen:tempTableArray,queueOpen:tempQueueArray}
}

const runIsGenIdOfBillForm1=(value)=>{
    setFilterData({...filterData,
        isGenIdOfBillForm1:value,
    })
}

const runIsGenIdOfBillForm2=(value)=>{
    setFilterData({...filterData,
        isGenIdOfBillForm2:value,
    })
}

const captureBillFromTable=(data)=>{
    //console.log('captureBillFromTable')
    //console.log(data)

    if(filterData.showBillForm1){
        setFilterData({...filterData,
            data1:data,
            showBillForm1:false,
            reloadBillForm1:true,
            isGenIdOfBillForm1:false,
            //showModalFromTable:true
        })
    }
    if(filterData.showBillForm2){
        setFilterData({...filterData,
            data2:data,
            showBillForm2:false,
            reloadBillForm2:true,
            isGenIdOfBillForm2:false,
            //showModalFromTable:true
        })
    }
    
    //setEditData(data)
}

const captureProductOfGroup=(value)=>{

    //console.log('value.data0')
    //console.log(value.data0)
    setFilterData({...filterData,
        selectProduct:value.data0,

        showParter:false,
        showGroup:false,
        showProductGrid:true,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,
    })
    
}

const setShowGroupFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:true,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,

    })
}

const setShowProductGridFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:true,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,

    })
}

const setShowTableFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:true,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,


    })
}

const setShowPartnerFunc=()=>{
    setFilterData({...filterData,

        showParter:true,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,

    })
}

const setShowTransactionFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:true,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,

    })
}


const setShowBarcodeFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:true,
        showQueue:false,
        showKitchen:false,

    })
}

const setShowQueueFunc=()=>{
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:true,
        showKitchen:false,

    })
}


const setShowBillMenuFunc=()=>{
    ///console.log('setShowBillMenuFunc')
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:true,
        showBarcode:false,
        showQueue:false,
        showKitchen:false,

    })
}

const setShowKitchenFunc=()=>{
    ///console.log('setShowBillMenuFunc')
    setFilterData({...filterData,

        showParter:false,
        showGroup:false,
        showProductGrid:false,
        showTable:false,
        showTransaction:false,
        showBillMenu:false,
        showBarcode:false,
        showQueue:false,
        showKitchen:true,

    })
}


const setFilterDataFunc=(obj)=>{
    setFilterData({
        ...filterData,
        ...obj
    })
}


const captureCustomerFunc=(data)=>{
    const {id,title,name,partnerType,phone,address}=data
    
    setFilterData({...filterData,
        showCustomerConfirm:true,
        customerConfirm:{
            partnerId:id,
            title:title,
            name:name,
            partnerType:partnerType,
            phone:phone,
            address:address
        }
    })

}

const captureTransactionFunc=(editData)=>{
    //console.log('captureTransactionFunc editData')
    //console.log(editData)
     if(filterData.showBillForm1){
        setFilterData({
            ...filterData,
            editTransaction:editData,
            showTransactionConfirm:true,
            isGenIdOfBillForm1:false    
        })
    }
    if(filterData.showBillForm2){
        setFilterData({
            ...filterData,
            editTransaction:editData,
            showTransactionConfirm:true,
            isGenIdOfBillForm2:false    
        })
    }

}

/*
const renderModalFromTable=()=>{
    return(
        <div className="Modal-background">
            <div className="Modal-box" 
             style={{paddingBottom:"1rem",minWidth:"50%",minHeight:"100px",margin:"0",
                    display:"flex",alignItems:"center",justifyContent:"center"
             }}
             
             >
                 <div className="flex-center-center jc-space-around">
                      <button>1kkkkkkkkkkkk</button>
                      <button>2</button>
                      <button
                        onClick={e=>{setFilterData({...filterData,showModalFromTable:false})}}
                      >X</button>
                 </div>
            </div>
        </div>
    )
}
*/

const captureProductListFromSelectProductInProductGrid=(data)=>{

    if(data){
        let tempArray=[]
        data.map(i=>{
            if(i.quantity>0){
                const tempResult=parseInt(i.quantity*i.price*calDigit)/calDigit
                const tempObj={...i,
                            result:tempResult,
                            _id:uuid(),
                            selectedLine:false,
                            jobStatus:"open"
                        }
                tempArray=[...tempArray,tempObj]
            }
        })
        
        setSelectProductToBillForm(null)

        setFilterData({...filterData,
            selectOfSelectProduct:tempArray
        })
        //setSelectOfSelectProduct(tempArray)
    }    
}

const customerConfirmSubmitFunc=()=>{

    //console.log('filterData......................ssssssss')
    //console.log(filterData)
    if(filterData.showBillForm1||filterData.showBillForm2){
        
        let dataIdx=null
        if(filterData.showBillForm1){
            dataIdx=1
        }
        if(filterData.showBillForm2){
            dataIdx=2
        }

        const {partnerId,title,name,partnerType,phone,address,selectedAddress}=filterData.customerConfirm

        const tempObj={
            partnerId:partnerId,
            title:title,
            name:name,
            partnerType:partnerType,
            phone:phone,
            address:selectedAddress
                    ?selectedAddress
                    :address[0]
        }
        
        const tempCustomer={
            dataIdx:dataIdx,
            selectCustomer:tempObj
        }
           
        setSelectCustomerToBillForm(tempCustomer)     

        setFilterData({...filterData,
            showCustomerConfirm:false,
        })
    }
    
    /*
    if(filterData.showBillForm1){

        setFilterData({...filterData,
            data1:{...filterData.data1,...tempObj},
            showCustomerConfirm:false,
            showBillForm1:false,
            reloadBillForm1:true
        })
    }
    if(filterData.showBillForm2){

        setFilterData({...filterData,
            data2:{...filterData.data2,...tempObj},
            showCustomerConfirm:false,
            showBillForm2:false,
            reloadBillForm2:true
        })
    }
    */
    //setFilterData({...filterData,})
}

const setPrintDataFunc=(data)=>{
    console.log('setPrintDataFunc')
    setPrintData(data)
}

const customerConfirmCancelFunc=()=>{
    setFilterData({...filterData,
        showCustomerConfirm:false
    })
}
React.useEffect(()=>{
    if(filterData.reloadBillForm1){
        setFilterData({
            ...filterData,
            showBillForm1:true,
            reloadBillForm1:false
        })
    }
},[filterData.reloadBillForm1])

React.useEffect(()=>{
    if(filterData.reloadBillForm2){
        setFilterData({
            ...filterData,
            showBillForm2:true,
            reloadBillForm2:false
        })
    }
},[filterData.reloadBillForm2])

const transactionConfirmSubmitFunc=()=>{
    let tempEditData=filterData.editTransaction

    if(filterData.showBillForm1){
        if(!filterData.includeTransactionHead){
            tempEditData={...filterData.data1,
                detail:[...filterData.data1.detail,
                        ...filterData.editTransaction.detail
                       ]
            }
        }

        setFilterData({...filterData,
            data1:tempEditData,
            showTransactionConfirm:false,
            showBillForm1:false,
            reloadBillForm1:true
        })
    }
    else{
        if(!filterData.includeTransactionHead){
            tempEditData={...filterData.data2,
                detail:[...filterData.data2.detail,
                        ...filterData.editTransaction.detail
                       ]
            }
        }

        setFilterData({...filterData,
            data2:tempEditData,
            showTransactionConfirm:false,
            showBillForm2:false,
            reloadBillForm2:true
        })
    }
}


const transactionConfirmCancelFunc=()=>{
    setFilterData({...filterData,
        showTransactionConfirm:false
    })
}


const closeBillForm1=(data)=>{

    setFilterData({...filterData,
        showBillForm1:false,
        data1:data,
        reloadBillForm2:true
    })
}

const closeBillForm2=(data)=>{

    setFilterData({...filterData,
        showBillForm2:false,
        data2:data,
        reloadBillForm1:true
    })
}


const saveTableTemplateFunc=(tableTemplate)=>{
    let tempObj={}
    Object.keys(tableTemplate).map(i=>{
       const temp={...tableTemplate[i],showColHead:true}
        tempObj={...tempObj,[i]:temp}
    })
    //console.log(tableTemplate)
    //console.log(tempObj)
    setBillTableTemplate(tempObj)
    saveTableTemplate(tableTemplate,'p35tabletemplate','productDetailTableTemplateForForm',myheader)
}

const submitFunctionDeleteFunc=(data)=>{
    setFilterData({...filterData,
        showModalConfirm:true,
        dataToDelete:data
    })
}

const setShowModalConfirmFunc=(data)=>{
    setFilterData({...filterData,
        showModalConfirm:data,
        dataToDelete:null
    })
}

const submitConfirmToDelete=()=>{
    const {dataToDelete}=filterData
    //console.log('delete.......')
    //const temp = await submitFunctionDelete(data,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/deletetransaction`,dataToDelete,myheader)
    .then(result=>{
        console.log('done delete.............')
        
        if(filterData.showBillForm1){
            const temp={...filterData,
                reloadData:true,
                showBillForm1:false,
                showModalConfirm:false,
                dataToDelete:false,
                data1:filterDataTemplate.blankData,
                reloadBillForm1:true
            }
            setFilterData(temp)
        }
        if(filterData.showBillForm2){
            const temp={...filterData,
                reloadData:true,
                showBillForm2:false,
                showModalConfirm:false,
                dataToDelete:false,
                data2:filterDataTemplate.blankData,
                reloadBillForm2:true
            }
            setFilterData(temp)
        }
        
        
    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)
    })
}

const submitFunctionEditFunc=async (data)=>{
    //console.log(`edit.......xxxxxxxxxxxxx`)
    //console.log(data)

    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}

    //console.log('tempObj')
    //console.log(tempObj)

    //const temp = await submitFunctionEdit(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    axios.post(`/p35transaction/updatetransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done edit.............')
        if(filterData.showBillForm1){
            const temp={...filterData,
                reloadData:true,
                data1:filterDataTemplate.blankData,
                reloadBillForm1:true,
                showBillForm1:false
            }
            setFilterData(temp)
        }

        if(filterData.showBillForm2){
            const temp={...filterData,
                reloadData:true,
                data2:filterDataTemplate.blankData,
                reloadBillForm2:true,
                showBillForm2:false
            }
            setFilterData(temp)
        }

    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

const submitFunctionAddFunc=async (data)=>{
    //console.log(`add.......`)
    //console.log(data)
    //const temp = await submitFunctionAdd(formInputState,filterData,stateTemplate,myheader)
    //setFilterData(temp)
    
    const {_id,detail,...remaining}=data
    let tempArray=[]
    detail.map(i=>{
        const {_id,...remaining2}=i
        tempArray=[...tempArray,remaining2]
    })

    const tempObj={...remaining,detail:tempArray}
    
    //console.log('tempObj')
    //console.log(tempObj)

    axios.post(`/p35transaction/addtransaction`,tempObj,myheader)
    .then(result=>{
        console.log('done add............')
        
        if(filterData.showBillForm1){
            const temp={...filterData,
                reloadData:true,
                data1:filterDataTemplate.blankData,
                reloadBillForm1:true,
                showBillForm1:false,
                isGenIdOfBillForm1:false,
            }
            setFilterData(temp)
        }

        if(filterData.showBillForm2){
            const temp={...filterData,
                reloadData:true,
                data2:filterDataTemplate.blankData,
                reloadBillForm2:true,
                showBillForm2:false,
                isGenIdOfBillForm2:false,

            }
            setFilterData(temp)
        }

    })
    .catch(error=>{
        console.log('error')
        console.log(error)
        const tempError={...filterData,
            //reloadData:true,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        console.log(tempError.message)
        setFilterData(tempError)

    })
}

const submitSaveCloseBillFunc=()=>{
    if(filterData.isGenIdOfBillForm){
        if(filterData.showBillForm1){
            if(billFormData1){
                const tempObj={...billFormData1,
                    tableStatus:"close",
                    queueStatus:"close"
                }
                submitFunctionAddFunc(tempObj)
            }
        }
        if(filterData.showBillForm2){
            if(billFormData2){
                const tempObj={...billFormData2,
                    tableStatus:"close",
                    queueStatus:"close"
                }
                submitFunctionAddFunc(tempObj)
            }
        }
    }
    else {
        if(filterData.showBillForm1){
            if(billFormData1){
                const tempObj={...billFormData1,
                    tableStatus:"close",
                    queueStatus:"close"
                }
                submitFunctionEditFunc(tempObj)
            }
        }
        if(filterData.showBillForm2){
            if(billFormData2){
                const tempObj={...billFormData2,
                    tableStatus:"close",
                    queueStatus:"close"
                }
                submitFunctionEditFunc(tempObj)
            }
        }
    }
}
//======================================
const updateQueueFunc=(e,data)=>{
    
    if(e.target.value=="close"){
        const {_id,...remaining}=data

        let tempObj={...remaining,
                        queueStatus:"close"
                    }
        //const {tax,reduction,detail}=tempObj
        /*        
        let taxArray=[]
        tax.map(i=>{
            const {_id,...remaining2}=i
            taxArray=[...taxArray,remaining2]
        })
        let reductionArray=[]
        reduction.map(i=>{
            const {_id,...remaining2}=i
            reductionArray=[...reductionArray,remaining2]
        })

        let detailArray=[]
        detail.map(i=>{
            const {_id,...remaining2}=i
            detailArray=[...detailArray,remaining2]
        })

        console.log('tempObj')
        tempObj={...tempObj,
            tax:taxArray,
            reduction:reductionArray,
            detail:detailArray
        }          
        */
        //console.log(tempObj)

        axios.post(`/p35transaction/updatetransactionstatus`,tempObj,myheader)
        .then(result=>{
            console.log('done edit.............')
            if(filterData.showBillForm1){
                const temp={...filterData,
                    reloadData:true,
                    data1:filterDataTemplate.blankData,
                    reloadBillForm1:true,
                    showBillForm1:false
                }
                setFilterData(temp)
            }

            if(filterData.showBillForm2){
                const temp={...filterData,
                    reloadData:true,
                    data2:filterDataTemplate.blankData,
                    reloadBillForm2:true,
                    showBillForm2:false
                }
                setFilterData(temp)
            }

        })
        .catch(error=>{
            console.log('error')
            console.log(error)
            const tempError={...filterData,
                //reloadData:false,
                message:catchErrorToMessage(error),
                //showModalConfirm:false,
                showModalError:true,
            }
            console.log(tempError.message)
            setFilterData(tempError)

        })
    }
}
//=======================================
const updateAllTransaction=(e,tableIdArray)=>{

    console.log('tableIdArray')
    console.log(tableIdArray)

    if(e.target.value=="close"){
        if(filterData.transactionArray.length>0){
            let allPromise=[]

            filterData.transactionArray.map(i=>{
                //if(tableName==i.table){
                tableIdArray.map(k=>{
                    if(k==i.id){
                        const {_id,...remaining}=i
                        let tempObj={...remaining,
                                tableStatus:"close",
                                queueStatus:"close"
                        }
                        allPromise=[...allPromise,
                            axios.post(`/p35transaction/updatetransactionstatus`,tempObj,myheader)
                        ]
                    }
                })    
                //}
            })

            console.log('allPromise.length')
            console.log(allPromise.length)
            Promise.all(allPromise)
            .then(result=>{
                console.log('done edit.............')
                if(filterData.showBillForm1){
                    const temp={...filterData,
                        reloadData:true,
                        data1:filterDataTemplate.blankData,
                        reloadBillForm1:true,
                        showBillForm1:false
                    }
                    setFilterData(temp)
                }
    
                if(filterData.showBillForm2){
                    const temp={...filterData,
                        reloadData:true,
                        data2:filterDataTemplate.blankData,
                        reloadBillForm2:true,
                        showBillForm2:false
                    }
                    setFilterData(temp)
                }
    
            })
            .catch(error=>{
                console.log('error')
                console.log(error)
                const tempError={...filterData,
                    //reloadData:false,
                    message:catchErrorToMessage(error),
                    //showModalConfirm:false,
                    showModalError:true,
                }
                console.log(tempError.message)
                setFilterData(tempError)
    
            })
       }
    }
}
//==================================
const updateProductToCloseOrOpen=(e,i,queue_idArray)=>{
    
    console.log('updateProductToCloseOrOpen..........')
    console.log(i)

    let tempDetailArray=[]

    i.detail.map(j=>{
        let isMatch=false
        console.log(`j._id=${j._id}`)
        
        queue_idArray.map(k=>{
            console.log(`k=${k}`)
            if(k==j._id){
                isMatch=true
            }
        })

        const {_id,...remaining}=j

        if(isMatch){
            tempDetailArray=[...tempDetailArray,{...remaining,jobStatus:e.target.value}]
        }
        else{
            tempDetailArray=[...tempDetailArray,remaining]
        }
        
    })

    
    console.log('tempDetailArray')
    console.log(tempDetailArray)
    
    const {_id,...remaining2}=i
    const tempObj={...remaining2,detail:tempDetailArray}
    
    console.log(tempObj)
    
    axios.post(`/p35transaction/updatetransactionstatus`,tempObj,myheader)
    .then(result=>{
          if(filterData.showBillForm1){
                const temp={...filterData,
                    reloadData:true,
                    data1:filterDataTemplate.blankData,
                    reloadBillForm1:true,
                    showBillForm1:false
                }
                setFilterData(temp)
            }

            if(filterData.showBillForm2){
                const temp={...filterData,
                    reloadData:true,
                    data2:filterDataTemplate.blankData,
                    reloadBillForm2:true,
                    showBillForm2:false
                }
                setFilterData(temp)
            }


    })
    .catch(error=>{
        //console.log('error')
        //console.log(error)
        const tempError={...filterData,
            //reloadData:false,
            message:catchErrorToMessage(error),
            //showModalConfirm:false,
            showModalError:true,
        }
        //console.log(tempError.message)
        setFilterData(tempError)

    })
    

}


//==================================
const captureAllTransaction=(tableIdArray)=>{
    if(filterData.transactionArray.length>0){
        let allDetailArray=[]
        filterData.transactionArray.map(i=>{
            tableIdArray.map(k=>{
                if(k==i.id){
                    allDetailArray=[...allDetailArray,...i.detail]
                }
            })
            //if(tableName==i.table){
            //}
        })     
        //console.log('allDetailArray')  
        //console.log(allDetailArray)
        if(filterData.showBillForm1){
            if(billFormData1){
                const tempObj={
                    ...billFormData1,
                    detail:[...billFormData1.detail,...allDetailArray],
                    reCal:true
                }
                setBillFormData1(tempObj)
            }
        }

        if(filterData.showBillForm2){
            if(billFormData2){
                const tempObj={
                    ...billFormData2,
                    detail:[...billFormData2.detail,...allDetailArray],
                    reCal:true
                }
                setBillFormData2(tempObj)
            }
        }
    }
}
//=======================================
const updateData=(data)=>{
    console.log('updateData....')

    if(filterData.showBillForm1){
        const temp={...filterData,
            data1:data,
            reloadBillForm1:true,
            showBillForm1:false,
        }
        setFilterData(temp)
    }
    if(filterData.showBillForm2){
        const temp={...filterData,
            data2:data,
            reloadBillForm2:true,
            showBillForm2:false,
        }
        setFilterData(temp)
    }

}

//=======================================
const addSelectProductToBillForm=()=>{

    //console.log('addSelectProductToBillForm')
    //console.log(filterData.selectOfSelectProduct)
    let dataIdx=null
    if(filterData.showBillForm1){
        dataIdx=1
    }
    if(filterData.showBillForm2){
        dataIdx=2
    }

    const tempObj={
        dataIdx:dataIdx,
        selectProduct:filterData.selectOfSelectProduct
    }

    setSelectProductToBillForm(tempObj)
    setResetProductList(true)
          
}

//-----------------------
const refreshProductFunc=(data)=>{
    setFilterData({...filterData,
        reloadSelectProduct:true,
        qryProduct:data
    })
}
//------------------------
const refreshTransactionFunc=()=>{
    setFilterData({...filterData,
        reloadData:true
    })
}

const changeIncludeTransactionHead=(value)=>{
    setFilterData({...filterData,
        includeTransactionHead:value
    })
}
//=======================================
const renderBody=()=>{
    return(
        filterData&&
        <div className=""
             style={{display:"flex",height:"94vh"}}
        >


            
            <div className="bd-darkGray hide-on-print" 
                 style={{height:"",width:`${filterData.widthLeft}%`,
                         overflowY:"scroll",overflowX:"hidden"}}>
               
                <div    className=""
                        style={{height:"",width:"100%",
                            display:"flex",
                            flexWrap:"wrap",
                            //overflowX:"scroll",
                            //overflowY:"hidden",
                            //backgroundColor:"#8cc5bb",
                            marginBottom:"0rem",
                            background:"rgb(140,197,187)",
                            background:"linear-gradient(0deg, rgba(131,195,184,1) 43%, rgba(219,255,249,1) 100%)"            
                }}>
                    
                    <div className="iconbox"
                         onClick={e=>refHome.current.click()}
                    >
                        <Ticon
                            iconName="FaHome" 
                            className={filterData.showPartner?"md-icon ft-brown":"md-icon"}
                            //className="md-icon" 
                            textStyle={{color:"black"}}
                            iconStyle={getIconStyle()}
                        />
                    </div>
                    
                    <div className="iconbox"
                         onClick={e=>setFilterData({...filterData,reloadData:true})}
                    >
                        <Ticon
                            iconName="MdRefresh" 
                            className={"md-icon"}
                            //className="md-icon" 
                            textStyle={{color:"black"}}
                        />
                    </div>

                    <div style={{display:"none"}}>
                        <div>
                            <Link ref={refHome} to="/pos/home"/>
                        </div>
                    </div>

                    <div className="iconbox"
                         onClick={e=>setShowPartnerFunc()}
                    >
                        <Ticon
                            iconName="MdPerson" 
                            className={filterData.showPartner?"md-icon ft-brown":"md-icon"}
                            //className="md-icon" 
                            textStyle={{color:"black"}}
                        />
                    </div>

                    <div className="iconbox"
                         onClick={e=>setShowGroupFunc()} 
                    >
                        <Ticon 
                            iconName="FaRegFolderOpen" 
                            className={filterData.showGroup?"md-icon ft-brown":"md-icon"}
                            //className="md-icon" 
                            textStyle={{color:"black"}}
                        //style={{marginRight:"1.2rem",
                        //color:filterData.showGroup?"#634739":"black"
                        //}}   
                        />
                    </div>

                    <div
                        className="iconbox"
                        onClick={e=>setShowProductGridFunc()}
                    >
                        <Ticon
                            iconName="MdFastfood" 
                            className={filterData.showProductGrid?"md-icon ft-brown":"md-icon"}
                            //className="md-icon" 

                            //style={{marginRight:"1.2rem",
                            //color:filterData.showProductGrid?"#634739":"black"
                            //}}
                            textStyle={{color:"black"}}
                        />
                    </div>

                    {filterData.selectOfSelectProduct
                    ?filterData.selectOfSelectProduct.length>0
                      ? <div className='iconbox'
                            onClick={e=>{
                                addSelectProductToBillForm()
                            }}
                        >
                          <Ticon
                            iconName="FaRegArrowAltCircleRight" 
                            className="md-icon ft-red"
                             
                            textStyle={{color:"black"}}
                            />
                        </div>
                      :null
                    :null
                    }

                    <div className="iconbox"
                        onClick={e=>setShowTransactionFunc()}
                    >
                        <Ticon
                            iconName="SiBookstack"
                            className={filterData.showTransaction?"md-icon ft-brown":"md-icon"}
                            textStyle={{color:"black"}}
                    />
                    </div>

                    <div className="iconbox"
                        onClick={e=>
                            setShowBillMenuFunc()
                        }
                    >
                        <Ticon
                            iconName="GiStack"
                            className={filterData.showBillMenu?"md-icon ft-brown":"md-icon"}
                            textStyle={{color:"black"}}
                    />
                    </div>


                    <div className='iconbox'
                        onClick={e=>{
                            setShowBarcodeFunc()
                        }}
                    >
                        <Ticon
                            iconName="RiHandCoinFill" 
                            className={
                                false//filterData.showBillMenu
                                ?"md-icon ft-brown"
                                :"md-icon"}
                            textStyle={{color:"black"}}
                          
                        />
                    </div>

                    <div
                        className="iconbox"
                        onClick={e=>setShowTableFunc()}
                    >
                        <Ticon
                            iconName="SiAirtable" 
                            className={filterData.showTable?"md-icon ft-brown":"md-icon"}
                            //className="md-icon" 
                            textStyle={{color:"black"}}
                            //style={{marginRight:"1.2rem",
                            //color:filterData.showTable?"#634739":"black"
                            //}}
                        />
                    </div>

                    <div className='iconbox'
                        onClick={e=>{
                            setShowQueueFunc()
                        }}
                    >
                        <Ticon
                            iconName="TiSortNumericallyOutline" 
                            className={
                                false//filterData.showBillMenu
                                ?"md-icon ft-brown"
                                :"md-icon"}
                            textStyle={{color:"black"}}
                          
                        />
                    </div>

                    <div className='iconbox'
                        onClick={e=>setShowKitchenFunc()}
                    >
                        <Ticon
                            iconName="GiCook" 
                            className={filterData.showKitchen?"md-icon ft-brown":"md-icon"}
                            textStyle={{color:"black"}}
                          
                        />
                    </div>
                </div>
                
               <div style={{height:""}}>

               {filterData.showGroup&&pageData&&
               <BillGroupComponent
                    captureProductOfGroup={captureProductOfGroup}
                    pageData={pageData}
               />}

               {filterData.showProductGrid&&
                   <BillProductGridComponent
                        selectProduct={filterData.selectProduct}
                        captureProductListFromSelectProductInProductGrid={captureProductListFromSelectProductInProductGrid}
                        resetProductList={resetProductList}
                        setResetProductList={setResetProductList}
                        refreshProductFunc={refreshProductFunc}
                   />
               }

               {filterData.showTable&&
                   <BillTableComponent
                        transactionArray={filterData.transactionArray}
                        captureBillFromTable={captureBillFromTable}
                        basicDataSt={basicDataSt}
                        updateAllTransaction={updateAllTransaction}
                        captureAllTransaction={captureAllTransaction}
                   />
               }
               {filterData.showParter&&basicDataSt&&myheader&&
                    <PartnerForBill
                        basicDataSt={basicDataSt}
                        myheader={myheader}
                        captureCustomer={captureCustomerFunc}
                        partnerInputState={partnerInputState}
                        setPartnerInputState={setPartnerInputState}
                    />
               }
               {filterData.showTransaction&&
                    <TransactionForBill
                        basicDataSt={basicDataSt}
                        myheader={myheader}
                        pageFilter={pageFilter}
                        pageFilterForm={pageFilterForm}
                        captureTransaction={captureTransactionFunc}
                        transactionInputState={transactionInputState}
                        setTransactionInputState={setTransactionInputState}
                    />
               }
               {
                //filterData.showModalFromTable&&
                //renderModalFromTable()
                   
               }
               
               {
                filterData.showKitchen&&pageData&&
                <BillKitchen
                    queueArray={filterData.queueArray}
                    basicDataSt={basicDataSt}
                    captureBillFromTable={captureBillFromTable}
                    //updateQueue={updateQueueFunc}
                    updateProductToCloseOrOpen={updateProductToCloseOrOpen}//{updateProductToClose}
                />
               }


               {
                filterData.showBillMenu&&pageData&&
                   <BillMenuComponent
                        //transactionArray={filterData.transactionArray}
                        //refreshTransactionFunc={refreshTransactionFunc}
                        pageData={pageData}
                        basicDataSt={basicDataSt}
                        myheader={myheader}
                        billMenuFilter={filterData.billMenuFilter}
                        
                        billMenuInputState={filterData.billMenuInputState}
                        billMenuSort={filterData.billMenuSort}
                        billMenuLimitRow={filterData.billMenuLimitRow}
                        billMenuShowTransaction={filterData.billMenuShowTransaction}
                        billMenuOption={filterData.billMenuOption}
                        setFilterDataFunc={setFilterDataFunc}
                        
                   />
               }

               {
                   filterData.showBarcode&&
                    <BillBarcode
                        pageData={pageData}
                        basicDataSt={basicDataSt}
                        myheader={myheader}

                        showBillForm1={filterData.showBillForm1}
                        showBillForm2={filterData.showBillForm2}
                        
                        setData1={setData1}
                        setData2={setData2}

                        setDetail1={setDetail1}
                        setDetail2={setDetail2}

                        billFormData1={billFormData1}
                        billFormData2={billFormData2}

                        calDigit={calDigit}

                        submitConfirm={submitSaveCloseBillFunc}
                    />
               }

               {
                   filterData.showQueue&&
                    <BillQueue
                        queueArray={filterData.queueArray}
                        basicDataSt={basicDataSt}
                        captureBillFromTable={captureBillFromTable}
                        updateQueue={updateQueueFunc}
                    />
               }

               </div>
            </div>


            <div className="bd-darkGray hide-on-print" 
                    style={{height:"100%",width:`${100-filterData.widthLeft}%`}}>

                            {filterData.showBillForm1&&pageData&&basicData&&billTableTemplate
                            ?<BillForm
                               blankData={{...filterDataTemplate.blankData,
                                           //branchId:basicData.branchId,
                                           //branchName:basicData.branchName
                                         }}
                               dataIdx={"1"}
                               closeBillForm={closeBillForm1}
                               
                              
                               selectOfSelectProduct={selectProductToBillForm}
                               selectOfCustomer={selectCustomerToBillForm}
                               setResetProductList={setResetProductList}
                               pageData={pageData} 
                               basicData={basicData}
                               tableTemplate={billTableTemplate}
                               saveTableTemplateFunc={saveTableTemplateFunc}
                               submitFunctionAddFunc={submitFunctionAddFunc}
                               submitFunctionEditFunc={submitFunctionEditFunc}
                               submitFunctionDeleteFunc={submitFunctionDeleteFunc}
                               isGenIdOfBillForm={filterData.isGenIdOfBillForm1}
                               runIsGenId={runIsGenIdOfBillForm1}
                               updateData={updateData}
                               myheader={myheader}
                               calDigit={calDigit}
                               setPrintDataFunc={setPrintDataFunc}
                               bgColor={"#e9bb43"}
                               
                               //data={filterData.data1}
                               billFormData={billFormData1}
                               setBillFormData={setBillFormData1}
                               />
                             :null
                            }
                            {filterData.showBillForm2&&pageData&&basicData&&billTableTemplate
                            ?<BillForm
                                blankData={{...filterDataTemplate.blankData,
                                            branchId:basicData.branchId,
                                            branchName:basicData.branchName
                                            }}
                                dataIdx={"2"}
                                closeBillForm={closeBillForm2}
                                
                                selectOfSelectProduct={selectProductToBillForm}
                                selectOfCustomer={selectCustomerToBillForm}
                                setResetProductList={setResetProductList}
                                pageData={pageData}
                                basicData={basicData}
                                filterData={filterData}
                                tableTemplate={billTableTemplate}
                                saveTableTemplateFunc={saveTableTemplateFunc}
                                submitFunctionAddFunc={submitFunctionAddFunc}
                                submitFunctionEditFunc={submitFunctionEditFunc}
                                submitFunctionDeleteFunc={submitFunctionDeleteFunc}
                                isGenIdOfBillForm={filterData.isGenIdOfBillForm2}
                                runIsGenId={runIsGenIdOfBillForm2}
                                updateData={updateData}
                                myheader={myheader}
                                calDigit={calDigit}
                                setPrintDataFunc={setPrintDataFunc}
                                bgColor={"#e9bb43"}

                                //data={filterData.data2}
                                billFormData={billFormData2}
                                setBillFormData={setBillFormData2}
                                />
                            :null
                            }

                          
            </div>
    
        </div>
    )
}

const renderPrintOut=()=>{

    if(filterData.showBillForm1){
        if(billFormData1){
            return(
                <PrintOut
                    printPage={basicData.printPage}
                    printPageSetting={basicData.printPageSetting}
                    calDigit={calDigit}
                    transaction={billFormData1}
                />
            )
        }
    }
    else if(filterData.showBillForm2){
        if(billFormData2){
            return(
                <PrintOut
                    printPage={basicData.printPage}
                    printPageSetting={basicData.printPageSetting}
                    calDigit={calDigit}
                    transaction={billFormData2}
                />
            )
        }
    }
    else {
        return null
    }
    /*
    return filterData.showBillForm1
        ? 

        :  <PrintOut
            printPage={basicData.printPage}
            printPageSetting={basicData.printPageSetting}
            calDigit={calDigit}
            transaction={billFormData2}
        />
    
        <div>
            <div>{billFormData2.id}</div>
            <div>{billFormData2.grandTotal}</div>
        </div>


    return(
        <PrintOut
            printPage={basicData.printPage}
            printPageSetting={basicData.printPageSetting}
            calDigit={calDigit}
            transaction={printData}
        />
    )
    */
}

//========================================

return(
<div className="" style={{padding:"0 0rem",position:"relative",overflow:"hidden"}}>
   
   {
   printData
    ?<div className="hide-on-screen">
       
        {
        renderPrintOut()
        }
    </div>
    : <div className="hide-on-screen"
        style={{position:"absolute",left:"0",top:"0"}}>
            <div>print not available</div>
        </div>
    
    }



  
    <div className="hide-on-print">
        <div className="hide-logouttool">
            <LogOutTool
                tokenSt={tokenSt}
                setReloadCheckToken={setReloadCheckToken}
                user={user}
                useHomeIcon={false}
                useShopLogOut={false}
            />
        </div>
    </div>
   
    <div>
        <Link ref={refHome} to="/home"/>
    </div>
    
    {
        renderBody()    
    }
 

    <div className="hide-on-print" 
        style={{width:"100%",display:"flex",position:"relative"}}>
            {
            renderWidthRangeBar({    showRange:filterData.showRange,
                                setShowRange:setShowRange,
                                widthLeft:filterData.widthLeft,
                                setWidthLeft:setWidthLeft,
                                //heightTop:filterData.heightTop,
                                //setHeightTop:setHeightTop
                            })
            }
   
    </div>
    
    {filterData.showCustomerConfirm&&
      renderCustomerConfirm({
          filterData,
          setFilterData,
          basicData,
          customerConfirmForm:pageData.customerConfirmForm,
          submitFunc:customerConfirmSubmitFunc,
          cancelFunc:customerConfirmCancelFunc
        })
    }
    
    {filterData.showTransactionConfirm&&
      renderTransactionConfirm({
          editTransaction:filterData.editTransaction,
          submitFunc:transactionConfirmSubmitFunc,
          cancelFunc:transactionConfirmCancelFunc,
          pageData:pageData,
          changeIncludeTransactionHead:changeIncludeTransactionHead,
          includeTransactionHead:filterData.includeTransactionHead
        })
    }
    
    {
    filterData.showModalConfirm
    ?<ModalConfirm
        setShow={setShowModalConfirmFunc}
        submitFunction={submitConfirmToDelete}
    />
    :null
    }

    {  
    filterData.showModalError
    ?renderModalError({
        setShow:(data)=>{setFilterData({...filterData,showModalError:data})},
        message:filterData.message
    })
    :null
    }

</div>
)

}
export default Bill;

