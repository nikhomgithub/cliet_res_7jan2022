import React from 'react';
import {FaCheckCircle} from 'react-icons/fa'

import pageUtil from '../../component/pageComponent/pageUtil'
import axios from 'axios';
import uuid from 'react-uuid';
import tableUtil from '../../component/table/tableUtil'

const {reloadAxiosAll,saveTableTemplate,updateFilterData,
    submitFunctionEdit,submitFunctionAdd,filterAxios,
    setUnSelectAll,submitFunctionDelete
} = pageUtil

const {sortColumn,numberWithCommas} = tableUtil

//==================================
function BillBarcode(props) {

const {
    basicDataSt,
    myheader,
    pageData,
    showBillForm1,
    showBillForm2,
    
    billFormData1,
    billFormData2,

    setData1,
    setData2,

    setDetail1,
    setDetail2,
    calDigit,
    submitConfirm
}=props


console.log('BillBarcode')
const {billBarcodeForm}=pageData

//--------------
/*
const billBarcodeForm={
    productId:"Product ID",
    barcode:"Barcode",
    partnerId:"Partner ID",
    phone:"Phone",
    table:"Table",
    queue:"Queue",
    paymentType:"Payment Type",
    cash:"เงินสด", 
    grandTotal:"สุทธิ",
    change:"เงินทอน",
}
*/
//----------------
const blankInputState={
    productId:"", //number
    barcode:"", //string
    partnerId:"", //number
    phone:"", //string
    table:"", //select
    queue:"", //number
    paymentType:basicDataSt.basicData.paymentType[0],
    cash:0,
    grandTotal:0,
    change:0,
}

const [showCash,setShowCash]=React.useState(false)
const [showError,setShowError]=React.useState(false)

const [inputState,setInputState]=React.useState({...blankInputState})

let [filterData,setFilterData]=React.useState(null)
//{...filterDataTemplate.product}
    

React.useEffect(()=>{
    //console.log('inputState..........')
    //console.log(inputState)
   
    if(inputState.paymentType==basicDataSt.basicData.paymentType[0]){
        setShowCash(true)
    }
    else {
        setShowCash(false)
    }
    
},[inputState])

React.useEffect(()=>{
    
    if(showBillForm1){
        if(billFormData1){
            console.log(billFormData1.grandTotal)
            setInputState({...inputState,
                productId:"",
                barcode:"",
                partnerId:"",
                phone:"",
                grandTotal:billFormData1.grandTotal})
        }
    }
    if(showBillForm2){
        if(billFormData2){
            console.log(billFormData2.grandTotal)
            setInputState({...inputState,
                productId:"",
                barcode:"",
                partnerId:"",
                phone:"",
                grandTotal:billFormData2.grandTotal})
        }
    }
    
},[billFormData1,billFormData2])

const genInputType=(i)=>{
    if(i=="productId"||i=="partnerId"||i=="queue"||i=="cash"){
        return "number"
    }
    else if(i=="barcode"||i=="phone"){
        return "string"
    }
}

const findProductByBarcode=(e)=>{
    if(e.key=="Enter"){
        console.log('findProductById')
        axios.post('/p35product/getlimit',{barcode:e.target.value},myheader)
        .then(result=>{
            console.log('result')
            console.log(result.data)

            if(result.data.data[0]){                
                const tempProduct=result.data.data[0]
                const {
                    id,barcode,productName,
                    groupId,groupName,
                    unit,price,priceLevel,
                    point,isRawMat,
                    remark,active
                }=tempProduct
                
                const tempObj={
                    id,barcode,productName,
                    groupId,groupName,
                    unit,price,priceLevel,
                    point,isRawMat,
                    remark,
                    _id:uuid(),
                    selectedLine:false,
                    quantity:1,
                    result:price,
                    jobStatus:"open",
                    detailTime:new Date().toISOString(),
                }

                if(showBillForm1==true){
                    console.log('showBillForm1')
                    setDetail1(tempObj)
                }
                if(showBillForm2==true){
                    console.log('showBillForm2')
                    setDetail2(tempObj)
                }
                setInputState({
                    ...inputState,
                    barcode:""
                })
            }
            else{
                setInputState({
                    ...inputState,
                    barcode:""
                }) 
            }
        })
        .catch(error=>{
           console.log('error')
        })
     }
}

const findProductById=(e)=>{
    if(e.key=="Enter"){
        console.log('findProductById')
        axios.post('/p35product/getlimit',{id:e.target.value},myheader)
        .then(result=>{
            console.log('result')
            console.log(result.data)

            if(result.data.data[0]){                
                const tempProduct=result.data.data[0]
                const {
                    id,barcode,productName,
                    groupId,groupName,
                    unit,price,priceLevel,
                    point,isRawMat,
                    remark,active
                }=tempProduct
                
                const tempObj={
                    id,barcode,productName,
                    groupId,groupName,
                    unit,price,priceLevel,
                    point,isRawMat,
                    remark,
                    _id:uuid(),
                    selectedLine:false,
                    quantity:1,
                    result:price,
                    jobStatus:"open",
                    detailTime:new Date().toISOString(),
                }

                if(showBillForm1==true){
                    console.log('showBillForm1')
                    setDetail1(tempObj)
                }
                if(showBillForm2==true){
                    console.log('showBillForm2')
                    setDetail2(tempObj)
                }
                setInputState({
                    ...inputState,
                    productId:""
                })
            }
            else{
                setInputState({
                    ...inputState,
                    productId:""
                })
            }

        })
        .catch(error=>{
           console.log('error')
        })
     }
}

const findCustomerById=(e)=>{
    if(e.key=="Enter"){
       console.log('findCustomerById')
       axios.post('/p35partner/getlimit',{id:e.target.value},myheader)
       .then(result=>{
            //console.log('result')
            //console.log(result.data)

            if(result.data.data[0]){                
                const tempCustomer=result.data.data[0]
                const {id,name,title,phone,address,partnerType}=tempCustomer
                const tempObj={
                    partnerId:id,title:title,name:name,phone:phone,
                    address:address[0],partnerType:partnerType
                 }

                if(showBillForm1==true){
                    console.log('showBillForm1')
                    setData1(tempObj)
                }
                if(showBillForm2==true){
                    console.log('showBillForm2')
                    setData2(tempObj)
                }
                setInputState({
                    ...inputState,
                    partnerId:""
                })
            }
            else{
                setInputState({
                    ...inputState,
                    partnerId:""
                })
            }
       })
       .catch(error=>{
          console.log('error')
       })
    }
}


const findCustomerByPhone=(e)=>{
    if(e.key=="Enter"){
        console.log('findCustomerByPhone')
        const temp ={["phone"]:{$elemMatch:{$eq:e.target.value}}}
        //{$regex:e.target.value.trim().replace(/\s/,"|"),$options:'gi' }
        //const temp ={["phone"]:{$elemMatch:{$regex:"222",$options:'gi'}}}
       axios.post('/p35partner/getlimit',temp,myheader)
       .then(result=>{
            //console.log('result')
            //console.log(result.data)

            if(result.data.data[0]){
                
                const tempCustomer=result.data.data[0]
                //console.log(tempCustomer)
                const {id,name,title,phone,address,partnerType}=tempCustomer

                const tempObj={
                    partnerId:id,title:title,name:name,phone:phone,
                    address:address[0],partnerType:partnerType
                 }

                if(showBillForm1==true){
                    setData1(tempObj)
                }
                if(showBillForm2==true){
                    setData2(tempObj)
                }
                setInputState({
                    ...inputState,
                    phone:""
                })

            }
            else{
                setInputState({
                    ...inputState,
                    phone:""
                })
            }
       })
       .catch(error=>{
          console.log('error')
       })
    }
}


const setQueue=(e)=>{
    if(e.key=="Enter"){
        const tempObj={
            queue:e.target.value,
            queueStatus:"open"
        }

        if(showBillForm1==true){
            setData1(tempObj)
        }
        if(showBillForm2==true){
            setData2(tempObj)
        }
        setInputState(blankInputState)
    }
}

const setTable=(e)=>{

    const tempObj={
        table:e.target.value,
        tableStatus:"open"
    }
    
    if(showBillForm1==true){
        setData1(tempObj)
    }
    if(showBillForm2==true){
        setData2(tempObj)
    }
    setInputState(blankInputState)    
}

const keyDownFunc=(i,e)=>{
    if(i=="partnerId"){
        findCustomerById(e)
    }
    else if(i=="phone"){
        findCustomerByPhone(e)
    }
    else if(i=="queue"){
        setQueue(e)
    }
    else if(i=="productId"){
        findProductById(e)
    }
    else if(i=="barcode"){
        findProductByBarcode(e)
    }
}

const renderInput=(i)=>{
        if(i=="table"){
            return (
                <select className=""
                    onChange={e=>setTable(e)}
                >
                    <option>....</option>
                    {
                    basicDataSt.basicData[i].map((j,idx2)=>j.tableActive
                    ?<option key={idx2}
                   
                    >{j.tableName}</option>
                    :null
                    )
                    }
                </select>
            )
        }
        else if(i=="paymentType"){
            return (
                <select className=""
                    onChange={e=> setInputState({
                        ...inputState,
                        paymentType:e.target.value
                    })}
                >
                    <option>....</option>
                    {
                    basicDataSt.basicData[i].map((j,idx2)=>(
                    <option key={idx2}
                    selected={
                        (inputState["paymentType"]==j)
                        ?"selected"
                        :""
                     }
                    >{j}
                    </option>
                    ))
                    }
                </select>
            )
        }
        else if(i=="cash"){
            if(showCash){
                return (
                    <input
                    type={"number"}
                    value={ inputState[i]}
                    style={{fontSize:"1.2",
                            color:inputState[i]<inputState.grandTotal?"red":"black",
                            fontSize:"1.5rem",backgroundColor:"#fdf07a"
                           }}
                    onKeyDown={e=>{
                        if(e.key=="Enter"){
                            const tempChange=e.target.value-inputState.grandTotal
                            setInputState({
                                ...inputState,
                                change:tempChange
                            })
                        }
                    }}
                    onChange={e=>{
                        setInputState({...inputState,
                            [i]:e.target.value
                        })
                    }}
                    />
                )
            }
        }
        else if(i=="grandTotal"){
            return(
            <div style={{backgroundColor:"#a7c6eb",fontSize:"1.4rem"
                         }}>
                  {numberWithCommas(inputState.grandTotal,calDigit,"grandTotal")}
            </div>
            )
        }
        else if(i=="change"){
            if(showCash){
                return(
                    <div style={{backgroundColor:"#fdf07a",fontSize:"1.4rem"}}>
                    {numberWithCommas(inputState.change,calDigit,"change")}
                    </div>
                )
            }
        }
        else {
            return <input
                    type={genInputType(i)}
                    value={inputState[i]}
                    onKeyDown={e=>{
                        keyDownFunc(i,e)
                    }}
                    onChange={e=>{
                        setInputState({...inputState,[i]:e.target.value})
                    }}
               />
        }
}
//==========================
const renderBody=()=>{
    const objKeys=Object.keys(billBarcodeForm)

    return objKeys.map((i,idx)=>(
        <div key={idx} 
            className="flex-center-center jc-start" 
            style={{padding:"0.2rem",width:"100%",maxWidth:"50vw"}}>
            
            {i=="cash"||i=="change"||i=="grandTotal"
            ?<div style={{width:"30%",fontSize:"1.2rem",color:i=="grandTotal"?"black":"brown"}}
            >{billBarcodeForm[i]}</div>
            :<div style={{width:"30%",color:"black"}}
            >{billBarcodeForm[i]}</div>
            }
            <div style={{width:"70%"}}
            >
            {
                renderInput(i)
            }
            </div>
            
        </div>
    ))
}
//====================


//====================
return(
<div className="bgc-lightGray h-100 w-100" 
     style={{paddingTop:"0.5rem"}} >     
    {billFormData1||billFormData2
        ?renderBody()
        :null
    }
    {billFormData1||billFormData2
    ?<div className='w-100 flex-center-center' style={{margin:"1.5rem 0"}}>
        <button
            style={{width:"40%"}}
            onClick={e=>{
                submitConfirm()
            }}
        >
            <FaCheckCircle style={{fontSize:"4rem"}}/>
        </button>
    </div>
    :null
    }
</div>

)

}
export default BillBarcode;
